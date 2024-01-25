export const generateId = (lastId?: string): string => {
  if (lastId) {
    const lastIdNumber = parseInt(lastId.slice(1));
    const newIdNumber = lastIdNumber + 1;
    const newId = `M${newIdNumber.toString().padStart(4, '0')}`;

    return newId;
  }

  return 'M0001';
};
