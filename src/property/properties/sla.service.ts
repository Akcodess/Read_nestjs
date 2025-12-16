import path from "path";

import { LogAppender, ConsoleAppender, AppenderLayout, RollingFileAppender } from "../dtos/logger.model";
import { WIDGET } from "../../common/enums/widget.enum";
import { Application } from "../dtos/application.model";
import { SLA, SLAApis } from "../dtos/widgets/call.model";

export class SLAProperties {

    constructor() { }

    public static getProperties(widgetConfigs: any, appProperty: Application): SLA {
        const sla: SLA = new SLA();
        if (widgetConfigs) {
            Object.assign(sla, widgetConfigs[WIDGET.SLA]);
            sla.apis = this.getApiProperties(appProperty);
            sla.logAppender = this.getLogProperties(appProperty)
        }

        return sla;
    }

    public static getApiProperties(appProperty: Application): SLAApis {
        const apis: SLAApis = new SLAApis();

        apis.fetch = `${appProperty.name}/api/fetch`;
        apis.log = `${appProperty.name}/api/${WIDGET.SLA}/log`;
        apis.signin = `${appProperty.name}/api/signin`;
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
        rollingFileAppender.filename = path.join(process.cwd(), `logs/${WIDGET.SLA}-%DATE%.log`);
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
