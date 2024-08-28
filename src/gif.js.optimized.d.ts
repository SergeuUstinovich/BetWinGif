declare module 'gif.js.optimized' {
    interface GIFOptions {
      workers?: number;
      quality?: number;
      workerScript?: string;
    }
  
    interface AddFrameOptions {
      delay?: number;
      copy?: boolean;
      text?: string;
    }
  
    interface GIF {
      addFrame(image: HTMLImageElement | HTMLCanvasElement, options?: AddFrameOptions): void;
      on(event: 'finished', callback: (blob: Blob) => void): void;
      render(): void;
    }
  
    const GIF: {
      new (options?: GIFOptions): GIF;
    };
  
    export default GIF;
  }
  