var defferedPrompt;

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

window.addEventListener('beforeinstallprompt', function(event) {
    console.log('beforeinstallprompt fired');
    event.preventDefault();
    defferedPrompt = event;
    return false;
});

//var promise = new Promise(function(resolve, reject) {
//    setTimeout(function() {
//        resolve('Aithu promise 3 second admele');
//    }, 3000);
//});

//promise.then(function (result) { return console.log(result); }).then(function (result1) { console.log(result1); });