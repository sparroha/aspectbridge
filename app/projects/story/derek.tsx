import { useReducer } from "react"


export default function Story(props){
    const initialState = {
        sun: {
            article: 'the',
            action: 'gleams through',
        },
        day: {
            article: 'the',
            state: 'bright',
            brightness: 7,
        },
        clouds: {
            article: 'the',
            state: 'scattered',
            density: 3,
        },
        boy: {
            article: 'a',
            state: 'young',
            location: 'field',
            previousLocation: 'hole',
            action: 'crawls out',
        }
    }
    const reducer = (state, action) => {
        switch(action.type){
            case '': return {...state}
            default: return {...state}
        }
    }
    const [state, dispatch] = useReducer(reducer, initialState)
    return <>
        The {Object.getOwnPropertyNames(state)[1]} is {state.day.state} as the {Object.getOwnPropertyNames(state)[0]} {state.sun.action} {state.clouds.state} {Object.getOwnPropertyNames(state)[2]}.<br/>
        A boy, almost no longer recognizable, as such and moreso a young man, lost in his imagination and playing, crawls out of a hole onto a field of short green grass.<br/>
        Even though the sun is shining, it is still cold outside, and a storm looms on the horizon.<br/>
        The breeze suggests the rains will come his way.<br/>
        He doesn't mind though, thunder has always helped him sleep.<br/>
        He takes a deep breath, and exhales as he looks upon the rolling hills infront of him.<br/>
        He recalls fun memories of himself wrestling with his friends and sometimes rolling around the hillsides.<br/>
        He had not seen them for a few weeks and pondered about them.<br/>
        He sees a pack of horses grazing ahead.<br/>
        A crack of thunder in the distance startles the herd, and they begin to run in his direction.<br/>
        He laughs for a short moment as they change direction and run past him.<br/>
        He laughs for a short moment as they change direction and run past him.<br/>
        One though seems curious of the boy, and for a moment breaks off from the others to meet his gaze.<br/>
        The boy pauses for a moment, matching the curiosity.<br/>
        He was always rambunctious as a child and would run off the flocks of birds or try and chase squirrels up their trees, and so to have such a majestic animal approaching him was captivating.<br/>
        It approaches close enough for the boy to touch it.<br/>
        Could it have been domesticated at some time in the past?<br/>
        The storm begins to roll closer, yet the horse doesn't seem to be bothered. The boy reaches out and lays his hand on the horse's snout.<br/>
        It is a beautiful creature, like none he had ever seen before.<br/>
        The moment becomes shortlived, as a cry from his left breaks the bond.<br/>
        An older man runs towards the boy, yelling something he cannot understand, and strangely the storm rushes behind him.<br/>
        The boy is tackled as the storm now is immediately overhead, and lightning begins to crack the ground around them.<br/>
        He looks around, startled by the man who had come out of nowhere, and observes that the green hills that once surrounded him were now a dark brown mud, wet and splashing from chunks of dirt flying through the air.<br/>
        He panics, and looks up at where his new friend had been, but instead finds the rotting head of a stud resting half buried in the mud, as the rats began to scatter and seek shelter.<br/>
        Thunder continued to pound the ground around him, and dirt continued to be flung through the air, yet there is no lightning.<br/>
        The man who tackled him quickly picks him up and throws him back into the hole he just crawled out of.<br/>
        It was a trench dugout, filled with men of many different ages.<br/>
        There wasn't even one that didn't have some sort of bandaged wound or missing apendage.<br/>
        He had finally snapped out of his daydream.<br/>
        He remembers now the grueling reality that he presides in.<br/>
        He was still a boy at heart and only just old enough to be drafted into this conflict he was not at all mature enough to understand.<br/>
        Where the sound of thunder is just a past memory replaced with artillery, the rain is very much still real.<br/>
        It floods the trenches and begins to flow into the dugout.<br/>
        If there was anything they could do to stop the flooding, it was made pointless as it would just have to be rebuilt again the next day, and the day after that.<br/>
        The man who tackled him says nothing now, but proceeds further into the dugout.<br/>
        He approaches a cauldron hung slightly above what used to be a fire now snuffed by the encroaching flood.<br/>
        He grabs a ladel and a bowl, scooping out a more raw than cooked stew of some sort.<br/>
        Who knows what this concoction contained, and at this point in the war nobody seemed to care.<br/>
        Whether it was because they were just happy to have something to eat, or if it was just apathy, the men ate it regardless.<br/>
        The man approached the boy, who now sat closest to the entrance, still in shock.<br/>
        The man had been here long enough to be considered a veteran, and knew exactly what the boy who had only been here now a few days was going through.<br/>
        He reached out to offer the bowl to the boy, but the stench of it mixed with the view of the corpse outside led him to allow his stomach to growl.<br/>
        He would not eat today, there's just no way he could. The daylight outside quickly turned to night, made even darker since the storm covered the moon.<br/>
        He had yet to see combat, and had dreaded what monsters could possibly stand across the fields opposite of him.<br/>
        The stories he had been told of tall men with demonic horns and disgusting teeth were enough to frighten him even before he set foot in the trenches.<br/>
        At least now he was in shelter, began to try and get what little sleep he could.<br/>
        <br/>

    </>
}



/*
The day is bright as the sun gleams through scattered clouds.
A boy, almost no longer recognizable as such and moreso a young man, lost in his imagination and playing, crawls out of a hole onto a field of short green grass.
Even though the sun is shining, it is still cold outside, and a storm looms on the horizon.
The breeze suggests the rains will come his way. He doesn't mind though, thunder has always helped him sleep.
He takes a deep breath, and exhales as he looks upon the rolling hills infront of him. He recalls fun memories of himself wrestling with his friends and sometimes rolling around the hillsides.
He had not seen them for a few weeks and pondered about them. He sees a pack of horses grazing ahead.
A crack of thunder in the distance startles the herd, and they begin to run in his direction.
He laughs for a short moment as they change direction and run past him. One though seems curious of the boy, and for a moment breaks off from the others to meet his gaze.
The boy pauses for a moment, matching the curiosity. He was always rambunctious as a child and would run off the flocks of birds or try and chase squirrels up their trees, and so to have such a majestic animal approaching him was captivating.
It approaches close enough for the boy to touch it. Could it have been domesticated at some time in the past? The storm begins to roll closer, yet the horse doesn't seem to be bothered. The boy reaches out and lays his hand on the horse's snout.
It is a beautiful creature, like none he had ever seen before.
The moment becomes shortlived, as a cry from his left breaks the bond.
An older man runs towards the boy, yelling something he cannot understand, and strangely the storm rushes behind him.
The boy is tackled as the storm now is immediately overhead, and lightning begins to crack the ground around them.
He looks around, startled by the man who had come out of nowhere, and observes that the green hills that once surrounded him were now a dark brown mud, wet and splashing from chunks of dirt flying through the air.
He panics, and looks up at where his new friend had been, but instead finds the rotting head of a stud resting half buried in the mud, as the rats began to scatter and seek shelter.
Thunder continued to pound the ground around him, and dirt continued to be flung through the air, yet there is no lightning.
The man who tackled him quickly picks him up and throws him back into the hole he just crawled out of.
It was a trench dugout, filled with men of many different ages. There wasn't even one that didn't have some sort of bandaged wound or missing apendage.
He had finally snapped out of his daydream.
He remembers now the grueling reality that he precides in.
He was still a boy at heart and only just old enough to be drafted into this conflict he was not at all mature enough to understand.
Where the sound of thunder is just a past memory replaced with artillery, the rain is very much still real.
It floods the trenches and begins to flow into the dugout.
If there was anything they could do to stop the flooding, it was made pointless as it would just have to be rebuilt again the next day, and the day after that.
The man who tackled him says nothing now, but proceeds further into the dugout.
He approaches a cauldron hung slightly above what used to be a fire now snuffed by the encroaching flood.
He grabs a ladel and a bowl, scooping out a more raw than cooked stew of some sort. Who knows what this concoction contained, and at this point in the war nobody seemed to care.
Whether it was because they were just happy to have something to eat, or if it was just apathy, the men ate it regardless.
The man approached the boy, who now sat closest to the entrance, still in shock.
The man had been here long enough to be considered a veteran, and knew exactly what the boy who had only been here now a few days was going through.
He reached out to offer the bowl to the boy, but the stench of the it mixed with the view of the corpse outside led him to allow his stomach to growl.
He would not eat today, there's just no way he could. The daylight outside quickly turned to night, made even darker since the storm covered the moon.
He had yet to see combat, and had dreaded what monsters could possibly stand across the fields opposite of him.
The stories he had been told of tall men with demonic horns and disgusting teeth were enough to frighten him even before he set foot in the trenches.
At least now he was in shelter, began to try and get what little sleep he could.
*/
/*
[Several hours pass]

The storm has passed, and morning stirs.
The sky is a hellish dark hue as dirt lingers in the air, mixed with soot glistening from the sunrise glow.
It was not the same beautiful mornings he had grown up with. He and the men crawled out from the dugout, taking a much needed stretch.
From his far left to his far right, he could see soldiers crawling out all down the trench for what seemed like miles to him.
Straight ahead now was an unrecognizable landscape of every different shade of brown.
No life could be seen past the crows and rats, both now returning to their meals from the night before.
He freezes for a moment as a chill of cold air rushes past him, caused by another soldier passing him in a hurry and carrying a rucksack and some papers.
The boy watches as he enters a dugout several meters away, the officer's quarters.
The same man who offered him food steps out now with two rifles, gesturing to the boy with one.
He hesitates for a moment, and the two lock eyes together.
The man sighs and nods to the boy, who now slowly reaches out and grabs the firearm offered to him.
He wonders what he could possibly be expected to do with such an instrument that was almost as tall as him with bayonet fixed.
He knew how to operate smaller varmint rifles, but this was a tool of war that he had only been given minimal teaching to use.
He wasn't even given ammunition, and he could only assume that he was to fight like knights of old in the stories read to him at night. 

The soldier who passed earlier now leaves the other dugout, followed by a more decorated soldier;
ribbons upon his chest and epaulettes hanging from each shoulder.
He was easily spotted out amongst the dregs of muddied soldiers in torn apparel.
He drew his sidearm and whistle, raising the first to the air and the latter to his lips, then looked to his shining golden watch.
Everyone who could see him knew what was next, and didn't even need to be ordered as they all began to line up along the trenches.
The boy though was unsure, and had to be guided by the other man. He knew though what would come next, as green as he was, he was not stupid.
He looked to his left and to his right, seeing in both directions most other men with blank faces, some with eyes closed and muttering prayers to themselves, and fewer breaking down as they awaited the call.
Even with the mustering of what was now an army on both his flanks, it was silent, and only the wind and quite whimpering of men could be heard.
The decorated soldier now blew his whistle and fired his pistol into the air, and the silence erupted with a roar of soldiers stampeding out of the trenches, and the boy follows suit.
It takes only seconds for the warcries of the men to be met with thundering artillery and the cracking of wind as bullets pass by, and the crackling of flesh when they hit their mark.
There is no time to think about his surroundings, as the boy is barely able to keep his footing while grasping the rifle in one hand, holding his helmet to his head with the other, and hunched over trying to be as small a target he can make himself.
He looks only forward, in a trance, as he can barely make out at the edge of his vision the bodies that continue to collapse around him, some that are thrown into the air with their arms or legs separated from artillery fire, and others simply erased entirely from existence by direct hits.
He kept running. He had to keep running. There was no alternative.
He found himself running as he used to race with his friends through the grassy fields of this very place.
Crying to himself, praying to God to keep him safe as he continued to dodge the bodies ahead of him.
To each side he began to see more incapacitated bodies than he did men running with him, and now the shouting was drowned out by the warring instruments of his opponents ahead.
The world suddenly began to slow, almost to a halt, as his right leg abrubtly collapsed below him with a burning sensation.
He fell to the ground, and looks now at the hole in his thigh.
He cannot comprehend what he sees or feels, it fails to register to him as he looks in horror.
He wants to scream for his mother, but quickly the world around him goes black. He has been knocked out now by a concussive blast. 
*/
/*
[Nightfall]

A desperate gasp for air. The boy awakes and pants through short paniced breaths.
He pats himself up and down before looking down at his thigh.
The pain begins to come back to him, accompanied now by a seering burn in his right shoulder.
There are fragments of shrapnel where his patched sleeves used to be.
He whimpers in pain, but knows that he has to try and save himself.
He remembers the very basic training he was given, tearing off the sleeve of his left arm and tightening it around his leg above the wound.
He musters what strength he can to clutch his rifle start crawling;
he knows not which direction is safe. He can see ahead a trench is dimly lit with a fire in the darkness of the night.
He's sure he can stay hidden as overhead is blanketed with clouds. He crawls for several meters, and falls into a trench.
As he groans from the fall, he wonders to himself, did he he make it so close to the enemy just to fall in battle, or did he cover so little ground from his own trench? 

He rolls over to the wall of the trench and rests himself up. He looks now to his right, and freezes.
There is another younger boy sitting there, shocked and eyes wide open staring straight at him, with his own rifle aimed straight at him.
He too seems to be wounded, as both legs are bandaged below the knees.
A few seconds pass, seeming like an eternity as the two foes stare at eachother in the dim light of the torch.
The rifle clicks, but no shot rings out, and now a quiet tussle insues.
The older boy is able to start with the advantage as he bats away his opponent's rifle with his own and jumps ontop of him, pressing down his now sideways rifle on his neck.
As he begins to press so hard that the enemy's head starts sinking into the mud, he is now close enough to see the face of this enemy.
Fighting for breath, choking underneath the weight of the older boy, the life begins to leave him.
The older boy though, its taken aback. This person he fights, he's not at all like the stories he's been told.
He's much smaller and younger than himself, barely even a threat.
His press begins to weaken, and he loses his position at the younger boy throws him off and gasps for air as he rolls on his side whimpering.
The older boy now lays back where he started before the fight,breathing heavily now.
He looks at the poor soul he almost just snuffed out, seeing only his reflection their eyes.
As the whimpering boy turns to look back at him, he can't bare to meet eyes.
He rolls to his left and grabs his rifle, using it as a cane to prop himself back up.
He looks down with a face still horrified, then turns to climb out of the trench. 
*/
/*
He limps slowly back the direction he came, barely able to see several feet or even inches infront of him under the dark of night. His leg is fully covered in both mud and blood, and his tool of war now only acting as a crutch to keep himself standing. Passing by the bodies of both allies and foes, he wonders if there was a skirmish during his blackout. Had his trenches been taken over, or were they still under friendly control? He approaches a point where he is able to see lights ahead and behind him, he has made it halfway. 

A man cries out, followed by a shot that echoes. The boy knows not from which direction either came, but now it doesn't matter. The burning from his leg is now taken over by a worse pain in his chest and back. He has been shot again. It is a clean hit straight through. He collapses onto his back. His thoughts rush. Was he shot by friend or foe, from front or behind? He cries and begins to sob, only stopping to cough up blood. He looks up at the night sky, as the clouds have moved on. The moon is lit a bright heavenly glow, as it encompasses the entirety of his final moments. He closes his eyes and exhales. 

[End]. 
*/