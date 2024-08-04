import type { AppProps } from 'next/app'
import Router from 'next/router'
import NProgress from 'nprogress' // nprogress module
import 'nprogress/nprogress.css' // styles of nprogress
import React, { useEffect } from 'react'
import { SWRConfig } from 'swr'
import jsonFetch from '../lib/,base/jsonFetch'
/**Socket */
import express from 'express'
import {createServer} from 'http'
/**Socket */
/**CSS */
//import '../public/css/nav.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../public/css/style.css'
import '../public/css/helper.css'
import '../static/logan/css/landscape.css'
import '../public/css/sliders.css'
import '../public/css/cardgame.css'
import '../public/css/sandbox.css'
/**CSS */
/**Socket *//*
export const app = express()
export const server = createServer(app)
app.get('/api/socket',(req,res)=>{
    res.send('socket')
})
server.listen(3000,()=>{
    console.log('listening on port 3000')
})*/
/**Socket */

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())
export type CommonProps = {}

export type RenderNot = { _app_RenderNot: true }
export type RedirectToLogin = { _app_RedirectToLogin: true }
/** not used at this time */
export type RedirectShallow = { _app_RedirectShallow: string }
export type Say404 = { _app_Say404: boolean }

interface CustomAppProps extends AppProps<CommonProps> { // AppProps<PageProps>
    //pageProps: CommonProps | AbortProps // AbortProps skips the Page component
}

export default React.memo(App, function propsAreEqual(prevProps, nextProps) {
    const { pageProps } = nextProps

    if ('_app_RenderNot' in pageProps) {
        return true // skip server-side computation

    } else if ('_app_RedirectToLogin' in pageProps) {
        Router.replace(`/login#` + location.pathname.substring(1) + location.search + location.hash, undefined)
        return true // skip render (I think it would page blink otherwise)

    } else if ('_app_RedirectShallow' in pageProps)
        // Change URL without fetching again
        Router.replace(pageProps._app_RedirectShallow, undefined, { shallow: true })

    return false
})

function App(props: CustomAppProps) {
    const { pageProps, Component } = props
    useEffect(function () {
        if ('_app_RedirectToLogin' in pageProps)
            // TODO this might be better written as a Router.replace line to be snappy, but was having error // default: location.replace()
            Router.replace(`/login#` + location.pathname.substring(1) + location.search + location.hash)
    })

    if ('_app_RenderNot' in pageProps || '_app_RedirectToLogin' in pageProps || '_app_RedirectShallow' in pageProps)
        return null

    return <SWRConfig value={{ fetcher: jsonFetch }}>
        <Component {...pageProps} />
    </SWRConfig>
}