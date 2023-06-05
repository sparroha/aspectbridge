import { useEffect, useRef, useState } from "react";
import Dialog from "./dialog";
import { Col, Row } from "react-bootstrap";

export default function CssSlidersWrapper(props) {
  //{children}
  const controlStyle = {
    top: "0%",
    right: "2%",
  };
  const [state, setState] = useState({});
  const styleRef = useRef({
    right: "15%",
    width: '85vw',
    height: '100vh',
    opacity: '100%',
    borderRadius: '0%',
    borderWidth: '0%',
    fontSize: '100%',
    margin: '0%',
    padding: '0%',
    color: 'black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
    borderColor: 'black',
})

  /*const [content, setContent] = useState(<></>)
    useEffect(()=>{
        setContent(<>
            
        </>)
    },[])*/

  return (
    <div style={{...props.style, position: "relative" }}>
        <div id={"csschild_" + props.id} style={{ ...styleRef.current, position: 'absolute' }}>
            {props.children}
        </div>
        <div id={"csscontrol_" + props.id} style={{...controlStyle, position: 'absolute' }}>
            <label>{'width: '}</label>
            {styleRef.current.width+'  '}
            <input
                type="range"
                name={"width"}
                defaultValue={styleRef.current.width.split("vw")[0]}
                onChange={(e) => { console.log("width=" + e.target.value); styleRef.current.width = (Number.parseInt(e.target.value)<90?e.target.value:"85") + "vw"; setState({}); }}
            />

            <label>{'height: '}</label>
            {styleRef.current.width+'  '}
            <input
                type="range"
                name={"height"}
                defaultValue={styleRef.current.height.split("vh")[0]}
                onChange={(e) => { console.log("height=" + e.target.value); styleRef.current.height = e.target.value + "vh"; setState({}); }}
            />
        </div>
    </div>
  );
}
