import { createAction, createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { getAccauntStatus } from "../api/api";

type UserDataType = {
  id: string | null;
  apiToken: string | null;
  isAuth: boolean;
};

const initialState: UserDataType = {
  id: null,
  apiToken: null,
  isAuth: false,
};

export const setUserData = createAction<UserDataType>('SET_USER_DATA');

export default createReducer(initialState, (builder) => {
  builder.addCase(setUserData, (state, action) => {
    console.log(action);
    
    state.id = action.payload.id;
    state.apiToken = action.payload.apiToken;
    state.isAuth = action.payload.isAuth;
  });
});

export const checkAuthorization = createAsyncThunk(
    'CHECK_AUTH',
    async ({ id, apiToken }: { id: string; apiToken: string }, thunkAPI) => {
        try {
            const response = await getAccauntStatus(id, apiToken);

            if (response.status === 200 && response.data.stateInstance === 'authorized') {
                const userData: UserDataType = {
                    id,
                    apiToken,
                    isAuth: true
                };

                thunkAPI.dispatch(setUserData(userData));
            }
        } catch (error) {
            console.error(error);
        }
    }
);