import Link from 'next/link'
/*import $ from "jquery"
//import 'jquery/dist/jquery.js';
//import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap/dist/js/bootstrap.min.js';*/
//import WASD from "../public/wasd/wasd";//this works to import
import React from 'react';
import ReactDOM from 'react-dom';
/*
if (typeof window !== 'undefined') {
    //const root = ReactDOM.createRoot(document.getElementById('home'));
    //root.render(<Main />);
    //React.render(<WASD />, document.getElementById("root"));
}*/

const root = ReactDOM.createRoot(document.getElementById('root'));
export default function Main() {
  return (
    <div>
      <h1>www.donalds.party.dance</h1>
      <p>This is a simple home page</p>
      <p><Link href="../public/index.html">Home</Link></p>
    </div>
  );
}