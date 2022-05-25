package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Score struct {
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
		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.WriteHeader(http.StatusOK)
		GetReq(w, r)
	}
}

func GetReq(w http.ResponseWriter, r *http.Request) { // Get score from DB and return it
	// Declare host and port options to pass to the Connect() method
	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")

	// Connect to the MongoDB and return Client instance
	client, err := mongo.Connect(context.TODO(), clientOptions)

	if err != nil {
		fmt.Println("mongo.Connect() ERROR:", err)
		os.Exit(1)
	}

	// Declare Context type object for managing multiple API requests
	ctx, _ := context.WithTimeout(context.Background(), 15*time.Second)

	// Access a MongoDB collection through a database
	col := client.Database("mario").Collection("scoreboard")

	// Sort by score in descending order and limit to 10 results
	filter := bson.D{}
	opts := options.Find().SetSort(bson.D{{"score", 1}}).SetLimit(10)
	cursor, err := col.Find(context.TODO(), filter, opts)
	var results []bson.D
	if err = cursor.All(context.TODO(), &results); err != nil {
		panic(err)
	}

	json.NewEncoder(w).Encode(results) //encode the result to json and send it to client

	// Close the MongoDB connection
	err = client.Disconnect(ctx)
	if err != nil {
		log.Fatal(err)
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
		PostReq(w, r, score)
	}
}

func PostReq(w http.ResponseWriter, r *http.Request, score Score) {

	// Declare host and port options to pass to the Connect() method
	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")

	// Connect to the MongoDB and return Client instance
	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		fmt.Println("mongo.Connect() ERROR:", err)
		os.Exit(1)
	}

	// Declare Context type object for managing multiple API requests
	ctx, _ := context.WithTimeout(context.Background(), 15*time.Second)

	// Access a MongoDB collection through a database
	col := client.Database("mario").Collection("scoreboard")

	// Declare an empty array to store documents returned
	// var result []Score
	var scoretest = Score{}

	//select element in db by score.Username
	cur, err := col.Find(ctx, bson.M{"username": score.Username})
	if err != nil {
		log.Fatal(err)
	}
	for cur.Next(ctx) {
		err := cur.Decode(&scoretest)
		if err != nil {
			log.Fatal(err)
		}
	}

	if scoretest.Username != "" {
		fmt.Println("Update score")
		if score.Score > scoretest.Score {
			fmt.Print("New score is better than old one")
			col.DeleteOne(ctx, scoretest)
			col.InsertOne(ctx, score)
		}
	} else { //if score is not found
		fmt.Println("New score")
		col.InsertOne(ctx, score)
	}

	// Close the MongoDB connection
	err = client.Disconnect(ctx)
	if err != nil {
		log.Fatal(err)
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
