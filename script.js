/*
  Notes App Algorithm Overview
  ----------------------------

  1. Adding Notes:
     - User clicks AddBtn or presses Enter
     - Input is validated (not empty)
     - Note is added to 'notes' array and saved to localStorage
     - NoteContainer is cleared
     - Loop through 'notes' array:
         - Create a new noteCard
         - Add innerHTML containing note text, check button, delete button
         - Append to noteContainer

  2. Completing Notes (Checkbox):
     - Initialize 'checked' = false for each new noteCard
     - Add click listener to check button
         - If checked = false → mark complete, update style, checked = true
         - Else → unmark complete, reset style, checked = false

  3. Deleting Notes:
     - Add click listener to each delete button
     - Remove the note from 'notes' array using splice
     - Update localStorage with new array
     - Call renderNotes() to update the UI

  Notes:
    - All operations update both DOM and localStorage to keep data persistent
*/

let noteContainer = document.querySelector(".noteContainer")
let errorMsg = document.querySelector(".error")
let input = document.querySelector(".addNote input")
let addBtn = document.querySelector(".addNote .addBtn")


// notes array from localStorage
let notes = JSON.parse(localStorage.getItem("notes")) || []

//rendering all notes
renderNotes()

// adding note card in noteContainer
function addNote() {
    if (input.value === "") {
        errorMsg.innerHTML = "Note can't be empty &nbsp; :("
        return;
    }
    let noteText = input.value.trim()  // text from note
    notes.push(noteText)
    localStorage.setItem("notes", JSON.stringify(notes))

    renderNotes()
    input.value = ""
    errorMsg.innerHTML = ""

}

function renderNotes() {
    // first clear the note container
    noteContainer.innerHTML = ""

    // creating notes from localStorage
    notes.forEach((note, index) => {
        let newCard = document.createElement("div")
        newCard.className = "noteCard"
        newCard.innerHTML = `<div class="note">
                <div class="check"><i class="fa-regular fa-circle"></i></div>
                <div class="noteText">${note}</div>
            </div>
            <div class="delete"><i class="fa-solid fa-xmark"></i></div>`

        // updating check boxes on click
        let checked = false
        newCard.querySelector(".check").addEventListener("click", (element) => {
            if (!checked) {
                element.currentTarget.innerHTML = ` <i class="fa-solid fa-circle-check"> </i>`
                element.currentTarget.parentElement.style.textDecoration = "line-through"
                checked = true;
            } else {
                element.currentTarget.innerHTML = ` <i class="fa-regular fa-circle"></i>`
                element.currentTarget.parentElement.style.textDecoration = "none"
                checked = false;
            }
        })

        // deleting note
        newCard.querySelector(".delete").addEventListener("click", () => {
            // removed from array
            notes.splice(index, 1)
            localStorage.setItem("notes", JSON.stringify(notes))
            renderNotes()
        })
        noteContainer.appendChild(newCard)
    })
}

// note add through addBtn
addBtn.addEventListener("click", addNote)

//note add through Enter key
window.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addNote()
    }
})