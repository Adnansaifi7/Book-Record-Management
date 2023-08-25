 const mongoose = require("mongoose");

 const Schema = mongoose.Schema;

 const bookSchema = new Schema({
    name:{
        type: String,
        require: true,
    },
    author:{
        type: String,
        require : true,
    },
    genre:{
        type: String,
        require:true,
    },
    price:{
        type: String,
        require: true,
    },
    publisher: {
        type: String,
        require: true,
    },
 },
    {
        timestamps: true,
    }
 );

 // collection will have a name "books"
 module.exports = mongoose.model("Book", bookSchema);
 // book -> name of the model , bookSchema -> name of the Schema or Schema

