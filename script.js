// Sample project data (replace with real data)
const projects = [
    {
        id: 1,
        name: "Lodha Acsenza",
        location: "Andheri East",
        price: "₹2 Cr - ₹4 Cr",
        configs: "2 BHK, 3 BHK",
        possession: "Dec 2027",
        rera: "P518000XXXX",
        image: "assets/lodha-acsenza.jpeg",
        video: "https://www.youtube.com/embed/XXXX",
        amenities: ["🏊‍♂️", "🏋️‍♂️", "🌳", "🏠"]
    },
    {
        id: 2,
        name: "H Rishabraj Trident",
        location: "Juhu",
        price: "₹5 Cr - ₹7 Cr",
        configs: "2 BHK, 3/4 BHK",
        possession: "Jun 2026",
        rera: "P518000YYYY",
        image: "assets/trident-juhu.jpeg",
        video: "https://www.youtube.com/embed/YYYY",
        amenities: ["🌅", "🚗", "🏊", "🔒"]
    },
    {
        id: 3,
        name: "Chandak Sarvam",
        location: "Andheri East",
        price: "₹4.5 Cr - ₹12 Cr",
        configs: "3 BHK, 4 BHK",
        possession: "Jun 2028",
        rera: "P518000YYYY",
        image: "assets/ChandakSarvam.jpeg",
        video: "https://www.youtube.com/embed/YYYY",
        amenities: ["🌅", "🚗", "🏊", "🔒"]
    },
    {
        id: 4,
        name: "Adani LinkBay",
        location: "Andheri West",
        price: "₹4 Cr - ₹10 Cr",
        configs: "2BHK, 3 BHK, 4 BHK",
        possession: "Oct 2028",
        rera: "P518000YYYY",
        image: "assets/trident-juhu.jpg",
        video: "https://www.youtube.com/embed/YYYY",
        amenities: ["🌅", "🚗", "🏊", "🔒"]
    }
];

// Initialize Swiper
let swiper;
function initSwiper() {
    swiper = new Swiper('.swiper-container', {
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        effect: 'cards',
        grabCursor: true
    });
}

// Show projects based on location
function getProjects() {
    const location = document.getElementById("locationSelect").value;
    const modal = document.getElementById("locationModal");
    const swiperWrapper = document.getElementById("swiperWrapper");
    modal.style.display = "none";

    // Filter luxury projects (price > ₹2 Cr)
    const filteredProjects = projects.filter(project => 
        project.location === location && project.price.includes("Cr")
    );

    // Render cards
    swiperWrapper.innerHTML = "";
    filteredProjects.forEach(project => {
        const card = document.createElement("div");
        card.className = "swiper-slide card";
        card.innerHTML = `
            <img src="${project.image}" alt="${project.name}">
            <div class="card-content">
                <h3>${project.name}</h3>
                <p><strong>Location:</strong> ${project.location}</p>
                <p><strong>Price:</strong> ${project.price}</p>
                <p><strong>Configurations:</strong> ${project.configs}</p>
                <p><strong>Possession:</strong> ${project.possession}</p>
                <p><strong>RERA ID:</strong> ${project.rera}</p>
                <iframe width="100%" height="200" src="${project.video}" frameborder="0" allowfullscreen></iframe>
                <div class="amenities">
                    ${project.amenities.map(icon => `<span class="amenity-icon">${icon}</span>`).join("")}
                </div>
                <button class="enquire-btn" onclick="toggleForm(${project.id})">Enquire Now</button>
                <form id="form-${project.id}" class="lead-form" onsubmit="submitLead(event, ${project.id})">
                    <input type="text" name="name" placeholder="Full Name" required>
                    <input type="tel" name="phone" placeholder="Phone Number" required>
                    <input type="email" name="email" placeholder="Email Address" required>
                    <input type="text" name="budget" placeholder="Budget (e.g., ₹2 Cr)" required>
                    <input type="text" name="possession" placeholder="Possession Timeline" required>
                    <button type="submit">Submit</button>
                </form>
                <p class="disclaimer">Images for representative purposes only. Project under construction.</p>
            </div>
        `;
        swiperWrapper.appendChild(card);
    });

    // Re-initialize Swiper
    initSwiper();
}

// Toggle lead form
function toggleForm(id) {
    const form = document.getElementById(`form-${id}`);
    form.style.display = form.style.display === "block" ? "none" : "block";
}

// Submit lead to backend
async function submitLead(event, id) {
    event.preventDefault();
    const form = document.getElementById(`form-${id}`);
    const data = {
        name: form.querySelector('input[name="name"]').value,
        phone: form.querySelector('input[name="phone"]').value,
        email: form.querySelector('input[name="email"]').value,
        budget: form.querySelector('input[name="budget"]').value,
        possession: form.querySelector('input[name="possession"]').value,
        projectId: id
    };
    try {
        const response = await fetch('/submit-lead', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        alert(result.message);
        form.style.display = 'none';
    } catch (error) {
        alert('Error submitting lead. Please try again.');
    }
}