import { Injectable } from '@nestjs/common';

import type { UserRole } from "../nucleus/types";
import { LightServer } from "../property/dtos/server.model";
import { LoggerService } from "../common/logger/logger.service";
import PropertyService from "../property/services/property.service";
import { IRequest } from "../property/constants/request.constant";
import type { LightServiceEntity, UserRegisterPayload, RegisterServicePayload, RegisteredEntityFetchPayload } from "./types";
import { messages as lightMessages } from "./constants/messages.constant";

@Injectable()
export class LightService {
    /** URL for the Light server connection */
    private static url: string;

    /** Logger instance for logging messages */
    private static _logger: LoggerService;

    /**
     * Private constructor to prevent instantiation.
     * Use static methods to interact with the service.
     */
    constructor() { }

    /**
     * Initializes the LightService with the provided logger.
     * Sets up the connection URL based on server properties.
     * @param logger - LoggerService instance for logging.
     */
    public static init(logger: LoggerService) {
        // Set the logger instance first and then log
        this._logger = logger;
        this._logger.info(lightMessages.lightService.Init);

        // Get the Light server properties and construct the URL
        const lightServer: LightServer = PropertyService.getLightServerProperties();
        const lightProtocol: string = lightServer.isSsl === true ? 'wss:' : 'ws:';
        const lightDomain: string = lightServer.ipAddress + (lightServer.port ? ':' + lightServer.port : '');
        this.url = `${lightProtocol}//${lightDomain}`;
        this._logger?.debug(lightMessages.lightService.Initialized);
    }

    /**
     * Returns the URL for the Light service.
     * @returns The URL as a string.
     */
    public static getLightServiceUrl(): string {
        return this.url;
    }

    /**
     * Returns the user register object for authentication.
     * @param token - The authentication token.
     * @param role - The user role.
     */
    public static getUserRegisterObject(token: string, role: UserRole, tenantCode: string): UserRegisterPayload {
        IRequest.Id++;
        return {
            ReqId: IRequest.Id,
            ReqType: IRequest.Type.Auth,
            ReqCode: IRequest.Code.UserRegister,
            AuthToken: token,
            UserRole: role,
            RemoteIP: "127.0.0.1",
            Device: "Chrome",
            TenantCode: tenantCode
        };
    }

    /**
     * Returns the register service object for a specific service entity.
     * @param serviceEntity - The service entity to register.
     */
    public static getRegisterServiceObject(serviceEntity: LightServiceEntity): RegisterServicePayload {
        IRequest.Id++;
        return {
            ReqId: IRequest.Id,
            ReqType: IRequest.Type.Activity,
            ReqCode: IRequest.Code.RegisterService,
            ServiceName: serviceEntity
        };
    }

    /**
     * Returns the registered service entity object for fetching details.
     * @param clientCode - The client code.
     * @param serviceEntity - The service entity to fetch.
     */
    public static getRegisteredServiceEntityObject(clientCode: string, serviceEntity: LightServiceEntity): RegisteredEntityFetchPayload {
        IRequest.Id++;
        return {
            ReqId: IRequest.Id,
            ReqType: IRequest.Type.Activity,
            ReqCode: IRequest.Code.RegisteredEntityFetch,
            TenantCode: clientCode,
            ServiceName: serviceEntity
        };
    }
}
