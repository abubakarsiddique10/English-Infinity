
const queryParams = new URLSearchParams(window.location.search);
const category = queryParams.get('category');
import { fetchData } from "./common.js";


// Load vocabularies for a given category
async function getVocabulary() {
    const url = `././assets/data/${category}.json`;
    try {
        const vocabularies = await fetchData(url);
        displayVocabularies(vocabularies)
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

// Create a vocabulary card element: card-one
/* const createVocabulariesCard = (vocabulary) => {
    const vocabularyCard = document.createElement('div');
    vocabularyCard.classList.add('border', 'p-6', 'rounded-xl');

    vocabularyCard.innerHTML = `
        <div class="w-16 h-16 rounded-full mb-2 mx-auto">
            <img class="w-full" src="./assets/images/vocabulary/vegetables/${vocabulary.image}.svg" alt="">
        </div>
        <div>
            <h5 class="text-lg font-normal leading-6 capitalize text-center">${vocabulary.word}</h5>
            <span class="block text-center text-[15px] mt-0.5 font-['Hind_Siliguri'] font-medium text-[#334155]">${vocabulary.meaning}</span>
        </div>
        <button class="border border-green-600 w-full capitalize rounded-full mt-3 inline-block py-1">See More</button>
    `;
    return vocabularyCard
} */

// Create a vocabulary card element: card-
const createVocabulariesCard = (vocabulary) => {
    const vocabularyCard = document.createElement('div');
    vocabularyCard.innerHTML = `
        <article class="min-h-[160px] flex  rounded-md border border-[#F0F1F3]" title="Click for details about ${vocabulary.word}">
            <button class="px-3 pt-8 pb-4 flex flex-col items-center w-full ">
                <img class="w-9 block" src="./assets/images/vocabulary/vegetables/${vocabulary.image}.svg"alt="${vocabulary.word}">
                <span class="mt-5 text-lg font-normal leading-6 capitalize text-center">
                    ${vocabulary.word}
                </span>
                <span class="mt-1 text-sm first-letter:capitalize">carrot is a healtht food</span>
            </button>
        </article>
    `;
    return vocabularyCard
}






/* const seeMoreButton = vocabularyCard.querySelector('button');
seeMoreButton.addEventListener('click', () => {
    // Handle "See More" button click
    // Example: Redirect to a details page
    // window.location.href = `details.html?id=${vocabulary.id}`;
}); */