<?php
declare(strict_types=1);

// OpenskyNetwork SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class OpenskyNetworkMakeContext
{
    public static function call(array $ctxmap, ?OpenskyNetworkContext $basectx): OpenskyNetworkContext
    {
        return new OpenskyNetworkContext($ctxmap, $basectx);
    }
}
