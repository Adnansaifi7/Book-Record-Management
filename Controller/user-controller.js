const {UserModel} = require("../models/user-model");
const {BookModel} = require("../models/book-model");
const userModel = require("../models/user-model");
 

exports.getAllUsers = async (req,res) => {

    const users = await UserModel.find();

    if(users.length === 0){
        return res.status(404).json({
            success : true,
            message: "No users found",
        });
    }

    res.status(200).json({
        success : true,
        data: users,
    });
}

exports.getSingleUserById =  async(req,res) => {
    const {id} = req.params;

    const user = await UserModel.findById(id);
    if(!user){
        return res.status(404).json({
            success: false,
            message : "user not found"
        });
    }
    return res.status(200).json({
        success : true,
        message : user,
    });
 };

exports.createNewUser = async (req,res) => {
    const{ name, surname, email, subscriptionType, subscriptiondate} = req.body;
     
    const newUser = await UserModel.create({
        name,
        surname,
        email,
        subscriptionDate,
        subscriptionType,
    });


    return res.status(201).json({
        success: true,
        data : newUser,
    });
};

exports.updateUserById = async (req,res) => {
    const {id} = req.params;
    const {data} = req.body;

    const updateduserData = await UserModel.findOneAndUpdate({
        _id : id,
    },
    {
        $set: {
            ...data,
        },
    },
    {
        new: true,
    });
       
    
    return res.status(200).json({
        success: true,
        data: updateduserData,
    })
};

 exports.deleteUser = async (req,res) => {
    const {id} = req.params;
    const user = await UserModel.deleteOne({ _id : id,});
 
    if(!user){
     return res.status(404).json({
         success : false,
         message : "User to be deleted not found",
     });
    }
    
 
    return res.status(202).json({
     success : true,
     message : "Deleted the user successfully"
    });
  }

  exports.getSubscriptiondetailById = async  (req,res)=>{
    const {id} = req.params;

    const user = await UserModel.findById(id);

    if(!user)
    return res.status(404).json({
    success : false,
    message : "User not found",
    });

    const getDateInDays = (data = "") =>{
      let date;
      if (data === ""){
        //current date
        date = new Date();
      } else {
        // getting data on basis of data variable
        date  = new Date(data);
      }
      let days = Math.floor(date / (1000 * 60 * 60 * 24));
      return days;
    };

    const subscriptionType = (date) => {
       if(user.subscriptionType === "Basic"){
         date = date + 90;
       } else if(user.subscriptionType === "Standard"){
        date = date + 180;
       } else if(user.subscriptionType === "Premium"){
        date = date + 365;
       }
       return date;
    };

    // Subscription expiration calcuation
    // January 1, 1970, UTC. // milliseconds
        let returnDate = getDateInDays(user.returnDate);
        let currentDate = getDateInDays();
        let subscriptionDate = getDateInDays(user.subscriptionDate);
        let subscriptionExpiration = subscriptionType(subscriptionDate);

        const data = {
          ...user._doc,
          subscriptionExpired : subscriptionExpiration < currentDate,
          daysLeftforExpiration:
          subscriptionExpiration <= currentDate
          ? 0
          : subscriptionExpiration - currentDate,
          fine:
            returnDate < currentDate
           ? subscriptionExpiration <= currentDate
           ? 200
           : 100
           :0,
        };

        res.status(200).json({
            success : true,
            data,
        })
  };