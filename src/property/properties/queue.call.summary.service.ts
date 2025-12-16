import path from "path";

import { QueueCallSummary, QueueCallSummaryApis } from "../dtos/widgets/call.model";
import { WIDGET } from "../../common/enums/widget.enum";
import { LogAppender, ConsoleAppender, AppenderLayout, RollingFileAppender } from "../dtos/logger.model";
import { Application } from "../dtos/application.model";

export class QueueCallSummaryProperties {

    constructor() { }

    public static getProperties(widgetConfigs: any, appProperty: Application): QueueCallSummary {
        const queueCallSummary: QueueCallSummary = new QueueCallSummary();
        if (widgetConfigs) {
            Object.assign(queueCallSummary, widgetConfigs[WIDGET.QueueCallSummary]);
            queueCallSummary.apis = this.getApiProperties(appProperty);
            queueCallSummary.logAppender = this.getLogProperties(appProperty)
        }

        return queueCallSummary;
    }

    public static getApiProperties(appProperty: Application): QueueCallSummaryApis {
        const apis: QueueCallSummaryApis = new QueueCallSummaryApis();

        apis.fetch = `${appProperty.name}/api/fetch`;
        apis.log = `${appProperty.name}/api/${WIDGET.QueueCallSummary}/log`;
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
        rollingFileAppender.filename = path.join(process.cwd(), `logs/${WIDGET.QueueCallSummary}-%DATE%.log`);
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
