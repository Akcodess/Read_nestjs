export class DarkApi {
    login!: string;
    register!: string;
    fetch!: string;
}

export class DarkRequestInfo {
    url!: string;
    headers: any;
    strictSSL!: boolean;
    payload!: any;
}

export class DarkUserInfo {
    loginId!: string;
    password!: string;
    clientCode!: string;
    applicationCode!: string;
    sessionId!: string;
}