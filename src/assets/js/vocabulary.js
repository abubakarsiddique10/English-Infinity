
const queryParams = new URLSearchParams(window.location.search);
const category = queryParams.get('category');
import { fetchData } from "./common.js";


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

const vocabularyContainer = document.getElementById('vocabulary');
const displayVocabularies = (vocabularies) => {
    vocabularies.forEach(vocabulary => {
        const card = createVocabulariesCard(vocabulary);
        vocabularyContainer.append(card)
    });
}


const createVocabulariesCard = (vocabulary) => {
    const vocabularyCard = document.createElement('div');
    vocabularyCard.classList.add('border', 'p-6', 'rounded-xl');
    vocabularyCard.innerHTML = `
        <div class="w-16 h-16 rounded-full mb-2 mx-auto">
            <img class="w-full" src="${vocabulary.image}" alt="">
        </div>
        <div>
            <h5 class="text-lg font-normal leading-6 capitalize text-center">${vocabulary.word}
            </h5>
            <span class="block text-center text-[15px] mt-0.5 font-['Hind_Siliguri'] font-medium text-[#334155]">${vocabulary.meaning}</span>
        </div>
        <button class="border border-green-600 w-full capitalize rounded-full mt-3 inline-block py-1">See More
        </button>
    `
    return vocabularyCard
}
