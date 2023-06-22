export class ByteBuffer {
  private byteBuffer = '';

  constructor() {
  }

  get buffer(): string {
    return this.byteBuffer;
  }

  clear() {
    this.byteBuffer = '';
  }

  putByte(byte: number) {
    this.byteBuffer += byte.toString(16).padStart(2, '0').toUpperCase();
  }

  putShort(short: number) {
    this.byteBuffer += this.swapShortToString(short);
  }

  putInt(int: number) {
    const shortLow: number = int & 0xFFFF;
    const shortHigh: number = (int >> 16) & 0xFFFF;
    this.putShort(shortLow);
    this.putShort(shortHigh);
  }


  private swapShortToString(number: number): string {
    return ((number & 0xFF).toString(16).padStart(2, '0') + ((number >> 8) & 0xFF).toString(16).padStart(2, '0')).toUpperCase();
  }


}
