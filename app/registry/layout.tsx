const btnstyle={
    border: '3px outset grey',
    backgroundColor: 'lightgrey',
    borderRadius: '10px',
    boxShadow: '7px 7px 7px black',
    height: 'auto',
    width: 'auto',
    padding: '5px'
}
export default function Layout({children}: {children: React.ReactNode}){
    const apps = ['csswrapper_', 'verse:', 'test', 'lexicon:', 'growth',
        '_beltedGameState', 'active_users', 'logos:', 'alephbeth', 'story',
        'chess:', 'on_the_go:', 'pistons:', 'rdxtmpl:', 'colorPicker:']
    return <div style={{backgroundColor: 'white', padding: '5px'}}>
            <div className={'row'} style={{margin: '5px 0px 5px 0px'}}>
                <div className={'col'}><a style={btnstyle} key={'registry'} href={'/registry'}>{'registry'}</a></div>
                {apps.map(app=><div className={'col'}><a style={btnstyle} key={app} href={'/registry?app='+app}>{app}</a></div>)}
            </div>
            <div className={'row'}>
                <div className={'col'}>{children}</div>
            </div>
        </div>
}