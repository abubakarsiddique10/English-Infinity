
const queryParams = new URLSearchParams(window.location.search);
const category = queryParams.get('category');
import { fetchData } from "./common.js";
import { setLoading } from "./main.js";

/* const getCategoryInHTML = document.querySelector('.categories');
getCategoryInHTML.innerHTML = category */

let allData = null;
// Load vocabularies for a given category
/* async function getVocabulary() {
    loading(true);
    const url = `././assets/data/vocabulary/vocabulary.json`;
    try {
        const vocabularies = await fetchData(url);
        const allVocabularies = vocabularies[1].map(category => category.vocabularies).flat();
        displayTag(vocabularies[0])
        displayVocabularies(allVocabularies);
        allData = allVocabularies
        loading(false);
    } catch (error) {
        console.error(error)
    }
}
getVocabulary(); */

async function getVocabulary() {
    setLoading(true);
    const url = `././assets/data/vocabulary/vocabulary.json`;
    try {
        const vocabularies = await fetchData(url);
        const { categories, vocabulary_data } = vocabularies
        const allVocabularies = vocabulary_data.map(category => category.vocabularies).flat();
        displayTag(categories)
        displayVocabularies(allVocabularies);
        allData = allVocabularies
        setLoading(false);
    } catch (error) {
        console.error(error)
    }
}
getVocabulary();


// Display vocabularies in the UI
const displayVocabularies = (vocabularies) => {
    const vocabularyContainer = document.getElementById('vocabulary');
    vocabularyContainer.innerHTML = "";
    vocabularies.forEach(vocabulary => {
        const vocabularyCardElement = createVocabulariesCard(vocabulary);
        vocabularyContainer.appendChild(vocabularyCardElement)
    });
    pronounce()
}
{/* <img id="svg" class="w-12" src="./assets/images/vocabulary/${category}/${image}.svg" alt="${image}"></img> */ }


// Create a vocabulary card element: card-
const createVocabulariesCard = ({ word, image, sentence }) => {
    const vocabularyCard = document.createElement('div');
    vocabularyCard.className = 'min-h-[160px] h-full flex rounded-md border border-[#F0F1F3]';
    vocabularyCard.title = `Click for details about ${word}`;
    vocabularyCard.innerHTML = `
        <button class="px-3 pt-8 pb-4 flex flex-col items-center w-full ">
            <img id="svg" class="w-12" src="./assets/images/vocabulary/${image}.svg" alt="${image}">
            <div class="flex items-center mt-5 gap-1">
                <span class="text-lg font-medium leading-6 capitalize text-center">${word}</span>
                <img class="w-5 pronounce" src="./assets/images/icons/volume_up.svg" title="Click for pronounced" alt="pronounce">
            </div>
            <span class="mt-1 text-sm first-letter:capitalize">${sentence}</span>
        </button>
    `;
    return vocabularyCard
}



// display tags
const displayTag = (contents) => {
    const tags = document.getElementById('tags');
    tags.className = `bg-white pt-6 lg:pt-8 !pb-4 flex overflow-auto w-full space-x-3`
    contents.forEach((content, index) => {
        const button = document.createElement('button');
        button.className = `filter-button font-inter text-left py-1 px-3 pr-3 rounded-md capitalize border flex items-center space-x-1.5 block ${index == 0 ? "active" : ""}`
        button.innerHTML = `
            <img class="max-w-4" src="./assets/images/tags/${content}.png" alt="">
            <span class="capitalize text-sm">${content}</span>
        `;
        tags.appendChild(button);
    })
}

// Handle tag filtering
function handleTagClick(event) {
    const button = event.target.closest('.filter-button');
    if (button) {
        const allButtons = document.querySelectorAll('.filter-button');
        allButtons.forEach((button) => button.classList.remove('active'));
        button.classList.add('active');

        const buttonText = button.innerText.toLowerCase();
        const filterData = buttonText === "all" ? allData : allData.filter((data) => data.tags === buttonText);
        displayVocabularies(filterData)
    }
}

// Add event listener for tag clicks
const tags = document.getElementById('tags');
tags.addEventListener('click', handleTagClick);





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

function pronounce() {
    const vocabulary = document.getElementById('vocabulary');
    vocabulary.addEventListener('click', (e) => {
        console.log(e.target)
        const isTrue = e.target.classList.contains('pronounce');
        if (isTrue) {
            utterance.text = e.target.previousElementSibling.innerText;
            speechSynthesis.speak(utterance);
        }
    })
}


