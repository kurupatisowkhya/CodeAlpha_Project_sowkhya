// Sample book data
// Sample book data
let books = [
  { 
    id: 1, 
    title: "Book 1", 
    author: "Author 1", 
    category: "Fiction", 
    borrowed: false, 
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.",
    borrowingHistory: [] // Initialize borrowing history as an empty array
  },
  { 
    id: 2, 
    title: "Book 2", 
    author: "Author 2", 
    category: "Non-fiction", 
    borrowed: false, 
    description: "Suspendisse potenti. Sed et felis ut magna dictum consequat.",
    borrowingHistory: [] // Initialize borrowing history as an empty array
  },
  // Add more books here
  { 
    id: 3, 
    title: "Book 3", 
    author: "Author 3", 
    category: "Non-fiction", 
    borrowed: false, 
    description: "A fantasy book description goes here.",
    borrowingHistory: [] // Initialize borrowing history as an empty array
  },
  { 
    id: 4, 
    title: "Book 4", 
    author: "Author 4", 
    category: "Fiction", 
    borrowed: false, 
    description: "A science fiction book description goes here.",
    borrowingHistory: [] // Initialize borrowing history as an empty array
  }
];

// Function to borrow a book
// (Code for borrowBook function remains the same)

// Function to open book details page
// (Code for openBookDetailsPage function remains the same)

// Function to display books
// (Code for displayBooks function remains the same)

// Function to filter books by category
// (Code for filterByCategory function remains the same)

// Initial display of all books
displayBooks(books);


// Function to borrow a book
function borrowBook(bookId, borrowerName) {
  const book = books.find(book => book.id === bookId);
  if (book) {
    book.borrowed = true;
    const borrowDate = new Date().toLocaleDateString();
    book.borrowingHistory.push({ borrower: borrowerName, borrowDate: borrowDate });
    return true; // Book successfully borrowed
  }
  return false; // Book not found
}

// Function to open book details page
function openBookDetailsPage(bookId) {
  // Check if the book ID is valid
  const book = books.find(book => book.id === bookId);
  if (!book) {
    alert("Book not found!");
    return;
  }
  // Redirect to the corresponding book details page
  window.location.href = `book${bookId}.html`;
}

// Function to display books
function displayBooks(booksToShow) {
  const bookList = document.getElementById("bookList");
  bookList.innerHTML = "";
  booksToShow.forEach(book => {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");
    bookDiv.innerHTML = `<h3>${book.title}</h3>
                         <p>Author: ${book.author}</p>
                         <p>Category: ${book.category}</p>
                         <p>Description: ${book.description}</p>
                         ${book.borrowed ? `<p class="borrowed">Currently Borrowed</p>` : `<button onclick="borrowBook(${book.id}, 'John Doe')">Browse</button>`}`;
    // Open book details page on click
    bookDiv.addEventListener("click", () => {
      openBookDetailsPage(book.id);
    });
    bookList.appendChild(bookDiv);
  });
}

// Function to filter books by category
function filterByCategory() {
  const categoryFilter = document.getElementById("categoryFilter").value;
  const filteredBooks = categoryFilter ? books.filter(book => book.category === categoryFilter) : books;
  displayBooks(filteredBooks);
}
app.use(express.static('public'));

// Initial display of all books
displayBooks(books);
