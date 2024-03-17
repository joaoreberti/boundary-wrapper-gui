package helpers

import (
	"fmt"
	"os"
	"os/exec"
)

func AuthenticateIfNeeded() bool {

	cmd := exec.Command("boundary", "authenticate", "-addr="+os.Getenv("BOUNDARY_ADDRESS"))
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	err := cmd.Run()
	if err != nil {
		fmt.Println("Error executing command:", err)
		return false
	}

	cmd.Wait()

	fmt.Println("Authenticated successfully")
	return true

}
