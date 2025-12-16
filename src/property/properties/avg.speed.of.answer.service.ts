import path from "path";

import { AverageSpeedOfAnswer, AverageSpeedOfAnswerApis } from "../dtos/widgets/avg.model";
import { WIDGET } from "../../common/enums/widget.enum";
import { LogAppender, ConsoleAppender, AppenderLayout, RollingFileAppender } from "../dtos/logger.model";
import { Application } from "../dtos/application.model";

export class AverageSpeedOfAnswerProperties {

    constructor() { }

    public static getProperties(widgetConfigs: any, appProperty: Application): AverageSpeedOfAnswer {
        const averageSpeedOfAnswer: AverageSpeedOfAnswer = new AverageSpeedOfAnswer();
        if (widgetConfigs) {
            Object.assign(averageSpeedOfAnswer, widgetConfigs[WIDGET.AverageSpeedOfAnswer]);
            averageSpeedOfAnswer.apis = this.getApiProperties(appProperty);
            averageSpeedOfAnswer.logAppender = this.getLogProperties(appProperty)
        }

        return averageSpeedOfAnswer;
    }

    public static getApiProperties(appProperty: Application): AverageSpeedOfAnswerApis {
        const apis: AverageSpeedOfAnswerApis = new AverageSpeedOfAnswerApis();

        apis.fetch = `${appProperty.name}/api/fetch`;
        apis.log = `${appProperty.name}/api/${WIDGET.AverageSpeedOfAnswer}/log`;
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
        rollingFileAppender.filename = path.join(process.cwd(), `logs/${WIDGET.AverageSpeedOfAnswer}-%DATE%.log`);
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
