<?php

$file = $_FILES['txt-file'];
//extension image file
$ext = pathinfo($file['name'], PATHINFO_EXTENSION);
//random name of image file
$img_name = rand(100000, 999999) . '-' . time() . "." . $ext;
//move uploaded image to folder
$tmp_name = $file['tmp_name'];
move_uploaded_file($tmp_name, '../img/' . $img_name);
$response['img_name'] = $img_name;
echo json_encode($response);
