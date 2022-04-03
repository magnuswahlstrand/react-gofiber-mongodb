package main

import (
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"log"
)

type ListUsersResponse struct {
	Users []User `json:"users"`
}

type AddUserResponse = User

var users []User

type User struct {
	Email string `validate:"required,email,min=6,max=32"`
	Name  string `validate:"required,min=2,max=32"`
}

var validate = validator.New()

func AddUser(c *fiber.Ctx) error {
	//Connect to database

	var user User
	if err := c.BodyParser(&user); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	if err := validate.Struct(user); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(serializeValidationErrors(err))

	}

	users = append(users, user)

	//Do something else here

	//Return user
	return c.JSON(user)
}

func main() {
	app := Setup()

	log.Fatal(app.Listen(":8080"))
}

func Setup() *fiber.App {
	app := fiber.New()

	app.Get("/users", func(c *fiber.Ctx) error {
		return c.JSON(ListUsersResponse{users})
	})

	app.Post("/users", AddUser)
	return app
}
