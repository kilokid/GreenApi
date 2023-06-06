import { createAction, createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { sendMessage } from "../api/api";

type ChatType = {
    id: string | null;
    apiToken: string | null;
    chatId: string | null;
    isCreate: boolean;
    message: string
};

const initialState: ChatType = {
    id: null,
    apiToken: null,
    chatId: null,
    isCreate: false,
    message: '',
};

export const createChat = createAction<ChatType>('CREATE_CHAT');

export default createReducer(initialState, (builder) => {
  builder.addCase(createChat, (state, action) => {    
    state.id = action.payload.id;
    state.apiToken = action.payload.apiToken;
    state.chatId = action.payload.chatId;
    state.isCreate = action.payload.isCreate;
  });
});

export const checkCreateChat = createAsyncThunk(
    'CHECK_CREATE',
    async ({ id, apiToken, chatId, message }: { id: string; apiToken: string, chatId: string, message: string }, thunkAPI) => {
        try {
            const response = await sendMessage(id, apiToken, chatId, message);
            
            if (response.status === 200 && response.data.idMessage) {
                const chatData: ChatType = {
                    id,
                    apiToken,
                    chatId,
                    message,
                    isCreate: true
                };

                thunkAPI.dispatch(createChat(chatData));
                return chatData;
            }
        } catch (error) {
            console.error(error);
        }
    }
);