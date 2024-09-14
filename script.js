class Book {
  constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
}

class Library {
  #library = [];

  addBook(book) {
    this.#library.push(book);
  }

  removeBook(index) {
    this.#library.splice(index, 1);
  }

  toggleStatus(index) {
    const book = this.#library[index];
    book.status = !book.status;
  }

  getBooks() {
    return this.#library;
  }
}

const library = new Library();
const bookList = document.querySelector("#bookList");
const newBookBtn = document.querySelector("#new-book");
const dialog = document.querySelector("dialog");
const closeBtn = dialog.querySelector("#close-btn");
const form = dialog.querySelector("form");

function displayBooks() {
  const myLibrary = library.getBooks();

  myLibrary.forEach((book, index) => {
    const listItem = document.createElement("li");
    listItem.setAttribute("data-index", index);
    const removeBtn = document.createElement("button");
    removeBtn.setAttribute("data-remove", "");
    const toggleBtn = document.createElement("button");
    toggleBtn.setAttribute("data-toggle", "");
    const para = document.createElement("p");
    const lineBreak = document.createElement("br");

    para.textContent = `${book.title} by ${book.author}, ${book.pages} pages.`;
    removeBtn.textContent = "Remove";
    toggleBtn.textContent = `${book.status ? "Read" : "Not read yet"}`;

    listItem.append(para, lineBreak, toggleBtn, removeBtn);
    bookList.appendChild(listItem);
  });
}

function getUserInput(e) {
  e.preventDefault();

  const title = form.querySelector("#title").value;
  const author = form.querySelector("#author").value;
  const pages = form.querySelector("#pages").value;
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

function removeBook(index) {
  library.removeBook(index);
  refreshDisplay();
}

function toggleReadStatus(index) {
  library.toggleStatus(index);
  refreshDisplay();
}

newBookBtn.addEventListener("click", () => dialog.showModal());
closeBtn.addEventListener("click", () => dialog.close());
form.addEventListener("submit", getUserInput);
bookList.addEventListener("click", (e) => {
  const index = e.target.parentElement.getAttribute("data-index");

  if (e.target.matches("[data-remove]")) {
    removeBook(index);
  }
  if (e.target.matches("[data-toggle]")) {
    toggleReadStatus(index);
  }
});
