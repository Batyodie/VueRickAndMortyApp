export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms) as unknown as void);
}
