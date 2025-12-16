export class EntityResult {
    ResultType!: EntityResultType;
    Response!: any;
    Exception!: any;
}

export enum EntityResultType {
    Success = 'Success',
    Failed = 'Failed'
}