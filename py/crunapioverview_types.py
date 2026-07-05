# Typed models for the CrunApiOverview SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class GenerateRequired(TypedDict):
    model: str
    prompt: str
    status: str
    task_id: str


class Generate(GenerateRequired, total=False):
    aspect_ratio: str
    callback_url: str
    duration: float
    height: int
    image_url: str
    negative_prompt: str
    num_image: int
    width: int


class GenerateCreateDataRequired(TypedDict):
    model: str
    prompt: str
    status: str
    task_id: str


class GenerateCreateData(GenerateCreateDataRequired, total=False):
    aspect_ratio: str
    callback_url: str
    duration: float
    height: int
    image_url: str
    negative_prompt: str
    num_image: int
    width: int


class TaskRequired(TypedDict):
    created_at: str
    model: str
    status: str
    task_id: str


class Task(TaskRequired, total=False):
    completed_at: str
    credit_consumption: float
    error: dict
    input_parameter: dict
    result: list


class TaskLoadMatch(TypedDict):
    id: str
