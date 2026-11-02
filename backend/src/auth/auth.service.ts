import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) { }

  async login(email: string, password: string) {
    const adminEmail = (this.config.get<string>('ADMIN_EMAIL')).trim();
    const adminPassword = (this.config.get<string>('ADMIN_PASSWORD')).trim();

    const normalizedInputEmail = (email || '').trim().toLowerCase();
    const normalizedAdminEmail = adminEmail.toLowerCase();

    this.logger.log(`Admin login attempt for: "${normalizedInputEmail}" (configured admin: "${normalizedAdminEmail}")`);

    if (normalizedInputEmail !== normalizedAdminEmail) {
      this.logger.warn(`Email mismatch for login attempt`);
      throw new UnauthorizedException('Invalid credentials');
    }

    // Support both plain-text and bcrypt-hashed passwords
    const isMatch =
      password === adminPassword ||
      (adminPassword.startsWith('$2') && (await bcrypt.compare(password, adminPassword)));

    if (!isMatch) {
      this.logger.warn(`Password mismatch for admin login`);
      throw new UnauthorizedException('Invalid credentials');
    }

    this.logger.log(`Admin successfully authenticated: ${adminEmail}`);

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
