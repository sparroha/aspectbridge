import type { AppProps } from 'next/app'
import React from 'react'
import { SWRConfig } from 'swr'
import jsonFetch from '../lib/,base/jsonFetch'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../public/css/style.css'
import '../public/css/helper.css'
import '../static/logan/css/landscape.css'
import '../public/css/sliders.css'
import '../public/css/cardgame.css'
import '../public/css/sandbox.css'

export default function App(props: AppProps) {
    const { pageProps, Component } = props

    if ('_app_RenderNot' in pageProps || '_app_RedirectToLogin' in pageProps || '_app_RedirectShallow' in pageProps)
        return null

    return <SWRConfig value={{ fetcher: jsonFetch }}>
        <Component {...pageProps} />
    </SWRConfig>
}