// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const spans = this.querySelectorAll('span');
            spans[0].style.transform = navLinks.classList.contains('active') ? 'rotate(45deg) translate(5px, 6px)' : '';
            spans[1].style.opacity = navLinks.classList.contains('active') ? '0' : '1';
            spans[2].style.transform = navLinks.classList.contains('active') ? 'rotate(-45deg) translate(5px, -6px)' : '';
        });
    }

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }

            // Prepare email data
            const emailData = {
                name: name,
                email: email,
                message: message
            };

            // Simulate form submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            // Simulate API call
            setTimeout(() => {
                console.log('Email data:', emailData);
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1500);
        });
    }

    // Filter options for map
    const filterOptions = document.querySelectorAll('.filter-option');
    if (filterOptions.length > 0) {
        filterOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Toggle active class
                this.classList.toggle('active');
                
                // Update route if origin and destination are set
                const originInput = document.getElementById('origin-input');
                const destinationInput = document.getElementById('destination-input');
                if (originInput && destinationInput && originInput.value && destinationInput.value) {
                    document.getElementById('route-button').click();
                }
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add scroll effect to navbar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        }
    }
});

// Map functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize map if we're on the map page
    const mapContainer = document.getElementById('map-container');
    if (mapContainer) {
        // Load Google Maps API
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBvG2QwH1QJ9resTZsAgZN0oNBd1HpxwkI&libraries=places&callback=initMap`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
    }
});

// Global function for Google Maps callback
window.initMap = function() {
    const mapContainer = document.getElementById('map-container');
    if (!mapContainer) return;
    
    // Initialize map
    const map = new google.maps.Map(mapContainer, {
        center: { lat: 40.7128, lng: -74.0060 }, // New York City
        zoom: 13,
        mapTypeControl: false,
        streetViewControl: true
    });
    
    // Initialize services
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer({
        map: map,
        panel: document.getElementById('directions-panel')
    });
    
    // Initialize autocomplete for origin and destination inputs
    const originInput = document.getElementById('origin-input');
    const destinationInput = document.getElementById('destination-input');
    
    if (originInput && destinationInput) {
        const originAutocomplete = new google.maps.places.Autocomplete(originInput);
        const destinationAutocomplete = new google.maps.places.Autocomplete(destinationInput);
        
        // Set up route calculation
        const routeButton = document.getElementById('route-button');
        if (routeButton) {
            routeButton.addEventListener('click', function() {
                calculateRoute(directionsService, directionsRenderer, map, originInput.value, destinationInput.value);
            });
        }
    }
    
    // Add some sample accessible locations
    addAccessibleLocations(map);
};

function calculateRoute(directionsService, directionsRenderer, map, origin, destination) {
    if (!origin || !destination) {
        alert('Please enter both origin and destination');
        return;
    }
    
    // Get active filters
    const activeFilters = [];
    document.querySelectorAll('.filter-option.active').forEach(filter => {
        activeFilters.push(filter.getAttribute('data-filter'));
    });
    
    // Set travel mode based on filters
    let travelMode = 'WALKING';
    let avoidHighways = true;
    let avoidFerries = true;
    
    const request = {
        origin: origin,
        destination: destination,
        travelMode: travelMode,
        provideRouteAlternatives: true,
        avoidHighways: avoidHighways,
        avoidFerries: avoidFerries
    };
    
    directionsService.route(request, function(result, status) {
        if (status === 'OK') {
            directionsRenderer.setDirections(result);
            
            // Display route info
            const route = result.routes[0];
            const routeInfoDiv = document.getElementById('route-info');
            if (routeInfoDiv && route.legs[0]) {
                routeInfoDiv.innerHTML = `
                    <div class="route-detail">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 22s-8-4.5-8-11.8a8 8 0 0 1 16 0c0 7.3-8 11.8-8 11.8z"/>
                            <circle cx="12" cy="10" r="3"/>
                        </svg>
                        <span>Distance: ${route.legs[0].distance.text}</span>
                    </div>
                    <div class="route-detail">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12 6 12 12 16 14"/>
                        </svg>
                        <span>Time: ${route.legs[0].duration.text}</span>
                    </div>
                `;
                routeInfoDiv.style.display = 'flex';
            }
        } else {
            alert('Could not calculate route: ' + status);
        }
    });
}

function addAccessibleLocations(map) {
    // Sample data for accessible locations
    const accessibleLocations = [
        {
            position: { lat: 40.7128, lng: -74.0060 },
            title: "Accessible Park",
            type: "park",
            features: ["wheelchair ramps", "accessible restrooms", "paved paths"]
        },
        {
            position: { lat: 40.7228, lng: -73.9960 },
            title: "Community Center",
            type: "building",
            features: ["elevator", "wheelchair ramps", "accessible restrooms"]
        },
        {
            position: { lat: 40.7328, lng: -74.0160 },
            title: "Public Library",
            type: "building",
            features: ["elevator", "accessible entrance", "accessible restrooms"]
        },
        {
            position: { lat: 40.7028, lng: -73.9860 },
            title: "Accessible Restaurant",
            type: "restaurant",
            features: ["step-free entrance", "accessible seating", "accessible restrooms"]
        },
        {
            position: { lat: 40.7178, lng: -74.0260 },
            title: "Medical Center",
            type: "medical",
            features: ["elevator", "wheelchair ramps", "accessible parking"]
        }
    ];
    
    // Create markers for each location
    accessibleLocations.forEach(location => {
        const marker = new google.maps.Marker({
            position: location.position,
            map: map,
            title: location.title,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 8,
                fillColor: "#2563eb",
                fillOpacity: 0.8,
                strokeWeight: 2,
                strokeColor: "#ffffff"
            }
        });
        
        // Create info window with accessibility details
        const infoContent = `
            <div style="padding: 10px; max-width: 200px;">
                <h3 style="margin-top: 0; margin-bottom: 8px; color: #2563eb;">${location.title}</h3>
                <p style="margin-bottom: 8px;"><strong>Accessible Features:</strong></p>
                <ul style="margin: 0; padding-left: 20px;">
                    ${location.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
        `;
        
        const infoWindow = new google.maps.InfoWindow({
            content: infoContent
        });
        
        // Add click listener to show info window
        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });
    });
}