const queryParams = new URLSearchParams(window.location.search);
const speechSynthesis = window.speechSynthesis;
const utterance = new SpeechSynthesisUtterance();

const category = queryParams.get('category');
import { fetchData } from "./common.js";
import { loading } from "./index.js";

let allData = null

// Fetch presentation data and initialize the display
async function getPresentation() {
    loading(true)
    const url = `././assets/data/speaking/${category}.json`;
    try {
        const response = await fetchData(url);
        if(category === "conversation") {
            displayConversation(response[1]);
            allData = response[1];
            dispayTag(response[0]);
            loading(false)
        } else if(category === "presentation") {
            displayPresentation(response[1]);
            allData = response[1];
            dispayTag(response[0]);
            loading(false)
        }
    } catch (error) {
        console.error(error)
    }
}




/* presentations template start */

// Display presentations in the UI
const displayPresentation = (presentation) => {
    const contentWrapper = document.getElementById('content_wrapper');
    contentWrapper.className = "mt-12 lg:mt-20 lg:flex flex-row-reverse justify-evenly gap-10 w-full max-w-[728px] lg:max-w-full mx-auto";
    const detailsContainer = document.getElementById('details');
    detailsContainer.innerHTML = "";
    const innerContainer = document.createElement('div');
    innerContainer.className = "w-full max-w-[728px] mx-auto lg:mx-left mt-8 lg:mt-0"
    /* detailsContainer.innerHTML = ""; */
    presentation.forEach(item => {
        const presentationCardElement = createPresentationCard(item);
        innerContainer.appendChild(presentationCardElement)
    });
    detailsContainer.appendChild(innerContainer)
}

// Create a presentation card element
const createPresentationCard = ({ title, content, id}) => {
    const truncatedContent = content.length > 300 ? content.slice(0, 300) : content;
    const presentationCard = document.createElement('article');
    presentationCard.className = "py-6 border-b w-full";
    presentationCard.innerHTML = `
        <div class="flex items-center justify-between pb-2 ">
            <h2 class="text-xl font-extrabold capitalize">${title}</h2>
            <div>
                <button id="speak" data-id='${id}'>
                    <img class="w-5" src="./assets/images/icons/play-circle.svg" alt="">
                </button>
            </div>
        </div>
        <div>
           <p class="text-[#242424] text-justify">
           <img class="size-[90px] float-right ml-4" src="./assets/images/quiz.jpg" alt="">
            <span>${truncatedContent}</span>
            <span class="hidden">${content}</span>
            <button class="presentationBtn text-[#108a00]">...Read more</button>  
            </p>
        </div>
    `;
    return presentationCard
}

// Add event listeners for "Read more/less" buttons using event delegation
const addReadMoreEventListeners = () => {
    const presentationContainer = document.getElementById('details');
    presentationContainer.addEventListener('click', (event) => {
        
        if (event.target.classList.contains('presentationBtn')) {
            const button = event.target;
            const previewContent = button.previousElementSibling;
            const hiddenContent = button.previousElementSibling.previousElementSibling;
           
            const isContentHidden = previewContent.classList.contains('hidden');
            button.innerHTML = isContentHidden ? "Read less" : "...Read more";
            previewContent.classList.toggle('hidden');
            hiddenContent.classList.toggle('hidden');
        }
    })
}
addReadMoreEventListeners()
/* presentations template end */





/* conversation template start */
// Display conversation in the UI
const displayConversation = (conversation) => {
    const contentWrapper = document.getElementById('content_wrapper');
    contentWrapper.className = "mt-12 lg:mt-24 lg:flex flex-row-reverse justify-evenly gap-10 w-full max-w-[728px] lg:max-w-full mx-auto";
    const detailsContainer = document.getElementById('details');
    detailsContainer.innerHTML = "";
    const innerContainer = document.createElement('div');
    innerContainer.className = "lg:mx-left space-y-8 mt-8 lg:mt-0"
    conversation.forEach(({title, img, contents}) => {
        const categoryCard = document.createElement('div');
        // create head
        const headingTwo = document.createElement('h2');
        headingTwo.className = 'text-2xl font-semibold mb-2 first-letter:uppercase';
        headingTwo.innerText = title;
        categoryCard.appendChild(headingTwo);
        // create image
        /* const image = document.createElement('img');
        image.className = 'mb-5 w-[400px]';
        image.src = img;
        categoryCard.appendChild(image); */

        // create dialouge dive
        const presentationCard = document.createElement('div');
        presentationCard.classList = "space-y-1"
        categoryCard.appendChild(presentationCard)
        contents.forEach((content) => {
            const createNiyatCard = createConversationCard(content);
            presentationCard.appendChild(createNiyatCard);
         })
         innerContainer.appendChild(categoryCard)
    });
    detailsContainer.appendChild(innerContainer)
}

// Create a presentation card element
const createConversationCard = ({name, text}) => {
    const presentationCard = document.createElement('p');
    presentationCard.className = "flex gap-6"
    presentationCard.innerHTML = `
        <strong class="min-w-fit">${name} :</strong>
        <span>${text}</span>
    `;
    return presentationCard
}


const dispayTag = (contents, ) => {
    const tags = document.getElementById('tags');
    tags.className = "bg-white sticky top-14 pt-6 lg:top-24 flex lg:mx-0 lg:block overflow-auto lg:pt-0 w-full lg:max-w-[368px] lg:border-l lg:h-full lg:pl-10 lg:min-h-10"
    contents.forEach((content, index) => {
        const button = document.createElement('button');
        button.className = `filter-button lg:w-full text-left py-2 px-4 rounded-md capitalize ${index == 0 ? "active" : "" }`
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
        const filterData = buttonText === "all" ? allData : allData.filter((data) => data.tag === buttonText);
        
        if(category === "conversation") {
            displayConversation(filterData);
        } else if(category === "presentation") {
            displayPresentation(filterData);
        }
    }
}

// Add event listener for tag clicks
const tags = document.getElementById('tags');
tags.addEventListener('click', handleTagClick);




function speak () {
    const presentationContainer = document.getElementById('details');
    presentationContainer.addEventListener('click', (event) => {
        const speakButton = event.target.closest('#speak');
        const dataId = speakButton.dataset.id;
        if(speakButton) {
            const findTextContent = allData.find(({id}) => id == dataId);
            utterance.text = findTextContent.content;
            speechSynthesis.speak(utterance);
        }
    })
}
speak()
/* conversation template end */

// Initialize the application
document.addEventListener('DOMContentLoaded', getPresentation)







/* // Wait for the voices to be loaded
speechSynthesis.onvoiceschanged = () => {
    // Check if voices are available
    const voices = speechSynthesis.getVoices();
    if (voices.length > 0) {
        // Select a voice (for example, the first one)
        utterance.voice = voices[0];

        // change the voice rate
        utterance.rate = 1;
    } else {
        console.error("No voices available.");
    }
};


speechSynthesis.speak(utterance);



button.addEventListener('click', () => {
    speechSynthesis.speak(utterance);

});
 */


