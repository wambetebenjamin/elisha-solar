const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function createQuoteReference(): string {
  const year = new Date().getFullYear();
  let suffix = "";
  for (let index = 0; index < 6; index += 1) {
    suffix += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }
  return `ES-${year}-${suffix}`;
}

export function isQuoteReference(value: string): boolean {
  return /^ES-\d{4}-[A-Z0-9]{6}$/.test(value);
}
