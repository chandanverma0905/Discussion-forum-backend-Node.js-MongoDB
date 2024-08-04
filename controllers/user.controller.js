const User = require("../models/user.model.js");
const {validateUser} = require("../validators/user.validator.js");


const registerUser = async (req, res)=>{

    const { error } = validateUser(req.body);

    if (error)
    { 
    return res.status(400).json({ message: 'Invalid request', error: error.details[0].message });
    }
  
    const { fullName, username, email } = req.body; // extracting userdata from request
  
    try 
    {
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        return res.status(409).json({ message: 'Failed to create new user', reason: 'This User Already Exists in DB' });
      }
  
      const newUser = new User({ fullName, username, email }); // new User: A new user instance is created using the extracted data.

      await newUser.save(); 
      res.status(200).json(newUser);
    }
    
    catch (err) 
    {
      res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};


const getAllUsers = async(req, res)=>{
   try{
       const users = await User.find();
       if(users.length === 0)
       {
          return res.status(404).json({message: "No Users found"});
       }

       res.status(200).json(users);
   }
  

   catch(err){
      res.status(500).json({message:"Internal Server Error", error: err.message});
   }
};


const getUserByUserName =  async(req, res)=>{
   
  const {username} = req.params;
   
  try{
     const user = await User.findOne({username});

     if(!user){
      return res.status(404).json({message: "User not found !", username});
     }
     res.status(200).json(user);
  }
  catch(err){
        res.status(500).json({message:"Internal Server Error", error: err.message});
  }

};


module.exports = {registerUser, getAllUsers, getUserByUserName};