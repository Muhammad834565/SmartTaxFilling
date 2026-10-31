import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('pricing_plans')
export class PricingPlan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  priceMonthly: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  priceAnnual: number;

  @Column()
  description: string;

  @Column('simple-array')
  features: string[];

  @Column({ default: false })
  isPopular: boolean;

  @Column({ default: 'Get Started' })
  ctaText: string;

  @Column({ default: 0 })
  displayOrder: number;
}
