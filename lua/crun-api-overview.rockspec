package = "voxgig-sdk-crun-api-overview"
version = "0.0.1-1"
source = {
  -- git+https (GitHub dropped git:// in 2022); pin the install to the release
  -- tag pushed by `make publish`, and point at the lua/ subdir of the monorepo.
  url = "git+https://github.com/voxgig-sdk/crun-api-overview-sdk.git",
  tag = "lua/v0.0.1",
  dir = "crun-api-overview-sdk/lua"
}
description = {
  summary = "CrunApiOverview SDK for Lua",
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
    ["crun-api-overview_sdk"] = "crun-api-overview_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
