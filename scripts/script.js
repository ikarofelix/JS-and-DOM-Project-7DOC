const html = document,
      body = document.body,
      form = document.querySelector("form"),
      nameInput = document.querySelector("#name"),
      birthDate = document.querySelector("#birth-date"); // YYYY-MM-DD
     
window.onload = pageStart()

function pageStart(){
    if (getLocalStor()){
        renderPeopleSheets()
    }
    birthDateMax()
}

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

form.addEventListener("submit", ()=>{
    const person = {"name":nameInput.value, "birthDate":birthDate.value}
    setToLocalStor(person)
})

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

function getLocalStor(){
    return JSON.parse(localStorage.getItem("peopleSheets"))
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
          peopleSheetsReturn = getLocalStor();

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

    section.appendChild(sheetsNameValue)
    section.appendChild(sheetsBirthValue)
}

/*
------------renderPeopleSheets example------------
<section id="people-sheets" class="people-sheets">
    <h1 class="sheets-title">List of people</h1>
    <div class="sheets-key">
        <span class="sheets-name">Name</span>
    </div>
    <div class="sheets-key">
        <span class="sheets-birth">Birth date</span>
    </div>
    <div class="sheets-value">
        <span class="sheets-user">Ikaro</span>
        <span class="sheets-user">Ikaro</span>
    </div>
    <div class="sheets-value">
        <span class="sheets-date">18/05/2000</span>
        <span class="sheets-date">18/05/2000</span>
    </div>
</section> */