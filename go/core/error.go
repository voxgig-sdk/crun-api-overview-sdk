package core

type CrunApiOverviewError struct {
	IsCrunApiOverviewError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewCrunApiOverviewError(code string, msg string, ctx *Context) *CrunApiOverviewError {
	return &CrunApiOverviewError{
		IsCrunApiOverviewError: true,
		Sdk:              "CrunApiOverview",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *CrunApiOverviewError) Error() string {
	return e.Msg
}
