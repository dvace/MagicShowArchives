//This must be called from Show/MagicShows.cshtml

$(document).ready(function () {
    getShow();
});

//variable to check whether action is add or update
var isUpdate = false;

//get products list
//default page
function getShow() {
    debugger
    $.ajax({
        url: '/Show/GetShow/',
        type: 'GET',
        datatype: 'json',
        success: function (data) {
            var rows = '';
            $.each(data, function (i, item) {
                rows += '<tr>';
                rows += "<td>" + item.Id + "</td>";
                rows += "<td>" + item.Name + "</td>";
                rows += "<td>" + item.Price + "</td>";
                rows += "<td><button type='button' id='btnEdit' class='btn btn-default' onclick='return getShowById(" + item.Id + ")'>Edit</button> <button type='button' id='btnDelete' class='btn btn-danger' onclick='return deleteShowById(" + item.Id + ")'>Delete</button></td>";
                rows += "</tr>";
                $("#listShows tbody").html(rows);
            });
        },
        error: function (err) {
            alert("Error" + err.ResponseText);
        }
    });
}

//Get Product by ID
function getShowById(id) {
    $("#title").text("Show Detail")
    $.ajax({
        url: '/Show/GetShowById/' + id,
        type: 'GET',
        datatype: 'json',
        success: function (data) {
            $("#Id").val(data.Id);
            $("#Name").val(data.Name);
            $("#Price").val(data.Price);
            isUpdate = true;
            $("#showModal").modal('show');
        },
        error: function (err) {
            alert("Error" + err.ResponseText);
        }
    });
}

//Insert/Update Product

$("#btnSave").click(function (e) {

    var data = {
        Id: $("#Id").val(),
        Name: $("#Name").val(),
        Price: $("#Price").val()
    }

    if (!isUpdate) {
        $.ajax({
            url: '/Show/Create/',
            type: 'POST',
            dataType: 'json',
            data: data,
            success: function (data) {
                getShow();
                $("#showModal").modal('hide');
                clear();
            },
            error: function (err) {
                alert("Error: " + err.responseText);
            }
        })
    }
    else {
        $.ajax({
            url: '/Show/Edit/',
            type: 'POST',
            dataType: 'json',
            data: data,
            success: function (data) {
                getShow();
                isUpdate = false;
                $("#showModal").modal('hide');
                clear();
            },
            error: function (err) {
                alert("Error: " + err.responseText);
            }
        })
    }
});

//delete product

function deleteShowById(Id) {
    $("#confirmModal #title").text("Delete Show");
    $("#confirmModal").modal('show');
    $("#confirmModal #btnOk").click(function (e) {
        $.ajax({
            url: '/Show/Delete/' + Id,
            type: 'POST',
            datatype: 'json',
            success: function (data) {
                getShow();
                $("#confirmModal").modal('hide');
            },
            error: function (err) {
                alert("Error" + err.ResponseText);
            }
        });
        e.preventDefault();
    });
}

//set title for create new

$("#btnCreate").click(function () {
    $("#title").text("Create New");
});

//close modal
$("#btnClose").click(function () {
    clear();
});


// Clear all items
function clear() {
    $("#Id").val("");
    $("#Name").val("");
    $("#Price").val("");
}