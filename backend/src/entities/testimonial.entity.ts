import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('testimonials')
export class Testimonial {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  clientName: string;

  @Column({ nullable: true })
  company: string;

  @Column({ nullable: true })
  role: string;

  @Column({ type: 'text' })
  quote: string;

  @Column({ default: 5 })
  rating: number;

  @Column({ nullable: true })
  avatarUrl: string;
}
