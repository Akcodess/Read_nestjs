import { Environment } from "../../common/enums/environment.enum";
import { ApplicationApis } from "./api.model";
import { Certificate } from "./certificate.model";
import { Database } from "./database.model";
import { LogAppender } from "./logger.model";
import { DarkServer, GravityServer, LightServer, NucleusServer, RealmServer } from "./server.model";
import { Tenant } from "./tenant.model";
import { ExternalWidget } from "./widget.model";

export class Application {
    name!: string;
    port!: number;
    isSSL!: boolean;
    strictSSL!: boolean;
    environment!: Environment;
    entityFetchLimit!: number;
    certificate!: Certificate;
    logAppender!: LogAppender;
    serveLogFiles!: boolean;
    enableUserAgent!: boolean;
    enableServerLogging!: boolean;
    enableConsoleLog!: boolean;
    maxLogSize!: any;
    maxFiles!: any;
    logPattern!: any;
    gravityServer!: GravityServer;
    nucleusServer!: NucleusServer;
    darkServer!: DarkServer;
    realmServer!: RealmServer;
    lightServer!: LightServer;
    externalWidget!: ExternalWidget;
    tenants!: Tenant[];
    database!: Database;
    apis!: ApplicationApis;
}