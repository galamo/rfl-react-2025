console.log("Script start")

function getPilotDataApi(cbFn, timeout){
    const defaultTimeout = timeout || 6000
    if(typeof cbFn !== 'function') return;
    setTimeout(() => {
        cbFn({ systemWork: true, type:"F-35", errors: []})
    }, defaultTimeout);
}

function callbackFunction(dataFromSystem){
        console.log(`System work1? : ${dataFromSystem.systemWork}`)
}

getPilotDataApi(callbackFunction)
getPilotDataApi((dataFromSystem)=>{
    console.log(`System work2? : ${dataFromSystem.systemWork}`)
})

getPilotDataApi((dataFromSystem)=>{
    console.log(`System work3? : ${dataFromSystem.systemWork}`)
},10000)

getPilotDataApi((dataFromSystem)=>{
    console.log(`System work4? : ${dataFromSystem.systemWork}`)
})


console.log("Script end")