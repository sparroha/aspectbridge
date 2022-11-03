import Link from 'next/link'
//import $ from "jquery"
import 'jquery/dist/jquery.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

export default function () {
  return (
    <div>
      <h1>www.donalds.party.dance</h1>
      <p>This is a simple home page</p>
      <p><Link href="/invite.txt">A link to a file</Link></p>
    </div>
  );
}