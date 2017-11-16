//This must be called from Client/Index.cshtml

$(document).ready(function () {
    getClient();
});

//variable to check whether action is add or update
var isUpdate = false;

//get customer list
//default page

function getClient() {
    $.ajax({
        url: '/Client/GetClient/',
        type: 'GET',
        datatype: 'json',
        success: function (data) {
            var rows = '';
            $.each(data, function (i, item) {
                rows += "<tr>";
                rows += "<td>" + item.Id + "</td>";
                rows += "<td>" + item.Name + "</td>";
                rows += "<td>" + item.Location + "</td>";
                rows += "<td><button type='button' id='btnEdit' class='btn btn-default' onclick='return getClientById(" + item.Id + ")'>Edit</button> <button type='button' id='btnDelete' class='btn btn-danger' onclick='return deleteClientById(" + item.Id + ")'>Delete</button></td>";
                rows += "</tr>";
                $("#listClients tbody").html(rows);
            });
        },
        error: function (err) {
            alert("Error" + err.ResponseText);
        }
    });
}

//Get Client by ID
function getClientById(id) {
    $("#title").text("Client Details")
    $.ajax({
        url: '/Client/GetClientById/' + id,
        type: 'GET',
        datatype: 'json',
        success: function (data) {
            $("#Id").val(data.Id);
            $("#Name").val(data.Name);
            $("#Location").val(data.Location);
            isUpdate = true;
            $("#clientModal").modal('show');
        },
        error: function (err) {
            alert("Error" + err.ResponseText);
        }
    });
}

//Create new Client
$("#btnSave").click(function (e) {
    var data = {
        Id: $("#Id").val(),
        Name: $("#Name").val(),
        Location: $("#Location").val()
    }

    if (!isUpdate) {
        $.ajax({
            url: '/Client/Create/',
            type: 'POST',
            datatype: 'json',
            data: data,
            success: function (data) {
                getClient();
                $("#clientModal").modal('hide');
                clear();
            }
        })
    }
    else {
        $.ajax({
            url: '/Client/Edit/',
            type: 'POST',
            datatype: 'json',
            data: data,
            success: function (data) {
                getClient();
                isUpdate = false;
                $("#clientModal").modal('hide');
                clear();
            },
            error: function (err) {
                alert("Error: " + err.responseText);
            }
        })
    }
});

//Delete Customer
function deleteClientById(id) {
    $("#confirmModal title").text("Delete Client")
    $("#confirmModal").modal('show')
    $("#confirmModal #btnOk").click(function (e) {
        $.ajax({
            url: '/Client/Delete/' + id,
            type: 'POST',
            datatype: 'json',
            success: function (data) {
                getCustomer();
                $("#confirmModal").modal('hide')
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
    $("#Location").val("");
}