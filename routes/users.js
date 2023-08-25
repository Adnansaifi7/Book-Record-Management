const express = require("express"); 
const{users} = require("../data/users.json");
const { getAllUsers, getSingleUserById, deleteUser, updateUserById, createNewUser, getSubscriptiondetailById } = require("../Controller/user-controller");

const router = express.Router();

/**
 * Route: / users
 * Method: / GET
 * Description : GEt all users
 * Access : Public
 * Parameters: None
 */
router.get("/", getAllUsers);

/**
 * Route: / users/:id
 * Method: / GET
 * Description : GEt single user by id
 * Access : Public
 * Parameters: id
 */
 router.get("/:id", getSingleUserById);
 /**
 * Route: / users
 * Method: / POST
 * Description : create new user
 * Access : Public
 * Parameters: none
 */
router.post("/", createNewUser);
 /**
 * Route: / users
 * Method: / PUT 
 * Description :updating user data
 * Access : Public
 * Parameters: none
 */
router.put("/", updateUserById);

 /**
 * Route: / users/:id
 * Method: / Delete
 * Description : Delete a user by id
 * Access : Public
 * Parameters:id
 */
 router.delete("/:id", deleteUser)
 
 /**
 * Route: / users/subscription-details/:id
 * Method: / Delete
 * Description : GEt all user subscription details
 * Access : Public
 * Parameters:id
 */
  router.get("/subscription-details/:id", getSubscriptiondetailById);


 module.exports = router;
