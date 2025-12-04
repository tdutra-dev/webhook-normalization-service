import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';
import { EventEntity } from './event.entity';
import { NormalizerService } from './normalizer.service';

@Module({
  imports: [TypeOrmModule.forFeature([EventEntity])],
  controllers: [WebhookController],
  providers: [WebhookService, NormalizerService],
})
export class WebhookModule {}
