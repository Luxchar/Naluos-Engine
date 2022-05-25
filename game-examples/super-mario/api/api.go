package main

import (
	"bufio"
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"reflect"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
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
		aff, err := os.Open("../struct.json")
		if err != nil {
			log.Fatalf("failed to encode struct.json in api.go")
		}
		scan := bufio.NewScanner(aff)
		scan.Split(bufio.ScanLines)
		for scan.Scan() {
			w.Write([]byte(scan.Text()))
		}
		aff.Close()

		//get score and return it
	}
}

func scorestartHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	if r.Method != "POST" {
		http.Error(w, "Method is not supported.", http.StatusBadRequest)
		return
	} else if r.Method == "POST" {
		fmt.Println("New POST request")
		score := Score{}
		err := json.NewDecoder(r.Body).Decode(&score)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		// Declare host and port options to pass to the Connect() method
		clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")
		fmt.Println("clientOptions type:", reflect.TypeOf(clientOptions), "\n")
		// Connect to the MongoDB and return Client instance
		client, err := mongo.Connect(context.TODO(), clientOptions)
		if err != nil {
			fmt.Println("mongo.Connect() ERROR:", err)
			os.Exit(1)
		}
		// Access a MongoDB collection through a database
		col := client.Database("mario").Collection("scoreboard")
		ctx, _ := context.WithTimeout(context.Background(), 15*time.Second)

		cursor, err := col.Find(ctx, score) //find the score
		if err != nil {
			log.Fatal(err)
		}
		var scoretest Score
		if err = cursor.All(ctx, &scoretest); err != nil { //if score is not found
			fmt.Println("New score")
			col.InsertOne(ctx, score)
		} else {
			fmt.Println("Update score")
			if score.Score > scoretest.Score {
				fmt.Print("New score is better than old one")
				col.UpdateOne(ctx, score, scoretest)
				// col.DeleteOne(ctx, scoretest)
				// col.InsertOne(ctx, score)
			}
		}
	}
}

func main() {
	FileServer := http.FileServer(http.Dir("./static"))
	http.Handle("/", FileServer)
	http.HandleFunc("/scoreGET", scoreOutputHandler)
	http.HandleFunc("/scorePOST", scorestartHandler)

	fmt.Printf("Starting server at port 8080 successfully\n")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
