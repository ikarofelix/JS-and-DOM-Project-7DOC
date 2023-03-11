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
        if (getLocalStor().length>0){
            renderPeopleSheets()
    }}
    birthDateMax()
}

const sheetValue = document.querySelectorAll(".sheet-value");

sheetValue.forEach(editOption=>{
    editOption.querySelector(".sheet-edit").addEventListener("click",()=>{
        const personIndex = Array.prototype.slice.call(sheetValue).indexOf(editOption);
        const personName = editOption.querySelector(".sheet-name").querySelector("label").textContent;
        edit = true;
        editValue = personName.toLowerCase();
        editIndex = personIndex;
        getLocalStor().forEach(person=>{
            if (person.name === editValue){
                nameInput.value = person.name;
                birthDate.value = person.birthDate;
            }
        })
    })
    
})

sheetValue.forEach(element=>{
    element.querySelector(".sheet-delete").addEventListener("click",()=>{
        const personIndex = Array.prototype.slice.call(sheetValue).indexOf(element);
        const personName = element.querySelector(".sheet-name").querySelector("label").textContent;
        getLocalStor().forEach(person=>{
            if (person.name === personName.toLowerCase()){
                deleteLocalStor(personName.toLowerCase(), personIndex)
            }
        })
    })
    
})

form.addEventListener("submit", ()=>{
    const person = {"name":nameInput.value.toLowerCase(), "birthDate":birthDate.value}
    if (!edit){
        setToLocalStor(person)
    } else{
        editLocalStor(person, editValue, editIndex)
    }
})

function checkNameValidity(){
    if (nameInput.validity.patternMismatch || nameInput.validity.tooShort){
        nameInput.setCustomValidity("Only name");
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
    window.location.reload()
}

function capitalizeFirstLetter(str) {
    return str.replace(/\b\w/g, x => x.toUpperCase())
}

function reformatBirth(str){
    return str.split('-').reverse().join('-');
}

function renderPeopleSheets(){
    // Selects the <main> element with the class "sheet-section"
    const main = document.querySelector("main");
    main.classList.add("sheet-section");

    // Creates the <div> element with the class "sheet-key-titles"
    const div1 = document.createElement("div");
    div1.classList.add("sheet-key-titles");

    // Creates the first title
    const div2 = document.createElement("div");
    div2.classList.add("sheet-title", "full-name");
    const h3_1 = document.createElement("h3");
    h3_1.textContent = "Full Name";
    div2.appendChild(h3_1);

    // Creates the second title
    const div3 = document.createElement("div");
    div3.classList.add("sheet-title", "birthday");
    const h3_2 = document.createElement("h3");
    h3_2.textContent = "Birthday";
    div3.appendChild(h3_2);

    // Creates the third title
    const div4 = document.createElement("div");
    div4.classList.add("sheet-title", "options");
    const h3_3 = document.createElement("h3");
    h3_3.textContent = "Options";
    div4.appendChild(h3_3);

    // Adds the titles to the first created <div>
    div1.appendChild(div2);
    div1.appendChild(div3);
    div1.appendChild(div4);

    // Creates the second <div> with the class "sheet"
    const div5 = document.createElement("div");
    div5.classList.add("sheet");

    getLocalStor().forEach(person => {
        // Creates the <div> element with the class "sheet-value"
        const div6 = document.createElement("div");
        div6.classList.add("sheet-value");

        const div7 = document.createElement("div");
        div7.classList.add("sheet-name", "value");
        const label1 = document.createElement("label");
        label1.textContent = capitalizeFirstLetter(person.name);
        div7.appendChild(label1);

        // Creates the second value
        const div8 = document.createElement("div");
        div8.classList.add("sheet-birth", "value");
        const label2 = document.createElement("label");
        label2.textContent = reformatBirth(person.birthDate);
        div8.appendChild(label2);

        // Creates the third value
        const div9 = document.createElement("div");
        div9.classList.add("sheet-options", "value");

        // Creates the element for editing
        const div10 = document.createElement("div");
        div10.classList.add("sheet-edit");
        const a1 = document.createElement("a");
        a1.href = "#edit";
        const span1 = document.createElement("span");
        span1.textContent = "Edit";
        a1.appendChild(span1);
        div10.appendChild(a1);

        // Creates the element for deleting
        const div11 = document.createElement("div");
        div11.classList.add("sheet-delete");
        const a2 = document.createElement("a");
        a2.href = "#delete";
        const span2 = document.createElement("span");
        span2.textContent = "Delete";
        a2.appendChild(span2);
        div11.appendChild(a2);

        // Adds the edit and delete elements to the third value
        div9.appendChild(div10);
        div9.appendChild(div11);

        // Adds the values to the second created <div>
        div6.appendChild(div7);
        div6.appendChild(div8);
        div6.appendChild(div9);

        div5.appendChild(div6);
    });

    // Adds the first and second created <div> to the <main> element
    main.appendChild(div1);
    main.appendChild(div5);
}