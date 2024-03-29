<?php

$cn = new mysqli("localhost", "root", "", "sabay_new");
$cn->set_charset("utf8");


$index = $_POST["index"];
$record = $_POST["record"];
$search = $_POST["search"];
$search_value = $_POST["searchRecord"];
$fidld_name = explode(" ", $_POST["field"]);

$fields = array(
    "1" => "id",
    "2" => "title",
    "3" => "status",
);

if ($search == 0) {
    // get data from category
    $sql = "SELECT * FROM tbl_category ORDER BY `id` DESC LIMIT $index, $record";
    $sqlCount = " SELECT COUNT(*) AS total FROM tbl_category ";
} else {
    // search record
    if ($fidld_name[1] == 0) {
        $sql = "SELECT * FROM tbl_category WHERE " . $fields[$fidld_name[0]] . " =  '$search_value' ORDER BY `id` DESC LIMIT $index, $record";
        $sqlCount = " SELECT COUNT(*) AS total FROM tbl_category WHERE " . $fields[$fidld_name[0]] . " =  '$search_value' ORDER BY `id` DESC LIMIT $index, $record ";
    } else {
        $sql = "SELECT * FROM tbl_category WHERE " . $fields[$fidld_name[0]] . " LIKE  '%$search_value%' ORDER BY `id` DESC LIMIT $index, $record";
        $sqlCount = " SELECT COUNT(*) AS total FROM tbl_category WHERE " . $fields[$fidld_name[0]] . " LIKE  '%$search_value%' ORDER BY `id` DESC LIMIT $index, $record ";
    }
}

$result = $cn->query($sql);
$data = array();

// count records of category
$resultCount = $cn->query($sqlCount);
$rowCount = $resultCount->fetch_array();

while ($row = $result->fetch_array()) {
    $data[] = array(
        "id" => $row[0],
        "title" => $row[1],
        "img" => $row[2],
        "order" => $row[3],
        "status" => $row[4],
        "total" => $rowCount[0],
    );
}

echo json_encode($data);
