// what will be printed 
console.log("999")
async function getApi1() {
    console.log("111")
    const result = await fetch("http://rf1.co.il")
    console.log("767")
}
async function getApi2() {
    console.log("222")
    const result = await fetch("http://rf2.co.il")
    console.log("555")
}
getApi2()
getApi1()
console.log("521")
// 999 > 222 > 111 > 521 > 767 || 555
