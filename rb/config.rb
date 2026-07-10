# OpenskyNetwork SDK configuration

module OpenskyNetworkConfig
  def self.make_config
    {
      "main" => {
        "name" => "OpenskyNetwork",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://opensky-network.org/api",
        "auth" => {
          "prefix" => "Basic",
        },
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "flight" => {},
          "state_vector" => {},
          "track" => {},
        },
      },
      "entity" => {
        "flight" => {
          "fields" => [
            {
              "active" => true,
              "name" => "arrival_airport_candidates_count",
              "req" => false,
              "type" => "`$INTEGER`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "callsign",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 1,
            },
            {
              "active" => true,
              "name" => "departure_airport_candidates_count",
              "req" => false,
              "type" => "`$INTEGER`",
              "index$" => 2,
            },
            {
              "active" => true,
              "name" => "est_arrival_airport",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 3,
            },
            {
              "active" => true,
              "name" => "est_arrival_airport_horiz_distance",
              "req" => false,
              "type" => "`$INTEGER`",
              "index$" => 4,
            },
            {
              "active" => true,
              "name" => "est_arrival_airport_vert_distance",
              "req" => false,
              "type" => "`$INTEGER`",
              "index$" => 5,
            },
            {
              "active" => true,
              "name" => "est_departure_airport",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 6,
            },
            {
              "active" => true,
              "name" => "est_departure_airport_horiz_distance",
              "req" => false,
              "type" => "`$INTEGER`",
              "index$" => 7,
            },
            {
              "active" => true,
              "name" => "est_departure_airport_vert_distance",
              "req" => false,
              "type" => "`$INTEGER`",
              "index$" => 8,
            },
            {
              "active" => true,
              "name" => "first_seen",
              "req" => false,
              "type" => "`$INTEGER`",
              "index$" => 9,
            },
            {
              "active" => true,
              "name" => "icao24",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 10,
            },
            {
              "active" => true,
              "name" => "last_seen",
              "req" => false,
              "type" => "`$INTEGER`",
              "index$" => 11,
            },
          ],
          "name" => "flight",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "query" => [
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "begin",
                        "orig" => "begin",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "end",
                        "orig" => "end",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "icao24",
                        "orig" => "icao24",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/flights/aircraft",
                  "parts" => [
                    "flights",
                    "aircraft",
                  ],
                  "select" => {
                    "$action" => "aircraft",
                    "exist" => [
                      "begin",
                      "end",
                      "icao24",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
                {
                  "active" => true,
                  "args" => {
                    "query" => [
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "airport",
                        "orig" => "airport",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "begin",
                        "orig" => "begin",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "end",
                        "orig" => "end",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/flights/arrival",
                  "parts" => [
                    "flights",
                    "arrival",
                  ],
                  "select" => {
                    "$action" => "arrival",
                    "exist" => [
                      "airport",
                      "begin",
                      "end",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 1,
                },
                {
                  "active" => true,
                  "args" => {
                    "query" => [
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "airport",
                        "orig" => "airport",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "begin",
                        "orig" => "begin",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "end",
                        "orig" => "end",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/flights/departure",
                  "parts" => [
                    "flights",
                    "departure",
                  ],
                  "select" => {
                    "$action" => "departure",
                    "exist" => [
                      "airport",
                      "begin",
                      "end",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 2,
                },
                {
                  "active" => true,
                  "args" => {
                    "query" => [
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "begin",
                        "orig" => "begin",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "end",
                        "orig" => "end",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/flights/all",
                  "parts" => [
                    "flights",
                    "all",
                  ],
                  "select" => {
                    "$action" => "all",
                    "exist" => [
                      "begin",
                      "end",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 3,
                },
              ],
              "key$" => "list",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "state_vector" => {
          "fields" => [
            {
              "active" => true,
              "name" => "state",
              "req" => false,
              "type" => "`$ARRAY`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "time",
              "req" => false,
              "type" => "`$INTEGER`",
              "index$" => 1,
            },
          ],
          "name" => "state_vector",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "query" => [
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "extended",
                        "orig" => "extended",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                      },
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "icao24",
                        "orig" => "icao24",
                        "reqd" => false,
                        "type" => "`$ARRAY`",
                      },
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "lamax",
                        "orig" => "lamax",
                        "reqd" => false,
                        "type" => "`$NUMBER`",
                      },
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "lamin",
                        "orig" => "lamin",
                        "reqd" => false,
                        "type" => "`$NUMBER`",
                      },
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "lomax",
                        "orig" => "lomax",
                        "reqd" => false,
                        "type" => "`$NUMBER`",
                      },
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "lomin",
                        "orig" => "lomin",
                        "reqd" => false,
                        "type" => "`$NUMBER`",
                      },
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "time",
                        "orig" => "time",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/states/all",
                  "parts" => [
                    "states",
                    "all",
                  ],
                  "select" => {
                    "exist" => [
                      "extended",
                      "icao24",
                      "lamax",
                      "lamin",
                      "lomax",
                      "lomin",
                      "time",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
                {
                  "active" => true,
                  "args" => {
                    "query" => [
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "icao24",
                        "orig" => "icao24",
                        "reqd" => false,
                        "type" => "`$ARRAY`",
                      },
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "serial",
                        "orig" => "serial",
                        "reqd" => false,
                        "type" => "`$ARRAY`",
                      },
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "time",
                        "orig" => "time",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/states/own",
                  "parts" => [
                    "states",
                    "own",
                  ],
                  "select" => {
                    "exist" => [
                      "icao24",
                      "serial",
                      "time",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 1,
                },
              ],
              "key$" => "list",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "track" => {
          "fields" => [
            {
              "active" => true,
              "name" => "callsign",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "end_time",
              "req" => false,
              "type" => "`$INTEGER`",
              "index$" => 1,
            },
            {
              "active" => true,
              "name" => "icao24",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 2,
            },
            {
              "active" => true,
              "name" => "path",
              "req" => false,
              "type" => "`$ARRAY`",
              "index$" => 3,
            },
            {
              "active" => true,
              "name" => "start_time",
              "req" => false,
              "type" => "`$INTEGER`",
              "index$" => 4,
            },
          ],
          "name" => "track",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "query" => [
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "icao24",
                        "orig" => "icao24",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "time",
                        "orig" => "time",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/tracks",
                  "parts" => [
                    "tracks",
                  ],
                  "select" => {
                    "exist" => [
                      "icao24",
                      "time",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "list",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    OpenskyNetworkFeatures.make_feature(name)
  end
end
