const bookList = document.querySelector("#bookList");
const newBookBtn = document.querySelector("#new-book");
const dialog = document.querySelector("dialog");
const closeBtn = dialog.querySelector("#close-btn");
const form = dialog.querySelector("form");

const myLibrary = [
  { title: "borrow", author: "jim board", pages: 53, status: true },
  { title: "zorro", author: "tom jest", pages: 22, status: false },
  { title: "ages", author: "ice cold", pages: 33, status: true },
];

newBookBtn.addEventListener("click", () => dialog.showModal());
closeBtn.addEventListener("click", () => dialog.close());
form.addEventListener("submit", getUserInput);
bookList.addEventListener("click", (e) => {
  const listItem = e.target.parentElement;

  if (e.target.matches("[data-remove]")) {
    removeBook(listItem.getAttribute("data-index"));
  }
});

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

function addBookToLibrary(title, author, pages, status) {
  const newBook = new Book(title, author, pages, status);
  myLibrary.push(newBook);
}

function displayBooks() {
  myLibrary.forEach((book, index) => {
    const listItem = document.createElement("li");
    listItem.setAttribute("data-index", index);
    const removeBtn = document.createElement("button");
    removeBtn.setAttribute("data-remove", "");

    listItem.textContent = `${book.title} by ${book.author}, ${book.pages} pages ${book.status ? "Read" : "Not read yet"}`;
    removeBtn.textContent = "Remove";

    listItem.appendChild(removeBtn);
    bookList.appendChild(listItem);
  });
}

function getUserInput(e) {
  e.preventDefault();

  const title = form.querySelector("#title").value;
  const author = form.querySelector("#author").value;
  const pages = form.querySelector("#pages").value;
  const status = form.querySelector("#read-status").checked ? true : false;

  addBookToLibrary(title, author, pages, status);
  form.reset();
  refreshBookList();
}

function removeBook(index) {
  myLibrary.splice(index, 1);

  refreshBookList();
}

function clearBookList() {
  while (bookList.firstChild) {
    bookList.firstChild.remove();
  }
}

function refreshBookList() {
  clearBookList();
  displayBooks();
}
