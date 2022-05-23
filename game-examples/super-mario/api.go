package main

import (
	"bufio"
	"fmt"
	"log"
	"net/http"
	"os"
)

type Score struct {
	Username string `json:"username"`
	Score    int    `json:"score"`
}

func scoreOutputHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Print("New GET request : ", r.URL)
	if r.URL.Path != "/scoreGET" {
		http.Error(w, "404 not found.", http.StatusNotFound)
		return
	}
	if r.Method != "GET" {
		http.Error(w, "Method is not supported.", http.StatusBadRequest)
		return
	} else {
		fmt.Println("New GET request")
		//x--------------------------------------------------x Open Json handler
		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.WriteHeader(http.StatusOK)
		//x--------------------------------------------------x
		aff, err := os.Open("struct.json")
		if err != nil {
			log.Fatalf("failed to encode Struct.json in httpServ")
		}
		scan := bufio.NewScanner(aff)
		scan.Split(bufio.ScanLines)
		for scan.Scan() {
			w.Write([]byte(scan.Text())) //xPrint byte
		}
		fmt.Print("get request")
	}
}

func scorestartHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	fmt.Print("New POST request : ", r.URL)
	if r.Method != "POST" {
		fmt.Println("error")
		http.Error(w, "Method is not supported.", http.StatusBadRequest)
		return
	} else if r.Method == "POST" {
		fmt.Print("New POST request : ", r.URL)
		postscore(w, r, Score{})
	}
}

func postscore(w http.ResponseWriter, r *http.Request, score Score) {
	fmt.Print("fdp")
}

func main() {
	FileServer := http.FileServer(http.Dir("./static"))
	http.Handle("/", FileServer)
	http.HandleFunc("/scoreGET", scoreOutputHandler)
	http.HandleFunc("/scorePOST", scorestartHandler)

	fmt.Printf("Starting server at port 8080 successfully\n")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
