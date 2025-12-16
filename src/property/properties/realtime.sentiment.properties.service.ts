import path from "path";

import { LightServer } from "../dtos/server.model";
import { WIDGET } from "../../common/enums/widget.enum";
import { Application } from "../dtos/application.model";
import { LogAppender, ConsoleAppender, AppenderLayout, RollingFileAppender } from "../dtos/logger.model";
import { RealtimeSentiment, RealtimeSentimentApis } from "../dtos/widgets/realtimeSentiment.model";

export class RealtimeSentimentProperties {

    constructor() { }

    public static getProperties(widgetConfigs: any, appProperty: Application): RealtimeSentiment {
        const realtimeSentiment: RealtimeSentiment = new RealtimeSentiment();
        if (widgetConfigs) {
            Object.assign(realtimeSentiment, widgetConfigs[WIDGET.RealtimeSentiment]);
            realtimeSentiment.apis = this.getApiProperties(appProperty);
            realtimeSentiment.logAppender = this.getLogProperties(appProperty);
        }

        return realtimeSentiment;
    }

    public static getApiProperties(appProperty: Application): RealtimeSentimentApis {
        const apis: RealtimeSentimentApis = new RealtimeSentimentApis();

        const lightServer: LightServer = appProperty.lightServer;
        const lightProtocol: string = lightServer.isSsl === true ? 'https:' : 'http:';
        const lightDomain: string = lightServer.ipAddress + (lightServer.port ? ':' + lightServer.port : '');
        apis.register = `${lightProtocol}//${lightDomain}/radius/rt/user_register`;
        apis.registerSvc = `${lightProtocol}//${lightDomain}/radius/rt/regsrvc`;
        apis.fetch = `${lightProtocol}//${lightDomain}/radius/rt/fetch`;

        apis.log = `${appProperty.name}/api/${WIDGET.QueueStatus}/log`;
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
        rollingFileAppender.filename = path.join(process.cwd(), `logs/${WIDGET.RealtimeSentiment}-%DATE%.log`);
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

