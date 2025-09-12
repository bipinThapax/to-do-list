let noteContainer = document.querySelector(".noteContainer")
let errorMsg = document.querySelector(".error")
let input = document.querySelector(".addNote input")
let addBtn = document.querySelector(".addNote .addBtn")
let checkMark;  // array of checks

// adding note card in noteContainer
function addNote() {
    if (input.value === "") {
        errorMsg.innerHTML = "Note can't be empty :("
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
        savedToLocalStorage(input.value)
        input.value = ""
        errorMsg.innerHTML = ""
    }

    // updating checkboxes 
    checkMark = document.getElementsByClassName("check")

    // event listener to checks
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

    // delete note 
    let deleteBtn = document.getElementsByClassName("delete")
    Array.from(deleteBtn).forEach((element) => {
        element.addEventListener("click", deleteNote(element))
    })

}
function deleteNote(element) {
    let noteText =
        element.parentElement.querySelector(".noteText").textContent.trim()
    let index = 0
    notes.forEach((e) => {
        if (noteText === e) {
            delete notes[index]
            element.parentElement.remove()
        } else {
            savedToLocalStorage(e)
        }
        index++;
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

// local storage save data :done
// saved note stays on the browser/ noteContainer :done
// delete notes from localstorage

let notes = []
function savedToLocalStorage(note) {
    notes.push(note)
    localStorage.setItem("notes", JSON.stringify(notes))

}


// getting notes from local storage
let savedNotes = JSON.parse(localStorage.getItem("notes")) || []


if (savedNotes.length > 0) {
    savedNotes.forEach((element) => {
        noteContainer.insertAdjacentHTML("beforeend", `<div class="noteCard">
            <div class="note">
                <div class="check">
                    <i class="fa-regular fa-circle"></i>
                </div>
                <div class="noteText">
                        ${element}
                </div>
            </div>
            <div class="delete">
                <i class="fa-solid fa-xmark"></i>
            </div>
          </div>`)
    })
}

// remove element from array first