import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

import { Property as CommonProperty, Property } from '../dtos/property.model';
import type { Application } from '../dtos/application.model';
import type { PropertiesFile, WidgetConfigs, WidgetConfigFile } from '../types';
import { ApplicationPropertyService } from '../properties/application.property.service';
import { AbandonCallHistoryProperties } from '../properties/abandon.call.histoy.properties.service';
import { AgentStatusProperties } from '../properties/agent.status.properties.service';
import { AgentSummaryProperties } from '../properties/agent.summary.properties.service';
import { AgentSummaryChannelWiseProperties } from '../properties/agent.summary.channelwise.properties.service';
import { CallStatusProperties } from '../properties/call.status.properties.service';
import { CallSummaryProperties } from '../properties/call.summary.properties.service';
import { CallSummaryCampaignWiseProperties } from '../properties/call.summary.campaignwise.service';
import { CallSummaryInboundProperties } from '../properties/call.summary.inbound.service';
import { CallSummaryQueueWiseProperties } from '../properties/call.summary.queuewise.service';
import { CallSummaryProjectWiseProperties } from '../properties/call.summary.projectwise.service';
import { CampaignSessionSummaryProperties } from '../properties/campaign.session.summary.properties.service';
import { CampaignStatusProperties } from '../properties/campaign.status.properties.service';
import { CampaignSummaryProperties } from '../properties/campaign.summary.properties.service';
import { ChatStatusProperties } from '../properties/chat.status.properties.service';
import { ChatSummaryProperties } from '../properties/chat.summary.properties.service';
import { ContactListStatusProperties } from '../properties/contact.list.status.properties.service';
import { EmailStatusProperties } from '../properties/email.status.properties.service';
import { EmailSummaryProperties } from '../properties/email.summary.properties.service';
import { MessageBlasterProperties } from '../properties/message.blaster.properties.service';
import { QueueAgentStatusProperties } from '../properties/queue.agent.status.properties.service';
import { QueueInteractionStatusProperties } from '../properties/queue.interaction.status.properties.service';
import { QueueStatusProperties } from '../properties/queue.status.properties.service';
import { RateMeterProperties } from '../properties/rate.meter.properties.service';
import { RealtimeSentimentProperties } from '../properties/realtime.sentiment.properties.service';
import { SocialStatusProperties } from '../properties/social.status.properties.service';
import { SocialSummaryProperties } from '../properties/social.summary.properties.service';
import { TeamStatusProperties } from '../properties/team.status.properties.service';
import { VideoStatusProperties } from '../properties/video.status.properties.service';
import { VideoSummaryProperties } from '../properties/video.summary.properties.service';
import { AverageHandleSummaryProperties } from '../properties/avg.handle.summary.service';
import { AverageHandleSummaryLiveProperties } from '../properties/avg.handle.summary.live.service';
import { AverageSpeedOfAnswerProperties } from '../properties/avg.speed.of.answer.service';
import { CallAverageSummaryProperties } from '../properties/call.avg.summary.properties.service';
import { CallTypeSummaryProperties } from '../properties/call.type.summary.properties.service';
import { ConnectedCallVolumeTrendProperties } from '../properties/connected.call.volume.trend.service';
import { QueueCallSummaryProperties } from '../properties/queue.call.summary.service';
import { InboundCallOverviewProperties } from '../properties/inbound.call.overview.service';
import { InboundCallStatisticsProperties } from '../properties/inbound.call.statistics.service';
import { TotalCallsProperties } from '../properties/total.calls.service';
import { TotalAgentsProperties } from '../properties/total.agents.service';
import { TotalCustomersProperties } from '../properties/total.customers.service';
import { UserDispositionGridProperties } from '../properties/user.disposition.grid.properties.service';
import { UserDispositionSummaryProperties } from '../properties/user.disposition.summary.properties.service';
import { SysDispositionSummaryProperties } from '../properties/sys.disposition.summary.properties.service';
import { VisitStatusProperties } from '../properties/visit.status.properties.service';
import { VisitSummaryProperties } from '../properties/visit.summary.properties.service';
import { WebFormStatusProperties } from '../properties/webform.status.properties.service';
import { WebFormSummaryProperties } from '../properties/webform.summary.properties.service';
import { SLAProperties } from '../properties/sla.service';
import { AgentAOPsStatusProperties } from '../properties/agent.aops.status.properties.service';
import { LoggerService } from '../../common/logger/logger.service';
import { messages } from '../constants/messages.constant';
import { DarkServer, NucleusServer, RealmServer, GravityServer, LightServer } from '../dtos/server.model';
import { Database } from '../dtos/database.model';
import { AbandonCallHistory } from '../dtos/widgets/abandonCallHistory.model';
import { AgentAOPsStatus, AgentStatus, AgentSummary, AgentSummaryChannelWise, TotalAgents } from '../dtos/widgets/agent.model';
import { AverageHandleSummary, AverageHandleSummaryLive, AverageSpeedOfAnswer } from '../dtos/widgets/avg.model';
import { CallAverageSummary, CallStatus, CallSummary, CallSummaryCampaignWise, CallSummaryInbound, CallSummaryProjectWise, CallSummaryQueueWise, CallTypeSummary, ConnectedCallVolumeTrend, InboundCallOverview, InboundCallStatistics, QueueCallSummary, SLA, TotalCalls, TotalCustomers } from '../dtos/widgets/call.model';
import { CampaignDispositionSummary, CampaignSessionSummary, CampaignStatus, CampaignSummary } from '../dtos/widgets/campaign.model';
import { ChatStatus, ChatSummary } from '../dtos/widgets/chat.model';
import { ContactListStatus } from '../dtos/widgets/contactList.model';
import { UserDispositionSummary, UserDispositionGrid, SysDispositionSummary } from '../dtos/widgets/disposition.model';
import { EmailStatus, EmailSummary } from '../dtos/widgets/email.model';
import { MessageBlaster } from '../dtos/widgets/messageBlaster.model';
import { QueueAgentStatus, QueueInteractionStatus, QueueStatus } from '../dtos/widgets/queue.model';
import { RateMeter } from '../dtos/widgets/rateMeter.model';
import { RealtimeSentiment } from '../dtos/widgets/realtimeSentiment.model';
import { SocialStatus, SocialSummary } from '../dtos/widgets/social.model';
import { TeamStatus } from '../dtos/widgets/team.model';
import { VideoStatus, VideoSummary } from '../dtos/widgets/video.model';
import { VisitStatus, VisitSummary } from '../dtos/widgets/visit.model';
import { WebFormStatus, WebFormSummary } from '../dtos/widgets/webform.model';

/**
 * Service responsible for loading application properties and merging widget configurations.
 * All methods are static to allow early initialization before the Nest application is bootstrapped.
 */
@Injectable()
export default class PropertyService {
  private static logger: LoggerService | undefined;

  /**
   * Cached property assembled from the property file and widget configuration JSON.
   */
  private static _property: CommonProperty | undefined;

  /**
   * Initializes the cached property by reading the property file and widget configs.
   */
  public static init(logger?: LoggerService): void {
    this.logger = logger;
    this.logger?.info(messages.propertyService.Init);
    this._property = this.fetchProperties();
  }

  /**
   * Builds and returns the application `Property` by reading the property file
   * and merging all widget configuration JSON files.
   */
  private static fetchProperties(): CommonProperty {
    // Create a new Property object to hold the properties
    const property = new CommonProperty();
    const properties = this.getPropertyFileContents();

    if (properties) {
      // Set the application properties
      property.application = ApplicationPropertyService.getAppProperties(properties);

      // Get the widget configurations from the properties
      const widgetConfigs: WidgetConfigs = this.getWidgetConfigs(properties);

      // Set the application tenant properties
      property.application.tenants = ApplicationPropertyService.getTenantProperties(widgetConfigs);

      // Set various widget properties based on the application and widget configurations
      property.abandonCallHistory = AbandonCallHistoryProperties.getProperties(widgetConfigs, property.application);
      property.agentStatus = AgentStatusProperties.getProperties(widgetConfigs, property.application);
      property.agentSummary = AgentSummaryProperties.getProperties(widgetConfigs, property.application);
      property.agentSummaryChannelWise = AgentSummaryChannelWiseProperties.getProperties(widgetConfigs, property.application);
      property.callStatus = CallStatusProperties.getProperties(widgetConfigs, property.application);
      property.callSummary = CallSummaryProperties.getProperties(widgetConfigs, property.application);
      property.callSummaryCampaignWise = CallSummaryCampaignWiseProperties.getProperties(widgetConfigs, property.application);
      property.callSummaryInbound = CallSummaryInboundProperties.getProperties(widgetConfigs, property.application);
      property.callSummaryQueueWise = CallSummaryQueueWiseProperties.getProperties(widgetConfigs, property.application);
      property.callSummaryProjectWise = CallSummaryProjectWiseProperties.getProperties(widgetConfigs, property.application);
      property.campaignSessionSummary = CampaignSessionSummaryProperties.getProperties(widgetConfigs, property.application);
      property.campaignStatus = CampaignStatusProperties.getProperties(widgetConfigs, property.application);
      property.campaignSummary = CampaignSummaryProperties.getProperties(widgetConfigs, property.application);
      property.chatStatus = ChatStatusProperties.getProperties(widgetConfigs, property.application);
      property.chatSummary = ChatSummaryProperties.getProperties(widgetConfigs, property.application);
      property.contactListStatus = ContactListStatusProperties.getProperties(widgetConfigs, property.application);
      property.emailStatus = EmailStatusProperties.getProperties(widgetConfigs, property.application);
      property.emailSummary = EmailSummaryProperties.getProperties(widgetConfigs, property.application);
      property.messageBlaster = MessageBlasterProperties.getProperties(widgetConfigs, property.application);
      property.queueAgentStatus = QueueAgentStatusProperties.getProperties(widgetConfigs, property.application);
      property.queueInteractionStatus = QueueInteractionStatusProperties.getProperties(widgetConfigs, property.application);
      property.queueStatus = QueueStatusProperties.getProperties(widgetConfigs, property.application);
      property.rateMeter = RateMeterProperties.getProperties(widgetConfigs, property.application);
      property.realtimeSentiment = RealtimeSentimentProperties.getProperties(widgetConfigs, property.application);
      property.socialStatus = SocialStatusProperties.getProperties(widgetConfigs, property.application);
      property.socialSummary = SocialSummaryProperties.getProperties(widgetConfigs, property.application);
      property.teamStatus = TeamStatusProperties.getProperties(widgetConfigs, property.application);
      property.videoStatus = VideoStatusProperties.getProperties(widgetConfigs, property.application);
      property.videoSummary = VideoSummaryProperties.getProperties(widgetConfigs, property.application);

      property.averageHandleSummary = AverageHandleSummaryProperties.getProperties(widgetConfigs, property.application);
      property.averageHandleSummaryLive = AverageHandleSummaryLiveProperties.getProperties(widgetConfigs, property.application);
      property.averageSpeedOfAnswer = AverageSpeedOfAnswerProperties.getProperties(widgetConfigs, property.application);
      property.callAverageSummary = CallAverageSummaryProperties.getProperties(widgetConfigs, property.application);
      property.callTypeSummary = CallTypeSummaryProperties.getProperties(widgetConfigs, property.application);
      property.connectedCallVolumeTrend = ConnectedCallVolumeTrendProperties.getProperties(widgetConfigs, property.application);
      property.queueCallSummary = QueueCallSummaryProperties.getProperties(widgetConfigs, property.application);
      property.inboundCallOverview = InboundCallOverviewProperties.getProperties(widgetConfigs, property.application);
      property.inboundCallStatistics = InboundCallStatisticsProperties.getProperties(widgetConfigs, property.application);
      property.totalCalls = TotalCallsProperties.getProperties(widgetConfigs, property);
      property.totalAgents = TotalAgentsProperties.getProperties(widgetConfigs, property);
      property.totalCustomers = TotalCustomersProperties.getProperties(widgetConfigs, property);
      property.userDispositionGrid = UserDispositionGridProperties.getProperties(widgetConfigs, property);
      property.userDispositionSummary = UserDispositionSummaryProperties.getProperties(widgetConfigs, property);
      property.sysDispositionSummary = SysDispositionSummaryProperties.getProperties(widgetConfigs, property);

      property.visitStatus = VisitStatusProperties.getProperties(widgetConfigs, property.application);
      property.visitSummary = VisitSummaryProperties.getProperties(widgetConfigs, property.application);
      property.webFormStatus = WebFormStatusProperties.getProperties(widgetConfigs, property.application);
      property.webFormSummary = WebFormSummaryProperties.getProperties(widgetConfigs, property.application);
      property.sla = SLAProperties.getProperties(widgetConfigs, property.application);
      property.agentAOPsStatus = AgentAOPsStatusProperties.getProperties(widgetConfigs, property.application);

    }
    return property;
  }

  /**
     * Returns the Property object containing all the application properties.
     * This method should be called after the init() method to ensure properties are loaded.
     * @returns The Property object with all properties.
     */
    public static getProperties(): Property {
        return this._property!;
    }

    /**
     * Returns the application properties from the Property object.
     * This method provides access to the application-level properties.
     * @returns The Application object containing application properties.
     */
    public static getApplicationProperties(): Application {
        return this._property!.application;
    }

    /**
     * Returns Nucleus server properties from the Property object.
     * These methods provide access to Nucleus server configurations.
     * @returns The Nucleus server properties object.
     */
    public static getNucleusServerProperties(): NucleusServer {
        return this._property!.application.nucleusServer;
    }

    /**
     * Returns Dark server properties from the Property object.
     * These methods provide access to Dark server configurations.
     * @returns The Dark server properties object.
     */
    public static getDarkServerProperties(): DarkServer {
        return this._property!.application.darkServer;
    }

    /**
     * Returns Realm server properties from the Property object.
     * These methods provide access to Realm server configurations.
     * @returns The Realm server properties object.
     */
    public static getRealmServerProperties(): RealmServer {
        return this._property!.application.realmServer;
    }

    /**
     * Returns Gravity server properties from the Property object.
     * These methods provide access to Gravity server configurations.
     * @returns The Gravity server properties object.
     */
    public static getGravityServerProperties(): GravityServer {
        return this._property!.application.gravityServer;
    }

    /**
     * Returns Light server properties from the Property object.
     * These methods provide access to Light server configurations.
     * @returns The Light server properties object.
     */
    public static getLightServerProperties(): LightServer {
        return this._property!.application.lightServer;
    }

    /**
     * Returns the database properties from the Property object.
     * This method provides access to database configurations used by the application.
     * @returns The Database object containing database properties.
     */
    public static getDatabaseProperties(): Database {
        return this._property!.application.database;
    }

    /**
     * Returns the abandon call history widget properties from the Property object.
     * This method provides access to the abandon call history widget properties.
     * @returns The AbandonCallHistory object containing abandon call history widget properties.
     */
    public static getAbandonCallHistoryProperties(): AbandonCallHistory {
        return this._property!.abandonCallHistory;
    }

    /**
     * Returns the agent status widget properties from the Property object.
     * This method provides access to the agent status widget properties.
     * @returns The AbandonCallHistory object containing agent status widget properties.
     */
    public static getAgentStatusProperties(): AgentStatus {
        return this._property!.agentStatus;
    }

    /**
     * Returns the agent summary widget properties from the Property object.
     * This method provides access to the agent summary widget properties.
     * @returns The AgentSummary object containing agent summary widget properties.
     */
    public static getAgentSummaryProperties(): AgentSummary {
        return this._property!.agentSummary;
    }

    /**
     * Returns the agent summary channel-wise widget properties from the Property object.
     * This method provides access to the agent summary channel-wise widget properties.
     * @returns The AgentSummaryChannelWise object containing agent summary channel-wise widget properties.
     */
    public static getAgentSummaryChannelWiseProperties(): AgentSummaryChannelWise {
        return this._property!.agentSummaryChannelWise;
    }

    /**
     * Returns the campaign status widget properties from the Property object.
     * This method provides access to the campaign status widget properties.
     * @returns The CampaignStatus object containing campaign status widget properties.
     */
    public static getCampaignStatusProperties(): CampaignStatus {
        return this._property!.campaignStatus;
    }

    /**
     * Returns the campaign summary widget properties from the Property object.
     * This method provides access to the campaign summary widget properties.
     * @returns The CampaignSummary object containing campaign summary widget properties.
     */
    public static getCampaignSummaryProperties(): CampaignSummary {
        return this._property!.campaignSummary;
    }

    /**
     * Returns the team status widget properties from the Property object.
     * This method provides access to the team status widget properties.
     * @returns The TeamStatus object containing team status widget properties.
     */
    public static getTeamStatusProperties(): TeamStatus {
        return this._property!.teamStatus;
    }

    /**
     * Returns the call status widget properties from the Property object.
     * This method provides access to the call status widget properties.
     * @returns The CallStatus object containing call status widget properties.
     */
    public static getCallStatusProperties(): CallStatus {
        return this._property!.callStatus;
    }

    /**
     * Returns the call summary widget properties from the Property object.
     * This method provides access to the call summary widget properties.
     * @returns The CallSummary object containing call summary widget properties.
     */
    public static getCallSummaryProperties(): CallSummary {
        return this._property!.callSummary;
    }

    /**
     * Returns the chat status widget properties from the Property object.
     * This method provides access to the chat status widget properties.
     * @returns The CallSummary object containing chat status widget properties.
     */
    public static getChatStatusProperties(): ChatStatus {
        return this._property!.chatStatus;
    }

    /**
     * Returns the chat summary widget properties from the Property object.
     * This method provides access to the chat summary widget properties.
     * @returns The ChatSummary object containing chat summary widget properties.
     */
    public static getChatSummaryProperties(): ChatSummary {
        return this._property!.chatSummary;
    }

    /**
     * Returns the email status widget properties from the Property object.
     * This method provides access to the email status widget properties.
     * @returns The CallSummary object containing email status widget properties.
     */
    public static getEmailStatusProperties(): EmailStatus {
        return this._property!.emailStatus;
    }

    /**
     * Returns the email summary widget properties from the Property object.
     * This method provides access to the email summary widget properties.
     * @returns The EmailSummary object containing email summary widget properties.
     */
    public static getEmailSummaryProperties(): EmailSummary {
        return this._property!.emailSummary;
    }

    /**
     * Returns the video status widget properties from the Property object.
     * This method provides access to the video status widget properties.
     * @returns The CallSummary object containing video status widget properties.
     */
    public static getVideoStatusProperties(): VideoStatus {
        return this._property!.videoStatus;
    }

    /**
     * Returns the video summary widget properties from the Property object.
     * This method provides access to the video summary widget properties.
     * @returns The VideoSummary object containing video summary widget properties.
     */
    public static getVideoSummaryProperties(): VideoSummary {
        return this._property!.videoSummary;
    }

    /**
     * Returns the social status widget properties from the Property object.
     * This method provides access to the social status widget properties.
     * @returns The SocialStatus object containing social status widget properties.
     */
    public static getSocialStatusProperties(): SocialStatus {
        return this._property!.socialStatus;
    }

    /**
     * Returns the social summary widget properties from the Property object.
     * This method provides access to the social summary widget properties.
     * @returns The SocialSummary object containing social summary widget properties.
     */
    public static getSocialSummaryProperties(): SocialSummary {
        return this._property!.socialSummary;
    }

    /**
     * Returns the queue status widget properties from the Property object.
     * This method provides access to the queue status widget properties.
     * @returns The QueueStatus object containing queue status widget properties.
     */
    public static getQueueStatusProperties(): QueueStatus {
        return this._property!.queueStatus;
    }

    /**
     * Returns the queue agent status widget properties from the Property object.
     * This method provides access to the queue agent status widget properties.
     * @returns The QueueAgentStatus object containing queue agent status widget properties.
     */
    public static getQueueAgentStatusProperties(): QueueAgentStatus {
        return this._property!.queueAgentStatus;
    }

    /**
     * Returns the queue interaction status widget properties from the Property object.
     * This method provides access to the queue interaction status widget properties.
     * @returns The QueueInteractionStatus object containing queue interaction status widget properties.
     */
    public static getQueueInteractionStatusProperties(): QueueInteractionStatus {
        return this._property!.queueInteractionStatus;
    }

    /**
     * Returns the rate meter widget properties from the Property object.
     * This method provides access to the rate meter widget properties.
     * @returns The RateMeter object containing rate meter widget properties.
     */
    public static getRateMeterProperties(): RateMeter {
        return this._property!.rateMeter;
    }

    /**
     * Returns the message blaster widget properties from the Property object.
     * This method provides access to the message blaster widget properties.
     * @returns The MessageBlaster object containing message blaster widget properties.
     */
    public static getMessageBlasterProperties(): MessageBlaster {
        return this._property!.messageBlaster;
    }

    /**
     * Returns the contact list status widget properties from the Property object.
     * This method provides access to the contact list status widget properties.
     * @returns The ContactListStatus object containing contact list status widget properties.
     */
    public static getContactListStatusProperties(): ContactListStatus {
        return this._property!.contactListStatus;
    }

    /**
     * Returns the realtime sentiment widget properties from the Property object.
     * This method provides access to the realtime sentiment widget properties.
     * @returns The RealtimeSentiment object containing realtime sentiment widget properties.
     */
    public static getRealtimeSentimentProperties(): RealtimeSentiment {
        return this._property!.realtimeSentiment;
    }

    /**
     * Returns the call summary campaign wise widget properties from the Property object.
     * This method provides access to the call summary campaign wise widget properties.
     * @returns The CallSummaryCampaignWise object containing call summary campaign wise widget properties.
     */
    public static getCallSummaryCampaignWiseProperties(): CallSummaryCampaignWise {
        return this._property!.callSummaryCampaignWise;
    }

    /**
     * Returns the call summary queue wise widget properties from the Property object.
     * This method provides access to the call summary queue wise widget properties.
     * @returns The CallSummaryQueueWise object containing call summary queue wise widget properties.
     */
    public static getCallSummaryQueueWiseProperties(): CallSummaryQueueWise {
        return this._property!.callSummaryQueueWise;
    }

    /**
     * Returns the call summary project wise widget properties from the Property object.
     * This method provides access to the call summary project wise widget properties.
     * @returns The CallSummaryProjectWise object containing call summary project wise widget properties.
     */
    public static getCallSummaryProjectWiseProperties(): CallSummaryProjectWise {
        return this._property!.callSummaryProjectWise;
    }

    /**
     * Returns the call summary inbound widget properties from the Property object.
     * This method provides access to the call summary inbound widget properties.
     * @returns The CallSummaryInbound object containing call summary inbound widget properties.
     */
    public static getCallSummaryInboundProperties(): CallSummaryInbound {
        return this._property!.callSummaryInbound;
    }

    /**
     * Returns the campaign session summary widget properties from the Property object.
     * This method provides access to the campaign session summary widget properties.
     * @returns The CampaignSessionSummary object containing campaign session summary widget properties.
     */
    public static getCampaignSessionSummaryProperties(): CampaignSessionSummary {
        return this._property!.campaignSessionSummary;
    }

    /**
     * Returns the campaign disposition summary widget properties from the Property object.
     * This method provides access to the campaign disposition summary widget properties.
     * @returns The CampaignDispositionSummary object containing campaign disposition summary widget properties.
     */
    public static getAverageHandleSummaryProperties(): AverageHandleSummary {
        return this._property!.averageHandleSummary;
    }

    /**
     * Returns the call summary inbound widget properties from the Property object.
     * This method provides access to the call summary inbound widget properties.
     * @returns The CampaignDispositionSummary object containing call summary inbound widget properties.
     */
    public static getCampaignDispositionSummaryProperties(): CampaignDispositionSummary {
        return this._property!.campaignDispositionSummary;
    }

    /**
     * Returns the average speed of answer widget properties from the Property object.
     * This method provides access to the average speed of answer widget properties.
     * @returns The AverageSpeedOfAnswer object containing average speed of answer widget properties.
     */
    public static getAverageSpeedOfAnswerProperties(): AverageSpeedOfAnswer {
        return this._property!.averageSpeedOfAnswer;
    }

    /**
     * Returns the call average summary widget properties from the Property object.
     * This method provides access to the call average summary widget properties.
     * @returns The CallAverageSummary object containing call average summary widget properties.
     */
    public static getCallAverageSummaryProperties(): CallAverageSummary {
        return this._property!.callAverageSummary;
    }

    /**
     * Returns the call type summary widget properties from the Property object.
     * This method provides access to the call type summary widget properties.
     * @returns The CallTypeSummary object containing call type summary widget properties.
     */
    public static getCallTypeSummaryProperties(): CallTypeSummary {
        return this._property!.callTypeSummary;
    }

    /**
     * Returns the connected call volume trend widget properties from the Property object.
     * This method provides access to the connected call volume trend widget properties.
     * @returns The ConnectedCallVolumeTrend object containing connected call volume trend widget properties.
     */
    public static getConnectedCallVolumeTrendProperties(): ConnectedCallVolumeTrend {
        return this._property!.connectedCallVolumeTrend;
    }

    /**
     * Returns the queue call summary widget properties from the Property object.
     * This method provides access to the queue call summary widget properties.
     * @returns The QueueCallSummary object containing queue call summary widget properties.
     */
    public static getQueueCallSummaryProperties(): QueueCallSummary {
        return this._property!.queueCallSummary;
    }

    /**
     * Returns the inbound call overview widget properties from the Property object.
     * This method provides access to the inbound call overview widget properties.
     * @returns The InboundCallOverview object containing inbound call overview widget properties.
     */
    public static getInboundCallOverviewProperties(): InboundCallOverview {
        return this._property!.inboundCallOverview;
    }

    /**
     * Returns the inbound call statistics widget properties from the Property object.
     * This method provides access to the inbound call statistics widget properties.
     * @returns The InboundCallStatistics object containing inbound call statistics widget properties.
     */
    public static getInboundCallStatisticsProperties(): InboundCallStatistics {
        return this._property!.inboundCallStatistics;
    }

    /**
     * Returns the total agents widget properties from the Property object.
     * This method provides access to the total agents widget properties.
     * @returns The TotalAgents object containing total agents widget properties.
     */
    public static getTotalAgentsProperties(): TotalAgents {
        return this._property!.totalAgents;
    }

    /**
     * Returns the total calls widget properties from the Property object.
     * This method provides access to the total calls widget properties.
     * @returns The TotalCalls object containing total calls widget properties.
     */
    public static getTotalCallsProperties(): TotalCalls {
        return this._property!.totalCalls;
    }

    /**
     * Returns the total customers widget properties from the Property object.
     * This method provides access to the total customers widget properties.
     * @returns The TotalCustomers object containing total customers widget properties.
     */
    public static getTotalCustomersProperties(): TotalCustomers {
        return this._property!.totalCustomers;
    }

    /**
     * Returns the user disposition grid widget properties from the Property object.
     * This method provides access to the user disposition grid widget properties.
     * @returns The UserDispositionGrid object containing user disposition grid widget properties.
     */
    public static getUserDispositionGridProperties(): UserDispositionGrid {
        return this._property!.userDispositionGrid;
    }

    /**
     * Returns the user disposition summary widget properties from the Property object.
     * This method provides access to the user disposition summary widget properties.
     * @returns The UserDispositionSummary object containing user disposition summary widget properties.
     */
    public static getUserDispositionSummaryProperties(): UserDispositionSummary {
        return this._property!.userDispositionSummary;
    }

    /**
     * Returns the system disposition summary widget properties from the Property object.
     * This method provides access to the system disposition summary widget properties.
     * @returns The SysDispositionSummary object containing system disposition summary widget properties.
     */
    public static getSysDispositionSummaryProperties(): SysDispositionSummary {
        return this._property!.sysDispositionSummary;
    }

    public static getVisitStatusProperties(): VisitStatus {
        return this._property!.visitStatus;
    }

    public static getVisitSummaryProperties(): VisitSummary {
        return this._property!.visitSummary;
    }

    public static getWebFormStatusProperties(): WebFormStatus {
        return this._property!.webFormStatus;
    }

    public static getWebFormSummaryProperties(): WebFormSummary {
        return this._property!.webFormSummary;
    }

    /**
     * Returns the SLA properties from the Property object.
     * This method provides access to the SLA properties used in the application.
     * @returns The SLA object containing SLA properties.
     */
    public static getSLAProperties(): SLA {
        return this._property!.sla;
    }

    public static getAgentAOPsProperties(): AgentAOPsStatus {
        return this._property!.agentAOPsStatus;
    }

    public static getAverageHandleSummaryLiveProperties(): AverageHandleSummaryLive {
        return this._property!.averageHandleSummaryLive;
    }

  /**
   * Returns the configured application port as a number.
   * Falls back to `3000` when the port is not set in `_property.application`.
   */
  public static getPort(): number {
    const port = this._property?.application?.port;
    return port ? Number(port) : 3000;
  }

  /**
   * Reads all widget configuration JSON files in the directory specified by
   * `properties["WidgetConfigDir"]` and merges them into a single object.
   *
   * @param properties Map containing at least `WidgetConfigDir` pointing to the config directory.
   * @returns Merged widget configuration object keyed by widget identifiers.
   */
  public static getWidgetConfigs(properties: PropertiesFile): WidgetConfigs {
    let configs: WidgetConfigs = {};
    const files: string[] = fs.readdirSync(properties["WidgetConfigDir"], "utf-8");
    files.forEach((file: string) => {
      try {
        if (file) {
          const fileContents = this.readFileContents(path.join(properties["WidgetConfigDir"], file));
          if (fileContents) {
            configs = { ...configs, ...JSON.parse(fileContents) as WidgetConfigFile };
          }
        }
      } catch (err) {
        const errorMeta = { error: err instanceof Error ? err.message : String(err), file };
        this.logger?.error(messages.propertyService.FailedToLoadWidgetConfig, errorMeta);
      }
    });
    return configs;
  }

  /**
     * Fetches the property file contents based on the operating system.
     * It reads the property file, parses its contents, and returns the properties as an object.
     * @returns An object containing the properties read from the property file.
     */
  private static getPropertyFileContents(): PropertiesFile | undefined {
    try {
      let propertyFilePath: string | undefined = '';

      if (os.platform() === "win32") {
        propertyFilePath = process.env.PROPERTY_FILE_PATH_FOR_WINDOWS;

      } else {
        propertyFilePath = process.env.PROPERTY_FILE_PATH_FOR_LINUX;
      }

      return propertyFilePath ? this.readProperties(propertyFilePath) : undefined;

    } catch (error) {
      return undefined;
    }
  }

  /**
     * Reads the properties from the specified property file.
     * It parses the file line by line, ignoring comments and empty lines,
     * and returns the properties as an object.
     * @param propertyFilePath - The path to the property file.
     * @returns An object containing the properties read from the file.
     */
  private static readProperties(propertyFilePath: string): PropertiesFile | undefined {
    let properties: PropertiesFile | undefined = undefined;

    fs.readFileSync(propertyFilePath, "utf-8")
      .split(/\r?\n/)
      .forEach((line) => {
        if (line.trim().startsWith("#") === false && line.trim().startsWith("[") === false) {

          const arr = line.trim().split("=");
          if (arr.length > 1) {

            if (!properties)
              properties = {} as PropertiesFile;

            properties[arr[0].trim()] = arr[1].trim();
          }
        }
      });

    return properties;
  }

  /**
   * Safely reads a file and returns its UTF-8 contents.
   *
   * @param filePath Absolute or relative path to the file to read
   * @returns File contents or `undefined` if the file cannot be read
   */
  private static readFileContents(filePath: string): string | undefined {
    try {
      return fs.readFileSync(filePath, 'utf-8');
    } catch {
      return undefined;
    }
  }
}
