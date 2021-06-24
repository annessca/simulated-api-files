const formButton = document.getElementById('form-toggle');
const booksDiv = document.getElementById('books-div');
const addNew = document.getElementById('submit');
const editBook = document.getElementById('update-submit');

const createCard = (trackId, bookTitle, bookAuthor, bookPrice, bookQuantity, bookSummary) => {
    // Create elements and assign Bootstrap classes and Parameter values as attributes to them.
    let rootdiv = document.createElement('div');

    rootdiv.setAttribute('class', 'card bg-light text-center');
    rootdiv.setAttribute('id', trackId);

    let headerdiv = document.createElement('div');
    let bodydiv = document.createElement('div');
    let footerdiv = document.createElement('div');

    headerdiv.setAttribute('class', 'card-header')
    bodydiv.setAttribute('class', 'card-body')
    footerdiv.setAttribute('class', 'card-footer')

    let book = document.createElement('h3');
    let author = document.createElement('h5');
    let quantity = document.createElement('h6');
    let summary = document.createElement('p');

    author.setAttribute('class', 'card-title')
    quantity.setAttribute('class', 'card-subtitle mb-2 text-muted')
    summary.setAttribute('class', 'card-text');

    let update = document.createElement('button');
    let remove = document.createElement('button');
    let price = document.createElement('h6');

    update.setAttribute('class', 'btn-primary');
    update.setAttribute('data-target', '#updatebook');
    update.setAttribute('data-toggle', 'modal');
    update.setAttribute('data-editkey', trackId);

    remove.setAttribute('class', 'btn-danger');
    remove.setAttribute('data-deletekey', trackId);

    // Append textContent to elements.
    book.textContent = bookTitle;
    author.textContent = bookAuthor;
    quantity.textContent = bookQuantity + ' Copies';
    summary.textContent = bookSummary;
    update.textContent = 'Edit Book';
    remove.textContent = 'Remove Book';
    price.textContent = '$' + bookPrice;

    // Append elements to elements.
    headerdiv.appendChild(book);

    bodydiv.appendChild(author);
    bodydiv.appendChild(quantity);
    bodydiv.appendChild(summary);
    bodydiv.appendChild(update);
    bodydiv.appendChild(remove);

    footerdiv.appendChild(price);

    rootdiv.appendChild(headerdiv);
    rootdiv.appendChild(bodydiv);
    rootdiv.appendChild(footerdiv);

    booksDiv.appendChild(rootdiv);
}

const formToggle = () => {
    const form = document.getElementById('form-div');
    if (form.style.display === "none") {
        form.style.display = "block";
    } else {
        form.style.display = "none";
    }
}
formButton.addEventListener("click", formToggle);

const addBook = () => {
    let tracknum = document.getElementById('book-id').value;
    let bookttl = document.getElementById('book-title').value;
    let bookauth = document.getElementById('book-author').value;
    let bookprz = document.getElementById('book-price').value;
    let bookqty = document.getElementById('book-quantity').value;
    let booksmry = document.getElementById('book-summary').value;
    createCard(tracknum, bookttl, bookauth, bookprz, bookqty, booksmry);
    const bookStore = {
        id: tracknum,
        title: bookttl,
        author: bookauth,
        price: bookprz,
        quantity: bookqty,
        summary: booksmry
    }
    window.localStorage.setItem(tracknum, JSON.stringify(bookStore));    
}
addNew.addEventListener('click', addBook);

const displayAll = () => {
    let fakeDb = localStorage
    let accessKeys = Object.keys(fakeDb);
    accessKeys.forEach((booksItem) => {
        let entry = JSON.parse(localStorage.getItem(booksItem))
        createCard(entry.id, entry.title, entry.author, entry.price, entry.quantity, entry.summary)
    })
}
window.addEventListener('load', displayAll)

const removeItem = (event) => {
    if(event.target.hasAttribute('data-deletekey')) {
        let targetKey = event.target.dataset.deletekey;
        localStorage.removeItem(targetKey);
        location.reload();
    }
}
window.addEventListener('click', removeItem);

const refillForm = (event) => {
    if(event.target.hasAttribute('data-editkey')){
        let targetKey = event.target.dataset.editkey;
        let selected = JSON.parse(localStorage.getItem(targetKey));
        const selected_id = selected.id,
            selected_title = selected.title,
            selected_author = selected.author,
            selected_price = selected.price,
            selected_quantity = selected.quantity,
            selected_summary= selected.summary;

        // Transfer data to modal form
        document.getElementById('update-book-id').value = selected_id;
        document.getElementById('update-book-title').value = selected_title;
        document.getElementById('update-book-author').value = selected_author;
        document.getElementById('update-book-price').value = selected_price;
        document.getElementById('update-book-quantity').value = selected_quantity;
        document.getElementById('update-book-summary').value = selected_summary;
    }
}
window.addEventListener('click', refillForm);

const updateBook = () => {
    let tracknum = document.getElementById('update-book-id').value;
    let bookttl = document.getElementById('update-book-title').value;
    let bookauth = document.getElementById('update-book-author').value;
    let bookprz = document.getElementById('update-book-price').value;
    let bookqty = document.getElementById('update-book-quantity').value;
    let booksmry = document.getElementById('update-book-summary').value;
    const updateBook = {
        id: tracknum,
        title: bookttl,
        author: bookauth,
        price: bookprz,
        quantity: bookqty,
        summary: booksmry
    }
    window.localStorage.setItem(tracknum, JSON.stringify(updateBook));
    location.reload();
}
editBook.addEventListener('click', updateBook);
