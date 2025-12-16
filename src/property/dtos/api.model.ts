/**
 * The `ApplicationApis` class holds a collection of API endpoint URLs as string properties.
 * Each property corresponds to a specific API functionality, such as registration, validation, 
 * fetching data, or logging. The class structure allows for easy access and management of these
 * endpoints within an application.
 */
export class ApplicationApis {
    register!: string;
    validate!: string;
    signin!: string;
    registerSvc!: string;
    fetch!: string;
    log!: string;
}