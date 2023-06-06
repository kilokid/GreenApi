import { createAction, createReducer } from "@reduxjs/toolkit";

export type MessageType = {
    receiptId?: number | null,
    text: string,
    type: 'outgoing' | 'incoming',
};

const initialState:Array<MessageType> = [];

export const addMessage = createAction<MessageType>('ADD_MESSAGE');

export default createReducer(initialState, (builder) => {
  builder.addCase(addMessage, (state, {payload}) => {
        state.push(payload);
  });
});