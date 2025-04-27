import React from 'react'
import profileImg from '../assets/profile.png'
import food from '../assets/foodRecipe.png' // Unused, you can remove this if not needed
import { useLoaderData } from 'react-router-dom'

export default function RecipeDetails() {
    const recipe = useLoaderData()

    if (!recipe) {
        return <div>Loading...</div>; // Loading state while data is being fetched
    }

    // Fallback for missing or broken cover image URL
    const coverImageUrl = recipe.coverImage 
        ? `http://localhost:3000/images/${recipe.coverImage}` 
        : food; // You can fallback to the food.png if coverImage is missing

    return (
        <>
            <div className="outer-container">
                <div className="profile">
                    <img src={profileImg} width="50px" height="50px" alt="Profile" />
                    <h5>{recipe.email}</h5>
                </div>
                <h3 className="title">{recipe.title}</h3>
                <img src={coverImageUrl} width="220px" height="200px" alt="Recipe Cover" />
                <div className="recipe-details">
                    <div className="ingredients">
                        <h4>Ingredients</h4>
                        <ul>
                            {recipe.ingredients && recipe.ingredients.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="instructions">
                        <h4>Instructions</h4>
                        <span>{recipe.instructions}</span>
                    </div>
                </div>
            </div>
        </>
    )
}
