const categoriesContainer = document.getElementById('categories');
// Function to fetch and display vocabulary categories
async function fetchCategories() {
    try {
        const response = await fetch('./assets/data/categories.json');
        if (!response.ok) {
            throw new Error('Failed to fetch data')
        }
        const catagories = await response.json();
        displayCategories(catagories)
    } catch (error) {
        console.error('Error fetching data', error)
    }
}

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
    categoryCard.classList.add(
        "flex", "items-center", "gap-1.5", "shadow-3xl", "cursor-pointer",
        "px-1", "pr-1.5", "sm:pr-1"
    );

    const cardImg = document.createElement('figure');
    cardImg.classList.add("w-12", "h-12", "flex", "items-center", "justify-center", "rounded");

    const image = document.createElement('img');
    image.src = category.img;

    const cardTitle = document.createElement('h3');
    cardTitle.classList.add(
        "font-semibold", "leading-6", "text-xl", "font-['Hind_Siliguri']",
        "text-[#363637]", "capitalize"
    );
    cardTitle.innerText = category.name;

    categoryCard.append(cardImg, cardTitle);
    cardImg.appendChild(image);

    return categoryCard;
}
fetchCategories();

