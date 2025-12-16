let randomId = Math.floor(1000 + Math.random() * 9000);

function getReqId() {
    randomId++;
    return randomId;
}

export const IRequest = {
    Id: getReqId(),
    Type: {
        Auth: "Auth" as const,
        Activity: "Activity" as const,
        Config: "Config" as const,
        Control: "Control" as const
    },
    Code: {
        Register: "Register" as const,
        Unregister: "Unregister" as const,
        Login: "Login" as const,
        UserRegister: "UserRegister" as const,
        RegisterService: "RegisterService" as const,
        PullRtEvents: "PullRtEvents" as const,
        EntityFetch: "EntityFetch" as const,
        AbandonCallFetch: "AbandonCallFetch" as const,
        CallAbandonCancel: "CallAbandonCancel" as const,
        RegisteredEntityFetch: "RegisteredEntityFetch" as const,
        AOPsStatFetch: "AOPsStatFetch" as const,
        PredictiveDialerStatusFetch: "PredictiveDialerStatusFetch" as const,
    },
    User: {
        Type: {
            Agent: 'Agent',
            Admin: 'Admin'
        }
    },
    Entity: {
        Campaign: 'Campaign',
        CampaignProperties: 'CampaignProperties',
        CampaignMedia: 'CampaignMedia',
        XServer: 'XServer',
        Queue: 'Queue',
        Project: 'Project',
        AbandonCall: 'AbandonCall',
        AbandonCallHistory: 'AbandonCallHistory',
        Sessions: 'Sessions',
        InboundCallOverview: 'InboundCallOverview',
        InboundCallStatistics: 'InboundCallStatistics',
        CallSummaryCampaignWise: 'CallSummaryCampaignWise', // Gulfsotheby
        CallSummaryProjectWise: 'CallSummaryProjectWise', // Gulfsotheby
        CallSummaryInbound: 'CallSummaryInbound', // Gulfsotheby
        QueueCall: 'QueueCall',
        Average: 'Average',
        ConnectedCallVolumeTrend: 'ConnectedCallVolumeTrend',
        TotalCalls: 'TotalCalls',
        TotalCallDurations: 'TotalCallDurations',
        UserDisposition: 'UserDisposition',
        SysDisposition: 'SysDisposition',
        AOPs: 'AOPs',
        AOPsProperties: 'AOPsProperties',
        AOPsStatus: 'AOPsStatus',
        ContactListSummary: 'ContactListSummary',
        PredictiveDialerStatus: "PredictiveDialerStatus",
        SLA: "SLA"
    }
}
