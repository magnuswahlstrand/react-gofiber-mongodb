package main

import (
	"fmt"
	"github.com/go-playground/validator/v10"
)

type ErrorResponse struct {
	FailedField string
	Tag         string
	Value       string
	Error       string
}

func serializeValidationErrors(err error) []*ErrorResponse {
	var errors []*ErrorResponse
	if err != nil {
		for _, err := range err.(validator.ValidationErrors) {
			errors = append(errors, &ErrorResponse{
				FailedField: err.StructNamespace(),
				Tag:         err.Tag(),
				Value:       err.Param(),
				Error:       err.Error(),
			})
		}
		fmt.Printf("%v\n", err)
	}
	return errors
}
