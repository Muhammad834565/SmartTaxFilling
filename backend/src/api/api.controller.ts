import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiService } from './api.service';
import { CreateInquiryDto } from './dto/create-inquiry.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { IsIn } from 'class-validator';

class UpdateInquiryStatusDto {
  @IsIn(['NEW', 'CONTACTED', 'RESOLVED'])
  status: string;
}

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  // Services
  @Get('services')
  getServices(@Query('category') category?: string) {
    return this.apiService.getServices(category);
  }

  @Get('services/:slug')
  getServiceBySlug(@Param('slug') slug: string) {
    return this.apiService.getServiceBySlug(slug);
  }

  // Pages
  @Get('pages')
  getPages() {
    return this.apiService.getPages();
  }

  @Get('pages/:slug')
  getPageBySlug(@Param('slug') slug: string) {
    return this.apiService.getPageBySlug(slug);
  }

  // Posts / Blog
  @Get('posts')
  getPosts() {
    return this.apiService.getPosts();
  }

  @Get('posts/:slug')
  getPostBySlug(@Param('slug') slug: string) {
    return this.apiService.getPostBySlug(slug);
  }

  // Pricing Plans
  @Get('pricing')
  getPricingPlans() {
    return this.apiService.getPricingPlans();
  }

  // Testimonials
  @Get('testimonials')
  getTestimonials() {
    return this.apiService.getTestimonials();
  }

  // FAQs
  @Get('faqs')
  getFaqs() {
    return this.apiService.getFaqs();
  }

  // Inquiries / Leads (Contact Form)
  @Post('inquiries')
  createInquiry(@Body() dto: CreateInquiryDto) {
    return this.apiService.createInquiry(dto);
  }

  @Get('inquiries')
  @UseGuards(JwtAuthGuard)
  getInquiries() {
    return this.apiService.getInquiries();
  }

  @Patch('inquiries/:id/status')
  @UseGuards(JwtAuthGuard)
  updateInquiryStatus(
    @Param('id') id: string,
    @Body() dto: UpdateInquiryStatusDto,
  ) {
    return this.apiService.updateInquiryStatus(id, dto.status);
  }

  // Site Settings
  @Get('settings')
  getSettings() {
    return this.apiService.getSettings();
  }
}
