import { UserProfileResponse } from '../types';

// TODO: Reemplazar con el endpoint real de la prueba técnica
const API_URL = 'AQUI_VA_EL_ENDPOINT_REAL'; 

export const fetchUserProfile = async (): Promise<UserProfileResponse> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Error al obtener la información del servidor');
  }
  return response.json();
};