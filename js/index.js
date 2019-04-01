//Add Task
$("#add").on("click", function() {
  var name = $("#taskName").val();
  var deadLine = $("#deadLine").val().toString().slice(0, 10);
  var status = $(".statusOptions").val();
  var statusClass;
  if (status == "進行中") {
    statusClass = "hasStarted";
  } else if (status == "尚未開始") {
    statusClass = "hasNotStarted";
  }
  if (name != "" && deadLine != "") {
    $("tbody").append('<tr class="item"><td id="itemName">' + name + '</td><td id="itemDeadLine">' + deadLine + '</td><td id="itemStatus" class="' + statusClass + '">' + status + '</td><td id="editItem"><button id="edit" class="btn btn-success">Edit</button></td><td id="deleteItem"><button id="delete" class="btn btn-danger">Delete</button></td></tr>');
    $("#taskName").val("");
    $("#deadLine").val("");
  } else {
    alert("Please Add Task Information Completely!");
  }
});

//Delete Task
$("tbody").on("click", "#delete", function() {
  $(this).parent().parent().remove();
});

//Edit Task
$("tbody").on("click", "#edit", function() {
  var originName = $(this).parent().prev().prev().prev().text();
  var originDate = $(this).parent().prev().prev().text();
  $(this).parent().prev().prev().prev().html("<input class='editName form-control' style='width:8vw;' value='"+originName+"'>");
  $(this).parent().prev().prev().html("<input type='date' class='editDate form-control' style='width:8vw;' value='"+originDate+"'>");
  $(this).parent().prev().html('<select class="form-control editStatus"><option class="chooseStatus">Status</option><option class="complete">已完成</option><option class="hasStarted">進行中</option><option class="hasNotStarted">尚未開始</option></select>');
  $(this).attr("class", "btn");
  $(this).attr("id", "editSubmit");
  $(this).text("Submit");
  $("tbody").on("click", "#editSubmit", function() {
    var name = $(".editName").val();
    var date = $(".editDate").val().toString().slice(0, 10);
    var status = $(".editStatus").val();
    var statusClass;
    if (status == "進行中") {
      statusClass = "hasStarted";
    } else if (status == "尚未開始") {
      statusClass = "hasNotStarted";
    } else if (status == "已完成") {
      statusClass = "complete";
    }
    if (name != "" && date != "" && status != "Status") {
      $(this).parent().prev().prev().prev().html(name);
      $(this).parent().prev().prev().html(date);
      $(this).parent().prev().html(status);
      $(this).parent().prev().attr("class", statusClass);
      $(this).attr("class", "btn");
      $(this).attr("id", "edit");
      $(this).text("Edit");
    } else {
      alert("Please Confirm Edited Task Information Again!");
    }

  });
});

//Selecter
$("#selectSubmit").on("click", function() {
  var selectedStatus = $("#selectStatus").val();
  var selectedStatusClass;
  var itemNumber = $(".item").length;
  if (selectedStatus == "Select All") {
    selectedStatusClass = "all";
    $(".deleteAllBtn").hide();
  } else if (selectedStatus == "已完成") {
    selectedStatusClass = "complete";
    $(".deleteAllBtn").show();
  } else if (selectedStatus == "進行中") {
    selectedStatusClass = "hasStarted";
    $(".deleteAllBtn").hide();
  } else if (selectedStatus == "尚未開始") {
    selectedStatusClass = "hasNotStarted";
    $(".deleteAllBtn").hide();
  }
  for (var i = 1; i <= itemNumber; i++) {
    if (selectedStatusClass == "all") {
      $("tbody tr:nth-child(" + i + ")").show();
    } else {
      if ($("tbody tr:nth-child(" + i + ") td:nth-child(3)").attr("class") != selectedStatusClass) {
        $("tbody tr:nth-child(" + i + ")").hide();
      } else if ($("tbody tr:nth-child(" + i + ") td:nth-child(3)").attr("class") == selectedStatusClass) {
        $("tbody tr:nth-child(" + i + ")").show();
      }
    }
  }
});

//Delete Completed Tasks
$(".deleteAllBtn").on("click", function(){
  var itemNumber = $(".item").length;
  for (var i = 1; i <= itemNumber; i++) {
    if($("tbody tr:nth-child(" + i + ") td:nth-child(3)").attr("class") == "complete"){
      $("tbody tr:nth-child(" + i + ")").remove();
    }
  }
})
