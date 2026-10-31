import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('inquiries')
export class Inquiry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  service: string;

  @Column({ type: 'text' })
  message: string;

  @Column({ nullable: true })
  country: string;

  @Column({ default: 'NEW' })
  status: string; // 'NEW', 'CONTACTED', 'RESOLVED'

  @CreateDateColumn()
  createdAt: Date;
}
