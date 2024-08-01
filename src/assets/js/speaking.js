import { fetchData } from "./common.js";
import { loading } from "./index.js";

const categoriesContainer = document.getElementById('categories');
// Function to fetch and display vocabulary categories
async function fetchCategories() {
    loading(true);
    const url = `././assets/data/categories/speak-categories.json`;
    try {
        const response = await fetchData(url);
        displayCategories(response);
        loading(false);
    } catch (error) {
        console.log(error)
    }
}


// Function to display categories
function displayCategories(catagories) {
    catagories.forEach(category => {
        const categoryCard = createCategoryCard(category);
        categoriesContainer.append(categoryCard)
    });
    setupCategoryClickListener()
}

// Function to create a category card element
function createCategoryCard({ name, img }) {
    const categoryCard = document.createElement('div');
    categoryCard.classList = 'category-card flex items-center gap-4 shadow-3xl p-4 py-3.5 cursor-pointer select-none rounded';
    categoryCard.setAttribute("data-type", `${name}`)
    categoryCard.innerHTML = `
    <figure class="w-7 flex items-center justify-center rounded">
        <img class="w-full" src="./assets/images/icons/${img}.svg" />
    </figure>
    <h3 class="font-semibold leading-6 text-xl font-['Hind_Siliguri'] text-[#2a2a52] capitalize">
    ${name}
    </h3>
    `
    return categoryCard;
}


const setupCategoryClickListener = () => {
    // Use event delegation on a parent element that exists when the page loads
    const categories = document.getElementById('categories');
    categories.addEventListener('click', function (event) {
        const categoryCard = event.target.closest('.category-card');
        if (categoryCard) {
            const category = categoryCard.dataset.type;
            window.location.href = "details.html?category=" + category;
        }
    });
}

document.addEventListener('DOMContentLoaded', fetchCategories)

