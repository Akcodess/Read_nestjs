import path from "path";

import { WIDGET } from "../../common/enums/widget.enum";
import { LogAppender, ConsoleAppender, AppenderLayout, RollingFileAppender } from "../dtos/logger.model";
import { Property } from "../dtos/property.model";
import { TotalAgents, TotalAgentsApis } from "../dtos/widgets/agent.model";

export class TotalAgentsProperties {

    constructor() { }

    public static getProperties(widgetConfigs: any, property: Property): TotalAgents {
        const averageHandleSummary: TotalAgents = new TotalAgents();
        if (widgetConfigs) {
            Object.assign(averageHandleSummary, widgetConfigs[WIDGET.TotalAgents]);
            averageHandleSummary.apis = this.getApiProperties(property);
            averageHandleSummary.logAppender = this.getLogProperties(property)
        }

        return averageHandleSummary;
    }

    public static getApiProperties(property: Property): TotalAgentsApis {
        const apis: TotalAgentsApis = new TotalAgentsApis();

        apis.fetch = `${property.application.name}/api/fetch`;
        apis.log = `${property.application.name}/api/${WIDGET.TotalAgents}/log`;
        apis.validate = `${property.application.name}/api/validate`;
        apis.signin = `${property.application.name}/api/signin`;

        return apis;
    }

    public static getLogProperties(property: Property): LogAppender {
        const logAppender: LogAppender = new LogAppender();
        logAppender.consoleAppender = this.getConsoleLogProperties(property);
        logAppender.rollingFileAppender = this.getRollingFileLogProperties(property);
        return logAppender;
    }

    public static getConsoleLogProperties(property: Property): ConsoleAppender {
        const consoleAppender: ConsoleAppender = new ConsoleAppender();
        consoleAppender.type = 'stdout';
        consoleAppender.layout = new AppenderLayout();
        consoleAppender.layout.pattern = property.application.logPattern;
        consoleAppender.layout.type = 'pattern';
        return consoleAppender;
    }

    public static getRollingFileLogProperties(property: Property): RollingFileAppender {
        const rollingFileAppender: RollingFileAppender = new RollingFileAppender();
        rollingFileAppender.filename = path.join(process.cwd(), `logs/${WIDGET.TotalAgents}-%DATE%.log`);
        rollingFileAppender.maxLogSize = property.application.maxLogSize;
        rollingFileAppender.backups = property.application.maxFiles;
        rollingFileAppender.type = 'file';
        rollingFileAppender.compress = true;
        rollingFileAppender.layout = new AppenderLayout();
        rollingFileAppender.layout.pattern = property.application.logPattern;
        rollingFileAppender.layout.type = 'pattern';

        return rollingFileAppender;
    }

}
