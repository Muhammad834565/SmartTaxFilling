import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Page } from '../entities/page.entity';
import { Service } from '../entities/service.entity';
import { Post } from '../entities/post.entity';
import { PricingPlan } from '../entities/pricing-plan.entity';
import { Testimonial } from '../entities/testimonial.entity';
import { Faq } from '../entities/faq.entity';
import { Inquiry } from '../entities/inquiry.entity';
import { SiteSetting } from '../entities/site-setting.entity';
import { CreateInquiryDto } from './dto/create-inquiry.dto';
import { MailService } from '../mail/mail.service';

@Injectable()
export class ApiService {
  constructor(
    @InjectRepository(Page) private pageRepo: Repository<Page>,
    @InjectRepository(Service) private serviceRepo: Repository<Service>,
    @InjectRepository(Post) private postRepo: Repository<Post>,
    @InjectRepository(PricingPlan) private pricingRepo: Repository<PricingPlan>,
    @InjectRepository(Testimonial) private testimonialRepo: Repository<Testimonial>,
    @InjectRepository(Faq) private faqRepo: Repository<Faq>,
    @InjectRepository(Inquiry) private inquiryRepo: Repository<Inquiry>,
    @InjectRepository(SiteSetting) private settingRepo: Repository<SiteSetting>,
    private readonly mailService: MailService,
  ) {}

  // Services
  async getServices(category?: string) {
    if (category) {
      return this.serviceRepo.find({
        where: { category },
        order: { displayOrder: 'ASC' },
      });
    }
    return this.serviceRepo.find({ order: { displayOrder: 'ASC' } });
  }

  async getServiceBySlug(slug: string) {
    const service = await this.serviceRepo.findOne({ where: { slug } });
    if (!service) {
      throw new NotFoundException(`Service with slug '${slug}' not found`);
    }
    return service;
  }

  // Pages
  async getPages() {
    return this.pageRepo.find({ where: { isPublished: true } });
  }

  async getPageBySlug(slug: string) {
    const page = await this.pageRepo.findOne({ where: { slug, isPublished: true } });
    if (!page) {
      throw new NotFoundException(`Page '${slug}' not found`);
    }
    return page;
  }

  // Posts / Blog
  async getPosts() {
    return this.postRepo.find({ order: { publishedAt: 'DESC' } });
  }

  async getPostBySlug(slug: string) {
    const post = await this.postRepo.findOne({ where: { slug } });
    if (!post) {
      throw new NotFoundException(`Article '${slug}' not found`);
    }
    return post;
  }

  // Pricing
  async getPricingPlans() {
    return this.pricingRepo.find({ order: { displayOrder: 'ASC' } });
  }

  // Testimonials
  async getTestimonials() {
    return this.testimonialRepo.find();
  }

  // FAQs
  async getFaqs() {
    return this.faqRepo.find({ order: { displayOrder: 'ASC' } });
  }

  // Inquiries / Leads
  async createInquiry(dto: CreateInquiryDto) {
    const inquiry = this.inquiryRepo.create(dto);
    const saved = await this.inquiryRepo.save(inquiry);
    // Fire-and-forget email — won't fail the API response
    this.mailService.sendInquiryNotification(dto);
    return saved;
  }

  async getInquiries() {
    return this.inquiryRepo.find({ order: { createdAt: 'DESC' } });
  }

  async updateInquiryStatus(id: string, status: string) {
    const inquiry = await this.inquiryRepo.findOne({ where: { id } });
    if (!inquiry) throw new NotFoundException(`Inquiry ${id} not found`);
    inquiry.status = status;
    return this.inquiryRepo.save(inquiry);
  }

  // Settings
  async getSettings() {
    const settings = await this.settingRepo.find();
    const map: Record<string, string> = {};
    for (const s of settings) {
      map[s.key] = s.value;
    }
    return map;
  }
}
