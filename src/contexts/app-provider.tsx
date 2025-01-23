'use client';

import { auth } from '@/configs/configs';
import { fetchUserProfile } from '@/requests/user-profile-actions'
import store, {
  resetState,
  setUser,
  setUserProfile,
} from '@/store/store';
import { deleteToken, storeToken } from '@/utils/token';
import { onAuthStateChanged, User } from 'firebase/auth';
import { ReactNode, useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';


interface Props {
  children: ReactNode;
}

const AppProvider = ({ children }: Props) => {
  return (
    <Provider store={store}>
      <AppProviderContent>{children}</AppProviderContent>
    </Provider>
  );
};

const AppProviderContent = ({ children }: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      dispatch(resetState());
      if (user) {
        const token = await user.getIdToken();
        storeToken(token);
        const userProfile = await fetchUserProfile();

        dispatch(setUser(user.toJSON() as User));
        dispatch(setUserProfile(userProfile));
      } else {
        deleteToken();
        dispatch(setUser(null));
        dispatch(setUserProfile(null));
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return <>{children}</>;
};

export default AppProvider;
