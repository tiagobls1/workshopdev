function onOff(){
    document
        .querySelector("#modal")
        .classList
        .toggle("hide")

    document
        .querySelector("body")    
        .classList
        .toggle("hideScroll")

    document
        .querySelector("#modal")
        .classList
        .toggle("addScroll")

}

function checkFields(event) {

    const valuesToCheck = [
        "title",
        "image",
        "category",
        "description",
        "link"
        
    ]

    const isEmpty = valuesToCheck.find(function(value){
        const checkIfSsString = typeof event.target[value].value ==="string"
        const checkIfIsEmpety = !event.target [value].value.trim()

        if(checkIfSsString && checkIfIsEmpety) {
            return true
        }
    })
    
    if(isEmpty) {
        event.preventDefault()
        alert("Por favor, preencha todos os campos")
    }
}



/*document
    .querySelector("button.fat")
    .addEventListener("click", onOff)
*/