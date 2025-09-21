console.log("Script start");

function getPilotDataApi(param) {
    return new Promise((resolve, reject) => {
        if (!param) reject("Missing paramter!")
        setTimeout(() => {
            resolve("here is your data!")
        }, 5000);
    })
}

getPilotDataApi("F-16")
    .then((dataFromPromise) => {
        console.log(dataFromPromise);
    })
    .catch((error) => {
        console.log(error);
    });

getPilotDataApi()
    .then((dataFromPromise) => {
        console.log(dataFromPromise);
    })
    .catch((error) => {
        console.log(error);
    })

console.log("Script end");
