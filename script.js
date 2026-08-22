const myLibrary = []

class Book {
  constructor(title, author, pages, read) {
    this.id = crypto.randomUUID()
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
  }

  info() {
    console.log(
      `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`,
    )
  }

  addBookToLibrary(library) {
    library.push(this)
  }

  changeReadStatus() {
    this.read = !this.read
  }
}

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false)
const otherBook = new Book('Other Book', 'Thor', 134, true)

theHobbit.addBookToLibrary(myLibrary)
otherBook.addBookToLibrary(myLibrary)

function deleteBook(findId) {
  const toDelete = myLibrary.findIndex(({ id }) => id === findId)
  if (toDelete !== -1) {
    myLibrary.splice(toDelete, 1)
    renderTable()
  }
}

let table = document.querySelector('#allBooks')

function renderTable() {
  table.innerHTML = ''
  myLibrary.forEach((book) => {
    let tr = table.insertRow()
    tr.insertCell(0).textContent = book.title
    tr.insertCell(1).textContent = book.author
    tr.insertCell(2).textContent = book.pages
    tr.insertCell(3).textContent = book.read === true ? 'read' : 'not read yet'

    const changeReadCell = tr.insertCell(4)

    const changeReadButton = document.createElement('button')
    changeReadButton.className = 'change-read-button'
    changeReadButton.textContent = 'Change read status'
    changeReadButton.type = 'button'

    changeReadButton.onclick = () => {
      book.changeReadStatus()
      renderTable()
    }

    changeReadCell.append(changeReadButton)

    const deleteCell = tr.insertCell(5)

    const deleteButton = document.createElement('button')
    deleteButton.className = 'delete-button'
    deleteButton.textContent = 'Remove'
    deleteButton.type = 'button'

    deleteButton.onclick = () => deleteBook(book.id)

    deleteCell.append(deleteButton)
  })
}

renderTable()

const openFormButton = document.querySelector('#openForm')
openFormButton.onclick = () => document.querySelector('#modal').showModal()

const form = document.querySelector('#bookForm')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const elements = form
  const bookToAdd = new Book(
    elements.title.value,
    elements.author.value,
    elements.pages.value,
    elements.readStatus.value === 'true' ? true : false,
  )
  bookToAdd.addBookToLibrary(myLibrary)
  renderTable()
  document.querySelector('#modal').close()
  form.reset()
})
