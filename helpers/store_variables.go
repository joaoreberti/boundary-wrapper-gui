package helpers

import (
	"fmt"
	"os"
	"os/user"
	"path/filepath"

	"github.com/joho/godotenv"
)

var BOUNDARY_ADDRESS string
var DBEAVER_CONFIG_PATH string
var BOUNDARY_PATH string
var dirName = ".my-application"
var envPath = ""

func StoreVariables(boundaryAddress string, dbeaverPath string, boundaryPath string) (bool, string) {
	envFile, err := os.OpenFile(envPath, os.O_RDWR|os.O_CREATE, 0644)
	if err != nil {
		msg := fmt.Sprintf("Error opening file:: %s", err)
		fmt.Println(msg, err)
		return false, msg
	}
	defer envFile.Close()

	_, err = envFile.WriteString(fmt.Sprintf("BOUNDARY_ADDRESS=%s\nDBEAVER_CONFIG_PATH=%s\n=BOUNDARY_PATH=%s\n", boundaryAddress, dbeaverPath, boundaryPath))

	if err != nil {
		msg := fmt.Sprintf("Error writing to file: %s", err)
		fmt.Println(msg, err)
		return false, msg
	}
	os.Setenv("BOUNDARY_ADDRESS", boundaryAddress)
	os.Setenv("DBEAVER_CONFIG_PATH", dbeaverPath)
	os.Setenv("BOUNDARY_PATH", boundaryPath)

	msg := "Variables stored successfully"
	fmt.Println(msg)
	return true, msg
}

func CheckEnv() bool {
	usr, err := user.Current()
	if err != nil {
		fmt.Println("Error getting user's home directory:", err)
		return false
	}

	// Construct the path to the directory in the home directory
	dirPath := filepath.Join(usr.HomeDir, dirName)

	// Ensure that the directory exists
	err = os.MkdirAll(dirPath, 0755)
	if err != nil {
		fmt.Println("Error creating directory:", err)
		return false
	}

	envPath = filepath.Join(dirPath, ".env")

	err = godotenv.Load(envPath)
	if err != nil {
		fmt.Println("Error loading .env file")
		return false
	}
	BOUNDARY_ADDRESS = os.Getenv("BOUNDARY_ADDRESS")
	DBEAVER_CONFIG_PATH = os.Getenv("DBEAVER_CONFIG_PATH")
	BOUNDARY_PATH = os.Getenv("BOUNDARY_PATH")

	if BOUNDARY_ADDRESS == "" || DBEAVER_CONFIG_PATH == "" || BOUNDARY_PATH == "" {
		fmt.Println("Error loading .env file")
		return false
	}
	return true
}

func GetEnvByKey(key string) string {
	err := godotenv.Load(envPath)
	if err != nil {
		fmt.Println("Error loading .env file")
	}

	return os.Getenv(key)
}
