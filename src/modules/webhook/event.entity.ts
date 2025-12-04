import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('events')
export class EventEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider: string;

  @Column()
  eventType: string;

  @Column({ type: 'jsonb' })
  rawPayload: any;

  @Column({ type: 'jsonb', nullable: true })
  normalizedPayload: any;

  @CreateDateColumn()
  createdAt: Date;
}
