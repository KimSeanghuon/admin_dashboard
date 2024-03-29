<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Admin</title>
  <link rel="stylesheet" href="assets/css/style.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
  <script src="assets/js/jquery-3-7-1.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/2.1.2/sweetalert.min.js" integrity="sha512-AA1Bzp5Q0K1KanKKmvN/4d3IRKVlv9PYgwFPvm32nPO6QS8yH1HO7LbgB1pgiOxPtfeg5zEn2ba64MUcqJx6CA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

</head>

<body>
  <!-- header -->
  <header class="header">
    <div class="grid-header">
      <div class="item-menu">
        <i class="fa-solid fa-bars"></i>
      </div>
      <div class="item-text">Rean Web</div>
      <div class="item-logout">
        <span>info12@gmail.com</span>
        <i class="fa-solid fa-arrow-right-from-bracket"></i>
      </div>
    </div>
    <div class="dropdown-link">
      <ul>
        <li>
          <a class="dropdown-item">
            <i class="fa-solid fa-user-gear"></i>
            <span>System</span>
          </a>
          <ul class="sub-menu">
            <li>
              <a>
                <div><i class="fa-solid fa-user"></i></div>
                <span>User</span>
              </a>
            </li>
          </ul>
        </li>
      </ul>
      <ul>
        <li>
          <a class="dropdown-item">
            <i class="fa-solid fa-plus"></i>
            <span>Setup</span>
          </a>
          <ul class="sub-menu">
            <li data-option="0">
              <a>
                <div><i class="fa-solid fa-table-list"></i></div>
                <span> Categories </span>
              </a>
            </li>
            <li data-option="1">
              <a>
                <div class=""><i class="fa-solid fa-list"></i></div>
                <span> Items </span>
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </header>

  <!-- container -->
  <section class="container">
    <div class="grid-bar">
      <div class="item-bar">
        <div class="btn-add">
          <div class="add" id="btn-add"><i class="fa-solid fa-plus"></i>Add</div>
        </div>

        <div class="search">
          <input type="text" placeholder="Search" id="txt-search-value"/>
          <div class="select">
            <select name="" id="txt-record">
            </select>
          </div>
          <div class="btn-search">
            <i class="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>
      </div>

      <div class="item-bar-2">
        <div class="filter-item">
          <select name="" id="limit-record">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
        </div>
        <div class="pagination">
          <span class="btn-pagination" id="btn-back"><i class="fa-solid fa-chevron-left"></i></span>
          <span><span id="current-page">0</span> / <span id="total-page">0</span> of <span id="total-data">0</span> </span>
          <span class="btn-pagination" id="btn-next"><i class="fa-solid fa-chevron-right"></i></span>
        </div>
      </div>
    </div>
    <div class="table-data">
      <center>
        <table id="tbl-data">

          <!-- <tr>
            <td>1</td>
            <td>Technology</td>
            <td>photo.png</td>
            <td>1</td>
            <td>2</td>
          </tr> -->

        </table>
      </center>
    </div>
  </section>

  <!-- form add -->
  <!-- <div class="popup"></div> -->
</body>
<script src="assets/js/index.js"></script>

</html>