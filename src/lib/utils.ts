export function formatNumber(num: number | string): string {
  const n = typeof num === 'string' ? parseInt(num) : num;
  return n.toLocaleString();
}

export function calculatePercentage(part: number, total: number): number {
  return total > 0 ? (part / total) * 100 : 0;
}

export function sortByPlaycount<T extends { playcount: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => parseInt(b.playcount) - parseInt(a.playcount));
}

export function getCommonItems<T extends { name: string }>(
  list1: T[],
  list2: T[]
): T[] {
  const names2 = new Set(list2.map(i => i.name.toLowerCase()));
  return list1.filter(i => names2.has(i.name.toLowerCase()));
}

export function getUniqueItems<T extends { name: string }>(
  list1: T[],
  list2: T[]
): T[] {
  const names2 = new Set(list2.map(i => i.name.toLowerCase()));
  return list1.filter(i => !names2.has(i.name.toLowerCase()));
}
