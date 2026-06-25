import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { MessagingService } from './messaging.service';
import { SendMessageDto } from './dto/send-message.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('messages')
@UseGuards(JwtAuthGuard)
export class MessagingController {
  constructor(private readonly messagingService: MessagingService) {}

  @Post()
  async send(@Body() dto: SendMessageDto, @CurrentUser('id') senderId: string) {
    return this.messagingService.send(dto, senderId);
  }

  @Get()
  async getMessages(@Query('property_id') propertyId: string) {
    return this.messagingService.getMessages(propertyId);
  }

  @Get('conversations')
  async getConversations(@CurrentUser('id') userId: string) {
    return this.messagingService.getConversations(userId);
  }
}