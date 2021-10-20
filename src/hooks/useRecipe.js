import { useState, useEffect  } from 'react';
import API_DATA from "../components/_ApiData";

function useRecipe(recipe_id, history, setFavs) {
    const [recipe, setrecipe] = useState();
    const [recipeReady, setrecipeReady] = useState(false);
    
    // storage things
    const [recipeStorageObj, setrecipeStorageObj] = useState({})

    // likes
    let likesStorage = JSON.parse(localStorage.getItem(`likes`));
    if (!likesStorage) likesStorage = []
    const [likesNum, setLikesNum] = useState(0);
    const [meLike, setMeLike] = useState(false);

    // favorites
    let favStorage = JSON.parse(localStorage.getItem('favs'));
    if (!favStorage) favStorage = []  
    const [meFav, setMeFav] = useState(false);

    // modal
    const [modalIsOpen, setIsOpen] = useState(true);
    function closeModal() {
        setIsOpen(false);
        history.push('/');
    }

    useEffect(() => {
        fetch(API_DATA.SINGLE_RECIPE + recipe_id)
            .then(res => res.json())
            .then(data => {
                setrecipe(data);
                setrecipeReady(true);
                setLikesNum(data.likes);
                
                const recipeObj = {
                    r_id: data.recipe_id,
                    r_name: data.name,
                    r_slug: data.slug
                }
                setrecipeStorageObj(recipeObj)          
            })
    }, [recipe_id])

    // likes
    useEffect(() => {
        likesStorage.filter(item => JSON.stringify(item) === JSON.stringify(recipeStorageObj)).length > 0 && setMeLike(true)
    }, [likesStorage, recipeStorageObj])

    function _likeAction(action_boolean) {
        localStorage.setItem(`likes`, JSON.stringify(likesStorage));  
        setMeLike(action_boolean);
        let url = ''
        if(action_boolean){
            url = API_DATA.SINGLE_RECIPE + recipe_id + API_DATA.LIKES_UP
        }else {
            url = API_DATA.SINGLE_RECIPE + recipe_id + API_DATA.LIKES_DOWN
        }
        fetch(url, {method: 'POST'})
            .then(res => res.json())
            .then(data => setLikesNum(data.likes)) 
    }
    function addLike() {        
        likesStorage.push(recipeStorageObj);        
        _likeAction(true);
    }
    function removeLike() {   
        likesStorage = likesStorage.filter(item => JSON.stringify(item) !== JSON.stringify(recipeStorageObj));
        _likeAction(false); 
    }

    // favorites
    useEffect(() => {
        favStorage.filter(item => JSON.stringify(item) === JSON.stringify(recipeStorageObj)).length > 0 && setMeFav(true)
    }, [favStorage, recipeStorageObj])

    function _favAction(action_boolean){
        setMeFav(action_boolean);
        localStorage.setItem('favs', JSON.stringify(favStorage));
        setFavs(favStorage);
    }
    function addFav() {
        favStorage.push(recipeStorageObj);
        _favAction(true);
    }
    function removeFav() {
        favStorage = favStorage.filter(item => JSON.stringify(item) !== JSON.stringify(recipeStorageObj));
        _favAction(false);
    }

    return {modalIsOpen, closeModal, recipe, recipeReady, likesNum, meLike, meFav, addLike, removeLike, addFav, removeFav}

}

export default useRecipe

