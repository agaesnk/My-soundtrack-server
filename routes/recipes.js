const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');

const checkCU = (req, res, next) => {
  if (req.session.currentUser){
    next();
  } else {
    res.status(401).json({code: 'unauthorized'});
  }
}

router.post('/add', checkCU,  (req, res, next) => {
  const {
    title, 
    description, 
    category, 
    level, 
    ingredients, 
    elaboration, 
  } = req.body;

  const owner = req.session.currentUser._id;

  const newRecipe = new Recipe({
    title,
    description,
    category,
    level,
    ingredients: ingredients.split(','),
    elaboration,
    owner
  });

  newRecipe.save()
    .then(() => {
      res.status(200).json(newRecipe);
    })
    .catch(next);
});  

router.get('/categories', checkCU,  (req, res, next) => {
  const categories=Recipe.schema.path("category").enumValues;
  return res.status(200).json(categories);
})


router.get('/owner', checkCU, (req, res, next) => {
  const owner = req.session.currentUser;
  Recipe.find({owner: owner._id})
    .then((recipes) => {
      console.log(recipes)
      res.status(200).json(recipes)
    })
    .catch((error) => {
      next(error);
    })
})

router.get('/:id', checkCU,(req, res, next) => {
  const recipeId = req.params.id;
  
  Recipe.findById(recipeId)
  .then((recipeId) => {
    res.status(200).json(recipeId)
  })
  .catch((error) => {
    next(error);
  })
})

router.get('/', checkCU, (req, res, next) => {
  Recipe.find()
    .then((recipes) => {
      res.status(200).json(recipes)
    })
    .catch((error) => {
      next(error);
    })
})

router.get('/categories/:category', (req, res, next) => {
  const category = req.params.category;
  Recipe.find({category: category})
    .then((recipes) => {
      res.status(200).json(recipes)
    })
    .catch((error) => {
      next(error);
    })
})


router.put('/:id', checkCU, (req, res, next) => {
  const recipeId = req.params.id;
  const {
    title, 
    description, 
    category, 
    level, 
    ingredients, 
    elaboration, 
  } = req.body;

  Recipe.findByIdAndUpdate({_id: recipeId}, req.body)
    .then((recipeId) => {
      res.status(200).json(recipeId)
    })
    .catch((error) => {
      next(error);
    })
})

router.delete('/:id', checkCU, (req, res, next) => {
  const recipeId = req.params.id;
  Recipe.deleteOne({_id: recipeId})
    .then((recipeId) => {
      console.log(recipeId)
      res.status(200).json(recipeId)
    })
    .catch((error) => {
      next(error);
    })
})



// router.delete('/:id', (req, res, next)=>{
//   const {id} = req.params;    
 
//   Recipe.deleteOne({_id: id})
//     .then(() => {
//       // console.log('borrado')
//       res.status(200).json(Recipe);
//     })
//     .catch(error =>{
//       next(error);
//     })
// });

module.exports = router;