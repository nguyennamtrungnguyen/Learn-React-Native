"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 1.  Create a Promise  that returns  the string  "Hello Async" after 2 seconds.
const lab1 = new Promise((res) => setTimeout(() => res("Hello Async"), 2000));
lab1.then((msg) => console.log(`Lab1: ${msg}`));
//# sourceMappingURL=index.js.map