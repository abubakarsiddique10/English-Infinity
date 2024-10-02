import { fetchData } from "./common.js";
import { loading } from "./main.js";


let allData = null;
// Load vocabularies for a given category
async function getVocabulary() {
    loading(true);
    const url = `././assets/data/verb/verb.json`;
    try {
        const response = await fetchData(url);
        displayVerbs(response[1]);
        allData = response[1];
        displayTag(response[0]);
        loading(false)
    } catch (error) {
        console.error(error)
    }
}
getVocabulary();


// Display vocabularies in the UI
const displayVerbs = (verbs) => {
    const verbsContainer = document.getElementById('verb');
    verbsContainer.innerHTML = "";
    verbs.forEach(verb => {
        const verbCardElement = createVocabulariesCard(verb);
        verbsContainer.appendChild(verbCardElement)
    });
    pronounce()
}

// Create a vocabulary card element: card-
const createVocabulariesCard = ({ word, image, sentence }) => {
    const verbCard = document.createElement('article');
    verbCard.className = 'min-h-[160px] h-full flex';
    verbCard.title = `Click for details about ${word}`;
    verbCard.innerHTML = `
        <a href="#" class="px-3 pt-8 pb-4 flex flex-col items-center w-full" aria-label="Details about camel">
            <img id="svg" class="w-[100px]" src="./assets/images/verb/${image}.png" alt="${image}">
            <div class="flex items-center mt-5 gap-1">
                <span class="text-lg font-medium leading-6 capitalize text-center">${word}</span>
                <img class="w-5 pronounce" src="./assets/images/icons/volume_up.svg" title="Click for pronounced" alt="pronounce">
            </div>
            <span class="mt-1 text-sm text-center first-letter:capitalize">${sentence}</span>
        </a>
    `;
    return verbCard
}


// display tags
const displayTag = (contents,) => {
    const tags = document.getElementById('tags');
    tags.className = `bg-white pt-6 lg:pt-8 !pb-4 flex overflow-auto w-full`
    contents.forEach((content, index) => {
        const button = document.createElement('button');
        button.className = `filter-button font-inter text-left py-1 px-3 rounded-md capitalize text-sm  lg:text-base ${index == 0 ? "active" : ""}`
        button.innerText = content;
        tags.appendChild(button);
    })
}

// Handle tag filtering
function handleTagClick(event) {
    if (event.target.matches('button')) {
        const allButtons = document.querySelectorAll('.filter-button');
        allButtons.forEach((button) => button.classList.remove('active'));
        event.target.classList.add('active');

        const buttonText = event.target.innerText.toLowerCase();
        const filterData = buttonText === "all" ? allData : allData.filter((data) => data.tags === buttonText);

        displayVerbs(filterData)


        /* if (category === "conversation") {
            displayConversation(filterData);
        } else if (category === "presentation") {
            displayPresentation(filterData);
        } else if (category === "dailyusesentences") {
            displayDailyUseSentences(filterData)
        } */
    }
}

// Add event listener for tag clicks
const tags = document.getElementById('tags');
tags.addEventListener('click', handleTagClick);


const speechSynthesis = window.speechSynthesis;
const utterance = new SpeechSynthesisUtterance;
utterance.rate = 0.7

function pronounce() {
    const verb = document.getElementById('verb');
    verb.addEventListener('click', (e) => {
        const isTrue = e.target.classList.contains('pronounce');
        if (isTrue) {
            utterance.text = e.target.previousElementSibling.innerText;
            speechSynthesis.speak(utterance);
        }
    })
}