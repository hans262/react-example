/// <reference types="vite/client" />

declare interface Window {
  MathJax: any
}

declare module '*.ogg' {
  const source: string
  export default source
}

declare module 'nativeshare';