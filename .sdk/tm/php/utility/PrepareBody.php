<?php
declare(strict_types=1);

// OpenskyNetwork SDK utility: prepare_body

class OpenskyNetworkPrepareBody
{
    public static function call(OpenskyNetworkContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
