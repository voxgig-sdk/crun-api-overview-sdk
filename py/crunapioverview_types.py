# Typed models for the CrunApiOverview SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Generate:
    model: str
    prompt: str
    status: str
    task_id: str
    aspect_ratio: Optional[str] = None
    callback_url: Optional[str] = None
    duration: Optional[float] = None
    height: Optional[int] = None
    image_url: Optional[str] = None
    negative_prompt: Optional[str] = None
    num_image: Optional[int] = None
    width: Optional[int] = None


@dataclass
class GenerateCreateData:
    aspect_ratio: Optional[str] = None
    callback_url: Optional[str] = None
    duration: Optional[float] = None
    height: Optional[int] = None
    image_url: Optional[str] = None
    model: Optional[str] = None
    negative_prompt: Optional[str] = None
    num_image: Optional[int] = None
    prompt: Optional[str] = None
    status: Optional[str] = None
    task_id: Optional[str] = None
    width: Optional[int] = None


@dataclass
class Task:
    created_at: str
    model: str
    status: str
    task_id: str
    completed_at: Optional[str] = None
    credit_consumption: Optional[float] = None
    error: Optional[dict] = None
    input_parameter: Optional[dict] = None
    result: Optional[list] = None


@dataclass
class TaskLoadMatch:
    id: str

