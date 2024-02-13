<?php
/*
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
*/

// Database configuration (modify as needed)
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "anntech";

// Retrieve data from the request
$data = json_decode(file_get_contents('php://input'), true);

// Validate and sanitize data
$name = filter_var($data['name'], FILTER_SANITIZE_STRING);
$email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
$message = filter_var($data['message'], FILTER_SANITIZE_STRING);

// Validate data (you can add more validation as needed)
if (empty($name) || empty($email) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid input. Please fill in all fields with valid data.']);
    exit;
}

// Database connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed.']);
    exit;
}

// Insert data into the database
$sql = "INSERT INTO `contact_form` (`name`, `email`, `message`) VALUES ('$name', '$email', '$message')";

if ($conn->query($sql) === TRUE) {
    /*// Send email 
    $to = "annuvere@gmail.com";
    $subject = "New Form Submission from Ann Tech";
    $message = "Name: $name \nEmail: $email \nMessage: $message";
    $headers = "From: contact@uvereann.name.ng";

    mail($to, $subject, $message, $headers);*/

    echo json_encode(['success' => true, 'message' => 'Form submitted successfully!']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Error inserting data into the database.']);
}

$conn->close();
