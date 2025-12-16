import { Injectable } from '@nestjs/common';
import axios from 'axios';
import https from 'https';

import { EntityResult, EntityResultType } from "../property/dtos/result.model";
import { DarkApi } from "../property/dtos/dark.model";
import { DarkServer } from "../property/dtos/server.model";
import PropertyService from "../property/services/property.service";
import { IRequest } from "../property/constants/request.constant";
import { LoggerService } from "../common/logger/logger.service";
import { messages as darkMessages } from "./constants/messages.constant";
import type { DarkHeaders, RegisterPayload, AOPsStatusPayload, PredictiveDialerStatusPayload, DarkApiResponse } from "./types";
import { darkResponse } from "./constants/response.constant";

@Injectable()
export class DarkService {
    // Static properties to hold the API instance.
    private static _api: DarkApi;

    // Default headers for requests to the Dark server.
    private static _defaultHeaders: DarkHeaders = {
        'Content-Type': 'application/json'
    };

    // Logger instance for logging debug messages.
    private static _logger: LoggerService;

    /**
     * Initializes the DarkService with a LoggerService instance.
     * This method should be called before using any other methods in this service.
     * @param logger - An instance of LoggerService for logging debug messages.
     */
    constructor() { }

    /**
     * Initializes the DarkService and its dependencies.
     * This method sets up the logger, initializes properties, and configures the Dark API.
     * @param logger - An instance of LoggerService for logging debug messages.
     */
    public static init(logger: LoggerService) {
        // Set the logger instance for logging debug messages.
        this._logger = logger;
        this._logger.info(darkMessages.darkService.Init);

        // Initialize the Dark API with the server properties.
        this._api = new DarkApi();
        const darkServer: DarkServer = PropertyService.getDarkServerProperties();
        const darkProtocol: string = darkServer.isSsl === true ? 'https:' : 'http:';
        const darkDomain: string = darkServer.ipAddress + (darkServer.port ? ':' + darkServer.port : '');
        const darkBaseUrl: string = darkServer.baseURL;
        this._api.register = `${darkProtocol}//${darkDomain}/${darkBaseUrl}`;
        this._api.fetch = `${darkProtocol}//${darkDomain}/${darkBaseUrl}`;

        this._logger.debug(darkMessages.darkService.Initialized);
    }

    /**
     * Registers a user with the Dark server.
     * @param nucleusToken - The token for the user to be registered.
     * @param userRole - The role of the user to be registered.
     * @returns A Promise that resolves to an EntityResult containing the registration result.
     */
    public static register(nucleusToken: string, userRole: string): Promise<EntityResult> {

        // Create a new Promise to handle the registration process.
        return new Promise<EntityResult>((resolve) => {

            // Initialize the result object to hold the registration outcome.
            const result: EntityResult = new EntityResult();

            // Get the Dark server properties from the PropertyService.
            const darkServer: DarkServer = PropertyService.getDarkServerProperties();

            // Increment the request ID for tracking.
            IRequest.Id++;

            // Set the payload for the request.
            const payload: RegisterPayload = {
                ReqId: IRequest.Id,
                ReqType: IRequest.Type.Auth,
                ReqCode: IRequest.Code.UserRegister,
                RemoteIP: "127.0.0.1",
                AccessToken: nucleusToken,
                UserRole: userRole,
                ForceLogoutActiveSessions: false
            };

            const httpsAgent = darkServer.strictSsl ? undefined : new https.Agent({ rejectUnauthorized: false });
            this._logger.debug(darkMessages.darkService.RegisterRequest, { _api: this._api.register, defaultHeaders: this._defaultHeaders, payload });

            axios.post<DarkApiResponse | string>(this._api.register, payload, { headers: this._defaultHeaders, httpsAgent })
                .then(({ data }) => {
                    let response: DarkApiResponse = {};
                    try {
                        response = typeof data === 'string' ? JSON.parse(data) : data;
                    } catch {
                        response = (data as DarkApiResponse);
                    }
                    if (response?.RespType === darkResponse.Failed || response?.EvType === darkResponse.Failed) {
                        result.ResultType = EntityResultType.Failed;
                        result.Exception = response;
                    } else {
                        result.ResultType = EntityResultType.Success;
                        result.Response = response;
                    }
                    this._logger.debug(darkMessages.darkService.RegisterResponse, { result });
                    resolve(result);
                })
                .catch((error: unknown) => {
                    result.ResultType = EntityResultType.Failed;
                    result.Exception = error;
                    this._logger.debug(darkMessages.darkService.RegisterError, { error });
                    resolve(result);
                });
        });
    }

    /**
     * Fetches the status of AOPs (Automated Outbound Processes) from the Dark server.
     * @param darkToken - The access token for the Dark server.
     * @param aopsId - The ID of the AOPs to fetch the status for.
     * @returns A Promise that resolves to an EntityResult containing the AOPs status.
     */
    public static fetchAOPsStatus(darkToken: string, aopsId: string | number): Promise<EntityResult> {

        // Create a new Promise to handle the fetching of AOPs status.
        return new Promise<EntityResult>((resolve) => {

            // Initialize the result object to hold the response.
            const result: EntityResult = new EntityResult();

            // Increment the request ID for tracking.
            IRequest.Id++;

            // Get the Dark server properties from the PropertyService.
            const darkServer: DarkServer = PropertyService.getDarkServerProperties();

            // Set the headers for the request, including the access token and request ID.
            const _headers: DarkHeaders = { ...this._defaultHeaders };
            _headers['access_token'] = darkToken;
            _headers['req_id'] = IRequest.Id;

            // Set the payload for the request, including the request ID, type, code, and AOPs ID.
            const payload: AOPsStatusPayload = {
                ReqId: IRequest.Id,
                ReqType: IRequest.Type.Control,
                ReqCode: IRequest.Code.AOPsStatFetch,
                AOPsId: aopsId
            };

            const httpsAgent2 = darkServer.strictSsl ? undefined : new https.Agent({ rejectUnauthorized: false });
            this._logger.debug(darkMessages.darkService.FetchAOPsRequest, { url: this._api.fetch, headers: _headers, payload });

            axios.post<DarkApiResponse | string>(this._api.fetch, payload, { headers: _headers, httpsAgent: httpsAgent2 })
                .then(({ data }) => {
                    let response: DarkApiResponse = {};
                    try {
                        response = typeof data === 'string' ? JSON.parse(data) : data;
                    } catch {
                        response = (data as DarkApiResponse);
                    }
                    if (response?.RespType === darkResponse.Failed || response?.EvType === darkResponse.Failed) {
                        result.ResultType = EntityResultType.Failed;
                        result.Exception = response;
                    } else {
                        result.ResultType = EntityResultType.Success;
                        result.Response = response;
                    }
                    this._logger.debug(darkMessages.darkService.FetchAOPsResponse, { result });
                    resolve(result);
                })
                .catch((error: unknown) => {
                    result.ResultType = EntityResultType.Failed;
                    result.Exception = error;
                    this._logger.debug(darkMessages.darkService.FetchAOPsError, { error });
                    resolve(result);
                });
        });
    }

    /**
     * Fetches the status of the Predictive Dialer from the Dark server.
     * @param darkToken - The access token for the Dark server.
     * @param aopsId - The ID of the AOPs to fetch the Predictive Dialer status for.
     * @returns A Promise that resolves to an EntityResult containing the Predictive Dialer status.
     */
    public static fetchPredictiveDialerStatus(darkToken: string, aopsId: string | number): Promise<EntityResult> {

        // Create a new Promise to handle the fetching of Predictive Dialer status.
        return new Promise<EntityResult>((resolve) => {

            // Initialize the result object to hold the response.
            const result: EntityResult = new EntityResult();

            // Increment the request ID for tracking.
            IRequest.Id++;

            // Get the Dark server properties from the PropertyService.
            const darkServer: DarkServer = PropertyService.getDarkServerProperties();

            // Set the headers for the request, including the access token and request ID.
            const _headers: DarkHeaders = { ...this._defaultHeaders };
            _headers['access_token'] = darkToken;
            _headers['req_id'] = IRequest.Id;

            // Set the payload for the request, including the request ID, type, code, and AOPs ID.
            const payload: PredictiveDialerStatusPayload = {
                ReqId: IRequest.Id,
                ReqType: IRequest.Type.Control,
                ReqCode: IRequest.Code.PredictiveDialerStatusFetch,
                CampaignId: aopsId
            };

            const httpsAgent3 = darkServer.strictSsl ? undefined : new https.Agent({ rejectUnauthorized: false });
            this._logger.debug(darkMessages.darkService.FetchPredictiveDialerRequest, { url: this._api.fetch, headers: _headers, payload });

            axios.post<DarkApiResponse | string>(this._api.fetch, payload, { headers: _headers, httpsAgent: httpsAgent3 })
                .then(({ data }) => {
                    let response: DarkApiResponse = {};
                    try {
                        response = typeof data === 'string' ? JSON.parse(data) : data;
                    } catch {
                        response = (data as DarkApiResponse);
                    }
                    if (response?.RespType === darkResponse.Failed || response?.EvType === darkResponse.Failed) {
                        result.ResultType = EntityResultType.Failed;
                        result.Exception = response;
                    } else {
                        result.ResultType = EntityResultType.Success;
                        result.Response = response;
                    }
                    this._logger.debug(darkMessages.darkService.FetchPredictiveDialerResponse, { result });
                    resolve(result);
                })
                .catch((error: unknown) => {
                    result.ResultType = EntityResultType.Failed;
                    result.Exception = error;
                    this._logger.debug(darkMessages.darkService.FetchPredictiveDialerError, { error });
                    resolve(result);
                });
        });
    }

    /**
     * Fetches the APIs available in the Dark service.
     * @returns 
     */
    public static getApis(): DarkApi {
        return this._api;
    }

}
