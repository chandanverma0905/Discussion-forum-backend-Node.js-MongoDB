
const Discussion = require('../models/discussion.model.js');

const { validateDiscussion} = require('../validators/discussion.validator.js');

const createDiscussion = async (req, res) => {

  const { error } = validateDiscussion(req.body);

  if (error) {
    return res.status(422).json({ message: 'Invalid request', error: error.details[0].message });
  }

  const { title, author, content } = req.body;

  try { 
    const newDiscussion = new Discussion({ title, author, content });
    await newDiscussion.save();
    res.status(200).json(newDiscussion);
  }
  
  catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};


const getAllDiscussions = async (req, res)=>{
 
  try{
     const discussions = await Discussion.find();

     if(discussions.length == 0){
      return res.status(404).json({message: "No Discussion Found"});
     }
     return res.status(200).json(discussions);
  }
  catch(err){
     res.status(500).json({message: "Internal Server Error", error: error.message});
  }

}

const getDiscussionsByUser = async (req, res) => {
  const { username } = req.params;

  try {
    const discussions = await Discussion.find({ author: username });
    if (discussions.length === 0) {
      return res.status(404).json({ message: "No discussions found for this user", username });
    }
    res.status(200).json(discussions);
  } 
  
  catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};


const getDiscussionById = async(req, res)=>{

   const {id} = req.params;

   try{
      const discussion = await Discussion.findById(id);

      if(!discussion){
        return res.status(404).json({           
          message:"No discussions found with this id",
          discussionId: id
        });
      }

      res.status(200).json(discussion);
   }

   catch(error){
      res.status(500).json({
        message:"Internal Server Error",
        error: error.message
      })
   }

}

// Next, create a controller to handle the deletion of the discussion document.

const deleteDiscussion = async(req, res)=>{
 
  const {id} = req.params;

  try{
     const deletedDiscussion = await Discussion.findByIdAndDelete(id);

     if(!deletedDiscussion){
         return res.status(404).json({message : "Discussion not found"});
     }

     res.status(200).json(deletedDiscussion);
  }

  catch(error){
     res.status(500).json({message: "Internal Server Error", error: error.message})
  }

};


const updateDiscussion = async(req, res)=>{
    
   const {id} = req.params;
   const {author, ...updates} = req.body;

   try{
      //Find the discussion and update it
      const discussionToBeUpdated = await Discussion.findByIdAndUpdate(
          id,
          {...updates, updatedAt: Date.now()}, // Ensure updatedAt is updated
          {new: true} // Return the updated document
      );

      if(!discussionToBeUpdated){
        return res.status(404).json({message: "Discussion not found"});
      }

      
      res.status(200).json(discussionToBeUpdated);
   }

   catch(error){
     res.status(500).json({message: "Internal Server Error", error: error.message});
   }

};


const addComment = async(req, res)=>{
  const {id} = req.params;
  const {author, content} = req.body;

  console.log('Received request to add comment:', { id, author, content });

  try{
    const startTime = Date.now();

    const updatedDiscussion = await Discussion.findByIdAndUpdate(
      id,
      {$push: {comments: {author, content}} },
      {new: true}
    );

    const endTime = Date.now();
    console.log('Database update duration:', endTime - startTime, 'ms');
    
    if (!updatedDiscussion) {
      return res.status(404).json({ message: 'Discussion not found' });
  }
    res.status(200).json(updatedDiscussion);
  }

  catch(error){

    console.error("Error:", error);
    res.status(500).json({message:"Internal Server Error", error: error.message});
  }
};

module.exports = { createDiscussion, getAllDiscussions, getDiscussionsByUser, getDiscussionById, deleteDiscussion, updateDiscussion, addComment};
