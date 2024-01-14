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

        // Assuming all shapes in a card are the same, take the first SVG to determine the shape and color
        let shapeType = '';
        let color = '';
        let fillType = '';

        if (svgs.length > 0) {
            const useElement = svgs[0].querySelector('use');
            shapeType = useElement.getAttribute('href').replace('#', ''); // Get shape type (oval, squiggle, diamond)
            color = useElement.getAttribute('stroke'); // Get color from stroke attribute
            fillType = useElement.getAttribute('mask') ? 'striped' : 'solid'; // Determine fill type
        }

        return {
            shapeCount,
            shapeType,
            color,
            fillType
        };
    });
}

// Example usage
const cardDetails = analyzeCards(extractVisibleCards());
console.log(cardDetails);


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