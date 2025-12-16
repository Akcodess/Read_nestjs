import path from "path";

import { AverageHandleSummaryApis, AverageHandleSummaryLive } from "../dtos/widgets/avg.model";
import { WIDGET } from "../../common/enums/widget.enum";
import { LogAppender, ConsoleAppender, AppenderLayout, RollingFileAppender } from "../dtos/logger.model";
import { NucleusServer } from "../dtos/server.model";
import { Application } from "../dtos/application.model";

export class AverageHandleSummaryLiveProperties {

    constructor() { }

    public static getProperties(widgetConfigs: any, appProperty: Application): AverageHandleSummaryLive {
        const averageHandleSummaryLive: AverageHandleSummaryLive = new AverageHandleSummaryLive();
        if (widgetConfigs) {
            Object.assign(averageHandleSummaryLive, widgetConfigs[WIDGET.AverageHandleSummaryLive]);
            averageHandleSummaryLive.apis = this.getApiProperties(appProperty);
            averageHandleSummaryLive.logAppender = this.getLogProperties(appProperty)
        }

        return averageHandleSummaryLive;
    }

    public static getApiProperties(appProperty: Application): AverageHandleSummaryApis {
        const apis: AverageHandleSummaryApis = new AverageHandleSummaryApis();

        const nucleusServer: NucleusServer = appProperty.nucleusServer;
        const nucleusProtocol: string = nucleusServer.isSsl === true ? 'https:' : 'http:';
        const nucleusDomain: string = nucleusServer.ipAddress + (nucleusServer.port ? ':' + nucleusServer.port : '');
        apis.validate = `${nucleusProtocol}//${nucleusDomain}/nucleus/services/v1/validate`;
        apis.signin = `${nucleusProtocol}//${nucleusDomain}/nucleus/services/v1/tenant/<tenant-code>/sign-in`;
        apis.fetch = `${appProperty.name}/api/fetch`;
        apis.log = `${appProperty.name}/api/${WIDGET.AverageHandleSummaryLive}/log`;
        apis.validate = `${appProperty.name}/api/validate`;

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
        rollingFileAppender.filename = path.join(process.cwd(), `logs/${WIDGET.AverageHandleSummaryLive}-%DATE%.log`);
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

