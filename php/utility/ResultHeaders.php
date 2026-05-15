<?php
declare(strict_types=1);

// OpenskyNetwork SDK utility: result_headers

class OpenskyNetworkResultHeaders
{
    public static function call(OpenskyNetworkContext $ctx): ?OpenskyNetworkResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
