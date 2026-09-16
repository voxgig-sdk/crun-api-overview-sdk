

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


describe('TaskEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CRUN_API_OVERVIEW_TEST_LIVE=TRUE.
  afterEach(liveDelay('CRUN_API_OVERVIEW_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CrunApiOverviewSDK.test()
    const ent = testsdk.Task()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CRUN_API_OVERVIEW_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'task.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"date-time","name":"completed_at","req":false,"short":"Timestamp when the task was completed (if applicable)","type":"`$STRING`","index$":0},{"active":true,"format":"date-time","name":"created_at","req":true,"short":"Timestamp when the task was created","type":"`$STRING`","index$":1},{"active":true,"name":"credit_consumption","req":false,"short":"Number of credits consumed by this task","type":"`$NUMBER`","index$":2},{"active":true,"name":"error","req":false,"short":"Error details if the task failed","type":"`$OBJECT`","index$":3},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":4},{"active":true,"name":"input_parameters","req":false,"short":"The input parameters used to create the task","type":"`$OBJECT`","index$":5},{"active":true,"name":"model","req":true,"short":"Name of the AI model used for this task","type":"`$STRING`","index$":6},{"active":true,"name":"results","req":false,"short":"Generated media files or output data.","type":"`$ARRAY`","index$":7},{"active":true,"name":"status","req":true,"short":"Current status of the task","type":"`$STRING`","index$":8},{"active":true,"name":"task_id","req":true,"short":"Unique identifier of the task","type":"`$STRING`","index$":9}],"id":{"field":"id","name":"id"},"name":"task","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"task_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /tasks/{task_id}","json":"{\"operationId\":\"getTaskInfo\",\"parameters\":[{\"description\":\"The unique identifier of the task to retrieve\",\"in\":\"path\",\"name\":\"task_id\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"completed_at\":{\"description\":\"Timestamp when the task was completed (if applicable)\",\"format\":\"date-time\",\"nullable\":true,\"type\":\"string\"},\"created_at\":{\"description\":\"Timestamp when the task was created\",\"format\":\"date-time\",\"type\":\"string\"},\"credit_consumption\":{\"description\":\"Number of credits consumed by this task\",\"type\":\"number\"},\"error\":{\"description\":\"Error details if the task failed\",\"nullable\":true,\"properties\":{\"code\":{\"type\":\"integer\"},\"message\":{\"type\":\"string\"}},\"type\":\"object\"},\"input_parameters\":{\"description\":\"The input parameters used to create the task\",\"type\":\"object\"},\"model\":{\"description\":\"Name of the AI model used for this task\",\"type\":\"string\"},\"results\":{\"description\":\"Generated media files or output data. Available only when status is 'completed'. Files are stored for 14 days.\",\"items\":{\"properties\":{\"type\":{\"description\":\"Type of the generated file (e.g., image, video)\",\"type\":\"string\"},\"url\":{\"description\":\"URL to the generated media file\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"status\":{\"description\":\"Current status of the task\",\"enum\":[\"pending\",\"processing\",\"completed\",\"failed\"],\"type\":\"string\"},\"task_id\":{\"description\":\"Unique identifier of the task\",\"type\":\"string\"}},\"required\":[\"task_id\",\"status\",\"model\",\"created_at\"],\"type\":\"object\"}}},\"description\":\"Successful response with task details\"},\"401\":{\"content\":{\"application/json\":{\"example\":{\"code\":401,\"msg\":\"API key missing\"},\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"integer\"},\"msg\":{\"description\":\"Error message\",\"type\":\"string\"}},\"required\":[\"code\",\"msg\"],\"type\":\"object\"}}},\"description\":\"Authentication failed - API key missing or invalid\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"integer\"},\"msg\":{\"description\":\"Error message\",\"type\":\"string\"}},\"required\":[\"code\",\"msg\"],\"type\":\"object\"}}},\"description\":\"Task not found\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"integer\"},\"msg\":{\"description\":\"Error message\",\"type\":\"string\"}},\"required\":[\"code\",\"msg\"],\"type\":\"object\"}}},\"description\":\"Rate limit exceeded\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication. Create and manage your API keys at https://crun.ai/user-api-key\",\"in\":\"header\",\"name\":\"X-API-KEY\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/tasks/{task_id}","rename":{"param":{"task_id":"id"}},"segments":[{"lit":"tasks"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"task","name__orig":"task","Name":"Task","name_":"task","name-":"task","NAME":"TASK","index$":1}, {"active":true,"entity":"task","key$":"BasicTaskFlow","kind":"basic","name":"BasicTaskFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"task_ref01","srcdatavar":"task_ref01_data","suffix":"_dt0"},"match":{"id":"task01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-task_ref01"}}],"index$":0}]}, 'Task')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let task_ref01_data = Object.values(setup.data.existing.task)[0] as any

    // LOAD
    const task_ref01_ent = client.Task()
    const task_ref01_match_dt0: any = {}
    task_ref01_match_dt0.id = task_ref01_data.id
    const task_ref01_data_dt0 = (await task_ref01_ent.load(task_ref01_match_dt0)).data()
    assert(task_ref01_data_dt0.id === task_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/task/TaskTestData.json')

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
    ['task01','task02','task03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CRUN_API_OVERVIEW_TEST_TASK_ENTID': idmap,
    'CRUN_API_OVERVIEW_TEST_LIVE': 'FALSE',
    'CRUN_API_OVERVIEW_TEST_EXPLAIN': 'FALSE',
    'CRUN_API_OVERVIEW_APIKEY': '',
  })

  idmap = env['CRUN_API_OVERVIEW_TEST_TASK_ENTID']

  const live = 'TRUE' === env.CRUN_API_OVERVIEW_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CRUN_API_OVERVIEW_TEST_TASK_ENTID']
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
  
