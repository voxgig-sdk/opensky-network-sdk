<?php
declare(strict_types=1);

// OpenskyNetwork SDK utility registration

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

OpenskyNetworkUtility::setRegistrar(function (OpenskyNetworkUtility $u): void {
    $u->clean = [OpenskyNetworkClean::class, 'call'];
    $u->done = [OpenskyNetworkDone::class, 'call'];
    $u->make_error = [OpenskyNetworkMakeError::class, 'call'];
    $u->feature_add = [OpenskyNetworkFeatureAdd::class, 'call'];
    $u->feature_hook = [OpenskyNetworkFeatureHook::class, 'call'];
    $u->feature_init = [OpenskyNetworkFeatureInit::class, 'call'];
    $u->fetcher = [OpenskyNetworkFetcher::class, 'call'];
    $u->make_fetch_def = [OpenskyNetworkMakeFetchDef::class, 'call'];
    $u->make_context = [OpenskyNetworkMakeContext::class, 'call'];
    $u->make_options = [OpenskyNetworkMakeOptions::class, 'call'];
    $u->make_request = [OpenskyNetworkMakeRequest::class, 'call'];
    $u->make_response = [OpenskyNetworkMakeResponse::class, 'call'];
    $u->make_result = [OpenskyNetworkMakeResult::class, 'call'];
    $u->make_point = [OpenskyNetworkMakePoint::class, 'call'];
    $u->make_spec = [OpenskyNetworkMakeSpec::class, 'call'];
    $u->make_url = [OpenskyNetworkMakeUrl::class, 'call'];
    $u->param = [OpenskyNetworkParam::class, 'call'];
    $u->prepare_auth = [OpenskyNetworkPrepareAuth::class, 'call'];
    $u->prepare_body = [OpenskyNetworkPrepareBody::class, 'call'];
    $u->prepare_headers = [OpenskyNetworkPrepareHeaders::class, 'call'];
    $u->prepare_method = [OpenskyNetworkPrepareMethod::class, 'call'];
    $u->prepare_params = [OpenskyNetworkPrepareParams::class, 'call'];
    $u->prepare_path = [OpenskyNetworkPreparePath::class, 'call'];
    $u->prepare_query = [OpenskyNetworkPrepareQuery::class, 'call'];
    $u->result_basic = [OpenskyNetworkResultBasic::class, 'call'];
    $u->result_body = [OpenskyNetworkResultBody::class, 'call'];
    $u->result_headers = [OpenskyNetworkResultHeaders::class, 'call'];
    $u->transform_request = [OpenskyNetworkTransformRequest::class, 'call'];
    $u->transform_response = [OpenskyNetworkTransformResponse::class, 'call'];
});
