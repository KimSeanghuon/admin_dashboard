<?php
// open connection to database
$cn = new mysqli("localhost", "root", "", "sabay_new");
$cn->set_charset("utf8");

// get value from form field
    $id = $_POST['txt-id'];
    $title = trim($_POST['txt-title']);
    $title = $cn->real_escape_string($title);
    $img = $_POST['txt-photo'];
    $order = $_POST['txt-order'];
    $status = $_POST['txt-status'];
    $edit_id = $_POST['txt-edit-id'];

    // check if douplication title
    $sql = " SELECT title FROM tbl_category WHERE title='$title' && id!=$id";
    $result = $cn->query($sql);
    $num = $result->num_rows;
    $response['dpl_title'] = false;
    $response['edit'] = false;
    if ($num == 0) {
        $response['dpl_title'] = false;
        if ($edit_id == 0) {
            // insert data into table
            $sql = " INSERT INTO tbl_category VALUES(null, '$title', '$img', $order, $status) ";
            $cn->query($sql);
        } else {
            $sql = " UPDATE tbl_category SET `title`='$title', `img`='$img', `order`=$order, `status`=$status WHERE id=$edit_id ";
            $cn->query($sql);
            $response['edit'] = true;
        }
    } else {
        $response['dpl_title'] = true;
    }


    $response['id'] = $cn->insert_id;

    echo json_encode($response);
