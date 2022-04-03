package main

import (
	"bytes"
	"encoding/json"
	"github.com/gofiber/fiber/v2"
	"github.com/stretchr/testify/require"
	"net/http"
	"testing"
)

func listUsers(t *testing.T, app *fiber.App) ListUsersResponse {

	req, _ := http.NewRequest(
		"GET",
		"/users",
		nil,
	)

	res, err := app.Test(req, -1)
	require.NoError(t, err)

	require.Equal(t, 200, res.StatusCode)

	var resp ListUsersResponse
	err = json.NewDecoder(res.Body).Decode(&resp)
	require.NoError(t, err)
	return resp
}

func addUser(t *testing.T, app *fiber.App, u User) AddUserResponse {
	b := new(bytes.Buffer)
	err := json.NewEncoder(b).Encode(u)
	require.NoError(t, err)

	req, _ := http.NewRequest(
		"POST",
		"/users",
		b,
	)

	res, err := app.Test(req, -1)
	require.NoError(t, err)

	require.Equalf(t, 200, res.StatusCode, res.Status)

	var resp AddUserResponse
	err = json.NewDecoder(res.Body).Decode(&resp)
	require.NoError(t, err)
	return resp
}

func Test_ListUsers(t *testing.T) {
	app := Setup()
	addUser(t, app, User{
		Email: "magnus@example.org",
		Name:  "Magnus",
	})
	addUser(t, app, User{
		Email: "magnus@example.org",
		Name:  "Magnus",
	})

	resp := listUsers(t, app)
	require.Len(t, resp.Users, 2)
}

func Test_ListUsersWhenEmpty(t *testing.T) {
	app := Setup()

	resp := listUsers(t, app)
	require.Len(t, resp.Users, 0)
}
