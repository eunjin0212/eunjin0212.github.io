// var count = 0;
// var cbFunc = function () {
// 	console.log(count);
// 	if (++count > 4) clearInterval(timer);
// };
// var timer = setInterval(cbFunc, 300);
// console.log(timer);

// var newArr = [10, 20, 30].map(function (cur, idx) {
// 	console.log(cur, idx);
// 	return cur + 5;
// });
// console.log(newArr);

// var newArr2 = [10, 20, 30].map(function (idx, cur) {
// 	return cur + 5;
// });
// console.log(newArr2);

// Array.prototype.map = function (callback, thisArg) {
// 	var mappedArr = [];
// 	for (let i = 0; i < this.length; i++) {
// 		var mappedValue = callback.call(thisArg || window, this[i], i, this);
//     // 제어권을 넘겨받을 코드에서 call 매서드의 첫번째 인자에 콜백함수 내부에서의 this가 될 대상을 명시적으로 바인딩 하기 때문이다
//     // map 메서드는 this인자를 넘겨주지 않으면 window객체를 this로 지정한다.
// 		mappedArr[i] = mappedValue;
// 	}
//   return mappedArr;
// };

// var obj = {
// 	vals: [1, 2, 3],
// 	logValues: function (v, i) {
// 		console.log('logValues :', this, v, i);
// 	},
// };

// obj.logValues(1, 2);
// [4, 5, 6].forEach(obj.logValues.bind(obj));
// // bind를 사용하면 콜백함수 내부의 this에 다른 this를 지정해줄 수 있다.

// new Promise(function (resolve) {
// 	setTimeout(function () {
// 		var name = '에스프레소';
// 		console.log(name);
// 		resolve(name);
// 	}, 500);
// }).then(function (prevName) {
// 	return new Promise(function (resolve) {
// 		setTimeout(function () {
// 			var name = prevName + '아메리카노';
// 			console.log(name);
// 			resolve(name);
// 		}, 500);
// 	}).then(function (prevName) {
// 		return new Promise(function (resolve) {
// 			setTimeout(function () {
// 				var name = prevName + '카페모카';
// 				console.log(name);
// 				resolve(name);
// 			}, 500);
// 		}).then(function (prevName) {
// 			return new Promise(function (resolve) {
// 				setTimeout(function () {
// 					var name = prevName + '카페라떼';
// 					console.log(name);
// 					resolve(name);
// 				}, 500);
// 			});
// 		});
// 	});
// });

// var addCoffee = function (name) {
// 	return new Promise(function (resolve) {
// 		setTimeout(function () {
// 			resolve(name);
// 		}, 500);
// 	});
// };

// addCoffee('에스프레소')()
// 	.then(addCoffee('아메리카노'))
// 	.then(addCoffee('카페모카'))
// 	.then(addCoffee('카페라떼'));

// var addCoffee = function (prevName, name) {
// 	setTimeout(function () {
// 		coffeeMaker.next(prevName ? prevName + ',' + name : name);
// 	}, 500);
// };

// var coffeeGenerator = function* () {
// 	var espresso = yield addCoffee('', '에스프레소');
// 	console.log(espresso);
// 	var americano = yield addCoffee(espresso, '아메리카노');
// 	console.log(americano);
// 	var mocha = yield addCoffee(americano, '카페모카');
// 	console.log(mocha);
// 	var latte = yield addCoffee(mocha, '카페라떼');
// 	console.log(latte);
// };

// var coffeeMaker = coffeeGenerator();
// coffeeMaker.next();
// var addCoffee = function (name) {
// 	return new Promise(function (resolve) {
// 		setTimeout(function () {
// 			resolve(name);
// 		}, 500);
// 	});
// };
// var coffeeMaker = async function () {
// 	var coffeeList = '';
// 	var _addCoffee = async function (name) {
// 		coffeeList += (coffeeList ? ',' : '') + (await addCoffee(name));
// 	};
// 	await _addCoffee('에스프레소');
// 	console.log(coffeeList);
// 	await _addCoffee('아메리카노');
// 	console.log(coffeeList);
// 	await _addCoffee('카페모카');
// 	console.log(coffeeList);
// 	await _addCoffee('카페라떼');
// 	console.log(coffeeList);
// };
// coffeeMaker();

function A() {
  return new Promise((res, rej) => {
    console.log("A'")
    res("await A")
  })
}

function B() {
  setTimeout(() => {
    console.log("B")
  }, 0)
}

function C() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      console.log("C'")
      res("C")
      D();
    }, 0)
  })
}

function d() {
  return new Promise((res, rej) => {
    console.log("d")
    res("D")
  })
}

async function D() {
  setTimeout(() => {
    console.log("D'")
  }, 1)

  console.log(await d())
}

async function main() {
  console.log("START")
  console.log('console', await A())
  B()
  C()
  await A()
  console.log("END")

}

console.log("SCRIPT START")
main()
console.log("SCRIPT END")


