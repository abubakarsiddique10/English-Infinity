// Data fetch example: 1
async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch data.`);
    }
    return response.json()
}
export { fetchData }


