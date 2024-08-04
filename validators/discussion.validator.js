const Joi = require('joi');

const discussionValidationSchema = Joi.object({
  title: Joi.string().max(150).required(),
  author: Joi.string().required(),
  content: Joi.string().default('')
});

const validateDiscussion = (data) => {
  return discussionValidationSchema.validate(data);
};

const commentValidationSchema = Joi.object({
   
   author:Joi.string().required(),
   content:Joi.string().max(500).required()

});

const validateComment = (commentData)=>{
  return commentValidationSchema.validate(commentData);
}

module.exports = { validateDiscussion, validateComment };
