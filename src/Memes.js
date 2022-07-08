import React from "react";
import "./Memes.css";

export default function Memes(){

    const [meme,setMeme] = React.useState({
        topText: "",
        bottomText:"",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    })

    const [allMemes,setAllMemes] = React.useState([])
    
    React.useEffect(()=>{
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    },[])

    function handleChange(e){
        const {name,value} = e.target
        setMeme(prevValue =>({
            ...prevValue,
            [name]: value
        }))
    }

    function randomImages(){
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setMeme(prevValue =>({
            ...prevValue,
            randomImage:url
        }))
    }

    return(

        <div className="Meme-container">
        
            <div className="input-container">
                <input 
                    type='text' 
                    placeholder="Enter Top Text"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input 
                    type='text' 
                    placeholder="Enter Bottom Text"
                    className="form--input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
            </div>
            <button className="memes--submit--button" onClick={randomImages}>
				Generate meme
			</button>
        

            <div className="meme">
                <img src={meme.randomImage} className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </div>
    )
}