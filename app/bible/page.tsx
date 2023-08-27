'use client'
export default function Gen(c,v?){
    if(c==1&&(!v||v==2))return <>
        In the Beginning there was water and air<br/>
        "And the Spirit of {this.ELOHIM} was hovering over the face of the waters"<br/>
        "And the breath of {this.ELOHIM} was growing soft over the face of the waters"<br/>
        "And {this.ELOHIM} smelled the water"<br/>
    </>
     
    if(c==1&&v==3)return <>
        "And {this.ELOHIM} said Yehi Aur, and there was light"
    </>
    
    if(c==1&&v==4){
        let Bein = ['interval', 'spance between']
        let Bin = ['divide', 'discern']
        let Binah = 'understanding'
        
        let Ben = ['anointed', 'son']
        let Benah = ['build', 'obtain children', 'make', 'set up']

        let Bneyan = ["structure, building"]
        return <>
            "And {this.ELOHIM} saw the light, that it was good"
            "And {this.ELOHIM} divided between the light and between the darkness"
            "And {this.ELOHIM} did badel 'Ben haAur' and 'Ben haChoshek'"
        </>
    }
    return <></>
}