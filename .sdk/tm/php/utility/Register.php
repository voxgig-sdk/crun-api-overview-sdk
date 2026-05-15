<?php
declare(strict_types=1);

// CrunApiOverview SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

CrunApiOverviewUtility::setRegistrar(function (CrunApiOverviewUtility $u): void {
    $u->clean = [CrunApiOverviewClean::class, 'call'];
    $u->done = [CrunApiOverviewDone::class, 'call'];
    $u->make_error = [CrunApiOverviewMakeError::class, 'call'];
    $u->feature_add = [CrunApiOverviewFeatureAdd::class, 'call'];
    $u->feature_hook = [CrunApiOverviewFeatureHook::class, 'call'];
    $u->feature_init = [CrunApiOverviewFeatureInit::class, 'call'];
    $u->fetcher = [CrunApiOverviewFetcher::class, 'call'];
    $u->make_fetch_def = [CrunApiOverviewMakeFetchDef::class, 'call'];
    $u->make_context = [CrunApiOverviewMakeContext::class, 'call'];
    $u->make_options = [CrunApiOverviewMakeOptions::class, 'call'];
    $u->make_request = [CrunApiOverviewMakeRequest::class, 'call'];
    $u->make_response = [CrunApiOverviewMakeResponse::class, 'call'];
    $u->make_result = [CrunApiOverviewMakeResult::class, 'call'];
    $u->make_point = [CrunApiOverviewMakePoint::class, 'call'];
    $u->make_spec = [CrunApiOverviewMakeSpec::class, 'call'];
    $u->make_url = [CrunApiOverviewMakeUrl::class, 'call'];
    $u->param = [CrunApiOverviewParam::class, 'call'];
    $u->prepare_auth = [CrunApiOverviewPrepareAuth::class, 'call'];
    $u->prepare_body = [CrunApiOverviewPrepareBody::class, 'call'];
    $u->prepare_headers = [CrunApiOverviewPrepareHeaders::class, 'call'];
    $u->prepare_method = [CrunApiOverviewPrepareMethod::class, 'call'];
    $u->prepare_params = [CrunApiOverviewPrepareParams::class, 'call'];
    $u->prepare_path = [CrunApiOverviewPreparePath::class, 'call'];
    $u->prepare_query = [CrunApiOverviewPrepareQuery::class, 'call'];
    $u->result_basic = [CrunApiOverviewResultBasic::class, 'call'];
    $u->result_body = [CrunApiOverviewResultBody::class, 'call'];
    $u->result_headers = [CrunApiOverviewResultHeaders::class, 'call'];
    $u->transform_request = [CrunApiOverviewTransformRequest::class, 'call'];
    $u->transform_response = [CrunApiOverviewTransformResponse::class, 'call'];
});
