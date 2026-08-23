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
                "slug" => "opensky-network",
                "version" => "0.0.1",
                "target" => "php",
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
              'short' => 'Number of candidates for arrival airport',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'callsign',
              'short' => 'Callsign of the vehicle (8 chars)',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'departureAirportCandidatesCount',
              'short' => 'Number of candidates for departure airport',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'estArrivalAirport',
              'short' => 'Estimated arrival airport ICAO code',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'estArrivalAirportHorizDistance',
              'short' => 'Horizontal distance to estimated arrival airport in meters',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'estArrivalAirportVertDistance',
              'short' => 'Vertical distance to estimated arrival airport in meters',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'estDepartureAirport',
              'short' => 'Estimated departure airport ICAO code',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'estDepartureAirportHorizDistance',
              'short' => 'Horizontal distance to estimated departure airport in meters',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'estDepartureAirportVertDistance',
              'short' => 'Vertical distance to estimated departure airport in meters',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'firstSeen',
              'short' => 'Unix timestamp (seconds) of the first position report',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'icao24',
              'short' => 'Unique ICAO 24-bit address of the transponder in hex string representation',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'lastSeen',
              'short' => 'Unix timestamp (seconds) of the last position report',
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
              'short' => 'Array of state vectors',
              'type' => '`$ARRAY`',
              'union' => [
                'branches' => 5,
                'count' => 1,
                'depth' => 2,
              ],
            ],
            [
              'name' => 'time',
              'short' => 'The time which the state vectors in this response are associated with.',
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
              'short' => 'Callsign of the vehicle',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'endTime',
              'short' => 'Unix timestamp (seconds) of the end of the track',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'icao24',
              'short' => 'Unique ICAO 24-bit address of the transponder',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'path',
              'short' => 'Array of waypoints representing the aircraft trajectory',
              'type' => '`$ARRAY`',
              'union' => [
                'branches' => 3,
                'count' => 1,
                'depth' => 2,
              ],
            ],
            [
              'name' => 'startTime',
              'short' => 'Unix timestamp (seconds) of the start of the track',
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
