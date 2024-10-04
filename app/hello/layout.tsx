export default async function DevLayout({children}) {
    return <>{children}<br/><br/><br/><hr style={{borderColor: 'white'}}/>
    	<a href="/hello">/api/hello</a><br/>
    	<a href="/hello?quest=what&how=do">/api/hello?quest=what&how=do</a><br/>

		<a href="/hello/guy">/api/hello/guy</a><br/>
    	<a href="/hello/guy?quest=what&how=do">/api/hello/guy?quest=what&how=do</a><br/>

		<a href="/hello/guy/2">/api/hello/guy/2</a><br/>
    	<a href="/hello/guy/2?quest=what&how=do">/api/hello/guy/2?quest=what&how=do</a><br/>

		<a href="/hello/guy/2/page">/api/hello/guy/2/page</a><br/>
    	<a href="/hello/guy/2/page?quest=what&how=do">/api/hello/guy/2/page?quest=what&how=do</a><br/>

		<a href="/hello/guy/2/page/another">/api/hello/guy/2/page/another</a><br/>
    	<a href="/hello/guy/2/page/another?quest=what&how=do">/api/hello/guy/2/page/another?quest=what&how=do</a><br/>

    </>
}