
console.log("Start")
function getPilotDataApi(type){
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            if(type === "F-35"){
                resolve({ systemWork: true, type:"F-35", errors: []})
            }else{
                reject("Type is not valid")
            }
        }, 6000);
    })
}
async function init(){
    try {
        const result = await getPilotDataApi("F-35") 
        console.log(result);
        await getPilotDataApi("F-16") 
    } catch (error) {
        console.log(error)
    }
}

init()
init()
init()
init()
init()

console.log("End")