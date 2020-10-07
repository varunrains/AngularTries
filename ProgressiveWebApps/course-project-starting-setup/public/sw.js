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
//SW will act as a proxy and every request goes through this
self.addEventListener('fetch', function (event) {
    console.log('[Service Worker] Fetching Something ...', event);
    //if you do event.respondWith(null) ==> Application wont work
    //as you are not loading all the resources
    //fetch is a promise and it does the same thing here to load the resources by default
    //event.respondWith(fetch(event.request));
});