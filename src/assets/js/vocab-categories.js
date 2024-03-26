import { fetchData } from "./common.js";

const categoriesContainer = document.getElementById('categories');
// Function to fetch and display vocabulary categories
async function fetchCategories() {
    const url = `././assets/data/categories.json`;
    try {
        const response = await fetchData(url);
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
    // Part 1
    const categoryCard = document.createElement('a');
    categoryCard.classList.add(
        "category-card", "block", "flex", "items-center", "gap-1.5", "shadow-3xl", "cursor-pointer",
        "px-1", "pr-1.5", "sm:pr-1",)

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
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach((categoryCard) => {
        categoryCard.addEventListener('click', () => {
            const categoryName = categoryCard.innerText.toLowerCase();
            categoryCard.href = "vocabulary.html?category=" + categoryName
        });
    });
})

