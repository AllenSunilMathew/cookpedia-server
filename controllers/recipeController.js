const recipes = require("../models/recipeModel");

// get all recipes
exports.getallRecipesController = async(req,res)=>{
 console.log( "inside getallRecipesController");
  try {
    const allrecipies = await recipes.find()
    res.status(200).json(allrecipies)
  } catch (error) {
    res.status(500).json(error)
  }
}

// get a single recipe

exports.viewRecipeController = async(req,res)=>{
 console.log( "inside viewRecipeController");
 const {id }= req.params
  try {
    const viewDetails = await recipes.findById({_id:id})
    res.status(200).json(viewDetails)
  } catch (error) {
    res.status(500).json(error)
  }
}

// related productes in view

exports.relatedRecipesController = async(req,res)=>{
 console.log( "inside relatedRecipesController");
 const cuisine = req.query.cuisine
  try {
    const viewAllRecipieDetails = await recipes.find({cuisine})
    res.status(200).json(viewAllRecipieDetails)
  } catch (error) {
    res.status(500).json(error)
  }
}

//add recipe
exports.addRecipeController=async(req,res)=>{
  console.log(" inside addRecipeController")
    const{name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,image,mealType,cuisine,caloriesPerServing} = req.body
    try {
      const existingRecipeDetails=await recipes.findOne({name})
      if (existingRecipeDetails) {
      res.status(409).json("Recipe Already avialable in ur collectoin add another")
      } else {
          const newRecipe= new recipes({
          name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,image,mealType,cuisine,caloriesPerServing
        })
        await newRecipe.save()
        res.status(200).json(newRecipe)
      }
    } catch (error) {
      res.status(500).json(error)
    }
}



 //remove recipe
  exports.removeRecipeController=async(req,res)=>{
    console.log("inside removeRecipeController");
    const{id}=req.params
    try {
      const removeItemDetails=await recipes.findByIdAndDelete({_id:id})
                  res.status(200).json(removeItemDetails)

    } catch (error) {
            res.status(500).json(error)

    }
    
  }


