import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    video_id: '',
};

const videoSlice = createSlice({
    name: 'video',
    initialState,
    reducers: {
        updateVideo(state, action) {
            console.log(action);
            state.video_id = action.payload.video_id;
        },
    },
});

export const { updateVideo } = videoSlice.actions;
export default videoSlice.reducer;
