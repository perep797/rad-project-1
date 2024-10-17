const style = document.createElement("style"); //I wanted to use a separate CSS file but there were issues with the styles actually loading on the page (probably my fault), so here we are
style.textContent = 
`   .rainbow_text {
    -webkit-animation: rainbow 4s linear infinite alternate;
    }
    @keyframes rainbow {
        0% { color: #ff0000; }
        12.5% { color: #FF7F00; }
        25% { color: #FFFF00; }
        37.5% { color: #00FF00; }
        50% { color: #058b30; }
        62.5% { color: #00bbff; }
        75% { color: #0008ff; }
        87.5% { color: #5f00dc; }
        100% { color: #ff049a; }
    }
    .rainbow-link {
        font-weight: bold;
        font-size: inherit;
    }
    .rainbow-link:hover {
        text-decoration: underline; 
  }`; 
document.head.appendChild(style); //this inserts the template literal above into the webpage's HTML code (specifically, in the head section where css can be applied internally)

function findtextNodes() {

    const alltextNodes = document.body.querySelectorAll("p, span, h1, h2, h3, h4, h5, li"); //Using a treewalker for this extension caused a lot of issues, I kept getting errors like "cannot change nodes/DOM after script has already started" or something along those lines, so I'm using querySelectorAll instead bc it also selects the child nodes of whatever is inputted by default and doesn't have to search down the tree over and over (which is what I am guessing caused that issue?).

    alltextNodes.forEach((textNode) => {
    
        textNode.childNodes.forEach((childNode) => {
            if (childNode.nodeType === Node.TEXT_NODE) //Tbh I found this solution on stackOverflow, it just makes sure that the node between any tags selected is text and not another html tag or smth else
            {
                replaceText(childNode);
                // console.log("Node replaced!");
            } //else {
                //console.error("Uhh I have no idea what happened, no text in node?");
            //} //removed the above because it caused a LOT of buffering
        });
    });
}

function replaceText(childNode) { //It took me forever to wrap my head around how parameters work... The childNode's value is passed from the above function (as a parameter) to this function, so that replaceText knows what specific node to replace! I probably could've merged all this into one big function, but that would've been confusing for me

    let plainText = childNode.textContent; //.textContext gets the actual text content from a node, not just the node itself, so plainText should be a string

    slang_list.forEach((slangWord) => { //function that checks each word in slanglist.js, which is globally accessible because it's loaded before this script, and replaces it with a template literal

        const regexThingy = new RegExp(`\\b(${slangWord})\\b`, "gi"); //Regex object for any word in the list

        plainText = plainText.replace(regexThingy, (`<a href="https://www.merriam-webster.com/dictionary/${slangWord}" target="_blank" class="rainbow-link rainbow_text">${slangWord}</a>`)); //This replaces any matching word in the webpages's text with a link (& css styling from above) to that word's definition, however it's still a string and not an actual HTML tag yet (note to self: I'm pretty sure .replace only works on strings)
        
         //I also wanted to have the extension redirect to a google search of the word if there was no Merriam-Webster definition (I used fetch and promises for this originally), but was having trouble actually implementing it because any word on the end of the link above is a valid link, even if there's no definition for it. I tried writing a function that checks the HTML of the page for something like "Word Not Found", but there was something weird about how the page was loading and it just didn't work :(
        });

    const newNode = document.createElement("span"); //Creating a span element to hold the link &styling
    newNode.innerHTML = plainText; //here plainText is inserted into the webpage's HTML inbetween newNode's HTML tags because it allows for different css styling within the same line, so the template literal in plainText is actually read as HTML
    childNode.replaceWith(newNode); //This replaces childNode with the new node which holds the rainbow link!
    // console.log('Link successfully created!:', plainText);
}

window.addEventListener("load", findtextNodes) //Makes sure to start checking any given page's nodes only after it's done loading, otherwise chrome gets mad


//Old notes:
//Need function for injecting a link into the actual html of the website, so the word is replaces by a rainbow colored hyperlinked version of itself, and not just a plain link, issues with 'replacing undefined terms'
//need a function that selects all textnodes within an html page, and for every text node it finds, it replaces it with a link to that word's defintion
//should add function for in case the webpage changes (check contents of node against itself?)
//need a function that checks all the text nodes within an html page against the word list, if it's on the word list, it needs to have the <style> applied to it, and be replaced with a link that's data (in the form of a template literal) from the background.js script (perhaps it sends a request when a word is found)