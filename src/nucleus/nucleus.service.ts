import { Injectable } from '@nestjs/common';
import axios from 'axios';
import qs from 'qs';
import * as https from 'https';

import { LightServer, NucleusServer } from '../property/dtos/server.model';
import { NucleusApi } from '../property/dtos/nucleus.model';
import { EntityResult, EntityResultType } from '../property/dtos/result.model';
import PropertyService from '../property/services/property.service';
import { LoggerService } from '../common/logger/logger.service';
import type { AuthType, UserRole, NucleusHeaders, SigninPayload, ValidatePayload, NucleusAuthResponse, NucleusTokenResponse } from './types';
import { messages as nucleusMessages } from './constants/messages.constant';
import { nucleusResponse } from './constants/response.constant';

@Injectable()
export class NucleusService {
    /** API endpoints for Nucleus service */
    private static _api: NucleusApi;

    /** Default headers for API requests */
    private static _defaultHeaders: NucleusHeaders = {
        'Content-Type': 'application/json'
    };

    /** Logger instance for logging messages */
    private static _logger: LoggerService;

    /**
     * Private constructor to prevent instantiation.
     * Use static methods to interact with the service.
     */
    constructor() { }

    /**
     * Initializes the NucleusService with the provided logger.
     * Sets up the API endpoints based on server properties.
     * @param logger - LoggerService instance for logging.
     */
    public static init(logger: LoggerService) {
        this._logger = logger;
        this._logger?.info(nucleusMessages.nucleusService.Init);

        this._api = new NucleusApi();
        const nucleusServer: NucleusServer = PropertyService.getNucleusServerProperties();
        const nucleusProtocol: string = nucleusServer.isSsl === true ? 'https:' : 'http:';
        const nucleusDomain: string = nucleusServer.ipAddress + (nucleusServer.port ? ':' + nucleusServer.port : '');
        const nucleusBaseUrl: string = nucleusServer.baseURL;
        this._api.signIn = `${nucleusProtocol}//${nucleusDomain}/${nucleusBaseUrl}/${nucleusServer.version}/tenants/<tenant_code>/users/auth?response_type=code id_token`;
        this._api.validate = `${nucleusProtocol}//${nucleusDomain}/${nucleusBaseUrl}/${nucleusServer.version}/tenants/<tenant_code>/users/auth/token`;
        this._logger?.debug(nucleusMessages.nucleusService.Initialized);
    }

    public static signin(loginId: string, password: string, appLoginId: string, appPassword: string, tenantCode: string, authType: AuthType): Promise<EntityResult> {

        // Create a new Promise to handle the asynchronous operation
        return new Promise<EntityResult>((resolve) => {

            // Initialize the result object
            const result: EntityResult = new EntityResult();

            const nucleusServer: NucleusServer = PropertyService.getNucleusServerProperties();
            const url = this._api.signIn.replaceAll('<tenant_code>', tenantCode);
            const httpsAgent = nucleusServer.strictSsl ? undefined : new https.Agent({ rejectUnauthorized: false });

            const payload: SigninPayload = {
                LoginId: loginId,
                Password: password,
                AuthorizeBy: authType,
            };

            const authSignIn = Buffer.from(`${appLoginId}:${appPassword}`).toString('base64');
            const headers: NucleusHeaders = {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${authSignIn}`,
            };

            this._logger?.debug(nucleusMessages.nucleusService.SignInRequest, { url, headers, payload });

            axios.post<NucleusAuthResponse>(url, payload, { headers, httpsAgent })
                .then((response) => {
                    const data = response.data;
                    if (response.status === 200 && (data?.EvCode === nucleusResponse.Success || data?.EvCodeApp === nucleusResponse.Success)) {
                        result.ResultType = EntityResultType.Success;
                        result.Response = data;
                    } else {
                        result.ResultType = EntityResultType.Failed;
                        result.Response = data;
                    }
                    this._logger?.debug(nucleusMessages.nucleusService.SignInResponse, { result });
                    resolve(result);
                })
                .catch((error: unknown) => {
                    result.ResultType = EntityResultType.Failed;
                    result.Response = error;
                    this._logger?.debug(nucleusMessages.nucleusService.SignInError, { error });
                    resolve(result);
                });

        });

    }

    public static validate(token: string, tenantCode: string, userRole: UserRole): Promise<EntityResult> {

        // Create a new Promise to handle the asynchronous operation
        return new Promise<EntityResult>((resolve) => {

            // Initialize the result object
            const result: EntityResult = new EntityResult();

            const url = this._api.validate.replaceAll('<tenant_code>', tenantCode);
            const lightServer: LightServer = PropertyService.getLightServerProperties();
            const httpsAgent = lightServer.strictSsl ? undefined : new https.Agent({ rejectUnauthorized: false });

            const data = qs.stringify({
                grant_type: 'authorization_code',
                auth_code: token,
                role: userRole,
            } as ValidatePayload);

            const authValidate = Buffer.from(`${lightServer.username}:${lightServer.password}`).toString('base64');
            const headers: NucleusHeaders = {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${authValidate}`,
            };

            this._logger?.debug(nucleusMessages.nucleusService.ValidateRequest, { url, headers });

            axios.post<NucleusTokenResponse>(url, data, { headers, httpsAgent })
                .then((response) => {
                    const resData = response.data;
                    if (response.status === 200 && (resData?.EvCodeApp === nucleusResponse.AuthenticationSuccess || resData?.EvCode === nucleusResponse.Success)) {
                        result.ResultType = EntityResultType.Success;
                        result.Response = resData;
                    } else {
                        result.ResultType = EntityResultType.Failed;
                        result.Response = resData;
                    }
                    this._logger?.debug(nucleusMessages.nucleusService.ValidateResponse, { result });
                    resolve(result);
                })
                .catch((error: unknown) => {
                    result.ResultType = EntityResultType.Failed;
                    result.Response = error;
                    this._logger?.debug(nucleusMessages.nucleusService.ValidateError, { error });
                    resolve(result);
                });

        });

    }

    /**
     * Returns the Nucleus API endpoints.
     * @returns The NucleusApi instance containing the API endpoints.
     */
    public static getApis(): NucleusApi {
        return this._api;
    }
}
