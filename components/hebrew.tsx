import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
export default function TLiterator(props){
    const [tlword, setTLWord] = useState('')

    return <Form id="tLit" className="vcenter tcenter">
                <Form.Group>
                    <Form.Label>Input</Form.Label>
                    <Form.Control  type="text" id="word" name="word" placeholder="Enter word" onChange={(e)=>setTLWord(translit(e.target.value))} />
                    <Form.Text className="text-muted"><h2>transliteration: </h2></Form.Text>
                    <Form.Text className="text-muted"><h1 id="hbru">{tlword}</h1></Form.Text>
                    {/*<Form.Control  type="submit"/>*/}
                </Form.Group>
            </Form>
}
export const alephbeth = {
    aleph: {
        uni: '\u05D0',
        number: 1,
        order: 1,
        char: 'א'
    },
    beth: {
        uni: '\u05D1',
        number: 2,
        order: 2,
    },
    gimel: {
        uni: '\u05D2',
        number: 3,
        order: 3,
    },
    daleth: {
        uni: '\u05D3',
        number: 4,
        order: 4,
    },
    hey: {
        uni: '\u05D4',
        number: 5,
        order: 5,
    },
    vav: {
        uni: '\u05D5',
        number: 6,
        order: 6,
    },
    zain: {
        uni: '\u05D6',
        number: 7,
        order: 7,
    },
    keth: {
        uni: '\u05D7',
        number: 8,
        order: 8,
    },
    teth: {
        uni: '\u05D8',
        number: 9,
        order: 9,
    },
    yod: {
        uni: '\u05D9',
        number: 10,
        order: 10,
    },
    caph_suph: {
        uni: '\u05DA',
        number: 500,
        order: 23,
    },
    caph: {
        uni: '\u05DB',
        number: 20,
        order: 11,
    },
    lamed: {
        uni: '\u05DC',
        number: 30,
        order: 12,
    },
    mem_suph: {
        uni: '\u05DD',
        number: 600,
        order: 24,
    },
    mem: {
        uni: '\u05DE',
        number: 40,
        order: 13,
    },
    nun_suph: {
        uni: '\u05DF',
        number: 700,
        order: 25,
    },
    nun: {
        uni: '\u05E0',
        number: 50,
        order: 14,
    },
    samec: {
        uni: '\u05E1',
        number: 60,
        order: 15,
    },
    ain: {
        uni: '\u05E2',
        number: 70,
        order: 16,
    },
    pe_suph: {
        uni: '\u05E3',
        number: 800,
        order: 26,
    },
    pe: {
        uni: '\u05E4',
        number: 80,
        order: 17,
    },
    tzadi_suph: {
        uni: '\u05E5',
        number: 900,
        order: 27,
    },
    tzadi: {
        uni: '\u05E6',
        number: 90,
        order: 18,
    },
    qoph: {
        uni: '\u05E7',
        number: 100,
        order: 19,
    },
    resh: {
        uni: '\u05E8',
        number: 200,
        order: 20,
    },
    shin: {
        uni: '\u05E9',
        number: 300,
        order: 21,
    },
    tav: {
        uni: '\u05EA',
        number: 400,
        order: 22,
    }
}
export const grammar = {
    pre: {
        exown: 'i',
    },
    suf: {
        enown: 'i',
        mplural: 'im',
        fplural: 'ot',
    }
}
export function translit(str){
    let s = str.toLowerCase();
    let a = str.split("");

    
    if (s.charAt(s.length-1)=='s'){
        s = s.slice(0,-1);
        s = s.concat('im');
    }

    if (s.charAt(0)=='a'){s = s.replace('a',alephbeth.aleph.uni);}
    else if (s.charAt(0)=='e'){s = s.replace('e',alephbeth.aleph.uni);}
    else if ((s.charAt(0)=='g') && (s.charAt(1)=='a')){
        s = s.replace('g',alephbeth.ain.uni);
        s = s.replace('a', '');
    }else if (s.charAt(0)=='h'){s = s.replace('h',alephbeth.hey.uni);}

    s = s.replaceAll('th',alephbeth.tav.uni);
    s = s.replaceAll('ck',alephbeth.keth.uni);
    s = s.replaceAll('ch',alephbeth.keth.uni);
    s = s.replaceAll('kh',alephbeth.keth.uni);
    s = s.replaceAll('x',alephbeth.keth.uni);
    s = s.replaceAll('sh',alephbeth.shin.uni);

    s = s.replaceAll('a',alephbeth.aleph.uni);
    s = s.replaceAll('e','');
    s = s.replaceAll('b',alephbeth.beth.uni);
    s = s.replaceAll('g',alephbeth.gimel.uni);

    s = s.replaceAll('d',alephbeth.daleth.uni);
    s = s.replaceAll('h',alephbeth.hey.uni);
    s = s.replaceAll('v',alephbeth.vav.uni);
    s = s.replaceAll('u',alephbeth.vav.uni);
    s = s.replaceAll('w',alephbeth.vav.uni);
    s = s.replaceAll('z',alephbeth.zain.uni);
    s = s.replaceAll('k',alephbeth.keth.uni);
    //s = s.replaceAll('t',alephbeth.teth.uni);
    s = s.replaceAll('y',alephbeth.yod.uni);
    s = s.replaceAll('i',alephbeth.yod.uni);
    s = s.replaceAll('j',alephbeth.yod.uni);
    s = s.replaceAll('c',alephbeth.caph.uni);
    s = s.replaceAll('l',alephbeth.lamed.uni);
    s = s.replaceAll('m',alephbeth.mem.uni);
    s = s.replaceAll('n',alephbeth.nun.uni);
    //s = s.replaceAll('s',alephbeth.samec.uni);
    s = s.replaceAll('o',alephbeth.ain.uni);
    s = s.replaceAll('p',alephbeth.pe.uni);
    s = s.replaceAll('f',alephbeth.pe_suph.uni);
    //s = s.replaceAll('s',alephbeth.tzadi.uni);
    s = s.replaceAll('q',alephbeth.qoph.uni);
    s = s.replaceAll('r',alephbeth.resh.uni);
    s = s.replaceAll('s',alephbeth.shin.uni);
    
    s = s.replaceAll('t',alephbeth.tav.uni);
    return s;
}