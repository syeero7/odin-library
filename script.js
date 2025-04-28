class Book {
  constructor(title, author, pages, status) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
}

class Library {
  #library;

  constructor() {
    this.#library = [];
  }

  addBook(book) {
    this.#library.push(book);
  }

  removeBook(id) {
    this.#library = this.#library.filter((book) => id !== book.id);
  }

  toggleStatus(id) {
    const book = this.#library.find((book) => id === book.id);
    book.status = !book.status;
  }

  getBooks() {
    return this.#library;
  }
}

const library = new Library();
const bookList = document.querySelector(".bookTable");
const newBookBtn = document.querySelector(".new-book");
const dialog = document.querySelector("dialog");
const closeBtn = dialog.querySelector(".close-btn");
const form = dialog.querySelector("form");

newBookBtn.addEventListener("click", () => dialog.showModal());
closeBtn.addEventListener("click", () => dialog.close());
form.addEventListener("submit", getUserInput);
bookList.addEventListener("click", handleClick);

function displayBooks() {
  const myLibrary = library.getBooks();

  myLibrary.forEach((book) => {
    const tableRow = document.createElement("tr");
    const removeBtn = document.createElement("button");
    const toggleBtn = document.createElement("button");
    const title = document.createElement("td");
    const author = document.createElement("td");
    const pages = document.createElement("td");
    const dataToggleBtn = document.createElement("td");
    const dataRemoveBtn = document.createElement("td");

    tableRow.dataset.id = book.id;
    removeBtn.dataset.remove = "";
    toggleBtn.dataset.toggle = "";
    dataRemoveBtn.classList.add("del-book");
    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = book.pages;
    removeBtn.textContent = "×";
    toggleBtn.textContent = `${book.status ? "Read" : "Unread"}`;

    dataToggleBtn.appendChild(toggleBtn);
    dataRemoveBtn.appendChild(removeBtn);
    tableRow.append(title, author, pages, dataToggleBtn, dataRemoveBtn);
    bookList.appendChild(tableRow);
  });
}

function getUserInput(e) {
  e.preventDefault();

  const title = form.querySelector("#title").value.trim();
  const author = form.querySelector("#author").value.trim();
  const pages = form.querySelector("#pages").value.trim();
  const status = form.querySelector("#read-status").checked ? true : false;

  const book = new Book(title, author, pages, status);
  library.addBook(book);
  form.reset();
  refreshDisplay();
}

function removeContent() {
  while (bookList.firstChild) {
    bookList.firstChild.remove();
  }
}

function refreshDisplay() {
  removeContent();
  displayBooks();
}

function removeBook(id) {
  library.removeBook(id);
  refreshDisplay();
}

function toggleReadStatus(id) {
  library.toggleStatus(id);
  refreshDisplay();
}

function handleClick(e) {
  const id = e.target.closest("tr").dataset.id;
  if (e.target.matches("[data-remove]")) removeBook(id);
  if (e.target.matches("[data-toggle]")) toggleReadStatus(id);
}
