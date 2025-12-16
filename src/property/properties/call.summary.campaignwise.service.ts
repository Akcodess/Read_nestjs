import path from "path";

import { WIDGET } from "../../common/enums/widget.enum";
import { Application } from "../dtos/application.model";
import { LogAppender, ConsoleAppender, AppenderLayout, RollingFileAppender } from "../dtos/logger.model";
import { CallSummaryCampaignWise, CallSummaryCampaignWiseApis } from "../dtos/widgets/call.model";

export class CallSummaryCampaignWiseProperties {

    constructor() { }

    public static getProperties(widgetConfigs: any, appProperty: Application): CallSummaryCampaignWise {
        const callSummaryCampaignWise: CallSummaryCampaignWise = new CallSummaryCampaignWise();
        if (widgetConfigs) {
            Object.assign(callSummaryCampaignWise, widgetConfigs[WIDGET.CallSummaryCampaignWise]);
            callSummaryCampaignWise.apis = this.getApiProperties(appProperty);
            callSummaryCampaignWise.logAppender = this.getLogProperties(appProperty);
        }

        return callSummaryCampaignWise;
    }

    public static getApiProperties(appProperty: Application): CallSummaryCampaignWiseApis {
        const apis: CallSummaryCampaignWiseApis = new CallSummaryCampaignWiseApis();

        apis.fetch = `${appProperty.name}/api/fetch`;
        apis.log = `${appProperty.name}/api/${WIDGET.CallSummaryCampaignWise}/log`;
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
        rollingFileAppender.filename = path.join(process.cwd(), `logs/${WIDGET.CallSummaryCampaignWise}-%DATE%.log`);
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