export const truncateDescription = (description, maxLength) => {
  if (description.length <= maxLength) return description;
  return description.substring(0, maxLength) + '...';
};

export const palabrasClave = (texto) => {
  const sinEspacios = texto.replace(/\s+/g, '');
  const letrasArray = sinEspacios.split(',');
  return letrasArray;
};

export const quitarComillas = (texto) => {
  return texto.replace(/"/g, '');
};