<?php

header('Content-Type: text/html; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

$postData = json_decode(file_get_contents('php://input'), true);
$listID = $postData["listID"];
sleep(1);
//$tasks = "[]";
$tasks = "[{\"id\":\"1\",\"value\":\"{$listID}\",\"completed\":false},{\"id\":\"2\",\"value\":\"Паспорта/заграны\",\"completed\":false},{\"id\":\"3\",\"value\":\"Деньги наличными\",\"completed\":false},{\"id\":\"4\",\"value\":\"Деньги на карту\",\"completed\":false},{\"id\":\"5\",\"value\":\"Деньги на телефон\",\"completed\":false},{\"id\":\"6\",\"value\":\"Фотоаппарат\",\"completed\":false},{\"id\":\"7\",\"value\":\"Пополнить мобильный\",\"completed\":false}]";
echo $tasks;
