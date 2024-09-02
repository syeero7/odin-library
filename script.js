const bookList = document.querySelector("#bookList");

const myLibrary = [
  { title: "borrow", author: "jim board", pages: 53, status: true },
  { title: "zorro", author: "tom jest", pages: 22, status: false },
  { title: "ages", author: "ice cold", pages: 33, status: true },
];

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
    listItem.textContent = `${book.title} by ${book.author}, ${book.pages} pages ${book.status ? "Read" : "Not read yet"}`;
    bookList.appendChild(listItem);
  });
}
