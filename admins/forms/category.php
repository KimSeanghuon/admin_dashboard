<div class="from">
  <div class="flex-form">
    <div class="title">
      <p>Categories</p>
    </div>
    <div class="btn-close">
      <i class="fa-solid fa-xmark"></i>
    </div>
  </div>
  <form class="upload_data">
    <input type="hidden" name="txt-edit-id" id="txt-edit-id" value="0" />

    <label for="">Id</label>
    <input type="text" name="txt-id" id="txt-id" readonly />
    <label for="">Title</label>
    <input type="text" name="txt-title" id="txt-title" />
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