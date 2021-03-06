import axios from "axios";
import keys from "../config/keys";

const googleKey = keys.googleBooksKey.id;
let query = "https://www.googleapis.com/books/v1/volumes?q=";


export default {
  // Gets all books
  getBooks: function (search) {
    console.log(googleKey)

    let qSearch = query + search;
    console.log(qSearch)
    qSearch += "&key=AIzaSyBLHDVqA4r2Ldz6sYVbnEoLwYyqOfVARq4"
    console.log(qSearch)
    return axios.get(qSearch);
  },
  // Gets the book with the given id
  getBook: function (id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function (id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function (bookData) {
    return axios.post("/api/books", bookData);
  }
};
