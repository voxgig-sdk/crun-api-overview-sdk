// Typed models for the CrunApiOverview SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Generate is the typed data model for the generate entity.
type Generate struct {
	AspectRatio *string `json:"aspect_ratio,omitempty"`
	CallbackUrl *string `json:"callback_url,omitempty"`
	Duration *float64 `json:"duration,omitempty"`
	Height *int `json:"height,omitempty"`
	ImageUrl *string `json:"image_url,omitempty"`
	Model string `json:"model"`
	NegativePrompt *string `json:"negative_prompt,omitempty"`
	NumImage *int `json:"num_image,omitempty"`
	Prompt string `json:"prompt"`
	Status string `json:"status"`
	TaskId string `json:"task_id"`
	Width *int `json:"width,omitempty"`
}

// GenerateCreateData mirrors the generate fields as an all-optional match
// filter (Go analog of Partial<Generate>).
type GenerateCreateData struct {
	AspectRatio *string `json:"aspect_ratio,omitempty"`
	CallbackUrl *string `json:"callback_url,omitempty"`
	Duration *float64 `json:"duration,omitempty"`
	Height *int `json:"height,omitempty"`
	ImageUrl *string `json:"image_url,omitempty"`
	Model *string `json:"model,omitempty"`
	NegativePrompt *string `json:"negative_prompt,omitempty"`
	NumImage *int `json:"num_image,omitempty"`
	Prompt *string `json:"prompt,omitempty"`
	Status *string `json:"status,omitempty"`
	TaskId *string `json:"task_id,omitempty"`
	Width *int `json:"width,omitempty"`
}

// Task is the typed data model for the task entity.
type Task struct {
	CompletedAt *string `json:"completed_at,omitempty"`
	CreatedAt string `json:"created_at"`
	CreditConsumption *float64 `json:"credit_consumption,omitempty"`
	Error *map[string]any `json:"error,omitempty"`
	InputParameter *map[string]any `json:"input_parameter,omitempty"`
	Model string `json:"model"`
	Result *[]any `json:"result,omitempty"`
	Status string `json:"status"`
	TaskId string `json:"task_id"`
}

// TaskLoadMatch is the typed request payload for Task.LoadTyped.
type TaskLoadMatch struct {
	Id string `json:"id"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
