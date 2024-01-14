function extractVisibleCards() {
    // Get all card elements
    const allCards = document.querySelectorAll('div[style*="position: absolute;"]');

    // Array to hold visible cards
    let visibleCards = [];

    console.log("Total cards found: ", allCards.length); // Log how many cards are found

    // Iterate over each card and check visibility
    allCards.forEach(card => {
        const visibility = card.style.visibility;
        console.log("Card visibility: ", visibility); // Log each card's visibility

        // Check if the card is visible
        if (visibility !== 'hidden') {
            // Extract relevant information from the card
            let cardInfo = card.innerHTML; // or any specific information you need

            // Add the extracted information to the visible cards array
            visibleCards.push(cardInfo);
        }
    });

    // Return the array of visible cards
    return visibleCards;
}
/*
let visibleCardsData = extractVisibleCards();
console.log("Visible cards data: ", visibleCardsData);
*/
function analyzeCards(cardHtmlList) {
    return cardHtmlList.map(cardHtml => {
        const parser = new DOMParser();
        const cardDoc = parser.parseFromString(cardHtml, 'text/html');
        
        // Find all SVG elements in the card
        const svgs = cardDoc.querySelectorAll('svg');
        const shapeCount = svgs.length;

        let shapeType = '';
        let color = '';
        let fillType = '';

        if (svgs.length > 0) {
            const useElements = svgs[0].querySelectorAll('use');
            shapeType = useElements[0].getAttribute('href').replace('#', ''); // Get shape type (oval, squiggle, diamond)

            // Check if the second 'use' element exists to read the stroke attribute
            if (useElements.length > 1) {
                color = useElements[1].getAttribute('stroke'); // Get color from stroke attribute of the second 'use' element
            }
            
            const maskAttribute = useElements[0].getAttribute('mask');
            const fillAttribute = useElements[0].getAttribute('fill');
            //fillType = maskAttribute && maskAttribute === "url(#mask-stripe)" ? 'striped' : 'solid'; // Determine fill type
            if (fillAttribute === 'transparent') {
                fillType = 'transparent';
            } else if (maskAttribute && maskAttribute === "url(#mask-stripe)") {
                fillType = 'striped';
            } else {
                fillType = 'solid'
            }
        }

        return {
            shapeCount,
            shapeType,
            color,
            fillType
        };
    });
}
/*
// Example usage
const cardDetails = analyzeCards(extractVisibleCards());
console.log(cardDetails);    
*/
function isSet(card1, card2, card3) {
    // Check each property
    const properties = ['shapeCount', 'shapeType', 'fillType', 'color'];
    return properties.every(property => {
        // Check if all are the same or all are different for each property
        let allSame = (card1[property] === card2[property]) && (card2[property] === card3[property]);
        let allDifferent = (card1[property] !== card2[property]) && (card2[property] !== card3[property]) && (card1[property] !== card3[property]);
        return allSame || allDifferent;
    });
}

function findSets(cards) {
    let sets = [];
    for (let i = 0; i < cards.length; i++) {
        for (let j = i + 1; j < cards.length; j++) {
            for (let k = j + 1; k < cards.length; k++) {
                if (isSet(cards[i], cards[j], cards[k])) {
                    sets.push([cards[i], cards[j], cards[k]]);
                }
            }
        }
    }
    return sets;
}


// Instead of just logging, return the sets
const cardDetails = analyzeCards(extractVisibleCards());
const sets = findSets(cardDetails);
return sets;  // This will be the return value of the script

/*
// Example usage
const cardDetails = analyzeCards(extractVisibleCards());
console.log(cardDetails);

const sets = findSets(cardDetails);
console.log(sets);
*/



/*
0
: 
"<div class=\"jss27 jss28\" style=\"width: 138px; height: 83px; margin: 5px; border-radius: 5px; background: initial; transition: width 0.5s ease 0s, height 0.5s ease 0s;\"><svg class=\"jss26\" width=\"30\" height=\"60\" viewBox=\"0 0 200 400\" style=\"transition: width 0.5s ease 0s, height 0.5s ease 0s;\"><use href=\"#oval\" fill=\"#800080\" mask=\"\"></use><use href=\"#oval\" stroke=\"#800080\" fill=\"none\" stroke-width=\"18\"></use></svg></div>"
1
: 
"<div class=\"jss27 jss28\" style=\"width: 138px; height: 83px; margin: 5px; border-radius: 5px; background: initial; transition: width 0.5s ease 0s, height 0.5s ease 0s;\"><svg class=\"jss26\" width=\"30\" height=\"60\" viewBox=\"0 0 200 400\" style=\"transition: width 0.5s ease 0s, height 0.5s ease 0s;\"><use href=\"#oval\" fill=\"#800080\" mask=\"\"></use><use href=\"#oval\" stroke=\"#800080\" fill=\"none\" stroke-width=\"18\"></use></svg><svg class=\"jss26\" width=\"30\" height=\"60\" viewBox=\"0 0 200 400\" style=\"transition: width 0.5s ease 0s, height 0.5s ease 0s;\"><use href=\"#oval\" fill=\"#800080\" mask=\"\"></use><use href=\"#oval\" stroke=\"#800080\" fill=\"none\" stroke-width=\"18\"></use></svg></div>"
2
: 
"<div class=\"jss27 jss28\" style=\"width: 138px; height: 83px; margin: 5px; border-radius: 5px; background: initial; transition: width 0.5s ease 0s, height 0.5s ease 0s;\"><svg class=\"jss26\" width=\"30\" height=\"60\" viewBox=\"0 0 200 400\" style=\"transition: width 0.5s ease 0s, height 0.5s ease 0s;\"><use href=\"#oval\" fill=\"#800080\" mask=\"\"></use><use href=\"#oval\" stroke=\"#800080\" fill=\"none\" stroke-width=\"18\"></use></svg><svg class=\"jss26\" width=\"30\" height=\"60\" viewBox=\"0 0 200 400\" style=\"transition: width 0.5s ease 0s, height 0.5s ease 0s;\"><use href=\"#oval\" fill=\"#800080\" mask=\"\"></use><use href=\"#oval\" stroke=\"#800080\" fill=\"none\" stroke-width=\"18\"></use></svg><svg class=\"jss26\" width=\"30\" height=\"60\" viewBox=\"0 0 200 400\" style=\"transition: width 0.5s ease 0s, height 0.5s ease 0s;\"><use href=\"#oval\" fill=\"#800080\" mask=\"\"></use><use href=\"#oval\" stroke=\"#800080\" fill=\"none\" stroke-width=\"18\"></use></svg></div>"
3
: 
"<div class=\"jss27 jss28\" style=\"width: 138px; height: 83px; margin: 5px; border-radius: 5px; background: initial; transition: width 0.5s ease 0s, height 0.5s ease 0s;\"><svg class=\"jss26\" width=\"30\" height=\"60\" viewBox=\"0 0 200 400\" style=\"transition: width 0.5s ease 0s, height 0.5s ease 0s;\"><use href=\"#diamond\" fill=\"transparent\" mask=\"\"></use><use href=\"#diamond\" stroke=\"#800080\" fill=\"none\" stroke-width=\"18\"></use></svg></div>"
4
: 
"<div class=\"jss27 jss28\" style=\"width: 138px; height: 83px; margin: 5px; border-radius: 5px; background: initial; transition: width 0.5s ease 0s, height 0.5s ease 0s;\"><svg class=\"jss26\" width=\"30\" height=\"60\" viewBox=\"0 0 200 400\" style=\"transition: width 0.5s ease 0s, height 0.5s ease 0s;\"><use href=\"#diamond\" fill=\"#800080\" mask=\"url(#mask-stripe)\"></use><use href=\"#diamond\" stroke=\"#800080\" fill=\"none\" stroke-width=\"18\"></use></svg></div>"
5
: 
"<div class=\"jss27 jss28\" style=\"width: 138px; height: 83px; margin: 5px; border-radius: 5px; background: initial; transition: width 0.5s ease 0s, height 0.5s ease 0s;\"><svg class=\"jss26\" width=\"30\" height=\"60\" viewBox=\"0 0 200 400\" style=\"transition: width 0.5s ease 0s, height 0.5s ease 0s;\"><use href=\"#squiggle\" fill=\"#008002\" mask=\"\"></use><use href=\"#squiggle\" stroke=\"#008002\" fill=\"none\" stroke-width=\"18\"></use></svg></div>"
6
: 
"<div class=\"jss27 jss28\" style=\"width: 138px; height: 83px; margin: 5px; border-radius: 5px; background: initial; transition: width 0.5s ease 0s, height 0.5s ease 0s;\"><svg class=\"jss26\" width=\"30\" height=\"60\" viewBox=\"0 0 200 400\" style=\"transition: width 0.5s ease 0s, height 0.5s ease 0s;\"><use href=\"#squiggle\" fill=\"transparent\" mask=\"\"></use><use href=\"#squiggle\" stroke=\"#008002\" fill=\"none\" stroke-width=\"18\"></use></svg><svg class=\"jss26\" width=\"30\" height=\"60\" viewBox=\"0 0 200 400\" style=\"transition: width 0.5s ease 0s, height 0.5s ease 0s;\"><use href=\"#squiggle\" fill=\"transparent\" mask=\"\"></use><use href=\"#squiggle\" stroke=\"#008002\" fill=\"none\" stroke-width=\"18\"></use></svg></div>"
7
: 
"<div class=\"jss27 jss28\" style=\"width: 138px; height: 83px; margin: 5px; border-radius: 5px; background: initial; transition: width 0.5s ease 0s, height 0.5s ease 0s;\"><svg class=\"jss26\" width=\"30\" height=\"60\" viewBox=\"0 0 200 400\" style=\"transition: width 0.5s ease 0s, height 0.5s ease 0s;\"><use href=\"#diamond\" fill=\"transparent\" mask=\"\"></use><use href=\"#diamond\" stroke=\"#008002\" fill=\"none\" stroke-width=\"18\"></use></svg></div>"
8
: 
"<div class=\"jss27 jss28\" style=\"width: 138px; height: 83px; margin: 5px; border-radius: 5px; background: initial; transition: width 0.5s ease 0s, height 0.5s ease 0s;\"><svg class=\"jss26\" width=\"30\" height=\"60\" viewBox=\"0 0 200 400\" style=\"transition: width 0.5s ease 0s, height 0.5s ease 0s;\"><use href=\"#diamond\" fill=\"#008002\" mask=\"url(#mask-stripe)\"></use><use href=\"#diamond\" stroke=\"#008002\" fill=\"none\" stroke-width=\"18\"></use></svg><svg class=\"jss26\" width=\"30\" height=\"60\" viewBox=\"0 0 200 400\" style=\"transition: width 0.5s ease 0s, height 0.5s ease 0s;\"><use href=\"#diamond\" fill=\"#008002\" mask=\"url(#mask-stripe)\"></use><use href=\"#diamond\" stroke=\"#008002\" fill=\"none\" stroke-width=\"18\"></use></svg><svg class=\"jss26\" width=\"30\" height=\"60\" viewBox=\"0 0 200 400\" style=\"transition: width 0.5s ease 0s, height 0.5s ease 0s;\"><use href=\"#diamond\" fill=\"#008002\" mask=\"url(#mask-stripe)\"></use><use href=\"#diamond\" stroke=\"#008002\" fill=\"none\" stroke-width=\"18\"></use></svg></div>"
9
: 
"<div class=\"jss27 jss28\" style=\"width: 138px; height: 83px; margin: 5px; border-radius: 5px; background: initial; transition: width 0.5s ease 0s, height 0.5s ease 0s;\"><svg class=\"jss26\" width=\"30\" height=\"60\" viewBox=\"0 0 200 400\" style=\"transition: width 0.5s ease 0s, height 0.5s ease 0s;\"><use href=\"#squiggle\" fill=\"#ff0101\" mask=\"\"></use><use href=\"#squiggle\" stroke=\"#ff0101\" fill=\"none\" stroke-width=\"18\"></use></svg></div>"
10
: 
"<div class=\"jss27 jss28\" style=\"width: 138px; height: 83px; margin: 5px; border-radius: 5px; background: initial; transition: width 0.5s ease 0s, height 0.5s ease 0s;\"><svg class=\"jss26\" width=\"30\" height=\"60\" viewBox=\"0 0 200 400\" style=\"transition: width 0.5s ease 0s, height 0.5s ease 0s;\"><use href=\"#squiggle\" fill=\"#ff0101\" mask=\"\"></use><use href=\"#squiggle\" stroke=\"#ff0101\" fill=\"none\" stroke-width=\"18\"></use></svg><svg class=\"jss26\" width=\"30\" height=\"60\" viewBox=\"0 0 200 400\" style=\"transition: width 0.5s ease 0s, height 0.5s ease 0s;\"><use href=\"#squiggle\" fill=\"#ff0101\" mask=\"\"></use><use href=\"#squiggle\" stroke=\"#ff0101\" fill=\"none\" stroke-width=\"18\"></use></svg><svg class=\"jss26\" width=\"30\" height=\"60\" viewBox=\"0 0 200 400\" style=\"transition: width 0.5s ease 0s, height 0.5s ease 0s;\"><use href=\"#squiggle\" fill=\"#ff0101\" mask=\"\"></use><use href=\"#squiggle\" stroke=\"#ff0101\" fill=\"none\" stroke-width=\"18\"></use></svg></div>"
11
: 
"<div class=\"jss27 jss28\" style=\"width: 138px; height: 83px; margin: 5px; border-radius: 5px; background: initial; transition: width 0.5s ease 0s, height 0.5s ease 0s;\"><svg class=\"jss26\" width=\"30\" height=\"60\" viewBox=\"0 0 200 400\" style=\"transition: width 0.5s ease 0s, height 0.5s ease 0s;\"><use href=\"#oval\" fill=\"transparent\" mask=\"\"></use><use href=\"#oval\" stroke=\"#ff0101\" fill=\"none\" stroke-width=\"18\"></use></svg><svg class=\"jss26\" width=\"30\" height=\"60\" viewBox=\"0 0 200 400\" style=\"transition: width 0.5s ease 0s, height 0.5s ease 0s;\"><use href=\"#oval\" fill=\"transparent\" mask=\"\"></use><use href=\"#oval\" stroke=\"#ff0101\" fill=\"none\" stroke-width=\"18\"></use></svg></div>"
length
: 
12
*/