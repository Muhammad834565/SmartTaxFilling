import { Injectable, UnauthorizedException, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';

interface LockoutState {
  failedAttempts: number;
  lockedUntil: number | null; // Timestamp in ms
  currentLockDurationSec: number; // in seconds
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  // Store lockout state in-memory keyed by normalized email
  private lockouts = new Map<string, LockoutState>();

  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  private getLockoutState(key: string): LockoutState {
    if (!this.lockouts.has(key)) {
      this.lockouts.set(key, {
        failedAttempts: 0,
        lockedUntil: null,
        currentLockDurationSec: 0,
      });
    }
    return this.lockouts.get(key)!;
  }

  async login(email: string, password: string) {
    const adminEmail = (this.config.get<string>('ADMIN_EMAIL') || 'admin@smartaxglobal.com').trim();
    const adminPassword = (this.config.get<string>('ADMIN_PASSWORD') || 'Admin@SMARTax2025!').trim();

    const normalizedInputEmail = (email || '').trim().toLowerCase();
    const normalizedAdminEmail = adminEmail.toLowerCase();
    const state = this.getLockoutState(normalizedInputEmail);
    const now = Date.now();

    // Check if account is currently locked
    if (state.lockedUntil && now < state.lockedUntil) {
      const remainingSec = Math.ceil((state.lockedUntil - now) / 1000);
      this.logger.warn(`Login rejected: ${normalizedInputEmail} is locked for ${remainingSec}s more`);
      throw new HttpException(
        {
          statusCode: HttpStatus.TOO_MANY_REQUESTS,
          message: `Too many failed attempts. Please wait ${remainingSec} second${remainingSec > 1 ? 's' : ''} before trying again.`,
          retryAfterSec: remainingSec,
          locked: true,
        },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    // Verify email and password
    const isEmailValid = normalizedInputEmail === normalizedAdminEmail;
    const isPassValid =
      password === adminPassword ||
      (adminPassword.startsWith('$2') && (await bcrypt.compare(password, adminPassword)));

    if (!isEmailValid || !isPassValid) {
      state.failedAttempts += 1;
      this.logger.warn(
        `Failed login attempt #${state.failedAttempts} for: "${normalizedInputEmail}"`,
      );

      // Lockout logic:
      // 3 attempts -> 10s
      // 4 attempts -> 20s (10 * 2^1)
      // 5 attempts -> 40s (10 * 2^2)
      // 6 attempts -> 80s (10 * 2^3)
      if (state.failedAttempts >= 3) {
        const exponent = state.failedAttempts - 3;
        const lockDurationSec = 10 * Math.pow(2, exponent);
        state.lockedUntil = now + lockDurationSec * 1000;
        state.currentLockDurationSec = lockDurationSec;

        this.logger.warn(
          `Locking out "${normalizedInputEmail}" for ${lockDurationSec} seconds (attempt #${state.failedAttempts})`,
        );

        throw new HttpException(
          {
            statusCode: HttpStatus.TOO_MANY_REQUESTS,
            message: `Account locked for ${lockDurationSec} seconds due to repeated failed attempts.`,
            retryAfterSec: lockDurationSec,
            locked: true,
            attempts: state.failedAttempts,
          },
          HttpStatus.TOO_MANY_REQUESTS,
        );
      }

      const attemptsRemaining = 3 - state.failedAttempts;
      throw new HttpException(
        {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: `Invalid credentials. ${attemptsRemaining} attempt${attemptsRemaining > 1 ? 's' : ''} remaining before lockout.`,
          attempts: state.failedAttempts,
          attemptsRemaining,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    // SUCCESSFUL LOGIN -> Reset lockout tracker completely
    this.lockouts.delete(normalizedInputEmail);
    this.logger.log(`Admin successfully authenticated: ${adminEmail}. Lockout reset.`);

    const payload = { sub: 'admin', email: adminEmail, role: 'admin' };
    return {
      access_token: this.jwtService.sign(payload),
      email: adminEmail,
      role: 'admin',
    };
  }

  verifyToken(token: string) {
    return this.jwtService.verify(token);
  }
}
