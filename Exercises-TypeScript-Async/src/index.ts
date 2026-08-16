//      ===== A. Basics with Promise =====
// Cấu trúc của 1 promise
// const promise = new Promise<Type>((resolve, reject) => {
//   // Xử lý bất đồng bộ

//   resolve(value); //Thành công
//   // reject(errot); thất bại
// });
// promise.then((result) => {
//   // Nhận kết quả
// });

// 1.  Create a Promise  that returns  the string  "Hello Async" after 2 seconds.
// const lab1 = new Promise((res) => setTimeout(() => res("Hello Async"), 2000));
// lab1.then((msg) => console.log(`Lab1: ${msg}`));
const lab1 = new Promise<string>((resolve, reject) => {
  setTimeout(() => {
    resolve("Hello Async");
  }, 2000);
});

lab1.then((message) => {
  console.log(`Lab1: ${message}`);
});
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

// 2.  Write a function  that returns  a Promise  resolving  with  the number  10 after  1 second.
// const lab2 = new Promise((res) => setTimeout(() => res(10), 1000));
// lab2.then((msg) => console.log(`Lab2: ${msg}`));
const lab2 = (): Promise<number> => {
  return new Promise<number>((resolve, reject) => {
    setTimeout(() => {
      resolve(10);
    }, 1000);
  });
};

lab2().then((number) => {
  console.log(`Lab2: ${number}`);
});
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

// 3.  Write a function  that rejects a Promise  with  the error  "Something went wrong" after  1 second.
// const lab3 = new Promise((_, rej) =>
//   setTimeout(() => rej("Something went wrong"), 1000),
// );
// lab3.catch((msg) => console.log(`Lab3: ${msg}`));
const lab3 = (): Promise<never> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("Something went wrong");
    }, 1000);
  });
};
lab3().catch((error) => {
  console.log(`Lab3: ${error}`);
});
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

// 4.  Use  .then() and  .catch() to handle  a Promise  that returns  a random  number.

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

// 5.  Create a function  simulateTask(time) that returns  a Promise  resolving  with  "Task done" after  time ms.

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

// 6.  Use  Promise.all() to run  3 simulated  Promises  in paralle l  and print  the result.

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

// 7.  Use  Promise.race() to return  whichever  Promise  resolves  first.

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

// 8.  Create a Promise  chain:  square the number  2, then double  it, then add 5.

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

// 9.  Write a Promise  that reads an array after 1 second and filters  even numbers.

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

// 10.  Use  .finally() to l og  "Done" when  a Promise  finishes  (success or failure).

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

// B. Async/Await
// 11.  Convert  Exercise  1 into  async/await.

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

// 12.  Write an async function  that calls  simulateTask(2000) and logs  the result.

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

// 13.  Handle  errors using  try/catch with  async/await.

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

// 14. Write an async function  that takes a number,  waits  1 second, and returns  the number  × 3.

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

// 15.  Call  multiple  async functions  sequentially  using  await.

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

// 16.  Call  multiple  async functions  in  parallel  using  Promise.all().

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

// 17.  Use  for await...of to iterate  over an array of Promises.

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

// 18. Write an async  function  fetchUser(id) that simulates  an API call  (resolves  a user object after 1 second).

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

// 19.  Create an async function  fetchUsers(ids: number[]) that calls  fetchUser for each ID.

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

// 20.  Add a timeout:  if  the API call  takes more than  2 seconds, throw  an error.

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

// C. Fetch API & Simulated I/O
// 21.  Use  fetch to get data from  a public  API (e.g., https://jsonplaceholder.typicode.com/todos/1).

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

// 22.  Call  the API multiple  times  and log  the results.

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

// 23.  Write an async function  that fetches  a list  of todos and filters  out those that are not completed.

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

// 24.  Write an async function  postData() that sends a POST request to a test API.

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

// 25.  Create a function  downloadFile that simulates  downloading  a file  in 3 seconds and logs when  done.

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

// 26.  Use async/await  with  setTimeout to simulate  a 5- second wait.

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

// 27.  Write a function  fetchWithRetry(url, retries) that retries  up to  retries times  if the API call  fails.

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

// 28.  Write an async function  batchProcess() that processes 5 async tasks at once (use Promise.all).

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

// 29.  Write an async function  queueProcess() that processes tasks sequenti ally  in  a queue.

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

// 30.  Use async/await  + Promise.allSettled()  to handle  multiple  API calls  and display  their success/failure  status.
