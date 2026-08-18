<?php
declare(strict_types=1);

// OpenskyNetwork SDK configuration

class OpenskyNetworkConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "OpenskyNetwork",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://opensky-network.org/api",
                "auth" => [
                    "prefix" => "Basic",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "flight" => [],
                    "state_vector" => [],
                    "track" => [],
                ],
            ],
            "entity" => [
        'flight' => [
          'fields' => [
            [
              'name' => 'arrivalAirportCandidatesCount',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'callsign',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'departureAirportCandidatesCount',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'estArrivalAirport',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'estArrivalAirportHorizDistance',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'estArrivalAirportVertDistance',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'estDepartureAirport',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'estDepartureAirportHorizDistance',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'estDepartureAirportVertDistance',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'firstSeen',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'icao24',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'lastSeen',
              'type' => '`$INTEGER`',
            ],
          ],
          'name' => 'flight',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'begin',
                        'orig' => 'begin',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'end',
                        'orig' => 'end',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'icao24',
                        'orig' => 'icao24',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/flights/aircraft',
                  'parts' => [
                    'flights',
                    'aircraft',
                  ],
                  'select' => [
                    '$action' => 'aircraft',
                    'exist' => [
                      'begin',
                      'end',
                      'icao24',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'airport',
                        'orig' => 'airport',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'begin',
                        'orig' => 'begin',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'end',
                        'orig' => 'end',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/flights/arrival',
                  'parts' => [
                    'flights',
                    'arrival',
                  ],
                  'select' => [
                    '$action' => 'arrival',
                    'exist' => [
                      'airport',
                      'begin',
                      'end',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'airport',
                        'orig' => 'airport',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'begin',
                        'orig' => 'begin',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'end',
                        'orig' => 'end',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/flights/departure',
                  'parts' => [
                    'flights',
                    'departure',
                  ],
                  'select' => [
                    '$action' => 'departure',
                    'exist' => [
                      'airport',
                      'begin',
                      'end',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'begin',
                        'orig' => 'begin',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'end',
                        'orig' => 'end',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/flights/all',
                  'parts' => [
                    'flights',
                    'all',
                  ],
                  'select' => [
                    '$action' => 'all',
                    'exist' => [
                      'begin',
                      'end',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'state_vector' => [
          'fields' => [
            [
              'name' => 'states',
              'type' => '`$ARRAY`',
              'union' => [
                'branches' => 5,
                'count' => 1,
                'depth' => 2,
              ],
            ],
            [
              'name' => 'time',
              'type' => '`$INTEGER`',
            ],
          ],
          'name' => 'state_vector',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'extended',
                        'orig' => 'extended',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'icao24',
                        'orig' => 'icao24',
                        'type' => '`$ARRAY`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'lamax',
                        'orig' => 'lamax',
                        'type' => '`$NUMBER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'lamin',
                        'orig' => 'lamin',
                        'type' => '`$NUMBER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'lomax',
                        'orig' => 'lomax',
                        'type' => '`$NUMBER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'lomin',
                        'orig' => 'lomin',
                        'type' => '`$NUMBER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'time',
                        'orig' => 'time',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/states/all',
                  'parts' => [
                    'states',
                    'all',
                  ],
                  'select' => [
                    'exist' => [
                      'extended',
                      'icao24',
                      'lamax',
                      'lamin',
                      'lomax',
                      'lomin',
                      'time',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.states`',
                  ],
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'icao24',
                        'orig' => 'icao24',
                        'type' => '`$ARRAY`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'serial',
                        'orig' => 'serial',
                        'type' => '`$ARRAY`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'time',
                        'orig' => 'time',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/states/own',
                  'parts' => [
                    'states',
                    'own',
                  ],
                  'select' => [
                    'exist' => [
                      'icao24',
                      'serial',
                      'time',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.states`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'track' => [
          'fields' => [
            [
              'name' => 'callsign',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'endTime',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'icao24',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'path',
              'type' => '`$ARRAY`',
              'union' => [
                'branches' => 3,
                'count' => 1,
                'depth' => 2,
              ],
            ],
            [
              'name' => 'startTime',
              'type' => '`$INTEGER`',
            ],
          ],
          'name' => 'track',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'icao24',
                        'orig' => 'icao24',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'time',
                        'orig' => 'time',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/tracks',
                  'parts' => [
                    'tracks',
                  ],
                  'select' => [
                    'exist' => [
                      'icao24',
                      'time',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.path`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return OpenskyNetworkFeatures::make_feature($name);
    }
}
