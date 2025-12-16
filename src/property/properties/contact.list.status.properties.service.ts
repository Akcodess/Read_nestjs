import path from "path";

import { WIDGET } from "../../common/enums/widget.enum";
import { Application } from "../dtos/application.model";
import { LogAppender, ConsoleAppender, AppenderLayout, RollingFileAppender } from "../dtos/logger.model";
import { GravityServer, DarkServer, RealmServer } from "../dtos/server.model";
import { ContactListStatus, ContactListStatusApis } from "../dtos/widgets/contactList.model";

export class ContactListStatusProperties {

    private LOG_FILE_NAME: string = `contact_list_status.log`;

    constructor() { }

    public static getProperties(widgetConfigs: any, appProperty: Application): ContactListStatus {
        const contactListStatus: ContactListStatus = new ContactListStatus();
        if (widgetConfigs) {
            Object.assign(contactListStatus, widgetConfigs[WIDGET.ContactListStatus]);
            contactListStatus.apis = this.getApiProperties(appProperty);
            contactListStatus.logAppender = this.getLogProperties(appProperty);
        }

        return contactListStatus;
    }

    public static getApiProperties(appProperty: Application): ContactListStatusApis {
        const apis: ContactListStatusApis = new ContactListStatusApis();

        const gravityServer: GravityServer = appProperty.gravityServer;
        const gravityProtocol: string = gravityServer.isSsl === true ? 'https:' : 'http:';
        const gravityDomain: string = gravityServer.ipAddress + (gravityServer.port ? ':' + gravityServer.port : '');

        // https://192.168.60.192:8128/gravity/services/v1/e/aops?filters={"byaopstype":["Process"]}&limit=30&offset=0&includecount=true&orderby=[{"name":true}]
        apis.fetchAOPs = `${gravityProtocol}//${gravityDomain}/gravity/services/v1/e/aops`;

        // https://192.168.60.192:8128/gravity/services/v1/e/aops/128/aopsproperties
        apis.fetchAOPsProperties = `${gravityProtocol}//${gravityDomain}/gravity/services/v1/e/aops/:id/aopsproperties`;

        // https://192.168.60.192:8128/gravity/services/v1/c/register
        apis.register = `${gravityProtocol}//${gravityDomain}/gravity/services/v1/c/register`;

        const darkServer: DarkServer = appProperty.darkServer;
        const darkProtocol: string = darkServer.isSsl === true ? 'https:' : 'http:';
        const darkDomain: string = darkServer.ipAddress + (darkServer.port ? ':' + darkServer.port : '');
        apis.dark = `${darkProtocol}//${darkDomain}/rest/dark`;

        const realmServer: RealmServer = appProperty.realmServer;
        const realmProtocol: string = realmServer.isSsl === true ? 'https:' : 'http:';
        const realmDomain: string = realmServer.ipAddress + (realmServer.port ? ':' + realmServer.port : '');
        apis.realmRegister = `${realmProtocol}//${realmDomain}/realm/services/${realmServer.version}/register`;
        apis.realmFetchContactListSummary = `${realmProtocol}//${realmDomain}/realm/services/${realmServer.version}/campaign/<campaign_code>/recordlist-summary`;

        apis.fetch = `${appProperty.name}/api/fetch`;
        apis.log = `${appProperty.name}/api/${WIDGET.ContactListStatus}/log`;
        apis.validate = `${appProperty.name}/api/validate`;
        apis.signin = `${appProperty.name}/api/signin`;
        return apis;
    }

    public static getLogProperties(appProperty: Application): LogAppender {
        const logAppender: LogAppender = new LogAppender();
        logAppender.consoleAppender = this.getConsoleLogProperties(appProperty);
        logAppender.rollingFileAppender = this.getRollingFileLogProperties(appProperty);
        return logAppender;
    }

    public static getConsoleLogProperties(appProperty: Application): ConsoleAppender {
        const consoleAppender: ConsoleAppender = new ConsoleAppender();
        consoleAppender.type = 'stdout';
        consoleAppender.layout = new AppenderLayout();
        consoleAppender.layout.pattern = appProperty.logPattern;
        consoleAppender.layout.type = 'pattern';
        return consoleAppender;
    }

    public static getRollingFileLogProperties(appProperty: Application): RollingFileAppender {
        const rollingFileAppender: RollingFileAppender = new RollingFileAppender();
        rollingFileAppender.filename = path.join(process.cwd(), `logs/${WIDGET.ContactListStatus}-%DATE%.log`);
        rollingFileAppender.maxLogSize = appProperty.maxLogSize;
        rollingFileAppender.backups = appProperty.maxFiles;
        rollingFileAppender.type = 'file';
        rollingFileAppender.compress = true;
        rollingFileAppender.layout = new AppenderLayout();
        rollingFileAppender.layout.pattern = appProperty.logPattern;
        rollingFileAppender.layout.type = 'pattern';

        return rollingFileAppender;
    }
}
