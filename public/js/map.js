maptilersdk.config.apiKey = mapApi;

const map = new maptilersdk.Map({
    container: 'map', // the ID of your div
    style: maptilersdk.MapStyle.STREETS, // Choose a map style
    center: [77.2090, 28.6139], // starting position [lng, lat] (New Delhi)
    zoom: 10 // starting zoom
});
