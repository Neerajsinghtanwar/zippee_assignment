import {USER_LOGIN} from '../constants'

const userState = {
    userData: []
}

export function userData(state = userState, action) {
    switch (action.type) {
        case USER_LOGIN:
            return {
                ...state,
                userData: action.data
            }
        default:
            return state
    }
}
