
const User  = require('../models/user.model.js');

const Discussion = require('../models/discussion.model.js');

const {validateComment} = require("../validators/discussion.validator.js");

const fetchUserInCollection = async (req, res, next) => {

  const { author } = req.body;

  try {
    const user = await User.findOne({ username: author });
 
    if (!user) 
    {
      return res.status(404).json({ message: "User not found", author });
    }

      next();
  }
  
  catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
  
};

const fetchDiscussion = async (req, res, next)=>{
    
  const {id}= req.params;

  try{
     const discussion = await Discussion.findById(id);

     if(!discussion){
      return res.status(404).json({message:"Discussion not found", discussionId : id});
     }

     req.discussion = discussion; // Store the discussion object in the request object for the next middleware

      next();
     
  }
  catch(error){
     res.status(500).json({message:"Internal Server Error", error: error.message});
  }

};

const validateUserComment = (req, res, next)=>{

  const {error} = validateComment(req.body);

  if(error){
   return res.status(422).json({error: error.details[0].message});
  
  }

  next();

};

// First, we need to create a middleware to verify if the discussion document belongs to the author provided in the request body.

const verifyAuthor = async(req, res, next)=>{
  const {id} = req.params;
  const {author} = req.body;

  try{
      const discussion = await Discussion.findById(id);

      if(!discussion){
        return res.status(404).json({message: "Discussion not found"});
      }

      if(discussion.author !== author){
         return res.status(403).json({message: "Unauthorized Access"});
      }

      req.discussion = discussion; // Store the discussion object in the request object for the next middleware
  
      next();
      
    }

  catch(error){
       res.status(500).json({message: "Unable to verify author", error: error.message});
  }
}



module.exports = { fetchUserInCollection, verifyAuthor,fetchDiscussion, validateUserComment};
