// Update greeting message based on time of day
function updateGreeting() {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();

    let greeting = "Good ";
    if (hour < 12) {
        greeting += "Morning";
    } else if (hour < 18) {
        greeting += "Afternoon";
    } else {
        greeting += "Evening";
    }

    // Format minutes with leading zero if less than 10
    const formattedMinute = minute < 10 ? `0${minute}` : minute;

    // Display time in format HH:MM
    const time = `${hour}:${formattedMinute}`;

    // Update greeting and time
    document.getElementById('greet').textContent = `${greeting}, it's ${time}`;
}

// Update progress bar based on scroll position
function updateProgressBar() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight || window.innerHeight;

    const scrollPercent = (scrollTop / (scrollHeight - clientHeight)) * 100;
    document.getElementById('progress-bar').style.width = scrollPercent + '%';
}

// Event listener for scroll event to update progress bar
window.addEventListener('scroll', updateProgressBar);

// Initial call to update greeting message and time
updateGreeting();

// Update time every minute to keep it current
setInterval(updateGreeting, 60000); // 60000 milliseconds = 1 minute


// Function to display user information
function displayUserInfo() {
    // Browser information
    const browser = detectBrowser();
    document.getElementById('browser').textContent = browser.name || 'Not available';
    document.getElementById('browserVersion').textContent = browser.version || 'Not available';

    // Operating System information
    const os = detectOS();
    document.getElementById('os').textContent = os.name || 'Not available';
    document.getElementById('osVersion').textContent = os.version || 'Not available';

    // Device type
    const deviceType = detectDeviceType();
    document.getElementById('deviceType').textContent = deviceType || 'Not available';

    // Battery status
    if ('getBattery' in navigator) {
        navigator.getBattery().then(function(battery) {
            const batteryLevel = battery.level * 100;
            document.getElementById('battery').textContent = batteryLevel.toFixed(2) + '%';
        }).catch(function(error) {
            document.getElementById('battery').textContent = 'Not available';
        });
    } else {
        document.getElementById('battery').textContent = 'Battery API not supported';
    }

    // Geolocation
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const coords = position.coords;
            const latitude = coords.latitude.toFixed(2);
            const longitude = coords.longitude.toFixed(2);
            document.getElementById('geo').textContent = `Latitude: ${latitude}, Longitude: ${longitude}`;

            // Reverse geocoding to get location name (city, state/province, country)
            reverseGeocode(latitude, longitude);
        }, function(error) {
            document.getElementById('geo').textContent = 'Geolocation information is not available or permission denied.';
        });
    } else {
        document.getElementById('geo').textContent = 'Geolocation API not supported';
    }

    // Date and Time
    const now = new Date();
    document.getElementById('datetime').textContent = now.toLocaleString();
}

// Function to reverse geocode and get location details
function reverseGeocode(latitude, longitude) {
    // Using OpenCage Geocoding API for demonstration (replace with your preferred geocoding API)
    const apiKey = 'YOUR_API_KEY'; // Replace with your API key
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}&language=en&pretty=1`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.results.length > 0) {
                const { city, state, country } = data.results[0].components;
                const location = `${city || ''}, ${state || ''}, ${country || ''}`;
                document.getElementById('location').textContent = location || 'Location information not available';
            } else {
                document.getElementById('location').textContent = 'Location information not available';
            }
        })
        .catch(error => {
            document.getElementById('location').textContent = 'Location information not available';
        });
}

// Function to detect browser
function detectBrowser() {
    const userAgent = navigator.userAgent;
    let browser = '';
    if (userAgent.indexOf('Firefox') > -1) {
        browser = { name: 'Firefox', version: getVersion(userAgent, 'Firefox/') };
    } else if (userAgent.indexOf('Chrome') > -1) {
        browser = { name: 'Chrome', version: getVersion(userAgent, 'Chrome/') };
    } else if (userAgent.indexOf('Safari') > -1) {
        browser = { name: 'Safari', version: getVersion(userAgent, 'Version/') };
    } else if (userAgent.indexOf('MSIE') > -1 || userAgent.indexOf('Trident/') > -1) {
        browser = { name: 'Internet Explorer', version: getVersion(userAgent, 'MSIE ') || getVersion(userAgent, 'rv:') };
    } else {
        browser = { name: 'Unknown', version: 'N/A' };
    }
    return browser;
}

// Function to detect OS
function detectOS() {
    const userAgent = navigator.userAgent;
    let os = '';
    if (userAgent.indexOf('Windows') > -1) {
        os = { name: 'Windows', version: getVersion(userAgent, 'Windows NT ') };
    } else if (userAgent.indexOf('Mac OS X') > -1) {
        os = { name: 'Mac OS X', version: getVersion(userAgent, 'Mac OS X ') };
    } else if (userAgent.indexOf('Linux') > -1) {
        os = { name: 'Linux', version: 'N/A' }; // Versions of Linux are diverse and complex to detect reliably
    } else {
        os = { name: 'Unknown', version: 'N/A' };
    }
    return os;
}

// Function to detect device type
function detectDeviceType() {
    const userAgent = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent)) {
        return 'Tablet';
    } else if (/Mobile|Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
        return 'Mobile';
    } else {
        return 'Desktop';
    }
}

// Function to extract version number from user agent string
function getVersion(userAgent, identifier) {
    const index = userAgent.indexOf(identifier);
    if (index !== -1) {
        return userAgent.substring(index + identifier.length).split(' ')[0];
    }
    return null;
}

// Event listener for the button click to show user info
document.getElementById('showInfoBtn').addEventListener('click', function() {
    const infoSection = document.getElementById('info');
    const infoMessage = document.getElementById('infoMessage');

    if (infoSection.style.display === 'none') {
        infoSection.style.display = 'block';
        infoMessage.style.display = 'none';
        displayUserInfo();
    }
});

                                     

// Function to load images dynamically
        function loadImages() {
            const images = [
                
                'Bottom Scroll GIFS, JPEG, PNG Files for Technologies/Java GIF.gif',  
      
                'Bottom Scroll GIFS, JPEG, PNG Files for Technologies/Spring Framework Logo GIFS.gif',
                'Bottom Scroll GIFS, JPEG, PNG Files for Technologies/SpringBoot and Docker.gif',
                'Bottom Scroll GIFS, JPEG, PNG Files for Technologies/spring-boot-logo.png',

                'Bottom Scroll GIFS, JPEG, PNG Files for Technologies/Apache TomCat Logo.png',

                'Bottom Scroll GIFS, JPEG, PNG Files for Technologies/postgresql-logo.png', 
                'Bottom Scroll GIFS, JPEG, PNG Files for Technologies/Mysql_logo.png',  
                'Bottom Scroll GIFS, JPEG, PNG Files for Technologies/mariadb-logo_blue-transparent-300x75.png',
              
                'Bottom Scroll GIFS, JPEG, PNG Files for Technologies/HTML-CSS-JAVASCRIPT-GIF.gif',

                'Bottom Scroll GIFS, JPEG, PNG Files for Technologies/Postman Logo.png',
                'Bottom Scroll GIFS, JPEG, PNG Files for Technologies/AWS GIFS.gif',
                'Bottom Scroll GIFS, JPEG, PNG Files for Technologies/Docker GIF.gif',
                
                 // Add more image paths as needed
            ];

            const gallery = document.getElementById('imageGallery');

            images.forEach((image, index) => {
                const imgElement = document.createElement('div');
                imgElement.className = 'scroll-item';
                imgElement.style.animationDuration = '3.8s'; // Animation duration
                imgElement.style.animationDelay = `${index * 1.5}s`; // Delay for each image

                const img = document.createElement('img');
                img.src = image;
                img.alt = `Image ${index + 1}`;

                imgElement.appendChild(img);
                gallery.appendChild(imgElement);
            });
        }

        // Load images when the page loads
        window.onload = function() {
            loadImages();
        };


 function loadCompanyInfo() {
        // Replace this with the Wikipedia link or any other source for company info
        window.open('https://en.wikipedia.org/wiki/GE_HealthCare', '_blank');
    }