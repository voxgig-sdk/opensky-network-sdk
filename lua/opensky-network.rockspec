package = "voxgig-sdk-opensky-network"
version = "0.0.1-1"
source = {
  -- git+https (GitHub dropped git:// in 2022); pin the install to the release
  -- tag pushed by `make publish`, and point at the lua/ subdir of the monorepo.
  url = "git+https://github.com/voxgig-sdk/opensky-network-sdk.git",
  tag = "lua/v0.0.1",
  dir = "opensky-network-sdk/lua"
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
