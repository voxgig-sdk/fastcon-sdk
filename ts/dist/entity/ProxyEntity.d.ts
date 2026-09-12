import { FastconEntityBase } from '../FastconEntityBase';
import type { FastconSDK } from '../FastconSDK';
import type { Control } from '../types';
import type { ProxyType, ProxyListMatch } from '../FastconTypes';
declare class ProxyEntity extends FastconEntityBase<ProxyType> {
    constructor(client: FastconSDK, entopts: any);
    make(this: ProxyEntity): ProxyEntity;
    list(this: any, reqmatch?: ProxyListMatch, ctrl?: Control): Promise<ProxyEntity[]>;
}
export { ProxyEntity };
