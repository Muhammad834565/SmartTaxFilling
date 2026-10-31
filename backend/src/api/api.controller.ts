import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiService } from './api.service';
import { CreateInquiryDto } from './dto/create-inquiry.dto';

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
  getInquiries() {
    return this.apiService.getInquiries();
  }

  // Site Settings
  @Get('settings')
  getSettings() {
    return this.apiService.getSettings();
  }
}
