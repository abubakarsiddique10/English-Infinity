import { fetchData } from "./common.js";

const categoriesContainer = document.getElementById('categories');
// Function to fetch and display vocabulary categories
async function fetchCategories() {
    const url = `././assets/data/categories.json`;
    try {
        const response = await fetchData(url);
        console.log(response)
        displayCategories(response)
    } catch (error) {
        console.log(error)
    }
}
fetchCategories();

// Function to display categories
function displayCategories(catagories) {
    catagories.forEach(category => {
        const categoryCard = createCategoryCard(category);
        categoriesContainer.append(categoryCard)
    });

}

// Function to create a category card element
function createCategoryCard(category) {
    const categoryCard = document.createElement('div');
    categoryCard.classList = 'category-card flex items-center gap-1.5 shadow-3xl px-1 pr-1.5 sm:pr-1 cursor-pointer'

    categoryCard.innerHTML = `
    <figure class="w-12 h-12 flex items-center justify-center rounded">
        <img src="${category.img}"/>
    </figure>
    <h3 class="font-semibold leading-6 text-xl font-['Hind_Siliguri'] text-[#363637] capitalize">
    ${category.name}
    </h3>
    `
    return categoryCard;
}

window.addEventListener('load', () => {
    // Use event delegation on a parent element that exists when the page loads
    const categories = document.getElementById('categories');
    categories.addEventListener('click', function (event) {
        const categoryCard = event.target.closest('.category-card');
        if (categoryCard) {
            const categoryName = categoryCard.innerText.toLowerCase();
            window.location.href = "vocabulary.html?category=" + categoryName;
        }
    });
});
