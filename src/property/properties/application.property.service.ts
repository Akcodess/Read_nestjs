import path from "path";

import { Environment } from "../../common/enums/environment.enum";
import { WIDGET } from "../../common/enums/widget.enum";
import { ApplicationApis } from "../dtos/api.model";
import { Application } from "../dtos/application.model";
import { Database } from "../dtos/database.model";
import { GravityServer, NucleusServer, DarkServer, LightServer, RealmServer } from "../dtos/server.model";
import { Tenant } from "../dtos/tenant.model";
import { ExternalWidget } from "../dtos/widget.model";
import { AppenderLayout, ConsoleAppender, LogAppender, RollingFileAppender } from "../dtos/logger.model";
import { Certificate } from "../dtos/certificate.model";
const btoa = (str: string) => Buffer.from(str, 'utf-8').toString('base64');

export class ApplicationPropertyService {

    private static LOG_FILE_NAME: string = `app-%DATE%.log`;

    constructor() { }

    public static getAppProperties(properties: any): Application {
        const application: Application = new Application();
        if (properties) {
            application.name = properties["AppName"];
            this.LOG_FILE_NAME = `${application.name}-%DATE%.log`;
            application.port = properties["AppPort"];
            application.isSSL = properties["IsSsl"]?.toUpperCase() === "TRUE" ? true : false;
            application.strictSSL = properties["StrictSsl"]?.toUpperCase() === "TRUE" ? true : false;
            application.environment = properties["Environment"] || Environment.DEV;
            application.serveLogFiles = properties["ServeLogFiles"]?.toUpperCase() === "TRUE" ? true : false;
            application.enableUserAgent = properties["EnableUserAgent"]?.toUpperCase() === "TRUE" ? true : false;
            application.enableConsoleLog = properties["EnableConsoleLog"]?.toUpperCase() === "TRUE" ? true : false;
            application.enableServerLogging = properties["EnableServerLogging"]?.toUpperCase() === "TRUE" ? true : false;
            application.entityFetchLimit = parseInt(properties["EntityFetchLimit"]) || 20;
            application.maxLogSize = properties["MaxLogSize"];
            application.maxFiles = properties["MaxFiles"];
            application.logPattern = properties["LogPattern"];
            application.certificate = this.getAppCertificateProperties(properties);
            application.logAppender = this.getAppLogProperties(properties);
            application.gravityServer = this.getAppGravityServerProperties(properties);
            application.nucleusServer = this.getAppNucleusServerProperties(properties);
            application.darkServer = this.getAppDarkServerProperties(properties);
            application.realmServer = this.getAppRealmServerProperties(properties);
            application.lightServer = this.getAppLightServerProperties(properties);
            application.externalWidget = this.getExternalWidgets(properties);
            application.database = this.getDatabaseProperties(properties);

            application.apis = new ApplicationApis();
            application.apis.validate = `${application.name}/api/validate`;
            application.apis.signin = `${application.name}/api/signin`;
        }

        return application;
    }

    public static getAppCertificateProperties(properties: any): Certificate {
        const certificate: Certificate = new Certificate();
        if (properties) {
            certificate.crtFilePath = properties["CrtPath"];
            certificate.keyFilePath = properties["KeyPath"];
        }

        return certificate;
    }

    public static getAppGravityServerProperties(properties: any): GravityServer {
        const gravityServer: GravityServer = new GravityServer();
        if (properties) {
            gravityServer.ipAddress = properties["GravityIPAddress"];
            gravityServer.port = parseInt(properties["GravityPort"]) || 0;
            gravityServer.isSsl = properties["IsSsl"]?.toUpperCase() === "TRUE" ? true : false;
            gravityServer.strictSsl = properties["StrictSsl"]?.toUpperCase() === "TRUE" ? true : false;
            gravityServer.baseURL = properties["GravityBaseURL"];
        }

        return gravityServer;
    }

    public static getAppNucleusServerProperties(properties: any): NucleusServer {
        const nucleusServer: NucleusServer = new NucleusServer();
        if (properties) {
            nucleusServer.ipAddress = properties["NucleusIPAddress"];
            nucleusServer.port = parseInt(properties["NucleusPort"]) || 0;
            nucleusServer.version = properties["NucleusVersion"];
            nucleusServer.isSsl = properties["IsSsl"]?.toUpperCase() === "TRUE" ? true : false;
            nucleusServer.strictSsl = properties["StrictSsl"]?.toUpperCase() === "TRUE" ? true : false;
            nucleusServer.baseURL = properties["NucleusBaseURL"];
        }

        return nucleusServer;
    }

    public static getAppDarkServerProperties(properties: any): DarkServer {
        const darkServer: DarkServer = new DarkServer();
        if (properties) {
            darkServer.ipAddress = properties["DarkIPAddress"];
            darkServer.port = parseInt(properties["DarkPort"]) || 0;
            darkServer.isSsl = properties["IsSsl"]?.toUpperCase() === "TRUE" ? true : false;
            darkServer.strictSsl = properties["StrictSsl"]?.toUpperCase() === "TRUE" ? true : false;
            darkServer.baseURL = properties["DarkBaseURL"];
        }

        return darkServer;
    }

    public static getAppRealmServerProperties(properties: any): RealmServer {
        const realmServer: RealmServer = new RealmServer();
        if (properties) {
            realmServer.version = properties["RealmVersion"];
            realmServer.ipAddress = properties["RealmIPAddress"];
            realmServer.port = parseInt(properties["RealmPort"]) || 0;
            realmServer.isSsl = properties["IsSsl"]?.toUpperCase() === "TRUE" ? true : false;
            realmServer.strictSsl = properties["StrictSsl"]?.toUpperCase() === "TRUE" ? true : false;
            realmServer.baseURL = properties["RealmBaseURL"];
        }

        return realmServer;
    }

    public static getAppLightServerProperties(properties: any): LightServer {
        const lightServer: LightServer = new LightServer();
        if (properties) {
            lightServer.ipAddress = properties["LightIPAddress"];
            lightServer.port = parseInt(properties["LightPort"]) || 0;
            lightServer.isSsl = properties["LightIsSSL"]?.toUpperCase() === "TRUE" ? true : false;
            lightServer.strictSsl = properties["StrictSsl"]?.toUpperCase() === "TRUE" ? true : false;
            lightServer.username = properties["LightUsername"];
            lightServer.password = properties["LightPassword"];
        }

        return lightServer;
    }

    public static getDatabaseProperties(properties: any): Database {
        const database: Database = new Database();
        if (properties) {
            database.connectionLimit = parseInt(properties["DbConnectionLimit"]) || 10;
            database.database = properties["Database"];
            database.host = properties["DbHost"];
            database.idleTimeout = parseInt(properties["DbIdleTimeout"]) || 60000;
            database.maxIdle = parseInt(properties["DbMaxIdle"]) || 10;
            database.password = properties["DbPassword"];
            database.port = parseInt(properties["DbPort"]) || 3306;
            database.queueLimit = parseInt(properties["DbQueueLimit"]) || 10;
            database.user = properties["DbUser"];
            database.waitForConnections = properties["DbWaitForConnections"] === 'true' ? true : false;
        }

        return database;
    }

    public static getAppLogProperties(properties: any): LogAppender {
        const logAppender: LogAppender = new LogAppender();
        if (properties) {
            logAppender.consoleAppender = this.getAppConsoleLogProperties(properties);
            logAppender.rollingFileAppender = this.getAppRollingFileLogProperties(properties);
        }

        return logAppender;
    }

    public static getAppConsoleLogProperties(properties: any): ConsoleAppender {
        const consoleAppender: ConsoleAppender = new ConsoleAppender();
        if (properties) {
            consoleAppender.type = 'stdout';
            consoleAppender.layout = new AppenderLayout();
            consoleAppender.layout.pattern = properties["LogPattern"];
            consoleAppender.layout.type = 'pattern';
        }

        return consoleAppender;
    }

    public static getAppRollingFileLogProperties(properties: any): RollingFileAppender {
        const rollingFileAppender: RollingFileAppender = new RollingFileAppender();
        if (properties) {
            rollingFileAppender.filename = path.join(process.cwd(), `logs/${this.LOG_FILE_NAME}`);
            rollingFileAppender.maxLogSize = properties["MaxLogSize"];
            rollingFileAppender.backups = properties["MaxFiles"];
            rollingFileAppender.type = 'file';
            rollingFileAppender.compress = true;
            rollingFileAppender.layout = new AppenderLayout();
            rollingFileAppender.layout.pattern = properties["LogPattern"];
            rollingFileAppender.layout.type = 'pattern';
        }

        return rollingFileAppender;
    }

    public static getExternalWidgets(properties: any): ExternalWidget {
        return {
            RealTimeSentimentURL: properties["RealTimeSentimentWidgetUrl"] || ''
        };
    }

    public static getTenantProperties(widgetConfigs: any): Tenant[] {
        const tenants: Tenant[] = [];
        if (widgetConfigs) {
            Object.assign(tenants, widgetConfigs[WIDGET.Tenants]);
        }

        tenants?.forEach(tenant => {
            tenant.defaultPassword = btoa(tenant.defaultPassword)
        });

        return tenants;
    }
}
