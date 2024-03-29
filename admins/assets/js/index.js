$(document).ready(function () {
  var body = $("body");
  var popup = `<div class="popup"></div>`;
  var table = $("#tbl-data");
  var loading = `
    <div class="popup">
      <div class="loading"></div>
    </div>
  `;

  var trIndex;
  var totalOfRecordCategory = $("#total-data");
  var currentPage = $("#current-page");
  var totalPage = $("#total-page");
  var limitRecord = $("#limit-record");

  var back = 0;
  var next = limitRecord.val();

  //   declare object of file form
  var form = {
    0: "category.php",
    1: "item.php",
  };

  var formOption = 1;

  // search records
  var filter = [
    { "1 0": "ID", "2 1": "Title", "3 0": "Status" },
    { "1 0": "ID", "2 1": "Title", "4 1": "Category", "3 0": "Stattus" },
  ];

  var search = 0;

  var searchValue = $("#txt-search-value");

  var searchField = $("#txt-record");

  var fieldName = $("#txt-fields");

  //   click button add add form
  $("#btn-add").click(function () {
    // add element has class popup to body
    body.append(popup);
    // add element has class loading
    body.append(loading);
    // add form element to popup
    body
      .find(".popup")
      .first()
      .load(
        "forms/" + form[formOption],
        function (responseTxt, statusTxt, xhr) {
          if (statusTxt == "success") getAutoId();
          body.find(".popup").last().remove();
          if (statusTxt == "error")
            //   alert("External content loaded successfully!");
            alert("Error: " + xhr.status + ": " + xhr.statusText);
        }
      );
  });

  //   show data table and get form values
  $(".dropdown-link").on("click", ".sub-menu li", function () {
    // get value formOption to equal data-option from li element
    formOption = $(this).data("option");

    // search records
    var objCategory = filter[formOption];

    // set search equal 0 for clicked this function
    search = 0;

    var txt = `<option value="">--Select one---</option>`;
    for (const key of Object.keys(objCategory)) {
      txt += `<option id="txt-fields" value="${key}">${objCategory[key]}</option>`;
    }
    searchField.html(txt);

    currentPage.text("1");
    back = 0;
    // show button add
    $(".grid-bar").css({ display: "grid" });
    if (formOption == 0) {
      getTableDataCategory();
    } else if (formOption == 1) {
      getTableDataItems();
    }
  });

  //   close button add
  body.on("click", ".from .btn-close", function () {
    $(".popup").remove();
  });

  // get auto id
  function getAutoId() {
    $.ajax({
      url: "action/autoID.php",
      type: "POST",
      data: { index: formOption },
      cache: false,
      dataType: "json",
      beforeSend: function () {
        // work before send
      },
      success: function (data) {
        $("#txt-id").val(parseInt(data.id) + 1);
        $("#txt-order").val(parseInt(data.id) + 1);
      },
    });
  }

  // button add data
  body.on("click", ".from .btn-save", function () {
    var eThis = $(this);
    if (formOption == 0) {
      saveCategories(eThis);
    } else if (formOption == 1) {
      saveItems(eThis);
    }
  });

  // fuction save data categories items to database
  function saveCategories(eThis) {
    var form = eThis.closest(".upload_data");
    var form_data = new FormData(form[0]);

    var id = $("#txt-id");
    var title = $("#txt-title");
    var file = $("#txt-file");
    var photo = $("#txt-photo");
    var order = $("#txt-order");
    var status = $("#txt-status");

    // check condition if input type is empty value
    if (title.val() == "") {
      swal("Please input title!", {
        title: "Message!",
        icon: "error",
        buttons: false,
        timer: 2000,
      }).then(function () {
        title.focus();
      });
      return;
    } else if (status.val() == "") {
      swal("Please select status!", {
        title: "Message!",
        icon: "error",
        buttons: false,
        timer: 2000,
      });
      return;
    }

    $.ajax({
      url: "action/categories.php",
      type: "POST",
      data: form_data,
      contentType: false,
      cache: false,
      processData: false,
      dataType: "json",
      beforeSend: function () {
        // button save before save data
        eThis.html('Waiting <i class="fa fa-spinner fa-spin"></i>');
        eThis.css({
          "pointer-events": "none",
        });
      },
      success: function (data) {
        // check douplication title
        if (data.dpl_title == true) {
          swal("Douplication title! please change", {
            title: "Message!",
            icon: "error",
            buttons: false,
            timer: 2000,
          }).then(function () {
            title.focus();
          });
        } else if (data.edit == true) {
          // add record who it edited to table
          table.find("tr:eq(" + trIndex + ") td:eq(1)").text(title.val());
          table
            .find("tr:eq(" + trIndex + ") td:eq(2) img")
            .attr("src", `img/${photo.val()}`);
          table
            .find("tr:eq(" + trIndex + ") td:eq(2) img")
            .attr("alt", `${photo.val()}`);
          table.find("tr:eq(" + trIndex + ") td:eq(3)").text(order.val());
          table.find("tr:eq(" + trIndex + ") td:eq(4)").text(status.val());
          // remove form edit
          body.find(".popup").remove();
          // alert successfully edited
          swal("Record is update successfully!", {
            icon: "success",
            buttons: false,
            timer: 1500,
          });
        } else {
          // display data in table
          var tr = `
          <tr>
            <td>${data.id}</td>
            <td>${title.val()}</td>
            <td class="center">
              <img class="img-data" src="img/${photo.val()}" alt="${photo.val()}">
            </td>
            <td>${data.id}</td>
            <td>${status.val()}</td>   
            <td><div class="btn-edit"><i class="fa-solid fa-pen-to-square"></i></div></td>
          </tr>
        `;
          table.find("tr:eq(0)").after(tr);
          // get auto id
          id.val(data.id + 1);
          order.val(data.id + 1);
          // alert success after record save to table database
          swal("Record is insert successfully!", {
            icon: "success",
            buttons: false,
            timer: 1500,
          }).then(function () {
            // clear value form input
            title.val("");
            file.val("");
            photo.val("");
            status.val("");
            $(".box-img").css({
              "background-image": "url(assets/css/bg-img.png)",
            });
            title.focus();
          });
        }

        // button save after save data
        eThis.html('Save <i class="fa-solid fa-download"></i>');
        eThis.css({
          "pointer-events": "auto",
        });
      },
    });
  }

  // function save data item to table database
  function saveItems(eThis) {
    var form = eThis.closest("#upload_data");
    var form_data = new FormData(form[0]);

    var id = $("#txt-id");
    var cateId = $("#txt-category");
    var title = $("#txt-title");
    var des = $("#txt-des");
    var location = $("#txt-location");
    var userId = $("#txt-user");
    var order = $("#txt-order");
    var status = $("#txt-status");
    var file = $("#txt-file");
    var photo = $("#txt-photo");

    // check form input if input empty value
    if (cateId.val() == "") {
      swal("Please select category!", {
        icon: "error",
        buttons: false,
        timer: 1500,
      });
      return;
    } else if (title.val() == "") {
      swal("Please input title!", {
        icon: "error",
        buttons: false,
        timer: 1500,
      }).then(function () {
        title.focus();
      });
      return;
    } else if (des.val() == "") {
      swal("Please input description!", {
        icon: "error",
        buttons: false,
        timer: 1500,
      }).then(function () {
        des.focus();
      });
      return;
    } else if (userId.val() == "") {
      swal("Please select user name!", {
        icon: "error",
        buttons: false,
        timer: 1500,
      });
      return;
    } else if (status.val() == "") {
      swal("Please select status!", {
        icon: "error",
        buttons: false,
        timer: 1500,
      });
      return;
    } else if (location.val() == "") {
      swal("Please select location!", {
        icon: "error",
        buttons: false,
        timer: 1500,
      });
      return;
    }

    $.ajax({
      url: "action/items.php",
      type: "POST",
      data: form_data,
      contentType: false,
      cache: false,
      processData: false,
      dataType: "json",
      beforeSend: function () {
        // button save before save data
        eThis.html('Waiting <i class="fa fa-spinner fa-spin"></i>');
        eThis.css({
          "pointer-events": "none",
        });
      },
      success: function (data) {
        // check douplication title
        if (data.dpl_title == true) {
          swal("Douplicate title!", {
            icon: "warning",
            buttons: false,
            timer: 1500,
          }).then(function () {
            title.focus();
          });
          // check record is inserted successfully
        } else if (data.edit == true) {
          table.find("tr:eq(" + trIndex + ") td:eq(1)").html(
            `<span class="hide">${cateId.val()}</span> 
            ${cateId.find("option:selected").text()}`
          );
          table.find("tr:eq(" + trIndex + ") td:eq(2)").text(title.val());
          table.find("tr:eq(" + trIndex + ") td:eq(3)").text(des.val());
          table
            .find("tr:eq(" + trIndex + ") td:eq(4) img")
            .attr("src", `img/${photo.val()}`);
          table
            .find("tr:eq(" + trIndex + ") td:eq(4) img")
            .attr("alt", `${photo.val()}`);
          table.find("tr:eq(" + trIndex + ") td:eq(5)").text(userId.val());
          table.find("tr:eq(" + trIndex + ") td:eq(6)").text(location.val());
          table.find("tr:eq(" + trIndex + ") td:eq(8)").text(order.val());
          table.find("tr:eq(" + trIndex + ") td:eq(9)").text(status.val());
          // remove form edit
          body.find(".popup").remove();
          // alert successfully edited
          swal("Record is update successfully!", {
            icon: "success",
            buttons: false,
            timer: 1500,
          });
        } else {
          // display data after insert
          var tr = `
            <tr>
              <td>${id.val()}</td>
              <td>
                <span class="hide">${cateId.val()}</span>
                ${cateId.find("option:selected").text()}
              </td>
              <td>${title.val()}</td>
              <td>${des.val()}</td>
              <td class="center">
                <img class="img-data" src="img/${photo.val()}" alt="${photo.val()}">
              </td>
              <td>${userId.val()}</td>
              <td>${location.val()}</td>
              <td>1</td>
              <td>${order.val()}</td>
              <td>${status.val()}</td>
              <td><div class="btn-edit"><i class="fa-solid fa-pen-to-square"></i></div></td>
            </tr>
          `;

          table.find("tr:eq(0)").after(tr);

          id.val(data.id + 1);
          order.val(data.id + 1);
          swal("Record is insert successfully!", {
            icon: "success",
            buttons: false,
            timer: 1500,
          }).then(function () {
            cateId.val("");
            title.val("");
            des.val("");
            location.val("");
            userId.val("");
            status.val("");
            file.val("");
            photo.val("");
            $(".box-img").css({
              "background-image": "url(assets/css/bg-img.png)",
            });
          });
        }

        // button save after save data
        eThis.html('Save <i class="fa-solid fa-download"></i>');
        eThis.css({
          "pointer-events": "auto",
        });
      },
    });
  }

  // get data from table database by json data (category)
  function getTableDataCategory() {
    var thead = `
      <tr>
          <th>Id</th>
          <th>Title</th>
          <th>Photo</th>
          <th>Order</th>
          <th>Status</th>
          <th width="150px">Action</th>
      </tr>
    `;

    $.ajax({
      url: "api/categories.php",
      type: "POST",
      data: {
        index: back,
        record: next,
        search: search,
        searchRecord: searchValue.val(),
        field: searchField.val(),
      },
      cache: false,
      dataType: "json",
      beforeSend: function () {
        body.append(loading);
      },
      success: function (data) {
        var txt = "";

        if (data == 0) {
          totalOfRecordCategory.text(0);
        } else {
          totalOfRecordCategory.text(data[0]["total"]);
          totalPage.text(Math.ceil(data[0]["total"] / next));
        }

        data.forEach((item) => {
          console.log(item);
          txt += `
          <tr>
            <td>${item.id}</td>
            <td>${item.title}</td>
            <td class="center">
              <img class="img-data" src="img/${item.img}" alt="${item.img}">
            </td>
            <td>${item.order}</td>
            <td>${item.status}</td>
            <td><div class="btn-edit"><i class="fa-solid fa-pen-to-square"></i></div></td>
          </tr>
          `;
        });
        table.html(thead + txt);
        body.find(".popup").remove();
      },
    });
  }

  // get data from table database by json data (items)
  function getTableDataItems() {
    var thead = `
      <tr>
        <th>Id</th>
        <th>Category</th>
        <th>Title</th>
        <th>Description</th>
        <th>Photo</th>
        <th>User name</th>
        <th>Location</th>
        <th>Clicked</th>
        <th>Order</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    `;

    $.ajax({
      url: "api/items.php",
      type: "POST",
      data: {
        index: back,
        record: next,
        search: search,
        searchRecord: searchValue.val(),
        field: searchField.val(),
      },
      cache: false,
      dataType: "json",
      beforeSend: function () {
        body.append(loading);
      },
      success: function (data) {
        var txt = "";

        if (data == 0) {
          totalOfRecordCategory.text(0);
        } else {
          totalOfRecordCategory.text(data[0]["total"]);
          totalPage.text(Math.ceil(data[0]["total"] / next));
        }

        data.forEach((item) => {
          console.log(item);
          txt += `
          <tr>
            <td>${item.id}</td>
            <td><span class="hide">${item.cateID}</span>${item.cateTitle}</td>
            <td>${item.title}</td>
            <td>${item.description}</td>
            <td class="center">
              <img class="img-data" src="img/${item.img}" alt="${item.img}">
            </td>
            <td>${item.userId}</td>
            <td>${item.location}</td>
            <td>${item.clicked}</td>
            <td>${item.order}</td>
            <td>${item.status}</td>
            <td><div class="btn-edit"><i class="fa-solid fa-pen-to-square"></i></div></td>
          </tr>
          `;
        });
        table.html(thead + txt);
        body.find(".popup").remove();
      },
    });
  }

  // upload img category
  body.on("change", ".upload_data .txt-file", function () {
    var eThis = $(this);
    var form = eThis.closest(".upload_data");
    var form_data = new FormData(form[0]);

    var photo = $("#txt-photo");

    var loadingImg = `
      <div class="loading-img"></div>
    `;

    $.ajax({
      url: "action/category-img.php",
      type: "POST",
      data: form_data,
      contentType: false,
      cache: false,
      processData: false,
      dataType: "json",
      beforeSend: function () {
        $(".box-img").append(loadingImg);
      },
      success: function (data) {
        // show img when choose from folder
        $(".box-img").css({
          "background-image": "url(img/" + data.img_name + ")",
        });

        // get name image form json server
        photo.val(data.img_name);

        // clear loading element after submit data to database
        $(".box-img").find(".loading-img").remove();
      },
    });
  });

  // upload img items
  body.on("change", "#upload_data .txt-file", function () {
    var eThis = $(this);
    var form = eThis.closest("#upload_data");
    var form_data = new FormData(form[0]);

    var loadingImg = `
      <div class="loading-img"></div>
    `;

    $.ajax({
      url: "action/item-img.php",
      type: "POST",
      data: form_data,
      contentType: false,
      cache: false,
      processData: false,
      dataType: "json",
      beforeSend: function () {
        $(".box-img").append(loadingImg);
      },
      success: function (data) {
        // show img when choose from folder
        $(".box-img").css({
          "background-image": "url(img/" + data.img_name + ")",
        });

        // get name image form json server
        $("#txt-photo").val(data.img_name);

        // clear loading element after submit data to database
        $(".box-img").find(".loading-img").remove();
      },
    });
  });

  //click button edit record
  body.on("click", "table .btn-edit", function () {
    var eThis = $(this);
    if (formOption == "0") {
      editGategory(eThis);
    } else if (formOption == "1") {
      editItem(eThis);
    }
  });

  // edit category
  function editGategory(eThis) {
    var tr = eThis.parents("tr");
    trIndex = tr.index();
    var id = tr.find("td:eq(0)").text();
    var title = tr.find("td:eq(1)").text();
    var photo = tr.find("td:eq(2) img").attr("alt");
    var order = tr.find("td:eq(3)").text();
    var status = tr.find("td:eq(4)").text();
    // add element has class popup to body
    body.append(popup);
    // add element has class loading
    body.append(loading);
    // add form element to popup
    body
      .find(".popup")
      .first()
      .load(
        "forms/" + form[formOption],
        function (responseTxt, statusTxt, xhr) {
          if (statusTxt == "success") body.find(".upload_data #txt-id").val(id);
          body.find(".upload_data #txt-edit-id").val(id);
          body.find(".upload_data #txt-title").val(title);
          body.find(".upload_data #txt-order").val(order);
          body.find(".upload_data #txt-status").val(status);
          body
            .find(".upload_data .box-img")
            .css({ "background-image": `url(img/${photo})` });
          body.find(".upload_data #txt-photo").val(photo);
          body.find(".popup").last().remove();
          if (statusTxt == "error")
            //   alert("External content loaded successfully!");
            alert("Error: " + xhr.status + ": " + xhr.statusText);
        }
      );
  }

  // edit item
  function editItem(eThis) {
    var tr = eThis.parents("tr");
    trIndex = tr.index();
    var id = tr.find("td:eq(0)").text();
    var category = tr.find("td:eq(1) span").text();
    var title = tr.find("td:eq(2)").text();
    var description = tr.find("td:eq(3)").text();
    var img = tr.find("td:eq(4) img").attr("alt");
    var user = tr.find("td:eq(5)").text();
    var location = tr.find("td:eq(6)").text();
    var clicked = tr.find("td:eq(7)").text();
    var order = tr.find("td:eq(8)").text();
    var status = tr.find("td:eq(9)").text();
    // add element has class popup to body
    body.append(popup);
    // add element has class loading
    body.append(loading);
    // add form element to popup
    body
      .find(".popup")
      .first()
      .load(
        "forms/" + form[formOption],
        function (responseTxt, statusTxt, xhr) {
          if (statusTxt == "success") body.find(".popup").last().remove();
          body.find("#upload_data #txt-id").val(id);
          body.find("#upload_data #txt-edit-id").val(id);
          body.find("#upload_data #txt-category").val(category);
          body.find("#upload_data #txt-title").val(title);
          body.find("#upload_data #txt-des").val(description);
          body.find("#upload_data #txt-user").val(user);
          body.find("#upload_data #txt-location").val(location);
          body.find("#upload_data #txt-order").val(order);
          body.find("#upload_data #txt-status").val(status);
          body
            .find("#upload_data .box-img")
            .css({ "background-image": `url(img/${img})` });
          body.find("#upload_data #txt-photo").val(img);
          if (statusTxt == "error")
            //   alert("External content loaded successfully!");
            alert("Error: " + xhr.status + ": " + xhr.statusText);
        }
      );
  }

  // pagination

  // search records
  $(".btn-search").click(function () {
    if (searchField.val() == "") {
      swal("Please select field name!", {
        icon: "error",
        buttons: false,
        timer: 1500,
      });
      return;
    } else if (searchValue.val() == "") {
      swal("Please input value for search!", {
        icon: "error",
        buttons: false,
        timer: 1500,
      });
      return;
    } else {
      // set search equal 1 for clicked this function
      search = 1;
      if (formOption == 0) {
        getTableDataCategory();
      } else if (formOption == 1) {
        getTableDataItems();
      }
    }
  });

  // select records
  limitRecord.change(function () {
    currentPage.text("1");
    back = 0;
    next = $(this).val();
    if (formOption == 0) {
      getTableDataCategory();
    } else if (formOption == 1) {
      getTableDataItems();
    }
  });

  // btn-next
  $("#btn-next").click(function () {
    if (parseInt(currentPage.text()) == parseInt(totalPage.text())) {
      return;
    }
    back = parseInt(back) + parseInt(next);
    if (formOption == 0) {
      getTableDataCategory();
    } else if (formOption == 1) {
      getTableDataItems();
    }
    currentPage.text(parseInt(currentPage.text()) + 1);
  });

  // btn-back
  $("#btn-back").click(function () {
    if (parseInt(currentPage.text()) == 1) {
      return;
    }
    back = parseInt(back) - parseInt(next);
    if (formOption == 0) {
      getTableDataCategory();
    } else if (formOption == 1) {
      getTableDataItems();
    }
    currentPage.text(parseInt(currentPage.text()) - 1);
  });
});
