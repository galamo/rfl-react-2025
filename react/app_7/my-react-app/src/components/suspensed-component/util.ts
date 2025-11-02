//@ts-nocheck
export function fetchResource() {
  let status = "pending";
  let result: any;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      status = "success";
      resolve("Sumulation only");
      result = "Sumulation only";
    }, 2000);
  });

  return {
    read() {
      console.log(status);
      if (status === "pending") throw promise; // Suspense catches this
      if (status === "error") throw result;
      return result;
    },
  };
}
