const addbtn = document.querySelector(".add");

const notes = JSON.parse(localStorage.getItem('notes'));

if (notes) {
    notes.forEach(x => {
        addnote(x);
    });
}

addbtn.addEventListener('click', (e) => {
    addnote();
});

function addnote(text = "") {
    const note = document.createElement("div");

    note.classList.add("notes");

    note.innerHTML =
        `
    <div class="tools">
        <button class="edit">
            <i class="fas fa-edit"></i>
        </button>
        <button class="delete">
            <i class="fas fa-trash-alt"></i>
        </button>
    </div>
    <div class="main hidden"></div>
    <textarea></textarea>
    `;

    const editBtn = note.querySelector(".edit");
    const deleteBtn = note.querySelector(".delete");

    const main = note.querySelector(".main")
    const textArea = note.querySelector("textarea");

    const str = text;

    textArea.value = text;
    main.innerHTML = marked(text);

    if (str != "") {
        main.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    }

    textArea.addEventListener('keypress', (event) => {
        if (event.keyCode == 13) {
            main.classList.toggle('hidden');
            textArea.classList.toggle('hidden');
        }

    });

    editBtn.addEventListener('click', () => {
        main.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    });

    textArea.addEventListener("input", (e) => {
        const { value } = e.target;

        main.innerHTML = marked(value);

        updateLS();
    });

    deleteBtn.addEventListener("click", () => {
        note.remove();
        updateLS();
    });

    document.body.appendChild(note);

}

function updateLS() {

    const notesText = document.querySelectorAll('textarea');

    const arr = [];

    notesText.forEach(note => {
        arr.push(note.value);
    });

    localStorage.setItem("notes", JSON.stringify(arr));

}