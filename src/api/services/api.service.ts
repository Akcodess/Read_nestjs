import { Injectable } from '@nestjs/common';
import PropertyService from '../../property/services/property.service';
import { LoggerService } from '../../common/logger/logger.service';
import { messages as apiMessages } from '../constants/messages.constant';
import type { EncodedResponse, DecodedResponse } from '../types';
import type { DataPayloadDto } from '../dtos';

@Injectable()
export class ApiService {
  constructor(private readonly logger: LoggerService) { }

  async fetchProperties(data: DataPayloadDto) {
    this.logger.for('ApiService').info(apiMessages.apiService.FetchPropertiesRequest, { data });
    const log = this.logger.for('ApiService');
    const props = PropertyService.getProperties();
    log.debug(apiMessages.apiService.FetchPropertiesResponse, { props });
    return props;
  }

  async fetchAllProperties(data: DataPayloadDto) {
    const log = this.logger.for('ApiService');
    const props = PropertyService.getProperties();
    log.debug(apiMessages.apiService.FetchAllPropertiesResponse, { props });
    return props;
  }

  async encode(data: string): Promise<EncodedResponse> {
    const log = this.logger.for('ApiService');
    const encoded = Buffer.from(data, 'utf8').toString('base64');
    log.debug(apiMessages.apiService.EncodeResponse, { encoded });
    return { encoded };
  }

  async decode(data: string): Promise<DecodedResponse> {
    const log = this.logger.for('ApiService');
    const decoded = Buffer.from(data, 'base64').toString('utf8');
    log.debug(apiMessages.apiService.DecodeResponse, { decoded });
    return { decoded };
  }

  async encrypt(payload: DataPayloadDto) {
    const log = this.logger.for('ApiService');
    log.debug(apiMessages.apiService.EncryptResponse, { payload });
    return { message: 'Not Implemented' };
  }

  async decrypt(payload: DataPayloadDto) {
    const log = this.logger.for('ApiService');
    log.debug(apiMessages.apiService.DecryptResponse, { payload });
    return { message: 'Not Implemented' };
  }

  async token(payload: DataPayloadDto) {
    const log = this.logger.for('ApiService');
    log.debug(apiMessages.apiService.TokenResponse, { payload });
    return { message: 'Not Implemented' };
  }

  async encodetoken(payload: DataPayloadDto): Promise<EncodedResponse> {
    const log = this.logger.for('ApiService');
    log.debug(apiMessages.apiService.EncodeTokenResponse, { payload });
    const data = String(payload?.data ?? '');
    const encoded = Buffer.from(data, 'utf8').toString('base64');
    return { encoded };
  }

  async fetch(payload: DataPayloadDto) {
    const log = this.logger.for('ApiService');
    log.debug(apiMessages.apiService.FetchResponse, { payload });
    return { message: 'Not Implemented' };
  }

  async edit(payload: DataPayloadDto) {
    const log = this.logger.for('ApiService');
    log.debug(apiMessages.apiService.EditResponse, { payload });
    return { message: 'Not Implemented' };
  }

  async signIn(payload: DataPayloadDto) {
    const log = this.logger.for('ApiService');
    log.debug(apiMessages.apiService.SignInResponse, { payload });
    return { message: 'Not Implemented' };
  }

  async validate(payload: DataPayloadDto) {
    const log = this.logger.for('ApiService');
    log.debug(apiMessages.apiService.ValidateResponse, { payload });
    return { message: 'Not Implemented' };
  }
}
