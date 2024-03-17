package main

import (
	"boundary-wrapper/helpers"
	"context"
	"fmt"
	"os"
)

var targets = []helpers.Target{}
var credentials = helpers.Credentials{}

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	// helpers.Authenticate_if_needed()

}

func (a *App) ValidateEnv() bool {

	dbeaverPath := os.Getenv("DBEAVER_CONFIG_PATH")
	if dbeaverPath == "" {
		fmt.Println("Error loading .env file")
		return false
	}

	boundaryPath := os.Getenv("BOUNDARY_ADDRESS")
	if boundaryPath == "" {
		fmt.Println("Error loading .env file")
		return false
	}
	return true
}

func (a *App) StoreEnvs(boundaryAddress string, dbeaverPath string) bool {
	return helpers.StoreVariables(boundaryAddress, dbeaverPath)

}

func (a *App) ConnectToBoundary() bool {
	return helpers.AuthenticateIfNeeded()
}

func (a *App) GetAvailableTargets() []helpers.Target {
	targets = helpers.GetAllTargets()
	return targets
}

func (a *App) ConnectToTarget(targetId string) (helpers.Credentials, error) {
	// filter and find from targets by id
	fmt.Println("Connecting to target", targetId)

	for _, t := range targets {
		if t.ID == targetId {
			c := helpers.ConnectToTarget(t)
			return c, nil
		}
	}
	return helpers.Credentials{}, fmt.Errorf("Target not found")
}

func (a *App) SetupDBeaverConfig(credendtials helpers.Credentials, dbname string) bool {
	helpers.SetupDBeaver(credendtials, dbname)
	return true
}
