console.log("Start");


function getPilotDataApi(param) {
  return new Promise((resolve, reject) => {
    if (!param) reject("Missing paramter!")
    setTimeout(() => {
      resolve("here is your data!")
    }, 5000);
  })
}


async function init() {
  try {
    const result = await getPilotDataApi("F-35");
    const multipleResult = await Promise.all([getPilotDataApi("a"), getPilotDataApi("a")])
    console.log(multipleResult)
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

init();



console.log("End");
