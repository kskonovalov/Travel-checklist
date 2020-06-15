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
$listID = $mysqli->real_escape_string($postData["listID"]);
// action type
$availableActions = [
    'check',
    'save',
    'get',
    'add'
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
    if ($result = $mysqli->query("SELECT * FROM checklist WHERE list_id = '{$listID}' LIMIT 1")) {
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
    $tasks = json_encode($postData["tasks"]);
    $tasks = $mysqli->real_escape_string($tasks);
    $result = $mysqli->query("SELECT * FROM checklist WHERE list_id = '{$listID}' LIMIT 1");
    if ($result->num_rows > 0) {
        $res = $mysqli->query("UPDATE checklist set content = '{$tasks}' WHERE list_id = '{$listID}'");
    } else {
        $res = $mysqli->query("INSERT INTO `checklist`(`list_id`, `content`) VALUES ('{$listID}','{$tasks}')");
    }
    echo json_encode([
        'success' => true
    ]);
    $result->close();
    die();
} if($action == 'add') {
    // add task
    $task = json_encode($postData["task"]);
    $task = $mysqli->real_escape_string($task);
    $taskId = json_encode($postData["taskId"]);
    $taskId = $mysqli->real_escape_string($taskId);
    $result = $mysqli->query("SELECT * FROM checklist WHERE list_id = '{$listID}' LIMIT 1");
    if ($result->num_rows > 0) {
        $object = $result->fetch_object();
        $tasks = $object->content;
        $tasks = json_decode($tasks, true);
        $tasks[] = [
            "id" => $taskId,
            "value" => $task,
            "completed" => false
        ];
        $tasks = json_encode($tasks);
        $res = $mysqli->query("UPDATE checklist set content = '{$tasks}' WHERE list_id = '{$listID}'");
    } else {
        $tasks = [];
        $tasks[] = [
            "id" => $taskId,
            "value" => $task,
            "completed" => false
        ];
        $tasks = json_encode($tasks);
        $res = $mysqli->query("INSERT INTO `checklist`(`list_id`, `content`) VALUES ('{$listID}','{$tasks}')");
    }
    echo json_encode([
        'success' => true
    ]);
    $result->close();
    die();
} else {
    // get current list data
   $result = $mysqli->query("SELECT * FROM checklist WHERE list_id = '{$listID}' LIMIT 1");
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
