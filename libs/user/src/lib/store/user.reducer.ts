import { User, userActions } from "@org/user";
import { createFeature, createReducer, on } from "@ngrx/store";


export interface UserState {
	user: User | undefined;
	error: string;
}

const initialState: UserState = {
	user: undefined,
	error: '',
};

export const userReducer = createReducer(
	initialState,
	on(userActions.loadUserProfileSuccess, (state, action) => ({
		...state,
		user: action.user,
		error: '',
	})),
	on(userActions.loadUserProfileFailure, (state, action) => ({
		...state,
		user: undefined,
		error: action.error,
	}))
);

export const userFeature = createFeature({
	name: 'user',
	reducer: userReducer,
	extraSelectors: ({selectUser, selectError}) => ({
		selectUser,
		selectError,
	}),
});
