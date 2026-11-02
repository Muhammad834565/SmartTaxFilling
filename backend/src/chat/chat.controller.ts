import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatMessageDto, BookFromChatDto } from './dto/chat-message.dto';

@Controller('api/chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('message')
  @HttpCode(HttpStatus.OK)
  async sendMessage(@Body() dto: ChatMessageDto) {
    return this.chatService.processMessage(dto.message, dto.history);
  }

  @Post('book')
  @HttpCode(HttpStatus.CREATED)
  async bookAppointment(@Body() dto: BookFromChatDto) {
    return this.chatService.bookAppointment(dto);
  }
}

