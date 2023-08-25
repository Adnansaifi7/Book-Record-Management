const issuedBook = require("../dtos/book-dto");
const {BookModel} = require("../models/book-model.js");
const {UserModel} = require ("../models/user-model")

exports.getAllBooks = async( req, res) =>{
     const books = await BookModel.find();

     if(books.lenght === 0)
     return res.status(404).json({
        success :false,
        message : "No book found",
     });
     res.status(200).json({
        success: true,
        data: books,
     })
};

exports.getSingleBookById = async (req,res) =>{
   const {id} = req.params;

   const book =await BookModel.findById(id);

   if(!book)
   return res.status(404).json({
     success : false,
     message : "Book not found"
});

return res.status(200).json({
   success : true,
   data : book,
});
};

exports.getAllIssuedBooks = async (req,res) =>{
      
   const users = await UserModel.find({
     issuedbook : {$exists: true},
      }).populated("issuedBook");

      const issuedBooks = users.map((each) => new issuedBook(each));
   
       if(issuedBooks.length === 0)
       return res.status(404).json({
          success : false,
          message: "no books issued yet",
       });
   
       return res.status(200).json({
           success : true,
           data: issuedBooks,
       });
      };
   
exports.addNewBook = async (req,res) =>{
      const {data} = req.body;
  
      if(!data){
          return res.status(400).json({
              success : false,
              message: "No data provided",
          });
      }
  
      await BookModel.create(data);

      const allBooks = await BookModel.find();
        
      return res.status(201).json({
          success: true,
          data : allBooks,
      })
};

exports.updatedById = async  (req,res) =>{
   const {id} = req.params;
   const {data} = req.body;

   const updatedBook = await BookModel.findOneAndUpdate(
      {
        _id: id,
   },
   data,
   {
      new : true,
   }
   );

   return res.status(200).json({
       success : true,
       data : updatedBook,
   });
};
