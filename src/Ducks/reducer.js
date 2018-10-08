const GET_USER_DATA = "GET_USER_DATA"
const UPDATE_BACKGROUND_IMAGE = "UPDATE_BACKGROUND_IMAGE"

export function getUserData(data) {
    return {
        type: GET_USER_DATA,
        payload: data
    }
}

export function updateBackgroundImage(data) {
    return {
        type: UPDATE_BACKGROUND_IMAGE,
        payload: data
    }
}

const initialState = {
    user: {},
    backgroundImage: ""
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_USER_DATA: {
            return Object.assign({}, state, {user: action.payload})
        }
        case UPDATE_BACKGROUND_IMAGE: {
            return Object.assign({}, state, {backgroundImage: action.payload})
        }
        default: return state
    }
}