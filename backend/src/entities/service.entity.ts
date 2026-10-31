import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('services')
export class Service {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  slug: string;

  @Column()
  title: string;

  @Column({ default: 'USA' })
  category: string; // 'USA', 'UK', 'General'

  @Column({ type: 'text' })
  shortDescription: string;

  @Column({ type: 'text' })
  fullDescription: string;

  @Column('simple-array', { nullable: true })
  features: string[];

  @Column('simple-array', { nullable: true })
  softwareTools: string[];

  @Column({ default: 'Calculator' })
  icon: string;

  @Column({ default: 0 })
  displayOrder: number;

  @CreateDateColumn()
  createdAt: Date;
}
