const alephbeth = {
    aleph: {
        uni: '\u05D0',
        char: 'א'
    },
    beth: {
        uni: '\u05D1'
    },
    gimel: {
        uni: '\u05D2'
    },
    daleth: {
        uni: '\u05D3'
    },
    hey: {
        uni: '\u05D4'
    },
    vav: {
        uni: '\u05D5'
    },
    zain: {
        uni: '\u05D6'
    },
    keth: {
        uni: '\u05D7'
    },
    teth: {
        uni: '\u05D8'
    },
    yod: {
        uni: '\u05D9'
    },
    caph_suph: {
        uni: '\u05DA'
    },
    caph: {
        uni: '\u05DB'
    },
    lamed: {
        uni: '\u05DC'
    },
    mem_suph: {
        uni: '\u05DD'
    },
    mem: {
        uni: '\u05DE'
    },
    nun_suph: {
        uni: '\u05DF'
    },
    nun: {
        uni: '\u05E0'
    },
    samec: {
        uni: '\u05E1'
    },
    ain: {
        uni: '\u05E2'
    },
    pe_suph: {
        uni: '\u05E3'
    },
    pe: {
        uni: '\u05E4'
    },
    tzadi_suph: {
        uni: '\u05E5'
    },
    tzadi: {
        uni: '\u05E6'
    },
    qoph: {
        uni: '\u05E7'
    },
    resh: {
        uni: '\u05E8'
    },
    shin: {
        uni: '\u05E9'
    },
    tav: {
        uni: '\u05EA'
    }
}
const grammar = {
    pre: {
        exown: 'i',
    },
    suf: {
        enown: 'i',
        mplural: 'im',
        fplural: 'ot',
    }
}
function translit(str){
    let s = str
    s = s.replace('a',alephbeth.aleph.uni);
    s = s.replace('e','');
    s = s.replace('b',alephbeth.beth.uni);
    s = s.replace('g',alephbeth.gimel.uni);
    s = s.replace('d',alephbeth.daleth.uni);
    s = s.replace('h',alephbeth.hey.uni);
    s = s.replace('v',alephbeth.vav.uni);
    s = s.replace('u',alephbeth.vav.uni);
    s = s.replace('w',alephbeth.vav.uni);
    s = s.replace('z',alephbeth.zain.uni);
    s = s.replace('k',alephbeth.keth.uni);
    //s = s.replace('t',alephbeth.teth.uni);
    s = s.replace('y',alephbeth.yod.uni);
    s = s.replace('i',alephbeth.yod.uni);
    s = s.replace('j',alephbeth.yod.uni);
    s = s.replace('c',alephbeth.caph.uni);
    s = s.replace('l',alephbeth.lamed.uni);
    s = s.replace('m',alephbeth.mem.uni);
    s = s.replace('n',alephbeth.nun.uni);
    //s = s.replace('s',alephbeth.samec.uni);
    s = s.replace('o',alephbeth.ain.uni);
    s = s.replace('p',alephbeth.pe.uni);
    //s = s.replace('s',alephbeth.tzadi.uni);
    s = s.replace('q',alephbeth.qoph.uni);
    s = s.replace('r',alephbeth.resh.uni);
    s = s.replace('s',alephbeth.shin.uni);
    s = s.replace('t',alephbeth.tav.uni);
    return s;
}