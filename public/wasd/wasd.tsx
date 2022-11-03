import Head from "next/head";
import Link from "next/link";
import Script from 'next/script'
import Row from 'bootstrap';
import Col from 'bootstrap';
import Container from 'bootstrap';
import Img from 'bootstrap';
import Div from 'bootstrap';



const style = {
    bf: {
        position: "relative",
        overflow: "hidden",
        width: "100%",
        height: "70%",
        background: "#CCC"
    }
}
/*export default */function WASD() {
    return (
        <Container>
            <Head>
                <title>game bridge</title>
                <meta charSet="utf-8"/>
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
                <meta name="keywords" content=""/>
                <meta name="description" content=""/>
                <link rel="shortcut icon" href="../assets/binary2.png" type="image/x-icon" />
                <link rel="stylesheet" href="../../node_modules/bootstrap/dist/css/bootstrap.min.css" />
                <Script src="../../node_modules/jquery/dist/jquery.js" type='text/javascript'></Script>
                <Script src="../../node_modules/bootstrap/dist/js/bootstrap.min.js" type='text/javascript'></Script>

                <link rel="stylesheet" href="../../pages/css/wasd.css" />
                <Script src="js/engine.js" type='text/javascript'></Script>
                <Script src="js/movement.js" type='text/javascript'></Script>
                <Script src="js/entity.js" type='text/javascript'></Script>
                <Script src="js/game.js" type='text/javascript'></Script>
            </Head>
            <body id="body">
                <Row class="row center-block">
                    <Col class="col-sm-3" id="debug" style="position:relative;visibility:visible"><pre>standby</pre></Col>
                    <Col class="col-sm-6"><h4><b>Control the Object With "W/A/S/D". Press 1 - 3 to file.</b></h4></Col>
                    <Col class="col-sm-3" id="ups" style="position:relative;visibility:visible"><pre>u/s= 0</pre></Col>
                </Row>
                <Row class='row'>
                    <ul id="actions">
                        <Col class='col-sm-1'>
                            <li>
                                <Img class="img" src="../assets/binary2.png" width="100%" />
                                <h1>1</h1>
                            </li>
                        </Col>
                        <Col class='col-sm-1'>
                            <li>
                                <Img class="img" src="http://thingiverse-production-new.s3.amazonaws.com/renders/a1/b8/45/62/8c/Icicle1_preview_featured.jpg" width="100%" />
                                <h1>2</h1>
                            </li>
                        </Col>
                        <Col class='col-sm-1'>
                            <li>
                                <Img class="img" src="http://thingiverse-production-new.s3.amazonaws.com/renders/a1/b8/45/62/8c/Icicle1_preview_featured.jpg" width="100%" />
                                <h1>3</h1>
                            </li>
                        </Col>
                        <Col class='col-sm-1'>
                            <li>
                                <Img class="img" src="../assets/binary2.png" width="100%" />
                                <h1>4</h1>
                            </li>
                        </Col>
                        <Col class='col-sm-1'>
                            <li>
                                <Img class="img" src="../assets/binary2.png" width="100%" />
                                <h1>5</h1>
                            </li>
                        </Col>
                        <Col class='col-sm-1'>
                            <li>
                                <Img class="img" src="../assets/binary2.png" width="100%" />
                                <h1>6</h1>
                            </li>
                        </Col>
                        <Col class='col-sm-1'>
                            <li>
                                <Img class="img" src="../assets/binary2.png" width="100%" />
                                <h1>7</h1>
                            </li>
                        </Col>
                    </ul>
                </Row>
                <Div id="battlefield" style={style.bf}>
                    <Div id="player" class="player collide" style="position:absolute;overflow:hidden;width:50px;height:50px;background:#3F0">
                        <img src="../assets/binary2.png" height="50px" width="50px"/>
                    </Div>
                    <Div id="wall" class="wall collide" style="position:absolute;overflow:hidden;width:20px;height:400px;top:50px;left:100px;background:#333">
                    </Div>
                </Div>
            </body>
        </Container>)};
