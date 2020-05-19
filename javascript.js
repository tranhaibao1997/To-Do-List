let taskList = []

let inputTask = document.getElementById("input").value;
let add = document.getElementById("btn-add");
console.log(renderTabChange(taskList))

document.getElementById("tab-change").innerHTML = `${renderTabChange(taskList)}`



add.addEventListener("click", () => {
    addTask()
})

function addTask() {
    let inputTask = document.getElementById("input").value;
    let priority = document.getElementById("priority").value;
    console.log(priority)
    let task = { 'name': inputTask, 'isDone': false, 'priority': priority }
    taskList.push(task)

    renderTask(taskList)
    document.getElementById("tab-change").innerHTML = renderTabChange(taskList)

}


function removeTask(index) {
    taskList.splice(index, 1)
    renderTask(taskList)
    document.getElementById("tab-change").innerHTML = `${renderTabChange(taskList)}`
}


function renderTask(taskList) {
    function renderTask(task, index) {
        if (task.isDone) {
            return (
                `
<li class="stroke">
    <input type="checkbox" class="" name="checkbox"  onchange="checkboxChange(event,${index})"
    checked>
             <label for=${task.name}>${task.name}</label>
             ${getPriority(task.priority)}
             <button id="btn-remove" onclick="removeTask(${index})">X</button>
             
    </li>
`)
        } else {
            return (
                `
<li>
    <input type="checkbox" class="" name="checkbox"  onchange="checkboxChange(event,${index})"
    check>
             <label for=${task.name}>${task.name}</label>
             ${getPriority(task.priority)}
             <button id="btn-remove" onclick="removeTask(${index})">X</button>
            
    </li>
`)
        }

    }

    const taskListNode = taskList.map(renderTask).join("")
    document.getElementById("task-list").innerHTML = taskListNode


}

function renderTabChange(taskList) {
    if (taskList.length > 0) {
        return `
        <li onclick="showAll()">All<span>${taskList.length}</span></li>
        <li onclick="showDone()">Done<span>${(taskList.filter(task => task.isDone == true)).length}</span></li>
        <li onclick="showNotDone()">Not Done<span>${(taskList.filter(task => task.isDone == false)).length}</span></li>
        `
    } else if (taskList.length === 0) {
        //console.log("task =0")
        return `
            <li onclick="showAll()">All<span>0</span></li>
            <li onclick="showDone()">Done<span>0</span></li>
            <li onclick="showNotDone()">Not Done<span>0</span></li>
            `
    }

}


function renderDoneTask(taskList) {
    function renderTask(task, index) {
        return (
            `
<li class="stroke">
        <input type="checkbox" class="haibao" name="checkbox"  onchange="checkboxChange(event,${index})"
        checked>
                 <label for=${task.name}>${task.name}</label>
                 <button id="btn-remove" onclick="removeTask(${index})">X</button>
                 ${getPriority(task.priority)}
        </li>
`)
    }

    const taskListNode = taskList.map(renderTask).join("")
    document.getElementById("task-list").innerHTML = taskListNode


}

function getPriority(star) {
    if (star == 1) {
        return ` <i class="far fa-star"></i>`
    } else if (star == 2) {
        return ` <i class="far fa-star"></i>  <i class="far fa-star"></i>`
    } else {
        return ` <i class="far fa-star"></i> <i class="far fa-star"></i> <i class="far fa-star"></i>`
    }
}
let checkboxChange = (e, index) => {
    let taskClassList = document.querySelectorAll("#task-list li")

    if (e.target.checked) {
        taskList[index].isDone = true
        console.log(taskList[index])
        for (let i = 0; i < taskClassList.length; i++) {
            taskClassList[index].classList.add("stroke")
        }
    } else if (!e.target.checked) {
        taskList[index].isDone = false
        console.log(taskList[index])
        for (let i = 0; i < taskClassList.length; i++) {
            taskClassList[index].classList.remove("stroke")
        }
    }
    document.getElementById("tab-change").innerHTML = renderTabChange(taskList)

}
let showAll = () => {
    console.log(taskList, "all")
    renderTask(taskList)

}
let showDone = () => {

    let doneArray = taskList.filter(task => task.isDone === true)
    renderDoneTask(doneArray)
    console.log(taskList, "done")



}
let showNotDone = () => {
    renderTask(taskList.filter(task => task.isDone === false))

}