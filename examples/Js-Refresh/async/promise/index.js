console.log("Script start")

function getPilotDataApi(type){
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            if(type === "F-35"){
                resolve({ systemWork: true, type:"F-35", errors: []})
            }else{
                reject("Type is not valid")
            }
        }, 1000);
    })
}

getPilotDataApi("F-16").then((dataFromPromise)=>{
    console.log(dataFromPromise)
}).catch((error)=>{
    console.log(error)
})



console.log("Script end")