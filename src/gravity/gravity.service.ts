import { Injectable } from '@nestjs/common';
import axios from 'axios';
import https from 'https';

import { EntityResult, EntityResultType } from "../property/dtos/result.model";
import { GravityApi } from "../property/dtos/gravity.model";
import { GravityServer } from "../property/dtos/server.model";
import PropertyService from "../property/services/property.service";
import { IRequest } from "../property/constants/request.constant";
import { LoggerService } from "../common/logger/logger.service";
import { structQueryParams } from "../common/utils";
import { messages as gravityMessages } from "./constants/messages.constant";
import { gravityResponse } from "./constants/response.constant";
import type { GravityHeaders, RegisterPayload, GravityApiResponse, AopsId, AopsName } from "./types";

@Injectable()
export class GravityService {
  /** Static instance of the GravityApi class that holds the API endpoints. */
  private static _api: GravityApi;

  /** Default headers for the HTTP requests. */
  private static _defaultHeaders: GravityHeaders = {
    'Content-Type': 'application/json'
  };

  /** Logger instance for logging debug messages. */
  private static _logger: LoggerService;

  constructor() { }

  /**
   * Initializes the GravityService and sets up the logger and API endpoints.
   * @param logger - LoggerService instance for logging.
   */
  public static init(logger: LoggerService) {
    this._logger = logger;
    this._logger.info(gravityMessages.gravityService.Init);

    // Initialize API endpoints from server properties
    this._api = new GravityApi();
    const gravityServer: GravityServer = PropertyService.getGravityServerProperties();
    const gravityProtocol: string = gravityServer.isSsl === true ? 'https:' : 'http:';
    const gravityDomain: string = gravityServer.ipAddress + (gravityServer.port ? ':' + gravityServer.port : '');
    const gravityBaseUrl: string = gravityServer.baseURL;
    this._api.register = `${gravityProtocol}//${gravityDomain}/${gravityBaseUrl}/c/register`;
    this._api.aopsFetch = `${gravityProtocol}//${gravityDomain}/${gravityBaseUrl}/e/aops`;
    this._api.aopsPropertiesFetch = `${gravityProtocol}//${gravityDomain}/${gravityBaseUrl}/e/aops/:id/aopsproperties`;

    this._logger.debug(gravityMessages.gravityService.Initialized);
  }

  public static register(nucleusToken: string, userRole: string, tenantCode: string): Promise<EntityResult> {

    return new Promise<EntityResult>((resolve) => {

      const result: EntityResult = new EntityResult();

      const gravityServer: GravityServer = PropertyService.getGravityServerProperties();
      IRequest.Id++;

      const headers: GravityHeaders = { ...this._defaultHeaders };
      headers['req_id'] = IRequest.Id;

      const payload: RegisterPayload = {
        access_token: nucleusToken,
        role: userRole,
        tenant_code: tenantCode
      };

      const httpsAgent = gravityServer.strictSsl ? undefined : new https.Agent({ rejectUnauthorized: false });
      this._logger.debug(gravityMessages.gravityService.RegisterRequest, { url: this._api.register, headers, payload });

      axios.post<GravityApiResponse | string>(this._api.register, payload, { headers, httpsAgent })
        .then(({ data }) => {
          let response: GravityApiResponse;
          try {
            response = typeof data === 'string' ? JSON.parse(data) : data;
          } catch {
            response = data as GravityApiResponse;
          }

          if (response?.RespType === gravityResponse.Failed || response?.EvType === gravityResponse.Failed) {
            result.ResultType = EntityResultType.Failed;
            result.Exception = response;
          } else {
            result.ResultType = EntityResultType.Success;
            result.Response = response;
          }
          this._logger.debug(gravityMessages.gravityService.RegisterResponse, { result });
          resolve(result);
        })
        .catch((error: unknown) => {
          result.ResultType = EntityResultType.Failed;
          result.Exception = error;
          this._logger.debug(gravityMessages.gravityService.RegisterError, { error });
          resolve(result);
        });
    });
  }

  /**
   * Fetches AOPs (Applications of Operations) from the Gravity server.
   * @param gravityToken - The token for accessing the Gravity server.
   * @param aopsId - Optional parameter to filter AOPs by ID.
   * @returns A Promise that resolves to an EntityResult containing the fetched AOPs or an error.
   */
  public static fetchAOPs(gravityToken: string, aopsId?: AopsId, aopsName?: AopsName, limit?: number, offset?: number): Promise<EntityResult> {

    return new Promise<EntityResult>((resolve) => {

      const result: EntityResult = new EntityResult();

      const gravityServer: GravityServer = PropertyService.getGravityServerProperties();

      let url = this._api.aopsFetch;
      if (aopsId) {
        const filterValue = `{"byid":["${aopsId}"]}`;
        url = `${url}?filters=${encodeURIComponent(filterValue)}`;
      } else if (aopsName) {
        const filterValue = `{"bynamelike":["${aopsName}"]}`;
        url = `${url}?filters=${encodeURIComponent(filterValue)}`;
      }

      const query: string = structQueryParams({ limit, offset, includecount: true });
      if (query) {
        if (aopsId)
          url = `${url}&${query}`;
        else if (aopsName)
          url = `${url}&${query}`;
        else
          url = `${url}?${query}`;
      }


      IRequest.Id++;
      const headers: GravityHeaders = { ...this._defaultHeaders };
      headers['req_id'] = IRequest.Id;
      headers['access_token'] = gravityToken;

      const httpsAgent2 = gravityServer.strictSsl ? undefined : new https.Agent({ rejectUnauthorized: false });
      this._logger.debug(gravityMessages.gravityService.AOPsFetchRequest, { url, headers });

      axios.get<GravityApiResponse | string>(url, { headers, httpsAgent: httpsAgent2 })
        .then(({ data }) => {
          let response: GravityApiResponse;
          try {
            response = typeof data === 'string' ? JSON.parse(data) : data;
          } catch {
            response = data as GravityApiResponse;
          }

          if (response?.RespType === gravityResponse.Failed || response?.EvType === gravityResponse.Failed) {
            result.ResultType = EntityResultType.Failed;
            result.Exception = response;
          } else {
            result.ResultType = EntityResultType.Success;
            result.Response = response;
          }
          this._logger.debug(gravityMessages.gravityService.AOPsFetchResponse, { result });
          resolve(result);
        })
        .catch((error: unknown) => {
          result.ResultType = EntityResultType.Failed;
          result.Exception = error;
          this._logger.debug(gravityMessages.gravityService.AOPsFetchError, { error });
          resolve(result);
        });
    });
  }

  /**
       * Fetches properties of AOPs (Applications of Operations) from the Gravity server.
       * @param gravityToken - The token for accessing the Gravity server.
       * @param aopsId - Optional parameter to filter AOP properties by AOP ID.
       * @returns A Promise that resolves to an EntityResult containing the fetched AOP properties or an error.
       */
  public static fetchAOPsProperties(gravityToken: string, aopsId?: AopsId): Promise<EntityResult> {

    return new Promise<EntityResult>((resolve) => {

      const result: EntityResult = new EntityResult();

      const gravityServer: GravityServer = PropertyService.getGravityServerProperties();

      let url = this._api.aopsPropertiesFetch;
      if (aopsId) {
        url = url.replace(':id', String(aopsId));
      }

      IRequest.Id++;
      const headers: GravityHeaders = { ...this._defaultHeaders };
      headers['req_id'] = IRequest.Id;
      headers['access_token'] = gravityToken;

      const httpsAgent3 = gravityServer.strictSsl ? undefined : new https.Agent({ rejectUnauthorized: false });
      this._logger.debug(gravityMessages.gravityService.AOPsPropsFetchRequest, { url, headers });

      axios.get<GravityApiResponse | string>(url, { headers, httpsAgent: httpsAgent3 })
        .then(({ data }) => {
          let response: GravityApiResponse;
          try {
            response = typeof data === 'string' ? JSON.parse(data) : data;
          } catch {
            response = data as GravityApiResponse;
          }

          if (response?.RespType === gravityResponse.Failed || response?.EvType === gravityResponse.Failed) {
            result.ResultType = EntityResultType.Failed;
            result.Exception = response;
          } else {
            result.ResultType = EntityResultType.Success;
            result.Response = response;
          }
          this._logger.debug(gravityMessages.gravityService.AOPsPropsFetchResponse, { result });
          resolve(result);
        })
        .catch((error: unknown) => {
          result.ResultType = EntityResultType.Failed;
          result.Exception = error;
          this._logger.debug(gravityMessages.gravityService.AOPsPropsFetchError, { error });
          resolve(result);
        });
    });
  }

  /**
   * Returns the GravityApi instance containing the API endpoints.
   * This method can be used to access the API endpoints defined in the GravityApi class.
   * @returns The GravityApi instance with the registered API endpoints.
   */
  public static getApis(): GravityApi {
    return this._api;
  }
}
