package helpers

import (
	"fmt"
	"os"
)

func StoreVariables(boundaryAddress string, dbeaverPath string) bool {
	envFile, err := os.OpenFile("./.env", os.O_RDWR|os.O_CREATE, 0644)
	if err != nil {
		fmt.Println("Error opening file:", err)
		return false
	}
	defer envFile.Close()

	_, err = envFile.WriteString(fmt.Sprintf("BOUNDARY_ADDRESS=%s\nDBEAVER_CONFIG_PATH=%s\n", boundaryAddress, dbeaverPath))
	if err != nil {
		fmt.Println("Error writing to file:", err)
		return false
	}
	os.Setenv("BOUNDARY_ADDRESS", boundaryAddress)
	os.Setenv("DBEAVER_CONFIG_PATH", dbeaverPath)

	fmt.Println("Variables stored successfully")
	return true
}
