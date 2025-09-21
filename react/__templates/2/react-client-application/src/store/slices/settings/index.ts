import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ISettingsState {
    isLocalTime: boolean
}

const initState: ISettingsState = {
    isLocalTime: true
}

export const settingsSlice = createSlice({
    name: "settings",
    initialState: initState,
    reducers: {
        setIsLocalTime: (state, action: PayloadAction<boolean>) => {
            state.isLocalTime = action.payload
        }
    }
})

export const { setIsLocalTime } = settingsSlice.actions;
export default settingsSlice.reducer