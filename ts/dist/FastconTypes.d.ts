export interface Ping {
    server_id?: string;
    status?: string;
    time: number;
}
export interface PingCreateData {
    server_id?: string;
    status?: string;
    time: number;
}
export interface ProxyType {
    id?: string;
    port: number;
    secret: string;
    server: string;
}
export interface ProxyListMatch {
    id?: string;
    port?: number;
    secret?: string;
    server?: string;
}
