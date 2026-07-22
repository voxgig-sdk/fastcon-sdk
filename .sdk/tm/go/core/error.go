package core

type FastconError struct {
	IsFastconError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewFastconError(code string, msg string, ctx *Context) *FastconError {
	return &FastconError{
		IsFastconError: true,
		Sdk:              "Fastcon",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *FastconError) Error() string {
	return e.Msg
}
