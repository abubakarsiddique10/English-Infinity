
const queryParams = new URLSearchParams(window.location.search);
const category = queryParams.get('category');
import { fetchData } from "./common.js";
import { loading } from "./index.js";

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
}



// Create a vocabulary card element: card-
const createVocabulariesCard = ({ word, image, sentence }) => {
    const vocabularyCard = document.createElement('div');
    vocabularyCard.innerHTML = `
        <article class="min-h-[160px] h-full flex  rounded-md border border-[#F0F1F3]" title="Click for details about ${word}">
            <button class="px-3 pt-8 pb-4 flex flex-col items-center w-full ">
              <img id="svg" class="w-12" src="./assets/images/vocabulary/${category}/${image}.svg" alt="${image}">
                <span class="mt-5 text-lg font-medium leading-6 capitalize text-center">
                    ${word}
                </span>
                <span class="mt-1 text-sm first-letter:capitalize">${sentence}</span>
            </button>
        </article>
    `;
    return vocabularyCard
}
