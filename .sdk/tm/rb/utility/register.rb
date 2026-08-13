# Fastcon SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

FastconUtility.registrar = ->(u) {
  u.clean = FastconUtilities::Clean
  u.done = FastconUtilities::Done
  u.make_error = FastconUtilities::MakeError
  u.feature_add = FastconUtilities::FeatureAdd
  u.feature_hook = FastconUtilities::FeatureHook
  u.feature_init = FastconUtilities::FeatureInit
  u.fetcher = FastconUtilities::Fetcher
  u.make_fetch_def = FastconUtilities::MakeFetchDef
  u.make_context = FastconUtilities::MakeContext
  u.make_options = FastconUtilities::MakeOptions
  u.make_request = FastconUtilities::MakeRequest
  u.make_response = FastconUtilities::MakeResponse
  u.make_result = FastconUtilities::MakeResult
  u.make_point = FastconUtilities::MakePoint
  u.make_spec = FastconUtilities::MakeSpec
  u.make_url = FastconUtilities::MakeUrl
  u.param = FastconUtilities::Param
  u.prepare_auth = FastconUtilities::PrepareAuth
  u.prepare_body = FastconUtilities::PrepareBody
  u.prepare_headers = FastconUtilities::PrepareHeaders
  u.prepare_method = FastconUtilities::PrepareMethod
  u.prepare_params = FastconUtilities::PrepareParams
  u.prepare_path = FastconUtilities::PreparePath
  u.prepare_query = FastconUtilities::PrepareQuery
  u.graphql_body = FastconUtilities::GraphqlBody
  u.graphql_errors = FastconUtilities::GraphqlErrors
  u.result_basic = FastconUtilities::ResultBasic
  u.result_body = FastconUtilities::ResultBody
  u.result_headers = FastconUtilities::ResultHeaders
  u.transform_request = FastconUtilities::TransformRequest
  u.transform_response = FastconUtilities::TransformResponse
}
