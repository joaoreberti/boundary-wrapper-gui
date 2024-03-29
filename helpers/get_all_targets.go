package helpers

import (
	"bufio"
	"fmt"
	"os/exec"
	"strings"
)

// Output
// --
// ID:                    {id}
//
//	Scope ID:            {id}
//	Version:             3
//	Type:                tcp
//	Name:                {name}
//	Authorized Actions:
//	  authorize-session
//	  no-op
//	  read
type Target struct {
	ID string
	// ScopeID           string
	// Version           string
	// Type              string
	Name string
	// AuthorizedActions []string
}

func GetAllTargets() []Target {
	cmd := exec.Command(GetEnvByKey("BOUNDARY_PATH"), "targets", "list", "--recursive", "-addr="+GetEnvByKey("BOUNDARY_ADDRESS"))

	// Get a pipe to read from standard out
	r, _ := cmd.StdoutPipe()

	// Use the same pipe for standard error
	cmd.Stderr = cmd.Stdout

	// Start the command and check for errors
	err := cmd.Start()
	if err != nil {
		fmt.Println("error", err)
	}

	// Create a scanner which scans r in a line-by-line fashion
	scanner := bufio.NewScanner(r)

	// Use the scanner to scan the output line by line and log it
	fmt.Println("resource listing output")
	targets := []Target{}

	// Read line by line and process it
	for scanner.Scan() {
		line := scanner.Text()
		line = strings.TrimSpace(line)
		fmt.Println(line)
		if len(targets) > 0 && targets[len(targets)-1].Name == "Name:" {
			targets[len(targets)-1].Name = line
		}
		if strings.Contains(line, "ID:") && !strings.Contains(line, "Scope") {
			target := Target{}
			target.ID = strings.ReplaceAll(strings.ReplaceAll(line, "ID: ", ""), " ", "")
			targets = append(targets, target)

		}
		if strings.Contains(line, "Name:") {
			targets[len(targets)-1].Name = strings.ReplaceAll(strings.ReplaceAll(line, "Name: ", ""), " ", "")
		}
	}

	// Wait for the command to finish
	err = cmd.Wait()
	// fmt.Println("resource listing output", err)
	return targets
}
