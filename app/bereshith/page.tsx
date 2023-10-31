'use client'
import { useMemo, useReducer } from "react"
import { Col, Row } from "react-bootstrap"

export default function Beginning({params, searchParams}){
    const HSM = 1
    //1
    //In the beginning God created the heavens and the earth
    //In the beginning was the word and the word was with God and the word was God.
    const reshith = useReducer((state, action)=>{
        switch(action.type){
            case 'bara':
                switch(action.payload){
                    case 'heavens':
                        return {...state, heavens: action.payload}
                    case 'earth':
                        return {...state, earth: action.payload}
                    default:
                        return state
                }
            default:
                return state
        }
    }, {
        bereshith: {
            titles: ['in the beginning'/* what exists in heaven with Him */],
            b: 'in',
            ber: 'select',
            bera: 'make',
            raah: 'see',
            r: 'head',
            esh: 'man',
            resh: 'head',
            reshith: 'beginning',
            shith: 'garment',
            ath: 'mark'
        },
        bara: {
            titles: ['made, makde, do'],
            b: 'in',
            bar: 'to select',
            ar: 'to light',
            r: 'head',
            raah: 'to see',
            a: 'one'
        },
        shemaim: {
            titles: ['sea of ashes'/* what exists in heaven with Him */],
            sh: 'teeth',
            sheh: 'sheep',
            shem: 'name',
            shemai: 'my name',
            maim: 'water',
            yam: 'sea',
            am: 'mother, if',
            m: 'deep',
            mah: 'what?',
            mi: 'who',
        },
        eretz: {
            titles: ['earth'/* what exists in earth with Him */],
            a: 'one',
            ar: 'to light',
            aur: 'do light',
            aurah: 'a light',
            r: 'head',
            ra: 'raw',
            retz: 'crush',
            atz: 'tree',
            tz: 'side',
        }
    })
    const bereshith = useMemo(()=>{return reshith[0]},[reshith[0]])
    const bara = (barSelect: string, reahSee: [])=>{
        //bar = in head => choose = select
        //raah = see 
        //bar raah => bara => see choioce = make, make choice
        //bara = make = act on choice

        //select from what is seen to choose what to make
        return reahSee[barSelect]

    }
    //choose from what is seen in heaven to make what will become earth

    //2
    //Now the earth was without form and void, and darkness was over the face of the deep. And the Spirit of God was hovering over the face of the waters.
    //He was with God in the beginning.

    //3
    //And God said, "Let there be light," and there was light.
    //through him all things were made; without him nothing was made that has been made.

    //4
    //God saw that the light was good, and he separated the light from the darkness.
    //In him was life, and that life was the light of all mankind.

    //5
    //God called the light "day," and the darkness he called "night." And there was evening, and there was morning—the first day.
    //The light shines in the darkness, and the darkness has not overcome it.

    //6
    //And God said, "Let there be a vault between the waters to separate water from water."
    //There was a man sent from God whose name was John.

    //7
    //So God made the vault and separated the water under the vault from the water above it. And it was so.
    //He came as a witness to testify concerning that light, so that through him all might believe.

    //8
    //God called the vault "sky." And there was evening, and there was morning—the second day.
    //He himself was not the light; he came only as a witness to the light.

    //9
    //And God said, "Let the water under the sky be gathered to one place, and let dry ground appear." And it was so.
    //The true light that gives light to everyone was coming into the world.

    //10
    //God called the dry ground "land," and the gathered waters he called "seas." And God saw that it was good.
    //He was in the world, and though the world was made through him, the world did not recognize him.

    //11
    //Then God said, "Let the land produce vegetation: seed-bearing plants and trees on the land that bear fruit with seed in it, according to their various kinds." And it was so.
    //He came to that which was his own, but his own did not receive him.

    //12
    //The land produced vegetation: plants bearing seed according to their kinds and trees bearing fruit with seed in it according to their kinds. And God saw that it was good.
    //Yet to all who did receive him, to those who believed in his name, he gave the right to become children of God—

    //13
    //And there was evening, and there was morning—the third day.
    //children born not of natural descent, nor of human decision or a husband's will, but born of God.

    //14
    //And God said, "Let there be lights in the vault of the sky to separate the day from the night, and let them serve as signs to mark sacred times, and days and years,
    //The Word became flesh and made his dwelling among us. We have seen his glory, the glory of the one and only Son, who came from the Father, full of grace and truth.

    //15
    //and let them be lights in the vault of the sky to give light on the earth." And it was so.
    //John testified concerning him. He cried out, saying, "This is the one I spoke about when I said, 'He who comes after me has surpassed me because he was before me.'"

    //16
    //God made two great lights—the greater light to govern the day and the lesser light to govern the night. He also made the stars.
    //Out of his fullness we have all received grace in place of grace already given.

    //17
    //God set them in the vault of the sky to give light on the earth,
    //For the law was given through Moses; grace and truth came through Jesus Christ.

    //18
    //to govern the day and the night, and to separate light from darkness. And God saw that it was good.
    //No one has ever seen God, but the one and only Son, who is himself God and is in closest relationship with the Father, has made him known.

    //19
    //And there was evening, and there was morning—the fourth day.
    //This is the verdict: Light has come into the world, but people loved darkness instead of light because their deeds were evil.

    //20
    //And God said, "Let the water teem with living creatures, and let birds fly above the earth across the vault of the sky."
    //Everyone who does evil hates the light, and will not come into the light for fear that their deeds will be exposed.

    //21
    //So God created the great creatures of the sea and every living thing with which the water teems and that moves about in it, according to their kinds, and every winged bird according to its kind. And God saw that it was good.
    //But whoever lives by the truth comes into the light, so that it may be seen plainly that what they have done has been done in the sight of God.

    //22
    //God blessed them and said, "Be fruitful and increase in number and fill the water in the seas, and let the birds increase on the earth."
    //After this, Jesus and his disciples went out into the Judean countryside, where he spent some time with them, and baptized.

    //23
    //And there was evening, and there was morning—the fifth day.
    //Now John also was baptizing at Aenon near Salim, because there was plenty of water, and people were coming and being baptized.
    return <Row style={{backgroundColor: 'white'}}>
        <Col xs={12}><h4>State: in the beginning:</h4></Col>
        {Object.entries(bereshith).map(([name, value], i)=>{return <Col xs={3} key={i+'i'}>
            <h5>{name}</h5>
            {
                (value instanceof Object)?
                Object.entries(value).map(([nameb, valueb], ib)=>{return <div key={ib+'ib'}>
                &nbsp;&nbsp;&nbsp;&nbsp;<b>{nameb}</b>:&nbsp;{valueb}
                </div>}):<>&nbsp;&nbsp;&nbsp;&nbsp;<b>{name}</b>:&nbsp;{value}</>
            }
        </Col>})}
    </Row>
}