import path from "path";

import { WIDGET } from "../../common/enums/widget.enum";
import { LogAppender, ConsoleAppender, AppenderLayout, RollingFileAppender } from "../dtos/logger.model";
import { Property } from "../dtos/property.model";
import { SysDispositionSummary, SysDispositionSummaryApis } from "../dtos/widgets/disposition.model";

export class SysDispositionSummaryProperties {

    constructor() { }

    public static getProperties(widgetConfigs: any, property: Property): SysDispositionSummary {
        const sysDispositionSummary: SysDispositionSummary = new SysDispositionSummary();
        if (widgetConfigs) {
            Object.assign(sysDispositionSummary, widgetConfigs[WIDGET.SysDispositionSummary]);
            sysDispositionSummary.sysDispositions = widgetConfigs['sysdispositions'] || [];
            sysDispositionSummary.apis = this.getApiProperties(property);
            sysDispositionSummary.logAppender = this.getLogProperties(property)
        }

        return sysDispositionSummary;
    }

    private static getApiProperties(property: Property): SysDispositionSummaryApis {
        const apis: SysDispositionSummaryApis = new SysDispositionSummaryApis();

        apis.fetch = `${property.application.name}/api/fetch`;
        apis.log = `${property.application.name}/api/${WIDGET.SysDispositionSummary}/log`;
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
        rollingFileAppender.filename = path.join(process.cwd(), `logs/${WIDGET.SysDispositionSummary}-%DATE%.log`);
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
