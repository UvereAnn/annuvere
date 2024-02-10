<?php

// Replace these values with your database connection details
$host = 'localhost';
$user = 'root';
$password = '';
$database = 'ann_uvere';

// Establish a connection to the database
$connection = new mysqli($host, $user, $password, $database);

if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}


// Retrieve data from the POST request
$data = json_decode(file_get_contents("php://input"), true);

$name = $connection->real_escape_string($data['name']);
$email = $connection->real_escape_string($data['email']);
$message = $connection->real_escape_string($data['message']);

// Insert data into the database
$sql = "INSERT INTO `contact` (`name`, `email`, `message`) VALUES ('$name', '$email', '$message')";

if ($connection->query($sql) === TRUE) {
    echo 'success';
} else {
    echo 'error';
}

$connection->close();
