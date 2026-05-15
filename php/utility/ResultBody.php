<?php
declare(strict_types=1);

// OpenskyNetwork SDK utility: result_body

class OpenskyNetworkResultBody
{
    public static function call(OpenskyNetworkContext $ctx): ?OpenskyNetworkResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
