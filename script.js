const nome = document.querySelector("#name");

function checkNameValidity(){
    if (nome.validity.patternMismatch || nome.validity.tooShort){
        nome.setCustomValidity("First nome");
    } else{
        nome.setCustomValidity("");
    }
}