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
    enum: ['desserts','smoothies','creams','salads','rice','pasta','fish','meat'] 
  },
  time: {
    type: String, 
    required: true,
  },
  level: {
    type: String, 
    required: true,
    enum: ['easy peasy','maybe you can','just for a boss']
  },
  ingredients: {
    type: String,
    required: true,
  },
  description: { 
    type: String, 
    required: true 
  },  
  imgUrl: { 
    type: String, 
    default: '/images/dog-default.jpg' 
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

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;