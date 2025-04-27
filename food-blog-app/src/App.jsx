import React from 'react'
import './App.css'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Home from './pages/Home'
import MainNavigation from './components/MainNavigation'
import axios from 'axios'
import  AddFoodRecipe  from './pages/AddFoodRecipe'
import EditRecipe from './pages/EditRecipe'
import RecipeDetails from './pages/RecipeDetails'

const getAllRecipes = async () => {
  try {
    let allRecipes = [];
    const res = await axios.get('http://localhost:3000/recipe');
    allRecipes = res.data;
    return allRecipes;
  } catch (error) {
    console.error('Error fetching all recipes:', error);
    return []; // Return an empty array in case of an error
  }
};

const getMyRecipes = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user._id) {
      return []; // If there's no user or user ID is missing, return an empty array
    }

    const allRecipes = await getAllRecipes();
    return allRecipes.filter(item => item.createdBy === user._id);
  } catch (error) {
    console.error('Error fetching my recipes:', error);
    return []; // Return an empty array in case of an error
  }
};

const getFavRecipes = () => {
  const favRecipes = JSON.parse(localStorage.getItem("fav"));
  return favRecipes || []; // Return an empty array if no fav recipes found
};

const getRecipe = async ({ params }) => {
  try {
    let recipe;
    const recipeRes = await axios.get(`http://localhost:3000/recipe/${params.id}`);
    recipe = recipeRes.data;

    if (!recipe || !recipe._id) {
      throw new Error('Recipe not found or invalid');
    }

    const userRes = await axios.get(`http://localhost:3000/user/${recipe.createdBy}`);
    recipe = { ...recipe, email: userRes.data.email };

    return recipe;
  } catch (error) {
    console.error('Error fetching recipe:', error);
    return null; // Return null in case of an error or invalid recipe
  }
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainNavigation />,
    children: [
      { path: "/", element: <Home />, loader: getAllRecipes },
      { path: "/myRecipe", element: <Home />, loader: getMyRecipes },
      { path: "/favRecipe", element: <Home />, loader: getFavRecipes },
      { path: "/addRecipe", element: <AddFoodRecipe /> },
      { path: "/editRecipe/:id", element: <EditRecipe /> },
      { path: "/recipe/:id", element: <RecipeDetails />, loader: getRecipe }
    ]
  }
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}
