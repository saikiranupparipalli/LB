// 01_sync_vs_async.js
// Phase 1: Understanding synchronous vs asynchronous execution in JavaScript.

console.log("1.script started");
function simulateHeavyTask(millisec) {
  const start = Date.now();
  console.log(new Date(start));
  while (Date.now() - start < millisec) {
    // console.log("function sync"); what happens if i console this statement?
  }
}
console.log("2. Starting 3-second heavy synchronous work...");
simulateHeavyTask(3000);
console.log("3. Heavy work finished!")
console.log("4. Script ended")

console.log("script 1");
function simulateHeavyTaskAsync() {
  setTimeout(() => {
    console.log("Hey, im timeOut");
  }, 3000);
}
console.log("script 2");
console.log("script 3");
simulateHeavyTaskAsync()