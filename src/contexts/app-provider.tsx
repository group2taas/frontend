'use client';

import { auth } from '@/configs/configs';
import { fetchUserProfile } from '@/requests/user-profile-actions'
import store, {
  resetState,
  setUser,
  setUserProfile,
} from '@/store/store';
import { deleteToken, exchangeFirebaseToken, storeToken, getToken } from '@/utils/token';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useRouter, usePathname } from 'next/navigation';
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
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      dispatch(resetState());
      if (user) {
        const existingToken = getToken();
        if (!existingToken) {

          const token = await user.getIdToken();
          const { access } = await exchangeFirebaseToken(token);
          storeToken(access);

        }

        const userProfile = await fetchUserProfile();
        dispatch(setUser(user.toJSON() as User));
        dispatch(setUserProfile(userProfile));
        
        if (pathname === '/login') {
          router.push('/');
        }
      } else {
        deleteToken();
        dispatch(setUser(null));
        dispatch(setUserProfile(null));

        if ( pathname !== '/login' && pathname !== '/signup') {
          router.push('/login');
        }
      }
    });

    return unsubscribe;
  }, [dispatch, router, pathname]);

  return <>{children}</>;
};

export default AppProvider;
