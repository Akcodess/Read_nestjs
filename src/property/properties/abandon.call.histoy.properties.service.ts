import path from "path";

import { WIDGET } from "../../common/enums/widget.enum";
import { Application } from "../dtos/application.model";
import { DarkServer } from "../dtos/server.model";
import { AppenderLayout, ConsoleAppender, LogAppender, RollingFileAppender } from "../dtos/logger.model";
import { AbandonCallHistory, AbandonCallHistoryApis } from "../dtos/widgets/abandonCallHistory.model";

export class AbandonCallHistoryProperties {

    constructor() { }

    public static getProperties(widgetConfigs: any, appProperty: Application): AbandonCallHistory {
        const abandonCallHistory: AbandonCallHistory = new AbandonCallHistory();
        if (widgetConfigs) {
            Object.assign(abandonCallHistory, widgetConfigs[WIDGET.AbandonCallHistory]);
            abandonCallHistory.apis = this.getApiProperties(appProperty);
            abandonCallHistory.logAppender = this.getLogProperties(appProperty);
        }

        return abandonCallHistory;
    }

    public static getApiProperties(appProperty: Application): AbandonCallHistoryApis {
        const apis: AbandonCallHistoryApis = new AbandonCallHistoryApis();

        const darkServer: DarkServer = appProperty.darkServer;
        const darkProtocol: string = darkServer.isSsl === true ? 'https:' : 'http:';
        const darkDomain: string = darkServer.ipAddress + (darkServer.port ? ':' + darkServer.port : '');
        apis.register = `${darkProtocol}//${darkDomain}/rest/dark`;
        apis.fetch = `${darkProtocol}//${darkDomain}/rest/dark`;

        apis.log = `${appProperty.name}/api/${WIDGET.AbandonCallHistory}/log`;
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
        rollingFileAppender.filename = path.join(process.cwd(), `logs/${WIDGET.AbandonCallHistory}-%DATE%.log`);
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