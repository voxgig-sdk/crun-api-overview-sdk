// Typed models for the CrunApiOverview SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Generate {
  aspect_ratio?: string
  callback_url?: string
  duration?: number
  height?: number
  image_url?: string
  model: string
  negative_prompt?: string
  num_images?: number
  prompt: string
  status: string
  task_id: string
  width?: number
}

export interface GenerateCreateData {
  aspect_ratio?: string
  callback_url?: string
  duration?: number
  height?: number
  image_url?: string
  model: string
  negative_prompt?: string
  num_images?: number
  prompt: string
  status: string
  task_id: string
  width?: number
}

export interface Task {
  completed_at?: string
  created_at: string
  credit_consumption?: number
  error?: Record<string, any>
  input_parameters?: Record<string, any>
  model: string
  results?: any[]
  status: string
  task_id: string
}

export interface TaskLoadMatch {
  id: string
}

