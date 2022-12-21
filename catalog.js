var modalWrap = null;
var students = null;

function showModal1(index){
    if(modalWrap !== null){
        modalWrap.remove();
    }
    modalWrap = document.createElement('div');
    modalWrap.innerHTML = '<div class="modal fade" id="buttonModal" tabindex="-1" role="dialog" aria-labelledby="buttonModalLabel" aria-hidden="true">'
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
                        // + `<button type="button" class="btn btn-primary" onclick="updateStudent(students[index])">Save</button>`
                        + '</div>'
                        + '</div>'
                        + '</div>'
                        + '</div>'
    document.body.append(modalWrap);
    var modal = new bootstrap.Modal(modalWrap.querySelector('.modal'));
    modal.show();
}

// async function updateStudent(upStudent){

//     const newStudent = {
//         firstName: upStudent.firstName,
//         lastName: upStudent.lastName,
//         birthday: upStudent.birthday,
//     };

//     // console.log(upStudent);

//     // const requestOptions = {
//     //     method: 'PUT',
//     //     headers: { 'Content-Type': 'application/json' },
//     //     body: JSON.stringify(body)
//     // };

//     const upResponse = await fetch('http://localhost:8080/api/students/10');
//     const json = await upResponse.json();
//     // console.log(json);
    
//     getAllStudents();
// }

// GET request using fetch

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
                      +"<button type='button' class='btn' data-toggle='modal' title='Edit student' data-target='#exampleModal' onclick=showModal1("+(i-1)+")><i class='fa fa-eraser'></i></button>"
                      +"<button type='button' class='btn' data-toggle='modal' title='Delete student' data-target='#deleteButton'><i class='fa fa-trash'></i></button>";
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