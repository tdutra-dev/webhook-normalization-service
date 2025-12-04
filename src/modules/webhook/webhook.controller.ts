import { Controller, Post, Param, Body, Get, Query } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { GetEventsDto } from './dto/get-events.dto';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post(':provider')
  async receiveWebhook(@Param('provider') provider: string, @Body() body: any) {
    return this.webhookService.handleEvent(provider, body);
  }

  @Get()
  async getEvents(@Query() query: GetEventsDto) {
    return this.webhookService.getEvents(query);
  }
}
