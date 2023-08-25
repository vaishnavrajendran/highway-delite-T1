import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserDetailsType } from "../../actions/userActions";

const userInfoFromStorage = localStorage.getItem("UserInfo");
const parsedUserInfo = userInfoFromStorage ? JSON.parse(userInfoFromStorage) : null;

const initialState = {
  userInfo: parsedUserInfo
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      addPerson: (state, action: PayloadAction<UserDetailsType>) => {
        state.userInfo = action.payload
      },
    }
  });
  
  export default userSlice.reducer;
  export const { addPerson } = userSlice.actions;