

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { CrunApiOverviewSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('GenerateEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CRUN_API_OVERVIEW_TEST_LIVE=TRUE.
  afterEach(liveDelay('CRUN_API_OVERVIEW_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CrunApiOverviewSDK.test()
    const ent = testsdk.Generate()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CRUN_API_OVERVIEW_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'generate.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"aspect_ratio","req":false,"short":"Aspect ratio of the video (e.g., 16:9, 9:16, 1:1)","type":"`$STRING`","index$":0},{"active":true,"format":"uri","name":"callback_url","req":false,"short":"Optional webhook URL to receive task completion notification","type":"`$STRING`","index$":1},{"active":true,"name":"duration","req":false,"short":"Duration of the video in seconds","type":"`$NUMBER`","index$":2},{"active":true,"name":"height","req":false,"short":"Height of the generated image in pixels","type":"`$INTEGER`","index$":3},{"active":true,"format":"uri","name":"image_url","req":false,"short":"Optional reference image URL for image-to-video generation","type":"`$STRING`","index$":4},{"active":true,"name":"model","req":true,"short":"Name of the image generation model to use (e.g., google-seedream, flux, qwen, z-image, wan, openai, grok, imagine)","type":"`$STRING`","index$":5},{"active":true,"name":"negative_prompt","req":false,"short":"Text description of what to avoid in the generated image","type":"`$STRING`","index$":6},{"active":true,"name":"num_images","req":false,"short":"Number of images to generate","type":"`$INTEGER`","index$":7},{"active":true,"name":"prompt","req":true,"short":"Text description of the image to generate","type":"`$STRING`","index$":8},{"active":true,"name":"status","req":true,"short":"Initial status of the task","type":"`$STRING`","index$":9},{"active":true,"name":"task_id","req":true,"short":"Unique identifier for the created task.","type":"`$STRING`","index$":10},{"active":true,"name":"width","req":false,"short":"Width of the generated image in pixels","type":"`$INTEGER`","index$":11}],"name":"generate","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /image/generate","json":"{\"operationId\":\"generateImage\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"callback_url\":{\"description\":\"Optional webhook URL to receive task completion notification\",\"format\":\"uri\",\"nullable\":true,\"type\":\"string\"},\"height\":{\"description\":\"Height of the generated image in pixels\",\"nullable\":true,\"type\":\"integer\"},\"model\":{\"description\":\"Name of the image generation model to use (e.g., google-seedream, flux, qwen, z-image, wan, openai, grok, imagine)\",\"example\":\"flux\",\"type\":\"string\"},\"negative_prompt\":{\"description\":\"Text description of what to avoid in the generated image\",\"nullable\":true,\"type\":\"string\"},\"num_images\":{\"default\":1,\"description\":\"Number of images to generate\",\"minimum\":1,\"nullable\":true,\"type\":\"integer\"},\"prompt\":{\"description\":\"Text description of the image to generate\",\"type\":\"string\"},\"width\":{\"description\":\"Width of the generated image in pixels\",\"nullable\":true,\"type\":\"integer\"}},\"required\":[\"model\",\"prompt\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"status\":{\"description\":\"Initial status of the task\",\"enum\":[\"pending\",\"processing\"],\"type\":\"string\"},\"task_id\":{\"description\":\"Unique identifier for the created task. Use this to poll for task status and results.\",\"type\":\"string\"}},\"required\":[\"task_id\",\"status\"],\"type\":\"object\"}}},\"description\":\"Task created successfully\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"integer\"},\"msg\":{\"description\":\"Error message\",\"type\":\"string\"}},\"required\":[\"code\",\"msg\"],\"type\":\"object\"}}},\"description\":\"Authentication failed\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"integer\"},\"msg\":{\"description\":\"Error message\",\"type\":\"string\"}},\"required\":[\"code\",\"msg\"],\"type\":\"object\"}}},\"description\":\"Rate limit exceeded - more than 20 requests per 10 seconds\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication. Create and manage your API keys at https://crun.ai/user-api-key\",\"in\":\"header\",\"name\":\"X-API-KEY\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/image/generate","segments":[{"lit":"image"},{"lit":"generate"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{},"contract":{"id":"POST /video/generate","json":"{\"operationId\":\"generateVideo\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"aspect_ratio\":{\"description\":\"Aspect ratio of the video (e.g., 16:9, 9:16, 1:1)\",\"nullable\":true,\"type\":\"string\"},\"callback_url\":{\"description\":\"Optional webhook URL to receive task completion notification\",\"format\":\"uri\",\"nullable\":true,\"type\":\"string\"},\"duration\":{\"description\":\"Duration of the video in seconds\",\"nullable\":true,\"type\":\"number\"},\"image_url\":{\"description\":\"Optional reference image URL for image-to-video generation\",\"format\":\"uri\",\"nullable\":true,\"type\":\"string\"},\"model\":{\"description\":\"Name of the video generation model to use (e.g., google, grok, imagine, kling, bytedance, sora2, wan, vidu, hailuo, runway)\",\"example\":\"kling\",\"type\":\"string\"},\"prompt\":{\"description\":\"Text description of the video to generate\",\"type\":\"string\"}},\"required\":[\"model\",\"prompt\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"status\":{\"description\":\"Initial status of the task\",\"enum\":[\"pending\",\"processing\"],\"type\":\"string\"},\"task_id\":{\"description\":\"Unique identifier for the created task. Use this to poll for task status and results.\",\"type\":\"string\"}},\"required\":[\"task_id\",\"status\"],\"type\":\"object\"}}},\"description\":\"Task created successfully\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"integer\"},\"msg\":{\"description\":\"Error message\",\"type\":\"string\"}},\"required\":[\"code\",\"msg\"],\"type\":\"object\"}}},\"description\":\"Authentication failed\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"integer\"},\"msg\":{\"description\":\"Error message\",\"type\":\"string\"}},\"required\":[\"code\",\"msg\"],\"type\":\"object\"}}},\"description\":\"Rate limit exceeded\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication. Create and manage your API keys at https://crun.ai/user-api-key\",\"in\":\"header\",\"name\":\"X-API-KEY\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/video/generate","segments":[{"lit":"video"},{"lit":"generate"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"generate","name__orig":"generate","Name":"Generate","name_":"generate","name-":"generate","NAME":"GENERATE","index$":0}, {"active":true,"entity":"generate","key$":"BasicGenerateFlow","kind":"basic","name":"BasicGenerateFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"generate_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0}]}, 'Generate')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const generate_ref01_ent = client.Generate()
    let generate_ref01_data = setup.data.new.generate['generate_ref01']

    generate_ref01_data = (await generate_ref01_ent.create(generate_ref01_data)).data()
    assert(null != generate_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/generate/GenerateTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = CrunApiOverviewSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['generate01','generate02','generate03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CRUN_API_OVERVIEW_TEST_GENERATE_ENTID': idmap,
    'CRUN_API_OVERVIEW_TEST_LIVE': 'FALSE',
    'CRUN_API_OVERVIEW_TEST_EXPLAIN': 'FALSE',
    'CRUN_API_OVERVIEW_APIKEY': '',
  })

  idmap = env['CRUN_API_OVERVIEW_TEST_GENERATE_ENTID']

  const live = 'TRUE' === env.CRUN_API_OVERVIEW_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CRUN_API_OVERVIEW_TEST_GENERATE_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new CrunApiOverviewSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.CRUN_API_OVERVIEW_APIKEY,
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.CRUN_API_OVERVIEW_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
