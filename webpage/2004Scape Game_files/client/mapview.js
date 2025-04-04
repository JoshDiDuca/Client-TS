var __create = Object.create;
var __getProtoOf = Object.getPrototypeOf;
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);

// node_modules/stats.js/build/stats.min.js
var require_stats_min = __commonJS((exports, module) => {
  (function(f, e) {
    typeof exports === "object" && typeof module !== "undefined" ? module.exports = e() : typeof define === "function" && define.amd ? define(e) : f.Stats = e();
  })(exports, function() {
    var f = function() {
      function e(a2) {
        c.appendChild(a2.dom);
        return a2;
      }
      function u(a2) {
        for (var d = 0;d < c.children.length; d++)
          c.children[d].style.display = d === a2 ? "block" : "none";
        l = a2;
      }
      var l = 0, c = document.createElement("div");
      c.style.cssText = "position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000";
      c.addEventListener("click", function(a2) {
        a2.preventDefault();
        u(++l % c.children.length);
      }, false);
      var k = (performance || Date).now(), g = k, a = 0, r = e(new f.Panel("FPS", "#0ff", "#002")), h = e(new f.Panel("MS", "#0f0", "#020"));
      if (self.performance && self.performance.memory)
        var t = e(new f.Panel("MB", "#f08", "#201"));
      u(0);
      return { REVISION: 16, dom: c, addPanel: e, showPanel: u, begin: function() {
        k = (performance || Date).now();
      }, end: function() {
        a++;
        var c2 = (performance || Date).now();
        h.update(c2 - k, 200);
        if (c2 > g + 1000 && (r.update(1000 * a / (c2 - g), 100), g = c2, a = 0, t)) {
          var d = performance.memory;
          t.update(d.usedJSHeapSize / 1048576, d.jsHeapSizeLimit / 1048576);
        }
        return c2;
      }, update: function() {
        k = this.end();
      }, domElement: c, setMode: u };
    };
    f.Panel = function(e, f2, l) {
      var c = Infinity, k = 0, g = Math.round, a = g(window.devicePixelRatio || 1), r = 80 * a, h = 48 * a, t = 3 * a, v = 2 * a, d = 3 * a, m = 15 * a, n = 74 * a, p = 30 * a, q = document.createElement("canvas");
      q.width = r;
      q.height = h;
      q.style.cssText = "width:80px;height:48px";
      var b = q.getContext("2d");
      b.font = "bold " + 9 * a + "px Helvetica,Arial,sans-serif";
      b.textBaseline = "top";
      b.fillStyle = l;
      b.fillRect(0, 0, r, h);
      b.fillStyle = f2;
      b.fillText(e, t, v);
      b.fillRect(d, m, n, p);
      b.fillStyle = l;
      b.globalAlpha = 0.9;
      b.fillRect(d, m, n, p);
      return { dom: q, update: function(h2, w) {
        c = Math.min(c, h2);
        k = Math.max(k, h2);
        b.fillStyle = l;
        b.globalAlpha = 1;
        b.fillRect(0, 0, r, m);
        b.fillStyle = f2;
        b.fillText(g(h2) + " " + e + " (" + g(c) + "-" + g(k) + ")", t, v);
        b.drawImage(q, d + a, m, n - a, p, d, m, n - a, p);
        b.fillRect(d + n - a, m, a, p);
        b.fillStyle = l;
        b.globalAlpha = 0.9;
        b.fillRect(d + n - a, m, a, g((1 - h2 / w) * p));
      } };
    };
    return f;
  });
});

// src/graphics/Canvas.ts
var canvasContainer = document.getElementById("game");
var canvasOverlay = document.getElementById("canvas-overlay");
var canvas = document.getElementById("canvas");
var canvas2d = canvas.getContext("2d", { willReadFrequently: true });
var jpegCanvas = document.createElement("canvas");
var jpegImg = document.createElement("img");
var jpeg2d = jpegCanvas.getContext("2d", { willReadFrequently: true });

// src/datastruct/Linkable.ts
class Linkable {
  key = 0n;
  next = null;
  prev = null;
  unlink() {
    if (this.prev != null) {
      this.prev.next = this.next;
      if (this.next) {
        this.next.prev = this.prev;
      }
      this.next = null;
      this.prev = null;
    }
  }
}

// src/datastruct/DoublyLinkable.ts
class DoublyLinkable extends Linkable {
  next2 = null;
  prev2 = null;
  unlink2() {
    if (this.prev2 !== null) {
      this.prev2.next2 = this.next2;
      if (this.next2) {
        this.next2.prev2 = this.prev2;
      }
      this.next2 = null;
      this.prev2 = null;
    }
  }
}

// src/graphics/Pix2D.ts
class Pix2D extends DoublyLinkable {
  static pixels = new Int32Array;
  static width2d = 0;
  static height2d = 0;
  static top = 0;
  static bottom = 0;
  static left = 0;
  static right = 0;
  static boundX = 0;
  static centerX2d = 0;
  static centerY2d = 0;
  static bind(pixels, width, height) {
    this.pixels = pixels;
    this.width2d = width;
    this.height2d = height;
    this.setBounds(0, 0, width, height);
  }
  static resetBounds() {
    this.left = 0;
    this.top = 0;
    this.right = this.width2d;
    this.bottom = this.height2d;
    this.boundX = this.right - 1;
    this.centerX2d = this.right / 2 | 0;
  }
  static setBounds(left, top, right, bottom) {
    if (left < 0) {
      left = 0;
    }
    if (top < 0) {
      top = 0;
    }
    if (right > this.width2d) {
      right = this.width2d;
    }
    if (bottom > this.height2d) {
      bottom = this.height2d;
    }
    this.top = top;
    this.bottom = bottom;
    this.left = left;
    this.right = right;
    this.boundX = this.right - 1;
    this.centerX2d = this.right / 2 | 0;
    this.centerY2d = this.bottom / 2 | 0;
  }
  static clear(v = 0) {
    const len = this.width2d * this.height2d;
    for (let i = 0;i < len; i++) {
      this.pixels[i] = v;
    }
  }
  static drawRect(x, y, w, h, color) {
    this.drawHorizontalLine(x, y, color, w);
    this.drawHorizontalLine(x, y + h - 1, color, w);
    this.drawVerticalLine(x, y, color, h);
    this.drawVerticalLine(x + w - 1, y, color, h);
  }
  static drawHorizontalLine(x, y, color, width) {
    if (y < this.top || y >= this.bottom) {
      return;
    }
    if (x < this.left) {
      width -= this.left - x;
      x = this.left;
    }
    if (x + width > this.right) {
      width = this.right - x;
    }
    const off = x + y * this.width2d;
    for (let i = 0;i < width; i++) {
      this.pixels[off + i] = color;
    }
  }
  static drawVerticalLine(x, y, color, width) {
    if (x < this.left || x >= this.right) {
      return;
    }
    if (y < this.top) {
      width -= this.top - y;
      y = this.top;
    }
    if (y + width > this.bottom) {
      width = this.bottom - y;
    }
    const off = x + y * this.width2d;
    for (let i = 0;i < width; i++) {
      this.pixels[off + i * this.width2d] = color;
    }
  }
  static drawLine(x1, y1, x2, y2, color) {
    const dx = Math.abs(x2 - x1);
    const dy = Math.abs(y2 - y1);
    const sx = x1 < x2 ? 1 : -1;
    const sy = y1 < y2 ? 1 : -1;
    let err = dx - dy;
    while (true) {
      if (x1 >= this.left && x1 < this.right && y1 >= this.top && y1 < this.bottom) {
        this.pixels[x1 + y1 * this.width2d] = color;
      }
      if (x1 === x2 && y1 === y2) {
        break;
      }
      const e2 = 2 * err;
      if (e2 > -dy) {
        err = err - dy;
        x1 = x1 + sx;
      }
      if (e2 < dx) {
        err = err + dx;
        y1 = y1 + sy;
      }
    }
  }
  static fillRect2d(x, y, width, height, color) {
    if (x < this.left) {
      width -= this.left - x;
      x = this.left;
    }
    if (y < this.top) {
      height -= this.top - y;
      y = this.top;
    }
    if (x + width > this.right) {
      width = this.right - x;
    }
    if (y + height > this.bottom) {
      height = this.bottom - y;
    }
    const step = this.width2d - width;
    let offset = x + y * this.width2d;
    for (let i = -height;i < 0; i++) {
      for (let j = -width;j < 0; j++) {
        this.pixels[offset++] = color;
      }
      offset += step;
    }
  }
  static fillRectAlpha(x, y, width, height, rgb, alpha) {
    if (x < this.left) {
      width -= this.left - x;
      x = this.left;
    }
    if (y < this.top) {
      height -= this.top - y;
      y = this.top;
    }
    if (x + width > this.right) {
      width = this.right - x;
    }
    if (y + height > this.bottom) {
      height = this.bottom - y;
    }
    const invAlpha = 256 - alpha;
    const r0 = (rgb >> 16 & 255) * alpha;
    const g0 = (rgb >> 8 & 255) * alpha;
    const b0 = (rgb & 255) * alpha;
    const step = this.width2d - width;
    let offset = x + y * this.width2d;
    for (let i = 0;i < height; i++) {
      for (let j = -width;j < 0; j++) {
        const r1 = (this.pixels[offset] >> 16 & 255) * invAlpha;
        const g1 = (this.pixels[offset] >> 8 & 255) * invAlpha;
        const b1 = (this.pixels[offset] & 255) * invAlpha;
        const color = (r0 + r1 >> 8 << 16) + (g0 + g1 >> 8 << 8) + (b0 + b1 >> 8);
        this.pixels[offset++] = color;
      }
      offset += step;
    }
  }
  static fillCircle(xCenter, yCenter, yRadius, rgb, alpha) {
    const invAlpha = 256 - alpha;
    const r0 = (rgb >> 16 & 255) * alpha;
    const g0 = (rgb >> 8 & 255) * alpha;
    const b0 = (rgb & 255) * alpha;
    let yStart = yCenter - yRadius;
    if (yStart < 0) {
      yStart = 0;
    }
    let yEnd = yCenter + yRadius;
    if (yEnd >= this.height2d) {
      yEnd = this.height2d - 1;
    }
    for (let y = yStart;y <= yEnd; y++) {
      const midpoint = y - yCenter;
      const xRadius = Math.sqrt(yRadius * yRadius - midpoint * midpoint) | 0;
      let xStart = xCenter - xRadius;
      if (xStart < 0) {
        xStart = 0;
      }
      let xEnd = xCenter + xRadius;
      if (xEnd >= this.width2d) {
        xEnd = this.width2d - 1;
      }
      let offset = xStart + y * this.width2d;
      for (let x = xStart;x <= xEnd; x++) {
        const r1 = (this.pixels[offset] >> 16 & 255) * invAlpha;
        const g1 = (this.pixels[offset] >> 8 & 255) * invAlpha;
        const b1 = (this.pixels[offset] & 255) * invAlpha;
        const color = (r0 + r1 >> 8 << 16) + (g0 + g1 >> 8 << 8) + (b0 + b1 >> 8);
        this.pixels[offset++] = color;
      }
    }
  }
  static setPixel(x, y, color) {
    if (x < this.left || x >= this.right || y < this.top || y >= this.bottom) {
      return;
    }
    this.pixels[x + y * this.width2d] = color;
  }
}

// src/datastruct/LinkList.ts
class LinkList {
  sentinel = new Linkable;
  current = null;
  constructor() {
    this.sentinel.next = this.sentinel;
    this.sentinel.prev = this.sentinel;
  }
  addTail(node) {
    if (node.prev) {
      node.unlink();
    }
    node.prev = this.sentinel.prev;
    node.next = this.sentinel;
    if (node.prev) {
      node.prev.next = node;
    }
    node.next.prev = node;
  }
  addHead(node) {
    if (node.prev) {
      node.unlink();
    }
    node.prev = this.sentinel;
    node.next = this.sentinel.next;
    node.prev.next = node;
    if (node.next) {
      node.next.prev = node;
    }
  }
  removeHead() {
    const node = this.sentinel.next;
    if (node === this.sentinel) {
      return null;
    }
    node?.unlink();
    return node;
  }
  head() {
    const node = this.sentinel.next;
    if (node === this.sentinel) {
      this.current = null;
      return null;
    }
    this.current = node?.next || null;
    return node;
  }
  tail() {
    const node = this.sentinel.prev;
    if (node === this.sentinel) {
      this.current = null;
      return null;
    }
    this.current = node?.prev || null;
    return node;
  }
  next() {
    const node = this.current;
    if (node === this.sentinel) {
      this.current = null;
      return null;
    }
    this.current = node?.next || null;
    return node;
  }
  prev() {
    const node = this.current;
    if (node === this.sentinel) {
      this.current = null;
      return null;
    }
    this.current = node?.prev || null;
    return node;
  }
  clear() {
    while (true) {
      const node = this.sentinel.next;
      if (node === this.sentinel) {
        return;
      }
      node?.unlink();
    }
  }
}

// src/util/JsUtil.ts
var sleep = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));
var downloadUrl = async (url) => new Uint8Array(await (await fetch(url)).arrayBuffer());
function bytesToBigInt(bytes) {
  let result = 0n;
  for (let index = 0;index < bytes.length; index++) {
    result = result << 8n | BigInt(bytes[index]);
  }
  return result;
}
function bigIntToBytes(bigInt) {
  const bytes = [];
  while (bigInt > 0n) {
    bytes.unshift(Number(bigInt & 0xffn));
    bigInt >>= 8n;
  }
  if (bytes[0] & 128) {
    bytes.unshift(0);
  }
  return new Uint8Array(bytes);
}
function bigIntModPow(base, exponent, modulus) {
  let result = 1n;
  while (exponent > 0n) {
    if (exponent % 2n === 1n) {
      result = result * base % modulus;
    }
    base = base * base % modulus;
    exponent >>= 1n;
  }
  return result;
}

// src/io/Packet.ts
class Packet extends DoublyLinkable {
  static CRC32_POLYNOMIAL = 3988292384;
  static crctable = new Int32Array(256);
  static bitmask = new Uint32Array(33);
  static cacheMin = new LinkList;
  static cacheMid = new LinkList;
  static cacheMax = new LinkList;
  static cacheMinCount = 0;
  static cacheMidCount = 0;
  static cacheMaxCount = 0;
  static {
    for (let i = 0;i < 32; i++) {
      Packet.bitmask[i] = (1 << i) - 1;
    }
    Packet.bitmask[32] = 4294967295;
    for (let i = 0;i < 256; i++) {
      let remainder = i;
      for (let bit = 0;bit < 8; bit++) {
        if ((remainder & 1) === 1) {
          remainder = remainder >>> 1 ^ Packet.CRC32_POLYNOMIAL;
        } else {
          remainder >>>= 1;
        }
      }
      Packet.crctable[i] = remainder;
    }
  }
  static crc32(src) {
    let crc = 4294967295;
    for (let i = 0;i < src.length; i++) {
      crc = crc >>> 8 ^ Packet.crctable[(crc ^ src[i]) & 255];
    }
    return ~crc;
  }
  view;
  data;
  pos = 0;
  bitPos = 0;
  random = null;
  constructor(src) {
    if (!src) {
      throw new Error;
    }
    super();
    if (src instanceof Int8Array) {
      this.data = new Uint8Array(src);
    } else {
      this.data = src;
    }
    this.view = new DataView(this.data.buffer, this.data.byteOffset, this.data.byteLength);
  }
  get length() {
    return this.view.byteLength;
  }
  get available() {
    return this.length - this.pos;
  }
  static alloc(type) {
    let cached = null;
    if (type === 0 && Packet.cacheMinCount > 0) {
      Packet.cacheMinCount--;
      cached = Packet.cacheMin.removeHead();
    } else if (type === 1 && Packet.cacheMidCount > 0) {
      Packet.cacheMidCount--;
      cached = Packet.cacheMid.removeHead();
    } else if (type === 2 && Packet.cacheMaxCount > 0) {
      Packet.cacheMaxCount--;
      cached = Packet.cacheMax.removeHead();
    }
    if (cached) {
      cached.pos = 0;
      return cached;
    }
    if (type === 0) {
      return new Packet(new Uint8Array(100));
    } else if (type === 1) {
      return new Packet(new Uint8Array(5000));
    }
    return new Packet(new Uint8Array(30000));
  }
  release() {
    this.pos = 0;
    if (this.view.byteLength === 100 && Packet.cacheMinCount < 1000) {
      Packet.cacheMin.addTail(this);
      Packet.cacheMinCount++;
    } else if (this.view.byteLength === 5000 && Packet.cacheMidCount < 250) {
      Packet.cacheMid.addTail(this);
      Packet.cacheMidCount++;
    } else if (this.view.byteLength === 30000 && Packet.cacheMaxCount < 50) {
      Packet.cacheMax.addTail(this);
      Packet.cacheMaxCount++;
    }
  }
  g1() {
    return this.view.getUint8(this.pos++);
  }
  g1b() {
    return this.view.getInt8(this.pos++);
  }
  g2() {
    const result = this.view.getUint16(this.pos);
    this.pos += 2;
    return result;
  }
  g2b() {
    const result = this.view.getInt16(this.pos);
    this.pos += 2;
    return result;
  }
  g3() {
    const result = this.view.getUint8(this.pos++) << 16 | this.view.getUint16(this.pos);
    this.pos += 2;
    return result;
  }
  g4() {
    const result = this.view.getInt32(this.pos);
    this.pos += 4;
    return result;
  }
  g8() {
    const result = this.view.getBigInt64(this.pos);
    this.pos += 8;
    return result;
  }
  gsmart() {
    return this.view.getUint8(this.pos) < 128 ? this.g1() - 64 : this.g2() - 49152;
  }
  gsmarts() {
    return this.view.getUint8(this.pos) < 128 ? this.g1() : this.g2() - 32768;
  }
  gjstr() {
    const view = this.view;
    const length = view.byteLength;
    let str = "";
    let b;
    while ((b = view.getUint8(this.pos++)) !== 10 && this.pos < length) {
      str += String.fromCharCode(b);
    }
    return str;
  }
  gdata(length, offset, dest) {
    dest.set(this.data.subarray(this.pos, this.pos + length), offset);
    this.pos += length;
  }
  p1isaac(opcode) {
    this.view.setUint8(this.pos++, opcode + (this.random?.nextInt ?? 0) & 255);
  }
  p1(value) {
    this.view.setUint8(this.pos++, value);
  }
  p2(value) {
    this.view.setUint16(this.pos, value);
    this.pos += 2;
  }
  ip2(value) {
    this.view.setUint16(this.pos, value, true);
    this.pos += 2;
  }
  p3(value) {
    this.view.setUint8(this.pos++, value >> 16);
    this.view.setUint16(this.pos, value);
    this.pos += 2;
  }
  p4(value) {
    this.view.setInt32(this.pos, value);
    this.pos += 4;
  }
  ip4(value) {
    this.view.setInt32(this.pos, value, true);
    this.pos += 4;
  }
  p8(value) {
    this.view.setBigInt64(this.pos, value);
    this.pos += 8;
  }
  pjstr(str) {
    const view = this.view;
    const length = str.length;
    for (let i = 0;i < length; i++) {
      view.setUint8(this.pos++, str.charCodeAt(i));
    }
    view.setUint8(this.pos++, 10);
  }
  pdata(src, length, offset) {
    this.data.set(src.subarray(offset, offset + length), this.pos);
    this.pos += length - offset;
  }
  psize1(size) {
    this.view.setUint8(this.pos - size - 1, size);
  }
  bits() {
    this.bitPos = this.pos << 3;
  }
  bytes() {
    this.pos = this.bitPos + 7 >>> 3;
  }
  gBit(n) {
    let bytePos = this.bitPos >>> 3;
    let remaining = 8 - (this.bitPos & 7);
    let value = 0;
    this.bitPos += n;
    for (;n > remaining; remaining = 8) {
      value += (this.view.getUint8(bytePos++) & Packet.bitmask[remaining]) << n - remaining;
      n -= remaining;
    }
    if (n === remaining) {
      value += this.view.getUint8(bytePos) & Packet.bitmask[remaining];
    } else {
      value += this.view.getUint8(bytePos) >>> remaining - n & Packet.bitmask[n];
    }
    return value;
  }
  rsaenc(mod, exp) {
    const length = this.pos;
    this.pos = 0;
    const temp = new Uint8Array(length);
    this.gdata(length, 0, temp);
    const bigRaw = bytesToBigInt(temp);
    const bigEnc = bigIntModPow(bigRaw, exp, mod);
    const rawEnc = bigIntToBytes(bigEnc);
    this.pos = 0;
    this.p1(rawEnc.length);
    this.pdata(rawEnc, rawEnc.length, 0);
  }
}

// src/graphics/Pix8.ts
class Pix8 extends DoublyLinkable {
  pixels;
  width2d;
  height2d;
  cropX;
  cropY;
  cropW;
  cropH;
  rgbPal;
  constructor(width, height, palette) {
    super();
    this.pixels = new Int8Array(width * height);
    this.width2d = this.cropW = width;
    this.height2d = this.cropH = height;
    this.cropX = this.cropY = 0;
    this.rgbPal = palette;
  }
  static fromArchive(archive, name, sprite = 0) {
    const dat = new Packet(archive.read(name + ".dat"));
    const index = new Packet(archive.read("index.dat"));
    index.pos = dat.g2();
    const cropW = index.g2();
    const cropH = index.g2();
    const paletteCount = index.g1();
    const palette = new Int32Array(paletteCount);
    for (let i = 1;i < paletteCount; i++) {
      palette[i] = index.g3();
      if (palette[i] === 0) {
        palette[i] = 1;
      }
    }
    for (let i = 0;i < sprite; i++) {
      index.pos += 2;
      dat.pos += index.g2() * index.g2();
      index.pos += 1;
    }
    if (dat.pos > dat.length || index.pos > index.length) {
      throw new Error;
    }
    const cropX = index.g1();
    const cropY = index.g1();
    const width = index.g2();
    const height = index.g2();
    const image = new Pix8(width, height, palette);
    image.cropX = cropX;
    image.cropY = cropY;
    image.cropW = cropW;
    image.cropH = cropH;
    const pixels = image.pixels;
    const pixelOrder = index.g1();
    if (pixelOrder === 0) {
      const length = image.width2d * image.height2d;
      for (let i = 0;i < length; i++) {
        pixels[i] = dat.g1b();
      }
    } else if (pixelOrder === 1) {
      const width2 = image.width2d;
      const height2 = image.height2d;
      for (let x = 0;x < width2; x++) {
        for (let y = 0;y < height2; y++) {
          pixels[x + y * width2] = dat.g1b();
        }
      }
    }
    return image;
  }
  draw(x, y) {
    x |= 0;
    y |= 0;
    x += this.cropX;
    y += this.cropY;
    let dstOff = x + y * Pix2D.width2d;
    let srcOff = 0;
    let h = this.height2d;
    let w = this.width2d;
    let dstStep = Pix2D.width2d - w;
    let srcStep = 0;
    if (y < Pix2D.top) {
      const cutoff = Pix2D.top - y;
      h -= cutoff;
      y = Pix2D.top;
      srcOff += cutoff * w;
      dstOff += cutoff * Pix2D.width2d;
    }
    if (y + h > Pix2D.bottom) {
      h -= y + h - Pix2D.bottom;
    }
    if (x < Pix2D.left) {
      const cutoff = Pix2D.left - x;
      w -= cutoff;
      x = Pix2D.left;
      srcOff += cutoff;
      dstOff += cutoff;
      srcStep += cutoff;
      dstStep += cutoff;
    }
    if (x + w > Pix2D.right) {
      const cutoff = x + w - Pix2D.right;
      w -= cutoff;
      srcStep += cutoff;
      dstStep += cutoff;
    }
    if (w > 0 && h > 0) {
      this.copyImage(w, h, this.pixels, srcOff, srcStep, Pix2D.pixels, dstOff, dstStep);
    }
  }
  flipHorizontally() {
    const pixels = this.pixels;
    const width = this.width2d;
    const height = this.height2d;
    for (let y = 0;y < height; y++) {
      const div = width / 2 | 0;
      for (let x = 0;x < div; x++) {
        const off1 = x + y * width;
        const off2 = width - x - 1 + y * width;
        const tmp = pixels[off1];
        pixels[off1] = pixels[off2];
        pixels[off2] = tmp;
      }
    }
  }
  flipVertically() {
    const pixels = this.pixels;
    const width = this.width2d;
    const height = this.height2d;
    for (let y = 0;y < (height / 2 | 0); y++) {
      for (let x = 0;x < width; x++) {
        const off1 = x + y * width;
        const off2 = x + (height - y - 1) * width;
        const tmp = pixels[off1];
        pixels[off1] = pixels[off2];
        pixels[off2] = tmp;
      }
    }
  }
  translate2d(r, g, b) {
    for (let i = 0;i < this.rgbPal.length; i++) {
      let red = this.rgbPal[i] >> 16 & 255;
      red += r;
      if (red < 0) {
        red = 0;
      } else if (red > 255) {
        red = 255;
      }
      let green = this.rgbPal[i] >> 8 & 255;
      green += g;
      if (green < 0) {
        green = 0;
      } else if (green > 255) {
        green = 255;
      }
      let blue = this.rgbPal[i] & 255;
      blue += b;
      if (blue < 0) {
        blue = 0;
      } else if (blue > 255) {
        blue = 255;
      }
      this.rgbPal[i] = (red << 16) + (green << 8) + blue;
    }
  }
  shrink() {
    this.cropW |= 0;
    this.cropH |= 0;
    this.cropW /= 2;
    this.cropH /= 2;
    this.cropW |= 0;
    this.cropH |= 0;
    const pixels = new Int8Array(this.cropW * this.cropH);
    let off = 0;
    for (let y = 0;y < this.height2d; y++) {
      for (let x = 0;x < this.width2d; x++) {
        pixels[(x + this.cropX >> 1) + (y + this.cropY >> 1) * this.cropW] = this.pixels[off++];
      }
    }
    this.pixels = pixels;
    this.width2d = this.cropW;
    this.height2d = this.cropH;
    this.cropX = 0;
    this.cropY = 0;
  }
  crop() {
    if (this.width2d === this.cropW && this.height2d === this.cropH) {
      return;
    }
    const pixels = new Int8Array(this.cropW * this.cropH);
    let off = 0;
    for (let y = 0;y < this.height2d; y++) {
      for (let x = 0;x < this.width2d; x++) {
        pixels[x + this.cropX + (y + this.cropY) * this.cropW] = this.pixels[off++];
      }
    }
    this.pixels = pixels;
    this.width2d = this.cropW;
    this.height2d = this.cropH;
    this.cropX = 0;
    this.cropY = 0;
  }
  copyImage(w, h, src, srcOff, srcStep, dst, dstOff, dstStep) {
    const qw = -(w >> 2);
    w = -(w & 3);
    for (let y = -h;y < 0; y++) {
      for (let x = qw;x < 0; x++) {
        let palIndex = src[srcOff++];
        if (palIndex === 0) {
          dstOff++;
        } else {
          dst[dstOff++] = this.rgbPal[palIndex & 255];
        }
        palIndex = src[srcOff++];
        if (palIndex === 0) {
          dstOff++;
        } else {
          dst[dstOff++] = this.rgbPal[palIndex & 255];
        }
        palIndex = src[srcOff++];
        if (palIndex === 0) {
          dstOff++;
        } else {
          dst[dstOff++] = this.rgbPal[palIndex & 255];
        }
        palIndex = src[srcOff++];
        if (palIndex === 0) {
          dstOff++;
        } else {
          dst[dstOff++] = this.rgbPal[palIndex & 255];
        }
      }
      for (let x = w;x < 0; x++) {
        const palIndex = src[srcOff++];
        if (palIndex === 0) {
          dstOff++;
        } else {
          dst[dstOff++] = this.rgbPal[palIndex & 255];
        }
      }
      dstOff += dstStep;
      srcOff += srcStep;
    }
  }
  clip(arg0, arg1, arg2, arg3) {
    try {
      const local2 = this.width2d;
      const local5 = this.height2d;
      let local7 = 0;
      let local9 = 0;
      const local15 = (local2 << 16) / arg2 | 0;
      const local21 = (local5 << 16) / arg3 | 0;
      const local24 = this.cropW;
      const local27 = this.cropH;
      const local33 = (local24 << 16) / arg2 | 0;
      const local39 = (local27 << 16) / arg3 | 0;
      arg0 = arg0 + (this.cropX * arg2 + local24 - 1) / local24 | 0;
      arg1 = arg1 + (this.cropY * arg3 + local27 - 1) / local27 | 0;
      if (this.cropX * arg2 % local24 != 0) {
        local7 = (local24 - this.cropX * arg2 % local24 << 16) / arg2 | 0;
      }
      if (this.cropY * arg3 % local27 != 0) {
        local9 = (local27 - this.cropY * arg3 % local27 << 16) / arg3 | 0;
      }
      arg2 = arg2 * (this.width2d - (local7 >> 16)) / local24 | 0;
      arg3 = arg3 * (this.height2d - (local9 >> 16)) / local27 | 0;
      let local133 = arg0 + arg1 * Pix2D.width2d;
      let local137 = Pix2D.width2d - arg2;
      let local144;
      if (arg1 < Pix2D.top) {
        local144 = Pix2D.top - arg1;
        arg3 -= local144;
        arg1 = 0;
        local133 += local144 * Pix2D.width2d;
        local9 += local39 * local144;
      }
      if (arg1 + arg3 > Pix2D.bottom) {
        arg3 -= arg1 + arg3 - Pix2D.bottom;
      }
      if (arg0 < Pix2D.left) {
        local144 = Pix2D.left - arg0;
        arg2 -= local144;
        arg0 = 0;
        local133 += local144;
        local7 += local33 * local144;
        local137 += local144;
      }
      if (arg0 + arg2 > Pix2D.right) {
        local144 = arg0 + arg2 - Pix2D.right;
        arg2 -= local144;
        local137 += local144;
      }
      this.plot_scale(Pix2D.pixels, this.pixels, this.rgbPal, local7, local9, local133, local137, arg2, arg3, local33, local39, local2);
    } catch (ignore) {
      console.log("error in sprite clipping routine");
    }
  }
  plot_scale(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
    try {
      const local3 = arg3;
      for (let local6 = -arg8;local6 < 0; local6++) {
        const local14 = (arg4 >> 16) * arg11;
        for (let local17 = -arg7;local17 < 0; local17++) {
          const local27 = arg1[(arg3 >> 16) + local14];
          if (local27 == 0) {
            arg5++;
          } else {
            arg0[arg5++] = arg2[local27 & 255];
          }
          arg3 += arg9;
        }
        arg4 += arg10;
        arg3 = local3;
        arg5 += arg6;
      }
    } catch (ignore) {
      console.log("error in plot_scale");
    }
  }
}

// src/graphics/renderer/Renderer.ts
class Renderer {
  canvas;
  static renderer;
  constructor(canvas2) {
    this.canvas = canvas2;
  }
  static resetRenderer() {
    if (Renderer.renderer) {
      Renderer.renderer.destroy();
      Renderer.renderer.canvas.remove();
      Renderer.renderer = undefined;
    }
  }
  static resize(width, height) {
    Renderer.renderer?.resize(width, height);
  }
  static startFrame() {
    Renderer.renderer?.startFrame();
  }
  static endFrame() {
    Renderer.renderer?.endFrame();
  }
  static updateTexture(id) {
    Renderer.renderer?.updateTexture(id);
  }
  static setBrightness(brightness) {
    Renderer.renderer?.setBrightness(brightness);
  }
  static renderPixMap(pixmap, x, y) {
    if (Renderer.renderer) {
      return Renderer.renderer.renderPixMap(pixmap, x, y);
    }
    return false;
  }
  static getSceneClearColor() {
    if (Renderer.renderer) {
      return -1;
    }
    return 0;
  }
  static startRenderScene() {
    Renderer.renderer?.startRenderScene();
  }
  static endRenderScene() {
    Renderer.renderer?.endRenderScene();
  }
  static fillTriangle(x0, x1, x2, y0, y1, y2, color) {
    if (Renderer.renderer) {
      return Renderer.renderer.fillTriangle(x0, x1, x2, y0, y1, y2, color);
    }
    return false;
  }
  static fillGouraudTriangle(xA, xB, xC, yA, yB, yC, colorA, colorB, colorC) {
    if (Renderer.renderer) {
      return Renderer.renderer.fillGouraudTriangle(xA, xB, xC, yA, yB, yC, colorA, colorB, colorC);
    }
    return false;
  }
  static fillTexturedTriangle(xA, xB, xC, yA, yB, yC, shadeA, shadeB, shadeC, originX, originY, originZ, txB, txC, tyB, tyC, tzB, tzC, texture) {
    if (Renderer.renderer) {
      return Renderer.renderer.fillTexturedTriangle(xA, xB, xC, yA, yB, yC, shadeA, shadeB, shadeC, originX, originY, originZ, txB, txC, tyB, tyC, tzB, tzC, texture);
    }
    return false;
  }
  static drawTileUnderlay(world, underlay, level, tileX, tileZ) {
    if (Renderer.renderer) {
      return Renderer.renderer.drawTileUnderlay(world, underlay, level, tileX, tileZ);
    }
    return false;
  }
  static drawTileOverlay(world, overlay, tileX, tileZ) {
    if (Renderer.renderer) {
      return Renderer.renderer.drawTileOverlay(world, overlay, tileX, tileZ);
    }
    return false;
  }
  static startDrawModel(model, yaw, relativeX, relativeY, relativeZ, bitset) {
    if (Renderer.renderer) {
      Renderer.renderer.startDrawModel(model, yaw, relativeX, relativeY, relativeZ, bitset);
    }
  }
  static endDrawModel(model, yaw, relativeX, relativeY, relativeZ, bitset) {
    if (Renderer.renderer) {
      Renderer.renderer.endDrawModel(model, yaw, relativeX, relativeY, relativeZ, bitset);
    }
  }
  static drawModelTriangle(model, index) {
    if (Renderer.renderer) {
      return Renderer.renderer.drawModelTriangle(model, index);
    }
    return false;
  }
  resize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
  }
}

// src/util/Arrays.ts
class TypedArray1d extends Array {
  constructor(length, defaultValue) {
    super(length);
    for (let l = 0;l < length; l++) {
      this[l] = defaultValue;
    }
  }
}

class TypedArray2d extends Array {
  constructor(length, width, defaultValue) {
    super(length);
    for (let l = 0;l < length; l++) {
      this[l] = new Array(width);
      for (let w = 0;w < width; w++) {
        this[l][w] = defaultValue;
      }
    }
  }
}
class Int32Array2d extends Array {
  constructor(length, width) {
    super(length);
    for (let l = 0;l < length; l++) {
      this[l] = new Int32Array(width);
    }
  }
}

// src/graphics/Pix3D.ts
class Pix3D extends Pix2D {
  static lowMemory = false;
  static reciprocal15 = new Int32Array(512);
  static reciprocal16 = new Int32Array(2048);
  static sin = new Int32Array(2048);
  static cos = new Int32Array(2048);
  static hslPal = new Int32Array(65536);
  static textures = new TypedArray1d(50, null);
  static textureCount = 0;
  static lineOffset = new Int32Array;
  static centerX = 0;
  static centerY = 0;
  static jagged = true;
  static clipX = false;
  static alpha = 0;
  static texelPool = null;
  static activeTexels = new TypedArray1d(50, null);
  static poolSize = 0;
  static cycle = 0;
  static textureCycle = new Int32Array(50);
  static texPal = new TypedArray1d(50, null);
  static opaque = false;
  static textureTranslucent = new TypedArray1d(50, false);
  static averageTextureRGB = new Int32Array(50);
  static {
    for (let i = 1;i < 512; i++) {
      this.reciprocal15[i] = 32768 / i | 0;
    }
    for (let i = 1;i < 2048; i++) {
      this.reciprocal16[i] = 65536 / i | 0;
    }
    for (let i = 0;i < 2048; i++) {
      this.sin[i] = Math.sin(i * 0.0030679615757712823) * 65536 | 0;
      this.cos[i] = Math.cos(i * 0.0030679615757712823) * 65536 | 0;
    }
  }
  static init2D() {
    this.lineOffset = new Int32Array(Pix2D.height2d);
    for (let y = 0;y < Pix2D.height2d; y++) {
      this.lineOffset[y] = Pix2D.width2d * y;
    }
    this.centerX = Pix2D.width2d / 2 | 0;
    this.centerY = Pix2D.height2d / 2 | 0;
  }
  static init3D(width, height) {
    this.lineOffset = new Int32Array(height);
    for (let y = 0;y < height; y++) {
      this.lineOffset[y] = width * y;
    }
    this.centerX = width / 2 | 0;
    this.centerY = height / 2 | 0;
  }
  static clearTexels() {
    this.texelPool = null;
    this.activeTexels.fill(null);
  }
  static unpackTextures(textures) {
    this.textureCount = 0;
    for (let i = 0;i < 50; i++) {
      try {
        this.textures[i] = Pix8.fromArchive(textures, i.toString());
        if (this.lowMemory && this.textures[i]?.cropW === 128) {
          this.textures[i]?.shrink();
        } else {
          this.textures[i]?.crop();
        }
        this.textureCount++;
      } catch (err) {}
    }
  }
  static getAverageTextureRGB(id) {
    if (this.averageTextureRGB[id] !== 0) {
      return this.averageTextureRGB[id];
    }
    const palette = this.texPal[id];
    if (!palette) {
      return 0;
    }
    let r = 0;
    let g = 0;
    let b = 0;
    const length = palette.length;
    for (let i = 0;i < length; i++) {
      r += palette[i] >> 16 & 255;
      g += palette[i] >> 8 & 255;
      b += palette[i] & 255;
    }
    let rgb = ((r / length | 0) << 16) + ((g / length | 0) << 8) + (b / length | 0);
    rgb = this.setGamma(rgb, 1.4);
    if (rgb === 0) {
      rgb = 1;
    }
    this.averageTextureRGB[id] = rgb;
    return rgb;
  }
  static setBrightness(brightness) {
    const randomBrightness = brightness + Math.random() * 0.03 - 0.015;
    let offset = 0;
    for (let y = 0;y < 512; y++) {
      const hue = (y / 8 | 0) / 64 + 0.0078125;
      const saturation = (y & 7) / 8 + 0.0625;
      for (let x = 0;x < 128; x++) {
        const lightness = x / 128;
        let r = lightness;
        let g = lightness;
        let b = lightness;
        if (saturation !== 0) {
          let q;
          if (lightness < 0.5) {
            q = lightness * (saturation + 1);
          } else {
            q = lightness + saturation - lightness * saturation;
          }
          const p = lightness * 2 - q;
          let t = hue + 0.3333333333333333;
          if (t > 1) {
            t--;
          }
          let d11 = hue - 0.3333333333333333;
          if (d11 < 0) {
            d11++;
          }
          if (t * 6 < 1) {
            r = p + (q - p) * 6 * t;
          } else if (t * 2 < 1) {
            r = q;
          } else if (t * 3 < 2) {
            r = p + (q - p) * (0.6666666666666666 - t) * 6;
          } else {
            r = p;
          }
          if (hue * 6 < 1) {
            g = p + (q - p) * 6 * hue;
          } else if (hue * 2 < 1) {
            g = q;
          } else if (hue * 3 < 2) {
            g = p + (q - p) * (0.6666666666666666 - hue) * 6;
          } else {
            g = p;
          }
          if (d11 * 6 < 1) {
            b = p + (q - p) * 6 * d11;
          } else if (d11 * 2 < 1) {
            b = q;
          } else if (d11 * 3 < 2) {
            b = p + (q - p) * (0.6666666666666666 - d11) * 6;
          } else {
            b = p;
          }
        }
        const intR = r * 256 | 0;
        const intG = g * 256 | 0;
        const intB = b * 256 | 0;
        const rgb = (intR << 16) + (intG << 8) + intB;
        this.hslPal[offset++] = this.setGamma(rgb, randomBrightness);
      }
    }
    for (let id = 0;id < 50; id++) {
      const texture = this.textures[id];
      if (!texture) {
        continue;
      }
      const palette = texture.rgbPal;
      this.texPal[id] = new Int32Array(palette.length);
      for (let i = 0;i < palette.length; i++) {
        const texturePalette = this.texPal[id];
        if (!texturePalette) {
          continue;
        }
        texturePalette[i] = this.setGamma(palette[i], randomBrightness);
      }
    }
    for (let id = 0;id < 50; id++) {
      this.pushTexture(id);
    }
    Renderer.setBrightness(randomBrightness);
  }
  static setGamma(rgb, gamma) {
    const r = (rgb >> 16) / 256;
    const g = (rgb >> 8 & 255) / 256;
    const b = (rgb & 255) / 256;
    const powR = Math.pow(r, gamma);
    const powG = Math.pow(g, gamma);
    const powB = Math.pow(b, gamma);
    const intR = powR * 256 | 0;
    const intG = powG * 256 | 0;
    const intB = powB * 256 | 0;
    return (intR << 16) + (intG << 8) + intB;
  }
  static initPool(size) {
    if (this.texelPool) {
      return;
    }
    this.poolSize = size;
    if (this.lowMemory) {
      this.texelPool = new Int32Array2d(size, 16384);
    } else {
      this.texelPool = new Int32Array2d(size, 65536);
    }
    this.activeTexels.fill(null);
  }
  static fillGouraudTriangle(xA, xB, xC, yA, yB, yC, colorA, colorB, colorC) {
    if (Renderer.fillGouraudTriangle(xA, xB, xC, yA, yB, yC, colorA, colorB, colorC)) {
      return;
    }
    let xStepAB = 0;
    let colorStepAB = 0;
    if (yB !== yA) {
      xStepAB = (xB - xA << 16) / (yB - yA) | 0;
      colorStepAB = (colorB - colorA << 15) / (yB - yA) | 0;
    }
    let xStepBC = 0;
    let colorStepBC = 0;
    if (yC !== yB) {
      xStepBC = (xC - xB << 16) / (yC - yB) | 0;
      colorStepBC = (colorC - colorB << 15) / (yC - yB) | 0;
    }
    let xStepAC = 0;
    let colorStepAC = 0;
    if (yC !== yA) {
      xStepAC = (xA - xC << 16) / (yA - yC) | 0;
      colorStepAC = (colorA - colorC << 15) / (yA - yC) | 0;
    }
    if (yA <= yB && yA <= yC) {
      if (yA < Pix2D.bottom) {
        if (yB > Pix2D.bottom) {
          yB = Pix2D.bottom;
        }
        if (yC > Pix2D.bottom) {
          yC = Pix2D.bottom;
        }
        if (yB < yC) {
          xC = xA <<= 16;
          colorC = colorA <<= 15;
          if (yA < 0) {
            xC -= xStepAC * yA;
            xA -= xStepAB * yA;
            colorC -= colorStepAC * yA;
            colorA -= colorStepAB * yA;
            yA = 0;
          }
          xB <<= 16;
          colorB <<= 15;
          if (yB < 0) {
            xB -= xStepBC * yB;
            colorB -= colorStepBC * yB;
            yB = 0;
          }
          if (yA !== yB && xStepAC < xStepAB || yA === yB && xStepAC > xStepBC) {
            yC -= yB;
            yB -= yA;
            yA = Pix3D.lineOffset[yA];
            while (true) {
              yB--;
              if (yB < 0) {
                while (true) {
                  yC--;
                  if (yC < 0) {
                    return;
                  }
                  this.drawGouraudScanline(xC >> 16, xB >> 16, colorC >> 7, colorB >> 7, Pix2D.pixels, yA, 0);
                  xC += xStepAC;
                  xB += xStepBC;
                  colorC += colorStepAC;
                  colorB += colorStepBC;
                  yA += Pix2D.width2d;
                }
              }
              this.drawGouraudScanline(xC >> 16, xA >> 16, colorC >> 7, colorA >> 7, Pix2D.pixels, yA, 0);
              xC += xStepAC;
              xA += xStepAB;
              colorC += colorStepAC;
              colorA += colorStepAB;
              yA += Pix2D.width2d;
            }
          } else {
            yC -= yB;
            yB -= yA;
            yA = Pix3D.lineOffset[yA];
            while (true) {
              yB--;
              if (yB < 0) {
                while (true) {
                  yC--;
                  if (yC < 0) {
                    return;
                  }
                  this.drawGouraudScanline(xB >> 16, xC >> 16, colorB >> 7, colorC >> 7, Pix2D.pixels, yA, 0);
                  xC += xStepAC;
                  xB += xStepBC;
                  colorC += colorStepAC;
                  colorB += colorStepBC;
                  yA += Pix2D.width2d;
                }
              }
              this.drawGouraudScanline(xA >> 16, xC >> 16, colorA >> 7, colorC >> 7, Pix2D.pixels, yA, 0);
              xC += xStepAC;
              xA += xStepAB;
              colorC += colorStepAC;
              colorA += colorStepAB;
              yA += Pix2D.width2d;
            }
          }
        } else {
          xB = xA <<= 16;
          colorB = colorA <<= 15;
          if (yA < 0) {
            xB -= xStepAC * yA;
            xA -= xStepAB * yA;
            colorB -= colorStepAC * yA;
            colorA -= colorStepAB * yA;
            yA = 0;
          }
          xC <<= 16;
          colorC <<= 15;
          if (yC < 0) {
            xC -= xStepBC * yC;
            colorC -= colorStepBC * yC;
            yC = 0;
          }
          if (yA !== yC && xStepAC < xStepAB || yA === yC && xStepBC > xStepAB) {
            yB -= yC;
            yC -= yA;
            yA = Pix3D.lineOffset[yA];
            while (true) {
              yC--;
              if (yC < 0) {
                while (true) {
                  yB--;
                  if (yB < 0) {
                    return;
                  }
                  this.drawGouraudScanline(xC >> 16, xA >> 16, colorC >> 7, colorA >> 7, Pix2D.pixels, yA, 0);
                  xC += xStepBC;
                  xA += xStepAB;
                  colorC += colorStepBC;
                  colorA += colorStepAB;
                  yA += Pix2D.width2d;
                }
              }
              this.drawGouraudScanline(xB >> 16, xA >> 16, colorB >> 7, colorA >> 7, Pix2D.pixels, yA, 0);
              xB += xStepAC;
              xA += xStepAB;
              colorB += colorStepAC;
              colorA += colorStepAB;
              yA += Pix2D.width2d;
            }
          } else {
            yB -= yC;
            yC -= yA;
            yA = Pix3D.lineOffset[yA];
            while (true) {
              yC--;
              if (yC < 0) {
                while (true) {
                  yB--;
                  if (yB < 0) {
                    return;
                  }
                  this.drawGouraudScanline(xA >> 16, xC >> 16, colorA >> 7, colorC >> 7, Pix2D.pixels, yA, 0);
                  xC += xStepBC;
                  xA += xStepAB;
                  colorC += colorStepBC;
                  colorA += colorStepAB;
                  yA += Pix2D.width2d;
                }
              }
              this.drawGouraudScanline(xA >> 16, xB >> 16, colorA >> 7, colorB >> 7, Pix2D.pixels, yA, 0);
              xB += xStepAC;
              xA += xStepAB;
              colorB += colorStepAC;
              colorA += colorStepAB;
              yA += Pix2D.width2d;
            }
          }
        }
      }
    } else if (yB <= yC) {
      if (yB < Pix2D.bottom) {
        if (yC > Pix2D.bottom) {
          yC = Pix2D.bottom;
        }
        if (yA > Pix2D.bottom) {
          yA = Pix2D.bottom;
        }
        if (yC < yA) {
          xA = xB <<= 16;
          colorA = colorB <<= 15;
          if (yB < 0) {
            xA -= xStepAB * yB;
            xB -= xStepBC * yB;
            colorA -= colorStepAB * yB;
            colorB -= colorStepBC * yB;
            yB = 0;
          }
          xC <<= 16;
          colorC <<= 15;
          if (yC < 0) {
            xC -= xStepAC * yC;
            colorC -= colorStepAC * yC;
            yC = 0;
          }
          if (yB !== yC && xStepAB < xStepBC || yB === yC && xStepAB > xStepAC) {
            yA -= yC;
            yC -= yB;
            yB = Pix3D.lineOffset[yB];
            while (true) {
              yC--;
              if (yC < 0) {
                while (true) {
                  yA--;
                  if (yA < 0) {
                    return;
                  }
                  this.drawGouraudScanline(xA >> 16, xC >> 16, colorA >> 7, colorC >> 7, Pix2D.pixels, yB, 0);
                  xA += xStepAB;
                  xC += xStepAC;
                  colorA += colorStepAB;
                  colorC += colorStepAC;
                  yB += Pix2D.width2d;
                }
              }
              this.drawGouraudScanline(xA >> 16, xB >> 16, colorA >> 7, colorB >> 7, Pix2D.pixels, yB, 0);
              xA += xStepAB;
              xB += xStepBC;
              colorA += colorStepAB;
              colorB += colorStepBC;
              yB += Pix2D.width2d;
            }
          } else {
            yA -= yC;
            yC -= yB;
            yB = Pix3D.lineOffset[yB];
            while (true) {
              yC--;
              if (yC < 0) {
                while (true) {
                  yA--;
                  if (yA < 0) {
                    return;
                  }
                  this.drawGouraudScanline(xC >> 16, xA >> 16, colorC >> 7, colorA >> 7, Pix2D.pixels, yB, 0);
                  xA += xStepAB;
                  xC += xStepAC;
                  colorA += colorStepAB;
                  colorC += colorStepAC;
                  yB += Pix2D.width2d;
                }
              }
              this.drawGouraudScanline(xB >> 16, xA >> 16, colorB >> 7, colorA >> 7, Pix2D.pixels, yB, 0);
              xA += xStepAB;
              xB += xStepBC;
              colorA += colorStepAB;
              colorB += colorStepBC;
              yB += Pix2D.width2d;
            }
          }
        } else {
          xC = xB <<= 16;
          colorC = colorB <<= 15;
          if (yB < 0) {
            xC -= xStepAB * yB;
            xB -= xStepBC * yB;
            colorC -= colorStepAB * yB;
            colorB -= colorStepBC * yB;
            yB = 0;
          }
          xA <<= 16;
          colorA <<= 15;
          if (yA < 0) {
            xA -= xStepAC * yA;
            colorA -= colorStepAC * yA;
            yA = 0;
          }
          yC -= yA;
          yA -= yB;
          yB = Pix3D.lineOffset[yB];
          if (xStepAB < xStepBC) {
            while (true) {
              yA--;
              if (yA < 0) {
                while (true) {
                  yC--;
                  if (yC < 0) {
                    return;
                  }
                  this.drawGouraudScanline(xA >> 16, xB >> 16, colorA >> 7, colorB >> 7, Pix2D.pixels, yB, 0);
                  xA += xStepAC;
                  xB += xStepBC;
                  colorA += colorStepAC;
                  colorB += colorStepBC;
                  yB += Pix2D.width2d;
                }
              }
              this.drawGouraudScanline(xC >> 16, xB >> 16, colorC >> 7, colorB >> 7, Pix2D.pixels, yB, 0);
              xC += xStepAB;
              xB += xStepBC;
              colorC += colorStepAB;
              colorB += colorStepBC;
              yB += Pix2D.width2d;
            }
          } else {
            while (true) {
              yA--;
              if (yA < 0) {
                while (true) {
                  yC--;
                  if (yC < 0) {
                    return;
                  }
                  this.drawGouraudScanline(xB >> 16, xA >> 16, colorB >> 7, colorA >> 7, Pix2D.pixels, yB, 0);
                  xA += xStepAC;
                  xB += xStepBC;
                  colorA += colorStepAC;
                  colorB += colorStepBC;
                  yB += Pix2D.width2d;
                }
              }
              this.drawGouraudScanline(xB >> 16, xC >> 16, colorB >> 7, colorC >> 7, Pix2D.pixels, yB, 0);
              xC += xStepAB;
              xB += xStepBC;
              colorC += colorStepAB;
              colorB += colorStepBC;
              yB += Pix2D.width2d;
            }
          }
        }
      }
    } else if (yC < Pix2D.bottom) {
      if (yA > Pix2D.bottom) {
        yA = Pix2D.bottom;
      }
      if (yB > Pix2D.bottom) {
        yB = Pix2D.bottom;
      }
      if (yA < yB) {
        xB = xC <<= 16;
        colorB = colorC <<= 15;
        if (yC < 0) {
          xB -= xStepBC * yC;
          xC -= xStepAC * yC;
          colorB -= colorStepBC * yC;
          colorC -= colorStepAC * yC;
          yC = 0;
        }
        xA <<= 16;
        colorA <<= 15;
        if (yA < 0) {
          xA -= xStepAB * yA;
          colorA -= colorStepAB * yA;
          yA = 0;
        }
        yB -= yA;
        yA -= yC;
        yC = Pix3D.lineOffset[yC];
        if (xStepBC < xStepAC) {
          while (true) {
            yA--;
            if (yA < 0) {
              while (true) {
                yB--;
                if (yB < 0) {
                  return;
                }
                this.drawGouraudScanline(xB >> 16, xA >> 16, colorB >> 7, colorA >> 7, Pix2D.pixels, yC, 0);
                xB += xStepBC;
                xA += xStepAB;
                colorB += colorStepBC;
                colorA += colorStepAB;
                yC += Pix2D.width2d;
              }
            }
            this.drawGouraudScanline(xB >> 16, xC >> 16, colorB >> 7, colorC >> 7, Pix2D.pixels, yC, 0);
            xB += xStepBC;
            xC += xStepAC;
            colorB += colorStepBC;
            colorC += colorStepAC;
            yC += Pix2D.width2d;
          }
        } else {
          while (true) {
            yA--;
            if (yA < 0) {
              while (true) {
                yB--;
                if (yB < 0) {
                  return;
                }
                this.drawGouraudScanline(xA >> 16, xB >> 16, colorA >> 7, colorB >> 7, Pix2D.pixels, yC, 0);
                xB += xStepBC;
                xA += xStepAB;
                colorB += colorStepBC;
                colorA += colorStepAB;
                yC += Pix2D.width2d;
              }
            }
            this.drawGouraudScanline(xC >> 16, xB >> 16, colorC >> 7, colorB >> 7, Pix2D.pixels, yC, 0);
            xB += xStepBC;
            xC += xStepAC;
            colorB += colorStepBC;
            colorC += colorStepAC;
            yC += Pix2D.width2d;
          }
        }
      } else {
        xA = xC <<= 16;
        colorA = colorC <<= 15;
        if (yC < 0) {
          xA -= xStepBC * yC;
          xC -= xStepAC * yC;
          colorA -= colorStepBC * yC;
          colorC -= colorStepAC * yC;
          yC = 0;
        }
        xB <<= 16;
        colorB <<= 15;
        if (yB < 0) {
          xB -= xStepAB * yB;
          colorB -= colorStepAB * yB;
          yB = 0;
        }
        yA -= yB;
        yB -= yC;
        yC = Pix3D.lineOffset[yC];
        if (xStepBC < xStepAC) {
          while (true) {
            yB--;
            if (yB < 0) {
              while (true) {
                yA--;
                if (yA < 0) {
                  return;
                }
                this.drawGouraudScanline(xB >> 16, xC >> 16, colorB >> 7, colorC >> 7, Pix2D.pixels, yC, 0);
                xB += xStepAB;
                xC += xStepAC;
                colorB += colorStepAB;
                colorC += colorStepAC;
                yC += Pix2D.width2d;
              }
            }
            this.drawGouraudScanline(xA >> 16, xC >> 16, colorA >> 7, colorC >> 7, Pix2D.pixels, yC, 0);
            xA += xStepBC;
            xC += xStepAC;
            colorA += colorStepBC;
            colorC += colorStepAC;
            yC += Pix2D.width2d;
          }
        } else {
          while (true) {
            yB--;
            if (yB < 0) {
              while (true) {
                yA--;
                if (yA < 0) {
                  return;
                }
                this.drawGouraudScanline(xC >> 16, xB >> 16, colorC >> 7, colorB >> 7, Pix2D.pixels, yC, 0);
                xB += xStepAB;
                xC += xStepAC;
                colorB += colorStepAB;
                colorC += colorStepAC;
                yC += Pix2D.width2d;
              }
            }
            this.drawGouraudScanline(xC >> 16, xA >> 16, colorC >> 7, colorA >> 7, Pix2D.pixels, yC, 0);
            xA += xStepBC;
            xC += xStepAC;
            colorA += colorStepBC;
            colorC += colorStepAC;
            yC += Pix2D.width2d;
          }
        }
      }
    }
  }
  static drawGouraudScanline(x0, x1, color0, color1, dst, offset, length) {
    let rgb;
    if (Pix3D.jagged) {
      let colorStep;
      if (Pix3D.clipX) {
        if (x1 - x0 > 3) {
          colorStep = (color1 - color0) / (x1 - x0) | 0;
        } else {
          colorStep = 0;
        }
        if (x1 > Pix2D.boundX) {
          x1 = Pix2D.boundX;
        }
        if (x0 < 0) {
          color0 -= x0 * colorStep;
          x0 = 0;
        }
        if (x0 >= x1) {
          return;
        }
        offset += x0;
        length = x1 - x0 >> 2;
        colorStep <<= 2;
      } else if (x0 < x1) {
        offset += x0;
        length = x1 - x0 >> 2;
        if (length > 0) {
          colorStep = (color1 - color0) * Pix3D.reciprocal15[length] >> 15;
        } else {
          colorStep = 0;
        }
      } else {
        return;
      }
      if (Pix3D.alpha === 0) {
        while (true) {
          length--;
          if (length < 0) {
            length = x1 - x0 & 3;
            if (length > 0) {
              rgb = Pix3D.hslPal[color0 >> 8];
              do {
                dst[offset++] = rgb;
                length--;
              } while (length > 0);
              return;
            }
            break;
          }
          rgb = Pix3D.hslPal[color0 >> 8];
          color0 += colorStep;
          dst[offset++] = rgb;
          dst[offset++] = rgb;
          dst[offset++] = rgb;
          dst[offset++] = rgb;
        }
      } else {
        const alpha = Pix3D.alpha;
        const invAlpha = 256 - Pix3D.alpha;
        while (true) {
          length--;
          if (length < 0) {
            length = x1 - x0 & 3;
            if (length > 0) {
              rgb = Pix3D.hslPal[color0 >> 8];
              rgb = ((rgb & 16711935) * invAlpha >> 8 & 16711935) + ((rgb & 65280) * invAlpha >> 8 & 65280);
              do {
                dst[offset++] = rgb + ((dst[offset] & 16711935) * alpha >> 8 & 16711935) + ((dst[offset] & 65280) * alpha >> 8 & 65280);
                length--;
              } while (length > 0);
            }
            break;
          }
          rgb = Pix3D.hslPal[color0 >> 8];
          color0 += colorStep;
          rgb = ((rgb & 16711935) * invAlpha >> 8 & 16711935) + ((rgb & 65280) * invAlpha >> 8 & 65280);
          dst[offset++] = rgb + ((dst[offset] & 16711935) * alpha >> 8 & 16711935) + ((dst[offset] & 65280) * alpha >> 8 & 65280);
          dst[offset++] = rgb + ((dst[offset] & 16711935) * alpha >> 8 & 16711935) + ((dst[offset] & 65280) * alpha >> 8 & 65280);
          dst[offset++] = rgb + ((dst[offset] & 16711935) * alpha >> 8 & 16711935) + ((dst[offset] & 65280) * alpha >> 8 & 65280);
          dst[offset++] = rgb + ((dst[offset] & 16711935) * alpha >> 8 & 16711935) + ((dst[offset] & 65280) * alpha >> 8 & 65280);
        }
      }
    } else if (x0 < x1) {
      const colorStep = (color1 - color0) / (x1 - x0) | 0;
      if (Pix3D.clipX) {
        if (x1 > Pix2D.boundX) {
          x1 = Pix2D.boundX;
        }
        if (x0 < 0) {
          color0 -= x0 * colorStep;
          x0 = 0;
        }
        if (x0 >= x1) {
          return;
        }
      }
      offset += x0;
      length = x1 - x0;
      if (Pix3D.alpha === 0) {
        do {
          dst[offset++] = Pix3D.hslPal[color0 >> 8];
          color0 += colorStep;
          length--;
        } while (length > 0);
      } else {
        const alpha = Pix3D.alpha;
        const invAlpha = 256 - Pix3D.alpha;
        do {
          rgb = Pix3D.hslPal[color0 >> 8];
          color0 += colorStep;
          rgb = ((rgb & 16711935) * invAlpha >> 8 & 16711935) + ((rgb & 65280) * invAlpha >> 8 & 65280);
          dst[offset++] = rgb + ((dst[offset] & 16711935) * alpha >> 8 & 16711935) + ((dst[offset] & 65280) * alpha >> 8 & 65280);
          length--;
        } while (length > 0);
      }
    }
  }
  static fillTriangle(x0, x1, x2, y0, y1, y2, color) {
    if (Renderer.fillTriangle(x0, x1, x2, y0, y1, y2, color)) {
      return;
    }
    let xStepAB = 0;
    if (y1 !== y0) {
      xStepAB = (x1 - x0 << 16) / (y1 - y0) | 0;
    }
    let xStepBC = 0;
    if (y2 !== y1) {
      xStepBC = (x2 - x1 << 16) / (y2 - y1) | 0;
    }
    let xStepAC = 0;
    if (y2 !== y0) {
      xStepAC = (x0 - x2 << 16) / (y0 - y2) | 0;
    }
    if (y0 <= y1 && y0 <= y2) {
      if (y0 < Pix2D.bottom) {
        if (y1 > Pix2D.bottom) {
          y1 = Pix2D.bottom;
        }
        if (y2 > Pix2D.bottom) {
          y2 = Pix2D.bottom;
        }
        if (y1 < y2) {
          x2 = x0 <<= 16;
          if (y0 < 0) {
            x2 -= xStepAC * y0;
            x0 -= xStepAB * y0;
            y0 = 0;
          }
          x1 <<= 16;
          if (y1 < 0) {
            x1 -= xStepBC * y1;
            y1 = 0;
          }
          if (y0 !== y1 && xStepAC < xStepAB || y0 === y1 && xStepAC > xStepBC) {
            y2 -= y1;
            y1 -= y0;
            y0 = this.lineOffset[y0];
            while (true) {
              y1--;
              if (y1 < 0) {
                while (true) {
                  y2--;
                  if (y2 < 0) {
                    return;
                  }
                  this.drawScanline(x2 >> 16, x1 >> 16, Pix2D.pixels, y0, color);
                  x2 += xStepAC;
                  x1 += xStepBC;
                  y0 += Pix2D.width2d;
                }
              }
              this.drawScanline(x2 >> 16, x0 >> 16, Pix2D.pixels, y0, color);
              x2 += xStepAC;
              x0 += xStepAB;
              y0 += Pix2D.width2d;
            }
          } else {
            y2 -= y1;
            y1 -= y0;
            y0 = this.lineOffset[y0];
            while (true) {
              y1--;
              if (y1 < 0) {
                while (true) {
                  y2--;
                  if (y2 < 0) {
                    return;
                  }
                  this.drawScanline(x1 >> 16, x2 >> 16, Pix2D.pixels, y0, color);
                  x2 += xStepAC;
                  x1 += xStepBC;
                  y0 += Pix2D.width2d;
                }
              }
              this.drawScanline(x0 >> 16, x2 >> 16, Pix2D.pixels, y0, color);
              x2 += xStepAC;
              x0 += xStepAB;
              y0 += Pix2D.width2d;
            }
          }
        } else {
          x1 = x0 <<= 16;
          if (y0 < 0) {
            x1 -= xStepAC * y0;
            x0 -= xStepAB * y0;
            y0 = 0;
          }
          x2 <<= 16;
          if (y2 < 0) {
            x2 -= xStepBC * y2;
            y2 = 0;
          }
          if (y0 !== y2 && xStepAC < xStepAB || y0 === y2 && xStepBC > xStepAB) {
            y1 -= y2;
            y2 -= y0;
            y0 = this.lineOffset[y0];
            while (true) {
              y2--;
              if (y2 < 0) {
                while (true) {
                  y1--;
                  if (y1 < 0) {
                    return;
                  }
                  this.drawScanline(x2 >> 16, x0 >> 16, Pix2D.pixels, y0, color);
                  x2 += xStepBC;
                  x0 += xStepAB;
                  y0 += Pix2D.width2d;
                }
              }
              this.drawScanline(x1 >> 16, x0 >> 16, Pix2D.pixels, y0, color);
              x1 += xStepAC;
              x0 += xStepAB;
              y0 += Pix2D.width2d;
            }
          } else {
            y1 -= y2;
            y2 -= y0;
            y0 = this.lineOffset[y0];
            while (true) {
              y2--;
              if (y2 < 0) {
                while (true) {
                  y1--;
                  if (y1 < 0) {
                    return;
                  }
                  this.drawScanline(x0 >> 16, x2 >> 16, Pix2D.pixels, y0, color);
                  x2 += xStepBC;
                  x0 += xStepAB;
                  y0 += Pix2D.width2d;
                }
              }
              this.drawScanline(x0 >> 16, x1 >> 16, Pix2D.pixels, y0, color);
              x1 += xStepAC;
              x0 += xStepAB;
              y0 += Pix2D.width2d;
            }
          }
        }
      }
    } else if (y1 <= y2) {
      if (y1 < Pix2D.bottom) {
        if (y2 > Pix2D.bottom) {
          y2 = Pix2D.bottom;
        }
        if (y0 > Pix2D.bottom) {
          y0 = Pix2D.bottom;
        }
        if (y2 < y0) {
          x0 = x1 <<= 16;
          if (y1 < 0) {
            x0 -= xStepAB * y1;
            x1 -= xStepBC * y1;
            y1 = 0;
          }
          x2 <<= 16;
          if (y2 < 0) {
            x2 -= xStepAC * y2;
            y2 = 0;
          }
          if (y1 !== y2 && xStepAB < xStepBC || y1 === y2 && xStepAB > xStepAC) {
            y0 -= y2;
            y2 -= y1;
            y1 = this.lineOffset[y1];
            while (true) {
              y2--;
              if (y2 < 0) {
                while (true) {
                  y0--;
                  if (y0 < 0) {
                    return;
                  }
                  this.drawScanline(x0 >> 16, x2 >> 16, Pix2D.pixels, y1, color);
                  x0 += xStepAB;
                  x2 += xStepAC;
                  y1 += Pix2D.width2d;
                }
              }
              this.drawScanline(x0 >> 16, x1 >> 16, Pix2D.pixels, y1, color);
              x0 += xStepAB;
              x1 += xStepBC;
              y1 += Pix2D.width2d;
            }
          } else {
            y0 -= y2;
            y2 -= y1;
            y1 = this.lineOffset[y1];
            while (true) {
              y2--;
              if (y2 < 0) {
                while (true) {
                  y0--;
                  if (y0 < 0) {
                    return;
                  }
                  this.drawScanline(x2 >> 16, x0 >> 16, Pix2D.pixels, y1, color);
                  x0 += xStepAB;
                  x2 += xStepAC;
                  y1 += Pix2D.width2d;
                }
              }
              this.drawScanline(x1 >> 16, x0 >> 16, Pix2D.pixels, y1, color);
              x0 += xStepAB;
              x1 += xStepBC;
              y1 += Pix2D.width2d;
            }
          }
        } else {
          x2 = x1 <<= 16;
          if (y1 < 0) {
            x2 -= xStepAB * y1;
            x1 -= xStepBC * y1;
            y1 = 0;
          }
          x0 <<= 16;
          if (y0 < 0) {
            x0 -= xStepAC * y0;
            y0 = 0;
          }
          if (xStepAB < xStepBC) {
            y2 -= y0;
            y0 -= y1;
            y1 = this.lineOffset[y1];
            while (true) {
              y0--;
              if (y0 < 0) {
                while (true) {
                  y2--;
                  if (y2 < 0) {
                    return;
                  }
                  this.drawScanline(x0 >> 16, x1 >> 16, Pix2D.pixels, y1, color);
                  x0 += xStepAC;
                  x1 += xStepBC;
                  y1 += Pix2D.width2d;
                }
              }
              this.drawScanline(x2 >> 16, x1 >> 16, Pix2D.pixels, y1, color);
              x2 += xStepAB;
              x1 += xStepBC;
              y1 += Pix2D.width2d;
            }
          } else {
            y2 -= y0;
            y0 -= y1;
            y1 = this.lineOffset[y1];
            while (true) {
              y0--;
              if (y0 < 0) {
                while (true) {
                  y2--;
                  if (y2 < 0) {
                    return;
                  }
                  this.drawScanline(x1 >> 16, x0 >> 16, Pix2D.pixels, y1, color);
                  x0 += xStepAC;
                  x1 += xStepBC;
                  y1 += Pix2D.width2d;
                }
              }
              this.drawScanline(x1 >> 16, x2 >> 16, Pix2D.pixels, y1, color);
              x2 += xStepAB;
              x1 += xStepBC;
              y1 += Pix2D.width2d;
            }
          }
        }
      }
    } else if (y2 < Pix2D.bottom) {
      if (y0 > Pix2D.bottom) {
        y0 = Pix2D.bottom;
      }
      if (y1 > Pix2D.bottom) {
        y1 = Pix2D.bottom;
      }
      if (y0 < y1) {
        x1 = x2 <<= 16;
        if (y2 < 0) {
          x1 -= xStepBC * y2;
          x2 -= xStepAC * y2;
          y2 = 0;
        }
        x0 <<= 16;
        if (y0 < 0) {
          x0 -= xStepAB * y0;
          y0 = 0;
        }
        if (xStepBC < xStepAC) {
          y1 -= y0;
          y0 -= y2;
          y2 = this.lineOffset[y2];
          while (true) {
            y0--;
            if (y0 < 0) {
              while (true) {
                y1--;
                if (y1 < 0) {
                  return;
                }
                this.drawScanline(x1 >> 16, x0 >> 16, Pix2D.pixels, y2, color);
                x1 += xStepBC;
                x0 += xStepAB;
                y2 += Pix2D.width2d;
              }
            }
            this.drawScanline(x1 >> 16, x2 >> 16, Pix2D.pixels, y2, color);
            x1 += xStepBC;
            x2 += xStepAC;
            y2 += Pix2D.width2d;
          }
        } else {
          y1 -= y0;
          y0 -= y2;
          y2 = this.lineOffset[y2];
          while (true) {
            y0--;
            if (y0 < 0) {
              while (true) {
                y1--;
                if (y1 < 0) {
                  return;
                }
                this.drawScanline(x0 >> 16, x1 >> 16, Pix2D.pixels, y2, color);
                x1 += xStepBC;
                x0 += xStepAB;
                y2 += Pix2D.width2d;
              }
            }
            this.drawScanline(x2 >> 16, x1 >> 16, Pix2D.pixels, y2, color);
            x1 += xStepBC;
            x2 += xStepAC;
            y2 += Pix2D.width2d;
          }
        }
      } else {
        x0 = x2 <<= 16;
        if (y2 < 0) {
          x0 -= xStepBC * y2;
          x2 -= xStepAC * y2;
          y2 = 0;
        }
        x1 <<= 16;
        if (y1 < 0) {
          x1 -= xStepAB * y1;
          y1 = 0;
        }
        if (xStepBC < xStepAC) {
          y0 -= y1;
          y1 -= y2;
          y2 = this.lineOffset[y2];
          while (true) {
            y1--;
            if (y1 < 0) {
              while (true) {
                y0--;
                if (y0 < 0) {
                  return;
                }
                this.drawScanline(x1 >> 16, x2 >> 16, Pix2D.pixels, y2, color);
                x1 += xStepAB;
                x2 += xStepAC;
                y2 += Pix2D.width2d;
              }
            }
            this.drawScanline(x0 >> 16, x2 >> 16, Pix2D.pixels, y2, color);
            x0 += xStepBC;
            x2 += xStepAC;
            y2 += Pix2D.width2d;
          }
        } else {
          y0 -= y1;
          y1 -= y2;
          y2 = this.lineOffset[y2];
          while (true) {
            y1--;
            if (y1 < 0) {
              while (true) {
                y0--;
                if (y0 < 0) {
                  return;
                }
                this.drawScanline(x2 >> 16, x1 >> 16, Pix2D.pixels, y2, color);
                x1 += xStepAB;
                x2 += xStepAC;
                y2 += Pix2D.width2d;
              }
            }
            this.drawScanline(x2 >> 16, x0 >> 16, Pix2D.pixels, y2, color);
            x0 += xStepBC;
            x2 += xStepAC;
            y2 += Pix2D.width2d;
          }
        }
      }
    }
  }
  static fillTexturedTriangle(xA, xB, xC, yA, yB, yC, shadeA, shadeB, shadeC, originX, originY, originZ, txB, txC, tyB, tyC, tzB, tzC, texture) {
    if (Renderer.fillTexturedTriangle(xA, xB, xC, yA, yB, yC, shadeA, shadeB, shadeC, originX, originY, originZ, txB, txC, tyB, tyC, tzB, tzC, texture)) {
      return;
    }
    const texels = this.getTexels(texture);
    this.opaque = !this.textureTranslucent[texture];
    const verticalX = originX - txB;
    const verticalY = originY - tyB;
    const verticalZ = originZ - tzB;
    const horizontalX = txC - originX;
    const horizontalY = tyC - originY;
    const horizontalZ = tzC - originZ;
    let u = horizontalX * originY - horizontalY * originX << 14;
    const uStride = horizontalY * originZ - horizontalZ * originY << 8;
    const uStepVertical = horizontalZ * originX - horizontalX * originZ << 5;
    let v = verticalX * originY - verticalY * originX << 14;
    const vStride = verticalY * originZ - verticalZ * originY << 8;
    const vStepVertical = verticalZ * originX - verticalX * originZ << 5;
    let w = verticalY * horizontalX - verticalX * horizontalY << 14;
    const wStride = verticalZ * horizontalY - verticalY * horizontalZ << 8;
    const wStepVertical = verticalX * horizontalZ - verticalZ * horizontalX << 5;
    let xStepAB = 0;
    let shadeStepAB = 0;
    if (yB !== yA) {
      xStepAB = (xB - xA << 16) / (yB - yA) | 0;
      shadeStepAB = (shadeB - shadeA << 16) / (yB - yA) | 0;
    }
    let xStepBC = 0;
    let shadeStepBC = 0;
    if (yC !== yB) {
      xStepBC = (xC - xB << 16) / (yC - yB) | 0;
      shadeStepBC = (shadeC - shadeB << 16) / (yC - yB) | 0;
    }
    let xStepAC = 0;
    let shadeStepAC = 0;
    if (yC !== yA) {
      xStepAC = (xA - xC << 16) / (yA - yC) | 0;
      shadeStepAC = (shadeA - shadeC << 16) / (yA - yC) | 0;
    }
    if (yA <= yB && yA <= yC) {
      if (yA < Pix2D.bottom) {
        if (yB > Pix2D.bottom) {
          yB = Pix2D.bottom;
        }
        if (yC > Pix2D.bottom) {
          yC = Pix2D.bottom;
        }
        if (yB < yC) {
          xC = xA <<= 16;
          shadeC = shadeA <<= 16;
          if (yA < 0) {
            xC -= xStepAC * yA;
            xA -= xStepAB * yA;
            shadeC -= shadeStepAC * yA;
            shadeA -= shadeStepAB * yA;
            yA = 0;
          }
          xB <<= 16;
          shadeB <<= 16;
          if (yB < 0) {
            xB -= xStepBC * yB;
            shadeB -= shadeStepBC * yB;
            yB = 0;
          }
          const dy = yA - this.centerY;
          u += uStepVertical * dy;
          v += vStepVertical * dy;
          w += wStepVertical * dy;
          u |= 0;
          v |= 0;
          w |= 0;
          if (yA !== yB && xStepAC < xStepAB || yA === yB && xStepAC > xStepBC) {
            yC -= yB;
            yB -= yA;
            yA = this.lineOffset[yA];
            while (true) {
              yB--;
              if (yB < 0) {
                while (true) {
                  yC--;
                  if (yC < 0) {
                    return;
                  }
                  this.drawTexturedScanline(xC >> 16, xB >> 16, Pix2D.pixels, yA, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeC >> 8, shadeB >> 8);
                  xC += xStepAC;
                  xB += xStepBC;
                  shadeC += shadeStepAC;
                  shadeB += shadeStepBC;
                  yA += Pix2D.width2d;
                  u += uStepVertical;
                  v += vStepVertical;
                  w += wStepVertical;
                  u |= 0;
                  v |= 0;
                  w |= 0;
                }
              }
              this.drawTexturedScanline(xC >> 16, xA >> 16, Pix2D.pixels, yA, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeC >> 8, shadeA >> 8);
              xC += xStepAC;
              xA += xStepAB;
              shadeC += shadeStepAC;
              shadeA += shadeStepAB;
              yA += Pix2D.width2d;
              u += uStepVertical;
              v += vStepVertical;
              w += wStepVertical;
              u |= 0;
              v |= 0;
              w |= 0;
            }
          } else {
            yC -= yB;
            yB -= yA;
            yA = this.lineOffset[yA];
            while (true) {
              yB--;
              if (yB < 0) {
                while (true) {
                  yC--;
                  if (yC < 0) {
                    return;
                  }
                  this.drawTexturedScanline(xB >> 16, xC >> 16, Pix2D.pixels, yA, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeB >> 8, shadeC >> 8);
                  xC += xStepAC;
                  xB += xStepBC;
                  shadeC += shadeStepAC;
                  shadeB += shadeStepBC;
                  yA += Pix2D.width2d;
                  u += uStepVertical;
                  v += vStepVertical;
                  w += wStepVertical;
                  u |= 0;
                  v |= 0;
                  w |= 0;
                }
              }
              this.drawTexturedScanline(xA >> 16, xC >> 16, Pix2D.pixels, yA, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeA >> 8, shadeC >> 8);
              xC += xStepAC;
              xA += xStepAB;
              shadeC += shadeStepAC;
              shadeA += shadeStepAB;
              yA += Pix2D.width2d;
              u += uStepVertical;
              v += vStepVertical;
              w += wStepVertical;
              u |= 0;
              v |= 0;
              w |= 0;
            }
          }
        } else {
          xB = xA <<= 16;
          shadeB = shadeA <<= 16;
          if (yA < 0) {
            xB -= xStepAC * yA;
            xA -= xStepAB * yA;
            shadeB -= shadeStepAC * yA;
            shadeA -= shadeStepAB * yA;
            yA = 0;
          }
          xC <<= 16;
          shadeC <<= 16;
          if (yC < 0) {
            xC -= xStepBC * yC;
            shadeC -= shadeStepBC * yC;
            yC = 0;
          }
          const dy = yA - this.centerY;
          u += uStepVertical * dy;
          v += vStepVertical * dy;
          w += wStepVertical * dy;
          u |= 0;
          v |= 0;
          w |= 0;
          if ((yA === yC || xStepAC >= xStepAB) && (yA !== yC || xStepBC <= xStepAB)) {
            yB -= yC;
            yC -= yA;
            yA = this.lineOffset[yA];
            while (true) {
              yC--;
              if (yC < 0) {
                while (true) {
                  yB--;
                  if (yB < 0) {
                    return;
                  }
                  this.drawTexturedScanline(xA >> 16, xC >> 16, Pix2D.pixels, yA, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeA >> 8, shadeC >> 8);
                  xC += xStepBC;
                  xA += xStepAB;
                  shadeC += shadeStepBC;
                  shadeA += shadeStepAB;
                  yA += Pix2D.width2d;
                  u += uStepVertical;
                  v += vStepVertical;
                  w += wStepVertical;
                  u |= 0;
                  v |= 0;
                  w |= 0;
                }
              }
              this.drawTexturedScanline(xA >> 16, xB >> 16, Pix2D.pixels, yA, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeA >> 8, shadeB >> 8);
              xB += xStepAC;
              xA += xStepAB;
              shadeB += shadeStepAC;
              shadeA += shadeStepAB;
              yA += Pix2D.width2d;
              u += uStepVertical;
              v += vStepVertical;
              w += wStepVertical;
              u |= 0;
              v |= 0;
              w |= 0;
            }
          } else {
            yB -= yC;
            yC -= yA;
            yA = this.lineOffset[yA];
            while (true) {
              yC--;
              if (yC < 0) {
                while (true) {
                  yB--;
                  if (yB < 0) {
                    return;
                  }
                  this.drawTexturedScanline(xC >> 16, xA >> 16, Pix2D.pixels, yA, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeC >> 8, shadeA >> 8);
                  xC += xStepBC;
                  xA += xStepAB;
                  shadeC += shadeStepBC;
                  shadeA += shadeStepAB;
                  yA += Pix2D.width2d;
                  u += uStepVertical;
                  v += vStepVertical;
                  w += wStepVertical;
                  u |= 0;
                  v |= 0;
                  w |= 0;
                }
              }
              this.drawTexturedScanline(xB >> 16, xA >> 16, Pix2D.pixels, yA, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeB >> 8, shadeA >> 8);
              xB += xStepAC;
              xA += xStepAB;
              shadeB += shadeStepAC;
              shadeA += shadeStepAB;
              yA += Pix2D.width2d;
              u += uStepVertical;
              v += vStepVertical;
              w += wStepVertical;
              u |= 0;
              v |= 0;
              w |= 0;
            }
          }
        }
      }
    } else if (yB <= yC) {
      if (yB < Pix2D.bottom) {
        if (yC > Pix2D.bottom) {
          yC = Pix2D.bottom;
        }
        if (yA > Pix2D.bottom) {
          yA = Pix2D.bottom;
        }
        if (yC < yA) {
          xA = xB <<= 16;
          shadeA = shadeB <<= 16;
          if (yB < 0) {
            xA -= xStepAB * yB;
            xB -= xStepBC * yB;
            shadeA -= shadeStepAB * yB;
            shadeB -= shadeStepBC * yB;
            yB = 0;
          }
          xC <<= 16;
          shadeC <<= 16;
          if (yC < 0) {
            xC -= xStepAC * yC;
            shadeC -= shadeStepAC * yC;
            yC = 0;
          }
          const dy = yB - this.centerY;
          u += uStepVertical * dy;
          v += vStepVertical * dy;
          w += wStepVertical * dy;
          u |= 0;
          v |= 0;
          w |= 0;
          if (yB !== yC && xStepAB < xStepBC || yB === yC && xStepAB > xStepAC) {
            yA -= yC;
            yC -= yB;
            yB = this.lineOffset[yB];
            while (true) {
              yC--;
              if (yC < 0) {
                while (true) {
                  yA--;
                  if (yA < 0) {
                    return;
                  }
                  this.drawTexturedScanline(xA >> 16, xC >> 16, Pix2D.pixels, yB, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeA >> 8, shadeC >> 8);
                  xA += xStepAB;
                  xC += xStepAC;
                  shadeA += shadeStepAB;
                  shadeC += shadeStepAC;
                  yB += Pix2D.width2d;
                  u += uStepVertical;
                  v += vStepVertical;
                  w += wStepVertical;
                  u |= 0;
                  v |= 0;
                  w |= 0;
                }
              }
              this.drawTexturedScanline(xA >> 16, xB >> 16, Pix2D.pixels, yB, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeA >> 8, shadeB >> 8);
              xA += xStepAB;
              xB += xStepBC;
              shadeA += shadeStepAB;
              shadeB += shadeStepBC;
              yB += Pix2D.width2d;
              u += uStepVertical;
              v += vStepVertical;
              w += wStepVertical;
              u |= 0;
              v |= 0;
              w |= 0;
            }
          } else {
            yA -= yC;
            yC -= yB;
            yB = this.lineOffset[yB];
            while (true) {
              yC--;
              if (yC < 0) {
                while (true) {
                  yA--;
                  if (yA < 0) {
                    return;
                  }
                  this.drawTexturedScanline(xC >> 16, xA >> 16, Pix2D.pixels, yB, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeC >> 8, shadeA >> 8);
                  xA += xStepAB;
                  xC += xStepAC;
                  shadeA += shadeStepAB;
                  shadeC += shadeStepAC;
                  yB += Pix2D.width2d;
                  u += uStepVertical;
                  v += vStepVertical;
                  w += wStepVertical;
                  u |= 0;
                  v |= 0;
                  w |= 0;
                }
              }
              this.drawTexturedScanline(xB >> 16, xA >> 16, Pix2D.pixels, yB, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeB >> 8, shadeA >> 8);
              xA += xStepAB;
              xB += xStepBC;
              shadeA += shadeStepAB;
              shadeB += shadeStepBC;
              yB += Pix2D.width2d;
              u += uStepVertical;
              v += vStepVertical;
              w += wStepVertical;
              u |= 0;
              v |= 0;
              w |= 0;
            }
          }
        } else {
          xC = xB <<= 16;
          shadeC = shadeB <<= 16;
          if (yB < 0) {
            xC -= xStepAB * yB;
            xB -= xStepBC * yB;
            shadeC -= shadeStepAB * yB;
            shadeB -= shadeStepBC * yB;
            yB = 0;
          }
          xA <<= 16;
          shadeA <<= 16;
          if (yA < 0) {
            xA -= xStepAC * yA;
            shadeA -= shadeStepAC * yA;
            yA = 0;
          }
          const dy = yB - this.centerY;
          u += uStepVertical * dy;
          v += vStepVertical * dy;
          w += wStepVertical * dy;
          u |= 0;
          v |= 0;
          w |= 0;
          yC -= yA;
          yA -= yB;
          yB = this.lineOffset[yB];
          if (xStepAB < xStepBC) {
            while (true) {
              yA--;
              if (yA < 0) {
                while (true) {
                  yC--;
                  if (yC < 0) {
                    return;
                  }
                  this.drawTexturedScanline(xA >> 16, xB >> 16, Pix2D.pixels, yB, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeA >> 8, shadeB >> 8);
                  xA += xStepAC;
                  xB += xStepBC;
                  shadeA += shadeStepAC;
                  shadeB += shadeStepBC;
                  yB += Pix2D.width2d;
                  u += uStepVertical;
                  v += vStepVertical;
                  w += wStepVertical;
                  u |= 0;
                  v |= 0;
                  w |= 0;
                }
              }
              this.drawTexturedScanline(xC >> 16, xB >> 16, Pix2D.pixels, yB, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeC >> 8, shadeB >> 8);
              xC += xStepAB;
              xB += xStepBC;
              shadeC += shadeStepAB;
              shadeB += shadeStepBC;
              yB += Pix2D.width2d;
              u += uStepVertical;
              v += vStepVertical;
              w += wStepVertical;
              u |= 0;
              v |= 0;
              w |= 0;
            }
          } else {
            while (true) {
              yA--;
              if (yA < 0) {
                while (true) {
                  yC--;
                  if (yC < 0) {
                    return;
                  }
                  this.drawTexturedScanline(xB >> 16, xA >> 16, Pix2D.pixels, yB, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeB >> 8, shadeA >> 8);
                  xA += xStepAC;
                  xB += xStepBC;
                  shadeA += shadeStepAC;
                  shadeB += shadeStepBC;
                  yB += Pix2D.width2d;
                  u += uStepVertical;
                  v += vStepVertical;
                  w += wStepVertical;
                  u |= 0;
                  v |= 0;
                  w |= 0;
                }
              }
              this.drawTexturedScanline(xB >> 16, xC >> 16, Pix2D.pixels, yB, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeB >> 8, shadeC >> 8);
              xC += xStepAB;
              xB += xStepBC;
              shadeC += shadeStepAB;
              shadeB += shadeStepBC;
              yB += Pix2D.width2d;
              u += uStepVertical;
              v += vStepVertical;
              w += wStepVertical;
              u |= 0;
              v |= 0;
              w |= 0;
            }
          }
        }
      }
    } else if (yC < Pix2D.bottom) {
      if (yA > Pix2D.bottom) {
        yA = Pix2D.bottom;
      }
      if (yB > Pix2D.bottom) {
        yB = Pix2D.bottom;
      }
      if (yA < yB) {
        xB = xC <<= 16;
        shadeB = shadeC <<= 16;
        if (yC < 0) {
          xB -= xStepBC * yC;
          xC -= xStepAC * yC;
          shadeB -= shadeStepBC * yC;
          shadeC -= shadeStepAC * yC;
          yC = 0;
        }
        xA <<= 16;
        shadeA <<= 16;
        if (yA < 0) {
          xA -= xStepAB * yA;
          shadeA -= shadeStepAB * yA;
          yA = 0;
        }
        const dy = yC - this.centerY;
        u += uStepVertical * dy;
        v += vStepVertical * dy;
        w += wStepVertical * dy;
        u |= 0;
        v |= 0;
        w |= 0;
        yB -= yA;
        yA -= yC;
        yC = this.lineOffset[yC];
        if (xStepBC < xStepAC) {
          while (true) {
            yA--;
            if (yA < 0) {
              while (true) {
                yB--;
                if (yB < 0) {
                  return;
                }
                this.drawTexturedScanline(xB >> 16, xA >> 16, Pix2D.pixels, yC, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeB >> 8, shadeA >> 8);
                xB += xStepBC;
                xA += xStepAB;
                shadeB += shadeStepBC;
                shadeA += shadeStepAB;
                yC += Pix2D.width2d;
                u += uStepVertical;
                v += vStepVertical;
                w += wStepVertical;
                u |= 0;
                v |= 0;
                w |= 0;
              }
            }
            this.drawTexturedScanline(xB >> 16, xC >> 16, Pix2D.pixels, yC, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeB >> 8, shadeC >> 8);
            xB += xStepBC;
            xC += xStepAC;
            shadeB += shadeStepBC;
            shadeC += shadeStepAC;
            yC += Pix2D.width2d;
            u += uStepVertical;
            v += vStepVertical;
            w += wStepVertical;
            u |= 0;
            v |= 0;
            w |= 0;
          }
        } else {
          while (true) {
            yA--;
            if (yA < 0) {
              while (true) {
                yB--;
                if (yB < 0) {
                  return;
                }
                this.drawTexturedScanline(xA >> 16, xB >> 16, Pix2D.pixels, yC, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeA >> 8, shadeB >> 8);
                xB += xStepBC;
                xA += xStepAB;
                shadeB += shadeStepBC;
                shadeA += shadeStepAB;
                yC += Pix2D.width2d;
                u += uStepVertical;
                v += vStepVertical;
                w += wStepVertical;
                u |= 0;
                v |= 0;
                w |= 0;
              }
            }
            this.drawTexturedScanline(xC >> 16, xB >> 16, Pix2D.pixels, yC, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeC >> 8, shadeB >> 8);
            xB += xStepBC;
            xC += xStepAC;
            shadeB += shadeStepBC;
            shadeC += shadeStepAC;
            yC += Pix2D.width2d;
            u += uStepVertical;
            v += vStepVertical;
            w += wStepVertical;
            u |= 0;
            v |= 0;
            w |= 0;
          }
        }
      } else {
        xA = xC <<= 16;
        shadeA = shadeC <<= 16;
        if (yC < 0) {
          xA -= xStepBC * yC;
          xC -= xStepAC * yC;
          shadeA -= shadeStepBC * yC;
          shadeC -= shadeStepAC * yC;
          yC = 0;
        }
        xB <<= 16;
        shadeB <<= 16;
        if (yB < 0) {
          xB -= xStepAB * yB;
          shadeB -= shadeStepAB * yB;
          yB = 0;
        }
        const dy = yC - this.centerY;
        u += uStepVertical * dy;
        v += vStepVertical * dy;
        w += wStepVertical * dy;
        u |= 0;
        v |= 0;
        w |= 0;
        yA -= yB;
        yB -= yC;
        yC = this.lineOffset[yC];
        if (xStepBC < xStepAC) {
          while (true) {
            yB--;
            if (yB < 0) {
              while (true) {
                yA--;
                if (yA < 0) {
                  return;
                }
                this.drawTexturedScanline(xB >> 16, xC >> 16, Pix2D.pixels, yC, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeB >> 8, shadeC >> 8);
                xB += xStepAB;
                xC += xStepAC;
                shadeB += shadeStepAB;
                shadeC += shadeStepAC;
                yC += Pix2D.width2d;
                u += uStepVertical;
                v += vStepVertical;
                w += wStepVertical;
                u |= 0;
                v |= 0;
                w |= 0;
              }
            }
            this.drawTexturedScanline(xA >> 16, xC >> 16, Pix2D.pixels, yC, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeA >> 8, shadeC >> 8);
            xA += xStepBC;
            xC += xStepAC;
            shadeA += shadeStepBC;
            shadeC += shadeStepAC;
            yC += Pix2D.width2d;
            u += uStepVertical;
            v += vStepVertical;
            w += wStepVertical;
            u |= 0;
            v |= 0;
            w |= 0;
          }
        } else {
          while (true) {
            yB--;
            if (yB < 0) {
              while (true) {
                yA--;
                if (yA < 0) {
                  return;
                }
                this.drawTexturedScanline(xC >> 16, xB >> 16, Pix2D.pixels, yC, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeC >> 8, shadeB >> 8);
                xB += xStepAB;
                xC += xStepAC;
                shadeB += shadeStepAB;
                shadeC += shadeStepAC;
                yC += Pix2D.width2d;
                u += uStepVertical;
                v += vStepVertical;
                w += wStepVertical;
                u |= 0;
                v |= 0;
                w |= 0;
              }
            }
            this.drawTexturedScanline(xC >> 16, xA >> 16, Pix2D.pixels, yC, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeC >> 8, shadeA >> 8);
            xA += xStepBC;
            xC += xStepAC;
            shadeA += shadeStepBC;
            shadeC += shadeStepAC;
            yC += Pix2D.width2d;
            u += uStepVertical;
            v += vStepVertical;
            w += wStepVertical;
            u |= 0;
            v |= 0;
            w |= 0;
          }
        }
      }
    }
  }
  static drawTexturedScanline(xA, xB, dst, offset, texels, curU, curV, u, v, w, uStride, vStride, wStride, shadeA, shadeB) {
    if (xA >= xB) {
      return;
    }
    let shadeStrides;
    let strides;
    if (this.clipX) {
      shadeStrides = (shadeB - shadeA) / (xB - xA) | 0;
      if (xB > Pix2D.boundX) {
        xB = Pix2D.boundX;
      }
      if (xA < 0) {
        shadeA -= xA * shadeStrides;
        xA = 0;
      }
      if (xA >= xB) {
        return;
      }
      strides = xB - xA >> 3;
      shadeStrides <<= 12;
    } else {
      if (xB - xA > 7) {
        strides = xB - xA >> 3;
        shadeStrides = (shadeB - shadeA) * this.reciprocal15[strides] >> 6;
      } else {
        strides = 0;
        shadeStrides = 0;
      }
    }
    shadeA <<= 9;
    offset += xA;
    let nextU;
    let nextV;
    let curW;
    let dx;
    let stepU;
    let stepV;
    let shadeShift;
    if (this.lowMemory && texels) {
      nextU = 0;
      nextV = 0;
      dx = xA - this.centerX;
      u = u + (uStride >> 3) * dx;
      v = v + (vStride >> 3) * dx;
      w = w + (wStride >> 3) * dx;
      u |= 0;
      v |= 0;
      w |= 0;
      curW = w >> 12;
      if (curW !== 0) {
        curU = u / curW | 0;
        curV = v / curW | 0;
        if (curU < 0) {
          curU = 0;
        } else if (curU > 4032) {
          curU = 4032;
        }
      }
      u = u + uStride;
      v = v + vStride;
      w = w + wStride;
      u |= 0;
      v |= 0;
      w |= 0;
      curW = w >> 12;
      if (curW !== 0) {
        nextU = u / curW | 0;
        nextV = v / curW | 0;
        if (nextU < 7) {
          nextU = 7;
        } else if (nextU > 4032) {
          nextU = 4032;
        }
      }
      stepU = nextU - curU >> 3;
      stepV = nextV - curV >> 3;
      curU += shadeA >> 3 & 786432;
      shadeShift = shadeA >> 23;
      if (this.opaque) {
        while (strides-- > 0) {
          dst[offset++] = texels[(curV & 4032) + (curU >> 6)] >>> shadeShift;
          curU += stepU;
          curV += stepV;
          dst[offset++] = texels[(curV & 4032) + (curU >> 6)] >>> shadeShift;
          curU += stepU;
          curV += stepV;
          dst[offset++] = texels[(curV & 4032) + (curU >> 6)] >>> shadeShift;
          curU += stepU;
          curV += stepV;
          dst[offset++] = texels[(curV & 4032) + (curU >> 6)] >>> shadeShift;
          curU += stepU;
          curV += stepV;
          dst[offset++] = texels[(curV & 4032) + (curU >> 6)] >>> shadeShift;
          curU += stepU;
          curV += stepV;
          dst[offset++] = texels[(curV & 4032) + (curU >> 6)] >>> shadeShift;
          curU += stepU;
          curV += stepV;
          dst[offset++] = texels[(curV & 4032) + (curU >> 6)] >>> shadeShift;
          curU += stepU;
          curV += stepV;
          dst[offset++] = texels[(curV & 4032) + (curU >> 6)] >>> shadeShift;
          curU = nextU;
          curV = nextV;
          u += uStride;
          v += vStride;
          w += wStride;
          curW = w >> 12;
          if (curW !== 0) {
            nextU = u / curW | 0;
            nextV = v / curW | 0;
            if (nextU < 7) {
              nextU = 7;
            } else if (nextU > 4032) {
              nextU = 4032;
            }
          }
          stepU = nextU - curU >> 3;
          stepV = nextV - curV >> 3;
          shadeA += shadeStrides;
          curU += shadeA >> 3 & 786432;
          shadeShift = shadeA >> 23;
        }
        strides = xB - xA & 7;
        while (strides-- > 0) {
          dst[offset++] = texels[(curV & 4032) + (curU >> 6)] >>> shadeShift;
          curU += stepU;
          curV += stepV;
        }
      } else {
        while (strides-- > 0) {
          let rgb;
          if ((rgb = texels[(curV & 4032) + (curU >> 6)] >>> shadeShift) !== 0) {
            dst[offset] = rgb;
          }
          offset = offset + 1;
          curU += stepU;
          curV += stepV;
          if ((rgb = texels[(curV & 4032) + (curU >> 6)] >>> shadeShift) !== 0) {
            dst[offset] = rgb;
          }
          offset++;
          curU += stepU;
          curV += stepV;
          if ((rgb = texels[(curV & 4032) + (curU >> 6)] >>> shadeShift) !== 0) {
            dst[offset] = rgb;
          }
          offset++;
          curU += stepU;
          curV += stepV;
          if ((rgb = texels[(curV & 4032) + (curU >> 6)] >>> shadeShift) !== 0) {
            dst[offset] = rgb;
          }
          offset++;
          curU += stepU;
          curV += stepV;
          if ((rgb = texels[(curV & 4032) + (curU >> 6)] >>> shadeShift) !== 0) {
            dst[offset] = rgb;
          }
          offset++;
          curU += stepU;
          curV += stepV;
          if ((rgb = texels[(curV & 4032) + (curU >> 6)] >>> shadeShift) !== 0) {
            dst[offset] = rgb;
          }
          offset++;
          curU += stepU;
          curV += stepV;
          if ((rgb = texels[(curV & 4032) + (curU >> 6)] >>> shadeShift) !== 0) {
            dst[offset] = rgb;
          }
          offset++;
          curU += stepU;
          curV += stepV;
          if ((rgb = texels[(curV & 4032) + (curU >> 6)] >>> shadeShift) !== 0) {
            dst[offset] = rgb;
          }
          offset = offset + 1;
          curU = nextU;
          curV = nextV;
          u += uStride;
          v += vStride;
          w += wStride;
          u |= 0;
          v |= 0;
          w |= 0;
          curW = w >> 12;
          if (curW !== 0) {
            nextU = u / curW | 0;
            nextV = v / curW | 0;
            if (nextU < 7) {
              nextU = 7;
            } else if (nextU > 4032) {
              nextU = 4032;
            }
          }
          stepU = nextU - curU >> 3;
          stepV = nextV - curV >> 3;
          shadeA += shadeStrides;
          curU += shadeA >> 3 & 786432;
          shadeShift = shadeA >> 23;
        }
        strides = xB - xA & 7;
        while (strides-- > 0) {
          let rgb;
          if ((rgb = texels[(curV & 4032) + (curU >> 6)] >>> shadeShift) !== 0) {
            dst[offset] = rgb;
          }
          offset++;
          curU += stepU;
          curV += stepV;
        }
      }
      return;
    }
    nextU = 0;
    nextV = 0;
    dx = xA - this.centerX;
    u = u + (uStride >> 3) * dx;
    v = v + (vStride >> 3) * dx;
    w = w + (wStride >> 3) * dx;
    u |= 0;
    v |= 0;
    w |= 0;
    curW = w >> 14;
    if (curW !== 0) {
      curU = u / curW | 0;
      curV = v / curW | 0;
      if (curU < 0) {
        curU = 0;
      } else if (curU > 16256) {
        curU = 16256;
      }
    }
    u = u + uStride;
    v = v + vStride;
    w = w + wStride;
    u |= 0;
    v |= 0;
    w |= 0;
    curW = w >> 14;
    if (curW !== 0) {
      nextU = u / curW | 0;
      nextV = v / curW | 0;
      if (nextU < 7) {
        nextU = 7;
      } else if (nextU > 16256) {
        nextU = 16256;
      }
    }
    stepU = nextU - curU >> 3;
    stepV = nextV - curV >> 3;
    curU += shadeA & 6291456;
    shadeShift = shadeA >> 23;
    if (this.opaque && texels) {
      while (strides-- > 0) {
        dst[offset++] = texels[(curV & 16256) + (curU >> 7)] >>> shadeShift;
        curU += stepU;
        curV += stepV;
        dst[offset++] = texels[(curV & 16256) + (curU >> 7)] >>> shadeShift;
        curU += stepU;
        curV += stepV;
        dst[offset++] = texels[(curV & 16256) + (curU >> 7)] >>> shadeShift;
        curU += stepU;
        curV += stepV;
        dst[offset++] = texels[(curV & 16256) + (curU >> 7)] >>> shadeShift;
        curU += stepU;
        curV += stepV;
        dst[offset++] = texels[(curV & 16256) + (curU >> 7)] >>> shadeShift;
        curU += stepU;
        curV += stepV;
        dst[offset++] = texels[(curV & 16256) + (curU >> 7)] >>> shadeShift;
        curU += stepU;
        curV += stepV;
        dst[offset++] = texels[(curV & 16256) + (curU >> 7)] >>> shadeShift;
        curU += stepU;
        curV += stepV;
        dst[offset++] = texels[(curV & 16256) + (curU >> 7)] >>> shadeShift;
        curU = nextU;
        curV = nextV;
        u += uStride;
        v += vStride;
        w += wStride;
        u |= 0;
        v |= 0;
        w |= 0;
        curW = w >> 14;
        if (curW !== 0) {
          nextU = u / curW | 0;
          nextV = v / curW | 0;
          if (nextU < 7) {
            nextU = 7;
          } else if (nextU > 16256) {
            nextU = 16256;
          }
        }
        stepU = nextU - curU >> 3;
        stepV = nextV - curV >> 3;
        shadeA += shadeStrides;
        curU += shadeA & 6291456;
        shadeShift = shadeA >> 23;
      }
      strides = xB - xA & 7;
      while (strides-- > 0) {
        dst[offset++] = texels[(curV & 16256) + (curU >> 7)] >>> shadeShift;
        curU += stepU;
        curV += stepV;
      }
      return;
    }
    while (strides-- > 0 && texels) {
      let rgb;
      if ((rgb = texels[(curV & 16256) + (curU >> 7)] >>> shadeShift) !== 0) {
        dst[offset] = rgb;
      }
      offset = offset + 1;
      curU += stepU;
      curV += stepV;
      if ((rgb = texels[(curV & 16256) + (curU >> 7)] >>> shadeShift) !== 0) {
        dst[offset] = rgb;
      }
      offset++;
      curU += stepU;
      curV += stepV;
      if ((rgb = texels[(curV & 16256) + (curU >> 7)] >>> shadeShift) !== 0) {
        dst[offset] = rgb;
      }
      offset++;
      curU += stepU;
      curV += stepV;
      if ((rgb = texels[(curV & 16256) + (curU >> 7)] >>> shadeShift) !== 0) {
        dst[offset] = rgb;
      }
      offset++;
      curU += stepU;
      curV += stepV;
      if ((rgb = texels[(curV & 16256) + (curU >> 7)] >>> shadeShift) !== 0) {
        dst[offset] = rgb;
      }
      offset++;
      curU += stepU;
      curV += stepV;
      if ((rgb = texels[(curV & 16256) + (curU >> 7)] >>> shadeShift) !== 0) {
        dst[offset] = rgb;
      }
      offset++;
      curU += stepU;
      curV += stepV;
      if ((rgb = texels[(curV & 16256) + (curU >> 7)] >>> shadeShift) !== 0) {
        dst[offset] = rgb;
      }
      offset++;
      curU += stepU;
      curV += stepV;
      if ((rgb = texels[(curV & 16256) + (curU >> 7)] >>> shadeShift) !== 0) {
        dst[offset] = rgb;
      }
      offset++;
      curU = nextU;
      curV = nextV;
      u += uStride;
      v += vStride;
      w += wStride;
      u |= 0;
      v |= 0;
      w |= 0;
      curW = w >> 14;
      if (curW !== 0) {
        nextU = u / curW | 0;
        nextV = v / curW | 0;
        if (nextU < 7) {
          nextU = 7;
        } else if (nextU > 16256) {
          nextU = 16256;
        }
      }
      stepU = nextU - curU >> 3;
      stepV = nextV - curV >> 3;
      shadeA += shadeStrides;
      curU += shadeA & 6291456;
      shadeShift = shadeA >> 23;
    }
    strides = xB - xA & 7;
    while (strides-- > 0 && texels) {
      let rgb;
      if ((rgb = texels[(curV & 16256) + (curU >> 7)] >>> shadeShift) !== 0) {
        dst[offset] = rgb;
      }
      offset++;
      curU += stepU;
      curV += stepV;
    }
  }
  static drawScanline(x0, x1, dst, offset, rgb) {
    if (this.clipX) {
      if (x1 > Pix2D.boundX) {
        x1 = Pix2D.boundX;
      }
      if (x0 < 0) {
        x0 = 0;
      }
    }
    if (x0 >= x1) {
      return;
    }
    offset += x0;
    let length = x1 - x0 >> 2;
    if (this.alpha === 0) {
      while (true) {
        length--;
        if (length < 0) {
          length = x1 - x0 & 3;
          while (true) {
            length--;
            if (length < 0) {
              return;
            }
            dst[offset++] = rgb;
          }
        }
        dst[offset++] = rgb;
        dst[offset++] = rgb;
        dst[offset++] = rgb;
        dst[offset++] = rgb;
      }
    }
    const alpha = this.alpha;
    const invAlpha = 256 - this.alpha;
    rgb = ((rgb & 16711935) * invAlpha >> 8 & 16711935) + ((rgb & 65280) * invAlpha >> 8 & 65280);
    while (true) {
      length--;
      if (length < 0) {
        length = x1 - x0 & 3;
        while (true) {
          length--;
          if (length < 0) {
            return;
          }
          dst[offset++] = rgb + ((dst[offset] & 16711935) * alpha >> 8 & 16711935) + ((dst[offset] & 65280) * alpha >> 8 & 65280);
        }
      }
      dst[offset++] = rgb + ((dst[offset] & 16711935) * alpha >> 8 & 16711935) + ((dst[offset] & 65280) * alpha >> 8 & 65280);
      dst[offset++] = rgb + ((dst[offset] & 16711935) * alpha >> 8 & 16711935) + ((dst[offset] & 65280) * alpha >> 8 & 65280);
      dst[offset++] = rgb + ((dst[offset] & 16711935) * alpha >> 8 & 16711935) + ((dst[offset] & 65280) * alpha >> 8 & 65280);
      dst[offset++] = rgb + ((dst[offset] & 16711935) * alpha >> 8 & 16711935) + ((dst[offset] & 65280) * alpha >> 8 & 65280);
    }
  }
  static pushTexture(id) {
    if (this.activeTexels[id] && this.texelPool) {
      this.texelPool[this.poolSize++] = this.activeTexels[id];
      this.activeTexels[id] = null;
    }
    Renderer.updateTexture(id);
  }
  static getTexels(id) {
    this.textureCycle[id] = this.cycle++;
    if (this.activeTexels[id]) {
      return this.activeTexels[id];
    }
    let texels;
    if (this.poolSize > 0 && this.texelPool) {
      texels = this.texelPool[--this.poolSize];
      this.texelPool[this.poolSize] = null;
    } else {
      let cycle = 0;
      let selected = -1;
      for (let t = 0;t < this.textureCount; t++) {
        if (this.activeTexels[t] && (this.textureCycle[t] < cycle || selected === -1)) {
          cycle = this.textureCycle[t];
          selected = t;
        }
      }
      texels = this.activeTexels[selected];
      this.activeTexels[selected] = null;
    }
    this.activeTexels[id] = texels;
    const texture = this.textures[id];
    const palette = this.texPal[id];
    if (!texels || !texture || !palette) {
      return null;
    }
    if (this.lowMemory) {
      this.textureTranslucent[id] = false;
      for (let i = 0;i < 4096; i++) {
        const rgb = texels[i] = palette[texture.pixels[i]] & 16316671;
        if (rgb === 0) {
          this.textureTranslucent[id] = true;
        }
        texels[i + 4096] = rgb - (rgb >>> 3) & 16316671;
        texels[i + 8192] = rgb - (rgb >>> 2) & 16316671;
        texels[i + 12288] = rgb - (rgb >>> 2) - (rgb >>> 3) & 16316671;
      }
    } else {
      if (texture.width2d === 64) {
        for (let y = 0;y < 128; y++) {
          for (let x = 0;x < 128; x++) {
            texels[x + (y << 7 | 0)] = palette[texture.pixels[(x >> 1) + (y >> 1 << 6 | 0)]];
          }
        }
      } else {
        for (let i = 0;i < 16384; i++) {
          texels[i] = palette[texture.pixels[i]];
        }
      }
      this.textureTranslucent[id] = false;
      for (let i = 0;i < 16384; i++) {
        texels[i] &= 16316671;
        const rgb = texels[i];
        if (rgb === 0) {
          this.textureTranslucent[id] = true;
        }
        texels[i + 16384] = rgb - (rgb >>> 3) & 16316671;
        texels[i + 32768] = rgb - (rgb >>> 2) & 16316671;
        texels[i + 49152] = rgb - (rgb >>> 2) - (rgb >>> 3) & 16316671;
      }
    }
    return texels;
  }
}

// src/graphics/PixMap.ts
class PixMap {
  image;
  width2d;
  height2d;
  ctx;
  paint;
  pixels;
  constructor(width, height, ctx = canvas2d) {
    this.ctx = ctx;
    this.image = this.ctx.getImageData(0, 0, width, height);
    this.paint = new Uint32Array(this.image.data.buffer);
    this.pixels = new Int32Array(width * height);
    this.width2d = width;
    this.height2d = height;
    this.bind();
  }
  clear() {
    this.pixels.fill(0);
  }
  bind() {
    Pix2D.bind(this.pixels, this.width2d, this.height2d);
  }
  draw(x, y) {
    if (Renderer.renderPixMap(this, x, y)) {
      return;
    }
    this.#setPixels();
    this.ctx.putImageData(this.image, x, y);
  }
  #setPixels() {
    const length = this.pixels.length;
    const pixels = this.pixels;
    const paint = this.paint;
    for (let i = 0;i < length; i++) {
      const pixel = pixels[i];
      paint[i] = pixel >> 16 & 255 | (pixel >> 8 & 255) << 8 | (pixel & 255) << 16 | 4278190080;
    }
  }
}

// src/client/KeyCodes.ts
var CanvasEnabledKeys = ["F11", "F12"];
var KeyCodes = new Map;
KeyCodes.set("ArrowLeft", { code: 37, ch: 1 });
KeyCodes.set("ArrowRight", { code: 39, ch: 2 });
KeyCodes.set("ArrowUp", { code: 38, ch: 3 });
KeyCodes.set("ArrowDown", { code: 40, ch: 4 });
KeyCodes.set("Control", { code: 17, ch: 5 });
KeyCodes.set("Shift", { code: 16, ch: 6 });
KeyCodes.set("Alt", { code: 18, ch: 7 });
KeyCodes.set("Backspace", { code: 8, ch: 8 });
KeyCodes.set("Tab", { code: 9, ch: 9 });
KeyCodes.set("Enter", { code: 10, ch: 10 });
KeyCodes.set("Escape", { code: 27, ch: 27 });
KeyCodes.set(" ", { code: 32, ch: 32 });
KeyCodes.set("Delete", { code: 127, ch: 127 });
KeyCodes.set("Home", { code: 36, ch: 1000 });
KeyCodes.set("End", { code: 35, ch: 1001 });
KeyCodes.set("PageUp", { code: 33, ch: 1002 });
KeyCodes.set("PageDown", { code: 34, ch: 1003 });
KeyCodes.set("F1", { code: 112, ch: 1008 });
KeyCodes.set("F2", { code: 113, ch: 1009 });
KeyCodes.set("F3", { code: 114, ch: 1010 });
KeyCodes.set("F4", { code: 115, ch: 1011 });
KeyCodes.set("F5", { code: 116, ch: 1012 });
KeyCodes.set("F6", { code: 117, ch: 1013 });
KeyCodes.set("F7", { code: 118, ch: 1014 });
KeyCodes.set("F8", { code: 119, ch: 1015 });
KeyCodes.set("F9", { code: 120, ch: 1016 });
KeyCodes.set("F10", { code: 121, ch: 1017 });
KeyCodes.set("F11", { code: 122, ch: 1018 });
KeyCodes.set("F12", { code: 123, ch: 1019 });
KeyCodes.set("CapsLock", { code: 20, ch: 65535 });
KeyCodes.set("Meta", { code: 524, ch: 65535 });
KeyCodes.set("Insert", { code: 155, ch: 65535 });
KeyCodes.set("`", { code: 192, ch: 96 });
KeyCodes.set("~", { code: 192, ch: 126 });
KeyCodes.set("!", { code: 49, ch: 33 });
KeyCodes.set("@", { code: 50, ch: 64 });
KeyCodes.set("#", { code: 51, ch: 35 });
KeyCodes.set("£", { code: 51, ch: 163 });
KeyCodes.set("$", { code: 52, ch: 36 });
KeyCodes.set("%", { code: 53, ch: 37 });
KeyCodes.set("^", { code: 54, ch: 94 });
KeyCodes.set("&", { code: 55, ch: 38 });
KeyCodes.set("*", { code: 56, ch: 42 });
KeyCodes.set("(", { code: 57, ch: 40 });
KeyCodes.set(")", { code: 48, ch: 41 });
KeyCodes.set("-", { code: 45, ch: 45 });
KeyCodes.set("_", { code: 45, ch: 95 });
KeyCodes.set("=", { code: 61, ch: 61 });
KeyCodes.set("+", { code: 61, ch: 43 });
KeyCodes.set("[", { code: 91, ch: 91 });
KeyCodes.set("{", { code: 91, ch: 123 });
KeyCodes.set("]", { code: 93, ch: 93 });
KeyCodes.set("}", { code: 93, ch: 125 });
KeyCodes.set("\\", { code: 92, ch: 92 });
KeyCodes.set("|", { code: 92, ch: 124 });
KeyCodes.set(";", { code: 59, ch: 59 });
KeyCodes.set(":", { code: 59, ch: 58 });
KeyCodes.set("'", { code: 222, ch: 39 });
KeyCodes.set('"', { code: 222, ch: 34 });
KeyCodes.set(",", { code: 44, ch: 44 });
KeyCodes.set("<", { code: 44, ch: 60 });
KeyCodes.set(".", { code: 46, ch: 46 });
KeyCodes.set(">", { code: 46, ch: 62 });
KeyCodes.set("/", { code: 47, ch: 47 });
KeyCodes.set("?", { code: 47, ch: 63 });
KeyCodes.set("0", { code: 48, ch: 48 });
KeyCodes.set("1", { code: 49, ch: 49 });
KeyCodes.set("2", { code: 50, ch: 50 });
KeyCodes.set("3", { code: 51, ch: 51 });
KeyCodes.set("4", { code: 52, ch: 52 });
KeyCodes.set("5", { code: 53, ch: 53 });
KeyCodes.set("6", { code: 54, ch: 54 });
KeyCodes.set("7", { code: 55, ch: 55 });
KeyCodes.set("8", { code: 56, ch: 56 });
KeyCodes.set("9", { code: 57, ch: 57 });
KeyCodes.set("a", { code: 65, ch: 97 });
KeyCodes.set("b", { code: 66, ch: 98 });
KeyCodes.set("c", { code: 67, ch: 99 });
KeyCodes.set("d", { code: 68, ch: 100 });
KeyCodes.set("e", { code: 69, ch: 101 });
KeyCodes.set("f", { code: 70, ch: 102 });
KeyCodes.set("g", { code: 71, ch: 103 });
KeyCodes.set("h", { code: 72, ch: 104 });
KeyCodes.set("i", { code: 73, ch: 105 });
KeyCodes.set("j", { code: 74, ch: 106 });
KeyCodes.set("k", { code: 75, ch: 107 });
KeyCodes.set("l", { code: 76, ch: 108 });
KeyCodes.set("m", { code: 77, ch: 109 });
KeyCodes.set("n", { code: 78, ch: 110 });
KeyCodes.set("o", { code: 79, ch: 111 });
KeyCodes.set("p", { code: 80, ch: 112 });
KeyCodes.set("q", { code: 81, ch: 113 });
KeyCodes.set("r", { code: 82, ch: 114 });
KeyCodes.set("s", { code: 83, ch: 115 });
KeyCodes.set("t", { code: 84, ch: 116 });
KeyCodes.set("u", { code: 85, ch: 117 });
KeyCodes.set("v", { code: 86, ch: 118 });
KeyCodes.set("w", { code: 87, ch: 119 });
KeyCodes.set("x", { code: 88, ch: 120 });
KeyCodes.set("y", { code: 89, ch: 121 });
KeyCodes.set("z", { code: 90, ch: 122 });
KeyCodes.set("A", { code: 65, ch: 65 });
KeyCodes.set("B", { code: 66, ch: 66 });
KeyCodes.set("C", { code: 67, ch: 67 });
KeyCodes.set("D", { code: 68, ch: 68 });
KeyCodes.set("E", { code: 69, ch: 69 });
KeyCodes.set("F", { code: 70, ch: 70 });
KeyCodes.set("G", { code: 71, ch: 71 });
KeyCodes.set("H", { code: 72, ch: 72 });
KeyCodes.set("I", { code: 73, ch: 73 });
KeyCodes.set("J", { code: 74, ch: 74 });
KeyCodes.set("K", { code: 75, ch: 75 });
KeyCodes.set("L", { code: 76, ch: 76 });
KeyCodes.set("M", { code: 77, ch: 77 });
KeyCodes.set("N", { code: 78, ch: 78 });
KeyCodes.set("O", { code: 79, ch: 79 });
KeyCodes.set("P", { code: 80, ch: 80 });
KeyCodes.set("Q", { code: 81, ch: 81 });
KeyCodes.set("R", { code: 82, ch: 82 });
KeyCodes.set("S", { code: 83, ch: 83 });
KeyCodes.set("T", { code: 84, ch: 84 });
KeyCodes.set("U", { code: 85, ch: 85 });
KeyCodes.set("V", { code: 86, ch: 86 });
KeyCodes.set("W", { code: 87, ch: 87 });
KeyCodes.set("X", { code: 88, ch: 88 });
KeyCodes.set("Y", { code: 89, ch: 89 });
KeyCodes.set("Z", { code: 90, ch: 90 });

// src/client/InputTracking.ts
class InputTracking {
  static trackingActive = false;
  static outBuffer = null;
  static oldBuffer = null;
  static lastTime = 0;
  static trackedCount = 0;
  static lastMoveTime = 0;
  static lastX = 0;
  static lastY = 0;
  static setEnabled() {
    this.outBuffer = Packet.alloc(1);
    this.oldBuffer = null;
    this.lastTime = performance.now();
    this.trackingActive = true;
  }
  static setDisabled() {
    this.trackingActive = false;
    this.outBuffer = null;
  }
  static flush() {
    let buffer = null;
    if (this.oldBuffer && this.trackingActive) {
      buffer = this.oldBuffer;
    }
    this.oldBuffer = null;
    return buffer;
  }
  static stop() {
    let buffer = null;
    if (this.outBuffer && this.outBuffer.pos > 0 && this.trackingActive) {
      buffer = this.outBuffer;
    }
    this.setDisabled();
    return buffer;
  }
  static mousePressed(x, y, button) {
    if (!(this.trackingActive && x >= 0 && x < 789 && y >= 0 && y < 532)) {
      return;
    }
    this.trackedCount++;
    const now = performance.now();
    let delta = (now - this.lastTime) / 10 | 0;
    if (delta > 250) {
      delta = 250;
    }
    this.lastTime = now;
    this.ensureCapacity(5);
    if (button === 2) {
      this.outBuffer?.p1(1);
    } else {
      this.outBuffer?.p1(2);
    }
    this.outBuffer?.p1(delta);
    this.outBuffer?.p3(x + (y << 10));
  }
  static mouseReleased(button) {
    if (!this.trackingActive) {
      return;
    }
    this.trackedCount++;
    const now = performance.now();
    let delta = (now - this.lastTime) / 10 | 0;
    if (delta > 250) {
      delta = 250;
    }
    this.lastTime = now;
    this.ensureCapacity(2);
    if (button === 2) {
      this.outBuffer?.p1(3);
    } else {
      this.outBuffer?.p1(4);
    }
    this.outBuffer?.p1(delta);
  }
  static mouseMoved(x, y) {
    if (!(this.trackingActive && x >= 0 && x < 789 && y >= 0 && y < 532)) {
      return;
    }
    const now = performance.now();
    if (now - this.lastMoveTime >= 50) {
      this.lastMoveTime = now;
      this.trackedCount++;
      let delta = (now - this.lastTime) / 10 | 0;
      if (delta > 250) {
        delta = 250;
      }
      this.lastTime = now;
      if (x - this.lastX < 8 && x - this.lastX >= -8 && y - this.lastY < 8 && y - this.lastY >= -8) {
        this.ensureCapacity(3);
        this.outBuffer?.p1(5);
        this.outBuffer?.p1(delta);
        this.outBuffer?.p1(x + (y - this.lastY + 8 << 4) + 8 - this.lastX);
      } else if (x - this.lastX < 128 && x - this.lastX >= -128 && y - this.lastY < 128 && y - this.lastY >= -128) {
        this.ensureCapacity(4);
        this.outBuffer?.p1(6);
        this.outBuffer?.p1(delta);
        this.outBuffer?.p1(x + 128 - this.lastX);
        this.outBuffer?.p1(y + 128 - this.lastY);
      } else {
        this.ensureCapacity(5);
        this.outBuffer?.p1(7);
        this.outBuffer?.p1(delta);
        this.outBuffer?.p3(x + (y << 10));
      }
      this.lastX = x;
      this.lastY = y;
    }
  }
  static keyPressed(key) {
    if (!this.trackingActive) {
      return;
    }
    this.trackedCount++;
    const now = performance.now();
    let delta = (now - this.lastTime) / 10 | 0;
    if (delta > 250) {
      delta = 250;
    }
    this.lastTime = now;
    if (key === 1000) {
      key = 11;
    } else if (key === 1001) {
      key = 12;
    } else if (key === 1002) {
      key = 14;
    } else if (key === 1003) {
      key = 15;
    } else if (key >= 1008) {
      key -= 992;
    }
    this.ensureCapacity(3);
    this.outBuffer?.p1(8);
    this.outBuffer?.p1(delta);
    this.outBuffer?.p1(key);
  }
  static keyReleased(key) {
    if (!this.trackingActive) {
      return;
    }
    this.trackedCount++;
    const now = performance.now();
    let delta = (now - this.lastTime) / 10 | 0;
    if (delta > 250) {
      delta = 250;
    }
    this.lastTime = now;
    if (key === 1000) {
      key = 11;
    } else if (key === 1001) {
      key = 12;
    } else if (key === 1002) {
      key = 14;
    } else if (key === 1003) {
      key = 15;
    } else if (key >= 1008) {
      key -= 992;
    }
    this.ensureCapacity(3);
    this.outBuffer?.p1(9);
    this.outBuffer?.p1(delta);
    this.outBuffer?.p1(key);
  }
  static focusGained() {
    if (!this.trackingActive) {
      return;
    }
    this.trackedCount++;
    const now = performance.now();
    let delta = (now - this.lastTime) / 10 | 0;
    if (delta > 250) {
      delta = 250;
    }
    this.lastTime = now;
    this.ensureCapacity(2);
    this.outBuffer?.p1(10);
    this.outBuffer?.p1(delta);
  }
  static focusLost() {
    if (!this.trackingActive) {
      return;
    }
    this.trackedCount++;
    const now = performance.now();
    let delta = (now - this.lastTime) / 10 | 0;
    if (delta > 250) {
      delta = 250;
    }
    this.lastTime = now;
    this.ensureCapacity(2);
    this.outBuffer?.p1(11);
    this.outBuffer?.p1(delta);
  }
  static mouseEntered() {
    if (!this.trackingActive) {
      return;
    }
    this.trackedCount++;
    const now = performance.now();
    let delta = (now - this.lastTime) / 10 | 0;
    if (delta > 250) {
      delta = 250;
    }
    this.lastTime = now;
    this.ensureCapacity(2);
    this.outBuffer?.p1(12);
    this.outBuffer?.p1(delta);
  }
  static mouseExited() {
    if (!this.trackingActive) {
      return;
    }
    this.trackedCount++;
    const now = performance.now();
    let delta = (now - this.lastTime) / 10 | 0;
    if (delta > 250) {
      delta = 250;
    }
    this.lastTime = now;
    this.ensureCapacity(2);
    this.outBuffer?.p1(13);
    this.outBuffer?.p1(delta);
  }
  static ensureCapacity(n) {
    if (!this.outBuffer) {
      return;
    }
    if (this.outBuffer.pos + n >= 500) {
      const buffer = this.outBuffer;
      this.outBuffer = Packet.alloc(1);
      this.oldBuffer = buffer;
    }
  }
}

// src/client/GameShell.ts
import { MobileKeyboard } from "./deps.js";
var import_stats = __toESM(require_stats_min(), 1);

class GameShell {
  slowestMS = 0;
  averageMS = [];
  averageIndexMS = 0;
  drawArea = null;
  state = 0;
  redrawScreen = true;
  resizeToFit = false;
  hasFocus = true;
  ingame = false;
  idleCycles = performance.now();
  mouseButton = 0;
  mouseX = -1;
  mouseY = -1;
  mouseClickButton = 0;
  mouseClickX = -1;
  mouseClickY = -1;
  actionKey = [];
  keyQueue = [];
  keyQueueReadPos = 0;
  keyQueueWritePos = 0;
  touching = false;
  startedInViewport = false;
  startedInTabArea = false;
  time = -1;
  sx = 0;
  sy = 0;
  mx = 0;
  my = 0;
  nx = 0;
  ny = 0;
  drawStats = new import_stats.default;
  updateStats = new import_stats.default;
  rafId = 0;
  updateRate = 20;
  updateAcc = 0;
  lastUpdate = performance.now();
  async load() {}
  async update(now) {}
  async draw(now) {}
  async refresh() {}
  constructor(resizetoFit = false) {
    canvasOverlay.tabIndex = -1;
    canvas2d.fillStyle = "black";
    canvas2d.fillRect(0, 0, canvas.width, canvas.height);
    this.resizeToFit = resizetoFit;
    if (this.resizeToFit) {
      this.resize(window.innerWidth, window.innerHeight);
    } else {
      this.resize(canvas.width, canvas.height);
    }
  }
  get width() {
    return canvas.width;
  }
  get height() {
    return canvas.height;
  }
  resize(width, height) {
    canvas.width = width;
    canvas.height = height;
    this.drawArea = new PixMap(width, height);
    Pix3D.init2D();
    Renderer.resize(width, height);
  }
  async run() {
    canvas.addEventListener("resize", () => {
      if (this.resizeToFit) {
        this.resize(window.innerWidth, window.innerHeight);
      }
    }, false);
    canvasOverlay.focus();
    canvasOverlay.onfocus = this.onfocus.bind(this);
    canvasOverlay.onblur = this.onblur.bind(this);
    canvasOverlay.onmousedown = this.onmousedown.bind(this);
    canvasOverlay.onmouseup = this.onmouseup.bind(this);
    canvasOverlay.onmouseenter = this.onmouseenter.bind(this);
    canvasOverlay.onmouseleave = this.onmouseleave.bind(this);
    canvasOverlay.onmousemove = this.onmousemove.bind(this);
    canvasOverlay.onkeydown = this.onkeydown.bind(this);
    canvasOverlay.onkeyup = this.onkeyup.bind(this);
    if (this.isMobile) {
      canvasOverlay.ontouchstart = this.ontouchstart.bind(this);
      canvasOverlay.ontouchend = this.ontouchend.bind(this);
      canvasOverlay.ontouchmove = this.ontouchmove.bind(this);
    }
    canvasOverlay.oncontextmenu = (e) => {
      e.preventDefault();
    };
    window.oncontextmenu = (e) => {
      e.preventDefault();
    };
    await this.showProgress(0, "Loading...");
    await this.load();
    this.drawStats.showPanel(0);
    this.drawStats.dom.style.cssText = "display:none;position:absolute;top:0px;right:0px;";
    canvasContainer.appendChild(this.drawStats.dom);
    this.updateStats.showPanel(1);
    this.updateStats.dom.style.cssText = "display:none;position:absolute;top:48px;right:0px;";
    canvasContainer.appendChild(this.updateStats.dom);
    setTimeout(this.mainupdate.bind(this), 0);
    window.requestAnimationFrame(this.maindraw.bind(this));
  }
  async mainupdate() {
    const now = performance.now();
    const elapsed = now - this.lastUpdate;
    this.lastUpdate = now;
    this.updateAcc += elapsed;
    if (this.updateAcc >= this.updateRate) {
      if (this.state > 0) {
        this.state--;
        if (this.state === 0) {
          this.shutdown();
          return;
        }
      }
      this.updateStats.update();
    }
    while (this.updateAcc >= this.updateRate) {
      await this.mainupdateinner(now);
      this.updateAcc -= this.updateRate;
    }
    setTimeout(this.mainupdate.bind(this), 1);
  }
  async mainupdateinner(now) {
    await this.update(now);
    this.mouseClickButton = 0;
    this.keyQueueReadPos = this.keyQueueWritePos;
  }
  async maindraw(now) {
    this.drawStats.begin();
    await this.maindrawinner(now);
    this.drawStats.end();
    this.rafId = window.requestAnimationFrame(this.maindraw.bind(this));
  }
  async maindrawinner(now) {
    await this.draw(now);
    if (this.isMobile) {
      MobileKeyboard.draw();
    }
  }
  shutdown() {
    this.state = -2;
    window.cancelAnimationFrame(this.rafId);
  }
  setUpdateRate(rate) {
    this.updateRate = 1000 / rate | 0;
  }
  start() {
    if (this.state >= 0) {
      this.state = 0;
    }
  }
  stop() {
    if (this.state >= 0) {
      this.state = 4000 / this.updateRate | 0;
    }
  }
  destroy() {
    this.state = -1;
  }
  async showProgress(progress, message) {
    const width = this.width;
    const height = this.height;
    if (this.redrawScreen) {
      canvas2d.fillStyle = "black";
      canvas2d.fillRect(0, 0, width, height);
      this.redrawScreen = false;
    }
    const y = height / 2 - 18;
    canvas2d.fillStyle = "rgb(140, 17, 17)";
    canvas2d.rect((width / 2 | 0) - 152, y, 304, 34);
    canvas2d.fillRect((width / 2 | 0) - 150, y + 2, progress * 3, 30);
    canvas2d.fillStyle = "black";
    canvas2d.fillRect((width / 2 | 0) - 150 + progress * 3, y + 2, 300 - progress * 3, 30);
    canvas2d.font = "bold 13px helvetica, sans-serif";
    canvas2d.textAlign = "center";
    canvas2d.fillStyle = "white";
    canvas2d.fillText(message, width / 2 | 0, y + 22);
    await sleep(5);
  }
  pollKey() {
    let key = -1;
    if (this.keyQueueWritePos !== this.keyQueueReadPos) {
      key = this.keyQueue[this.keyQueueReadPos];
      this.keyQueueReadPos = this.keyQueueReadPos + 1 & 127;
    }
    return key;
  }
  onkeydown(e) {
    this.idleCycles = performance.now();
    const keyCode = KeyCodes.get(e.key);
    if (!keyCode || e.code.length === 0 && !e.isTrusted) {
      return;
    }
    let ch = keyCode.ch;
    if (e.ctrlKey) {
      if (ch >= 65 && ch <= 93 || ch == 95) {
        ch -= 65 - 1;
      } else if (ch >= 97 && ch <= 122) {
        ch -= 97 - 1;
      }
    }
    if (ch > 0 && ch < 128) {
      this.actionKey[ch] = 1;
    }
    if (ch > 4) {
      this.keyQueue[this.keyQueueWritePos] = ch;
      this.keyQueueWritePos = this.keyQueueWritePos + 1 & 127;
    }
    if (InputTracking.trackingActive) {
      InputTracking.keyPressed(ch);
    }
    if (!CanvasEnabledKeys.includes(e.key)) {
      e.preventDefault();
    }
  }
  onkeyup(e) {
    this.idleCycles = performance.now();
    const keyCode = KeyCodes.get(e.key);
    if (!keyCode || e.code.length === 0 && !e.isTrusted) {
      return;
    }
    let ch = keyCode.ch;
    if (e.ctrlKey) {
      if (ch >= 65 && ch <= 93 || ch == 95) {
        ch -= 65 - 1;
      } else if (ch >= 97 && ch <= 122) {
        ch -= 97 - 1;
      }
    }
    if (ch > 0 && ch < 128) {
      this.actionKey[ch] = 0;
    }
    if (InputTracking.trackingActive) {
      InputTracking.keyReleased(ch);
    }
    if (!CanvasEnabledKeys.includes(e.key)) {
      e.preventDefault();
    }
  }
  onmousedown(e) {
    this.touching = false;
    if (e.clientX > 0 || e.clientY > 0)
      this.setMousePosition(e);
    this.idleCycles = performance.now();
    this.mouseClickX = this.mouseX;
    this.mouseClickY = this.mouseY;
    if (this.isMobile && !this.isCapacitor) {
      if (this.insideMobileInputArea() && !this.insideUsernameArea() && !this.inPasswordArea()) {
        this.mouseClickButton = 0;
        this.mouseButton = 0;
        return;
      }
      const eventTime = e.timeStamp;
      if (eventTime >= this.time + 500) {
        this.mouseClickButton = 2;
        this.mouseButton = 2;
      } else {
        this.mouseClickButton = 1;
        this.mouseButton = 1;
      }
    } else {
      if (e.button === 2) {
        this.mouseClickButton = 2;
        this.mouseButton = 2;
      } else if (e.button === 0) {
        this.mouseClickButton = 1;
        this.mouseButton = 1;
      }
    }
    if (MobileKeyboard.isDisplayed()) {
      if (MobileKeyboard.captureMouseDown(this.mouseX, this.mouseY)) {
        this.mouseButton = 0;
        this.mouseClickButton = 0;
      }
    }
    if (InputTracking.trackingActive) {
      InputTracking.mousePressed(this.mouseClickX, this.mouseClickY, e.button);
    }
  }
  onmouseup(e) {
    this.setMousePosition(e);
    this.idleCycles = performance.now();
    this.mouseButton = 0;
    if (InputTracking.trackingActive) {
      InputTracking.mouseReleased(e.button);
    }
    if (this.isMobile) {
      const insideMobileInputArea = this.insideMobileInputArea();
      if (insideMobileInputArea && !MobileKeyboard.isDisplayed()) {
        MobileKeyboard.show(this.mouseX, this.mouseY);
      } else if (MobileKeyboard.isDisplayed()) {
        if (!MobileKeyboard.captureMouseUp(this.mouseX, this.mouseY)) {
          MobileKeyboard.hide();
          this.refresh();
        }
      }
    }
  }
  onmouseenter(e) {
    this.setMousePosition(e);
    if (InputTracking.trackingActive) {
      InputTracking.mouseEntered();
    }
  }
  onmouseleave(e) {
    this.setMousePosition(e);
    this.idleCycles = performance.now();
    this.mouseX = -1;
    this.mouseY = -1;
    this.mouseButton = 0;
    this.mouseClickX = -1;
    this.mouseClickY = -1;
    if (InputTracking.trackingActive) {
      InputTracking.mouseExited();
    }
  }
  onmousemove(e) {
    this.setMousePosition(e);
    this.idleCycles = performance.now();
    if (this.isMobile && this.touching) {
      if (MobileKeyboard.isDisplayed()) {
        MobileKeyboard.notifyTouchMove(this.mouseX, this.mouseY);
      }
    }
    if (InputTracking.trackingActive) {
      InputTracking.mouseMoved(this.mouseX, this.mouseY);
    }
  }
  onfocus(e) {
    this.hasFocus = true;
    this.redrawScreen = true;
    this.refresh();
    if (InputTracking.trackingActive) {
      InputTracking.focusGained();
    }
  }
  onblur(e) {
    this.hasFocus = false;
    for (let i = 0;i < 128; i++) {
      this.actionKey[i] = 0;
    }
    if (InputTracking.trackingActive) {
      InputTracking.focusLost();
    }
  }
  ontouchstart(e) {
    if (!this.isMobile) {
      return;
    }
    this.touching = true;
    const touch = e.changedTouches[0];
    const clientX = touch.clientX | 0;
    const clientY = touch.clientY | 0;
    this.onmousemove(new MouseEvent("mousemove", { clientX, clientY }));
    this.sx = this.nx = this.mx = touch.screenX | 0;
    this.sy = this.ny = this.my = touch.screenY | 0;
    this.time = e.timeStamp;
    this.startedInViewport = this.insideViewportArea();
    this.startedInTabArea = this.insideTabArea();
  }
  ontouchend(e) {
    if (!this.isMobile || !this.touching) {
      return;
    }
    const touch = e.changedTouches[0];
    const clientX = touch.clientX | 0;
    const clientY = touch.clientY | 0;
    this.onmousemove(new MouseEvent("mousemove", { clientX, clientY }));
    this.nx = touch.screenX | 0;
    this.ny = touch.screenY | 0;
    this.onkeyup(new KeyboardEvent("keyup", { key: "ArrowLeft", code: "ArrowLeft" }));
    this.onkeyup(new KeyboardEvent("keyup", { key: "ArrowUp", code: "ArrowUp" }));
    this.onkeyup(new KeyboardEvent("keyup", { key: "ArrowRight", code: "ArrowRight" }));
    this.onkeyup(new KeyboardEvent("keyup", { key: "ArrowDown", code: "ArrowDown" }));
    if (this.startedInViewport && !this.insideViewportArea()) {
      this.touching = false;
      return;
    } else if (this.startedInTabArea && !this.insideTabArea()) {
      this.touching = false;
      return;
    } else if (this.insideMobileInputArea()) {
      this.touching = false;
      return;
    }
    const eventTime = e.timeStamp;
    const longPress = eventTime >= this.time + 500;
    const moved = Math.abs(this.sx - this.nx) > 16 || Math.abs(this.sy - this.ny) > 16;
    if (longPress && !moved) {
      this.touching = true;
      this.onmousedown(new MouseEvent("mousedown", { clientX, clientY, button: 2 }));
      this.onmouseup(new MouseEvent("mouseup", { clientX, clientY, button: 2 }));
    }
  }
  ontouchmove(e) {
    if (!this.isMobile || !this.touching) {
      return;
    }
    if (e.touches.length > 1) {
      return;
    }
    e.preventDefault();
    const touch = e.changedTouches[0];
    const clientX = touch.clientX | 0;
    const clientY = touch.clientY | 0;
    this.onmousemove(new MouseEvent("mousemove", { clientX, clientY }));
    this.nx = touch.screenX | 0;
    this.ny = touch.screenY | 0;
    if (!MobileKeyboard.isWithinCanvasKeyboard(this.mouseX, this.mouseY)) {
      if (this.startedInViewport && this.getViewportInterfaceId() === -1) {
        if (this.mx - this.nx > 0) {
          this.rotate(2);
        } else if (this.mx - this.nx < 0) {
          this.rotate(0);
        }
        if (this.my - this.ny > 0) {
          this.rotate(3);
        } else if (this.my - this.ny < 0) {
          this.rotate(1);
        }
      } else if (this.startedInTabArea || this.getViewportInterfaceId() !== -1) {
        this.onmousedown(new MouseEvent("mousedown", { clientX, clientY, button: 1 }));
      }
    }
    this.mx = this.nx;
    this.my = this.ny;
  }
  get isMobile() {
    const keywords = ["Android", "webOS", "iPhone", "iPad", "iPod", "BlackBerry", "Windows Phone"];
    if (keywords.some((keyword) => navigator.userAgent.includes(keyword))) {
      return true;
    }
    if (navigator) {
      const isiOSSafari = navigator.maxTouchPoints !== undefined && navigator.maxTouchPoints > 2 && navigator.standalone !== undefined;
      if (isiOSSafari) {
        return true;
      }
    }
    return false;
  }
  get isAndroid() {
    const keywords = ["Android"];
    return keywords.some((keyword) => navigator.userAgent.includes(keyword));
  }
  get isCapacitor() {
    const keywords = ["Capacitor"];
    return keywords.some((keyword) => navigator.userAgent.includes(keyword));
  }
  insideViewportArea() {
    const viewportAreaX1 = 8;
    const viewportAreaY1 = 11;
    const viewportAreaX2 = viewportAreaX1 + 512;
    const viewportAreaY2 = viewportAreaY1 + 334;
    return this.ingame && this.mouseX >= viewportAreaX1 && this.mouseX <= viewportAreaX2 && this.mouseY >= viewportAreaY1 && this.mouseY <= viewportAreaY2;
  }
  insideMobileInputArea() {
    return this.insideChatInputArea() || this.insideChatPopupArea() || this.insideUsernameArea() || this.inPasswordArea() || this.insideReportInterfaceTextArea();
  }
  insideChatInputArea() {
    const chatInputAreaX1 = 11;
    const chatInputAreaY1 = 449;
    const chatInputAreaX2 = chatInputAreaX1 + 495;
    const chatInputAreaY2 = chatInputAreaY1 + 33;
    return this.ingame && this.getChatInterfaceId() === -1 && !this.isChatBackInputOpen() && !this.isShowSocialInput() && this.mouseX >= chatInputAreaX1 && this.mouseX <= chatInputAreaX2 && this.mouseY >= chatInputAreaY1 && this.mouseY <= chatInputAreaY2;
  }
  insideChatPopupArea() {
    const chatInputAreaX1 = 11;
    const chatInputAreaY1 = 383;
    const chatInputAreaX2 = chatInputAreaX1 + 495;
    const chatInputAreaY2 = chatInputAreaY1 + 99;
    return this.ingame && (this.isChatBackInputOpen() || this.isShowSocialInput()) && this.mouseX >= chatInputAreaX1 && this.mouseX <= chatInputAreaX2 && this.mouseY >= chatInputAreaY1 && this.mouseY <= chatInputAreaY2;
  }
  insideReportInterfaceTextArea() {
    if (!this.ingame) {
      return false;
    }
    const viewportInterfaceId = this.getViewportInterfaceId();
    const reportAbuseInterfaceId = this.getReportAbuseInterfaceId();
    if (viewportInterfaceId === -1 || reportAbuseInterfaceId === -1) {
      return false;
    }
    if (viewportInterfaceId !== reportAbuseInterfaceId) {
      return false;
    }
    const reportInputAreaX1 = 82;
    const reportInputAreaY1 = 137;
    const reportInputAreaX2 = reportInputAreaX1 + 366;
    const reportInputAreaY2 = reportInputAreaY1 + 26;
    return this.mouseX >= reportInputAreaX1 && this.mouseX <= reportInputAreaX2 && this.mouseY >= reportInputAreaY1 && this.mouseY <= reportInputAreaY2;
  }
  insideTabArea() {
    const tabAreaX1 = 562;
    const tabAreaY1 = 231;
    const tabAreaX2 = tabAreaX1 + 190;
    const tabAreaY2 = tabAreaY1 + 261;
    return this.ingame && this.mouseX >= tabAreaX1 && this.mouseX <= tabAreaX2 && this.mouseY >= tabAreaY1 && this.mouseY <= tabAreaY2;
  }
  insideUsernameArea() {
    const usernameAreaX1 = 301;
    const usernameAreaY1 = 262;
    const usernameAreaX2 = usernameAreaX1 + 261;
    const usernameAreaY2 = usernameAreaY1 + 17;
    return !this.ingame && this.getTitleScreenState() === 2 && this.mouseX >= usernameAreaX1 && this.mouseX <= usernameAreaX2 && this.mouseY >= usernameAreaY1 && this.mouseY <= usernameAreaY2;
  }
  inPasswordArea() {
    const passwordAreaX1 = 301;
    const passwordAreaY1 = 279;
    const passwordAreaX2 = passwordAreaX1 + 261;
    const passwordAreaY2 = passwordAreaY1 + 17;
    return !this.ingame && this.getTitleScreenState() === 2 && this.mouseX >= passwordAreaX1 && this.mouseX <= passwordAreaX2 && this.mouseY >= passwordAreaY1 && this.mouseY <= passwordAreaY2;
  }
  rotate(direction) {
    if (direction === 0) {
      this.onkeyup(new KeyboardEvent("keyup", { key: "ArrowRight", code: "ArrowRight" }));
      this.onkeydown(new KeyboardEvent("keydown", { key: "ArrowLeft", code: "ArrowLeft" }));
    } else if (direction === 1) {
      this.onkeyup(new KeyboardEvent("keyup", { key: "ArrowDown", code: "ArrowDown" }));
      this.onkeydown(new KeyboardEvent("keydown", { key: "ArrowUp", code: "ArrowUp" }));
    } else if (direction === 2) {
      this.onkeyup(new KeyboardEvent("keyup", { key: "ArrowLeft", code: "ArrowLeft" }));
      this.onkeydown(new KeyboardEvent("keydown", { key: "ArrowRight", code: "ArrowRight" }));
    } else if (direction === 3) {
      this.onkeyup(new KeyboardEvent("keyup", { key: "ArrowUp", code: "ArrowUp" }));
      this.onkeydown(new KeyboardEvent("keydown", { key: "ArrowDown", code: "ArrowDown" }));
    }
  }
  isFullScreen() {
    return document.fullscreenElement !== null;
  }
  setMousePosition(e) {
    const fixedWidth = this.width;
    const fixedHeight = this.height;
    const canvasBounds = canvas.getBoundingClientRect();
    const clickLocWithinCanvas = {
      x: e.clientX - canvasBounds.left,
      y: e.clientY - canvasBounds.top
    };
    if (this.isFullScreen()) {
      const gameAspectRatio = fixedWidth / fixedHeight;
      const ourAspectRatio = window.innerWidth / window.innerHeight;
      const wider = ourAspectRatio >= gameAspectRatio;
      let trueCanvasWidth = 0;
      let trueCanvasHeight = 0;
      let offsetX = 0;
      let offsetY = 0;
      if (wider) {
        trueCanvasWidth = window.innerHeight * gameAspectRatio;
        trueCanvasHeight = window.innerHeight;
        offsetX = (window.innerWidth - trueCanvasWidth) / 2;
      } else {
        trueCanvasWidth = window.innerWidth;
        trueCanvasHeight = window.innerWidth / gameAspectRatio;
        offsetY = (window.innerHeight - trueCanvasHeight) / 2;
      }
      const scaleX = fixedWidth / trueCanvasWidth;
      const scaleY = fixedHeight / trueCanvasHeight;
      this.mouseX = (clickLocWithinCanvas.x - offsetX) * scaleX | 0;
      this.mouseY = (clickLocWithinCanvas.y - offsetY) * scaleY | 0;
    } else {
      const scaleX = canvas.width / canvasBounds.width;
      const scaleY = canvas.height / canvasBounds.height;
      this.mouseX = clickLocWithinCanvas.x * scaleX | 0;
      this.mouseY = clickLocWithinCanvas.y * scaleY | 0;
    }
    if (this.mouseX < 0) {
      this.mouseX = 0;
    }
    if (this.mouseY < 0) {
      this.mouseY = 0;
    }
    if (this.mouseX > fixedWidth) {
      this.mouseX = fixedWidth;
    }
    if (this.mouseY > fixedHeight) {
      this.mouseY = fixedHeight;
    }
  }
}

// src/graphics/Jpeg.ts
async function decodeJpeg(data) {
  if (data[0] !== 255) {
    data[0] = 255;
  }
  URL.revokeObjectURL(jpegImg.src);
  jpegImg.src = URL.createObjectURL(new Blob([data], { type: "image/jpeg" }));
  await new Promise((resolve) => jpegImg.onload = () => resolve());
  jpeg2d.clearRect(0, 0, jpegCanvas.width, jpegCanvas.height);
  const width = jpegImg.naturalWidth;
  const height = jpegImg.naturalHeight;
  jpegCanvas.width = width;
  jpegCanvas.height = height;
  jpeg2d.drawImage(jpegImg, 0, 0);
  return jpeg2d.getImageData(0, 0, width, height);
}

// src/graphics/Pix24.ts
class Pix24 extends DoublyLinkable {
  pixels;
  width2d;
  height2d;
  cropX;
  cropY;
  cropW;
  cropH;
  constructor(width, height) {
    super();
    this.pixels = new Int32Array(width * height);
    this.width2d = this.cropW = width;
    this.height2d = this.cropH = height;
    this.cropX = this.cropY = 0;
  }
  static async fromJpeg(archive, name) {
    const dat = archive.read(name + ".dat");
    if (!dat) {
      throw new Error;
    }
    const jpeg = await decodeJpeg(dat);
    const image = new Pix24(jpeg.width, jpeg.height);
    const data = new Uint32Array(jpeg.data.buffer);
    const pixels = image.pixels;
    for (let i = 0;i < pixels.length; i++) {
      const pixel = data[i];
      pixels[i] = (pixel >> 24 & 255) << 24 | (pixel & 255) << 16 | (pixel >> 8 & 255) << 8 | pixel >> 16 & 255;
    }
    return image;
  }
  static fromArchive(archive, name, sprite = 0) {
    const dat = new Packet(archive.read(name + ".dat"));
    const index = new Packet(archive.read("index.dat"));
    index.pos = dat.g2();
    const cropW = index.g2();
    const cropH = index.g2();
    const paletteCount = index.g1();
    const palette = [];
    const length = paletteCount - 1;
    for (let i = 0;i < length; i++) {
      palette[i + 1] = index.g3();
      if (palette[i + 1] === 0) {
        palette[i + 1] = 1;
      }
    }
    for (let i = 0;i < sprite; i++) {
      index.pos += 2;
      dat.pos += index.g2() * index.g2();
      index.pos += 1;
    }
    if (dat.pos > dat.length || index.pos > index.length) {
      throw new Error;
    }
    const cropX = index.g1();
    const cropY = index.g1();
    const width = index.g2();
    const height = index.g2();
    const image = new Pix24(width, height);
    image.cropX = cropX;
    image.cropY = cropY;
    image.cropW = cropW;
    image.cropH = cropH;
    const pixelOrder = index.g1();
    if (pixelOrder === 0) {
      const length2 = image.width2d * image.height2d;
      for (let i = 0;i < length2; i++) {
        image.pixels[i] = palette[dat.g1()];
      }
    } else if (pixelOrder === 1) {
      const width2 = image.width2d;
      for (let x = 0;x < width2; x++) {
        const height2 = image.height2d;
        for (let y = 0;y < height2; y++) {
          image.pixels[x + y * width2] = palette[dat.g1()];
        }
      }
    }
    return image;
  }
  bind() {
    Pix2D.bind(this.pixels, this.width2d, this.height2d);
  }
  draw(x, y) {
    x |= 0;
    y |= 0;
    x += this.cropX;
    y += this.cropY;
    let dstOff = x + y * Pix2D.width2d;
    let srcOff = 0;
    let h = this.height2d;
    let w = this.width2d;
    let dstStep = Pix2D.width2d - w;
    let srcStep = 0;
    if (y < Pix2D.top) {
      const cutoff = Pix2D.top - y;
      h -= cutoff;
      y = Pix2D.top;
      srcOff += cutoff * w;
      dstOff += cutoff * Pix2D.width2d;
    }
    if (y + h > Pix2D.bottom) {
      h -= y + h - Pix2D.bottom;
    }
    if (x < Pix2D.left) {
      const cutoff = Pix2D.left - x;
      w -= cutoff;
      x = Pix2D.left;
      srcOff += cutoff;
      dstOff += cutoff;
      srcStep += cutoff;
      dstStep += cutoff;
    }
    if (x + w > Pix2D.right) {
      const cutoff = x + w - Pix2D.right;
      w -= cutoff;
      srcStep += cutoff;
      dstStep += cutoff;
    }
    if (w > 0 && h > 0) {
      this.copyImageDraw(w, h, this.pixels, srcOff, srcStep, Pix2D.pixels, dstOff, dstStep);
    }
  }
  drawAlpha(alpha, x, y) {
    x |= 0;
    y |= 0;
    x += this.cropX;
    y += this.cropY;
    let dstStep = x + y * Pix2D.width2d;
    let srcStep = 0;
    let h = this.height2d;
    let w = this.width2d;
    let dstOff = Pix2D.width2d - w;
    let srcOff = 0;
    if (y < Pix2D.top) {
      const cutoff = Pix2D.top - y;
      h -= cutoff;
      y = Pix2D.top;
      srcStep += cutoff * w;
      dstStep += cutoff * Pix2D.width2d;
    }
    if (y + h > Pix2D.bottom) {
      h -= y + h - Pix2D.bottom;
    }
    if (x < Pix2D.left) {
      const cutoff = Pix2D.left - x;
      w -= cutoff;
      x = Pix2D.left;
      srcStep += cutoff;
      dstStep += cutoff;
      srcOff += cutoff;
      dstOff += cutoff;
    }
    if (x + w > Pix2D.right) {
      const cutoff = x + w - Pix2D.right;
      w -= cutoff;
      srcOff += cutoff;
      dstOff += cutoff;
    }
    if (w > 0 && h > 0) {
      this.copyPixelsAlpha(w, h, this.pixels, srcStep, srcOff, Pix2D.pixels, dstStep, dstOff, alpha);
    }
  }
  blitOpaque(x, y) {
    x |= 0;
    y |= 0;
    x += this.cropX;
    y += this.cropY;
    let dstOff = x + y * Pix2D.width2d;
    let srcOff = 0;
    let h = this.height2d;
    let w = this.width2d;
    let dstStep = Pix2D.width2d - w;
    let srcStep = 0;
    if (y < Pix2D.top) {
      const cutoff = Pix2D.top - y;
      h -= cutoff;
      y = Pix2D.top;
      srcOff += cutoff * w;
      dstOff += cutoff * Pix2D.width2d;
    }
    if (y + h > Pix2D.bottom) {
      h -= y + h - Pix2D.bottom;
    }
    if (x < Pix2D.left) {
      const cutoff = Pix2D.left - x;
      w -= cutoff;
      x = Pix2D.left;
      srcOff += cutoff;
      dstOff += cutoff;
      srcStep += cutoff;
      dstStep += cutoff;
    }
    if (x + w > Pix2D.right) {
      const cutoff = x + w - Pix2D.right;
      w -= cutoff;
      srcStep += cutoff;
      dstStep += cutoff;
    }
    if (w > 0 && h > 0) {
      this.copyImageBlitOpaque(w, h, this.pixels, srcOff, srcStep, Pix2D.pixels, dstOff, dstStep);
    }
  }
  flipHorizontally() {
    const pixels = this.pixels;
    const width = this.width2d;
    const height = this.height2d;
    for (let y = 0;y < height; y++) {
      const div = width / 2 | 0;
      for (let x = 0;x < div; x++) {
        const off1 = x + y * width;
        const off2 = width - x - 1 + y * width;
        const tmp = pixels[off1];
        pixels[off1] = pixels[off2];
        pixels[off2] = tmp;
      }
    }
  }
  flipVertically() {
    const pixels = this.pixels;
    const width = this.width2d;
    const height = this.height2d;
    for (let y = 0;y < (height / 2 | 0); y++) {
      for (let x = 0;x < width; x++) {
        const off1 = x + y * width;
        const off2 = x + (height - y - 1) * width;
        const tmp = pixels[off1];
        pixels[off1] = pixels[off2];
        pixels[off2] = tmp;
      }
    }
  }
  translate2d(r, g, b) {
    for (let i = 0;i < this.pixels.length; i++) {
      const rgb = this.pixels[i];
      if (rgb !== 0) {
        let red = rgb >> 16 & 255;
        red += r;
        if (red < 1) {
          red = 1;
        } else if (red > 255) {
          red = 255;
        }
        let green = rgb >> 8 & 255;
        green += g;
        if (green < 1) {
          green = 1;
        } else if (green > 255) {
          green = 255;
        }
        let blue = rgb & 255;
        blue += b;
        if (blue < 1) {
          blue = 1;
        } else if (blue > 255) {
          blue = 255;
        }
        this.pixels[i] = (red << 16) + (green << 8) + blue;
      }
    }
  }
  crop(x, y, w, h) {
    x |= 0;
    y |= 0;
    w |= 0;
    h |= 0;
    try {
      const currentW = this.width2d;
      let offW = 0;
      let offH = 0;
      const cw = this.cropW;
      const ch = this.cropH;
      const scaleCropWidth = (cw << 16) / w | 0;
      const scaleCropHeight = (ch << 16) / h | 0;
      x += (this.cropX * w + cw - 1) / cw | 0;
      y += (this.cropY * h + ch - 1) / ch | 0;
      if (this.cropX * w % cw !== 0) {
        offW = (cw - this.cropX * w % cw << 16) / w | 0;
      }
      if (this.cropY * h % ch !== 0) {
        offH = (ch - this.cropY * h % ch << 16) / h | 0;
      }
      w = w * (this.width2d - (offW >> 16)) / cw | 0;
      h = h * (this.height2d - (offH >> 16)) / ch | 0;
      let dstStep = x + y * Pix2D.width2d;
      let dstOff = Pix2D.width2d - w;
      if (y < Pix2D.top) {
        const cutoff = Pix2D.top - y;
        h -= cutoff;
        y = 0;
        dstStep += cutoff * Pix2D.width2d;
        offH += scaleCropHeight * cutoff;
      }
      if (y + h > Pix2D.bottom) {
        h -= y + h - Pix2D.bottom;
      }
      if (x < Pix2D.left) {
        const cutoff = Pix2D.left - x;
        w -= cutoff;
        x = 0;
        dstStep += cutoff;
        offW += scaleCropWidth * cutoff;
        dstOff += cutoff;
      }
      if (x + w > Pix2D.right) {
        const cutoff = x + w - Pix2D.right;
        w -= cutoff;
        dstOff += cutoff;
      }
      this.scale(w, h, this.pixels, offW, offH, Pix2D.pixels, dstOff, dstStep, currentW, scaleCropWidth, scaleCropHeight);
    } catch (e) {
      console.error("error in sprite clipping routine");
    }
  }
  drawRotatedMasked(x, y, w, h, lineStart, lineWidth, anchorX, anchorY, theta, zoom) {
    x |= 0;
    y |= 0;
    w |= 0;
    h |= 0;
    try {
      const centerX = -w / 2 | 0;
      const centerY = -h / 2 | 0;
      const sin = Math.sin(theta / 326.11) * 65536 | 0;
      const cos = Math.cos(theta / 326.11) * 65536 | 0;
      const sinZoom = sin * zoom >> 8;
      const cosZoom = cos * zoom >> 8;
      let leftX = (anchorX << 16) + centerY * sinZoom + centerX * cosZoom;
      let leftY = (anchorY << 16) + (centerY * cosZoom - centerX * sinZoom);
      let leftOff = x + y * Pix2D.width2d;
      for (let i = 0;i < h; i++) {
        const dstOff = lineStart[i];
        let dstX = leftOff + dstOff;
        let srcX = leftX + cosZoom * dstOff;
        let srcY = leftY - sinZoom * dstOff;
        for (let j = -lineWidth[i];j < 0; j++) {
          Pix2D.pixels[dstX++] = this.pixels[(srcX >> 16) + (srcY >> 16) * this.width2d];
          srcX += cosZoom;
          srcY -= sinZoom;
        }
        leftX += sinZoom;
        leftY += cosZoom;
        leftOff += Pix2D.width2d;
      }
    } catch (e) {}
  }
  drawMasked(x, y, mask) {
    x |= 0;
    y |= 0;
    x += this.cropX;
    y += this.cropY;
    let dstStep = x + y * Pix2D.width2d;
    let srcStep = 0;
    let h = this.height2d;
    let w = this.width2d;
    let dstOff = Pix2D.width2d - w;
    let srcOff = 0;
    if (y < Pix2D.top) {
      const cutoff = Pix2D.top - y;
      h -= cutoff;
      y = Pix2D.top;
      srcStep += cutoff * w;
      dstStep += cutoff * Pix2D.width2d;
    }
    if (y + h > Pix2D.bottom) {
      h -= y + h - Pix2D.bottom;
    }
    if (x < Pix2D.left) {
      const cutoff = Pix2D.left - x;
      w -= cutoff;
      x = Pix2D.left;
      srcStep += cutoff;
      dstStep += cutoff;
      srcOff += cutoff;
      dstOff += cutoff;
    }
    if (x + w > Pix2D.right) {
      const cutoff = x + w - Pix2D.right;
      w -= cutoff;
      srcOff += cutoff;
      dstOff += cutoff;
    }
    if (w > 0 && h > 0) {
      this.copyPixelsMasked(w, h, this.pixels, srcOff, srcStep, Pix2D.pixels, dstStep, dstOff, mask.pixels);
    }
  }
  scale(w, h, src, offW, offH, dst, dstStep, dstOff, currentW, scaleCropWidth, scaleCropHeight) {
    try {
      const lastOffW = offW;
      for (let y = -h;y < 0; y++) {
        const offY = (offH >> 16) * currentW;
        for (let x = -w;x < 0; x++) {
          const rgb = src[(offW >> 16) + offY];
          if (rgb === 0) {
            dstOff++;
          } else {
            dst[dstOff++] = rgb;
          }
          offW += scaleCropWidth;
        }
        offH += scaleCropHeight;
        offW = lastOffW;
        dstOff += dstStep;
      }
    } catch (e) {
      console.error("error in plot_scale");
    }
  }
  copyImageBlitOpaque(w, h, src, srcOff, srcStep, dst, dstOff, dstStep) {
    const qw = -(w >> 2);
    w = -(w & 3);
    for (let y = -h;y < 0; y++) {
      for (let x = qw;x < 0; x++) {
        dst[dstOff++] = src[srcOff++];
        dst[dstOff++] = src[srcOff++];
        dst[dstOff++] = src[srcOff++];
        dst[dstOff++] = src[srcOff++];
      }
      for (let x = w;x < 0; x++) {
        dst[dstOff++] = src[srcOff++];
      }
      dstOff += dstStep;
      srcOff += srcStep;
    }
  }
  copyPixelsAlpha(w, h, src, srcOff, srcStep, dst, dstOff, dstStep, alpha) {
    const invAlpha = 256 - alpha;
    for (let y = -h;y < 0; y++) {
      for (let x = -w;x < 0; x++) {
        const rgb = src[srcOff++];
        if (rgb === 0) {
          dstOff++;
        } else {
          const dstRgb = dst[dstOff];
          dst[dstOff++] = ((rgb & 16711935) * alpha + (dstRgb & 16711935) * invAlpha & 4278255360) + ((rgb & 65280) * alpha + (dstRgb & 65280) * invAlpha & 16711680) >> 8;
        }
      }
      dstOff += dstStep;
      srcOff += srcStep;
    }
  }
  copyImageDraw(w, h, src, srcOff, srcStep, dst, dstOff, dstStep) {
    const qw = -(w >> 2);
    w = -(w & 3);
    for (let y = -h;y < 0; y++) {
      for (let x = qw;x < 0; x++) {
        let rgb = src[srcOff++];
        if (rgb === 0) {
          dstOff++;
        } else {
          dst[dstOff++] = rgb;
        }
        rgb = src[srcOff++];
        if (rgb === 0) {
          dstOff++;
        } else {
          dst[dstOff++] = rgb;
        }
        rgb = src[srcOff++];
        if (rgb === 0) {
          dstOff++;
        } else {
          dst[dstOff++] = rgb;
        }
        rgb = src[srcOff++];
        if (rgb === 0) {
          dstOff++;
        } else {
          dst[dstOff++] = rgb;
        }
      }
      for (let x = w;x < 0; x++) {
        const rgb = src[srcOff++];
        if (rgb === 0) {
          dstOff++;
        } else {
          dst[dstOff++] = rgb;
        }
      }
      dstOff += dstStep;
      srcOff += srcStep;
    }
  }
  copyPixelsMasked(w, h, src, srcStep, srcOff, dst, dstOff, dstStep, mask) {
    const qw = -(w >> 2);
    w = -(w & 3);
    for (let y = -h;y < 0; y++) {
      for (let x = qw;x < 0; x++) {
        let rgb = src[srcOff++];
        if (rgb !== 0 && mask[dstOff] === 0) {
          dst[dstOff++] = rgb;
        } else {
          dstOff++;
        }
        rgb = src[srcOff++];
        if (rgb !== 0 && mask[dstOff] === 0) {
          dst[dstOff++] = rgb;
        } else {
          dstOff++;
        }
        rgb = src[srcOff++];
        if (rgb !== 0 && mask[dstOff] === 0) {
          dst[dstOff++] = rgb;
        } else {
          dstOff++;
        }
        rgb = src[srcOff++];
        if (rgb !== 0 && mask[dstOff] === 0) {
          dst[dstOff++] = rgb;
        } else {
          dstOff++;
        }
      }
      for (let x = w;x < 0; x++) {
        const rgb = src[srcOff++];
        if (rgb !== 0 && mask[dstOff] === 0) {
          dst[dstOff++] = rgb;
        } else {
          dstOff++;
        }
      }
      dstOff += dstStep;
      srcOff += srcStep;
    }
  }
}

// src/util/JavaRandom.ts
class JavaRandom {
  seed;
  constructor(seed) {
    this.seed = (seed ^ 0x5deece66dn) & (1n << 48n) - 1n;
  }
  setSeed(seed) {
    this.seed = (seed ^ 0x5deece66dn) & (1n << 48n) - 1n;
  }
  nextInt() {
    return this.next(32);
  }
  next(bits) {
    this.seed = this.seed * 0x5deece66dn + 0xbn & (1n << 48n) - 1n;
    return Number(this.seed) >>> 48 - bits;
  }
}

// src/graphics/PixFont.ts
class PixFont extends DoublyLinkable {
  static CHARSET = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!"£$%^&*()-_=+[{]};:'@#~,<.>/?\\| `;
  static CHARCODESET = [];
  charMask = [];
  charMaskWidth = new Int32Array(94);
  charMaskHeight = new Int32Array(94);
  charOffsetX = new Int32Array(94);
  charOffsetY = new Int32Array(94);
  charAdvance = new Int32Array(95);
  drawWidth = new Int32Array(256);
  random = new JavaRandom(BigInt(Date.now()));
  height2d = 0;
  static {
    const isCapacitor = navigator.userAgent.includes("Capacitor");
    for (let i = 0;i < 256; i++) {
      let c = PixFont.CHARSET.indexOf(String.fromCharCode(i));
      if (isCapacitor) {
        if (c >= 63) {
          c--;
        }
      }
      if (c === -1) {
        c = 74;
      }
      PixFont.CHARCODESET[i] = c;
    }
  }
  static fromArchive(archive, name) {
    const dat = new Packet(archive.read(name + ".dat"));
    const idx = new Packet(archive.read("index.dat"));
    idx.pos = dat.g2() + 4;
    const off = idx.g1();
    if (off > 0) {
      idx.pos += (off - 1) * 3;
    }
    const font = new PixFont;
    for (let i = 0;i < 94; i++) {
      font.charOffsetX[i] = idx.g1();
      font.charOffsetY[i] = idx.g1();
      const w = font.charMaskWidth[i] = idx.g2();
      const h = font.charMaskHeight[i] = idx.g2();
      const type = idx.g1();
      const len = w * h;
      font.charMask[i] = new Int8Array(len);
      if (type === 0) {
        for (let j = 0;j < w * h; j++) {
          font.charMask[i][j] = dat.g1b();
        }
      } else if (type === 1) {
        for (let x = 0;x < w; x++) {
          for (let y = 0;y < h; y++) {
            font.charMask[i][x + y * w] = dat.g1b();
          }
        }
      }
      if (h > font.height2d) {
        font.height2d = h;
      }
      font.charOffsetX[i] = 1;
      font.charAdvance[i] = w + 2;
      {
        let space = 0;
        for (let y = h / 7 | 0;y < h; y++) {
          space += font.charMask[i][y * w];
        }
        if (space <= (h / 7 | 0)) {
          font.charAdvance[i]--;
          font.charOffsetX[i] = 0;
        }
      }
      {
        let space = 0;
        for (let y = h / 7 | 0;y < h; y++) {
          space += font.charMask[i][w + y * w - 1];
        }
        if (space <= (h / 7 | 0)) {
          font.charAdvance[i]--;
        }
      }
    }
    font.charAdvance[94] = font.charAdvance[8];
    for (let i = 0;i < 256; i++) {
      font.drawWidth[i] = font.charAdvance[PixFont.CHARCODESET[i]];
    }
    return font;
  }
  drawString(x, y, str, color) {
    if (!str) {
      return;
    }
    x |= 0;
    y |= 0;
    const length = str.length;
    y -= this.height2d;
    for (let i = 0;i < length; i++) {
      const c = PixFont.CHARCODESET[str.charCodeAt(i)];
      if (c !== 94) {
        this.drawChar(this.charMask[c], x + this.charOffsetX[c], y + this.charOffsetY[c], this.charMaskWidth[c], this.charMaskHeight[c], color);
      }
      x += this.charAdvance[c];
    }
  }
  drawStringTaggable(x, y, str, color, shadowed) {
    x |= 0;
    y |= 0;
    const length = str.length;
    y -= this.height2d;
    for (let i = 0;i < length; i++) {
      if (str.charAt(i) === "@" && i + 4 < length && str.charAt(i + 4) === "@") {
        color = this.evaluateTag(str.substring(i + 1, i + 4));
        i += 4;
      } else {
        const c = PixFont.CHARCODESET[str.charCodeAt(i)];
        if (c !== 94) {
          if (shadowed) {
            this.drawChar(this.charMask[c], x + this.charOffsetX[c] + 1, y + this.charOffsetY[c] + 1, this.charMaskWidth[c], this.charMaskHeight[c], 0 /* BLACK */);
          }
          this.drawChar(this.charMask[c], x + this.charOffsetX[c], y + this.charOffsetY[c], this.charMaskWidth[c], this.charMaskHeight[c], color);
        }
        x += this.charAdvance[c];
      }
    }
  }
  stringWidth(str) {
    if (!str) {
      return 0;
    }
    const length = str.length;
    let w = 0;
    for (let i = 0;i < length; i++) {
      if (str.charAt(i) === "@" && i + 4 < length && str.charAt(i + 4) === "@") {
        i += 4;
      } else {
        w += this.drawWidth[str.charCodeAt(i)];
      }
    }
    return w;
  }
  drawStringTaggableCenter(x, y, str, color, shadowed) {
    x |= 0;
    y |= 0;
    this.drawStringTaggable(x - (this.stringWidth(str) / 2 | 0), y, str, color, shadowed);
  }
  drawStringCenter(x, y, str, color) {
    if (!str) {
      return;
    }
    x |= 0;
    y |= 0;
    this.drawString(x - (this.stringWidth(str) / 2 | 0), y, str, color);
  }
  drawStringTooltip(x, y, str, color, shadowed, seed) {
    x |= 0;
    y |= 0;
    this.random.setSeed(BigInt(seed));
    const rand = (this.random.nextInt() & 31) + 192;
    const offY = y - this.height2d;
    for (let i = 0;i < str.length; i++) {
      if (str.charAt(i) === "@" && i + 4 < str.length && str.charAt(i + 4) === "@") {
        color = this.evaluateTag(str.substring(i + 1, i + 4));
        i += 4;
      } else {
        const c = PixFont.CHARCODESET[str.charCodeAt(i)];
        if (c !== 94) {
          if (shadowed) {
            this.drawCharAlpha(x + this.charOffsetX[c] + 1, offY + this.charOffsetY[c] + 1, this.charMaskWidth[c], this.charMaskHeight[c], 0 /* BLACK */, 192, this.charMask[c]);
          }
          this.drawCharAlpha(x + this.charOffsetX[c], offY + this.charOffsetY[c], this.charMaskWidth[c], this.charMaskHeight[c], color, rand, this.charMask[c]);
        }
        x += this.charAdvance[c];
        if ((this.random.nextInt() & 3) === 0) {
          x++;
        }
      }
    }
  }
  drawStringRight(x, y, str, color, shadowed = true) {
    x |= 0;
    y |= 0;
    if (shadowed) {
      this.drawString(x - this.stringWidth(str) + 1, y + 1, str, 0 /* BLACK */);
    }
    this.drawString(x - this.stringWidth(str), y, str, color);
  }
  drawCenteredWave(x, y, str, color, phase) {
    if (!str) {
      return;
    }
    x |= 0;
    y |= 0;
    x -= this.stringWidth(str) / 2 | 0;
    const offY = y - this.height2d;
    for (let i = 0;i < str.length; i++) {
      const c = PixFont.CHARCODESET[str.charCodeAt(i)];
      if (c != 94) {
        this.drawChar(this.charMask[c], x + this.charOffsetX[c], offY + this.charOffsetY[c] + (Math.sin(i / 2 + phase / 5) * 5 | 0), this.charMaskWidth[c], this.charMaskHeight[c], color);
      }
      x += this.charAdvance[c];
    }
  }
  drawChar(data, x, y, w, h, color) {
    x |= 0;
    y |= 0;
    w |= 0;
    h |= 0;
    let dstOff = x + y * Pix2D.width2d;
    let dstStep = Pix2D.width2d - w;
    let srcStep = 0;
    let srcOff = 0;
    if (y < Pix2D.top) {
      const cutoff = Pix2D.top - y;
      h -= cutoff;
      y = Pix2D.top;
      srcOff += cutoff * w;
      dstOff += cutoff * Pix2D.width2d;
    }
    if (y + h >= Pix2D.bottom) {
      h -= y + h + 1 - Pix2D.bottom;
    }
    if (x < Pix2D.left) {
      const cutoff = Pix2D.left - x;
      w -= cutoff;
      x = Pix2D.left;
      srcOff += cutoff;
      dstOff += cutoff;
      srcStep += cutoff;
      dstStep += cutoff;
    }
    if (x + w >= Pix2D.right) {
      const cutoff = x + w + 1 - Pix2D.right;
      w -= cutoff;
      srcStep += cutoff;
      dstStep += cutoff;
    }
    if (w > 0 && h > 0) {
      this.drawMask(w, h, data, srcOff, srcStep, Pix2D.pixels, dstOff, dstStep, color);
    }
  }
  drawCharAlpha(x, y, w, h, color, alpha, mask) {
    x |= 0;
    y |= 0;
    w |= 0;
    h |= 0;
    let dstOff = x + y * Pix2D.width2d;
    let dstStep = Pix2D.width2d - w;
    let srcStep = 0;
    let srcOff = 0;
    if (y < Pix2D.top) {
      const cutoff = Pix2D.top - y;
      h -= cutoff;
      y = Pix2D.top;
      srcOff += cutoff * w;
      dstOff += cutoff * Pix2D.width2d;
    }
    if (y + h >= Pix2D.bottom) {
      h -= y + h + 1 - Pix2D.bottom;
    }
    if (x < Pix2D.left) {
      const cutoff = Pix2D.left - x;
      w -= cutoff;
      x = Pix2D.left;
      srcOff += cutoff;
      dstOff += cutoff;
      srcStep += cutoff;
      dstStep += cutoff;
    }
    if (x + w >= Pix2D.right) {
      const cutoff = x + w + 1 - Pix2D.right;
      w -= cutoff;
      srcStep += cutoff;
      dstStep += cutoff;
    }
    if (w > 0 && h > 0) {
      this.drawMaskAlpha(w, h, Pix2D.pixels, dstOff, dstStep, mask, srcOff, srcStep, color, alpha);
    }
  }
  drawMask(w, h, src, srcOff, srcStep, dst, dstOff, dstStep, rgb) {
    w |= 0;
    h |= 0;
    const hw = -(w >> 2);
    w = -(w & 3);
    for (let y = -h;y < 0; y++) {
      for (let x = hw;x < 0; x++) {
        if (src[srcOff++] === 0) {
          dstOff++;
        } else {
          dst[dstOff++] = rgb;
        }
        if (src[srcOff++] === 0) {
          dstOff++;
        } else {
          dst[dstOff++] = rgb;
        }
        if (src[srcOff++] === 0) {
          dstOff++;
        } else {
          dst[dstOff++] = rgb;
        }
        if (src[srcOff++] === 0) {
          dstOff++;
        } else {
          dst[dstOff++] = rgb;
        }
      }
      for (let x = w;x < 0; x++) {
        if (src[srcOff++] === 0) {
          dstOff++;
        } else {
          dst[dstOff++] = rgb;
        }
      }
      dstOff += dstStep;
      srcOff += srcStep;
    }
  }
  drawMaskAlpha(w, h, dst, dstOff, dstStep, mask, maskOff, maskStep, color, alpha) {
    w |= 0;
    h |= 0;
    const rgb = ((color & 16711935) * alpha & 4278255360) + ((color & 65280) * alpha & 16711680) >> 8;
    const invAlpha = 256 - alpha;
    for (let y = -h;y < 0; y++) {
      for (let x = -w;x < 0; x++) {
        if (mask[maskOff++] === 0) {
          dstOff++;
        } else {
          const dstRgb = dst[dstOff];
          dst[dstOff++] = (((dstRgb & 16711935) * invAlpha & 4278255360) + ((dstRgb & 65280) * invAlpha & 16711680) >> 8) + rgb;
        }
      }
      dstOff += dstStep;
      maskOff += maskStep;
    }
  }
  evaluateTag(tag) {
    if (tag === "red") {
      return 16711680 /* RED */;
    } else if (tag === "gre") {
      return 65280 /* GREEN */;
    } else if (tag === "blu") {
      return 255 /* BLUE */;
    } else if (tag === "yel") {
      return 16776960 /* YELLOW */;
    } else if (tag === "cya") {
      return 65535 /* CYAN */;
    } else if (tag === "mag") {
      return 16711935 /* MAGENTA */;
    } else if (tag === "whi") {
      return 16777215 /* WHITE */;
    } else if (tag === "bla") {
      return 0 /* BLACK */;
    } else if (tag === "lre") {
      return 16748608 /* LIGHTRED */;
    } else if (tag === "dre") {
      return 8388608 /* DARKRED */;
    } else if (tag === "dbl") {
      return 128 /* DARKBLUE */;
    } else if (tag === "or1") {
      return 16756736 /* ORANGE1 */;
    } else if (tag === "or2") {
      return 16740352 /* ORANGE2 */;
    } else if (tag === "or3") {
      return 16723968 /* ORANGE3 */;
    } else if (tag === "gr1") {
      return 12648192 /* GREEN1 */;
    } else if (tag === "gr2") {
      return 8453888 /* GREEN2 */;
    } else if (tag === "gr3") {
      return 4259584 /* GREEN3 */;
    } else {
      return 0 /* BLACK */;
    }
  }
  split(str, maxWidth) {
    if (str.length === 0) {
      return [str];
    }
    const lines = [];
    while (str.length > 0) {
      const width = this.stringWidth(str);
      if (width <= maxWidth && str.indexOf("|") === -1) {
        lines.push(str);
        break;
      }
      let splitIndex = str.length;
      for (let i = 0;i < str.length; i++) {
        if (str[i] === " ") {
          const w = this.stringWidth(str.substring(0, i));
          if (w > maxWidth) {
            break;
          }
          splitIndex = i;
        } else if (str[i] === "|") {
          splitIndex = i;
          break;
        }
      }
      lines.push(str.substring(0, splitIndex));
      str = str.substring(splitIndex + 1);
    }
    return lines;
  }
}

// src/io/Database.ts
class Database {
  db;
  constructor(db) {
    db.onerror = this.onerror;
    db.onclose = this.onclose;
    this.db = db;
  }
  static async openDatabase() {
    return await new Promise((resolve, reject) => {
      const request = indexedDB.open("lostcity", 1);
      request.onsuccess = (event) => {
        const target = event.target;
        resolve(target.result);
      };
      request.onupgradeneeded = (event) => {
        const target = event.target;
        target.result.createObjectStore("cache");
      };
      request.onerror = (event) => {
        const target = event.target;
        reject(target.result);
      };
    });
  }
  async cacheload(name) {
    return await new Promise((resolve) => {
      const transaction = this.db.transaction("cache", "readonly");
      const store = transaction.objectStore("cache");
      const request = store.get(name);
      request.onsuccess = () => {
        if (request.result) {
          resolve(new Uint8Array(request.result));
        } else {
          resolve(undefined);
        }
      };
      request.onerror = () => {
        resolve(undefined);
      };
    });
  }
  async cachesave(name, src) {
    if (src === null) {
      return;
    }
    return await new Promise((resolve, reject) => {
      const transaction = this.db.transaction("cache", "readwrite");
      const store = transaction.objectStore("cache");
      const request = store.put(src, name);
      request.onsuccess = () => {
        resolve();
      };
      request.onerror = () => {
        resolve();
      };
    });
  }
  onclose = (event) => {};
  onerror = (event) => {};
}

// src/io/Jagfile.ts
import { BZip2 } from "./deps.js";
class Jagfile {
  static genHash(name) {
    let hash = 0;
    name = name.toUpperCase();
    for (let i = 0;i < name.length; i++) {
      hash = hash * 61 + name.charCodeAt(i) - 32 | 0;
    }
    return hash;
  }
  jagSrc;
  compressedWhole;
  fileCount;
  fileHash;
  fileUnpackedSize;
  filePackedSize;
  fileOffset;
  fileUnpacked = [];
  constructor(src) {
    let data = new Packet(new Uint8Array(src));
    const unpackedSize = data.g3();
    const packedSize = data.g3();
    if (unpackedSize === packedSize) {
      this.jagSrc = src;
      this.compressedWhole = false;
    } else {
      this.jagSrc = BZip2.decompress(src.subarray(6), unpackedSize, true);
      data = new Packet(new Uint8Array(this.jagSrc));
      this.compressedWhole = true;
    }
    this.fileCount = data.g2();
    this.fileHash = [];
    this.fileUnpackedSize = [];
    this.filePackedSize = [];
    this.fileOffset = [];
    let offset = data.pos + this.fileCount * 10;
    for (let i = 0;i < this.fileCount; i++) {
      this.fileHash.push(data.g4());
      this.fileUnpackedSize.push(data.g3());
      this.filePackedSize.push(data.g3());
      this.fileOffset.push(offset);
      offset += this.filePackedSize[i];
    }
  }
  read(name) {
    const hash = Jagfile.genHash(name);
    const index = this.fileHash.indexOf(hash);
    if (index === -1) {
      return null;
    }
    return this.readIndex(index);
  }
  readIndex(index) {
    if (index < 0 || index >= this.fileCount) {
      return null;
    }
    if (this.fileUnpacked[index]) {
      return this.fileUnpacked[index];
    }
    const offset = this.fileOffset[index];
    const length = offset + this.filePackedSize[index];
    const src = new Uint8Array(this.jagSrc.subarray(offset, offset + length));
    if (this.compressedWhole) {
      this.fileUnpacked[index] = src;
      return src;
    } else {
      const data = BZip2.decompress(src, this.fileUnpackedSize[index], true);
      this.fileUnpacked[index] = data;
      return data;
    }
  }
}

// src/mapview/MapView.ts
class MapView extends GameShell {
  static shouldDrawBorders = false;
  static shouldDrawLabels = true;
  static shouldDrawNpcs = false;
  static shouldDrawItems = false;
  startX = 3200;
  startZ = 3200;
  sizeX = 20 << 6;
  sizeZ = 21 << 6;
  originX = 35 << 6;
  originZ = 43 << 6;
  db = null;
  maxLabelCount = 1000;
  labelCount = 0;
  labelText = [];
  labelX = [];
  labelY = [];
  labelFont = [];
  floorcolUnderlay = [0];
  floorcolOverlay = [0];
  underlayTiles = [];
  overlayTiles = [];
  overlayInfo = [];
  locWalls = [];
  locMapscenes = [];
  locMapfunction = [];
  objTiles = [];
  npcTiles = [];
  imageMapscene = [];
  imageMapfunction = [];
  imageMapdot0 = null;
  imageMapdot1 = null;
  imageMapdot2 = null;
  imageMapdot3 = null;
  b12 = null;
  floormapColors = [];
  redraw = true;
  redrawTimer = 0;
  lastMouseClickX = -1;
  lastMouseClickY = -1;
  lastOffsetX = -1;
  lastOffsetZ = -1;
  shouldClearEmptyTiles = false;
  keyX = 5;
  keyY = 13;
  keyWidth = 140;
  keyHeight = 470;
  showKey = false;
  keyPage = 0;
  lastKeyPage = 0;
  currentKeyHover = -1;
  lastKeyHover = 0;
  currentKey = 0;
  flashTimer = 0;
  visibleMapFunctionsX = new Int32Array(2000);
  visibleMapFunctionsY = new Int32Array(2000);
  visibleMapFunctions = new Int32Array(2000);
  activeMapFunctionX = new Int32Array(2000);
  activeMapFunctionZ = new Int32Array(2000);
  activeMapFunctions = new Int32Array(2000);
  activeMapFunctionCount = 0;
  imageOverview = null;
  imageOverviewHeight = 200;
  imageOverviewWidth = this.imageOverviewHeight * this.sizeX / this.sizeZ | 0;
  overviewX = 635 - this.imageOverviewWidth - 5;
  overviewY = 503 - this.imageOverviewHeight - 20;
  showOverview = false;
  colorInactiveBorderTL = 8943445;
  colorInactive = 7824964;
  colorInactiveBorderBR = 6706483;
  colorActiveBorderTL = 11141120;
  colorActive = 10027008;
  colorActiveBorderBR = 8912896;
  zoom = 4;
  targetZoom = 4;
  offsetX = this.startX - this.originX;
  offsetZ = this.originZ + this.sizeZ - this.startZ;
  activeTileX = -1;
  activeTileZ = -1;
  keyNames = [
    "General Store",
    "Sword Shop",
    "Magic Shop",
    "Axe Shop",
    "Helmet Shop",
    "Bank",
    "Quest Start",
    "Amulet Shop",
    "Mining Site",
    "Furnace",
    "Anvil",
    "Combat Training",
    "Dungeon",
    "Staff Shop",
    "Platebody Shop",
    "Platelegs Shop",
    "Scimitar Shop",
    "Archery Shop",
    "Shield Shop",
    "Altar",
    "Herbalist",
    "Jewelery",
    "Gem Shop",
    "Crafting Shop",
    "Candle Shop",
    "Fishing Shop",
    "Fishing Spot",
    "Clothes Shop",
    "Apothecary",
    "Silk Trader",
    "Kebab Seller",
    "Pub/Bar",
    "Mace Shop",
    "Tannery",
    "Rare Trees",
    "Spinning Wheel",
    "Food Shop",
    "Cookery Shop",
    "???",
    "Water Source",
    "Cooking Range",
    "Skirt Shop",
    "Potters Wheel",
    "Windmill",
    "Mining Shop",
    "Chainmail Shop",
    "Silver Shop",
    "Fur Trader",
    "Spice Shop"
  ];
  constructor() {
    super();
    this.run();
  }
  async load() {
    this.keyHeight = this.height - this.keyY - 20;
    this.overviewX = this.width - this.imageOverviewWidth - 5;
    this.overviewY = this.height - this.imageOverviewHeight - 20;
    this.db = new Database(await Database.openDatabase());
    const worldmap = await this.loadWorldmap();
    await this.showProgress(100, "Please wait... Rendering Map");
    const labelData = new Packet(worldmap.read("labels.dat"));
    this.labelCount = labelData.g2();
    for (let i = 0;i < this.labelCount; i++) {
      this.labelText[i] = labelData.gjstr();
      this.labelX[i] = labelData.g2();
      this.labelY[i] = labelData.g2();
      this.labelFont[i] = labelData.g1();
    }
    const floorcolData = new Packet(worldmap.read("floorcol.dat"));
    const floorcolCount = floorcolData.g2();
    for (let i = 0;i < floorcolCount; i++) {
      this.floorcolUnderlay[i + 1] = floorcolData.g4();
      this.floorcolOverlay[i + 1] = floorcolData.g4();
    }
    const underlayData = new Packet(worldmap.read("underlay.dat"));
    this.underlayTiles = new TypedArray2d(this.sizeX, this.sizeZ, 0);
    this.readUnderlayData(underlayData);
    const overlayData = new Packet(worldmap.read("overlay.dat"));
    this.overlayTiles = new TypedArray2d(this.sizeX, this.sizeZ, 0);
    this.overlayInfo = new TypedArray2d(this.sizeX, this.sizeZ, 0);
    this.readOverlayData(overlayData);
    const locData = new Packet(worldmap.read("loc.dat"));
    this.locWalls = new TypedArray2d(this.sizeX, this.sizeZ, 0);
    this.locMapscenes = new TypedArray2d(this.sizeX, this.sizeZ, 0);
    this.locMapfunction = new TypedArray2d(this.sizeX, this.sizeZ, 0);
    this.readLocData(locData);
    const objData = new Packet(worldmap.read("obj.dat"));
    this.objTiles = new TypedArray2d(this.sizeX, this.sizeZ, false);
    this.readObjData(objData);
    const npcData = new Packet(worldmap.read("npc.dat"));
    this.npcTiles = new TypedArray2d(this.sizeX, this.sizeZ, false);
    this.readNpcData(npcData);
    try {
      for (let i = 0;i < 50; i++) {
        this.imageMapscene[i] = Pix8.fromArchive(worldmap, "mapscene", i);
      }
    } catch (ignore) {}
    try {
      for (let i = 0;i < 50; i++) {
        this.imageMapfunction[i] = Pix24.fromArchive(worldmap, "mapfunction", i);
      }
    } catch (ignore) {}
    this.imageMapdot0 = Pix24.fromArchive(worldmap, "mapdots", 0);
    this.imageMapdot1 = Pix24.fromArchive(worldmap, "mapdots", 1);
    this.imageMapdot2 = Pix24.fromArchive(worldmap, "mapdots", 2);
    this.imageMapdot3 = Pix24.fromArchive(worldmap, "mapdots", 3);
    this.b12 = PixFont.fromArchive(worldmap, "b12");
    this.floormapColors = new TypedArray2d(this.sizeX, this.sizeZ, 0);
    this.averageUnderlayColors();
    if (this.shouldClearEmptyTiles)
      this.clearEmptyTiles();
    this.imageOverview = new Pix24(this.imageOverviewWidth, this.imageOverviewHeight);
    this.imageOverview.bind();
    this.drawMap(0, 0, this.sizeX, this.sizeZ, 0, 0, this.imageOverviewWidth, this.imageOverviewHeight);
    Pix2D.drawRect(0, 0, this.imageOverviewWidth, this.imageOverviewHeight, 0);
    Pix2D.drawRect(1, 1, this.imageOverviewWidth - 2, this.imageOverviewHeight - 2, this.colorInactiveBorderTL);
    this.drawArea.bind();
  }
  async draw() {
    if (this.redraw) {
      this.redraw = false;
      this.redrawTimer = 0;
      Pix2D.clear();
      const left = this.offsetX - (this.width / this.zoom | 0);
      const top = this.offsetZ - (this.height / this.zoom | 0);
      const right = this.offsetX + (this.width / this.zoom | 0);
      const bottom = this.offsetZ + (this.height / this.zoom | 0);
      this.drawMap(left, top, right, bottom, 0, 0, this.width, this.height);
      if (this.showOverview) {
        this.imageOverview?.blitOpaque(this.overviewX, this.overviewY);
        Pix2D.fillRectAlpha(this.overviewX + this.imageOverviewWidth * left / this.sizeX | 0, this.overviewY + this.imageOverviewHeight * top / this.sizeZ | 0, (right - left) * this.imageOverviewWidth / this.sizeX | 0, (bottom - top) * this.imageOverviewHeight / this.sizeZ | 0, 16711680, 128);
        Pix2D.drawRect(this.overviewX + this.imageOverviewWidth * left / this.sizeX | 0, this.overviewY + this.imageOverviewHeight * top / this.sizeZ | 0, (right - left) * this.imageOverviewWidth / this.sizeX | 0, (bottom - top) * this.imageOverviewHeight / this.sizeZ | 0, 16711680);
        if (this.flashTimer > 0 && this.flashTimer % 10 < 5) {
          for (let i = 0;i < this.activeMapFunctionCount; i++) {
            if (this.activeMapFunctions[i] == this.currentKey) {
              const x = this.overviewX + this.imageOverviewWidth * this.activeMapFunctionX[i] / this.sizeX | 0;
              const y2 = this.overviewY + this.imageOverviewHeight * this.activeMapFunctionZ[i] / this.sizeZ | 0;
              Pix2D.fillCircle(x, y2, 2, 16776960, 256);
            }
          }
        }
      }
      if (this.showKey) {
        this.drawString(this.keyX, this.keyY, this.keyWidth, 18, 10066329, 7829367, 5592405, "Prev page");
        this.drawString(this.keyX, this.keyY + 18, this.keyWidth, this.keyHeight - 36, 10066329, 7829367, 5592405, "");
        this.drawString(this.keyX, this.keyY + this.keyHeight - 18, this.keyWidth, 18, 10066329, 7829367, 5592405, "Next page");
        let maxKeys = (this.keyHeight - 20) / 18;
        let y2 = this.keyY + 18 + 3;
        for (let row = 0;row < maxKeys; row++) {
          if (row + this.lastKeyPage < this.imageMapfunction.length && row + this.lastKeyPage < this.keyNames.length) {
            if (this.keyNames[row + this.lastKeyPage] === "???") {
              continue;
            }
            this.imageMapfunction[row + this.lastKeyPage].draw(this.keyX + 3, y2);
            this.b12?.drawString(this.keyX + 21, y2 + 14, this.keyNames[row + this.lastKeyPage], 0);
            let rgb = 16777215;
            if (this.currentKeyHover == row + this.lastKeyPage) {
              rgb = 12298922;
            }
            if (this.flashTimer > 0 && this.flashTimer % 10 < 5 && this.currentKey == row + this.lastKeyPage) {
              rgb = 16776960;
            }
            this.b12?.drawString(this.keyX + 20, y2 + 13, this.keyNames[row + this.lastKeyPage], rgb);
          }
          y2 += 17;
        }
      }
      this.drawString(this.overviewX, this.overviewY + this.imageOverviewHeight, this.imageOverviewWidth, 18, this.colorInactiveBorderTL, this.colorInactive, this.colorInactiveBorderBR, "Overview");
      this.drawString(this.keyX, this.keyY + this.keyHeight, this.keyWidth, 18, this.colorInactiveBorderTL, this.colorInactive, this.colorInactiveBorderBR, "Key");
      let y = this.height - this.keyY - 20 + 1;
      if (this.targetZoom == 3) {
        this.drawString(170, y, 50, 30, this.colorActiveBorderTL, this.colorActive, this.colorActiveBorderBR, "37%");
      } else {
        this.drawString(170, y, 50, 30, this.colorInactiveBorderTL, this.colorInactive, this.colorInactiveBorderBR, "37%");
      }
      if (this.targetZoom == 4) {
        this.drawString(230, y, 50, 30, this.colorActiveBorderTL, this.colorActive, this.colorActiveBorderBR, "50%");
      } else {
        this.drawString(230, y, 50, 30, this.colorInactiveBorderTL, this.colorInactive, this.colorInactiveBorderBR, "50%");
      }
      if (this.targetZoom == 6) {
        this.drawString(290, y, 50, 30, this.colorActiveBorderTL, this.colorActive, this.colorActiveBorderBR, "75%");
      } else {
        this.drawString(290, y, 50, 30, this.colorInactiveBorderTL, this.colorInactive, this.colorInactiveBorderBR, "75%");
      }
      if (this.targetZoom == 8) {
        this.drawString(350, y, 50, 30, this.colorActiveBorderTL, this.colorActive, this.colorActiveBorderBR, "100%");
      } else {
        this.drawString(350, y, 50, 30, this.colorInactiveBorderTL, this.colorInactive, this.colorInactiveBorderBR, "100%");
      }
    }
    this.redrawTimer--;
    if (this.redrawTimer <= 0) {
      this.drawArea?.draw(0, 0);
      this.redrawTimer = 50;
    }
  }
  async refresh() {
    this.redrawTimer = 0;
  }
  async update() {
    if (this.actionKey[1] == 1) {
      this.offsetX = this.offsetX - 16 / this.zoom | 0;
      this.redraw = true;
    }
    if (this.actionKey[2] == 1) {
      this.offsetX = this.offsetX + 16 / this.zoom | 0;
      this.redraw = true;
    }
    if (this.actionKey[3] == 1) {
      this.offsetZ = this.offsetZ - 16 / this.zoom | 0;
      this.redraw = true;
    }
    if (this.actionKey[4] == 1) {
      this.offsetZ = this.offsetZ + 16 / this.zoom | 0;
      this.redraw = true;
    }
    let key = 1;
    do {
      key = this.pollKey();
      if (key === -1) {
        break;
      }
      if (key == 49) {
        this.targetZoom = 3;
        this.redraw = true;
      } else if (key == 50) {
        this.targetZoom = 4;
        this.redraw = true;
      } else if (key == 51) {
        this.targetZoom = 6;
        this.redraw = true;
      } else if (key == 52) {
        this.targetZoom = 8;
        this.redraw = true;
      } else if (key == 107 || key == 75) {
        this.showKey = !this.showKey;
        this.redraw = true;
      } else if (key == 111 || key == 79) {
        this.showOverview = !this.showOverview;
        this.redraw = true;
      } else if (key == 101 || key == 69) {} else if (key == 110 || key == 78) {
        MapView.shouldDrawNpcs = !MapView.shouldDrawNpcs;
        this.redraw = true;
      } else if (key == 105 || key == 73) {
        MapView.shouldDrawItems = !MapView.shouldDrawItems;
        this.redraw = true;
      } else if (key == 108 || key == 76) {
        MapView.shouldDrawLabels = !MapView.shouldDrawLabels;
        this.redraw = true;
      } else if (key == 98 || key == 66) {
        MapView.shouldDrawBorders = !MapView.shouldDrawBorders;
        this.redraw = true;
      }
    } while (key > 0);
    if (this.mouseClickButton == 1) {
      this.lastMouseClickX = this.mouseClickX;
      this.lastMouseClickY = this.mouseClickY;
      this.lastOffsetX = this.offsetX;
      this.lastOffsetZ = this.offsetZ;
      let zoomY = this.height - this.keyY - 20 + 1;
      if (this.mouseClickX > 170 && this.mouseClickX < 220 && this.mouseClickY > zoomY) {
        this.targetZoom = 3;
        this.lastMouseClickX = -1;
      } else if (this.mouseClickX > 230 && this.mouseClickX < 280 && this.mouseClickY > zoomY) {
        this.targetZoom = 4;
        this.lastMouseClickX = -1;
      } else if (this.mouseClickX > 290 && this.mouseClickX < 340 && this.mouseClickY > zoomY) {
        this.targetZoom = 6;
        this.lastMouseClickX = -1;
      } else if (this.mouseClickX > 350 && this.mouseClickX < 400 && this.mouseClickY > zoomY) {
        this.targetZoom = 8;
        this.lastMouseClickX = -1;
      } else if (this.mouseClickX > this.keyX && this.mouseClickY > this.keyY + this.keyHeight && this.mouseClickX < this.keyX + this.keyWidth) {
        this.showKey = !this.showKey;
        this.lastMouseClickX = -1;
      } else if (this.mouseClickX > this.overviewX && this.mouseClickY > this.overviewY + this.imageOverviewHeight && this.mouseClickX < this.overviewX + this.imageOverviewWidth) {
        this.showOverview = !this.showOverview;
        this.lastMouseClickX = -1;
      }
      if (this.showKey) {
        if (this.mouseClickX > this.keyX && this.mouseClickY > this.keyY && this.mouseClickX < this.keyX + this.keyWidth && this.mouseClickY < this.keyY + this.keyHeight) {
          this.lastMouseClickX = -1;
        }
        if (this.mouseClickX > this.keyX && this.mouseClickY > this.keyY && this.mouseClickX < this.keyX + this.keyWidth && this.mouseClickY < this.keyY + 18) {
          this.keyPage = 0;
        } else if (this.mouseClickX > this.keyX && this.mouseClickY > this.keyY + this.keyHeight - 18 && this.mouseClickX < this.keyX + this.keyWidth && this.mouseClickY < this.keyY + this.keyHeight) {
          this.keyPage = 25;
        }
      }
      this.redraw = true;
    }
    if (this.showKey) {
      this.currentKeyHover = -1;
      if (this.mouseX > this.keyX && this.mouseX < this.keyX + this.keyWidth) {
        let maxKeys = (this.keyHeight - 20) / 18;
        let y = this.keyY + 21 + 5;
        for (let row = 0;row < maxKeys; row++) {
          if (row + this.lastKeyPage < this.keyNames.length && this.keyNames[row + this.lastKeyPage] !== "???") {
            if (this.mouseY >= y && this.mouseY < y + 17) {
              this.currentKeyHover = row + this.lastKeyPage;
              if (this.mouseClickButton == 1) {
                this.currentKey = row + this.lastKeyPage;
                this.flashTimer = 50;
              }
            }
            y += 17;
          }
        }
      }
      if (this.currentKeyHover != this.lastKeyHover) {
        this.lastKeyHover = this.currentKeyHover;
        this.redraw = true;
      }
    }
    if ((this.mouseButton == 1 || this.mouseClickButton == 1) && this.showOverview) {
      let mouseClickX = this.mouseClickX;
      let mouseClickY = this.mouseClickY;
      if (this.mouseButton == 1) {
        mouseClickX = this.mouseX;
        mouseClickY = this.mouseY;
      }
      if (mouseClickX > this.overviewX && mouseClickY > this.overviewY && mouseClickX < this.overviewX + this.imageOverviewWidth && mouseClickY < this.overviewY + this.imageOverviewHeight) {
        this.offsetX = (mouseClickX - this.overviewX) * this.sizeX / this.imageOverviewWidth | 0;
        this.offsetZ = (mouseClickY - this.overviewY) * this.sizeZ / this.imageOverviewHeight | 0;
        this.lastMouseClickX = -1;
        this.redraw = true;
      }
    }
    if (this.mouseButton == 1 && this.lastMouseClickX != -1) {
      this.offsetX = this.lastOffsetX + ((this.lastMouseClickX - this.mouseX) * 2 / this.targetZoom | 0);
      this.offsetZ = this.lastOffsetZ + ((this.lastMouseClickY - this.mouseY) * 2 / this.targetZoom | 0);
      this.redraw = true;
    }
    if (this.zoom < this.targetZoom) {
      this.redraw = true;
      this.zoom += this.zoom / 30;
      if (this.zoom > this.targetZoom) {
        this.zoom = this.targetZoom;
      }
    }
    if (this.zoom > this.targetZoom) {
      this.redraw = true;
      this.zoom -= this.zoom / 30;
      if (this.zoom < this.targetZoom) {
        this.zoom = this.targetZoom;
      }
    }
    if (this.lastKeyPage < this.keyPage) {
      this.redraw = true;
      this.lastKeyPage++;
    }
    if (this.lastKeyPage > this.keyPage) {
      this.redraw = true;
      this.lastKeyPage--;
    }
    if (this.flashTimer > 0) {
      this.redraw = true;
      this.flashTimer--;
    }
    const left = this.offsetX - (this.width / this.zoom | 0);
    const top = this.offsetZ - (this.height / this.zoom | 0);
    const right = this.offsetX + (this.width / this.zoom | 0);
    const bottom = this.offsetZ + (this.height / this.zoom | 0);
    if (left < 48) {
      this.offsetX = (this.width / this.zoom | 0) + 48;
    }
    if (top < 48) {
      this.offsetZ = (this.height / this.zoom | 0) + 48;
    }
    if (right > this.sizeX - 48) {
      this.offsetX = this.sizeX - 48 - (this.width / this.zoom | 0);
    }
    if (bottom > this.sizeZ - 48) {
      this.offsetZ = this.sizeZ - 48 - (this.height / this.zoom | 0);
    }
  }
  async loadWorldmap() {
    let data = await this.db?.cacheload("worldmap.dat");
    if (data) {
      return new Jagfile(data);
    }
    let retry = 5;
    while (!data) {
      await this.showProgress(0, "Requesting map");
      try {
        data = await downloadUrl("/worldmap.jag");
      } catch (e) {
        data = undefined;
        for (let i = retry;i > 0; i--) {
          await this.showProgress(0, `Error loading - Will retry in ${i} secs.`);
          await sleep(1000);
        }
        retry *= 2;
        if (retry > 60) {
          retry = 60;
        }
      }
    }
    await this.db?.cachesave("worldmap.dat", data);
    return new Jagfile(data);
  }
  drawString(x, y, width, height, colorBorderTL, fillColor, colorBorderBR, str) {
    x = Math.trunc(x);
    y = Math.trunc(y);
    width = Math.trunc(width);
    height = Math.trunc(height);
    Pix2D.drawRect(x, y, width, height, 0);
    const xPad = x + 1;
    const yPad = y + 1;
    const widthPad = width - 2;
    const heightPad = height - 2;
    Pix2D.fillRect2d(xPad, yPad, widthPad, heightPad, fillColor);
    Pix2D.drawHorizontalLine(xPad, yPad, colorBorderTL, widthPad);
    Pix2D.drawVerticalLine(xPad, yPad, colorBorderTL, heightPad);
    Pix2D.drawHorizontalLine(xPad, yPad + heightPad - 1, colorBorderBR, widthPad);
    Pix2D.drawVerticalLine(xPad + widthPad - 1, yPad, colorBorderBR, heightPad);
    this.b12?.drawStringCenter(xPad + widthPad / 2 + 1, yPad + heightPad / 2 + 1 + 4, str, 0);
    this.b12?.drawStringCenter(xPad + widthPad / 2, yPad + heightPad / 2 + 4, str, 16777215);
  }
  clearEmptyTiles() {
    for (let x = 0;x < this.sizeX; x++) {
      for (let z = 0;z < this.sizeZ; z++) {
        if (this.underlayTiles[x][z] == 0 && this.overlayTiles[x][z] == 0) {
          this.floormapColors[x][z] = 0;
        }
      }
    }
  }
  averageUnderlayColors() {
    const maxX = this.sizeX;
    const maxZ = this.sizeZ;
    const average = new TypedArray1d(maxZ, 0);
    for (let x = 5;x < maxX - 5; x++) {
      for (let z = 0;z < maxZ; z++) {
        average[z] += this.floorcolUnderlay[this.underlayTiles[x + 5][z]] - this.floorcolUnderlay[this.underlayTiles[x - 5][z]];
      }
      if (x > 10 && x < maxX - 10) {
        let r = 0;
        let g = 0;
        let b = 0;
        for (let z = 5;z < maxZ - 5; z++) {
          const tileNorth = average[z + 5];
          const tileSouth = average[z - 5];
          r += (tileNorth >> 20) - (tileSouth >> 20);
          g += (tileNorth >> 10 & 1023) - (tileSouth >> 10 & 1023);
          b += (tileNorth & 1023) - (tileSouth & 1023);
          if (b > 0) {
            this.floormapColors[x][z] = this.convertHsl(r / 8533, g / 8533, b / 8533);
          }
        }
      }
    }
  }
  readUnderlayData(data) {
    while (data.available > 0) {
      const mx = data.g1() * 64 - this.originX;
      const mz = data.g1() * 64 - this.originZ;
      if (mx > 0 && mz > 0 && mx + 64 < this.sizeX && mz + 64 < this.sizeZ) {
        for (let x = 0;x < 64; x++) {
          let zIndex = this.sizeZ - mz - 1;
          for (let z = -64;z < 0; z++) {
            this.underlayTiles[mx + x][zIndex--] = data.g1();
          }
        }
      } else {
        data.pos += 4096;
      }
    }
  }
  readOverlayData(data) {
    while (data.available > 0) {
      const mx = data.g1() * 64 - this.originX;
      const mz = data.g1() * 64 - this.originZ;
      if (mx > 0 && mz > 0 && mx + 64 < this.sizeX && mz + 64 < this.sizeZ) {
        for (let x = 0;x < 64; x++) {
          let zIndex = this.sizeZ - mz - 1;
          for (let z = -64;z < 0; z++) {
            const opcode = data.g1();
            if (opcode === 0) {
              this.overlayTiles[x + mx][zIndex--] = 0;
            } else {
              this.overlayInfo[x + mx][zIndex] = data.g1();
              this.overlayTiles[x + mx][zIndex--] = this.floorcolOverlay[opcode];
            }
          }
        }
      } else {
        for (let i = -4096;i < 0; i++) {
          const opcode = data.g1();
          if (opcode != 0) {
            data.g1();
          }
        }
      }
    }
  }
  readLocData(data) {
    while (data.available > 0) {
      const mx = data.g1() * 64 - this.originX;
      const mz = data.g1() * 64 - this.originZ;
      if (mx > 0 && mz > 0 && mx + 64 < this.sizeX && mz + 64 < this.sizeZ) {
        for (let x = 0;x < 64; x++) {
          let zIndex = this.sizeZ - mz - 1;
          for (let z = -64;z < 0; z++) {
            while (true) {
              const opcode = data.g1();
              if (opcode === 0) {
                zIndex--;
                break;
              }
              if (opcode < 29) {
                this.locWalls[x + mx][zIndex] = opcode;
              } else if (opcode < 160) {
                this.locMapscenes[x + mx][zIndex] = opcode - 28;
              } else {
                this.locMapfunction[x + mx][zIndex] = opcode - 159;
                this.activeMapFunctions[this.activeMapFunctionCount] = opcode - 160;
                this.activeMapFunctionX[this.activeMapFunctionCount] = x + mx;
                this.activeMapFunctionZ[this.activeMapFunctionCount] = zIndex;
                this.activeMapFunctionCount++;
              }
            }
          }
        }
      } else {
        for (let x = 0;x < 64; x++) {
          let opcode = 0;
          for (let z = -64;z < 0; z++) {
            do {
              opcode = data.g1();
            } while (opcode != 0);
          }
        }
      }
    }
  }
  readObjData(data) {
    while (data.available > 0) {
      const mx = data.g1() * 64 - this.originX;
      const mz = data.g1() * 64 - this.originZ;
      if (mx > 0 && mz > 0 && mx + 64 < this.sizeX && mz + 64 < this.sizeZ) {
        for (let x = 0;x < 64; x++) {
          let zIndex = this.sizeZ - mz - 1;
          for (let z = -64;z < 0; z++) {
            this.objTiles[x + mx][zIndex--] = data.g1() == 1;
          }
        }
      } else {
        data.pos += 4096;
      }
    }
  }
  readNpcData(data) {
    while (data.available > 0) {
      const mx = data.g1() * 64 - this.originX;
      const mz = data.g1() * 64 - this.originZ;
      if (mx > 0 && mz > 0 && mx + 64 < this.sizeX && mz + 64 < this.sizeZ) {
        for (let x = 0;x < 64; x++) {
          let zIndex = this.sizeZ - mz - 1;
          for (let z = -64;z < 0; z++) {
            this.npcTiles[x + mx][zIndex--] = data.g1() == 1;
          }
        }
      } else {
        data.pos += 4096;
      }
    }
  }
  convertHsl(hue, saturation, lightness) {
    let r = lightness;
    let g = lightness;
    let b = lightness;
    if (saturation !== 0) {
      let q;
      if (lightness < 0.5) {
        q = lightness * (saturation + 1);
      } else {
        q = lightness + saturation - lightness * saturation;
      }
      const p = lightness * 2 - q;
      let t = hue + 0.3333333333333333;
      if (t > 1) {
        t--;
      }
      let d11 = hue - 0.3333333333333333;
      if (d11 < 0) {
        d11++;
      }
      if (t * 6 < 1) {
        r = p + (q - p) * 6 * t;
      } else if (t * 2 < 1) {
        r = q;
      } else if (t * 3 < 2) {
        r = p + (q - p) * (0.6666666666666666 - t) * 6;
      } else {
        r = p;
      }
      if (hue * 6 < 1) {
        g = p + (q - p) * 6 * hue;
      } else if (hue * 2 < 1) {
        g = q;
      } else if (hue * 3 < 2) {
        g = p + (q - p) * (0.6666666666666666 - hue) * 6;
      } else {
        g = p;
      }
      if (d11 * 6 < 1) {
        b = p + (q - p) * 6 * d11;
      } else if (d11 * 2 < 1) {
        b = q;
      } else if (d11 * 3 < 2) {
        b = p + (q - p) * (0.6666666666666666 - d11) * 6;
      } else {
        b = p;
      }
    }
    const intR = r * 256 | 0;
    const intG = g * 256 | 0;
    const intB = b * 256 | 0;
    return (intR << 16) + (intG << 8) + intB;
  }
  drawMap(left, top, right, bottom, widthOffset, heightOffset, width, height) {
    const visibleX = right - left;
    const visibleY = bottom - top;
    const widthRatio = (width - widthOffset << 16) / visibleX | 0;
    const heightRatio = (height - heightOffset << 16) / visibleY | 0;
    for (let x = 0;x < visibleX; x++) {
      let startX = widthRatio * x >> 16;
      let endX = widthRatio * (x + 1) >> 16;
      const lengthX = endX - startX;
      if (lengthX <= 0) {
        continue;
      }
      startX += widthOffset;
      endX += widthOffset;
      for (let y = 0;y < visibleY; y++) {
        let startY = heightRatio * y >> 16;
        let endY = heightRatio * (y + 1) >> 16;
        const lengthY = endY - startY;
        if (lengthY <= 0) {
          continue;
        }
        if (typeof this.overlayTiles[x + left] === "undefined") {
          continue;
        }
        startY += heightOffset;
        endY += heightOffset;
        const overlay = this.overlayTiles[x + left][y + top];
        if (overlay === 0) {
          Pix2D.fillRect2d(startX, startY, endX - startX, endY - startY, this.floormapColors[x + left][y + top]);
        } else {
          const info = this.overlayInfo[x + left][y + top];
          const shape = info & 252;
          if (shape == 0 || lengthX <= 1 || lengthY <= 1) {
            Pix2D.fillRect2d(startX, startY, lengthX, lengthY, overlay);
          } else {
            this.drawSmoothEdges(Pix2D.pixels, startY * Pix2D.width2d + startX, this.floormapColors[x + left][y + top], overlay, lengthX, lengthY, shape >> 2, info & 3);
          }
        }
      }
    }
    if (right - left > width - widthOffset) {
      return;
    }
    let visibleMapFunctionCount = 0;
    for (let x = 0;x < visibleX; x++) {
      let startX = widthRatio * x >> 16;
      let endX = widthRatio * (x + 1) >> 16;
      const lengthX = endX - startX;
      if (lengthX <= 0) {
        continue;
      }
      if (typeof this.locWalls[x + left] === "undefined") {
        continue;
      }
      startX += widthOffset;
      endX += widthOffset;
      for (let y = 0;y < visibleY; y++) {
        let startY = heightRatio * y >> 16;
        let endY = heightRatio * (y + 1) >> 16;
        const lengthY = endY - startY;
        if (lengthY <= 0) {
          continue;
        }
        startY += heightOffset;
        endY += heightOffset;
        let wall = this.locWalls[x + left][y + top] & 255;
        if (wall != 0) {
          let edgeX;
          if (lengthX == 1) {
            edgeX = startX;
          } else {
            edgeX = endX - 1;
          }
          let edgeY;
          if (lengthY == 1) {
            edgeY = startY;
          } else {
            edgeY = endY - 1;
          }
          let rgb = 13421772;
          if (wall >= 5 && wall <= 8 || wall >= 13 && wall <= 16 || wall >= 21 && wall <= 24) {
            rgb = 13369344;
            wall -= 4;
          }
          if (wall == 27 || wall == 28) {
            rgb = 13369344;
            wall -= 2;
          }
          if (wall == 1) {
            Pix2D.drawVerticalLine(startX, startY, rgb, lengthY);
          } else if (wall == 2) {
            Pix2D.drawHorizontalLine(startX, startY, rgb, lengthX);
          } else if (wall == 3) {
            Pix2D.drawVerticalLine(edgeX, startY, rgb, lengthY);
          } else if (wall == 4) {
            Pix2D.drawHorizontalLine(startX, edgeY, rgb, lengthX);
          } else if (wall == 9) {
            Pix2D.drawVerticalLine(startX, startY, 16777215, lengthY);
            Pix2D.drawHorizontalLine(startX, startY, rgb, lengthX);
          } else if (wall == 10) {
            Pix2D.drawVerticalLine(edgeX, startY, 16777215, lengthY);
            Pix2D.drawHorizontalLine(startX, startY, rgb, lengthX);
          } else if (wall == 11) {
            Pix2D.drawVerticalLine(edgeX, startY, 16777215, lengthY);
            Pix2D.drawHorizontalLine(startX, edgeY, rgb, lengthX);
          } else if (wall == 12) {
            Pix2D.drawVerticalLine(startX, startY, 16777215, lengthY);
            Pix2D.drawHorizontalLine(startX, edgeY, rgb, lengthX);
          } else if (wall == 17) {
            Pix2D.drawHorizontalLine(startX, startY, rgb, 1);
          } else if (wall == 18) {
            Pix2D.drawHorizontalLine(edgeX, startY, rgb, 1);
          } else if (wall == 19) {
            Pix2D.drawHorizontalLine(edgeX, edgeY, rgb, 1);
          } else if (wall == 20) {
            Pix2D.drawHorizontalLine(startX, edgeY, rgb, 1);
          } else if (wall == 25) {
            for (let i = 0;i < lengthY; i++) {
              Pix2D.drawHorizontalLine(startX + i, edgeY - i, rgb, 1);
            }
          } else if (wall == 26) {
            for (let i = 0;i < lengthY; i++) {
              Pix2D.drawHorizontalLine(startX + i, startY + i, rgb, 1);
            }
          }
        }
        const mapscene = this.locMapscenes[x + left][y + top];
        if (mapscene != 0) {
          this.imageMapscene[mapscene - 1].clip(startX - lengthX / 2, startY - lengthY / 2, lengthX * 2, lengthY * 2);
        }
        const mapfunction = this.locMapfunction[x + left][y + top];
        if (mapfunction != 0) {
          this.visibleMapFunctions[visibleMapFunctionCount] = mapfunction - 1;
          this.visibleMapFunctionsX[visibleMapFunctionCount] = startX + lengthX / 2;
          this.visibleMapFunctionsY[visibleMapFunctionCount] = startY + lengthY / 2;
          visibleMapFunctionCount++;
        }
      }
    }
    for (let i = 0;i < visibleMapFunctionCount; i++) {
      this.imageMapfunction[this.visibleMapFunctions[i]].draw(this.visibleMapFunctionsX[i] - 7, this.visibleMapFunctionsY[i] - 7);
    }
    if (MapView.shouldDrawItems) {
      for (let x = 0;x < visibleX; x++) {
        let startX = widthRatio * x >> 16;
        let endX = widthRatio * (x + 1) >> 16;
        const lengthX = endX - startX;
        if (lengthX <= 0) {
          continue;
        }
        if (typeof this.objTiles[x + left] === "undefined") {
          continue;
        }
        startX += widthOffset;
        endX += widthOffset;
        for (let y = 0;y < visibleY; y++) {
          let startY = heightRatio * y >> 16;
          let endY = heightRatio * (y + 1) >> 16;
          const lengthY = endY - startY;
          if (lengthY <= 0) {
            continue;
          }
          startY += heightOffset;
          endY += heightOffset;
          if (this.objTiles[x + left][y + top]) {
            this.imageMapdot0?.draw(startX, startY);
          }
        }
      }
    }
    if (MapView.shouldDrawNpcs) {
      for (let x = 0;x < visibleX; x++) {
        let startX = widthRatio * x >> 16;
        let endX = widthRatio * (x + 1) >> 16;
        const lengthX = endX - startX;
        if (lengthX <= 0) {
          continue;
        }
        if (typeof this.npcTiles[x + left] === "undefined") {
          continue;
        }
        startX += widthOffset;
        endX += widthOffset;
        for (let y = 0;y < visibleY; y++) {
          let startY = heightRatio * y >> 16;
          let endY = heightRatio * (y + 1) >> 16;
          const lengthY = endY - startY;
          if (lengthY <= 0) {
            continue;
          }
          startY += heightOffset;
          endY += heightOffset;
          if (this.npcTiles[x + left][y + top]) {
            this.imageMapdot1?.draw(startX, startY);
          }
        }
      }
    }
    if (this.flashTimer > 0) {
      for (let i = 0;i < visibleMapFunctionCount; i++) {
        if (this.visibleMapFunctions[i] == this.currentKey) {
          this.imageMapfunction[this.visibleMapFunctions[i]].draw(this.visibleMapFunctionsX[i] - 7, this.visibleMapFunctionsY[i] - 7);
          if (this.flashTimer % 10 < 5) {
            Pix2D.fillCircle(this.visibleMapFunctionsX[i], this.visibleMapFunctionsY[i], 15, 16776960, 128);
            Pix2D.fillCircle(this.visibleMapFunctionsX[i], this.visibleMapFunctionsY[i], 7, 16777215, 256);
          }
        }
      }
    }
    if (this.zoom == this.targetZoom && MapView.shouldDrawLabels) {
      for (let i = 0;i < this.labelCount; i++) {
        let x = this.labelX[i];
        let y = this.labelY[i];
        x -= this.originX;
        y = this.originZ + this.sizeZ - y;
        let drawX = widthOffset + (width - widthOffset) * (x - left) / (right - left) | 0;
        let drawY = heightOffset + (height - heightOffset) * (y - top) / (bottom - top) | 0;
        let fontType = this.labelFont[i];
        let rgb = 16777215;
        let font = this.b12;
        if (fontType === 2) {
          rgb = 16755200;
        }
        if (font !== null) {
          let label = this.labelText[i];
          let lineCount = 1;
          for (let j = 0;j < label.length; j++) {
            if (label[j] === "/") {
              lineCount++;
            }
          }
          drawY -= font.height2d * (lineCount - 1) / 2;
          while (true) {
            let newline = label.indexOf("/");
            if (newline === -1) {
              font.drawStringCenter(drawX + 1, drawY + 1, label, 0);
              font.drawStringCenter(drawX, drawY, label, rgb);
              break;
            }
            let part = label.substring(0, newline);
            font.drawStringCenter(drawX + 1, drawY + 1, part, 0);
            font.drawStringCenter(drawX, drawY, part, rgb);
            drawY += font.height2d;
            label = label.substring(newline + 1);
          }
        }
      }
    }
    if (MapView.shouldDrawBorders) {
      for (let mx = this.originX / 64;mx < (this.originX + this.sizeX) / 64; mx++) {
        for (let mz = this.originZ / 64;mz < (this.originZ + this.sizeZ) / 64; mz++) {
          let x = mx * 64;
          let z = mz * 64;
          x -= this.originX;
          z = this.originZ + this.sizeZ - z;
          const drawLeft = widthOffset + (width - widthOffset) * (x - left) / (right - left) | 0;
          const drawTop = heightOffset + (height - heightOffset) * (z - 64 - top) / (bottom - top) | 0;
          const drawRight = widthOffset + (width - widthOffset) * (x + 64 - left) / (right - left) | 0;
          const drawBottom = heightOffset + (height - heightOffset) * (z - top) / (bottom - top) | 0;
          if (drawLeft >= width || drawTop >= height || drawRight <= 0 || drawBottom <= 0) {
            continue;
          }
          let color = 16777215;
          if (this.activeTileX !== -1 && this.activeTileZ !== -1) {
            color = 16711680;
          }
          Pix2D.drawRect(drawLeft, drawTop, drawRight - drawLeft, drawBottom - drawTop, color);
          this.b12?.drawStringRight(drawRight - 5, drawBottom - 5, mx + "_" + mz, color, false);
          if (mx == 33 && mz >= 71 && mz <= 73) {
            this.b12?.drawStringCenter((drawRight + drawLeft) / 2, (drawBottom + drawTop) / 2, "u_pass", 16711680);
          } else if (mx >= 32 && mx <= 34 && mz >= 70 && mz <= 74) {
            this.b12?.drawStringCenter((drawRight + drawLeft) / 2, (drawBottom + drawTop) / 2, "u_pass", 16776960);
          }
        }
      }
    }
  }
  drawSmoothEdges(data, off, color, overlay, width, height, shape, rotation) {
    const step = Pix2D.width2d - width;
    if (shape == 9) {
      shape = 1;
      rotation = rotation + 1 & 3;
    } else if (shape == 10) {
      shape = 1;
      rotation = rotation + 3 & 3;
    } else if (shape == 11) {
      shape = 8;
      rotation = rotation + 3 & 3;
    }
    if (shape == 1) {
      if (rotation == 0) {
        for (let y = 0;y < height; y++) {
          for (let x = 0;x < width; x++) {
            if (x <= y) {
              data[off++] = overlay;
            } else {
              data[off++] = color;
            }
          }
          off += step;
        }
      } else if (rotation == 1) {
        for (let y = height - 1;y >= 0; y--) {
          for (let x = 0;x < width; x++) {
            if (x <= y) {
              data[off++] = overlay;
            } else {
              data[off++] = color;
            }
          }
          off += step;
        }
      } else if (rotation == 2) {
        for (let y = 0;y < height; y++) {
          for (let x = 0;x < width; x++) {
            if (x >= y) {
              data[off++] = overlay;
            } else {
              data[off++] = color;
            }
          }
          off += step;
        }
      } else if (rotation == 3) {
        for (let y = height - 1;y >= 0; y--) {
          for (let x = 0;x < width; x++) {
            if (x >= y) {
              data[off++] = overlay;
            } else {
              data[off++] = color;
            }
          }
          off += step;
        }
      }
    } else if (shape == 2) {
      if (rotation == 0) {
        for (let y = height - 1;y >= 0; y--) {
          for (let x = 0;x < width; x++) {
            if (x <= y >> 1) {
              data[off++] = overlay;
            } else {
              data[off++] = color;
            }
          }
          off += step;
        }
      } else if (rotation == 1) {
        for (let y = 0;y < height; y++) {
          for (let x = 0;x < width; x++) {
            if (x >= y << 1) {
              data[off++] = overlay;
            } else {
              data[off++] = color;
            }
          }
          off += step;
        }
      } else if (rotation == 2) {
        for (let y = 0;y < height; y++) {
          for (let x = width - 1;x >= 0; x--) {
            if (x <= y >> 1) {
              data[off++] = overlay;
            } else {
              data[off++] = color;
            }
          }
          off += step;
        }
      } else if (rotation == 3) {
        for (let y = height - 1;y >= 0; y--) {
          for (let x = width - 1;x >= 0; x--) {
            if (x >= y << 1) {
              data[off++] = overlay;
            } else {
              data[off++] = color;
            }
          }
          off += step;
        }
      }
    } else if (shape == 3) {
      if (rotation == 0) {
        for (let y = height - 1;y >= 0; y--) {
          for (let x = width - 1;x >= 0; x--) {
            if (x <= y >> 1) {
              data[off++] = overlay;
            } else {
              data[off++] = color;
            }
          }
          off += step;
        }
      } else if (rotation == 1) {
        for (let y = height - 1;y >= 0; y--) {
          for (let x = 0;x < width; x++) {
            if (x >= y << 1) {
              data[off++] = overlay;
            } else {
              data[off++] = color;
            }
          }
          off += step;
        }
      } else if (rotation == 2) {
        for (let y = 0;y < height; y++) {
          for (let x = 0;x < width; x++) {
            if (x <= y >> 1) {
              data[off++] = overlay;
            } else {
              data[off++] = color;
            }
          }
          off += step;
        }
      } else if (rotation == 3) {
        for (let y = 0;y < height; y++) {
          for (let x = width - 1;x >= 0; x--) {
            if (x >= y << 1) {
              data[off++] = overlay;
            } else {
              data[off++] = color;
            }
          }
          off += step;
        }
      }
    } else if (shape == 4) {
      if (rotation == 0) {
        for (let y = height - 1;y >= 0; y--) {
          for (let x = 0;x < width; x++) {
            if (x >= y >> 1) {
              data[off++] = overlay;
            } else {
              data[off++] = color;
            }
          }
          off += step;
        }
      } else if (rotation == 1) {
        for (let y = 0;y < height; y++) {
          for (let x = 0;x < width; x++) {
            if (x <= y << 1) {
              data[off++] = overlay;
            } else {
              data[off++] = color;
            }
          }
          off += step;
        }
      } else if (rotation == 2) {
        for (let y = 0;y < height; y++) {
          for (let x = width - 1;x >= 0; x--) {
            if (x >= y >> 1) {
              data[off++] = overlay;
            } else {
              data[off++] = color;
            }
          }
          off += step;
        }
      } else if (rotation == 3) {
        for (let y = height - 1;y >= 0; y--) {
          for (let x = width - 1;x >= 0; x--) {
            if (x <= y << 1) {
              data[off++] = overlay;
            } else {
              data[off++] = color;
            }
          }
          off += step;
        }
      }
    } else if (shape == 5) {
      if (rotation == 0) {
        for (let y = height - 1;y >= 0; y--) {
          for (let x = width - 1;x >= 0; x--) {
            if (x >= y >> 1) {
              data[off++] = overlay;
            } else {
              data[off++] = color;
            }
          }
          off += step;
        }
      } else if (rotation == 1) {
        for (let y = height - 1;y >= 0; y--) {
          for (let x = 0;x < width; x++) {
            if (x <= y << 1) {
              data[off++] = overlay;
            } else {
              data[off++] = color;
            }
          }
          off += step;
        }
      } else if (rotation == 2) {
        for (let y = 0;y < height; y++) {
          for (let x = 0;x < width; x++) {
            if (x >= y >> 1) {
              data[off++] = overlay;
            } else {
              data[off++] = color;
            }
          }
          off += step;
        }
      } else if (rotation == 3) {
        for (let y = 0;y < height; y++) {
          for (let x = width - 1;x >= 0; x--) {
            if (x <= y << 1) {
              data[off++] = overlay;
            } else {
              data[off++] = color;
            }
          }
          off += step;
        }
      }
    } else if (shape == 6) {
      if (rotation == 0) {
        for (let y = 0;y < height; y++) {
          for (let x = 0;x < width; x++) {
            if (x <= width / 2) {
              data[off++] = overlay;
            } else {
              data[off++] = color;
            }
          }
          off += step;
        }
      } else if (rotation == 1) {
        for (let y = 0;y < height; y++) {
          for (let x = 0;x < width; x++) {
            if (y <= height / 2) {
              data[off++] = overlay;
            } else {
              data[off++] = color;
            }
          }
          off += step;
        }
      } else if (rotation == 2) {
        for (let y = 0;y < height; y++) {
          for (let x = 0;x < width; x++) {
            if (x >= width / 2) {
              data[off++] = overlay;
            } else {
              data[off++] = color;
            }
          }
          off += step;
        }
      } else if (rotation == 3) {
        for (let y = 0;y < height; y++) {
          for (let x = 0;x < width; x++) {
            if (y >= height / 2) {
              data[off++] = overlay;
            } else {
              data[off++] = color;
            }
          }
          off += step;
        }
      }
    } else if (shape == 7) {
      if (rotation == 0) {
        for (let y = 0;y < height; y++) {
          for (let x = 0;x < width; x++) {
            if (x <= y - height / 2) {
              data[off++] = overlay;
            } else {
              data[off++] = color;
            }
          }
          off += step;
        }
      } else if (rotation == 1) {
        for (let y = height - 1;y >= 0; y--) {
          for (let x = 0;x < width; x++) {
            if (x <= y - height / 2) {
              data[off++] = overlay;
            } else {
              data[off++] = color;
            }
          }
          off += step;
        }
      } else if (rotation == 2) {
        for (let y = height - 1;y >= 0; y--) {
          for (let x = width - 1;x >= 0; x--) {
            if (x <= y - height / 2) {
              data[off++] = overlay;
            } else {
              data[off++] = color;
            }
          }
          off += step;
        }
      } else if (rotation == 3) {
        for (let y = 0;y < height; y++) {
          for (let x = width - 1;x >= 0; x--) {
            if (x <= y - height / 2) {
              data[off++] = overlay;
            } else {
              data[off++] = color;
            }
          }
          off += step;
        }
      }
    } else if (shape == 8) {
      if (rotation == 0) {
        for (let y = 0;y < height; y++) {
          for (let x = 0;x < width; x++) {
            if (x >= y - height / 2) {
              data[off++] = overlay;
            } else {
              data[off++] = color;
            }
          }
          off += step;
        }
      } else if (rotation == 1) {
        for (let y = height - 1;y >= 0; y--) {
          for (let x = 0;x < width; x++) {
            if (x >= y - height / 2) {
              data[off++] = overlay;
            } else {
              data[off++] = color;
            }
          }
          off += step;
        }
      } else if (rotation == 2) {
        for (let y = height - 1;y >= 0; y--) {
          for (let x = width - 1;x >= 0; x--) {
            if (x >= y - height / 2) {
              data[off++] = overlay;
            } else {
              data[off++] = color;
            }
          }
          off += step;
        }
      } else if (rotation == 3) {
        for (let y = 0;y < height; y++) {
          for (let x = width - 1;x >= 0; x--) {
            if (x >= y - height / 2) {
              data[off++] = overlay;
            } else {
              data[off++] = color;
            }
          }
          off += step;
        }
      }
    }
  }
  getTitleScreenState() {
    return -1;
  }
  isChatBackInputOpen() {
    return false;
  }
  isShowSocialInput() {
    return false;
  }
  getChatInterfaceId() {
    return -1;
  }
  getViewportInterfaceId() {
    return -1;
  }
  getReportAbuseInterfaceId() {
    return -1;
  }
}
export {
  MapView
};

//# debugId=61657C2877C4B1B564756E2164756E21
