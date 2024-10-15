import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  chat: [{ id: 1, text: "Welcome to Chat Application", timestamp: new Date().toISOString() }],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMsg: (state, action) => {
      const message = {
        id: nanoid(),
        text: action.payload.text,
        timestamp: new Date().toISOString(),
      };
      state.chat.push(message);
    },
    receiveMsg: (state, action) => {
      const message = {
        id: nanoid(),
        text: action.payload.text,
        timestamp: new Date().toISOString(),
      };
      state.chat.push(message);
    },
  },
});

export const { addMsg, receiveMsg } = chatSlice.actions;
export default chatSlice.reducer;

