const API_URL = 'https://api.wolnowarze.grykom.pl/v1/'

const API_DATA = {
    //endpoints:
    RECIPES_SEARCH: API_URL + 'recipes?search=',
    RECIPES_COUNTER: API_URL + 'recipes?page_size=1',
    WHY_SLOWCOOKER: API_URL + 'why_slowcooker',
    NO_IDEA_RECIPES: API_URL + 'no_idea_recipes?num=3',
    GALLERY: API_URL + 'gallery?num=6',
    SINGLE_RECIPE: API_URL + 'recipes/',
    LIKES_UP: '/likes_up',
    LIKES_DOWN: '/likes_down'
}

export default API_DATA