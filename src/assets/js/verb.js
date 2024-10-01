import { fetchData } from "./common.js";
import { loading } from "./main.js";


// Load vocabularies for a given category
async function getVocabulary() {
    loading(true);
    const url = `././assets/data/verb/verb.json`;
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

// Create a vocabulary card element: card-
const createVocabulariesCard = ({ word, image, sentence }) => {
    const vocabularyCard = document.createElement('article');
    vocabularyCard.className = 'min-h-[160px] h-full flex rounded-md border border-[#F0F1F3]';
    vocabularyCard.title = `Click for details about ${word}`;
    vocabularyCard.innerHTML = `
        <a href="#" class="px-3 pt-8 pb-4 flex flex-col items-center w-full" aria-label="Details about camel">
            <img id="svg" class="w-[100px]" src="./assets/images/verb/${image}.png" alt="${image}">
            <div class="flex items-center mt-5 gap-1">
                <span class="text-lg font-medium leading-6 capitalize text-center">${word}</span>
                <img class="w-5 pronounce" src="./assets/images/icons/volume_up.svg" title="Click for pronounced" alt="pronounce">
            </div>
            <span class="mt-1 text-sm text-center first-letter:capitalize">${sentence}</span>
        </a>
    `;
    return vocabularyCard
}


function pronounce() {
    const vocabulary = document.getElementById('vocabulary');
    vocabulary.addEventListener('click', (e) => {
        const isTrue = e.target.classList.contains('pronounce');
        if (isTrue) {
            utterance.text = e.target.previousElementSibling.innerText;
            speechSynthesis.speak(utterance);
        }
    })
}