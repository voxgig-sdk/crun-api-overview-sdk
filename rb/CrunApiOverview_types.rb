# frozen_string_literal: true

# Typed models for the CrunApiOverview SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Generate entity data model.
#
# @!attribute [rw] aspect_ratio
#   @return [String, nil]
#
# @!attribute [rw] callback_url
#   @return [String, nil]
#
# @!attribute [rw] duration
#   @return [Float, nil]
#
# @!attribute [rw] height
#   @return [Integer, nil]
#
# @!attribute [rw] image_url
#   @return [String, nil]
#
# @!attribute [rw] model
#   @return [String]
#
# @!attribute [rw] negative_prompt
#   @return [String, nil]
#
# @!attribute [rw] num_image
#   @return [Integer, nil]
#
# @!attribute [rw] prompt
#   @return [String]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] task_id
#   @return [String]
#
# @!attribute [rw] width
#   @return [Integer, nil]
Generate = Struct.new(
  :aspect_ratio,
  :callback_url,
  :duration,
  :height,
  :image_url,
  :model,
  :negative_prompt,
  :num_image,
  :prompt,
  :status,
  :task_id,
  :width,
  keyword_init: true
)

# Request payload for Generate#create.
#
# @!attribute [rw] aspect_ratio
#   @return [String, nil]
#
# @!attribute [rw] callback_url
#   @return [String, nil]
#
# @!attribute [rw] duration
#   @return [Float, nil]
#
# @!attribute [rw] height
#   @return [Integer, nil]
#
# @!attribute [rw] image_url
#   @return [String, nil]
#
# @!attribute [rw] model
#   @return [String]
#
# @!attribute [rw] negative_prompt
#   @return [String, nil]
#
# @!attribute [rw] num_image
#   @return [Integer, nil]
#
# @!attribute [rw] prompt
#   @return [String]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] task_id
#   @return [String]
#
# @!attribute [rw] width
#   @return [Integer, nil]
GenerateCreateData = Struct.new(
  :aspect_ratio,
  :callback_url,
  :duration,
  :height,
  :image_url,
  :model,
  :negative_prompt,
  :num_image,
  :prompt,
  :status,
  :task_id,
  :width,
  keyword_init: true
)

# Task entity data model.
#
# @!attribute [rw] completed_at
#   @return [String, nil]
#
# @!attribute [rw] created_at
#   @return [String]
#
# @!attribute [rw] credit_consumption
#   @return [Float, nil]
#
# @!attribute [rw] error
#   @return [Hash, nil]
#
# @!attribute [rw] input_parameter
#   @return [Hash, nil]
#
# @!attribute [rw] model
#   @return [String]
#
# @!attribute [rw] result
#   @return [Array, nil]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] task_id
#   @return [String]
Task = Struct.new(
  :completed_at,
  :created_at,
  :credit_consumption,
  :error,
  :input_parameter,
  :model,
  :result,
  :status,
  :task_id,
  keyword_init: true
)

# Request payload for Task#load.
#
# @!attribute [rw] id
#   @return [String]
TaskLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

