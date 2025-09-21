console.log("Script start");

function getPilotDataApi(callbackFunction) {
    setTimeout(() => {
        if (typeof callbackFunction === 'function') {
            callbackFunction("here is your data!")
        }
    }, 5000);
}


getPilotDataApi((data) => {
    console.log(data)
});
getPilotDataApi((data) => {
    console.log(data)
});

getPilotDataApi((data) => {
    console.log(data)
    getPilotDataApi((data) => {
        console.log(data)
        getPilotDataApi((data) => {
            console.log(data)
            getPilotDataApi((data) => {
                console.log(data)
            });
        });
    });
});

getPilotDataApi((data) => {
    console.log(data)
});




console.log("Script end");
