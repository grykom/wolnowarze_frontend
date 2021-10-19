import { useState, useEffect  } from 'react';
import API_DATA from "../components/_ApiData";

function ReceipeHook(receipe_id, history, setFavs) {
    const [receipe, setReceipe] = useState();
    const [receipeReady, setReceipeReady] = useState(false);
    
    // storage things
    const [receipeStorageObj, setReceipeStorageObj] = useState({})

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
        fetch(API_DATA.SINGLE_RECEIPE + receipe_id)
            .then(res => res.json())
            .then(data => {
                setReceipe(data);
                setReceipeReady(true);
                setLikesNum(data.likes);
                
                const receipeObj = {
                    r_id: data.receipe_id,
                    r_name: data.name,
                    r_slug: data.slug
                }
                setReceipeStorageObj(receipeObj)          
            })
    }, [receipe_id])

    // likes
    useEffect(() => {
        likesStorage.filter(item => JSON.stringify(item) === JSON.stringify(receipeStorageObj)).length > 0 && setMeLike(true)
    }, [likesStorage, receipeStorageObj])

    function _likeAction(action_boolean) {
        localStorage.setItem(`likes`, JSON.stringify(likesStorage));  
        setMeLike(action_boolean);
        let url = ''
        if(action_boolean){
            url = API_DATA.SINGLE_RECEIPE + receipe_id + API_DATA.LIKES_UP
        }else {
            url = API_DATA.SINGLE_RECEIPE + receipe_id + API_DATA.LIKES_DOWN
        }
        fetch(url, {method: 'POST'})
            .then(res => res.json())
            .then(data => setLikesNum(data.likes)) 
    }
    function addLike() {        
        likesStorage.push(receipeStorageObj);        
        _likeAction(true);
    }
    function removeLike() {   
        likesStorage = likesStorage.filter(item => JSON.stringify(item) !== JSON.stringify(receipeStorageObj));
        _likeAction(false); 
    }

    // favorites
    useEffect(() => {
        favStorage.filter(item => JSON.stringify(item) === JSON.stringify(receipeStorageObj)).length > 0 && setMeFav(true)
    }, [favStorage, receipeStorageObj])

    function _favAction(action_boolean){
        setMeFav(action_boolean);
        localStorage.setItem('favs', JSON.stringify(favStorage));
        setFavs(favStorage);
    }
    function addFav() {
        favStorage.push(receipeStorageObj);
        _favAction(true);
    }
    function removeFav() {
        favStorage = favStorage.filter(item => JSON.stringify(item) !== JSON.stringify(receipeStorageObj));
        _favAction(false);
    }

    return {modalIsOpen, closeModal, receipe, receipeReady, likesNum, meLike, meFav, addLike, removeLike, addFav, removeFav}

}

export default ReceipeHook

