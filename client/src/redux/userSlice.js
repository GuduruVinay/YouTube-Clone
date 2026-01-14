import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    loading: false,
    error: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            // Sync to LocalStorage for persistence
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        loginFailure: (state) => {
            state.loading = false;
            state.error = true;
        },
        logout: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = false;
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        },
        // New Reducers for Channels
        subscription: (state, action) => {
            // action.payload is the Channel ID we subscribed to
            if(state.currentUser.subscribedChannels.includes(action.payload)) {
                state.currentUser.subscribedChannels.splice(
                    state.currentUser.subscribedChannels.findIndex(
                        (channelId) => channelId === action.payload
                    ),
                    1
                );
            } else {
                state.currentUser.subscribedChannels.push(action.payload);
            }
            localStorage.setItem("user", JSON.stringify(state.currentUser));
        },
        // When a user creates a new channel, add it to their list locally
        addChannel: (state, action) => {
            // action.payload is the new Channel ID
            state.currentUser.channels.push(action.payload);
            localStorage.setItem("user", JSON.stringify(state.currentUser));
        }
    },
});

export const { loginStart, loginSuccess, loginFailure, logout, subscription, addChannel } = userSlice.actions;

export default userSlice.reducer;