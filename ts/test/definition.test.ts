import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "task",
    "accessor": "Task",
    "op": "load",
    "method": "GET",
    "path": "/tasks/{task_id}",
    "args": [
      {
        "name": "id",
        "wire": "task_id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "x-api-key"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "task_id": "x",
      "status": "pending",
      "model": "x",
      "created_at": "2026-01-01T00:00:00Z",
      "completed_at": "2026-01-01T00:00:00Z",
      "input_parameters": {},
      "credit_consumption": 1,
      "results": [
        {
          "url": "x",
          "type": "x"
        }
      ],
      "error": {
        "code": 1,
        "message": "x"
      }
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
