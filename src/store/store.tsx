import { UserProfile } from '@/types/mongo-documents';
import { configureStore, createSlice, PayloadAction  } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';


interface State {
  user: User | null | undefined;
  userProfile: UserProfile | null;
  notifications: Notification[];
}

const initialState: State = {
  user: undefined,
  userProfile: null,
  notifications: [],
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
    setUserProfile(state, action: PayloadAction<UserProfile | null>) {
      state.userProfile = action.payload;
    },
    addNotification(state, action: PayloadAction<Notification>) {
      state.notifications.push(action.payload);
    },
    resetState() {
      return initialState;
    },
  },
});

export const {
  setUser,
  setUserProfile,
  addNotification,
  resetState,
} = appSlice.actions;

const store = configureStore({
  reducer: appSlice.reducer,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
