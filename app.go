package main

import (
	"boundary-wrapper/helpers"
	"context"
	"fmt"
)

var BoundaryAccess = ""
var DBeaverConfigPath = ""
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

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) StoreBoundaryAccess(add string) {
	BoundaryAccess = add
}

func (a *App) StoreDBeaverConfigPath(path string) {
	DBeaverConfigPath = path
}

func (a *App) GetAvailableTargets() []helpers.Target {
	targets = helpers.Get_all_targets()
	return targets
}

func (a *App) ConnectToTarget(targetId string) (helpers.Credentials, error) {
	// filter and find from targets by id
	fmt.Println("Connecting to target", targetId)

	for _, t := range targets {
		if t.ID == targetId {
			c := helpers.Connect_to_target(t)
			return c, nil
		}
	}
	return helpers.Credentials{}, fmt.Errorf("Target not found")
}

func (a *App) SetupDBeaverConfig(credendtials helpers.Credentials, dbname string) bool {
	helpers.Setup_dbeaver(credendtials, dbname)
	return true
}
