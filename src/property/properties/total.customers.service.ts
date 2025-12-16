import path from "path";

import { WIDGET } from "../../common/enums/widget.enum";
import { LogAppender, ConsoleAppender, AppenderLayout, RollingFileAppender } from "../dtos/logger.model";
import { Property } from "../dtos/property.model";
import { TotalCustomers, TotalCustomersApis } from "../dtos/widgets/call.model";

export class TotalCustomersProperties {

    constructor() { }

    public static getProperties(widgetConfigs: any, property: Property): TotalCustomers {
        const averageHandleSummary: TotalCustomers = new TotalCustomers();
        if (widgetConfigs) {
            Object.assign(averageHandleSummary, widgetConfigs[WIDGET.TotalCustomers]);
            averageHandleSummary.apis = this.getApiProperties(property);
            averageHandleSummary.logAppender = this.getLogProperties(property)
        }

        return averageHandleSummary;
    }

    public static getApiProperties(property: Property): TotalCustomersApis {
        const apis: TotalCustomersApis = new TotalCustomersApis();

        apis.fetch = `${property.application.name}/api/fetch`;
        apis.log = `${property.application.name}/api/${WIDGET.TotalCustomers}/log`;
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
        rollingFileAppender.filename = path.join(process.cwd(), `logs/${WIDGET.TotalCustomers}-%DATE%.log`);
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
