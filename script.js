
        window.toggleMenu = function() {
            const nav = document.querySelector('nav');
            const searchBar = document.querySelector('.search-bar');
            nav.classList.toggle('active');
            searchBar.classList.toggle('dropdown');
        };


function showCard(type) {
  const pages = {
    stall: {
      title: "ICT Cell HelpDesk",
      content: `
        <iframe
          src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTFvRj9-ZlYHM_z1FMo0At69ItLot2asoT5RWFDpld19tQoKJoUcPrcIYC0nPf4t6nt6jYvAHL6WgsL/pubhtml?widget=true&headers=false"
          width="100%"
          height="450"
          frameborder="0">
        </iframe>
      `
    },
    helpline: {
      title: "Helpline",
      content: `
        <iframe
          src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQfnYGS-1dFwf2g63PSZpZT3-YH5zgjZDQLL3CaRgaGBdyVECl20RsD29zXIm8sbBVecAZdtUR_3U39/pubhtml?widget=true&headers=false"
          width="100%"
          height="450"
          frameborder="0">
        </iframe>
      `
    }
  };

  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");
  const modalEl = document.getElementById("contentModal");

  if (!pages[type]) return;

  modalTitle.innerHTML = pages[type].title;
  modalBody.innerHTML = pages[type].content;

  new bootstrap.Modal(modalEl).show();
}




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
                        floor: values[3],
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
            <div class="popup-card">
                ${location.image_url ? `
                    <div class="popup-image-wrapper">
                        <img src="${location.image_url}" alt="${location.building}">
                        <div class="popup-bottom-info">
                            <p style="font-weight: bold;">${location.building}</p>
                            <p>Floor ${location.floor} • Room ${location.room}</p>
                        </div>
                    </div>
                ` : `
                    <div class="popup-content">
                        <p style="font-weight: bold;" class="popup-title">${location.building}</p>
                        <p>Floor ${location.floor} • Room ${location.room}</p>
                    </div>
                `}

                <div class="popup-footer">
                    <button class="popup-btn"
                        onclick="getDirections(${location.lat}, ${location.lng})">
                        Get Directions
                    </button>
                </div>
            </div>
        `, { maxWidth: 380 })
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

