// 3초 뒤 실행 이 완료되지 않아도 바로 실행 됨
(async () => {
  function test() {
    console.log("3초뒤 실행");
  }
  setTimeout(test, 3000);
  console.log("바로 실행");
})();

// 3초 뒤 실행이 완료 되고 실행되게 하고 싶다...
(async () => {
  function test() {
    console.log("3초뒤 실행");
  }
  var promise = new Promise(function (resolve) {
    setTimeout(() => {
      test(), resolve();
    }, 3000);
  });
  promise.then(() => {
    console.log("3초 뒤 실행 되고 실행");
  });
})();

// 좀더 쉽게 하고 싶다...
(async () => {
  function test() {
    console.log("3초뒤 실행");
  }
  await new Promise(function (resolve) {
    setTimeout(() => {
      test(), resolve();
    }, 3000);
  });
  console.log("3초 뒤 실행 되고 실행");
})();

// 더 쉽게....
// 비동기적으로 실행 가능한 함수.
async function test() {
  await new Promise((result) => {
    setTimeout(() => {
      test(), resolve();
    }, 3000);
  });
}

(async () => {
  function test() {
    console.log("3초뒤 실행");
  }
  await new Promise(function (resolve) {
    setTimeout(() => {
      test(), resolve();
    }, 3000);
  });
  console.log("3초 뒤 실행 되고 실행");
})();
