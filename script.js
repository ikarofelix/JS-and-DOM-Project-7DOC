document.querySelector("form").addEventListener("submit", (e)=>{
    e.preventDefault()
    console.log(document.querySelector("#name").value)
    console.log(document.querySelector("#birth-date").value);
})