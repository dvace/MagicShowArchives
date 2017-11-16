//loads from PerfromedShow/Index.cshtml
$(document).ready(function () {
    getDetails();
});

//Check for update or add
var isUpdate = false;

//get details
function getDetails() {
    $.ajax({
        url: '/PerformedShow/GetDetails/',
        type: 'GET',
        datatype: 'json',
        success: function (data) {
            var rows = '';
            $.each(data, function (i, item) {
                rows += "<tr>";
                rows += "<td>" + item.Id + "</td>";
                rows += "<td>" + item.ClientId + "</td>";
                rows += "<td>" + item.ShowId + "</td>";
                rows += "<td>" + item.Date + "</td>";
                rows += "<td><button type='button' id='btnEdit' class='btn btn-default' onclick='return getById(" + item.Id + ")'>Edit</button> <button type='button' id='btnDelete' class='btn btn-danger' onclick='return deleteById(" + item.Id + ")'>Delete</button></td>";
                rows += "</tr>";
                $("#PerformedShowTable tbody").html(rows);
            });
        }
    });
}

//get details by Id
function getById(id) {
    $.ajax({
        url: '/PerformedShow/GetById/' + id,
        type: 'GET',
        datatype: 'json',
        success: function (data) {
            $('#Id').val(data.Id);
            $('#ShowName').val(data.ShowName);
            $('#ClientName').val(data.ClientName);
            $('#Date').val(data.Date);
            isUpdate = true;
            $("#performedShowModal").modal('show');
        }
    });
}

//Insert/Update Product

$("#btnSave").click(function (e) {

    var data = {
        Id: $("#Id").val(),
        ShowId: $("#ShowId").val(),
        ClientId: $("#ClientId").val(),
        Date: $("#Date").val()
    }

    if (!isUpdate) {
        $.ajax({
            url: '/PerformedShow/Create/',
            type: 'POST',
            dataType: 'json',
            data: data,
            success: function (data) {
                getDetails();
                $("#performedShowModal").modal('hide');
                clear();
            },
            error: function (err) {
                alert("Error: " + err.responseText);
            }
        })
    }
    else {
        $.ajax({
            url: '/PerformedShow/Edit/',
            type: 'POST',
            dataType: 'json',
            data: data,
            success: function (data) {
                getDetails();
                isUpdate = false;
                $("#performedShowModal").modal('hide');
                clear();
            },
            error: function (err) {
                alert("Error: " + err.responseText);
            }
        })
    }
});

//Delete Record
function deleteById(id) {
    $("#confrimModal #title").text("Delete Record");
    $("#confirmModal").modal('show');
    $("#confirmModal #btnOk").click(function (e) {
        $.ajax({
            url: '/PerformedShow/Delete/' + id,
            type: 'POST',
            datatype: 'json',
            success: function (data) {
                getDetails();
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