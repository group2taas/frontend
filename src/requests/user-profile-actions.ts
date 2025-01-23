import axiosInstance from '@/axios/axios-instance';
import { UserProfile } from '@/types/mongo-documents';

export const createUserProfile = async (email: string, password: string, userProfile: Partial<UserProfile>) => {
    await axiosInstance.post('/profile/user/me', userProfile, {
      auth: {
        username: email,
        password,
      },
    });
  };

export const fetchUserProfile = async (): Promise<UserProfile | null> => {
    try {
      const response = await axiosInstance.get('/profile/user/me');
      return response.data as UserProfile;
    } catch {
      return null;
    }
  };