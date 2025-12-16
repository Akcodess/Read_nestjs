export class Database {
    host!: string;
    port!: number;
    user!: string;
    password!: string;
    database!: string;
    waitForConnections!: boolean;
    connectionLimit!: number;
    maxIdle!: number;
    idleTimeout!: number;
    queueLimit!: number;
}

export enum DbResultType {
    Success,
    Failed
}

export class DbResult {
    Type!: DbResultType;
    Exception!: any;
    Entities!: any;
    Table!: any;
    Query!: any;
}

export class DbError {
    Code!: string;
    ErrNo!: number;
    Message!: string;
    Stack!: any;
}
