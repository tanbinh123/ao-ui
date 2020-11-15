import * as actionType from '@/action/ActionType';

export function postsLogin(
    state = {
        isFetching: false,
        user: {},
        roles: []
    },
    action
) {
    console.log('postsLogin reducer action: ', action);
    switch (action.type) {
        case actionType.FETCH_POSTS_REQUEST:
            // 请求开始：设置isFetching为true,显示加载
            return Object.assign({}, state, {
                isFetching: true
            })
        case actionType.FETCH_POSTS_SUCCESS:
            // 请求成功：设置isFetching为false,掩藏加载
            return Object.assign({}, state, {
                isFetching: false,
                user: action.user.user,
                roles: action.user.roles,
            })
        case actionType.FETCH_POSTS_FAILURE:
            // 请求失败：设置isFetching为false,掩藏加载
            return Object.assign({}, state, {
                isFetching: false,
                errorMessage: action.error,
            })
        default:
            return state
    }
}

export function userInfo(state = {user: {}, roles: [], loadMenus: []}, action) {
    switch (action.type) {
        case actionType.SET_USER_INFO:
            // 请求开始：设置isFetching为true,显示加载
            return Object.assign({}, state, {
                user: action.user,
                roles: action.roles
            })
        default:
            return state
    }
}