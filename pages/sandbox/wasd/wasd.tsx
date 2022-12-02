import Head from "next/head"
import { useEffect } from "react"
import { Col, Container, Image, Row } from "react-bootstrap"

export default function WASD() {
    useEffect(()=> {
        //require('./js/engine.js')
        //require('./js/movement.js')
        //require('./js/entity.js')
        //require('./js/game.js')
    })
    return (
        <>
            <Head>
                <title>game bridge</title>
                <meta charSet="utf-8"/>
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
                <meta name="keywords" content=""/>
                <meta name="description" content=""/>
                <link rel="shortcut icon" href="../assets/binary2.png" type="image/x-icon" />
            </Head>
            <Container>
                <Row class="row center-block">
                    <Col className="col-sm-3" id="debug" style={{ position: 'relative', visibility: 'visible' }}><pre>standby</pre></Col>
                    <Col className="col-sm-6"><h4><b>Control the Object With "W/A/S/D". Press 1 - 3 to file.</b></h4></Col>
                    <Col className="col-sm-3" id="ups" style={{ position:'relative', visibility:'visible' }}><pre>u/s= 0</pre></Col>
                </Row>
                <Row id="actions" className='row'>
                    <Col className='col-sm-1'>
                        <Image className="img" src="../assets/binary2.png" width="100%" />
                        <h1>1</h1></Col>
                    <Col className='col-sm-1'>
                        <Image className="img" src="http://thingiverse-production-new.s3.amazonaws.com/renders/a1/b8/45/62/8c/Icicle1_preview_featured.jpg" width="100%" />
                        <h1>2</h1></Col>
                    <Col className='col-sm-1'>
                        <Image className="img" src="http://thingiverse-production-new.s3.amazonaws.com/renders/a1/b8/45/62/8c/Icicle1_preview_featured.jpg" width="100%" />
                        <h1>3</h1></Col>
                    <Col className='col-sm-1'>
                        <Image className="img" src="../assets/binary2.png" width="100%" />
                        <h1>4</h1></Col></Row>
                <Row id="battlefield" style={{ position: "relative", overflow: "hidden", width: "100%", height: "70%", background: "#CCC"}}>
                    <Col id="player" class="player collide" style={{position:'absolute', overflow:'hidden', width:'50px',height:'50px',background: '#3F0' }}>
                        <img src="../assets/binary2.png" height="50px" width="50px"/>
                    </Col>
                    <Col id="wall" class="wall collide" style={{position:'absolute', overflow:'hidden', width:'20px', height:'400px', top:'50px', left:'100px', background:'#333'}}>
                    </Col>
                </Row>
            </Container>
        </>
    )
};
        
