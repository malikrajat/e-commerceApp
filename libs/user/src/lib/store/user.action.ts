import { createActionGroup, props, } from '@ngrx/store';
import { User } from "@org/user";


export const userActions = createActionGroup({
	source: 'User',
	events: {
		loadUserProfile: props<{ id: number }>(),
		loadUserProfileSuccess: props<{ user: User }>(),
		loadUserProfileFailure: props<{ error: string }>(),
	},
});
