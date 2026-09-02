export const filterByName = <T extends { name: string }>(
  data: T[],
  keyword: string,
): T[] => {
  return data.filter((item) =>
    item.name.toLowerCase().includes(keyword.toLowerCase()),
  );
};
