// create a reducer for login
import { CONNECT_USER_START, CONNECT_USER_SUCCESS, CONNECT_USER_ERROR, UPDATE_USER_BALANCE } from '../types';

const initialState = {
	isAuthenticated: false,
	loading: false,
	error: '',
	userId: '',
	balance: 0,
};

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case CONNECT_USER_START:
			return {
				...state,
				isAuthenticated: false,
				userId:'',
				loading: true,
			};
		case CONNECT_USER_SUCCESS:
			return {
				...state,
				isAuthenticated: true,
				userId: action.payload,
				loading: false,
			};
		case CONNECT_USER_ERROR:
			return {
				...state,
				isAuthenticated: false,
				userId: '',
				error: action.payload,
				loading: false,
			};
		
			case UPDATE_USER_BALANCE:
				return {
					...state,
					balance: action.balance,
				};

		default:
			return state;
	}
};
