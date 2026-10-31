import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  slug: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  excerpt: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ default: 'Smartax Advisory' })
  author: string;

  @Column({ default: 'Accounting' })
  category: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ default: '5 min read' })
  readTime: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  publishedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
