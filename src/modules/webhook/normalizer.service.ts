import { Injectable } from '@nestjs/common';

@Injectable()
export class NormalizerService {

  normalize(provider: string, payload: any) {
    switch (provider) {
      case 'shopify':
        return this.normalizeShopify(payload);
      case 'stripe':
        return this.normalizeStripe(payload);
      default:
        return payload; // fallback raw
    }
  }

  private normalizeShopify(payload: any) {
    return {
      id: payload?.data?.id,
      title: payload?.data?.title,
      type: payload.event,
      timestamp: new Date(),
    };
  }

  private normalizeStripe(payload: any) {
    return {
      id: payload?.data?.object?.id,
      amount: payload?.data?.object?.amount,
      currency: payload?.data?.object?.currency,
      type: payload.event,
      timestamp: new Date(),
    };
  }
}
