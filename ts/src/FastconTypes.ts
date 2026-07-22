// Typed models for the Fastcon SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Ping {
  server_id?: string
  status?: string
  time: number
}

export interface PingCreateData {
  server_id?: string
  status?: string
  time: number
}

export interface Proxy {
  id?: string
  port: number
  secret: string
  server: string
}

export interface ProxyListMatch {
  id?: string
  port?: number
  secret?: string
  server?: string
}

