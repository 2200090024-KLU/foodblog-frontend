import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditRecipe() {
    const [recipeData, setRecipeData] = useState(null); // Use null to indicate loading state
    const [loading, setLoading] = useState(true); // Track loading state
    const [error, setError] = useState(null); // To capture any error
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (!id) {
            setError("Recipe ID is missing.");
            setLoading(false);
            return;
        }

        const getData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/recipe/${id}`);
                const res = response.data;
                setRecipeData({
                    title: res.title,
                    ingredients: res.ingredients.join(","),
                    instructions: res.instructions,
                    time: res.time,
                });
                setLoading(false);
            } catch (err) {
                setError("Error fetching recipe data.");
                setLoading(false);
            }
        };

        getData();
    }, [id]);

    const onHandleChange = (e) => {
        let val = e.target.name === "ingredients" 
            ? e.target.value.split(",") 
            : e.target.name === "file" 
            ? e.target.files[0] 
            : e.target.value;
        setRecipeData(prev => ({ ...prev, [e.target.name]: val }));
    };

    const onHandleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/recipe/${id}`, recipeData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'authorization': 'bearer ' + localStorage.getItem("token"),
                },
            });
            navigate("/myRecipe");
        } catch (err) {
            setError("Error updating recipe.");
        }
    };

    if (loading) {
        return <div>Loading...</div>; // Show loading state while data is being fetched
    }

    if (error) {
        return <div>{error}</div>; // Display error message if there's an issue
    }

    return (
        <div className="container">
            <form className="form" onSubmit={onHandleSubmit}>
                <div className="form-control">
                    <label>Title</label>
                    <input
                        type="text"
                        className="input"
                        name="title"
                        onChange={onHandleChange}
                        value={recipeData.title}
                    />
                </div>
                <div className="form-control">
                    <label>Time</label>
                    <input
                        type="text"
                        className="input"
                        name="time"
                        onChange={onHandleChange}
                        value={recipeData.time}
                    />
                </div>
                <div className="form-control">
                    <label>Ingredients</label>
                    <textarea
                        type="text"
                        className="input-textarea"
                        name="ingredients"
                        rows="5"
                        onChange={onHandleChange}
                        value={recipeData.ingredients}
                    />
                </div>
                <div className="form-control">
                    <label>Instructions</label>
                    <textarea
                        type="text"
                        className="input-textarea"
                        name="instructions"
                        rows="5"
                        onChange={onHandleChange}
                        value={recipeData.instructions}
                    />
                </div>
                <div className="form-control">
                    <label>Recipe Image</label>
                    <input
                        type="file"
                        className="input"
                        name="file"
                        onChange={onHandleChange}
                    />
                </div>
                <button type="submit">Edit Recipe</button>
            </form>
        </div>
    );
}
