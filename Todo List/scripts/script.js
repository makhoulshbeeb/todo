var taskList = document.getElementById("tasks");

loadData();

var open = true;
const now = new Date();
currentTime = now.toLocaleDateString("en-us", { year: "numeric", month: "short", day: "numeric" });
document.getElementById("date").innerText = currentTime;
var tasks = document.getElementsByClassName("task");
var title = document.getElementById("title");
var description = document.getElementById("description");
var dueDate = document.getElementById("date-due");
var boxes = document.querySelectorAll('input[type="checkbox"]');
var bins = document.querySelectorAll(".bin");
var descriptions = document.querySelectorAll(".describe");

boxes.forEach(el => el.addEventListener('click', event => {
    dataObj = JSON.parse(localStorage.getItem("newTasks"));
    const data = Object.keys(dataObj).map(
        (key) => dataObj[key]);
    index = [].indexOf.call(boxes, el);
    data[index].finished = data[index].finished ? 0 : 1;
    localStorage.setItem("newTasks", JSON.stringify(data));
}));

bins.forEach(el => el.addEventListener('click', event => {
    dataObj = JSON.parse(localStorage.getItem("newTasks"));
    const data = Object.keys(dataObj).map(
        (key) => dataObj[key]);
    index = [].indexOf.call(bins, el);
    taskDone(index);
}));

descriptions.forEach(el => el.addEventListener('click', event => {
    dataObj = JSON.parse(localStorage.getItem("newTasks"));
    const data = Object.keys(dataObj).map(
        (key) => dataObj[key]);
    index = [].indexOf.call(descriptions, el);
    taskDescription(index);
}));

function toggleBar() {
    if (open) {
        $("#slider").html('<span style="position: relative;bottom: 0.1em;">»</span>');
        open = false;
    } else {
        $("#slider").html('<span style="position: relative;bottom: 0.1em;">«</span>');
        open = true;
    }
    $("#new-task").toggle();
}
function addDays(days) {
    var result = new Date(document.getElementById("date").innerText);
    result.setDate(result.getDate() + days);
    return result;
}
function tomorrow() {
    document.getElementById("date").innerText = addDays(1).toLocaleDateString("en-us", { year: "numeric", month: "short", day: "numeric" });
}
function yesterday() {
    document.getElementById("date").innerText = addDays(-1).toLocaleDateString("en-us", { year: "numeric", month: "short", day: "numeric" });
}
function taskDescription(number) {
    dataObj = JSON.parse(localStorage.getItem("newTasks"));
    const data = Object.keys(dataObj).map(
        (key) => dataObj[key]
    );
    window.alert(data[number].description);
}
function taskDone(number) {
    newTasksObj = JSON.parse(localStorage.getItem("newTasks"));
    const newTasks = Object.keys(newTasksObj).map(
        (key) => newTasksObj[key]
    );
    newTasks.splice(number, 1);
    localStorage.setItem("newTasks", JSON.stringify(newTasks));
    location.reload(true);
}
function addTask() {

    const taskData = {
        title: title.value,
        description: description.value,
        workers: ['Alex', 'Pete', 'Sara'],
        date: new Date(dueDate.value).toLocaleDateString("en-us", { year: "numeric", month: "short", day: "numeric" }),
        progress: Math.floor(Math.random() * 101),
        finished: Math.floor(Math.random() * 2),
        pastDue: false,
    }
    newTasksObj = JSON.parse(localStorage.getItem("newTasks"));
    const newTasks = Object.keys(newTasksObj).map(
        (key) => newTasksObj[key]
    );
    newTasks.push(taskData);
    localStorage.setItem("newTasks", JSON.stringify(newTasks));
    location.reload(true);
}
function loadData() {
    var newList = "";
    dataObj = JSON.parse(localStorage.getItem("newTasks"));
    const data = Object.keys(dataObj).map(
        (key) => dataObj[key]
    );
    console.warn(data);
    for (i = 0; i < data.length; i++) {
        newList += `<div class="task">
                    <div>
                        <div><input type="checkbox" ${data[i].finished ? 'checked' : ''}>
                            <div>
                                <p class="task-name"><strong>${data[i].title}</strong></p>
                                <a class="describe" style="font-size: 13px;color: #dedede;">description</a>
                            </div>
                        </div>
                        <img src="assets/Garbage Bins - White Closed.png" class="bin">

                    </div>
                    <div class="progress-bar">
                        <div class="progress" style="width:${data[i].progress}%;"></div>
                    </div>
                    <div>
                        <span class="progress-percent"><strong>${data[i].progress}%</strong></span>
                        <img class="worker-pfp" src="assets/worker-pfp.jpg">
                    </div>
                </div>`
    }
    taskList.innerHTML = newList;
}