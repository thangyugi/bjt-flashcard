/** Xáo trộn có seed (cùng seed → cùng thứ tự), dùng chung server/client. */
function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

export function seededShuffle<T>(arr: T[], seed: string): T[] {
  let a = hash(seed) || 1;
  const rnd = () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * Thứ tự hiển thị phương án của câu một/nhiều đáp án: cố định theo id câu (ngân hàng gốc hay để đáp án ở ô A).
 * Trả về khóa gốc theo thứ tự hiển thị A, B, C…
 */
export function optionOrder(id: number, keys: string[]): string[] {
  return seededShuffle([...keys].sort(), `ccarp-opt-${id}`);
}
