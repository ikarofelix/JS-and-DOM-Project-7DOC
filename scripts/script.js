const html = document,
      body = document.body,
      form = document.querySelector("form"),
      nameInput = document.querySelector("#name"),
      birthDate = document.querySelector("#birth-date");

let edit = false,
    editValue = "",
    editIndex = 0;

window.onload = pageStart()

function pageStart(){
    if (getLocalStor()){
        renderPeopleSheets()
    }
    birthDateMax()
}

const sheetsUser = document.querySelectorAll(".sheets-user"),
      editBtn = document.querySelector("#edit-button"),
      deleteBtn = document.querySelector("#delete-button");

sheetsUser.forEach(element=>{
    element.addEventListener("click", ()=>{
        if (element.classList.contains("active")){
            element.classList.remove("active","checkmark")
        } else{
        element.classList.add("active", "checkmark")
        editIndex = Array.prototype.slice.call(sheetsUser).indexOf(element);
        sheetsUser.forEach(e=>{
            if (e!=element & e.classList.contains("active")){
                e.classList.remove("active","checkmark")
            }
        })
    }})
})

try {
    editBtn.addEventListener("click", ()=>{
    const active = document.querySelector(".active")
    if (!active){
        alert("You must choose one person to edit it's values")
    } else{
        const textToEdit = (active.innerText)   
        getLocalStor().forEach(person=>{
            if (person.name.toLowerCase() === textToEdit.toLowerCase()){
                nameInput.value = person.name;
                birthDate.value = person.birthDate;
                edit = true;
                editValue = person.name;
            }
        })
    }
})} catch{}

try {
    deleteBtn.addEventListener("click", ()=>{
    const active = document.querySelector(".active")
    if (!active){
        alert("You must choose one person to delete it's values")
    } else{
        const textToEdit = (active.innerText)   
        getLocalStor().forEach(person=>{
            if (person.name.toLowerCase() === textToEdit.toLowerCase()){
                edit = true;
                editValue = person.name;
                deleteLocalStor(editValue, editIndex)
                location.reload()
            }
        })
    }
})}catch{}

try{
    if (document.querySelector(".sheets-value").childNodes.length<1){
    document.querySelector("#people-sheets").remove()
}}catch{}

form.addEventListener("submit", (e)=>{
    const person = {"name":nameInput.value, "birthDate":birthDate.value}
    if (!edit){
        setToLocalStor(person)
    } else{
        editLocalStor(person, editValue, editIndex)
    }
})

function checkNameValidity(){
    if (nameInput.validity.patternMismatch || nameInput.validity.tooShort){
        nameInput.setCustomValidity("First name");
    } else{
        nameInput.setCustomValidity("");
    }
}

function birthDateMax(){
    let today = new Date(),
        d = today.getDate(),
        m = today.getMonth()+1,
        y = today.getFullYear();

    if (d<10) {
    d = '0'+d;
    }
    if (m<10) {
    m = '0'+m;
    } 
        
    today = `${y}-${m}-${d}`;
    birthDate.setAttribute("max", today);
}

function getLocalStor(){
    return JSON.parse(localStorage.getItem("peopleSheets"))
}

function setToLocalStor(person){
    if (!getLocalStor()){
        localStorage.setItem("peopleSheets", JSON.stringify([person]));
    } else{
        let peopleList = [];
        getLocalStor().forEach(p=>{
            peopleList.push(p)
        })
        peopleList.push(person);
        localStorage.setItem("peopleSheets", JSON.stringify(peopleList));
    }
}

function editLocalStor(person, str, index){
    const array = [];
    getLocalStor().forEach(p=>{
        array.push(p);
        if (p.name === str & array.indexOf(p) === index){
            array.splice(array.indexOf(p), 1, person);
        }
    })
    localStorage.setItem("peopleSheets", JSON.stringify(array));
}

function deleteLocalStor(str, index){
    const array = [];
    getLocalStor().forEach(p=>{
        array.push(p);
        if (p.name === str & array.indexOf(p) === index){
            array.splice(array.indexOf(p), 1);
        }
    })
    localStorage.setItem("peopleSheets", JSON.stringify(array));
}

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function reformatBirth(str){
    return str.split('-').reverse().join('-');
}

function renderPeopleSheets(){
    const section = document.createElement("section"),
        h1 = document.createElement("h1"),
        divName = document.createElement("div"),
        spanName = document.createElement("span"),
        divBirth = document.createElement("div"),
        spanBirth = document.createElement("span"),
        sheetsNameValue = document.createElement("div"),
        sheetsBirthValue = document.createElement("div"),
        peopleSheetsReturn = getLocalStor(),
        btnDiv = document.createElement("div"),
        editButton = document.createElement("button"),
        deleteButton = document.createElement("button");

    section.id = "people-sheets";
    section.classList.add("people-sheets");
    body.appendChild(section);

    h1.classList.add("sheets-title");
    h1.innerText = "List of people";
    section.appendChild(h1);

    divName.classList.add("sheets-key");
    spanName.innerText = "Name";
    spanName.classList.add("sheets-name");
    divName.appendChild(spanName);
    section.appendChild(divName);

    divBirth.classList.add("sheets-key");
    spanBirth.innerText = "Birth date";
    spanBirth.classList.add("sheets-birth");
    divBirth.appendChild(spanBirth);
    section.appendChild(divBirth);

    sheetsNameValue.classList.add("sheets-value");
    sheetsBirthValue.classList.add("sheets-value");
    
    peopleSheetsReturn.forEach(person => {
        const personName = document.createElement("span"),
            personBirth = document.createElement("span");

        personName.innerText = capitalizeFirstLetter(person.name);
        personName.classList.add("sheets-user");
        sheetsNameValue.appendChild(personName);

        personBirth.innerText = reformatBirth(person.birthDate);
        personBirth.classList.add("sheets-date");
        sheetsBirthValue.appendChild(personBirth);
    });

    section.appendChild(sheetsNameValue);
    section.appendChild(sheetsBirthValue);

    btnDiv.classList.add("edit-button");
    editButton.id = "edit-button";
    editButton.innerText = "Edit Value";
    btnDiv.appendChild(editButton);
    
    deleteButton.id = "delete-button";
    deleteButton.innerText = "Delete Value";
    btnDiv.appendChild(deleteButton);
    section.appendChild(btnDiv);
}