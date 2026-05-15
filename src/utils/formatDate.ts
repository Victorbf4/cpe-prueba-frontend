export const formatDate = (isoString: string | null): string => {
  if (!isoString) {
    return 'N/A';
  }

  const date = new Date(isoString);
  
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  return date.toLocaleDateString('es-ES', options);
};
