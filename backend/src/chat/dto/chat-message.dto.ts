import { IsNotEmpty, IsString, IsOptional, IsArray } from 'class-validator';

export interface ChatHistoryItem {
  role: 'user' | 'model';
  content: string;
}

export class ChatMessageDto {
  @IsNotEmpty()
  @IsString()
  message: string;

  @IsOptional()
  @IsArray()
  history?: ChatHistoryItem[];
}

export class BookFromChatDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  service?: string;

  @IsOptional()
  @IsString()
  preferredTime?: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}

