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
        image: "assets/lodha-acsenza.jpg",
        video: "https://www.youtube.com/watch?v=_Xipsh9zNDY",
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
        image: "assets/trident-juhu.jpg",
        video: "https://www.youtube.com/shorts/3Dn5SXaeZAs",
        amenities: ["🌅", "🚗", "🏊", "🔒"]
    },
    {
        id: 3,
        name: "Lodha Eternis",
        location: "Andheri East",
        price: "₹2.06cr",
        configs: "2 BHK",
        possession: "Ready To Move In",
        rera: "P518000YYYY",
        image: "assets/Lodha Eternis.png",
        video: "https://www.youtube.com/watch?v=PS_3J3D6lmo",
        amenities: ["🌅", "🚗", "🏊", "🔒"]
    },
    {
        id: 4,
        name: "Adani Link Bay",
        location: "Andheri West",
        price: "₹3.30cr - 6.50cr",
        configs: "2 BHK, 3BHK, 4BHK",
        possession: "Oct 2028",
        rera: "P518000YYYY",
        image: "assets/Lodha Eternis.png",
        video: "https://www.youtube.com/watch?v=PS_3J3D6lmo",
        amenities: ["🌅", "🚗", "🏊", "🔒"]
    },
    {
        id: 5,
        name: "Bharat Altavista",
        location: "Andheri West",
        price: "₹5.97cr++",
        configs: "3BHK",
        possession: "Mar 2027",
        rera: "P518000YYYY",
        image: "Bharat Altavistas.png",
        video: "https://www.youtube.com/watch?v=PS_3J3D6lmo",
        amenities: ["🌅", "🚗", "🏊", "🔒"]
    },
    {
        id: 6,
        name: "Kalpatru Amare",
        location: "Juhu",
        price: "₹10cr - 30cr",
        configs: "3/4 BHK And Jodi Options",
        possession: "Dec 2027",
        rera: "P518000YYYY",
        image: "Kalpataru.png",
        video: "https://www.youtube.com/shorts/3Dn5SXaeZAs",
        amenities: ["🌅", "🚗", "🏊", "🔒"]
    }     
];

// Initialize Swiper
let swiper;
function initSwiper() {
    console.log('Initializing Swiper');
    try {
        swiper = new Swiper('.swiper-container', {
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            effect: 'cards',
            grabCursor: true
        });
    } catch (error) {
        console.error('Swiper initialization failed:', error);
    }
}

// Show projects based on location
function getProjects() {
    console.log('getProjects called');
    try {
        const location = document.getElementById("locationSelect").value;
        console.log('Selected location:', location);
        if (!location) {
            alert('Please select a location.');
            return;
        }
        const modal = document.getElementById("locationModal");
        const swiperWrapper = document.getElementById("swiperWrapper");
        modal.style.display = "none";

        // Filter luxury projects (price > ₹2 Cr)
        const filteredProjects = projects.filter(project => 
            project.location === location && project.price.includes("Cr")
        );

        // Render cards
        swiperWrapper.innerHTML = "";
        if (filteredProjects.length === 0) {
            swiperWrapper.innerHTML = '<p>No luxury projects found for this location.</p>';
            return;
        }
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
    } catch (error) {
        console.error('getProjects error:', error);
        alert('An error occurred while loading projects. Please try again.');
    }
}

// Toggle lead form
function toggleForm(id) {
    console.log('toggleForm called for id:', id);
    try {
        const form = document.getElementById(`form-${id}`);
        form.style.display = form.style.display === "block" ? "none" : "block";
    } catch (error) {
        console.error('toggleForm error:', error);
    }
}

// Submit lead to Netlify Function
async function submitLead(event, id) {
    console.log('submitLead called for id:', id);
    event.preventDefault();
    try {
        const form = document.getElementById(`form-${id}`);
        const data = {
            name: form.querySelector('input[name="name"]').value,
            phone: form.querySelector('input[name="phone"]').value,
            email: form.querySelector('input[name="email"]').value,
            budget: form.querySelector('input[name="budget"]').value,
            possession: form.querySelector('input[name="possession"]').value,
            projectId: id
        };
        console.log('Submitting lead data:', data);
        const response = await fetch('/.netlify/functions/submit-lead', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        alert('Thank you for your enquiry with Luminos Realty! Our team will contact you soon to discuss your luxury home needs.');
        form.style.display = 'none';
    } catch (error) {
        console.error('submitLead error:', error);
        alert('Oops! Something went wrong. Please try submitting again or contact us at info@luminosrealty.com.');
    }
}