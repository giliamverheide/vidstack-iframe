/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import { AppProps } from 'next/app'

import './base.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Component {...pageProps} />
  )
}