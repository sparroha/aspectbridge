import Link from 'next/link'
export default {Nav};

function Nav() {
    return (
        <div>
            <h1>www.donalds.party.dance</h1>
            <p>This is a simple home page</p>
            <p><Link href="/invite.txt">A link to a file</Link></p>
        </div>
    );
}