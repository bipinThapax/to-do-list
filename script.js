let noteContainer = document.querySelector(".noteContainer")
let input = document.querySelector(".addNote input")
let addBtn = document.querySelector(".addNote .addBtn")
let checkMark;  // array of checks

// adding note card in noteContainer
function addNote() {
    if (input.value === "") {
        console.log("Note can't be empty!")
    } else {
        let newCard =
            `<div class="noteCard">
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

        // appending cards at the end of container
        noteContainer.insertAdjacentHTML("beforeend", newCard)
        input.value = ""
    }

    // updating checkboxes 
    checkMark = document.getElementsByClassName("check")

    // event listener to checks
    let checked = false
    Array.from(checkMark).forEach((element) => {
        element.addEventListener("click", () => {
            if (!checked) {
                element.innerHTML = ` <i class="fa-solid fa-circle-check"> </i>`
                element.style.color = "var(--accent)"
                element.parentElement.style.textDecoration = "line-through"
                checked = true;
            } else {
                element.innerHTML = ` <i class="fa-regular fa-circle"></i>`
                element.style.color = "var(--primary)"
                element.parentElement.style.textDecoration = "none"
                checked = false;
            }
        })
    })

    // delete note 
    let deleteBtn = document.getElementsByClassName("delete")
    Array.from(deleteBtn).forEach((element) => {
        element.addEventListener("click", () => {
            element.parentElement.remove()
        })
    })

}

// note add through add btn
addBtn.addEventListener("click", addNote)

//note add through enter key
window.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addNote()
    }
})
