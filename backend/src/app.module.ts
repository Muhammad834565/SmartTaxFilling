import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiModule } from './api/api.module';
import { SeedModule } from './seed/seed.module';
import { Page } from './entities/page.entity';
import { Service } from './entities/service.entity';
import { Post } from './entities/post.entity';
import { PricingPlan } from './entities/pricing-plan.entity';
import { Testimonial } from './entities/testimonial.entity';
import { Faq } from './entities/faq.entity';
import { Inquiry } from './entities/inquiry.entity';
import { SiteSetting } from './entities/site-setting.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST', 'localhost'),
        port: parseInt(config.get<string>('DB_PORT', '5432'), 10),
        username: config.get<string>('DB_USERNAME', 'postgres'),
        password: config.get<string>('DB_PASSWORD', 'postgrespassword'),
        database: config.get<string>('DB_NAME', 'smartax_db'),
        ssl: config.get<string>('DB_SSL', 'false') === 'true'
          ? { rejectUnauthorized: false }
          : false,
        // Force IPv4 — prevents ENETUNREACH errors on Render/Railway (IPv6 not supported)
        extra: {
          family: 4,
        },
        entities: [
          Page,
          Service,
          Post,
          PricingPlan,
          Testimonial,
          Faq,
          Inquiry,
          SiteSetting,
        ],
        synchronize: config.get<string>('DB_SYNCHRONIZE', 'true') === 'true',
      }),
    }),
    ApiModule,
    SeedModule,
  ],
})
export class AppModule {}
