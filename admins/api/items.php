<?php
header('Access-Control-Allow-Origin: *');
$cn = new mysqli("localhost", "root", "", "sabay_new");

$index = $_POST["index"];
$record = $_POST["record"];
$search = $_POST["search"];
$search_value = $_POST["searchRecord"];
$fidld_name = explode(" ", $_POST["field"]);

$fields = array(
    "1" => "tbl_item.id",
    "2" => "tbl_item.title",
    "3" => "tbl_item.status",
    "4" => "tbl_category.title",
);

if ($search == 0) {
    $sql = " SELECT tbl_item.*, tbl_category.title FROM tbl_item INNER JOIN tbl_category ON tbl_item.cateId = tbl_category.id ORDER BY tbl_item.id DESC LIMIT $index, $record ";
    $sqlCount = " SELECT COUNT(*) AS total FROM tbl_item INNER JOIN tbl_category ON tbl_item.cateId = tbl_category.id ";
} else {
    if ($fidld_name[1] == 0) {
        $sql = " SELECT tbl_item.*, tbl_category.title FROM tbl_item INNER JOIN tbl_category ON tbl_item.cateId = tbl_category.id WHERE " . $fields[$fidld_name[0]] . " =  '$search_value' ORDER BY tbl_item.id DESC LIMIT $index, $record ";
        $sqlCount = " SELECT COUNT(*) AS total FROM tbl_item INNER JOIN tbl_category ON tbl_item.cateId = tbl_category.id WHERE " . $fields[$fidld_name[0]] . " =  '$search_value' ";
    } else {
        $sql = " SELECT tbl_item.*, tbl_category.title FROM tbl_item INNER JOIN tbl_category ON tbl_item.cateId = tbl_category.id WHERE " . $fields[$fidld_name[0]] . " LIKE  '%$search_value%' ORDER BY tbl_item.id DESC LIMIT $index, $record ";
        $sqlCount = " SELECT COUNT(*) AS total FROM tbl_item INNER JOIN tbl_category ON tbl_item.cateId = tbl_category.id WHERE " . $fields[$fidld_name[0]] . " LIKE  '%$search_value%' ";
    }
}

// select record
$result = $cn->query($sql);
$data = array();

// count records of category
$resultCount = $cn->query($sqlCount);
$rowCount = $resultCount->fetch_array();

while ($row = $result->fetch_array()) {
    $data[] = array(
        "id" => $row[0],
        "cateID" => $row[1],
        "title" => $row[2],
        "description" => $row[3],
        "img" => $row[4],
        "userId" => $row[5],
        "location" => $row[6],
        "clicked" => $row[7],
        "order" => $row[8],
        "status" => $row[9],
        "cateTitle" => $row[12],
        "total" => $rowCount[0],
    );
}

echo json_encode($data);
