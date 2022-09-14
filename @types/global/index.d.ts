declare global {
  interface Window {
    kakao: any;
  }
}

declare module '*.jpg' {
  const value: any;
  export = value;
}

export {};
