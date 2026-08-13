# OpenskyNetwork SDK utility registration
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

OpenskyNetworkUtility.registrar = ->(u) {
  u.clean = OpenskyNetworkUtilities::Clean
  u.done = OpenskyNetworkUtilities::Done
  u.make_error = OpenskyNetworkUtilities::MakeError
  u.feature_add = OpenskyNetworkUtilities::FeatureAdd
  u.feature_hook = OpenskyNetworkUtilities::FeatureHook
  u.feature_init = OpenskyNetworkUtilities::FeatureInit
  u.fetcher = OpenskyNetworkUtilities::Fetcher
  u.make_fetch_def = OpenskyNetworkUtilities::MakeFetchDef
  u.make_context = OpenskyNetworkUtilities::MakeContext
  u.make_options = OpenskyNetworkUtilities::MakeOptions
  u.make_request = OpenskyNetworkUtilities::MakeRequest
  u.make_response = OpenskyNetworkUtilities::MakeResponse
  u.make_result = OpenskyNetworkUtilities::MakeResult
  u.make_point = OpenskyNetworkUtilities::MakePoint
  u.make_spec = OpenskyNetworkUtilities::MakeSpec
  u.make_url = OpenskyNetworkUtilities::MakeUrl
  u.param = OpenskyNetworkUtilities::Param
  u.prepare_auth = OpenskyNetworkUtilities::PrepareAuth
  u.prepare_body = OpenskyNetworkUtilities::PrepareBody
  u.prepare_headers = OpenskyNetworkUtilities::PrepareHeaders
  u.prepare_method = OpenskyNetworkUtilities::PrepareMethod
  u.prepare_params = OpenskyNetworkUtilities::PrepareParams
  u.prepare_path = OpenskyNetworkUtilities::PreparePath
  u.prepare_query = OpenskyNetworkUtilities::PrepareQuery
  u.graphql_body = OpenskyNetworkUtilities::GraphqlBody
  u.graphql_errors = OpenskyNetworkUtilities::GraphqlErrors
  u.result_basic = OpenskyNetworkUtilities::ResultBasic
  u.result_body = OpenskyNetworkUtilities::ResultBody
  u.result_headers = OpenskyNetworkUtilities::ResultHeaders
  u.transform_request = OpenskyNetworkUtilities::TransformRequest
  u.transform_response = OpenskyNetworkUtilities::TransformResponse
}
