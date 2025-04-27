import React, { useState } from 'react'
import foodRecipe from '../assets/foodRecipe.png'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import RecipeItems from '../components/RecipeItems'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/Modal'
import InputForm from '../components/InputForm'

export default function Home() {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)

    const addRecipe = () => {
        let token = localStorage.getItem("token")
        if (token)
            navigate("/addRecipe")
        else {
            setIsOpen(true)
        }
    }

    return (
        <>
            <section className='home'>
                <div className='left'>
                    <h1>Food Recipe</h1>
                    <h5>A community where food lovers come together to share, discover, and enjoy delicious recipes from around the world. Whether you're a seasoned chef or just starting out, here you can find a variety of recipes, post your own creations, and connect with other passionate cooks. Explore new flavors, experiment with ingredients, and join the conversation around food!</h5>
                    <button onClick={addRecipe}>Share your recipe</button>
                </div>
                <div className='right'>
                    <img src={foodRecipe} width="320px" height="300px"></img>
                </div>
            </section>
            <div className='bg'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#E8D7B8" fillOpacity="1" d="M0,32L48,32C96,32,192,32,288,37.3C384,43,480,53,576,80C672,107,768,149,864,181.3C960,213,1056,235,1152,213.3C1248,192,1344,128,1392,96L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
            </div>
            <h3 style={styles.h3}>All Recipes</h3>
            {(isOpen) && <Modal onClose={() => setIsOpen(false)}><InputForm setIsOpen={() => setIsOpen(false)} /></Modal>}
            <div className='recipe'>
                <RecipeItems />
            </div>
        </>
    )
}


const styles = {
    h3: {
        paddingLeft:'30px',
        paddingBottom : '30px',
        fontSize:'30px',



    }
}