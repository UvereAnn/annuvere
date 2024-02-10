<?php
// Simulate validation logic on the server side

$response = array('errors' => array());

$name = $_POST['name'];
$email = $_POST['email'];

// Validate Name
if (empty($name)) {
    $response['errors']['name'] = 'Name is required';
}

// Validate Email
if (empty($email)) {
    $response['errors']['email'] = 'Email is required';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $response['errors']['email'] = 'Invalid email format';
}

// Return the response as JSON
echo json_encode($response);
