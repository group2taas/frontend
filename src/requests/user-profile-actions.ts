"use client";

import axiosInstance from '@/axios/axios-instance';
import { UserProfile } from '@/types/mongo-documents';
import { getToken } from '@/utils/token';

export const fetchUserProfile = async (): Promise<UserProfile | null> => {
    const accessToken = getToken();
    try {
      const response = await axiosInstance.get('/profile/me/', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      });
      return response.data as UserProfile;
    } catch {
      return null;
    }
  };