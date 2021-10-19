const API_URL = 'http://127.0.0.1:8000/v1/'

const API_DATA = {
    //endpoints:
    RECEIPES_SEARCH: API_URL + 'receipes?search=',
    WHY_SLOWCOOKER: API_URL + 'why_slowcooker',
    NO_IDEA_RECEIPES: API_URL + 'no_idea_receipes?num=3',
    GALLERY: API_URL + 'gallery',
    SINGLE_RECEIPE: API_URL + 'receipes/',
    LIKES_UP: '/likes_up',
    LIKES_DOWN: '/likes_down'
}

export default API_DATA