export const rules = "Each turn constitutes a full day or 1 half of a day / night cycle depending on rule set./n"+
"Each turn consists of 1 movement to an adjacent location and 3 activities to perform at the new location./n"+
"only 1 action may be performed per activity per day/n"+
"*Activities that are not part of the standard rule set may be implemented per house rules./n"+
"At the start of the game, the house may define 4-10 Activities and 10-14 Landmarks for use during the session/n"+
"/n"+
"Activities By Suite/n"+
"A1. Swords Spades Arts/n"+
" - draw for meditate. learn Art associated with number./n"+
" - draw for train. determine modifier value for next skill./n"+
" - draw for implement. determine base value for this skill. implement skill with modified values./n"+
" S1. Dance/n"+
" S2. Paint/n"+
" S3. Engineer/n"+
" S4./n"+
" S5./n"+
" S6./n"+
" S7./n"+
" S8./n"+
" S9./n"+
" S10. /n"+
"/n"+
"A2. Cups Hearts Exploration/n"+
" - draw for scout. identify landmark associated to number./n"+
" - draw for mapping. define level of mapped landmark./n"+
" - draw for foraging. gain provisions by number drawn. if 1 or 10 is drawn, draw for scout./n"+
" L1. River(bonus to crop harvest)/n"+
" L2. Mine(bonus to exchange value)/n"+
" L3. Market(allows exchange)/n"+
" L4. Mountain(impassable location)/n"+
" L5. Forest(bonus to exchange value)/n"+
" L6. Farm(provides resource)/n"+
" L7. /n"+
" L8. /n"+
" L9. /n"+
" L10. /n"+
"A3. Wands Clubs Cultivation/n"+
" - draw for planting. plant crop of type and cycle length associated with number./n"+
" - draw for tending. reduce crop cycle by number drawn./n"+
" - draw for harvesting. gain yield by number drawn./n"+
" C1. wheat/n"+
" C2. /n"+
" C3. /n"+
" C4. /n"+
" C5. /n"+
" C6. /n"+
" C7. /n"+
" C8. /n"+
" C9. /n"+
" C10. /n"+
"A4. Discs Diamonds Landmarks/n"+
" - draw for dialog. define dialog duration./n"+
" - draw for exchange. define current trade value?./n"+
" - draw for arrange. define project type and duration./n"+
" P1. tower/n"+
" P2. /n"+
" P3. /n"+
" P4. /n"+
" P5. /n"+
" P6. /n"+
" P7. /n"+
" P8. /n"+
" P9. /n"+
" P10. /n"+
"/n"+
"ACTIVITIES/n"+
"1. Cultivation(crops provide resources for food, medicine and crafts)/n"+
"  actions:/n"+
"   - planting(starts new growth cycle at 10)/n"+
"   - tending(reduces growth cycle by 1)/n"+
"   - harvesting(harvests crop at growth cycle <1)/n"+
"/n"+
"  crops:/n"+
"   - locations may only support 1 crop at a time./n"+
"   - if a location is not occupied by a crop, a plant action may be taken./n"+
"   - a crop cycle 10[40] days. each tending action reduces the cycle by 1./n"+
"   - when the cycle reduces to 0, a harvest action can be performed./n"+
"   - harvests provide 1 yield per cycle length or [per day of growth and tending action performed]./n"+
"/n"+
"2. Exploration(exploration provides landmarks for resources that can be found at a location)/n"+
"  actions:/n"+
"   - scout landmarks(discover 1 landmark)/n"+
"   - mapping(may record one of the last 3 landmarks discovered)/n"+
"   - foraging(recover wild food and herbs in the area with a 1 in 20 chance to discover a landmark)/n"+
"/n"+
"  landmarks:/n"+
"   - landmarks identify additional activities that may be performed in this location/n"+
"   - unmapped landmarks may not be used for activities/n"+
"   - a location may only have 3 mapped landmarks at a time./n"+
"   - if more than 3 landmarks are mapped, landmarks must be unmapped until there are 3./n"+
"   - *landmark stipulations are subject to house rules./n"+
"/n"+
"3. Landmarks(landmarks provide structural identity to locations)/n"+
"  actions:/n"+
"   - dialog(engage a dialog ideally related to the local landmarks)/n"+
"   - exchange(buy, sell or trade resources via respective landmarks)/n"+
"   - arrange(organize or build a custom long term project for respective landmarks)/n"+
"/n"+
"4. Skills/n"+
"  actions:/n"+
"   - train(improve a skill by 1 level for 5 days)/n"+
"   - implement(use a skill)/n"+
"/n"+
"“Class Cards/n"+
" 4 groups to 4 Activities/n"+
" 10 units to 10 landmarks/n"+
" 4 high units to 4 “/n"+
"/n"+
"Draw to up to 7 cards each turn/n"+
"These cards are the players options for what transpires at a location./n"+
"The player may perform up to 4 activities from among the 7 cards during a turn./n"+
"/n"+
"Turn Progress./n"+
"Move: move 1 space in any direction./n"+
"Actions: perform up to 3 actions on that space./n"+
"Choose from available actions and roll for action value./n"+
"Action limitations may apply/n"