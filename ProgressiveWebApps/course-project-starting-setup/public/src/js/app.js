//if serviceWorker is present in the navigator object ?
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/sw.js')
        .then(function () {
            console.log('Service Worker Registered!');
        }); //This will tell the browser that this is a
    //special file which will run in the background
    //This registration process takes some time (promise)
}