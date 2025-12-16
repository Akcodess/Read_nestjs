import { Injectable } from '@nestjs/common';
import axios from 'axios';
import https from 'https';

import { LoggerService } from '../common/logger/logger.service';
import PropertyService from '../property/services/property.service';
import { RealmApi } from '../property/dtos/realm.model';
import { RealmServer } from '../property/dtos/server.model';
import { EntityResult, EntityResultType } from '../property/dtos/result.model';
import { messages as realmMessages } from './constants/messages.constant';
import { realmResponse } from './constants/response.constant';
import type { RealmHeaders, RealmRegisterPayload, RealmApiResponse } from './types';

@Injectable()
export class RealmService {
    /** API endpoints for Realm service */
    private static _api: RealmApi;

    /** Default headers for API requests */
    private static _defaultHeaders: RealmHeaders = {
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
     * Initializes the RealmService with the provided logger.
     * Sets up the API endpoints based on server properties.
     * @param logger - LoggerService instance for logging.
     */
    public static init(logger: LoggerService) {
        this._logger = logger;
        this._logger?.info(realmMessages.realmService.Init);

        this._api = new RealmApi();
        const realmServer: RealmServer = PropertyService.getRealmServerProperties();
        const realmProtocol: string = realmServer.isSsl === true ? 'https:' : 'http:';
        const realmDomain: string = realmServer.ipAddress + (realmServer.port ? ':' + realmServer.port : '');
        const realmBaseUrl: string = realmServer.baseURL;
        this._api.register = `${realmProtocol}//${realmDomain}/${realmBaseUrl}/${realmServer.version}/register`;
        this._api.recordListSummaryFetch = `${realmProtocol}//${realmDomain}/${realmBaseUrl}/${realmServer.version}/campaign/:code/recordlist-summary`;
        this._api.campaignFetch = `${realmProtocol}//${realmDomain}/${realmBaseUrl}/${realmServer.version}/campaign`;
        this._logger?.debug(realmMessages.realmService.Initialized);
    }

    /**
     * Registers a user with the provided Nucleus token.
     * @param nucleusToken - The token for user registration.
     * @returns A promise that resolves to an EntityResult containing the registration response.
     */
    public static register(nucleusToken: string): Promise<EntityResult> {

        // Create a new Promise to handle the asynchronous operation
        return new Promise((resolve) => {

            // Initialize the result object
            const result: EntityResult = new EntityResult();

            // Get the Realm server properties from the PropertyService.
            const realmServer: RealmServer = PropertyService.getRealmServerProperties();

            // Set the options for the request, including the URL, headers, and payload.
            const options = {
                url: this._api.register,
                headers: this._defaultHeaders,
                strictSSL: realmServer.strictSsl,
                json: {
                    Token: nucleusToken,
                } as RealmRegisterPayload
            };

            this._logger?.debug(realmMessages.realmService.RegisterRequest, options);

            const httpsAgent = realmServer.strictSsl ? undefined : new https.Agent({ rejectUnauthorized: false });
            this._logger?.debug(realmMessages.realmService.RegisterRequest, { url: this._api.register, headers: this._defaultHeaders, payload: options.json });

            axios.post<RealmApiResponse | string>(this._api.register, options.json, { headers: this._defaultHeaders, httpsAgent })
                .then(({ data }) => {
                    let response: RealmApiResponse;
                    try {
                        response = typeof data === 'string' ? JSON.parse(data) : data;
                    } catch {
                        response = data as RealmApiResponse;
                    }

                    if (response?.RespType === realmResponse.Failed || response?.EvType === realmResponse.Failed) {
                        result.ResultType = EntityResultType.Failed;
                        result.Exception = response;
                    } else if (response?.RespType === realmResponse.Success || response?.EvType === realmResponse.Success) {
                        result.ResultType = EntityResultType.Success;
                        result.Response = response;
                    } else if (response?.RespType === realmResponse.AuthenticationSuccess || response?.EvType === realmResponse.AuthenticationSuccess) {
                        result.ResultType = EntityResultType.Success;
                        result.Response = response;
                    } else {
                        result.ResultType = EntityResultType.Success;
                        result.Response = response;
                    }
                    this._logger?.debug(realmMessages.realmService.RegisterResponse, { result });
                    resolve(result);
                })
                .catch((error: unknown) => {
                    result.ResultType = EntityResultType.Failed;
                    result.Exception = error;
                    this._logger?.debug(realmMessages.realmService.RegisterError, { error });
                    resolve(result);
                });
        });
    }

    /**
     * Fetches the record list summary for a specific campaign.
     * @param realmToken - The token for accessing the Realm service.
     * @param campaignCode - The code of the campaign to fetch the record list summary for.
     * @returns A promise that resolves to an EntityResult containing the record list summary response.
     */
    public static fetchRecordListSummary(realmToken: string, campaignCode: string): Promise<EntityResult> {

        // Create a new Promise to handle the registration process.
        return new Promise((resolve) => {

            // Initialize the result object to hold the response.
            const result: EntityResult = new EntityResult();

            // Get the Realm server properties from the PropertyService.
            const realmServer: RealmServer = PropertyService.getRealmServerProperties();

            // Set the options for the request, including the URL, headers, and strict SSL setting.
            const options = {
                url: this._api.recordListSummaryFetch.replace(":code", campaignCode),
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Key': realmToken
                } as RealmHeaders,
                strictSSL: realmServer.strictSsl
            };

            this._logger?.debug(realmMessages.realmService.FetchRequest, options);

            const httpsAgent2 = realmServer.strictSsl ? undefined : new https.Agent({ rejectUnauthorized: false });
            this._logger?.debug(realmMessages.realmService.FetchRequest, { url: options.url, headers: options.headers });

            axios.get<RealmApiResponse | string>(options.url, { headers: options.headers, httpsAgent: httpsAgent2 })
                .then(({ data }) => {
                    let response: RealmApiResponse;
                    try {
                        response = typeof data === 'string' ? JSON.parse(data) : data;
                    } catch {
                        response = data as RealmApiResponse;
                    }
                    if (response?.RespType === realmResponse.Failed || response?.EvType === realmResponse.Failed) {
                        result.ResultType = EntityResultType.Failed;
                        result.Exception = response;
                    } else if (response?.RespType === realmResponse.Success || response?.EvType === realmResponse.Success) {
                        result.ResultType = EntityResultType.Success;
                        result.Response = response;
                    } else if (response?.RespType === realmResponse.AuthenticationSuccess || response?.EvType === realmResponse.AuthenticationSuccess) {
                        result.ResultType = EntityResultType.Success;
                        result.Response = response;
                    } else {
                        result.ResultType = EntityResultType.Success;
                        result.Response = response;
                    }
                    this._logger?.debug(realmMessages.realmService.FetchResponse, { result });
                    resolve(result);
                })
                .catch((error: unknown) => {
                    result.ResultType = EntityResultType.Failed;
                    result.Exception = error;
                    this._logger?.debug(realmMessages.realmService.FetchError, { error });
                    resolve(result);
                });
        });

    }

    /**
     * Fetches all campaigns from the Realm service.
     * @param realmToken - The token for accessing the Realm service.
     * @returns A promise that resolves to an EntityResult containing the campaigns response.
     */
    public static fetchCampaigns(realmToken: string): Promise<EntityResult> {

        // Create a new Promise to handle the campaign fetching process.
        return new Promise((resolve) => {

            // Initialize the result object to hold the response.
            const result: EntityResult = new EntityResult();

            // Get the Realm server properties from the PropertyService.
            const realmServer: RealmServer = PropertyService.getRealmServerProperties();

            // Set the options for the request, including the URL, headers, and strict SSL setting.
            const options = {
                url: this._api.campaignFetch + `?orderby=[{"name":true}]`,
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Key': realmToken
                } as RealmHeaders,
                strictSSL: realmServer.strictSsl
            };

            this._logger?.debug(realmMessages.realmService.FetchCampaignRequest, options);

            const httpsAgent3 = realmServer.strictSsl ? undefined : new https.Agent({ rejectUnauthorized: false });
            this._logger?.debug(realmMessages.realmService.FetchCampaignRequest, { url: options.url, headers: options.headers });

            axios.get<RealmApiResponse | string>(options.url, { headers: options.headers, httpsAgent: httpsAgent3 })
                .then(({ data }) => {
                    let response: RealmApiResponse;
                    try {
                        response = typeof data === 'string' ? JSON.parse(data) : data;
                    } catch {
                        response = data as RealmApiResponse;
                    }
                    if (response?.RespType === realmResponse.Failed || response?.EvType === realmResponse.Failed) {
                        result.ResultType = EntityResultType.Failed;
                        result.Exception = response;
                    } else if (response?.RespType === realmResponse.Success || response?.EvType === realmResponse.Success) {
                        result.ResultType = EntityResultType.Success;
                        result.Response = response;
                    } else if (response?.RespType === realmResponse.AuthenticationSuccess || response?.EvType === realmResponse.AuthenticationSuccess) {
                        result.ResultType = EntityResultType.Success;
                        result.Response = response;
                    } else {
                        result.ResultType = EntityResultType.Success;
                        result.Response = response;
                    }
                    this._logger?.debug(realmMessages.realmService.FetchCampaignResponse, { result });
                    resolve(result);
                })
                .catch((error: unknown) => {
                    result.ResultType = EntityResultType.Failed;
                    result.Exception = error;
                    this._logger?.debug(realmMessages.realmService.FetchCampaignError, { error });
                    resolve(result);
                });
        });

    }

    /**
         * Returns the API endpoints for the Realm service.
         * @returns The RealmApi instance containing the API endpoints.
         */
    public static getApis(): RealmApi {
        return this._api;
    }
}
