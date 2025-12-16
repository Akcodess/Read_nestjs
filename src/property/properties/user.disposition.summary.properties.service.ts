import path from "path";

import { WIDGET } from "../../common/enums/widget.enum";
import { LogAppender, ConsoleAppender, AppenderLayout, RollingFileAppender } from "../dtos/logger.model";
import { Property } from "../dtos/property.model";
import { UserDispositionSummary, UserDispositionSummaryApis } from "../dtos/widgets/disposition.model";

export class UserDispositionSummaryProperties {

    constructor() { }

    public static getProperties(widgetConfigs: any, property: Property): UserDispositionSummary {
        const userDispositionSummary: UserDispositionSummary = new UserDispositionSummary();
        if (widgetConfigs) {
            Object.assign(userDispositionSummary, widgetConfigs[WIDGET.UserDispositionSummary]);
            userDispositionSummary.apis = this.getApiProperties(property);
            userDispositionSummary.logAppender = this.getLogProperties(property)
        }

        return userDispositionSummary;
    }

    private static getApiProperties(property: Property): UserDispositionSummaryApis {
        const apis: UserDispositionSummaryApis = new UserDispositionSummaryApis();

        apis.fetch = `${property.application.name}/api/fetch`;
        apis.log = `${property.application.name}/api/${WIDGET.UserDispositionSummary}/log`;
        apis.validate = `${property.application.name}/api/validate`;
        apis.signin = `${property.application.name}/api/signin`;
        return apis;
    }

    private static getLogProperties(property: Property): LogAppender {
        const logAppender: LogAppender = new LogAppender();
        logAppender.consoleAppender = this.getConsoleLogProperties(property);
        logAppender.rollingFileAppender = this.getRollingFileLogProperties(property);
        return logAppender;
    }

    private static getConsoleLogProperties(property: Property): ConsoleAppender {
        const consoleAppender: ConsoleAppender = new ConsoleAppender();
        consoleAppender.type = 'stdout';
        consoleAppender.layout = new AppenderLayout();
        consoleAppender.layout.pattern = property.application.logPattern;
        consoleAppender.layout.type = 'pattern';
        return consoleAppender;
    }

    private static getRollingFileLogProperties(property: Property): RollingFileAppender {
        const rollingFileAppender: RollingFileAppender = new RollingFileAppender();
        rollingFileAppender.filename = path.join(process.cwd(), `logs/${WIDGET.UserDispositionSummary}-%DATE%.log`);
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
