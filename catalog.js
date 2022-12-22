var modalWrap = null;
var students = null;

// function for update a student;
function showModal1(index){
    if(modalWrap !== null){
        modalWrap.remove();
    }
    modalWrap = document.createElement('div');
    modalWrap.innerHTML = '<div class="modal fade" id="exampleModal1" tabindex="-1" role="dialog" aria-labelledby="buttonModalLabel" aria-hidden="true">'
                        + '<div class="modal-dialog" role="document">'
                        + '<div class="modal-content">'
                        + '<div class="modal-header">'
                        + '<h5 class="modal-title" id="buttonModalLabel">Edit student</h5>'
                        + '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">'
                        + '</button>'
                        + '</div>'
                        + '<div class="modal-body">'
                        + '<form>'
                        + '<div class="form-group">'
                        + '<label for="fname" class="col-form-label">New First name</label>'
                        + `<input type="text" class="form-control" value="${students[index].firstName}" id="firstName">`
                        + '</div>'
                        + '<div class="form-group">'
                        + '<label for="lname" class="col-form-label">New Last name</label>'
                        + `<input type="text" class="form-control" value="${students[index].lastName}" id="lastName"></input>`
                        + '</div>'
                        + '<div class="form-group">'
                        + '<label for="birthday" class="col-form-label">New birthday</label>'
                        + `<input type="date" class="form-control" value="${students[index].birthday}" id="birthday"></input>`
                        + '</div>'
                        + '</form>'
                        + '</div>'
                        + '<div class="modal-footer">'
                        + `<button type="button" class="btn btn-primary" onclick="updateStudent(${index})">Save</button>`
                        + '</div>'
                        + '</div>'
                        + '</div>'
                        + '</div>'
    document.body.append(modalWrap);
    var modal = new bootstrap.Modal(modalWrap.querySelector('.modal'));
    modal.show();
}

// function for create astudent;
function showModal2(){
    if(modalWrap !== null){
        modalWrap.remove();
    }
    modalWrap = document.createElement('div');
    modalWrap.setAttribute("id", "modalWrap2");
    modalWrap.innerHTML = '<div class="modal fade" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="buttonModalLabel" aria-hidden="true">'
                        + '<div class="modal-dialog" role="document">'
                        + '<div class="modal-content">'
                        + '<div class="modal-header">'
                        + '<h5 class="modal-title" id="buttonModalLabel">Edit student</h5>'
                        + '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">'
                        + '</button>'
                        + '</div>'
                        + '<div class="modal-body">'
                        + '<form>'
                        + '<div class="form-group">'
                        + '<label for="fname" class="col-form-label">First name</label>'
                        + `<input type="text" class="form-control" value="Sara" id="firstName">`
                        + '</div>'
                        + '<div class="form-group">'
                        + '<label for="lname" class="col-form-label">Last name</label>'
                        + `<input type="text" class="form-control" value="Pop" id="lastName"></input>`
                        + '</div>'
                        + '<div class="form-group">'
                        + '<label for="birthday" class="col-form-label">Birthday</label>'
                        + `<input type="date" class="form-control" value="2012-12-12" id="birthday"></input>`
                        + '</div>'
                        + '</form>'
                        + '</div>'
                        + '<div class="modal-footer">'
                        + `<button type="button" class="btn btn-primary" onclick="addStudent()">Save</button>`
                        + '</div>'
                        + '</div>'
                        + '</div>'
                        + '</div>'
    document.body.append(modalWrap);
    var modal = new bootstrap.Modal(modalWrap.querySelector('.modal'));
    modal.show();
}

//function for delete student;
function showModal3(index){
    if(modalWrap !== null){
        modalWrap.remove();
    }
    modalWrap = document.createElement('div');
    modalWrap.innerHTML = '<div class="modal fade" id="exampleModal1" tabindex="-1" role="dialog" aria-labelledby="buttonModalLabel" aria-hidden="true">'
                        + '<div class="modal-dialog" role="document">'
                        + '<div class="modal-content">'
                        + '<div class="modal-header">'
                        + '<h5 class="modal-title" id="buttonModalLabel">Delete student</h5>'
                        + '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">'
                        + '</button>'
                        + '</div>'
                        + '<div class="modal-body">'
                        + `<p id="deleteTEXT"> Do you want to delete <b>${students[index].firstName} ${students[index].lastName}</b> from school catalog? </p>`
                        + '</div>'
                        + '<div class="modal-footer">'
                        + `<button type="button" class="btn btn-primary" onclick = deleteStudent(${index})>YES</button>`
                        + `<button type="button" class="btn btn-primary" data-bs-dismiss="modal">NO</button>`
                        + '</div>'
                        + '</div>'
                        + '</div>'
                        + '</div>'
    document.body.append(modalWrap);
    var modal = new bootstrap.Modal(modalWrap.querySelector('.modal'));
    modal.show();
}

// GET request using fetch;
async function getAllStudents(){
    const studentTable = document.querySelector('#studentTable');
    const response = await fetch('http://localhost:8080/api/students?pageNo=0&pageSize=100');
    const json = await response.json();

    studentTable.removeChild(studentTable.getElementsByTagName('tbody')[0]);
    studentTable.appendChild(document.createElement("tbody"));
    let i = 1;
    students = json.content;

    students.forEach((student)=>{
        let tr = document.createElement("tr");
        let th = document.createElement("th");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        
        td1.innerHTML = student.firstName;
        td2.innerHTML = student.lastName;

        td3.innerHTML = "<button type='button' class='btn' data-toggle='modal' title='Add grades' data-target='#addMarkButton'><i class='fa fa-pencil-square-o aria-hidden='true'></i></button>"
                      +"<button type='button' class='btn' data-toggle='modal' title='Edit student' data-target='#exampleModal1' onclick=showModal1("+(i-1)+")><i class='fa fa-eraser'></i></button>"
                      +"<button type='button' class='btn' data-toggle='modal' title='Delete student' data-target='#deleteButton' onclick=showModal3("+(i-1)+")><i class='fa fa-trash'></i></button>";
        th.innerHTML = i;
        // th.setAttribute('scope','row');
        i = i+1;
        
        tr.appendChild(th);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        
        studentTable.getElementsByTagName('tbody')[0].appendChild(tr);
      })

}
window.onload = () => getAllStudents();

// POST request using fetch;
async function addStudent(){
    const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ firstName: document.querySelector('#firstName').value,
                                   lastName: document.querySelector('#lastName').value,
                                   birthday: document.querySelector('#birthday').value
        })
    };
    const response =  await fetch('http://localhost:8080/api/students', requestOptions);
    const stud = await response.json();
    modalWrap.remove();
    document.querySelector(".modal-backdrop").remove();
    getAllStudents();
}

// PUT request using fetch;
async function updateStudent(index){
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            firstName: document.querySelector("#firstName").value,
            lastName: document.querySelector("#lastName").value,
            birthday: document.querySelector("#birthday").value
        })
    };
    const studId = students[index].id;
    const response = await fetch('http://localhost:8080/api/students/'+studId, requestOptions);
    const json = await response.json();
    modalWrap.remove();
    document.querySelector(".modal-backdrop").remove();
    getAllStudents();
}

//DELETE request using fetch;
async function deleteStudent(index){
    const element1 = document.querySelector("#deleteTEXT");
    const element2 = document.querySelector(".modal-backdrop");
    const studId = students[index].id;
    await fetch('http://localhost:8080/api/students/'+studId, {method: 'DELETE'})
        .then( () => element1.innerHTML ='The student is removed by school catalog!');
    setTimeout(() => {modalWrap.remove(),
        element2.remove(),
        getAllStudents();}, 3000);
}