# CrunApiOverview SDK utility registration
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
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

CrunApiOverviewUtility.registrar = ->(u) {
  u.clean = CrunApiOverviewUtilities::Clean
  u.done = CrunApiOverviewUtilities::Done
  u.make_error = CrunApiOverviewUtilities::MakeError
  u.feature_add = CrunApiOverviewUtilities::FeatureAdd
  u.feature_hook = CrunApiOverviewUtilities::FeatureHook
  u.feature_init = CrunApiOverviewUtilities::FeatureInit
  u.fetcher = CrunApiOverviewUtilities::Fetcher
  u.make_fetch_def = CrunApiOverviewUtilities::MakeFetchDef
  u.make_context = CrunApiOverviewUtilities::MakeContext
  u.make_options = CrunApiOverviewUtilities::MakeOptions
  u.make_request = CrunApiOverviewUtilities::MakeRequest
  u.make_response = CrunApiOverviewUtilities::MakeResponse
  u.make_result = CrunApiOverviewUtilities::MakeResult
  u.make_point = CrunApiOverviewUtilities::MakePoint
  u.make_spec = CrunApiOverviewUtilities::MakeSpec
  u.make_url = CrunApiOverviewUtilities::MakeUrl
  u.param = CrunApiOverviewUtilities::Param
  u.prepare_auth = CrunApiOverviewUtilities::PrepareAuth
  u.prepare_body = CrunApiOverviewUtilities::PrepareBody
  u.prepare_headers = CrunApiOverviewUtilities::PrepareHeaders
  u.prepare_method = CrunApiOverviewUtilities::PrepareMethod
  u.prepare_params = CrunApiOverviewUtilities::PrepareParams
  u.prepare_path = CrunApiOverviewUtilities::PreparePath
  u.prepare_query = CrunApiOverviewUtilities::PrepareQuery
  u.result_basic = CrunApiOverviewUtilities::ResultBasic
  u.result_body = CrunApiOverviewUtilities::ResultBody
  u.result_headers = CrunApiOverviewUtilities::ResultHeaders
  u.transform_request = CrunApiOverviewUtilities::TransformRequest
  u.transform_response = CrunApiOverviewUtilities::TransformResponse
}
