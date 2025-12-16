import { IsOptional, IsString } from 'class-validator';

export class EncodeQueryDto {
  @IsString()
  data!: string;
}

export class DecodeQueryDto {
  @IsString()
  data!: string;
}

export class DataPayloadDto {
  @IsOptional()
  @IsString()
  data?: string;
}

