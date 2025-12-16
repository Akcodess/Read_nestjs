import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiService } from '../services/api.service';
import { EncodeQueryDto, DecodeQueryDto, DataPayloadDto } from '../dtos';


@Controller('api')
export class ApiController {
  constructor(private readonly service: ApiService) { }

  @Post('properties')
  async properties(@Body() body: DataPayloadDto) {
    return this.service.fetchProperties(body);
  }

  @Get('allproperties')
  async allproperties(@Body() body: DataPayloadDto) {
    return this.service.fetchAllProperties(body);
  }

  @Get('encode')
  async encode(@Query() query: EncodeQueryDto) {
    return this.service.encode(query.data);
  }

  @Get('decode')
  async decode(@Query() query: DecodeQueryDto) {
    return this.service.decode(query.data);
  }

  @Post('encrypt')
  async encrypt(@Body() body: DataPayloadDto) {
    return this.service.encrypt(body);
  }

  @Post('decrypt')
  async decrypt(@Body() body: DataPayloadDto) {
    return this.service.decrypt(body);
  }

  @Post('token')
  async token(@Body() body: DataPayloadDto) {
    return this.service.token(body);
  }

  @Post('encodetoken')
  async encodetoken(@Body() body: DataPayloadDto) {
    return this.service.encodetoken(body);
  }

  @Post('fetch')
  async fetch(@Body() body: DataPayloadDto) {
    return this.service.fetch(body);
  }

  @Post('edit')
  async edit(@Body() body: DataPayloadDto) {
    return this.service.edit(body);
  }

  @Post('signin')
  async signIn(@Body() body: DataPayloadDto) {
    return this.service.signIn(body);
  }

  @Post('validate')
  async validate(@Body() body: DataPayloadDto) {
    return this.service.validate(body);
  }
}
