package main

import (
	"bufio"
	"fmt"
	"log"
	"net/http"
	"os"
)

type score struct {
	Username string `json:"username"`
	Score    int    `json:"score"`
}

func scoreOutputHandler(w http.ResponseWriter, r *http.Request) {
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
	}
}

func scorestartHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	fmt.Println("New POST request : ", r.URL)
	if r.Method != "POST" {
		http.Error(w, "Method is not supported.", http.StatusBadRequest)
		return
	} else if r.Method == "POST" {
		// postscore(w, r, score{})
	}
}

// func postscore(w http.ResponseWriter, r *http.Request, score score) {
// 	decoder := json.NewDecoder(r.Body)
// 	var t score
// 	err := decoder.Decode(&t)
// 	if err != nil {
// 		panic(err)
// 	}
// 	log.Println(t.Test)
// }

func main() {
	FileServer := http.FileServer(http.Dir("./static"))
	http.Handle("/", FileServer)
	http.HandleFunc("/scoreGET", scoreOutputHandler)
	http.HandleFunc("/scorePOST", scorestartHandler)

	fmt.Printf("Starting server at port 8080 successfully\n")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
