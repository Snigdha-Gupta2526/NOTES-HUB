// Get Elements
const addNoteBtn = document.getElementById("addNoteBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const addNoteModal = document.getElementById("addNoteModal");
const notesForm = document.getElementById("notesForm");
const notesContainer = document.getElementById("notesContainer");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");
const filterSelect = document.getElementById("filterSelect");

// Notes Array
let notes = JSON.parse(localStorage.getItem("notes")) || [];

// Open Modal
addNoteBtn.onclick = function() {
    addNoteModal.style.display = "flex";
};

// Close Modal
closeModalBtn.onclick = function() {
    addNoteModal.style.display = "none";
};

// Close modal when clicking outside
window.onclick = function(e) {
    if (e.target == addNoteModal) {
        addNoteModal.style.display = "none";
    }
};

// Save Note
notesForm.addEventListener("submit", function(e) {

    e.preventDefault();

    const title = document.getElementById("noteTitle").value;
    const subject = document.getElementById("subject").value;
    const semester = document.getElementById("semester").value;
    const description = document.getElementById("noteDescription").value;
    const pdfLink = document.getElementById("pdfLink").value;

    const category = document.querySelector(
        'input[name="noteTag"]:checked'
    ).value;

    const note = {
        title,
        subject,
        semester,
        description,
        pdfLink,
        category
    };

    notes.push(note);

    localStorage.setItem("notes", JSON.stringify(notes));

    notesForm.reset();

    addNoteModal.style.display = "none";

    displayNotes();
});

// Display Notes
function displayNotes() {

    notesContainer.innerHTML = "";

    if (notes.length === 0) {

        emptyState.style.display = "block";
        return;

    }

    emptyState.style.display = "none";

    notes.forEach(function(note, index) {

        notesContainer.innerHTML += `
        
        <div class="note-card">

            <h2>${note.title}</h2>

            <p><strong>Subject:</strong> ${note.subject}</p>

            <p><strong>Semester:</strong> ${note.semester}</p>

            <p><strong>Category:</strong> ${note.category}</p>

            <p>${note.description}</p>

            <br>

            <a href="${note.pdfLink}" target="_blank">
                📄 Open PDF
            </a>

            <br><br>

            <button onclick="deleteNote(${index})">
                Delete
            </button>

        </div>
        
        `;

    });

}

// Delete Note
function deleteNote(index) {

    notes.splice(index, 1);

    localStorage.setItem("notes", JSON.stringify(notes));

    displayNotes();

}

// Search
searchInput.addEventListener("keyup", function() {

    const text = searchInput.value.toLowerCase();

    const cards = document.querySelectorAll(".note-card");

    cards.forEach(function(card) {

        if (card.innerText.toLowerCase().includes(text)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

});

// Filter
filterSelect.addEventListener("change", function() {

    const value = filterSelect.value;

    const cards = document.querySelectorAll(".note-card");

    cards.forEach(function(card) {

        if (
            value === "all" ||
            card.innerText.toLowerCase().includes(value)
        ) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

});

// First Load
displayNotes();