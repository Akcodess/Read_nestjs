import path from "path";

import { WIDGET } from "../../common/enums/widget.enum";
import { Application } from "../dtos/application.model";
import { LogAppender, ConsoleAppender, AppenderLayout, RollingFileAppender } from "../dtos/logger.model";
import { GravityServer, DarkServer } from "../dtos/server.model";
import { RateMeter, RateMeterApis } from "../dtos/widgets/rateMeter.model";

export class RateMeterProperties {

    private LOG_FILE_NAME: string = `rate_meter.log`;

    constructor() { }

    public static getProperties(widgetConfigs: any, appProperty: Application): RateMeter {
        const rateMeter: RateMeter = new RateMeter();
        if (widgetConfigs) {
            Object.assign(rateMeter, widgetConfigs[WIDGET.RateMeter]);
            rateMeter.apis = this.getApiProperties(appProperty);
            rateMeter.logAppender = this.getLogProperties(appProperty);
        }

        return rateMeter;
    }

    public static getApiProperties(appProperty: Application): RateMeterApis {
        const apis: RateMeterApis = new RateMeterApis();

        const gravityServer: GravityServer = appProperty.gravityServer;
        const gravityProtocol: string = gravityServer.isSsl === true ? 'https:' : 'http:';
        const gravityDomain: string = gravityServer.ipAddress + (gravityServer.port ? ':' + gravityServer.port : '');

        // https://192.168.60.192:8128/gravity/services/v1/e/aops?filters={"byaopstype":["Process"]}&limit=30&offset=0&includecount=true&orderby=[{"name":true}]
        apis.aops = `${gravityProtocol}//${gravityDomain}/gravity/services/v1/e/aops`;

        // https://192.168.60.192:8128/gravity/services/v1/e/aops/128/aopsproperties
        apis.aopsproperties = `${gravityProtocol}//${gravityDomain}/gravity/services/v1/e/aops/:id/aopsproperties`;

        // https://192.168.60.192:8128/gravity/services/v1/c/register
        apis.register = `${gravityProtocol}//${gravityDomain}/gravity/services/v1/c/register`;

        const darkServer: DarkServer = appProperty.darkServer;
        const darkProtocol: string = darkServer.isSsl === true ? 'https:' : 'http:';
        const darkDomain: string = darkServer.ipAddress + (darkServer.port ? ':' + darkServer.port : '');
        apis.dark = `${darkProtocol}//${darkDomain}/rest/dark`;

        apis.fetch = `${appProperty.name}/api/fetch`;
        apis.log = `${appProperty.name}/api/${WIDGET.RateMeter}/log`;
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
        rollingFileAppender.filename = path.join(process.cwd(), `logs/${WIDGET.RateMeter}-%DATE%.log`);
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
