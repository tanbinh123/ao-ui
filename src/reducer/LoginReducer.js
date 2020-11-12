import * as actionType from '@/action/ActionType';

export function postsLogin(
    state = {
        isFetching: false,
        didInvalidate: false,
        items: []
    },
    action
) {
    console.log('login reducer action: ', action);
    switch (action.type) {
        case actionType.FETCH_POSTS_REQUEST:
            return Object.assign({}, state, {
                didInvalidate: true
            })
        case actionType.FETCH_POSTS_SUCCESS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            })
        case actionType.FETCH_POSTS_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.posts,
                lastUpdated: action.receivedAt
            })
        default:
            return state
    }
}