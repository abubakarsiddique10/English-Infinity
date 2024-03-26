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
    const categoryCard = document.createElement('div');
    categoryCard.classList.add(
        "category-card", "flex", "items-center", "gap-1.5", "shadow-3xl",
        "px-1", "pr-1.5", "sm:pr-1",)

    categoryCard.innerHTML = `
    <figure class="w-12 h-12 flex items-center justify-center rounded">
        <img src="${category.img}"/>
    </figure>
    <h3 class="font-semibold leading-6 text-xl font-['Hind_Siliguri'] text-[#363637] capitalize select-none">
    ${category.name}
    </h3>
    `
    return categoryCard;
}



/* window.addEventListener('load', () => {
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach((categoryCard) => {
        categoryCard.addEventListener('click', (e) => {
            categoryCard.style.background = "yellow"

            const categoryName = categoryCard.innerText.toLowerCase();
            window.location.href = "vocabulary.html?category=" + categoryName
        });
    });
}) */
window.addEventListener('load', () => {
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach((categoryCard) => {
        categoryCard.addEventListener('click', handleClick);
        categoryCard.addEventListener('touchstart', handleTouchStart);
        categoryCard.addEventListener('touchend', handleTouchEnd);
    });

    function handleClick(event) {
        event.preventDefault();
        const categoryName = getCategoryName(event);
        navigateToCategory(categoryName);
    }

    let touchStartX = null;
    let touchStartY = null;

    function handleTouchStart(event) {
        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
    }

    function handleTouchEnd(event) {
        if (touchStartX === null || touchStartY === null) {
            return;
        }
        const touchEndX = event.changedTouches[0].clientX;
        const touchEndY = event.changedTouches[0].clientY;
        const deltaX = Math.abs(touchEndX - touchStartX);
        const deltaY = Math.abs(touchEndY - touchStartY);
        if (deltaX < 10 && deltaY < 10) {
            event.preventDefault();
            const categoryName = getCategoryName(event);
            navigateToCategory(categoryName);
        }
        touchStartX = null;
        touchStartY = null;
    }

    function getCategoryName(event) {
        return event.target.innerText.toLowerCase();
    }

    function navigateToCategory(categoryName) {
        window.location.href = "vocabulary.html?category=" + categoryName;
    }
});





/* categoryCard.href = "vocabulary.html?category=" + categoryName */
