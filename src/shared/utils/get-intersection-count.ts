export const getIntersectionCount = (arr1: string[], arr2: string[]) => {
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);

  let intersectionCount = 0;

  for (const item of set1) {
    if (set2.has(item)) {
      intersectionCount++;
    }
  }

  return intersectionCount;
};
