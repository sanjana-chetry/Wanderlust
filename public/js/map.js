maptilersdk.config.apiKey = mapApi;

const map = new maptilersdk.Map({
    container: 'map', // the ID of your div
    style: maptilersdk.MapStyle.STREETS, // Choose a map style
    center: listing.geometry.coordinates, // starting position [lng, lat] (New Delhi)
    zoom: 10 // starting zoom
});


const marker = new maptilersdk.Marker({color: "red"})
    .setLngLat(listing.geometry.coordinates)
    .setPopup(
        new maptilersdk.Popup({offset: 25}).setHTML(
            `<h4>${listing.title}</h4> <p>Exact loaction will be provided after booking</p>`))
    .addTo(map);

