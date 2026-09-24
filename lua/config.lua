-- OpenskyNetwork SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "OpenskyNetwork",
      slug = "opensky-network",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://opensky-network.org/api",
      auth = {
        prefix = "Basic",
      },
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["flight"] = {},
        ["own"] = {},
        ["state_vector"] = {},
        ["track"] = {},
      },
    },
    entity = {
      ["flight"] = {
        ["fields"] = {
          {
            ["name"] = "arrivalAirportCandidatesCount",
            ["title"] = "Arrival Airport Candidates Count",
            ["type"] = "`$INTEGER`",
            ["short"] = "Number of candidates for arrival airport",
          },
          {
            ["name"] = "callsign",
            ["title"] = "Callsign",
            ["type"] = "`$STRING`",
            ["short"] = "Callsign of the vehicle (8 chars)",
          },
          {
            ["name"] = "departureAirportCandidatesCount",
            ["title"] = "Departure Airport Candidates Count",
            ["type"] = "`$INTEGER`",
            ["short"] = "Number of candidates for departure airport",
          },
          {
            ["name"] = "estArrivalAirport",
            ["title"] = "Est Arrival Airport",
            ["type"] = "`$STRING`",
            ["short"] = "Estimated arrival airport ICAO code",
          },
          {
            ["name"] = "estArrivalAirportHorizDistance",
            ["title"] = "Est Arrival Airport Horiz Distance",
            ["type"] = "`$INTEGER`",
            ["short"] = "Horizontal distance to estimated arrival airport in meters",
          },
          {
            ["name"] = "estArrivalAirportVertDistance",
            ["title"] = "Est Arrival Airport Vert Distance",
            ["type"] = "`$INTEGER`",
            ["short"] = "Vertical distance to estimated arrival airport in meters",
          },
          {
            ["name"] = "estDepartureAirport",
            ["title"] = "Est Departure Airport",
            ["type"] = "`$STRING`",
            ["short"] = "Estimated departure airport ICAO code",
          },
          {
            ["name"] = "estDepartureAirportHorizDistance",
            ["title"] = "Est Departure Airport Horiz Distance",
            ["type"] = "`$INTEGER`",
            ["short"] = "Horizontal distance to estimated departure airport in meters",
          },
          {
            ["name"] = "estDepartureAirportVertDistance",
            ["title"] = "Est Departure Airport Vert Distance",
            ["type"] = "`$INTEGER`",
            ["short"] = "Vertical distance to estimated departure airport in meters",
          },
          {
            ["name"] = "firstSeen",
            ["title"] = "First Seen",
            ["type"] = "`$INTEGER`",
            ["short"] = "Unix timestamp (seconds) of the first position report",
          },
          {
            ["name"] = "icao24",
            ["title"] = "Icao24",
            ["type"] = "`$STRING`",
            ["short"] = "Unique ICAO 24-bit address of the transponder in hex string representation",
          },
          {
            ["name"] = "lastSeen",
            ["title"] = "Last Seen",
            ["type"] = "`$INTEGER`",
            ["short"] = "Unix timestamp (seconds) of the last position report",
          },
        },
        ["name"] = "flight",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/flights/aircraft",
                ["segments"] = {
                  {
                    ["lit"] = "flights",
                  },
                  {
                    ["lit"] = "aircraft",
                  },
                },
                ["parts"] = {
                  "flights",
                  "aircraft",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "begin",
                      ["orig"] = "begin",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "end",
                      ["orig"] = "end",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "icao24",
                      ["orig"] = "icao24",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "aircraft",
                  ["exist"] = {
                    "begin",
                    "end",
                    "icao24",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/flights/arrival",
                ["segments"] = {
                  {
                    ["lit"] = "flights",
                  },
                  {
                    ["lit"] = "arrival",
                  },
                },
                ["parts"] = {
                  "flights",
                  "arrival",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "airport",
                      ["orig"] = "airport",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "begin",
                      ["orig"] = "begin",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "end",
                      ["orig"] = "end",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "arrival",
                  ["exist"] = {
                    "airport",
                    "begin",
                    "end",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/flights/departure",
                ["segments"] = {
                  {
                    ["lit"] = "flights",
                  },
                  {
                    ["lit"] = "departure",
                  },
                },
                ["parts"] = {
                  "flights",
                  "departure",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "airport",
                      ["orig"] = "airport",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "begin",
                      ["orig"] = "begin",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "end",
                      ["orig"] = "end",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "departure",
                  ["exist"] = {
                    "airport",
                    "begin",
                    "end",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/flights/all",
                ["segments"] = {
                  {
                    ["lit"] = "flights",
                  },
                  {
                    ["lit"] = "all",
                  },
                },
                ["parts"] = {
                  "flights",
                  "all",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "begin",
                      ["orig"] = "begin",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "end",
                      ["orig"] = "end",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "all",
                  ["exist"] = {
                    "begin",
                    "end",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["own"] = {
        ["fields"] = {
          {
            ["name"] = "states",
            ["title"] = "States",
            ["type"] = "`$ARRAY`",
            ["short"] = "Array of state vectors",
          },
          {
            ["name"] = "time",
            ["title"] = "Time",
            ["type"] = "`$INTEGER`",
            ["short"] = "The time which the state vectors in this response are associated with.",
          },
        },
        ["name"] = "own",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/states/own",
                ["segments"] = {
                  {
                    ["lit"] = "states",
                  },
                  {
                    ["lit"] = "own",
                  },
                },
                ["parts"] = {
                  "states",
                  "own",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.states`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "icao24",
                      ["orig"] = "icao24",
                      ["type"] = "`$ARRAY`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "serial",
                      ["orig"] = "serial",
                      ["type"] = "`$ARRAY`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "time",
                      ["orig"] = "time",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "icao24",
                    "serial",
                    "time",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["state_vector"] = {
        ["fields"] = {
          {
            ["name"] = "states",
            ["title"] = "States",
            ["type"] = "`$ARRAY`",
            ["short"] = "Array of state vectors",
          },
          {
            ["name"] = "time",
            ["title"] = "Time",
            ["type"] = "`$INTEGER`",
            ["short"] = "The time which the state vectors in this response are associated with.",
          },
        },
        ["name"] = "state_vector",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/states/all",
                ["segments"] = {
                  {
                    ["lit"] = "states",
                  },
                  {
                    ["lit"] = "all",
                  },
                },
                ["parts"] = {
                  "states",
                  "all",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.states`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "extended",
                      ["orig"] = "extended",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "icao24",
                      ["orig"] = "icao24",
                      ["type"] = "`$ARRAY`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "lamax",
                      ["orig"] = "lamax",
                      ["type"] = "`$NUMBER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "lamin",
                      ["orig"] = "lamin",
                      ["type"] = "`$NUMBER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "lomax",
                      ["orig"] = "lomax",
                      ["type"] = "`$NUMBER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "lomin",
                      ["orig"] = "lomin",
                      ["type"] = "`$NUMBER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "time",
                      ["orig"] = "time",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "extended",
                    "icao24",
                    "lamax",
                    "lamin",
                    "lomax",
                    "lomin",
                    "time",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["track"] = {
        ["fields"] = {
          {
            ["name"] = "callsign",
            ["title"] = "Callsign",
            ["type"] = "`$STRING`",
            ["short"] = "Callsign of the vehicle",
          },
          {
            ["name"] = "endTime",
            ["title"] = "End Time",
            ["type"] = "`$INTEGER`",
            ["short"] = "Unix timestamp (seconds) of the end of the track",
          },
          {
            ["name"] = "icao24",
            ["title"] = "Icao24",
            ["type"] = "`$STRING`",
            ["short"] = "Unique ICAO 24-bit address of the transponder",
          },
          {
            ["name"] = "path",
            ["title"] = "Path",
            ["type"] = "`$ARRAY`",
            ["short"] = "Array of waypoints representing the aircraft trajectory",
          },
          {
            ["name"] = "startTime",
            ["title"] = "Start Time",
            ["type"] = "`$INTEGER`",
            ["short"] = "Unix timestamp (seconds) of the start of the track",
          },
        },
        ["name"] = "track",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/tracks",
                ["segments"] = {
                  {
                    ["lit"] = "tracks",
                  },
                },
                ["parts"] = {
                  "tracks",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.path`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "icao24",
                      ["orig"] = "icao24",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "time",
                      ["orig"] = "time",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "icao24",
                    "time",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
