package = "voxgig-sdk-crun-api-overview"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/crun-api-overview-sdk.git"
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
