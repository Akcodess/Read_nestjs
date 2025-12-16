import express from "express";
import { EntityRequestProcessor } from "../processors/request/entity.request.processor";
import { CipherRequestProcessor } from "../processors/request/cipher.request.processor";
import { PropertyRequestProcessor } from "../processors/request/property.request.processor";
import { LoggerService } from "./logger.service";
import { ExternalRequestProcessor } from "../processors/request/external.request.processor";
import { ResponseProcessor } from "../processors/response/response.processor";
import { IResponse } from "../constants/response.constant";
import * as httpstatus from "http-status-codes";

/**
 * APIService is a singleton class that initializes and manages various APIs for the application.
 * It provides methods to set up routes for fetching properties, encrypting/decrypting data,
 * encoding/decoding tokens, and handling external service requests.
 */
export class APIService {

    // Singleton instance of LoggerService for logging purposes
    private static _logger: LoggerService;

    // Router instance to define API endpoints
    private static _router: any;

    /* Private constructor to prevent instantiation of the class.
     * This ensures that APIService is a singleton and can only be initialized once.
     */
    constructor() { }

    /**
     * Initializes the APIService with a LoggerService instance.
     * This method should be called before any API routes are defined.
     * @param logger - An instance of LoggerService for logging.
     */
    public static init(logger: LoggerService) {
        this._logger?.debug(`API Service >>> Initializing`)
        this._logger = logger;
        this._logger?.debug(`API Service >>> Initialized`)
    }

    /**
     * Sets the router instance for the APIService.
     * This method should be called to provide the router where API routes will be defined.
     * @param router - An Express router instance.
     */
    public static initRouter(router: any) {
        this._logger?.debug(`API Service >>> Initializing API Router`)
        this._router = router;
        this._logger?.debug(`API Service >>> API Router initialized`)
    }

    /**
     * Initializes all API endpoints.
     * This method sets up the routes for various APIs such as fetching properties,
     * encrypting/decrypting data, encoding/decoding tokens, and handling external service requests.
     */
    public static initAPIs() {
        this._logger?.debug(`API Service >>> Initializing APIs`)

        // Initialize fetch properties api endpoint
        this.fetchPropertiesAPI();

        // Initialize fetch all properties api endpoint
        this.fetchAllPropertiesAPI();

        // Initialize encrypt api endpoint
        this.encryptAPI();

        // Initialize decrypt api endpoint
        this.decryptAPI();

        // Initialize encode api endpoint
        this.encodeAPI();

        // Initialize decode api endpoint
        this.decodeAPI();

        // Initialize token api endpoint
        this.tokenAPI();

        // Initialize encodetoken api endpoint
        this.encodetokenAPI();

        // Initialize fetch api endpoint
        this.fetchAPI();

        // Initialize edit api endpoint
        this.editAPI();

        // Initialize signin api endpoint (to authenticate token using user token)
        this.signInAPI();

        // Initialize validate api endpoint
        this.validateAPI();

        // Initialize service sign-in api endpoint
        this.serviceSignInAPI();

        // Initialize service sign-out api endpoint
        this.serviceSignOutAPI();

        this._logger?.debug(`API Service >>> APIs initialized`)
    }

    /**
     * Returns the router instance containing fetch properties API routes.
     * This method should be called to get the router for use in the Express application.
     * @returns The Express router instance with API routes defined.
     */
    private static fetchPropertiesAPI() {
        this._logger?.debug(`API Service >>> Initializing Fetch Properties API`)

        this._router.post('/api/properties', async (request: express.Request, response: express.Response) => {
            this._logger?.debug(`API Service >>> Request >>> Fetch Properties`, JSON.stringify(request?.body));

            // Process the request to fetch properties
            var serverResponse = await PropertyRequestProcessor.fetchProperties(request, response);
            if (!serverResponse?.Entities || serverResponse?.Entities.length === 0) {

                // If no properties found, set an error response
                ResponseProcessor.setError('No properties found', IResponse.Code.EntityFetchFailed, httpstatus.OK, serverResponse);
            }
            this._logger?.debug(`API Service >>> Response >>> Fetch Properties`, JSON.stringify(serverResponse));

            // Return the server response as JSON
            return response.json(serverResponse);
        });
        this._logger?.debug(`API Service >>> Fetch Properties API initialized`)
    }

    /**
     * Returns the router instance containing fetch all properties API routes.
     * This method should be called to get the router for use in the Express application.
     * @returns The Express router instance with API routes defined.
     */
    private static fetchAllPropertiesAPI() {
        this._logger?.debug(`API Service >>> Initializing Fetch All Properties API`)

        this._router.get('/api/allproperties', async (request: express.Request, response: express.Response) => {
            this._logger?.debug(`API Service >>> Request >>> Fetch All Properties`, JSON.stringify(request?.body));

            // Process the request to fetch all properties
            var serverResponse = await PropertyRequestProcessor.fetchAllProperties(request, response);
            this._logger?.debug(`API Service >>> Response >>> Fetch Properties`, JSON.stringify(serverResponse));

            // Return the server response as JSON
            return response.json(serverResponse);
        });
        this._logger?.debug(`API Service >>> Fetch All Properties API initialized`)
    }

    /**
     * Initializes the Encrypt API endpoint.
     * This method sets up the route for encrypting data.
     */
    private static encryptAPI() {
        this._logger?.debug(`API Service >>> Initializing Encrypt API`)

        this._router.post('/api/encrypt', async (request: express.Request, response: express.Response) => {
            this._logger?.debug(`API Service >>> Request >>> Encrypt`, JSON.stringify(request?.body));

            // Process the request to encrypt data
            var serverResponse = await CipherRequestProcessor.encrypt(request, response);
            this._logger?.debug(`API Service >>> Response >>> Encrypt`, JSON.stringify(serverResponse));

            // Return the server response as JSON
            return response.json(serverResponse);
        });
        this._logger?.debug(`API Service >>> Encrypt API initialized`)
    }

    /**
     * Initializes the Decrypt API endpoint.
     * This method sets up the route for decrypting data.
     */
    private static decryptAPI() {
        this._logger?.debug(`API Service >>> Initializing Decrypt API`)

        this._router.post('/api/decrypt', async (request: express.Request, response: express.Response) => {
            this._logger?.debug(`API Service >>> Request >>> Decrypt`, JSON.stringify(request?.body));

            // Process the request to decrypt data
            var serverResponse = await CipherRequestProcessor.decrypt(request, response);
            this._logger?.debug(`API Service >>> Response >>> Decrypt`, JSON.stringify(serverResponse));

            // Return the server response as JSON
            return response.json(serverResponse);
        });
        this._logger?.debug(`API Service >>> Decrypt API initialized`)
    }

    /**
     * Initializes the Encode API endpoint.
     * This method sets up the route for encoding data.
     */
    private static encodeAPI() {
        this._logger?.debug(`API Service >>> Initializing Encode API`)

        this._router.get('/api/encode', async (request: express.Request, response: express.Response) => {
            this._logger?.debug(`API Service >>> Request >>> Encode`, JSON.stringify(request?.body));

            // Process the request to encode data
            var serverResponse = await CipherRequestProcessor.encode(request, response);
            this._logger?.debug(`API Service >>> Response >>> Encode`, JSON.stringify(serverResponse));

            // Return the server response as JSON
            return response.json(serverResponse);
        });
        this._logger?.debug(`API Service >>> Encode API initialized`)
    }

    /**
     * Initializes the Decode API endpoint.
     * This method sets up the route for decoding data.
     */
    private static decodeAPI() {
        this._logger?.debug(`API Service >>> Initializing Decode API`)

        this._router.get('/api/decode', async (request: express.Request, response: express.Response) => {
            this._logger?.debug(`API Service >>> Request >>> Decode`, JSON.stringify(request?.body));

            // Process the request to decode data
            var serverResponse = await CipherRequestProcessor.decode(request, response);
            this._logger?.debug(`API Service >>> Response >>> Decode`, JSON.stringify(serverResponse));

            // Return the server response as JSON
            return response.json(serverResponse);
        });
        this._logger?.debug(`API Service >>> Decode API initialized`)
    }

    /**
     * Initializes the Token API endpoint.
     * This method sets up the route for handling token requests.
     */
    private static tokenAPI() {
        this._logger?.debug(`API Service >>> Initializing Token API`)

        this._router.post('/api/token', async (request: express.Request, response: express.Response) => {
            this._logger?.debug(`API Service >>> Request >>> Token`, JSON.stringify(request?.body));

            // Process the request to handle token
            var serverResponse = await CipherRequestProcessor.token(request, response);
            this._logger?.debug(`API Service >>> Response >>> Token`, JSON.stringify(serverResponse));

            // Return the server response as JSON
            return response.json(serverResponse);
        });
        this._logger?.debug(`API Service >>> Token API initialized`)
    }

    /**
     * Initializes the Encode Token API endpoint.
     * This method sets up the route for encoding tokens.
     */
    private static encodetokenAPI() {
        this._logger?.debug(`API Service >>> Initializing Encode Token API`)

        this._router.post('/api/encodetoken', async (request: express.Request, response: express.Response) => {
            this._logger?.debug(`API Service >>> Request >>> Encode token`, JSON.stringify(request?.body));

            // Process the request to encode token
            var serverResponse = await CipherRequestProcessor.encodetoken(request, response);
            this._logger?.debug(`API Service >>> Response >>> Encode token`, JSON.stringify(serverResponse));

            // Return the server response as JSON
            return response.json(serverResponse);
        });
        this._logger?.debug(`API Service >>> Encode Token API initialized`)
    }

    /**
     * Initializes the Fetch API endpoint.
     * This method sets up the route for fetching data from the server.
     */
    private static fetchAPI() {
        this._logger?.debug(`API Service >>> Initializing Fetch API`)

        this._router.post('/api/fetch', async (request: express.Request, response: express.Response) => {
            this._logger?.debug(`API Service >>> Request >>> Fetch`, JSON.stringify(request?.body));

            // Process the request to fetch data
            var serverResponse = await EntityRequestProcessor.fetch(request, response);
            this._logger?.debug(`API Service >>> Response >>> Fetch`, JSON.stringify(serverResponse));

            // If no entities found, set an error response
            return response.json(serverResponse);
        });
        this._logger?.debug(`API Service >>> Fetch API initialized`)
    }

    /**
     * Initializes the Edit API endpoint.
     * This method sets up the route for editing data on the server.
     */
    private static editAPI() {
        this._logger?.debug(`API Service >>> Initializing Edit API`)

        this._router.post('/api/edit', async (request: express.Request, response: express.Response) => {
            this._logger?.debug(`API Service >>> Request >>> Edit`, JSON.stringify(request?.body));

            // Process the request to edit data
            var serverResponse = await EntityRequestProcessor.edit(request, response);
            this._logger?.debug(`API Service >>> Response >>> Edit`, JSON.stringify(serverResponse));

            // If no entities found, set an error response
            return response.json(serverResponse);
        });
        this._logger?.debug(`API Service >>> Edit API initialized`)
    }

    /**
     * Initializes the SignIn API endpoint for external services.
     * This method sets up the route for handling sign-in requests.
     */
    private static serviceSignInAPI() {
        this._logger?.debug(`API Service >>> Initializing SignIn API`)
        this._router.post('/services/signin', async (request: express.Request, response: express.Response) => {
            this._logger?.debug(`API Service >>> Request >>> SignIn`, JSON.stringify(request?.body));
            var serverResponse = await ExternalRequestProcessor.signIn(request, response);
            this._logger?.debug(`API Service >>> Response >>> SignIn`, JSON.stringify(serverResponse));
            return response.json(serverResponse);
        });
        this._logger?.debug(`API Service >>> SignIn API initialized`)
    }

    /**
     * Initializes the SignOut API endpoint for external services.
     * This method sets up the route for handling sign-out requests.
     */
    private static serviceSignOutAPI() {
        this._logger?.debug(`API Service >>> Initializing SignOut API`)

        this._router.post('/services/signout', async (request: express.Request, response: express.Response) => {
            this._logger?.debug(`API Service >>> Request >>> SignOut`, JSON.stringify(request?.body));
            var serverResponse = await ExternalRequestProcessor.signOut(request, response);
            this._logger?.debug(`API Service >>> Response >>> SignOut`, JSON.stringify(serverResponse));
            return response.json(serverResponse);
        });
        this._logger?.debug(`API Service >>> SignOut API initialized`)
    }

    /**
     * Initializes the SignIn API endpoint.
     * This method sets up the route for handling sign-in requests using user tokens.
     */
    private static signInAPI() {
        this._logger?.debug(`API Service >>> Initializing SignIn API`)
        this._router.post('/api/signin', async (request: express.Request, response: express.Response) => {
            this._logger?.debug(`API Service >>> Request >>> SignIn`, JSON.stringify(request?.body));
            var serverResponse = await EntityRequestProcessor.signIn(request, response);
            this._logger?.debug(`API Service >>> Response >>> SignIn`, JSON.stringify(serverResponse));
            return response.json(serverResponse);
        });
        this._logger?.debug(`API Service >>> SignIn API initialized`)
    }

    /**
     * Initializes the Validate API endpoint.
     * This method sets up the route for validating data on the server.
     */
    private static validateAPI() {
        this._logger?.debug(`API Service >>> Initializing Validate API`)
        this._router.post('/api/validate', async (request: express.Request, response: express.Response) => {
            this._logger?.debug(`API Service >>> Request >>> Validate`, JSON.stringify(request?.body));
            var serverResponse = await EntityRequestProcessor.validate(request, response);
            this._logger?.debug(`API Service >>> Response >>> Validate`, JSON.stringify(serverResponse));
            return response.json(serverResponse);
        });
        this._logger?.debug(`API Service >>> Validate API initialized`)
    }
}