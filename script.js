let noteContainer = document.querySelector(".noteContainer")
let input = document.querySelector(".addNote input")
let addBtn = document.querySelector(".addNote input:last-child")
let checkMark = document.body.getElementsByClassName("check")


// adding note card in noteContainer
function addNote() {
    if (input.value === "") {
        console.log("Note can't be empty!")
    } else {
        noteContainer.innerHTML += `
        <div class="noteCard">
            <div class="note">
                <div class="check">
                    <i class="fa-regular fa-circle"></i>
                </div>
                <div class="noteText">
                        ${input.value}
                </div>
            </div>
            <div class="delete">
                <i class="fa-solid fa-xmark"></i>
            </div>
        </div>`
        input.value = ""
    }
}

// note add through add btn
addBtn.addEventListener("click", addNote)

//note add through enter key
window.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addNote()
    }
})


// note checked and unchecked with text-deco
let checked = false
Array.from(checkMark).forEach((element) => {
    element.addEventListener("click", () => {
        if (!checked) {
            element.innerHTML = ` <i class="fa-solid fa-circle-check"> </i>`
            element.parentElement.style.textDecoration = "line-through"
            checked = true;
        } else {
            element.innerHTML = ` <i class="fa-regular fa-circle"></i>`
            element.parentElement.style.textDecoration = "none"
            checked = false;
        }
    })
})