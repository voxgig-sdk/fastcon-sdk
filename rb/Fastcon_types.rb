# frozen_string_literal: true

# Typed models for the Fastcon SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Ping entity data model.
#
# @!attribute [rw] server_id
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] time
#   @return [Float]
Ping = Struct.new(
  :server_id,
  :status,
  :time,
  keyword_init: true
)

# Request payload for Ping#create.
#
# @!attribute [rw] server_id
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] time
#   @return [Float]
PingCreateData = Struct.new(
  :server_id,
  :status,
  :time,
  keyword_init: true
)

# Proxy entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] port
#   @return [Integer]
#
# @!attribute [rw] secret
#   @return [String]
#
# @!attribute [rw] server
#   @return [String]
Proxy = Struct.new(
  :id,
  :port,
  :secret,
  :server,
  keyword_init: true
)

# Request payload for Proxy#list.
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] port
#   @return [Integer, nil]
#
# @!attribute [rw] secret
#   @return [String, nil]
#
# @!attribute [rw] server
#   @return [String, nil]
ProxyListMatch = Struct.new(
  :id,
  :port,
  :secret,
  :server,
  keyword_init: true
)

