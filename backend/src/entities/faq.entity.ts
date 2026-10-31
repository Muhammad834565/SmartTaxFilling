import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('faqs')
export class Faq {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  question: string;

  @Column({ type: 'text' })
  answer: string;

  @Column({ default: 'General' })
  category: string;

  @Column({ default: 0 })
  displayOrder: number;
}
