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
$checkListId = false;
if(isset($postData["checkListId"]) && !empty($postData["checkListId"])) {
    $checkListId = true;
}

/*
 * id
 * list_id
 * content
 * date
 * removed | boolean
 * */

if($checkListId) {
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
} else {
    // get current list data
    if ($result = $mysqli->query("SELECT * FROM checklist WHERE list_id = '{$listID}' LIMIT 1")) {
        VAR_DUMP($result);
        /* очищаем результирующий набор */
        $result->close();
    }
}

//$tasks = "[]";
$tasks = "[{\"id\":\"1\",\"value\":\"{$listID}\",\"completed\":false},{\"id\":\"2\",\"value\":\"Паспорта/заграны\",\"completed\":false},{\"id\":\"3\",\"value\":\"Деньги наличными\",\"completed\":false},{\"id\":\"4\",\"value\":\"Деньги на карту\",\"completed\":false},{\"id\":\"5\",\"value\":\"Деньги на телефон\",\"completed\":false},{\"id\":\"6\",\"value\":\"Фотоаппарат\",\"completed\":false},{\"id\":\"7\",\"value\":\"Пополнить мобильный\",\"completed\":false}]";
echo $tasks;
