<?php
// open connection to database
$cn = new mysqli("localhost", "root", "", "sabay_new");

$index = $_POST['index'];

$table = array(
    "0" => "tbl_category",
    "1" => "tbl_item",
);

$sql = " SELECT id FROM " . $table[$index] . " ORDER BY id DESC LIMIT 0,1";
$result = $cn->query($sql);
$num = $result->num_rows;
if ($num > 0) {
    $row = $result->fetch_array();
    $response['id'] = $row[0];
} else {
    $response['id'] = 0;
}


echo json_encode($response);
