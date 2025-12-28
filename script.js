
        window.toggleMenu = function() {
            const nav = document.querySelector('nav');
            const searchBar = document.querySelector('.search-bar');
            nav.classList.toggle('active');
            searchBar.classList.toggle('dropdown');
        };

        window.closeCard = function() {
            document.getElementById('modal').classList.remove('active');
        };

        window.showCard = function(type) {
            const cardData = {
                stall: {
                    icon: 'bi-shop',
                    title: 'Stall Information',
                    content: `
                        <div class="info-section">
                            <h3><i class="bi bi-book"></i> Library Stall</h3>
                            <p><strong>Building:</strong> Central Library Building</p>
                            <p><strong>Location:</strong> East Campus, near Engineering Building</p>
                            <p><strong>Established:</strong> 1986</p>
                            <div class="contact-item">
                                <i class="bi bi-person"></i>
                                <span><strong>Warden:</strong> <a href="tel:+8801234567891">+880-123-456-7891</a></span>
                            </div>
                            <div class="contact-item">
                                <i class="bi bi-telephone"></i>
                                <span><a href="tel:+880-91-46101">+880-91-46101</a> (Hall Office)</span>
                            </div>
                            <p><strong>Facilities:</strong> WiFi, Generator backup, Common room, Study hall</p>
                        </div>
                        <div class="info-section">
                            <h3><i class="bi bi-building"></i> Begum Rokeya Hall (Girls)</h3>
                            <p><strong>Capacity:</strong> 350 students</p>
                            <p><strong>Location:</strong> West Campus, near Medical Complex</p>
                            <p><strong>Established:</strong> 1995</p>
                            <div class="contact-item">
                                <i class="bi bi-person"></i>
                                <span><strong>Warden:</strong> <a href="tel:+8801234567892">+880-123-456-7892</a></span>
                            </div>
                            <div class="contact-item">
                                <i class="bi bi-telephone"></i>
                                <span><a href="tel:+880-91-46102">+880-91-46102</a> (Hall Office)</span>
                            </div>
                            <p><strong>Facilities:</strong> WiFi, 24/7 Security, Counseling office, Prayer room</p>
                        </div>
                        <div class="info-section">
                            <h3><i class="bi bi-star"></i> General Facilities</h3>
                            <p>✓ 24-hour electricity backup</p>
                            <p>✓ High-speed Internet & WiFi</p>
                            <p>✓ Cafeteria services</p>
                            <p>✓ 24/7 Medical facility</p>
                            <p>✓ Laundry services</p>
                            <p>✓ Recreation facilities</p>
                            <p>✓ 24/7 Security</p>
                        </div>
                    `
                },
                contact: {
                    icon: 'bi-envelope',
                    title: 'Contact Information',
                    content: `
                        <div class="info-section">
                            <h3><i class="bi bi-building"></i> Bangladesh Agricultural University</h3>
                            <div class="contact-item">
                                <i class="bi bi-geo-alt"></i>
                                <span>Mymensingh 2202, Bangladesh</span>
                            </div>
                            <div class="contact-item">
                                <i class="bi bi-telephone"></i>
                                <span><a href="tel:+880-91-46000">+880-91-46000</a> (General)</span>
                            </div>
                            <div class="contact-item">
                                <i class="bi bi-telephone"></i>
                                <span><a href="tel:+880-91-46001">+880-91-46001</a> (Admissions)</span>
                            </div>
                            <div class="contact-item">
                                <i class="bi bi-envelope"></i>
                                <span><a href="mailto:info@bau.edu.bd">info@bau.edu.bd</a></span>
                            </div>
                            <div class="contact-item">
                                <i class="bi bi-globe"></i>
                                <span><a href="https://www.bau.edu.bd" target="_blank">www.bau.edu.bd</a></span>
                            </div>
                        </div>
                        <div class="info-section">
                            <h3><i class="bi bi-code"></i> Department of Bioinformatics</h3>
                            <div class="contact-item">
                                <i class="bi bi-building"></i>
                                <span>Engineering Building, Floor 3</span>
                            </div>
                            <div class="contact-item">
                                <i class="bi bi-telephone"></i>
                                <span><a href="tel:+880-91-65432">+880-91-65432</a></span>
                            </div>
                            <div class="contact-item">
                                <i class="bi bi-envelope"></i>
                                <span><a href="mailto:bioinformatics@bau.edu.bd">bioinformatics@bau.edu.bd</a></span>
                            </div>
                        </div>
                        <div class="info-section">
                            <h3><i class="bi bi-clock"></i> Office Hours</h3>
                            <p><strong>Monday - Thursday:</strong> 9:00 AM - 5:00 PM</p>
                            <p><strong>Friday:</strong> 9:00 AM - 4:00 PM</p>
                            <p><strong>Saturday:</strong> 9:00 AM - 1:00 PM</p>
                            <p><strong>Sunday:</strong> Closed</p>
                        </div>
                    `
                }
            };

            if (cardData[type]) {
                document.getElementById('cardIcon').className = 'bi ' + cardData[type].icon;
                document.getElementById('cardTitleText').textContent = cardData[type].title;
                document.getElementById('cardBody').innerHTML = cardData[type].content;
                document.getElementById('modal').classList.add('active');
                document.querySelector('nav').classList.remove('active');
                document.querySelector('.search-bar').classList.remove('dropdown');
            }
        };

        // Initialize map
        let map = L.map('map', {
    zoomControl: false
}).setView([24.723367492217395, 90.43526292660201], 15);

        let currentMarker = L.marker([24.723367492217395, 90.43526292660201]).addTo(map);

        let normalLayer = L.tileLayer('https://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}', {
            maxZoom: 20,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
            attribution: '&copy; <a href="https://www.google.com/intl/en_us/help/terms_maps.html">Google Maps</a>',
        }).addTo(map);

        let satelliteLayer = L.tileLayer('https://{s}.google.com/vt?lyrs=s&x={x}&y={y}&z={z}', {
            maxZoom: 20,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
            attribution: '&copy; <a href="https://www.google.com/intl/en_us/help/terms_maps.html">Google Maps</a>',
        });

        let locations = [];


        

        const SHEET_ID = '1Nxn-BWGTBG7nbnn9FasxDhJPG-K9kHpKDMLN_GxOIeE';
        const SHEET_NAME = 'sheetplan';
        const CSV_URL = `https://docs.google.com/spreadsheets/d/e/2PACX-1vQjIO_QDslHivznpKOarzPsz7Hr81sPtyK-bArZyec8vcjjH8D0kRZf-Bw_zrvIb1V3WnYYUBRPHghN/pub?gid=0&single=true&output=csv`;



        fetch(CSV_URL)
            .then(response => response.text())
            .then(csvData => {
                const lines = csvData.trim().split('\n');
                locations = lines.slice(1).map(line => {
                    const values = line.split(',').map(v => v.trim());
                    return {
                        start_roll: parseInt(values[0]),
                        end_roll: parseInt(values[1]),
                        building: values[2],
                        floor: parseInt(values[3]),
                        room: values[4],
                        lat: parseFloat(values[5]),
                        lng: parseFloat(values[6]),
                        image_url: values[7] || ''
                    };
                }).filter(loc => !isNaN(loc.start_roll));
            });

        function checkInput(input) {
            const value = input.value.trim();
            if (value.length > 3) window.getLocation();
        }

        window.getLocation = function() {
            if (currentMarker) map.removeLayer(currentMarker);
            let inputRoll = parseInt(document.getElementById('idInput').value);
            if (isNaN(inputRoll)) return;

            const foundLocations = locations.filter(loc => inputRoll >= loc.start_roll && inputRoll <= loc.end_roll);
            
            if (foundLocations.length > 0) {
                foundLocations.forEach(location => {
                    map.setView([location.lat, location.lng], 10, {animate: true});
                    setTimeout(() => {
                        map.setView([location.lat, location.lng], 19, {animate: true});
                    }, 500);

                    currentMarker = L.marker([location.lat, location.lng]).addTo(map)
                        .bindPopup(`
                            ${location.image_url ? `<img src="${location.image_url}" alt="${location.building}" class="popup-image">` : ''}
                            <b>Building:</b> <strong>${location.building}</strong><br>
                            <b>Floor:</b> ${location.floor}<br>
                            <b>Room:</b> ${location.room}<br>
                            <button type="button" class="btn btn-primary btn-sm" onclick="getDirections(${location.lat}, ${location.lng})">Get Directions</button>
                        `);
                    currentMarker.openPopup();
                });
            }
        };

        function getDirections(destLat, destLng) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    const userLat = position.coords.latitude;
                    const userLng = position.coords.longitude;
                    const url = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${destLat},${destLng}&travelmode=walking`;
                    window.open(url, '_blank');
                }, () => {
                    const url = `https://www.google.com/maps/search/${destLat},${destLng}`;
                    window.open(url, '_blank');
                });
            }
        }

        
        /*const control = L.control({position: 'bottomright'});
        control.onAdd = function (map) {
            const div = L.DomUtil.create('div', 'leaflet-control-custom');
            div.innerHTML = `
                <button id="normalView" title="Normal View"><i class="bi bi-map"></i></button>
                <button id="satelliteView" title="Satellite View"><i class="bi bi-eye"></i></button>
            `;
            div.querySelector('#normalView').onclick = function () {
                if (map.hasLayer(satelliteLayer)) map.removeLayer(satelliteLayer);
                if (!map.hasLayer(normalLayer)) normalLayer.addTo(map);
            };
            div.querySelector('#satelliteView').onclick = function () {
                if (map.hasLayer(normalLayer)) map.removeLayer(normalLayer);
                if (!map.hasLayer(satelliteLayer)) satelliteLayer.addTo(map);
            };
            return div;
        };
        control.addTo(map);
        */

        document.getElementById('idInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') window.getLocation();
        });

        document.getElementById('modal').addEventListener('click', function(e) {
            if (e.target === this) window.closeCard();
        });

        document.addEventListener('DOMContentLoaded', function() {
            document.getElementById('userCount').textContent = 'Loading...';
            const today = new Date().toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'});
            document.getElementById('lastUpdated').textContent = `Last Updated: ${today}`;
        });