import { CardData } from "../../../pages/sandbox/cardgame"
import { NextResponse } from "next/server";

export async function GET(req, res) {

    const cards: CardData[] = [
        {name: "Forest", type: "Land", subtype: "Forest", text: "Tap: Add {G}.", cost: 0, power: 0, toughness: 0, color: "G", image: "https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=610389&type=card"},
        {name: "Island", type: "Land", subtype: "Island", text: "Tap: Add {U}.", cost: 0, power: 0, toughness: 0, color: "U", image: "https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=610383&type=card"},
        {name: "Mountain", type: "Land", subtype: "Mountain", text: "Tap: Add {R}.", cost: 0, power: 0, toughness: 0, color: "R", image: "https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=610387&type=card"},
        {name: "Plains", type: "Land", subtype: "Plains", text: "Tap: Add {W}.", cost: 0, power: 0, toughness: 0, color: "W", image: "https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=610381&type=card"},
        {name: "Swamp", type: "Land", subtype: "Swamp", text: "Tap: Add {B}.", cost: 0, power: 0, toughness: 0, color: "B", image: "https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=610385&type=card"},
    ]
    return NextResponse.json(cards)
}