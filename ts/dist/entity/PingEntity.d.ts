import { FastconEntityBase } from '../FastconEntityBase';
import type { FastconSDK } from '../FastconSDK';
import type { Control } from '../types';
import type { Ping, PingCreateData } from '../FastconTypes';
declare class PingEntity extends FastconEntityBase<Ping> {
    constructor(client: FastconSDK, entopts: any);
    make(this: PingEntity): PingEntity;
    create(this: any, reqdata?: PingCreateData, ctrl?: Control): Promise<PingEntity>;
}
export { PingEntity };
