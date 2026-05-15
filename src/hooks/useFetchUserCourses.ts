import { useState, useEffect } from 'react';
import { UserProfileResponse } from '../types';
import { fetchUserProfile } from '../services/api';

export const useFetchUserCourses = () => {
  const [data, setData] = useState<UserProfileResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const result = await fetchUserProfile();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido al cargar los datos');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return { data, isLoading, error };
};