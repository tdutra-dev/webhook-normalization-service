import { IsOptional, IsString, IsNumberString } from 'class-validator';

export class GetEventsDto {
  @IsOptional()
  @IsString()
  provider?: string;

  @IsOptional()
  @IsString()
  search?: string; // will match eventType or normalized payload

  @IsOptional()
  @IsNumberString()
  page?: number = 1;

  @IsOptional()
  @IsNumberString()
  limit?: number = 10;
}
