import path from "path";

import { WIDGET } from "../../common/enums/widget.enum";
import { Application } from "../dtos/application.model";
import { LogAppender, ConsoleAppender, AppenderLayout, RollingFileAppender } from "../dtos/logger.model";
import { LightServer } from "../dtos/server.model";
import { VideoStatus, VideoStatusApis } from "../dtos/widgets/video.model";

export class VideoStatusProperties {

    constructor() { }

    public static getProperties(widgetConfigs: any, appProperty: Application): VideoStatus {
        const videoStatus: VideoStatus = new VideoStatus();
        if (widgetConfigs) {
            Object.assign(videoStatus, widgetConfigs[WIDGET.VideoStatus]);
            videoStatus.apis = this.getApiProperties(appProperty);
            videoStatus.logAppender = this.getLogProperties(appProperty);
        }

        return videoStatus;
    }

    public static getApiProperties(appProperty: Application): VideoStatusApis {
        const apis: VideoStatusApis = new VideoStatusApis();

        const lightServer: LightServer = appProperty.lightServer;
        const lightProtocol: string = lightServer.isSsl === true ? 'https:' : 'http:';
        const lightDomain: string = lightServer.ipAddress + (lightServer.port ? ':' + lightServer.port : '');
        apis.register = `${lightProtocol}//${lightDomain}/radius/rt/user_register`;
        apis.registerSvc = `${lightProtocol}//${lightDomain}/radius/rt/regsrvc`;
        apis.fetch = `${lightProtocol}//${lightDomain}/radius/rt/fetch`;

        apis.log = `${appProperty.name}/api/${WIDGET.VideoStatus}/log`;
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
        rollingFileAppender.filename = path.join(process.cwd(), `logs/${WIDGET.VideoStatus}-%DATE%.log`);
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
