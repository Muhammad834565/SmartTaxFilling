import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { Page } from '../entities/page.entity';
import { Service } from '../entities/service.entity';
import { Post } from '../entities/post.entity';
import { PricingPlan } from '../entities/pricing-plan.entity';
import { Testimonial } from '../entities/testimonial.entity';
import { Faq } from '../entities/faq.entity';
import { Inquiry } from '../entities/inquiry.entity';
import { SiteSetting } from '../entities/site-setting.entity';
import { MailModule } from '../mail/mail.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Page,
      Service,
      Post,
      PricingPlan,
      Testimonial,
      Faq,
      Inquiry,
      SiteSetting,
    ]),
    MailModule,
    AuthModule,
  ],
  controllers: [ApiController],
  providers: [ApiService],
  exports: [ApiService],
})
export class ApiModule {}
