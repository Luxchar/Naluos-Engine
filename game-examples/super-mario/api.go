package main

import (
	"fmt"
	"log"
	"net/http"
)

type score struct {
	Username string `json:"username"`
	Score    int    `json:"score"`
}

func main() {
	FileServer := http.FileServer(http.Dir("./static"))
	http.Handle("/", FileServer)
	// http.HandleFunc("/hangmanGET", hangmanOutputHandler)
	// http.HandleFunc("/hangmanPOST", hangmanstartHandler)

	fmt.Printf("Starting server at port 8080 successfully\n")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
