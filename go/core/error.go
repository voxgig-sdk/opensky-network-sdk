package core

type OpenskyNetworkError struct {
	IsOpenskyNetworkError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewOpenskyNetworkError(code string, msg string, ctx *Context) *OpenskyNetworkError {
	return &OpenskyNetworkError{
		IsOpenskyNetworkError: true,
		Sdk:              "OpenskyNetwork",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *OpenskyNetworkError) Error() string {
	return e.Msg
}
