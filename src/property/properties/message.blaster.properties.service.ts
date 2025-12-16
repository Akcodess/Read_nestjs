import path from "path";

import { WIDGET } from "../../common/enums/widget.enum";
import { Application } from "../dtos/application.model";
import { LogAppender, ConsoleAppender, AppenderLayout, RollingFileAppender } from "../dtos/logger.model";
import { MessageBlaster } from "../dtos/widgets/messageBlaster.model";

export class MessageBlasterProperties {

    private LOG_FILE_NAME: string = `message_blaster.log`;

    constructor() { }

    public static getProperties(widgetConfigs: any, appProperty: Application): MessageBlaster {
        const messageBlaster: MessageBlaster = new MessageBlaster();
        if (widgetConfigs) {
            Object.assign(messageBlaster, widgetConfigs[WIDGET.MessageBlaster]);
            if (messageBlaster?.apis) {
                messageBlaster.apis.log = `${appProperty.name}/api/${WIDGET.MessageBlaster}/log`;
            }
            messageBlaster.records = widgetConfigs['participants'];
            messageBlaster.logAppender = this.getLogProperties(appProperty);
        }

        return messageBlaster;
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
        rollingFileAppender.filename = path.join(process.cwd(), `logs/${WIDGET.MessageBlaster}-%DATE%.log`);
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

