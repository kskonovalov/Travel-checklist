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
$action = 'default';
if(isset($postData["action"]) && $postData["action"] == 'check') {
    $action = 'check';
}
if(isset($postData["action"]) && $postData["action"] == 'save') {
    $action = 'save';
}

/*
 * id
 * list_id
 * content
 * date
 * removed | boolean
 * */

VAR_DUMP($action);
if($action == 'check') {
    // check availability of list ID
    if ($result = $mysqli->query("SELECT * FROM checklist WHERE list_id = '{$listID}' LIMIT 1")) {
        if($result->num_rows > 0) {
            echo json_encode(['available' => false]);
        } else {
            echo json_encode(['available' => true]);
        }
        /* очищаем результирующий набор */
        $result->close();
        die();
    }
} if($action == 'save') {
    // update list
    $tasks = $postData["tasks"];
    $tasks = $mysqli->real_escape_string($tasks);
    $result = $mysqli->query("SELECT * FROM checklist WHERE list_id = '{$listID}' LIMIT 1");
    VAR_DUMP($result, $postData);
    if ($result->num_rows > 0) {
        $res = $mysqli->query("UPDATE checklist set content = '{$tasks}' WHERE list_id = '{$listID}'");
        VAR_DUMP('update', $res);
    } else {
        $res = $mysqli->query("INSERT INTO `checklist`(`list_id`, `content`) VALUES ('{$listID}','{$tasks}')");
        VAR_DUMP('insert', $res);
    }
    /* очищаем результирующий набор */
    $result->close();
    die();
} else {
    // get current list data
    if ($result = $mysqli->query("SELECT * FROM checklist WHERE list_id = '{$listID}' LIMIT 1")) {
        if ($result->num_rows > 0) {
            echo [
                'success' => true,
                'data' => $result['content']
            ];
            die();
        } else {
            echo json_encode([
                'success' => false
            ]);
        }
        /* очищаем результирующий набор */
        $result->close();
    }
}
