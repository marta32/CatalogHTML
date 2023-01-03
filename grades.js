// Get all grades per subject;

var modalWrap = null;
let grades = {};
let subjects = {};

function createTitle(){
    const studentName =  (new URL(document.location)).searchParams.get("name");

    const h1Title = document.getElementById("titleStyle");
    h1Title.innerHTML = studentName + "'s grades";
}

async function getAllGrades(){
    const mainDiv = document.querySelector(".main");
    mainDiv.innerHTML ='';
    grades = {};
    const student =  (new URL(document.location)).searchParams.get("student");
    const response = await fetch(`http://localhost:8080/api/grades/${student}`);
    const json = await response.json();

    // subjectTable.removeChild(subjectTable.getElementsByTagName('tbody')[0]);
    // subjectTable.appendChild(document.createElement("tbody"));

    createTitle();

    json.forEach((grade) => {
        if(grades[grade.name] === undefined){
            grades[grade.name] = [];
        }
        grades[grade.name].push({"id":grade.id, "dateMark": grade.dateMark, "mark": grade.mark});
    });
    // console.log("Grades:", grades);
    for (const subject of Object.keys(grades)) {
        console.log(subject, grades[subject]);
        createTable(subject, grades[subject]);
    }
}

async function getAllSubjects(){
    const response = await fetch("http://localhost:8080/api/subjects?pageSize=100");
    const json = await response.json();
    json.content.forEach((sub) => {
        subjects[sub.id] = sub.name;
    })
    // console.log(subjects);
}

function createTable(subject, listOfGrades){
    const mainDiv = document.querySelector(".main");
    let div = document.createElement("div");
    let h4 = document.createElement("h4");
    let table = document.createElement("table");
    let thead = document.createElement("thead");
    let tr = document.createElement("tr");
    let th1 = document.createElement("th");
    let th2 = document.createElement("th");
    let th3 = document.createElement("th");
    let tbody = document.createElement("tbody");
    
    h4.setAttribute("class", "subjectName");
    th1.setAttribute("scope", "col");
    th1.innerHTML = "Date";

    th2.setAttribute("scope", "col");
    th2.innerHTML = "Mark";

    th3.innerHTML = "Actions";

    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    thead.appendChild(tr);

    table.setAttribute("class", "table table-bordered table-hover gradesTable");
    table.appendChild(thead);

    listOfGrades.forEach((grade) => {
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");

        td1.innerHTML = grade.dateMark;
        td2.innerHTML = grade.mark;

        td3.innerHTML = `<button type="button" class="btn" data-toggle="modal" title="Delete grade"`
                        +`onclick = deleteGrade(${grade.id})><i class='fa fa-trash'></i></button>`

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tbody.appendChild(tr);
    });

    table.appendChild(tbody);


    h4.innerHTML = subject;

    div.appendChild(h4);
    div.appendChild(table);
    div.appendChild(document.createElement("br"));

    mainDiv.appendChild(div);
}

function createOptions() {
    let options = ''
    for (const subId of Object.keys(subjects)) {
        options = options + `<option value="${subId}"> ${subjects[subId]} </option>`
    }
    return options;
}

function showModal5(){
    if(modalWrap !== null){
        modalWrap.remove();
    }
    modalWrap = document.createElement('div');
    modalWrap.innerHTML = '<div class="modal fade" id="exampleModal5" tabindex="-1" role="dialog" aria-labelledby="buttonModalLabel" aria-hidden="true">'
                        + '<div class="modal-dialog" role="document">'
                        + '<div class="modal-content">'
                        + '<div class="modal-header">'
                        + '<h5 class="modal-title" id="buttonModalLabel">Add grade</h5>'
                        + '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">'
                        + '</button>'
                        + '</div>'
                        + '<div class="modal-body">'
                        + '<form>'
                        + '<div class="form-group">'
                        + '<label for="subjName" class="col-form-label">Select subject: </label>'
                        + '<select class="form-control" id="subjName">'
                        + `${createOptions()}`
                        + '</select>'
                        + '</div>'
                        + '<div class="form-group">'
                        + '<label for="mark" class="col-form-label">Select grade: </label>'
                        + `<input type="number" min="1" max="10" class="form-control" value="10" id="mark"></input>`
                        + '</div>'
                        + '<div class="form-group">'
                        + '<label for="markDate" class="col-form-label">Select date: </label>'
                        + `<input type="date" class="form-control" value="${new Date().toISOString().substring(0,10)}" id="markDate"></input>`
                        + '</div>'
                        + '</form>'
                        + '</div>'
                        + '<div class="modal-footer">'
                        + `<button type="button" class="btn btn-primary" onclick="addGrade()">Save</button>`
                        + '</div>'
                        + '</div>'
                        + '</div>'
                        + '</div>'
    document.body.append(modalWrap);
    var modal = new bootstrap.Modal(modalWrap.querySelector('.modal'));
    modal.show();
}

async function addGrade(){
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ mark: document.querySelector('#mark').value,
                               dateMark: document.querySelector('#markDate').value,
                               subjectId: document.querySelector('#subjName').value,
                               studentId:  (new URL(document.location)).searchParams.get("student")
                             })
                            };
    const response =  await fetch('http://localhost:8080/api/grades', requestOptions);
    await response.json();
    modalWrap.remove();
    document.querySelector(".modal-backdrop").remove();
    getAllGrades();
}

window.onload = () => {getAllGrades(); getAllSubjects();};

async function deleteGrade(gradeId){
    await fetch('http://localhost:8080/api/grades/'+gradeId, {method: 'DELETE'})
    .then( () => getAllGrades());
}