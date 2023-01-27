import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import useSWR from "swr";

export default function ClientForm(){
    const [clientname, setClientName] = useState('')
    const [email, setEmail] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [statecode, setStateCode] = useState('')
    const [zip, setZip] = useState('')
    const [street1, setStreet1] = useState('')
    const [street2, setStreet2] = useState('')
    const [update, setUpdate] = useState(false)
    const [client, setClient] = useState(null)
    useEffect(() => {
        return
    },[client])
    return <Container><Form id={'clientForm'} onSubmit={(event) => {event.preventDefault();setUpdate(true)}} >
        <Form.Group controlId="formClient">
            <Form.Label>Client</Form.Label>
            <Form.Control required type="text" name="clientname" placeholder={"clientname"} onChange={(e)=>setClientName(e.target.value)}/>
        </Form.Group>
        <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" placeholder={"email"} onChange={(e)=>setEmail(e.target.value)}/>
        </Form.Group>
        <Form.Group controlId="formStreet1">
            <Form.Label>Street 1</Form.Label>
            <Form.Control type="text" name="street1" placeholder={"Street 1"} onChange={(e)=>setStreet1(e.target.value)}/>
        </Form.Group>
        <Form.Group controlId="formStreet2">
            <Form.Label>Street 2</Form.Label>
            <Form.Control type="text" name="street1" placeholder={"Street 2"} onChange={(e)=>setStreet2(e.target.value)}/>
        </Form.Group>
        <Form.Group controlId="formCity">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" name="city" placeholder={"city"} onChange={(e)=>setCity(e.target.value)}/>
        </Form.Group>
        <Form.Group controlId="formState">
            <Form.Label>State</Form.Label>
            <Form.Select name="state" placeholder={"state"} onChange={(e)=>{setState(e.target.options[e.target.selectedIndex].value);setStateCode(e.target.options[e.target.selectedIndex].value)}}>
                <option value="">- Select -</option>
                <option value="AL">AL - Alabama</option>
                <option value="AK">AK - Alaska</option>
                <option value="AS">AS - American Samoa</option>
                <option value="AZ">AZ - Arizona</option>
                <option value="AR">AR - Arkansas</option>
                <option value="CA">CA - California</option>
                <option value="CO">CO - Colorado</option>
                <option value="CT">CT - Connecticut</option>
                <option value="DE">DE - Delaware</option>
                <option value="DC">DC - District of Columbia</option>
                <option value="FL">FL - Florida</option>
                <option value="GA">GA - Georgia</option>
                <option value="GU">GU - Guam</option>
                <option value="HI">HI - Hawaii</option>
                <option value="ID">ID - Idaho</option>
                <option value="IL">IL - Illinois</option>
                <option value="IN">IN - Indiana</option>
                <option value="IA">IA - Iowa</option>
                <option value="KS">KS - Kansas</option>
                <option value="KY">KY - Kentucky</option>
                <option value="LA">LA - Louisiana</option>
                <option value="ME">ME - Maine</option>
                <option value="MD">MD - Maryland</option>
                <option value="MA">MA - Massachusetts</option>
                <option value="MI">MI - Michigan</option>
                <option value="MN">MN - Minnesota</option>
                <option value="MS">MS - Mississippi</option>
                <option value="MO">MO - Missouri</option>
                <option value="MT">MT - Montana</option>
                <option value="NE">NE - Nebraska</option>
                <option value="NV">NV - Nevada</option>
                <option value="NH">NH - New Hampshire</option>
                <option value="NJ">NJ - New Jersey</option>
                <option value="NM">NM - New Mexico</option>
                <option value="NY">NY - New York</option>
                <option value="NC">NC - North Carolina</option>
                <option value="ND">ND - North Dakota</option>
                <option value="MP">MP - Northern Mariana Islands</option>
                <option value="OH">OH - Ohio</option>
                <option value="OK">OK - Oklahoma</option>
                <option value="OR">OR - Oregon</option>
                <option value="PA">PA - Pennsylvania</option>
                <option value="PR">PR - Puerto Rico</option>
                <option value="RI">RI - Rhode Island</option>
                <option value="SC">SC - South Carolina</option>
                <option value="SD">SD - South Dakota</option>
                <option value="TN">TN - Tennessee</option>
                <option value="TX">TX - Texas</option>
                <option value="UM">UM - United States Minor Outlying Islands</option>
                <option value="UT">UT - Utah</option>
                <option value="VT">VT - Vermont</option>
                <option value="VI">VI - Virgin Islands</option>
                <option value="VA">VA - Virginia</option>
                <option value="WA">WA - Washington</option>
                <option value="WV">WV - West Virginia</option>
                <option value="WI">WI - Wisconsin</option>
                <option value="WY">WY - Wyoming</option>
                <option value="AA">AA - Armed Forces Americas</option>
                <option value="AE">AE - Armed Forces Africa</option>
                <option value="AE">AE - Armed Forces Canada</option>
                <option value="AE">AE - Armed Forces Europe</option>
                <option value="AE">AE - Armed Forces Middle East</option>
                <option value="AP">AP - Armed Forces Pacific</option>
            </Form.Select>
        </Form.Group>
        <Form.Group controlId="formZip">
            <Form.Label>ZIP</Form.Label>
            <Form.Control type="number" name="zip" placeholder={"zip"} onChange={(e)=>setZip(e.target.value)}/>
        </Form.Group>
        <Button type="submit" >Update Client</Button>
    </Form>
    <DisplayClient cliN={clientname} E={email} S1={street1} S2={street2} C={city} S={state} SC={statecode} Z={zip} U={update} setUpdate={setUpdate} setClient={setClient}/>
    </Container>
  }
  export function DisplayClient({cliN, E, S1, S2, C, S, SC, Z, U, setUpdate, setClient}) {
    const { data, error } = useSWR('../api/database/updateclientdetails?clientname='+cliN+'&email='+E+'&street1='+S1+'&street2='+S2+'&city='+C+'&state='+S+'&statecode='+SC+'&zip='+(Z?Z:'00000')+'&update='+U, { revalidateOnFocus: false })
    if (error) return <div style={{visibility: 'visible', position: 'absolute'}}>{JSON.stringify(error)}:Client not loaded.</div>
    if (!data) return <div>loading...</div>
    else {
      let {clientname, email, street1, street2, city, state, statecode, zip, updated, message} = data
      if (updated) {
        setUpdate(false)
      }
      setClient(data)
      //data.message = 'Welcome back '+data.username+'!'
      return <>{message}<Row>
            <Col sm={6} className={'tcenter r90'} style={{color: 'black', backgroundColor: 'lightgray'}}><b>Client: </b>{clientname}</Col>
            <Col sm={6} className={'tcenter r90'} style={{color: 'black', backgroundColor: 'lightgray'}}><b>Email: </b>{email}</Col>
            <Col sm={6} className={'tcenter r90'} style={{color: 'black', backgroundColor: 'lightgray'}}><b>Street 1: </b>{street1}</Col>
            <Col sm={6} className={'tcenter r90'} style={{color: 'black', backgroundColor: 'lightgray'}}><b>Street 2: </b>{street2}</Col>
            <Col sm={6} className={'tcenter r90'} style={{color: 'black', backgroundColor: 'lightgray'}}><b>City: </b>{city}</Col>
            <Col sm={6} className={'tcenter r90'} style={{color: 'black', backgroundColor: 'lightgray'}}><b>State - Code: </b>{statecode} - {state}</Col>
            <Col sm={6} className={'tcenter r90'} style={{color: 'black', backgroundColor: 'lightgray'}}><b>Zip: </b>{zip}</Col>
        </Row></>
    }
  }
  export function DisplayClientByName({cliN}) {
    //const [client, setClient] = useState({})
    const { data, error } = useSWR('../api/database/updateclientdetails?clientname='+cliN, { revalidateOnFocus: false })
    if (error) return <div style={{visibility: 'visible', position: 'relative'}}>{JSON.stringify(error)}{cliN}:Client not loaded.</div>
    if (!data) return <div>loading...</div>
    else {
      let {clientname, email, street1, street2, city, state, statecode, zip, updated, message} = data
      //setClient(data)
      //data.message = 'Welcome back '+data.username+'!'
      return <>{message}<Row>
            <Col sm={6} className={'tcenter r90'} style={{color: 'black', backgroundColor: 'lightgray'}}><b>Client: </b>{clientname}</Col>
            <Col sm={6} className={'tcenter r90'} style={{color: 'black', backgroundColor: 'lightgray'}}><b>Email: </b>{email}</Col>
            <Col sm={6} className={'tcenter r90'} style={{color: 'black', backgroundColor: 'lightgray'}}><b>Street 1: </b>{street1}</Col>
            <Col sm={6} className={'tcenter r90'} style={{color: 'black', backgroundColor: 'lightgray'}}><b>Street 2: </b>{street2}</Col>
            <Col sm={6} className={'tcenter r90'} style={{color: 'black', backgroundColor: 'lightgray'}}><b>City: </b>{city}</Col>
            <Col sm={6} className={'tcenter r90'} style={{color: 'black', backgroundColor: 'lightgray'}}><b>State - Code: </b>{statecode} - {state}</Col>
            <Col sm={6} className={'tcenter r90'} style={{color: 'black', backgroundColor: 'lightgray'}}><b>Zip: </b>{zip}</Col>
        </Row></>
    }
  }