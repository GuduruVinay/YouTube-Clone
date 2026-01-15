import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentVideo: null,
    loading: false,
    error: false
};

export const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {
        fetchStart: (state) => {
            state.loading = true;
        },
        fetchSuccess: (state, action) => {
            state.loading = false;
            state.currentVideo = action.payload;
        },
        fetchFailure: (state) => {
           state.loading = false;
            state.error = true;
        },
        like: (state, action) => {
            // If user is already is likes, REMOVE them (Toggle Off)
            if(state.currentVideo.likes.includes(action.payload)) {
                state.currentVideo.likes.splice(
                    state.currentVideo.likes.findIndex(
                        (userId) => userId === action.payload
                    ),
                    1
                );
            } else {
                // If not in likes, ADD them (Toggle On)
                state.currentVideo.likes.push(action.payload);
                // And ensure they are REMOVED from dislikes if they were there
                if(state.currentVideo.dislikes.includes(action.payload)) {
                    state.currentVideo.dislikes.splice(
                        state.currentVideo.dislikes.findIndex(
                            (userId) => userId === action.payload
                        ),
                        1
                    );
                }
            }
        },
        dislike: (state, action) => {
            // If user is already is dislikes, REMOVE them (Toggle Off)
            if(state.currentVideo.dislikes.includes(action.payload)) {
                    state.currentVideo.dislikes.splice(
                        state.currentVideo.dislikes.findIndex(
                            (userId) => userId === action.payload
                        ),
                        1
                    );
            } else {
                // If not in dislikes, ADD them (Toggle On)
                state.currentVideo.dislikes.push(action.payload);
                // And ensure they are REMOVED from dislikes if they were there
                if(state.currentVideo.likes.includes(action.payload)) {
                    state.currentVideo.likes.splice(
                        state.currentVideo.likes.findIndex(
                            (userId) => userId === action.payload
                        ),
                        1
                    );
                }
            }
        },
        uploadStart: (state) => {
            state.loading = true;
            state.error = false;
        },
        uploadSuccess: (state, action) => {
            state.loading = false;
            state.error = false;
            state.currentVideo = action.payload;
        },
        uploadFailure: (state) => {
            state.loading = false;
            state.error = true;
        }
    },
});

export const { fetchStart, fetchSuccess, fetchFailure, like, dislike, uploadStart, uploadSuccess, uploadFailure } = videoSlice.actions;

export default videoSlice.reducer;