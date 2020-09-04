//You cannot access DOM here as there is no DOM in SW :)
self.addEventListener('install', function (event) {
    console.log('[Service Worker] Installing Server Worker ...', event);
});

self.addEventListener('activate', function (event) {
    console.log('[Service Worker] Activating Server Worker ...', event);
    //The below line makes sure that the SW is loaded and registered correctly
    //This can be ommited
    return self.clients.claim();
});

//Fetch event is emitted when load assests like  js files/images/css files
//Also trigger when we manually trigger JS files
self.addEventListener('fetch', function (event) {
    console.log('[Service Worker] Fetching Something ...', event);
});