const express = require("express");
const {books} = require("../data/books.json");
const {users} = require("../data/users.json");
const
 { getAllBooks, getSingleBookById, getAllIssuedBooks, addNewBook, updatedById } 
 = require("../Controller/book-controller");

// const BookModel = require('../models/book-model');
// const UserModel = require('../models/user-model');
//const {UserModel, Bookmodel} = require ("../models/index")

const router = express.Router();

/**
 * Route: / books
 * Method: / GET
 * Description : GEt all books
 * Access : Public
 * Parameters: None
 */
router.get("/", getAllBooks)
/**
 * Route: / books/:id
 * Method: / GET
 * Description : GEt books by id
 * Access : Public
 * Parameters: None
 */
 router.get("/:id",getSingleBookById)

 /**
 * Route: / books/issued/books
 * Method: / GET
 * Description : GEt all issued books
 * Access : Public
 * Parameters: None
 */

router.get("/issued/by-user", getAllIssuedBooks); 

/**
 * Route: / books/issued/by-user
 * Method: / POST
 * Description : Create new book
 * Access : Public
 * Parameters: None
 * Data; author, name, genre, price, publisher,id
 */

router.post("/", addNewBook);

/**
 * Route: / books/:id
 * Method: / PUT
 * Description : Update book
 * Access : Public
 * Parameters: None
 * Data; author, name, genre, price, publisher,id
 */

router.put("/:id", updatedById)


// default export
module.exports = router;