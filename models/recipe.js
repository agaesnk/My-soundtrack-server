const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId; 

const recipeSchema = new Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  category:{ 
    type: String, 
    required: true,
    enum: ['desserts','juices and smoothies','creams','salads','rice','pasta'] 
  },
  level: {
    type: String, 
    required: true,
    enum: ['easy peasy','maybe you can','just for a boss']
  },
  ingredients: {
    type: [String],
    required: true,
  },
  elaboration: { 
    type: String, 
    required: true  
  },
  photo: {
    type:String,
    required: true
  },
  owner: { 
    type: ObjectId,
    ref:'User' 
  }
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;