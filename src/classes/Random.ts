const CYRB_CACHE: { [key: string]: [number, number, number, number] } = {};
const SFC_CACHE: { [key: string]: number } = {};
function cyrb128(str: string) {
  if (CYRB_CACHE[str]) return CYRB_CACHE[str];
  let h1 = 1779033703,
    h2 = 3144134277,
    h3 = 1013904242,
    h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
  h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
  h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
  h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
  (h1 ^= h2 ^ h3 ^ h4), (h2 ^= h1), (h3 ^= h1), (h4 ^= h1);
  CYRB_CACHE[str] = [h1 >>> 0, h2 >>> 0, h3 >>> 0, h4 >>> 0];
  return CYRB_CACHE[str];
}

function sfc32(a: number, b: number, c: number, d: number) {
  const key = `${a},${b},${c},${d}`;

  return function () {
    if (SFC_CACHE[key]) return SFC_CACHE[key];
    a |= 0;
    b |= 0;
    c |= 0;
    d |= 0;
    let t = (((a + b) | 0) + d) | 0;
    d = (d + 1) | 0;
    a = b ^ (b >>> 9);
    b = (c + (c << 3)) | 0;
    c = (c << 21) | (c >>> 11);
    c = (c + t) | 0;

    SFC_CACHE[key] = (t >>> 0) / 4294967296;
    return SFC_CACHE[key];
  };
}

export class Random {
  seed: string = Date.now().toString();
  private generator: () => number;
  private count: number = 0;
  constructor(seed: string = Date.now().toString()) {
    this.seed = seed;
    const hash = cyrb128(seed);
    this.generator = sfc32(hash[0], hash[1], hash[2], hash[3]);
  }
  get(min = 0, max = 100) {
    const result = this.generator() * (max - min) + min;
    this.count++;
    const hash = cyrb128(this.seed + this.count);
    this.generator = sfc32(hash[0], hash[1], hash[2], hash[3]);
    return Math.round(result);
  }
  static get(min = 0, max = 1) {
    return new Random().get(min, max);
  }
  [Symbol.toPrimitive]() {
    return this.get();
  }
}