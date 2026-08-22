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

function showOrHideError(
  selectedInput,
  selectedError,
  selectedErrorFunction,
  textContent,
) {
  if (selectedInput.validity.valid) {
    selectedError.textContent = ''
    selectedError.className = 'error'
  } else {
    selectedErrorFunction(selectedInput, selectedError, textContent)
  }
}

function showMissingError(selectedInput, selectedError, errorMessage) {
  if (selectedInput.validity.valueMissing) {
    selectedError.textContent = errorMessage
  }
  selectedError.className = 'error active'
}
const openFormButton = document.querySelector('#openForm')
openFormButton.onclick = () => document.querySelector('#modal').showModal()

const form = document.querySelector('#bookForm')

const formTitle = document.querySelector('#title')
const formTitleError = document.querySelector('#title + span.error')

const formAuthor = document.querySelector('#author')
const formAuthorError = document.querySelector('#author + span.error')

const formPages = document.querySelector('#pages')
const formPagesError = document.querySelector('#pages + span.error')

const readStatusRadio = document.querySelectorAll('input[name="readStatus"]')
const readStatusError = document.querySelector('#readRadio')

formTitle.addEventListener('input', (event) => {
  showOrHideError(
    formTitle,
    formTitleError,
    showMissingError,
    'Please enter a title',
  )
})

formAuthor.addEventListener('input', (event) => {
  showOrHideError(
    formAuthor,
    formAuthorError,
    showMissingError,
    'Please enter an author',
  )
})

formPages.addEventListener('input', (event) => {
  showOrHideError(
    formPages,
    formPagesError,
    showMissingError,
    'Please add amount of pages',
  )
})

readStatusRadio.forEach((radio) => {
  radio.addEventListener('change', (event) => {
    isRadioSelected(
      readStatusRadio,
      readStatusError,
      'Please select read status',
    )
  })
})

function isRadioSelected(radioName, selectedError, errorMessage) {
  const radios = radioName
  const selected = [...radios].some((radio) => radio.checked)
  if (selected) {
    selectedError.textContent = ''
    selectedError.className = 'error'
    return true
  } else {
    selectedError.textContent = errorMessage
    selectedError.className = 'error active'
    return false
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault()

  if (!formTitle.validity.valid) {
    showMissingError(formTitle, formTitleError, 'Please enter a title')
    return
  }

  if (!formAuthor.validity.valid) {
    showMissingError(formAuthor, formAuthorError, 'Please enter an author')
    return
  }

  if (!formPages.validity.valid) {
    showMissingError(formPages, formPagesError, 'Please add amount of pages')
    return
  }

  if (
    isRadioSelected(
      readStatusRadio,
      readStatusError,
      'Please select read status',
    ) === false
  ) {
    return
  }

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

const closeFormButton = document.querySelector('#closeForm')

closeFormButton.onclick = () => {
  form.reset()
  document.querySelector('#modal').close()
}
