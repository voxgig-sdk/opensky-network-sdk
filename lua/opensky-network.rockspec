package = "voxgig-sdk-opensky-network"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/opensky-network-sdk.git"
}
description = {
  summary = "OpenskyNetwork SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["opensky-network_sdk"] = "opensky-network_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
