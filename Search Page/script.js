// Blog data
const blogs = [
    { id: 1, title: "Technology Advancements", category: "technology", content: "Latest trends in AI and blockchain." },
    { id: 2, title: "Healthy Lifestyle", category: "lifestyle", content: "Tips for a healthier you." },
    { id: 3, title: "Business Insights", category: "business", content: "How to succeed in entrepreneurship." },
    { id: 4, title: "AI in Healthcare", category: "technology", content: "AI transforming the medical field." },
    { id: 5, title: "Minimalist Living", category: "lifestyle", content: "How to declutter your life." },
    { id: 6, title: "Future of Quantum Computing", category: "technology", content: "Quantum computing explained and its potential impact." },
    { id: 7, title: "10 Steps to a Successful Startup", category: "business", content: "Strategies to turn your idea into reality." },
    { id: 8, title: "Mindfulness Practices", category: "lifestyle", content: "Daily habits to improve mental health and focus." },
    { id: 9, title: "The Rise of E-Commerce", category: "business", content: "How e-commerce is reshaping global markets." },
    { id: 10, title: "Eco-Friendly Tech Innovations", category: "technology", content: "Green technologies driving sustainability." },
    { id: 11, title: "Work-Life Balance Hacks", category: "lifestyle", content: "Practical tips to balance career and personal life." },
    { id: 12, title: "Cryptocurrency in Business", category: "business", content: "How cryptocurrencies are being adopted by enterprises." },
    { id: 13, title: "Digital Detox Tips", category: "lifestyle", content: "How to unplug and recharge in a digital world." },
    { id: 14, title: "Space Exploration Advances", category: "technology", content: "The latest breakthroughs in space exploration." },
    { id: 15, title: "Building a Brand on Social Media", category: "business", content: "Effective strategies for growing your brand online." },
    { id: 16, title: "The Science of Sleep", category: "lifestyle", content: "Understanding sleep and its impact on health." },
    { id: 17, title: "Cybersecurity Trends", category: "technology", content: "Top practices to protect your data in 2024." },
    { id: 18, title: "Sustainable Living", category: "lifestyle", content: "How to live sustainably and reduce your footprint." },
];

// Pagination variables
let currentPage = 1;
const itemsPerPage = 5;

// Display results
function displayPaginatedResults(filteredBlogs) {
    const resultsContainer = document.getElementById("results");

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedBlogs = filteredBlogs.slice(startIndex, endIndex);

    const fragment = document.createDocumentFragment();

    paginatedBlogs.forEach(blog => {
        const card = document.createElement("div");
        card.classList.add("card");

        const title = document.createElement("h2");
        title.textContent = blog.title;

        const content = document.createElement("p");
        content.textContent = blog.content;

        const category = document.createElement("small");
        category.textContent = `Category: ${blog.category}`;

        card.appendChild(title);
        card.appendChild(content);
        card.appendChild(category);

        fragment.appendChild(card);
    });

    resultsContainer.appendChild(fragment);

    const showMoreButton = document.getElementById("showMore");
    if (endIndex >= filteredBlogs.length) {
        showMoreButton.style.display = "none";
    } else {
        showMoreButton.style.display = "block";
    }
}

// Debounced search function
function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

// Filter results based on search and category
function filterResults() {
    const query = document.getElementById("searchBox").value.toLowerCase();
    const category = document.getElementById("filter").value;

    const filteredBlogs = blogs.filter(blog => {
        const matchesQuery = blog.title.toLowerCase().includes(query) || blog.content.toLowerCase().includes(query);
        const matchesCategory = category === "all" || blog.category === category;
        return matchesQuery && matchesCategory;
    });

    // Reset page to the first page for a new search
    currentPage = 1;
    document.getElementById("results").innerHTML = ""; // Clear previous results
    displayPaginatedResults(filteredBlogs);
    return filteredBlogs; // Return filtered blogs for the "Show More" button
}

// Event listeners
document.getElementById("searchBox").addEventListener("input", debounce(filterResults, 300));
document.getElementById("filter").addEventListener("change", filterResults);

// "Show More" button
document.getElementById("showMore").addEventListener("click", () => {
    const query = document.getElementById("searchBox").value.toLowerCase();
    const category = document.getElementById("filter").value;

    const filteredBlogs = blogs.filter(blog => {
        const matchesQuery = blog.title.toLowerCase().includes(query) || blog.content.toLowerCase().includes(query);
        const matchesCategory = category === "all" || blog.category === category;
        return matchesQuery && matchesCategory;
    });

    currentPage++; // Increment the current page
    displayPaginatedResults(filteredBlogs); // Display the next set of results
});

// Initial display
displayPaginatedResults(blogs);
