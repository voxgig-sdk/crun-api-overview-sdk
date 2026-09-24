

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"completed_at":{"a":true,"fo":"date-time","h":"Completed At","n":"completed_at","r":false,"sh":"Timestamp when the task was completed (if applicable)","t":"`$STRING`","key$":"completed_at","index$":0},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":true,"sh":"Timestamp when the task was created","t":"`$STRING`","key$":"created_at","index$":1},"credit_consumption":{"a":true,"h":"Credit Consumption","n":"credit_consumption","r":false,"sh":"Number of credits consumed by this task","t":"`$NUMBER`","key$":"credit_consumption","index$":2},"error":{"a":true,"h":"Error","n":"error","r":false,"sh":"Error details if the task failed","t":"`$OBJECT`","key$":"error","index$":3},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":4},"input_parameters":{"a":true,"h":"Input Parameters","n":"input_parameters","r":false,"sh":"The input parameters used to create the task","t":"`$OBJECT`","key$":"input_parameters","index$":5},"model":{"a":true,"h":"Model","n":"model","r":true,"sh":"Name of the AI model used for this task","t":"`$STRING`","key$":"model","index$":6},"results":{"a":true,"h":"Results","n":"results","r":false,"sh":"Generated media files or output data.","t":"`$ARRAY`","key$":"results","index$":7},"status":{"a":true,"h":"Status","n":"status","r":true,"sh":"Current status of the task","t":"`$STRING`","key$":"status","index$":8},"task_id":{"a":true,"h":"Task Id","n":"task_id","r":true,"sh":"Unique identifier of the task","t":"`$STRING`","key$":"task_id","index$":9}},"id":{"field":"id","name":"id"},"name":"task","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /tasks/{task_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"task_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/tasks/{task_id}","q":{"exist":["id"]},"r":{"param":{"task_id":"id"}},"s":[{"lit":"tasks"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"task","name__orig":"task","Name":"Task","name_":"task","name-":"task","NAME":"TASK","index$":1}, {"active":true,"entity":"task","key$":"BasicTaskFlow","kind":"basic","name":"BasicTaskFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"task_ref01","srcdatavar":"task_ref01_data","suffix":"_dt0"},"m":{"id":"task01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-task_ref01"}}],"index$":0}]}, 'Task', {"GET /tasks/{task_id}":{"protocol":"http","operationId":"getTaskInfo","responses":{"200":{"description":"Successful response with task details","content":{"application/json":{"schema":{"type":"object","properties":{"task_id":{"type":"string","description":"Unique identifier of the task","key$":"task_id"},"status":{"type":"string","enum":["pending","processing","completed","failed"],"description":"Current status of the task","key$":"status"},"model":{"type":"string","description":"Name of the AI model used for this task","key$":"model"},"created_at":{"type":"string","format":"date-time","description":"Timestamp when the task was created","key$":"created_at"},"completed_at":{"type":"string","format":"date-time","description":"Timestamp when the task was completed (if applicable)","nullable":true,"key$":"completed_at"},"input_parameters":{"type":"object","description":"The input parameters used to create the task","key$":"input_parameters"},"credit_consumption":{"type":"number","description":"Number of credits consumed by this task","key$":"credit_consumption"},"results":{"type":"array","description":"Generated media files or output data. Available only when status is 'completed'. Files are stored for 14 days.","items":{"type":"object","properties":{"url":{"type":"string","format":"uri","description":"URL to the generated media file"},"type":{"type":"string","description":"Type of the generated file (e.g., image, video)"}}},"key$":"results"},"error":{"type":"object","description":"Error details if the task failed","nullable":true,"properties":{"code":{"type":"integer"},"message":{"type":"string"}},"key$":"error"}},"required":["task_id","status","model","created_at"],"x-ref":"#/components/schemas/TaskResponse","index$":0}}}},"401":{"description":"Authentication failed - API key missing or invalid","content":{"application/json":{"schema":{"type":"object","properties":{"code":{"type":"integer","description":"Error code"},"msg":{"type":"string","description":"Error message"}},"required":["code","msg"],"x-ref":"#/components/schemas/Error"},"example":{"code":401,"msg":"API key missing"}}}},"404":{"description":"Task not found","content":{"application/json":{"schema":{"type":"object","properties":{"code":{"type":"integer","description":"Error code"},"msg":{"type":"string","description":"Error message"}},"required":["code","msg"],"x-ref":"#/components/schemas/Error"}}}},"429":{"description":"Rate limit exceeded","content":{"application/json":{"schema":{"type":"object","properties":{"code":{"type":"integer","description":"Error code"},"msg":{"type":"string","description":"Error message"}},"required":["code","msg"],"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"task_id","in":"path","required":true,"description":"The unique identifier of the task to retrieve","schema":{"type":"string"},"index$":0}],"security":[{"ApiKeyAuth":[]}],"securitySource":"definition","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"header","name":"X-API-KEY","description":"API key for authentication. Create and manage your API keys at https://crun.ai/user-api-key"}}}})
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
  
