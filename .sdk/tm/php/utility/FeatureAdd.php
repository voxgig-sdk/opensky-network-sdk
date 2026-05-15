<?php
declare(strict_types=1);

// OpenskyNetwork SDK utility: feature_add

class OpenskyNetworkFeatureAdd
{
    public static function call(OpenskyNetworkContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
