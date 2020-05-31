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
$listID = $mysqli->real_escape_string($postData["listID"]);

/* Select запросы возвращают результирующий набор */
/*
 * date
 *
 * */
$stmt = $mysqli->prepare("SELECT * FROM checklist WHERE ID = ? AND age = ?");
$stmt->bind_param("si", $_POST['name'], $_POST['age']);
$stmt->execute();

if ($result = $mysqli->query("SELECT * FROM checklist where ID = ")) {
    printf("Select вернул %d строк.\n", $result->num_rows);

    /* очищаем результирующий набор */
    $result->close();
}

//$tasks = "[]";
$tasks = "[{\"id\":\"1\",\"value\":\"{$listID}\",\"completed\":false},{\"id\":\"2\",\"value\":\"Паспорта/заграны\",\"completed\":false},{\"id\":\"3\",\"value\":\"Деньги наличными\",\"completed\":false},{\"id\":\"4\",\"value\":\"Деньги на карту\",\"completed\":false},{\"id\":\"5\",\"value\":\"Деньги на телефон\",\"completed\":false},{\"id\":\"6\",\"value\":\"Фотоаппарат\",\"completed\":false},{\"id\":\"7\",\"value\":\"Пополнить мобильный\",\"completed\":false}]";
echo $tasks;
