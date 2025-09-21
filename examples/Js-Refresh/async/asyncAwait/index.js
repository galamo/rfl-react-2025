console.log("Start");

// implement
// async function getPilotDataApi(aircraft: string){}

async function init() {
  try {
    const result = await getPilotDataApi("F-35");
    console.log(result);
    await getPilotDataApi("F-16");
  } catch (error) {
    console.log(error);
  }
}

init();

console.log("End");
