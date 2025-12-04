import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEntity } from './event.entity';
import { NormalizerService } from './normalizer.service';
import { GetEventsDto } from './dto/get-events.dto';

@Injectable()
export class WebhookService {
  constructor(
    @InjectRepository(EventEntity)
    private eventRepo: Repository<EventEntity>,
    private normalizerService: NormalizerService,
  ) { }

  async handleEvent(provider: string, payload: any) {
    const normalized = this.normalizerService.normalize(provider, payload);

    const event = this.eventRepo.create({
      provider,
      eventType: payload.event || 'unknown',
      rawPayload: payload,
      normalizedPayload: normalized,
    });

    await this.eventRepo.save(event);

    return {
      message: 'Event stored successfully',
      provider,
      normalized,
    };
  }

  async getEvents(query: GetEventsDto) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    const qb = this.eventRepo.createQueryBuilder('event');

    // filter by provider
    if (query.provider) {
      qb.andWhere('event.provider = :provider', { provider: query.provider });
    }

    // text search
    if (query.search) {
      qb.andWhere(
        `(event.eventType ILIKE :search OR CAST(event.normalizedPayload AS TEXT) ILIKE :search)`,
        { search: `%${query.search}%` },
      );
    }

    qb.skip(skip)
      .take(limit)
      .orderBy('event.createdAt', 'DESC');

    const [data, total] = await qb.getManyAndCount();

    return {
      total,
      page,
      limit,
      data,
    };
  }

}
