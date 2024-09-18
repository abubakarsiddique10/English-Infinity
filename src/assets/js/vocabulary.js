
const queryParams = new URLSearchParams(window.location.search);
const category = queryParams.get('category');
import { fetchData } from "./common.js";
import { loading } from "./main.js";

const getCategoryInHTML = document.querySelector('.categories');
getCategoryInHTML.innerHTML = category

// Load vocabularies for a given category
async function getVocabulary() {
    loading(true);
    const url = `././assets/data/vocabulary/${category}.json`;
    try {
        const vocabularies = await fetchData(url);
        displayVocabularies(vocabularies);
        loading(false);
    } catch (error) {
        console.error(error)
    }
}
getVocabulary();


// Display vocabularies in the UI
const displayVocabularies = (vocabularies) => {
    const vocabularyContainer = document.getElementById('vocabulary');
    vocabularies.forEach(vocabulary => {
        const vocabularyCardElement = createVocabulariesCard(vocabulary);
        vocabularyContainer.appendChild(vocabularyCardElement)
    });
    pronounce()
}
{/* <img id="svg" class="w-12" src="./assets/images/vocabulary/${category}/${image}.svg" alt="${image}"></img> */}


// Create a vocabulary card element: card-
const createVocabulariesCard = ({ word, image, sentence }) => {
    const vocabularyCard = document.createElement('div');
    vocabularyCard.className = 'min-h-[160px] h-full flex rounded-md border border-[#F0F1F3]';
    vocabularyCard.title = `Click for details about ${word}`;
    vocabularyCard.innerHTML = `
        <button class="px-3 pt-8 pb-4 flex flex-col items-center w-full ">
            <img id="svg" class="w-12" src="./assets/images/vocabulary/${category}/${image}.svg" alt="${image}">
            <div class="flex items-center mt-5 gap-1">
                <span class="text-lg font-medium leading-6 capitalize text-center">${word}</span>
                <img class="w-5 pronounce" src="./assets/images/icons/volume_up.svg" title="Click for pronounced" alt="pronounce">
            </div>
            <span class="mt-1 text-sm first-letter:capitalize">${sentence}</span>
        </button>
    `;
    return vocabularyCard
}

const speechSynthesis = window.speechSynthesis;
const utterance = new SpeechSynthesisUtterance;
utterance.rate = 0.7


// Wait for the voices to be loaded
/* speechSynthesis.onvoiceschanged = () => {
    // Check if voices are available
    const voices = speechSynthesis.getVoices();
    if (voices.length > 0) {
        // Select a voice (for example, the first one)
        utterance.voice = voices[0];

        // change the voice rate
        // utterance.rate = 0.7;
    } else {
        console.error("No voices available.");
    }
}; */

function pronounce () {
    const vocabulary = document.getElementById('vocabulary');
    vocabulary.addEventListener('click', (e) => {
        const isTrue = e.target.classList.contains('pronounce');
        if(isTrue) {
            utterance.text = e.target.previousElementSibling.innerText;
            speechSynthesis.speak(utterance);
        }
    })
}