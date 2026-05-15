import type { UserProfileResponse } from '../types';

const API_URL = 'https://besvc.capacitateparaelempleo.org/api/inscriptions/TestReport'; 

/**
 * Realiza la petición HTTP para obtener el perfil del usuario y sus cursos inscritos.
 * @returns {Promise<UserProfileResponse>} Promesa con la información tipada del usuario.
 * @throws {Error} Si la petición falla o el servidor no responde correctamente.
 */
export const fetchUserProfile = async (): Promise<UserProfileResponse> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Error al obtener la información del servidor');
  }
  return response.json();
};