<?php
$cn = new mysqli("localhost", "root", "", "sabay_new");
?>

<div class="from">
  <div class="flex-form">
    <div class="title">
      <p>Items</p>
    </div>
    <div class="btn-close">
      <i class="fa-solid fa-xmark"></i>
    </div>
  </div>
  <form id="upload_data">
    <input type="hidden" name="txt-edit-id" id="txt-edit-id" value="0" />

    <div class="flex">
      <div class="">
        <label for="">Id</label>
        <input type="text" name="txt-id" id="txt-id" readonly />
      </div>
      <div class="">
        <label for="">Categories</label>
        <select name="txt-category" id="txt-category">
          <option value="">Please select categories</option>

          <?php

          $sql = " SELECT id, title FROM tbl_category WHERE status = 1 ";
          $result = $cn->query($sql);
          $num = $result->num_rows;
          if ($num > 0) {
            while ($row = $result->fetch_array()) {
          ?>
              <option value="<?= $row[0] ?>"><?= $row[1] ?></option>

          <?php
            }
          }

          ?>
        </select>
      </div>
    </div>
    <label for="">Title</label>
    <input type="text" name="txt-title" id="txt-title" />
    <label for="">Description</label>
    <textarea name="txt-des" id="txt-des" rows="3"></textarea>
    <div class="flex">
      <div class="">
        <label for="">Location</label>
        <select name="txt-location" id="txt-location">
          <option value="">Please select location</option>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
      </div>
      <div class="">
        <label for="">User</label>
        <select name="txt-user" id="txt-user">
          <option value="">Please select user name</option>
          <option value="1">Kak Houn</option>
        </select>
      </div>
    </div>
    <div class="flex">
      <div class="">
        <label for="">Order</label>
        <input type="text" name="txt-order" id="txt-order" />
      </div>
      <div class="">
        <label for="">Status</label>
        <select name="txt-status" id="txt-status">
          <option value="">Please select status</option>
          <option value="1">Active</option>
          <option value="2">Inactive</option>
        </select>
      </div>
    </div>
    <label for="">Photo</label>
    <div class="box-img">
      <input type="file" name="txt-file" id="txt-file" class="txt-file" />
    </div>
    <input type="hidden" name="txt-photo" id="txt-photo">
    <div class="card-btn">
      <div class="btn-save">
        Save <i class="fa-regular fa-floppy-disk"></i>
      </div>
    </div>
  </form>
</div>