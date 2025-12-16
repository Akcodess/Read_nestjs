export class GravityServer {
    ipAddress!: any;
    port!: number;
    isSsl!: boolean;
    strictSsl: boolean = false;
    baseURL!: string;
}

export class NucleusServer {
    ipAddress!: any;
    port!: number;
    isSsl!: boolean;
    version!: string;
    strictSsl: boolean = false;
    baseURL!: string;
}

export class RealmServer {
    ipAddress!: any;
    port!: number;
    isSsl!: boolean;
    strictSsl: boolean = false;
    version!: string;
    baseURL!: string;
}

export class DarkServer {
    ipAddress!: any;
    port!: number;
    isSsl!: boolean;
    strictSsl: boolean = false;
    defaultLoginId!: string;
    defaultPassword!: string;
    baseURL!: string;
}

export class LightServer {
    ipAddress!: any;
    port!: number;
    isSsl!: boolean;
    strictSsl: boolean = false;
    username!: string;
    password!: string;
}