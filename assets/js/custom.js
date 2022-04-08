var baseUrl = "http://localhost:4000/";

/* All Author related START*/
const pageName = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
showAuthorData();
var authors = [];
var tasks = [];

function openAuthorModal(data = null) {
    $('#authId').val('');
    $('#authName').val('');
    $('#authEmail').val('');
    $('#addAuthor').show();
    $('#editAuthor').hide();
    $('#authorModal').modal('show');

    if (data != null) {
        $('#authId').val(data.author_id);
        $('#authName').val(data.author_name);
        $('#authEmail').val(data.author_email);
        $('#addAuthor').hide();
        $('#editAuthor').show();
    }
}

function addAuthor() {
    let authName = $('#authName').val();
    let authEmail = $('#authEmail').val();
    if (authName != '' && authEmail != '') {
        $.ajax({
            type: "POST",
            url: baseUrl + "author/addAuthor",
            dataType: 'json',
            data: { "authName": authName, "authEmail": authEmail },
            success: function (msg) {
                showAuthorData();
                showAlert(msg.response);
            }
        });
    } else {
        showAlert("Please fill all the fields.");
    }
    if ($("#authorModal").is(":visible")) {
        $('#authorModal').modal('hide');
    }
}

function showAuthorData() {
    $("#authorData tbody tr").remove();
    $('#authorData').DataTable().clear().destroy();
    var table = $('#authorData').DataTable({
        order: [],
        scrollY: '40vh',
        scrollCollapse: true,
        retrieve: true,
    });
    $.ajax({
        type: "GET",
        url: baseUrl + "author/allAuthors",
        dataType: 'json',
        data: {},
        success: function (msg) {
            if (msg.status == 'success') {
                let tab = "";
                $.each(msg.response, function (i, item) {
                    if (pageName == 'index.html') {
                        tab = "<td nowrap><button type='button' class='btn btn-primary btn-xs' onclick='openAuthorModal(" + JSON.stringify(item) + ")'>Edit</button> | <button type='button' class='btn btn-danger btn-xs delAuthor' onclick='authorDelete(" + item.author_id + ")'>Remove</button></td>";
                        table.row.add([item.author_name, item.author_email, tab]).draw();
                    } else {
                        var da = {
                            author_id: item.author_id,
                            author_name: item.author_name
                        }
                        authors.push(da);
                    }
                });
            }
        }
    });
    $('#authorData tbody').on('click', '.delAuthor', function () {
        table
            .row($(this).parents('tr'))
            .remove()
            .draw();
    });
}

function editAuthor() {
    let authId = $('#authId').val();
    let authName = $('#authName').val();
    let authEmail = $('#authEmail').val();
    if (authName != '' && authEmail != '') {
        $.ajax({
            type: "POST",
            url: baseUrl + "author/updateAuthor",
            dataType: 'json',
            data: { "authId": authId, "authName": authName, "authEmail": authEmail },
            success: function (msg) {
                showAuthorData();
                showAlert(msg.response);
            }
        });
    } else {
        showAlert("Please fill all the fields.");
    }
    if ($("#authorModal").is(":visible")) {
        $('#authorModal').modal('hide');
    }
}

function authorDelete(id) {
    $.ajax({
        type: "GET",
        url: baseUrl + "author/deleteAuthor/" + id,
        dataType: 'json',
        data: {},
        success: function (msg) {
            showAlert(msg.response);
        }
    });
}

/* All Author related END*/

/* All Task related START*/

showTaskData();

function openTaskModal(data = null) {
    $('#taskId').val('');
    $('#taskName').val('');
    $('#taskDesc').val('');
    $('#addTask').show();
    $('#editTask').hide();
    $('#taskModal').modal('show');

    if (data != null) {
        $('#taskId').val(data.task_id);
        $('#taskName').val(data.task_name);
        $('#taskDesc').val(data.task_desc);
        $('#addTask').hide();
        $('#editTask').show();
    }
}

function addTask() {
    let taskName = $('#taskName').val();
    let taskDesc = $('#taskDesc').val();
    if (taskName != '' && taskDesc != '') {
        $.ajax({
            type: "POST",
            url: baseUrl + "task/addTask",
            dataType: 'json',
            data: { "taskName": taskName, "taskDesc": taskDesc },
            success: function (msg) {
                showTaskData();
                showAlert(msg.response);
            }
        });
    } else {
        showAlert("Please fill all the fields.");
    }
    if ($("#taskModal").is(":visible")) {
        $('#taskModal').modal('hide');
    }
}

function showTaskData() {
    $("#taskData tbody tr").remove();
    $('#taskData').DataTable().clear().destroy();
    var table = $('#taskData').DataTable({
        order: [],
        scrollY: '40vh',
        scrollCollapse: true,
        retrieve: true,
    });
    $.ajax({
        type: "GET",
        url: baseUrl + "task/allTasks",
        dataType: 'json',
        data: {},
        success: function (msg) {
            if (msg.status == 'success') {
                $.each(msg.response, function (i, item) {
                    if (pageName == 'index.html') {
                        var tab = "<td nowrap><button type='button' class='btn btn-primary btn-xs' onclick='openTaskModal(" + JSON.stringify(item) + ")'>Edit</button> | <button type='button' class='btn btn-danger btn-xs delTask' onclick='taskDelete(" + item.task_id + ")'>Remove</button></td>";
                        table.row.add([item.task_name, item.task_desc, tab]).draw();
                    } else {
                        var da = {
                            task_id: item.task_id,
                            task_name: item.task_name
                        }
                        tasks.push(da);
                    }
                });
            }
        }
    });
    $('#taskData tbody').on('click', '.delTask', function () {
        table
            .row($(this).parents('tr'))
            .remove()
            .draw();
    });
}

function editTask() {
    let taskId = $('#taskId').val();
    let taskName = $('#taskName').val();
    let taskDesc = $('#taskDesc').val();
    if (taskName != '' && taskDesc != '') {
        $.ajax({
            type: "POST",
            url: baseUrl + "task/updateTask",
            dataType: 'json',
            data: { "taskId": taskId, "taskName": taskName, "taskDesc": taskDesc },
            success: function (msg) {
                showTaskData();
                showAlert(msg.response);
            }
        });
    } else {
        showAlert("Please fill all the fields.");
    }
    if ($("#taskModal").is(":visible")) {
        $('#taskModal').modal('hide');
    }
}

function taskDelete(id) {
    $.ajax({
        type: "GET",
        url: baseUrl + "task/deleteTask/" + id,
        dataType: 'json',
        data: {},
        success: function (msg) {
            showAlert(msg.response);
        }
    });
}

/* All Task related END*/

/* All Timer related START*/

showTimerData();

function openTimerModal(data = null) {
    if (data != null) {
        $('#timerId').val(data.timer_id);
        $('#timerName').val(data.timer_name);

        $('#authId').append("<option value=" + data.timer_auth_id + ">" + data.author_name + "</option>");
        $('#authId').attr('disabled', 'disabled');
        $('#taskId').append("<option value=" + data.timer_task_id + ">" + data.task_name + "</option>");
        $('#taskId').attr('disabled', 'disabled');

        $('#addTimer').hide();
        $('#editTimer').show();
    } else {
        $('#authId').removeAttr('disabled');
        $("#authId").empty();
        $("#authId").append("<option value=''>Select Author</option>");
        $.each(authors, function (i, item) {
            $('#authId').append("<option value=" + item.author_id + ">" + item.author_name + "</option>");
        });
        $('#taskId').removeAttr('disabled');
        $("#taskId").empty();
        $("#taskId").append("<option value=''>Select Task</option>");
        $.each(tasks, function (i, item) {
            $('#taskId').append("<option value=" + item.task_id + ">" + item.task_name + "</option>");
        });

        $('#timerId').val('');
        $('#timerName').val('');
        $('#authId').val('');
        $('#taskId').val('');

        $('#addTimer').show();
        $('#editTimer').hide();
    }
    $('#timerModal').modal('show');
}

function addTimer() {
    let timerName = $('#timerName').val();
    let authId = $('#authId').val();
    let taskId = $('#taskId').val();
    if (timerName != '' && authId != '' && taskId != '') {
        $.ajax({
            type: "POST",
            url: baseUrl + "timer/addTimer",
            dataType: 'json',
            data: { "timerName": timerName, "authId": authId, "taskId": taskId },
            success: function (msg) {
                showTimerData();
                showAlert(msg.response);
            }
        });
    } else {
        showAlert("Please fill all the fields.");
    }
    if ($("#timerModal").is(":visible")) {
        $('#timerModal').modal('hide');
    }
}

function showTimerData() {
    $("#timerData tbody tr").remove();
    $('#timerData').DataTable().clear().destroy();
    var table = $('#timerData').DataTable({
        order: [],
        scrollY: '40vh',
        scrollCollapse: true,
        retrieve: true,
    });
    $.ajax({
        type: "GET",
        url: baseUrl + "timer/allTimers",
        dataType: 'json',
        data: {},
        success: function (msg) {
            if (msg.status == 'success') {
                $.each(msg.response, function (i, item) {
                    var tab = "<button type='button' class='btn btn-success btn-xs startStopTimer' id='time" + i + "' data-is-timer='0' data-timer-id=" + item.timer_id + ">Start/Stop</button> | <button type='button' class='btn btn-primary btn-xs' onclick='openTimerModal(" + JSON.stringify(item) + ")'>Edit</button> | <button type='button' class='btn btn-danger btn-xs delTimer' onclick='timerDelete(" + item.timer_id + ")'>Remove</button>";
                    table.row.add([item.timer_name, item.author_name, item.task_name, item.timer_tot_time, item.timer_tot_time, tab]).draw();
                });
            }
        }
    });

    $('#timerData tbody').on('click', '.delTimer', function () {
        table
            .row($(this).parents('tr'))
            .remove()
            .draw();
    });

    $('#timerData tbody').on('click', 'td', function () {
        var tr = $(this).closest("tr");
        var rowindex = tr.index();
        $('#rowId').val(rowindex);
    });

    $('#timerData tbody').on('click', '.startStopTimer', function () {
        var tr = $(this).closest("tr");
        var rowindex = tr.index();

        var isON = $(this).attr('data-is-timer');
        var timerId = $(this).attr('data-timer-id');
        if (isON == 0) {
            $(this).attr('data-is-timer', 1);
            runTimer(parseInt(rowindex), 0, timerId);
        } else if (isON == 1) {
            $(this).attr('data-is-timer', 0);
            runTimer(parseInt(rowindex), 1, timerId);
        }
    });
}

function editTimer() {
    let timerId = $('#timerId').val();
    let timerName = $('#timerName').val();
    let rowId = parseInt($('#rowId').val());
    if (timerName != '') {
        $.ajax({
            type: "POST",
            url: baseUrl + "timer/updateTimer",
            dataType: 'json',
            data: { "timerId": timerId, "timerName": timerName },
            success: function (msg) {
                var table = $('#timerData').DataTable({
                    order: [],
                    scrollY: '40vh',
                    scrollCollapse: true,
                    retrieve: true,
                });
                table.cell({ row: rowId, column: 0 }).data(timerName);
                showAlert(msg.response);
            }
        });
    } else {
        showAlert("Please fill all the fields.");
    }
    if ($("#timerModal").is(":visible")) {
        $('#timerModal').modal('hide');
    }
}

function timerDelete(id) {
    $.ajax({
        type: "GET",
        url: baseUrl + "timer/deleteTimer/" + id,
        dataType: 'json',
        data: {},
        success: function (msg) {
            showAlert(msg.response);
        }
    });
}
let timmed = [];
function runTimer(rowId, isON, timerId) {
    var table = $('#timerData').DataTable();
    var time2 = table.cell({ row: rowId, column: 4 }).data();
    if (isON == 1 && timmed.includes(rowId)) {
        table.cell({ row: rowId, column: 3 }).data(time2);
        table.cell({ row: rowId, column: 4 }).data("<span>" + time2 + "</span>");
    } else if (!timmed.includes(rowId)) {
        timmed.push(rowId);
        var x = setInterval(function () {
            var time = table.cell({ row: rowId, column: 4 }).data();
            var ss = time.split(":");
            var dt = new Date();
            dt.setHours(ss[0]);
            dt.setMinutes(ss[1]);
            dt.setSeconds(ss[2]);
            var dt2 = new Date(dt.valueOf() + 1000);
            var ts = dt2.toTimeString().split(" ")[0];
            if (ts == "Invalid") {
                if (time.replace(/[0-9]/g, '') == "<span>::</span>") {
                    updateTimer(timerId, time2);
                }
                table.cell({ row: rowId, column: 4 }).data("<span style='font-weight:800'>STOP</span>");
            } else {
                table.cell({ row: rowId, column: 4 }).data(ts);
            }
            var seconds = dt2.getSeconds();
            if (seconds % 10 == 0) {
                updateTimer(timerId, ts);
                showUpdateTimer(rowId, timerId, time2)
            }
        }, 1000);
    } else if (isON == 0) {
        var table = $('#timerData').DataTable();
        var time2 = table.cell({ row: rowId, column: 3 }).data();
        table.cell({ row: rowId, column: 4 }).data(time2);
        allToServer();
    }
}

function allToServer() {
    var table = $('#timerData').DataTable();
    var data = table.rows()[0];
    for (var j = 0; j < data.length; j++) {
        if (timmed.includes(j)) {
            var time = table.cell({ row: data[j], column: 4 }).data();
            var timerId = $('#time' + data[j]).attr('data-timer-id');
            var isTimer = $('#time' + data[j]).attr('data-is-timer');
            if (isTimer == 1) {
                updateTimer(timerId, time)
            }
        }
    }
}

function updateTimer(timerId, ts) {
    console.log(timerId + "---" + ts + "<br>");
    $.ajax({
        type: "POST",
        url: baseUrl + "timer/updateTimerTime",
        dataType: 'json',
        data: { "timerId": timerId, "ts": ts },
        success: function (msg) {
            //  showAlert(msg.response);
        }
    });
}

function showUpdateTimer(rowId, timerId, time2) {
    var table = $('#timerData').DataTable();
    var time2 = table.cell({ row: rowId, column: 4 }).data();
    table.cell({ row: rowId, column: 3 }).data(time2);
}

/* All Timer related END*/


function showAlert(text) {
    $("#alertText").html(text);
    $(".myAlert-top").show();
    setTimeout(function () {
        $(".myAlert-top").hide();
    }, 3000);
}

window.onbeforeunload = function () {
    allToServer();
    return true;
}