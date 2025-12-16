import path from "path";

import { WIDGET } from "../../common/enums/widget.enum";
import { Application } from "../dtos/application.model";
import { LogAppender, ConsoleAppender, AppenderLayout, RollingFileAppender } from "../dtos/logger.model";
import { CallSummaryQueueWise, CallSummaryQueueWiseApis } from "../dtos/widgets/call.model";

export class CallSummaryQueueWiseProperties {

    constructor() { }

    public static getProperties(widgetConfigs: any, appProperty: Application): CallSummaryQueueWise {
        const callSummaryQueueWise: CallSummaryQueueWise = new CallSummaryQueueWise();
        if (widgetConfigs) {
            Object.assign(callSummaryQueueWise, widgetConfigs[WIDGET.CallSummaryQueueWise]);
            callSummaryQueueWise.apis = this.getApiProperties(appProperty);
            callSummaryQueueWise.logAppender = this.getLogProperties(appProperty);
        }

        return callSummaryQueueWise;
    }

    public static getApiProperties(appProperty: Application): CallSummaryQueueWiseApis {
        const apis: CallSummaryQueueWiseApis = new CallSummaryQueueWiseApis();

        apis.log = `${appProperty.name}/api/${WIDGET.CallSummaryQueueWise}/log`;
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
        rollingFileAppender.filename = path.join(process.cwd(), `logs/${WIDGET.CallSummaryQueueWise}-%DATE%.log`);
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
