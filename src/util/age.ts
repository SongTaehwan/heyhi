export const getAge = (birthday: string): number => {
  const diff = Date.now() - new Date(birthday).getTime();
  const ageDate = new Date(diff);

  return Math.abs(ageDate.getUTCFullYear() - 1970);
};
