
import React, { useEffect, useState } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import foodImg from '../assets/foodRecipe.png';
import { BsStopwatchFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import DeleteConfirmationModal from './DeleteConfirmationModal'; // Import your modal

export default function RecipeItems() {
    const recipes = useLoaderData();
    const [allRecipes, setAllRecipes] = useState();
    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const [recipeToDelete, setRecipeToDelete] = useState(null); // Store the recipe to delete
    let path = window.location.pathname === "/myRecipe" ? true : false;
    let favItems = JSON.parse(localStorage.getItem("fav")) ?? [];
    const [isFavRecipe, setIsFavRecipe] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setAllRecipes(recipes);
    }, [recipes]);

    // Show the modal to confirm deletion
    const handleDeleteClick = (id) => {
        setRecipeToDelete(id); // Store the id of the recipe to delete
        setShowModal(true); // Show the modal
    };

    // Confirm deletion and delete recipe
    const handleConfirmDelete = async () => {
        if (recipeToDelete) {
            await axios.delete(`http://localhost:3000/recipe/${recipeToDelete}`)
                .then((res) => console.log(res));
            setAllRecipes(recipes => recipes.filter(recipe => recipe._id !== recipeToDelete));
            let filterItem = favItems.filter(recipe => recipe._id !== recipeToDelete);
            localStorage.setItem("fav", JSON.stringify(filterItem));
            setShowModal(false); // Close the modal
        }
    };

    // Close the modal without deleting
    const handleCloseModal = () => {
        setShowModal(false); // Close the modal
    };

    const favRecipe = (item) => {
        let filterItem = favItems.filter(recipe => recipe._id !== item._id);
        favItems = favItems.filter(recipe => recipe._id === item._id).length === 0 ? [...favItems, item] : filterItem;
        localStorage.setItem("fav", JSON.stringify(favItems));
        setIsFavRecipe(pre => !pre);
    };

    return (
        <>
            <div className='card-container'>
                {
                    allRecipes?.map((item, index) => {
                        return (
                            <div key={index} className='card' onDoubleClick={() => navigate(`/recipe/${item._id}`)}>
                                <img src={`http://localhost:3000/images/${item.coverImage}`}  alt="Food" />
                                <div className='card-body'>
                                    <div className='title'>{item.title}</div>
                                    <div className='icons'>
                                        <div className='timer'><BsStopwatchFill />{item.time}</div>
                                        {(!path) ? <FaHeart onClick={() => favRecipe(item)}
                                            style={{ color: (favItems.some(res => res._id === item._id)) ? "red" : "" }} /> :
                                            <div className='action'>
                                                <Link to={`/editRecipe/${item._id}`} className="editIcon"><FaEdit /></Link>
                                                <MdDelete onClick={() => handleDeleteClick(item._id)} className='deleteIcon' />
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>

            {showModal && (
                <DeleteConfirmationModal
                    onClose={handleCloseModal}
                    onConfirm={handleConfirmDelete}
                />
            )}
        </>
    );
}
