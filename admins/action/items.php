<?php

$cn = new mysqli("localhost", "root", "", "sabay_new");
date_default_timezone_set("Asia/Phnom_Penh");


$cateID = $_POST["txt-category"];
$title = trim($_POST["txt-title"]);
$title = $cn->real_escape_string($title);
$des = trim($_POST["txt-des"]);
$photo = $_POST["txt-photo"];
$location = $_POST["txt-location"];
$userID = $_POST["txt-user"];
$order = $_POST["txt-order"];
$status = $_POST["txt-status"];
$createdAt = date("l-F-Y h:i:sa");
$edit_id = $_POST["txt-edit-id"];

$respone['dpl_title'] = false;
$respone['edit'] = false;

// check douplication title
$sql = " SELECT title FROM tbl_item WHERE title = '$title' && id != $edit_id ";
$result = $cn->query($sql);
$num = $result->num_rows;
if ($num == 0) {
    $respone['dpl_title'] = false;
    if ($edit_id == 0) {
        // insert data
        $sql = "INSERT INTO tbl_item VALUES(null, $cateID, '$title', '$des', '$photo', $location, 1, $userID, $order, $status, 'testLink', '$createdAt')";
        $cn->query($sql);
    } else {
        // update data
        $sql = "UPDATE tbl_item SET `cateID` = $cateID, `title` = '$title', `des` = '$des', `img` = '$photo', `location` = $location, `userID` = $userID, `order` = $order, `status` = $status WHERE `id` = $edit_id";
        $cn->query($sql);
        $respone['edit'] = true;
    }
} else {
    $respone['dpl_title'] = true;
}


$respone['id'] = $cn->insert_id;
echo json_encode($respone);
