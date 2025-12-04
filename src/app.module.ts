import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebhookModule } from './modules/webhook/webhook.module';
import { EventEntity } from './modules/webhook/event.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'tendresse',
      password: 'psw123',
      database: 'webhook_db',
      autoLoadEntities: true,
      synchronize: true, // auto creates tables in dev
    }),
    TypeOrmModule.forFeature([EventEntity]),
    WebhookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
