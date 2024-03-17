package helpers

import (
	"fmt"
	"os"
	"os/exec"
)

func AuthenticateIfNeeded() (bool, string) {

	cmd := exec.Command(GetEnvByKey("BOUNDARY_PATH"), "authenticate", "-addr="+GetEnvByKey("BOUNDARY_ADDRESS"))
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	err := cmd.Run()
	if err != nil {
		msg := fmt.Sprintf("Error executing command: %s", err)
		fmt.Println(msg, err)
		return false, msg
	}

	cmd.Wait()

	msg := "Authenticated successfully"
	fmt.Println(msg)
	return true, msg

}
