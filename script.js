let library = [];
const newBook = document.querySelector('#new-book');
newBook.addEventListener('click', showBookForm);
const submit = document.querySelector('#submit');
submit.addEventListener('click', createNewBook);
const close = document.querySelector('#close');
close.addEventListener('click', closeForm);
let readButtons, deleteButtons;

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function toggleRead() {
  const i = this.getAttribute('data-index');
  library[i].read = library[i].read ? false : true;
  displayBooks();
}

for (let i = 0; i < 3; i++) {
  const book = new Book('nyuaa', 'nyaa', 678, 'Yes');
  library.push(book);
}

checkStorage();
displayBooks();

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  library.push(book);
}

function displayBooks() {
  refreshDisplay();
  const display = document.querySelector('.display');

  library.forEach((e, i) => {
    const div = document.createElement('div');
    div.setAttribute('class', 'book-card');
    div.textContent = `${e.title} by ${e.author}, ${e.pages} pages, read? ${e.read ? 'Yes' : 'No'}`;
    const delButton = document.createElement('button');
    delButton.setAttribute('class', 'delete-book');
    delButton.setAttribute('data-index', i);
    delButton.textContent = 'delete';
    const readButton = document.createElement('button');
    readButton.setAttribute('class', 'read-button');
    readButton.setAttribute('data-index', i);
    readButton.textContent = 'toggle read';
    const buttons = document.createElement('div');
    display.appendChild(div);
    div.appendChild(buttons);
    buttons.appendChild(readButton);
    buttons.appendChild(delButton);
  });
  refReadButtons();
  refDelButtons() ;
}

function refReadButtons() {
  readButtons = document.querySelectorAll('.read-button');
  readButtons.forEach(e => {
    e.addEventListener('click', toggleRead);
  });
}

function refDelButtons() {
  deleteButtons = document.querySelectorAll('.delete-book');
  deleteButtons.forEach(e => {
    e.addEventListener('click', deleteBook);
  });
}

function deleteBook() {
  const index = this.getAttribute('data-index');
  library.splice(index, 1);
  displayBooks();
}

function showBookForm() {
  const form = document.querySelector('.form');
  form.classList.toggle('hideform');
}

function createNewBook() {
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  let pages = document.querySelector('#pages').value;
  let read = document.querySelector('#read').value;
  pages = checkPages(pages);
  read = checkRead(read);
  addBookToLibrary(title, author, pages, read);
  displayBooks();
  resetForm();
  storeLibrary();
}

function checkPages(pages) {
  if (!isNaN(Number(pages))) return pages;
  while(isNaN(Number(pages))) {
    pages = prompt('Please enter a valid number for pages:');
  }
  return pages;
}

function checkRead(read) {
  return (read.toLowerCase().includes('yes') || read.toLowerCase().includes('true'));
}

function refreshDisplay() {
  const display = document.querySelector('.display');
  while (display.firstChild) {
      display.removeChild(display.firstChild);
  }
}

function resetForm() {
  document.querySelector('form').reset();
}

function closeForm() {
  const form = document.querySelector('.form');
  form.classList.toggle('hideform');
}

function storeLibrary() {
  localStorage.setItem('libraryArr', JSON.stringify(library));
}

function checkStorage() {
  if(localStorage.getItem('libraryArr')) {
    let libraryJSON = localStorage.getItem('libraryArr');
    library = JSON.parse(JSON.parse(JSON.stringify(libraryJSON)));
    displayBooks();
  }
}