<?php

header('Content-Type: text/html; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

require_once('config.php');
// Create connection
$mysqli = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($mysqli->connect_error) {
    die("Connection failed: ");
}

$postData = json_decode(file_get_contents('php://input'), true);
// list ID
$listId = $mysqli->real_escape_string($postData["listId"]);
// action type
$availableActions = [
    'check', // check list id availability
    'save', // save lists
    'get' // get all lists to db
];
if(isset($postData["action"]) && in_array($postData["action"], $availableActions)) {
    $action = $postData["action"];
} else {
    $action = 'get';
}

/*
 * id
 * list_id
 * content
 * date
 * removed | boolean
 * */

//VAR_DUMP($action);
if($action == 'check') {
    // check availability of list ID
    if ($result = $mysqli->query("SELECT * FROM checklist WHERE list_id = '{$listId}' LIMIT 1")) {
        if($result->num_rows > 0) {
            echo json_encode(['available' => false]);
        } else {
            echo json_encode(['available' => true]);
        }
        echo json_encode([
            'success' => false
        ]);
        $result->close();
        die();
    }
} if($action == 'save') {
    // update list
    $lists = json_encode($postData["lists"]);
    $lists = $mysqli->real_escape_string($lists);
    $result = $mysqli->query("SELECT * FROM checklist WHERE list_id = '{$listId}' LIMIT 1");
    if ($result->num_rows > 0) {
        $res = $mysqli->query("UPDATE checklist set content = '{$lists}' WHERE list_id = '{$listId}'");
    } else {
        $res = $mysqli->query("INSERT INTO `checklist`(`list_id`, `content`) VALUES ('{$listId}','{$lists}')");
    }
    echo json_encode([
        'success' => true
    ]);
    $result->close();
    die();
} else {
    // get current list data
   $result = $mysqli->query("SELECT * FROM checklist WHERE list_id = '{$listId}' LIMIT 1");
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $response =  json_encode([
            'success' => true,
            'data' => json_decode($row['content'], true)
        ]);
        echo $response;
        die();
    }
    $result->close();
}

echo json_encode([
    'success' => false
]);
