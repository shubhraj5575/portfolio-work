// Maps the scroll position to a chapter number that moves smoothly from one
// section to the next, whatever height each section turns out to be.
// 0 = first section pinned to the top of the screen, 1 = second, 1.5 = halfway between.
export function chapterAt(sections: HTMLElement[]): number {
  const max = document.documentElement.scrollHeight - innerHeight;
  const y = Math.min(Math.max(scrollY, 0), max);
  const anchor = (i: number) => Math.min(sections[i].offsetTop, max);
  for (let i = sections.length - 1; i >= 0; i--) {
    const a = anchor(i);
    if (y < a) continue;
    if (i === sections.length - 1) return i;
    const b = anchor(i + 1);
    return b > a ? i + (y - a) / (b - a) : i;
  }
  return 0;
}

export const smooth = (a: number, b: number, x: number) => {
  x = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return x * x * (3 - 2 * x);
};
