/* =========================================
            HOTEL BOOKING
========================================= */


/* =========================================
   HOTEL DATA
========================================= */

const hotels = [

    {
        id: 1,

        name: "The Palm Royal Hotel",

        city: "Lagos",

        location: "Victoria Island, Lagos",

        price: 185,

        rating: 4.9,

        reviews: 328,

        stars: 5,

        badge: "Top Rated",

        image:
            "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1000&q=80",

        amenities: [
            "wifi",
            "pool",
            "breakfast",
            "parking"
        ],

        description:
            "A luxurious modern hotel in the heart of Victoria Island, offering elegant rooms, exceptional dining and premium facilities."
    },


    {
        id: 2,

        name: "Azure Grand Resort",

        city: "Dubai",

        location: "Palm Jumeirah, Dubai",

        price: 245,

        rating: 4.8,

        reviews: 512,

        stars: 5,

        badge: "Popular",

        image:
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80",

        amenities: [
            "wifi",
            "pool",
            "breakfast"
        ],

        description:
            "An elegant beachfront resort featuring spectacular views, luxurious rooms and world-class amenities."
    },


    {
        id: 3,

        name: "Maison Lumière",

        city: "Paris",

        location: "Le Marais, Paris",

        price: 195,

        rating: 4.7,

        reviews: 241,

        stars: 4,

        badge: "",

        image:
            "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1000&q=80",

        amenities: [
            "wifi",
            "breakfast"
        ],

        description:
            "A charming Parisian hotel combining classic architecture with contemporary comfort, located near the city's famous attractions."
    },


    {
        id: 4,

        name: "The Kensington House",

        city: "London",

        location: "Kensington, London",

        price: 220,

        rating: 4.9,

        reviews: 407,

        stars: 5,

        badge: "Guest Favorite",

        image:
            "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80",

        amenities: [
            "wifi",
            "parking",
            "breakfast"
        ],

        description:
            "A refined London hotel combining traditional British elegance with modern amenities and excellent service."
    },


    {
        id: 5,

        name: "Ocean Breeze Hotel",

        city: "Lagos",

        location: "Lekki, Lagos",

        price: 120,

        rating: 4.5,

        reviews: 189,

        stars: 4,

        badge: "Great Value",

        image:
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80",

        amenities: [
            "wifi",
            "pool",
            "parking"
        ],

        description:
            "A comfortable contemporary hotel offering excellent value, spacious rooms and convenient access to Lekki's attractions."
    },


    {
        id: 6,

        name: "Riviera Boutique Hotel",

        city: "Paris",

        location: "Montmartre, Paris",

        price: 165,

        rating: 4.6,

        reviews: 156,

        stars: 3,

        badge: "",

        image:
            "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1000&q=80",

        amenities: [
            "wifi",
            "breakfast"
        ],

        description:
            "A stylish boutique property tucked away in Montmartre, perfect for travelers looking for a relaxed Parisian experience."
    }

];


/* =========================================
   DOM
========================================= */

const hotelGrid =
    document.getElementById("hotelGrid");

const resultsInfo =
    document.getElementById("resultsInfo");

const noResults =
    document.getElementById("noResults");

const destinationInput =
    document.getElementById("destinationInput");

const searchBtn =
    document.getElementById("searchBtn");

const sortSelect =
    document.getElementById("sortSelect");

const minPrice =
    document.getElementById("minPrice");

const maxPrice =
    document.getElementById("maxPrice");

const clearFilters =
    document.getElementById("clearFilters");

const ratingFilters =
    document.querySelectorAll(".rating-filter");

const amenityFilters =
    document.querySelectorAll(".amenity-filter");

const hotelModal =
    document.getElementById("hotelModal");

const hotelModalBody =
    document.getElementById("hotelModalBody");

const bookingModal =
    document.getElementById("bookingModal");

const bookingForm =
    document.getElementById("bookingForm");

const bookingHotelName =
    document.getElementById("bookingHotelName");

const bookingPrice =
    document.getElementById("bookingPrice");

const bookingNights =
    document.getElementById("bookingNights");

const bookingTotal =
    document.getElementById("bookingTotal");

const bookingCheckIn =
    document.getElementById("bookingCheckIn");

const bookingCheckOut =
    document.getElementById("bookingCheckOut");

const toast =
    document.getElementById("toast");

const mobileMenu =
    document.getElementById("mobileMenu");

const menuBtn =
    document.getElementById("menuBtn");

const dealBtn =
    document.getElementById("dealBtn");


/* =========================================
   STATE
========================================= */

let filteredHotels = [...hotels];

let selectedHotel = null;

let favorites =
    JSON.parse(
        localStorage.getItem("stayoraFavorites")
    ) || [];


/* =========================================
   INITIALIZATION
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderHotels();

        setupDates();

    }
);


/* =========================================
   RENDER HOTELS
========================================= */

function renderHotels() {

    hotelGrid.innerHTML = "";

    if (filteredHotels.length === 0) {

        noResults.style.display = "block";

        resultsInfo.textContent =
            "No hotels found";

        return;
    }

    noResults.style.display = "none";

    resultsInfo.textContent =
        `Showing ${filteredHotels.length} hotel${filteredHotels.length > 1 ? "s" : ""}`;


    filteredHotels.forEach(hotel => {

        const card =
            document.createElement("article");

        card.className = "hotel-card";

        const isFavorite =
            favorites.includes(hotel.id);


        card.innerHTML = `

            <div class="hotel-image">

                <img
                    src="${hotel.image}"
                    alt="${hotel.name}"
                    loading="lazy"
                >

                ${
                    hotel.badge
                    ?
                    `<span class="hotel-badge">
                        ${hotel.badge}
                    </span>`
                    :
                    ""
                }

                <button
                    class="favorite-btn ${isFavorite ? "active" : ""}"
                    data-favorite="${hotel.id}"
                    aria-label="Add to favorites"
                >
                    <i class="${
                        isFavorite
                        ? "fa-solid"
                        : "fa-regular"
                    } fa-heart"></i>
                </button>

            </div>


            <div class="hotel-info">

                <div class="hotel-location">

                    <i class="fa-solid fa-location-dot"></i>

                    ${hotel.location}

                </div>


                <h3 class="hotel-name">
                    ${hotel.name}
                </h3>


                <div class="rating-row">

                    <span class="rating">
                        ${hotel.rating}
                    </span>

                    <span class="rating-text">
                        Excellent · ${hotel.reviews} reviews
                    </span>

                </div>


                <div class="amenities">

                    ${hotel.amenities
                        .map(
                            amenity =>
                                `<span class="amenity">
                                    ${formatAmenity(amenity)}
                                </span>`
                        )
                        .join("")}

                </div>


                <div class="hotel-footer">

                    <div class="price">

                        <span>
                            From
                        </span>

                        <strong>
                            $${hotel.price}
                        </strong>

                        <small>
                            / night
                        </small>

                    </div>


                    <button
                        class="book-btn"
                        data-book="${hotel.id}"
                    >
                        View hotel
                    </button>

                </div>

            </div>
        `;


        hotelGrid.appendChild(card);
    });


    attachCardEvents();
}


/* =========================================
   AMENITY NAMES
========================================= */

function formatAmenity(amenity) {

    const names = {

        wifi: "Free Wi-Fi",

        pool: "Pool",

        breakfast: "Breakfast",

        parking: "Free parking"

    };

    return names[amenity] || amenity;
}


/* =========================================
   CARD EVENTS
========================================= */

function attachCardEvents() {

    document
        .querySelectorAll("[data-favorite]")
        .forEach(button => {

            button.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    const id =
                        Number(
                            button.dataset.favorite
                        );

                    toggleFavorite(id);

                }
            );

        });


    document
        .querySelectorAll("[data-book]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        Number(
                            button.dataset.book
                        );

                    openHotel(id);

                }
            );

        });
}


/* =========================================
   FAVORITES
========================================= */

function toggleFavorite(id) {

    if (favorites.includes(id)) {

        favorites =
            favorites.filter(
                favorite => favorite !== id
            );

        showToast(
            "Removed from favorites"
        );

    } else {

        favorites.push(id);

        showToast(
            "Added to favorites"
        );

    }


    localStorage.setItem(
        "stayoraFavorites",
        JSON.stringify(favorites)
    );

    renderHotels();
}


/* =========================================
   OPEN HOTEL
========================================= */

function openHotel(id) {

    selectedHotel =
        hotels.find(
            hotel => hotel.id === id
        );

    if (!selectedHotel) return;


    hotelModalBody.innerHTML = `

        <div class="modal-hotel-image">

            <img
                src="${selectedHotel.image}"
                alt="${selectedHotel.name}"
            >

        </div>


        <div class="modal-location">

            <i class="fa-solid fa-location-dot"></i>

            ${selectedHotel.location}

        </div>


        <h2>
            ${selectedHotel.name}
        </h2>


        <div class="rating-row">

            <span class="rating">
                ${selectedHotel.rating}
            </span>

            <span class="rating-text">
                ${selectedHotel.reviews} guest reviews
            </span>

        </div>


        <p class="modal-description">
            ${selectedHotel.description}
        </p>


        <div class="amenities">

            ${selectedHotel.amenities
                .map(
                    amenity =>
                        `<span class="amenity">
                            ${formatAmenity(amenity)}
                        </span>`
                )
                .join("")}

        </div>


        <button
            class="modal-book-btn"
            id="modalBookBtn"
        >
            Book this hotel — $${selectedHotel.price}/night
        </button>

    `;


    hotelModal.classList.add("active");

    document.body.style.overflow = "hidden";


    document
        .getElementById("modalBookBtn")
        .addEventListener(
            "click",
            () => {

                closeModal(hotelModal);

                openBooking(selectedHotel);

            }
        );
}


/* =========================================
   BOOKING MODAL
========================================= */

function openBooking(hotel) {

    selectedHotel = hotel;

    bookingHotelName.textContent =
        hotel.name;

    bookingPrice.textContent =
        `$${hotel.price}`;

    bookingCheckIn.value =
        document.getElementById("checkIn").value;

    bookingCheckOut.value =
        document.getElementById("checkOut").value;

    calculateBookingTotal();

    bookingModal.classList.add("active");

    document.body.style.overflow = "hidden";
}


/* =========================================
   BOOKING CALCULATION
========================================= */

function calculateBookingTotal() {

    if (!selectedHotel) return;


    const start =
        new Date(
            bookingCheckIn.value
        );

    const end =
        new Date(
            bookingCheckOut.value
        );


    let nights = 1;


    if (
        bookingCheckIn.value &&
        bookingCheckOut.value &&
        end > start
    ) {

        nights =
            Math.ceil(
                (end - start) /
                (1000 * 60 * 60 * 24)
            );

    }


    if (nights < 1) {
        nights = 1;
    }


    bookingNights.textContent =
        nights;


    bookingTotal.textContent =
        `$${selectedHotel.price * nights}`;
}


bookingCheckIn.addEventListener(
    "change",
    calculateBookingTotal
);

bookingCheckOut.addEventListener(
    "change",
    calculateBookingTotal
);


/* =========================================
   BOOKING FORM
========================================= */

bookingForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const firstName =
            document.getElementById("firstName").value;


        showToast(
            `Booking confirmed! Thank you, ${firstName}.`
        );


        closeModal(bookingModal);

        bookingForm.reset();

    }
);


/* =========================================
   SEARCH
========================================= */

searchBtn.addEventListener(
    "click",
    () => {

        applyFilters();

        document
            .getElementById("hotels")
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);


destinationInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            applyFilters();

            document
                .getElementById("hotels")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }

    }
);


/* =========================================
   FILTERS
========================================= */

function applyFilters() {

    const destination =
        destinationInput.value
            .trim()
            .toLowerCase();


    const minimum =
        Number(minPrice.value) || 0;


    const maximum =
        Number(maxPrice.value) || Infinity;


    const selectedRatings =
        [...ratingFilters]
            .filter(input => input.checked)
            .map(input => Number(input.value));


    const selectedAmenities =
        [...amenityFilters]
            .filter(input => input.checked)
            .map(input => input.value);


    filteredHotels =
        hotels.filter(hotel => {

            const matchesDestination =
                !destination ||
                hotel.city
                    .toLowerCase()
                    .includes(destination) ||
                hotel.location
                    .toLowerCase()
                    .includes(destination);


            const matchesPrice =
                hotel.price >= minimum &&
                hotel.price <= maximum;


            const matchesRating =
                selectedRatings.length === 0 ||
                selectedRatings.includes(hotel.stars);


            const matchesAmenities =
                selectedAmenities.length === 0 ||
                selectedAmenities.every(
                    amenity =>
                        hotel.amenities.includes(amenity)
                );


            return (
                matchesDestination &&
                matchesPrice &&
                matchesRating &&
                matchesAmenities
            );

        });


    sortHotels();

    renderHotels();
}


/* =========================================
   SORTING
========================================= */

sortSelect.addEventListener(
    "change",
    () => {

        sortHotels();

        renderHotels();

    }
);


function sortHotels() {

    const sort =
        sortSelect.value;


    if (sort === "price-low") {

        filteredHotels.sort(
            (a, b) =>
                a.price - b.price
        );

    }


    else if (sort === "price-high") {

        filteredHotels.sort(
            (a, b) =>
                b.price - a.price
        );

    }


    else if (sort === "rating") {

        filteredHotels.sort(
            (a, b) =>
                b.rating - a.rating
        );

    }

}


/* =========================================
   CLEAR FILTERS
========================================= */

clearFilters.addEventListener(
    "click",
    () => {

        destinationInput.value = "";

        minPrice.value = "";

        maxPrice.value = "";

        ratingFilters.forEach(
            checkbox =>
                checkbox.checked = false
        );

        amenityFilters.forEach(
            checkbox =>
                checkbox.checked = false
        );

        sortSelect.value =
            "recommended";

        filteredHotels =
            [...hotels];

        renderHotels();

    }
);


/* =========================================
   FILTER EVENTS
========================================= */

ratingFilters.forEach(
    checkbox => {

        checkbox.addEventListener(
            "change",
            applyFilters
        );

    }
);


amenityFilters.forEach(
    checkbox => {

        checkbox.addEventListener(
            "change",
            applyFilters
        );

    }
);


minPrice.addEventListener(
    "input",
    applyFilters
);

maxPrice.addEventListener(
    "input",
    applyFilters
);


/* =========================================
   DESTINATION CARDS
========================================= */

document
    .querySelectorAll(".destination-card")
    .forEach(card => {

        card.addEventListener(
            "click",
            () => {

                const city =
                    card.dataset.city;

                destinationInput.value =
                    city;

                applyFilters();

                document
                    .getElementById("hotels")
                    .scrollIntoView({
                        behavior: "smooth"
                    });

            }
        );

    });


/* =========================================
   MODAL CLOSE
========================================= */

document
    .querySelectorAll("[data-close]")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const modalId =
                    button.dataset.close;

                const modal =
                    document.getElementById(
                        modalId
                    );

                closeModal(modal);

            }
        );

    });


document
    .querySelectorAll(".modal-overlay")
    .forEach(overlay => {

        overlay.addEventListener(
            "click",
            () => {

                const modal =
                    overlay.closest(".modal");

                closeModal(modal);

            }
        );

    });


document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            document
                .querySelectorAll(".modal.active")
                .forEach(closeModal);

        }

    }
);


function closeModal(modal) {

    if (!modal) return;

    modal.classList.remove("active");

    document.body.style.overflow = "";

}


/* =========================================
   MOBILE MENU
========================================= */

menuBtn.addEventListener(
    "click",
    () => {

        mobileMenu.classList.toggle(
            "active"
        );

    }
);


mobileMenu
    .querySelectorAll("a")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                mobileMenu.classList.remove(
                    "active"
                );

            }
        );

    });


/* =========================================
   DEAL BUTTON
========================================= */

dealBtn.addEventListener(
    "click",
    () => {

        showToast(
            "Your 20% welcome offer has been activated!"
        );

    }
);


/* =========================================
   TOAST
========================================= */

function showToast(message) {

    toast.querySelector("span")
        .textContent = message;

    toast.classList.add("show");


    setTimeout(
        () => {

            toast.classList.remove(
                "show"
            );

        },
        3000
    );
}


/* =========================================
   DATE SETUP
========================================= */

function setupDates() {

    const today =
        new Date();


    const tomorrow =
        new Date(today);

    tomorrow.setDate(
        today.getDate() + 1
    );


    const checkout =
        new Date(today);

    checkout.setDate(
        today.getDate() + 2
    );


    const formatDate =
        date => {

            return date
                .toISOString()
                .split("T")[0];

        };


    document.getElementById(
        "checkIn"
    ).min =
        formatDate(today);


    document.getElementById(
        "checkOut"
    ).min =
        formatDate(tomorrow);


    document.getElementById(
        "checkIn"
    ).value =
        formatDate(tomorrow);


    document.getElementById(
        "checkOut"
    ).value =
        formatDate(checkout);


    bookingCheckIn.min =
        formatDate(today);

    bookingCheckOut.min =
        formatDate(tomorrow);

}
