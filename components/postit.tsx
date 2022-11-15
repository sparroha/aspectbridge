export default function PostIt() { return <>
    <li id={'newlist'} className={'drag'}>
        click to move
        <a href={'#'} onClick={"editNote(this,true);"}>
            <h2>New Note</h2>
            <p>content</p>
        </a>
    </li>
</>}
    //<div id={'bulletin'}><PostIt /></div>
