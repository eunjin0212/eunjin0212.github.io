var outer = function () {
	var a = 1;
	var inner = function () {
		return ++a;
	};
	return inner; // return 을 사용함으로서  outer 함수를 종료시킴
};
var outer2 = outer();
console.log(outer2());
console.log(outer2());
outer = null; // 필요성이 없어지면 기본형 데이터를 할당해 참조 카운트를 0으로 만들어 메모리 누수를 막음

(function () {
	var a = 0;
	var intervalId = null;
	var inner = function () {
		if (++a >= 10) {
			clearInterval(intervalId);
      inner = null; // 가비지 컬렉션의 대상이 될 수 있게 내부 함수가 참조하는 지역변수를 지워줌
		}
		console.log(a);
	};
	intervalId = setInterval(inner, 1000);
})();

// (function () {
// 	var count = 0;
// 	var button = document.createElement('button');
// 	button.innerText = 'click';
// 	button.addEventListener('click', function () {
// 		console.log(++count, 'times clicked');
// 	});
// 	document.body.appendChild(button);
// })();

// var fruits = ['apple', 'banana', 'peach'];

// var alertFruit = function (fruit) {
// 	return function () {
// 		console.log('your choice is ' + fruit);
// 	};
// };
// fruits.forEach(function (fruit) {
// 	setTimeout(alertFruit(fruit), 500);
// });

// var createCar = function () {
// 	var fuel = Math.ceil(Math.random() * 10 + 10);
// 	var power = Math.ceil(Math.random() * 3 + 2);
// 	var moved = 0;
// 	return {
// 		get moved() {
// 			return moved;
// 		},
// 		run: function () {
// 			var km = Math.ceil(Math.random() * 5);
// 			var wasteFuel = km / power;
// 			if (fuel < wasteFuel) {
// 				console.log('이동불가');
// 				return;
// 			}
// 			fuel -= wasteFuel;
// 			moved += km;
// 			console.log(km + ' km 이동 (총 ' + moved + ' km). 남은 연료 : ' + fuel);
// 		},
// 	};
// };

// var car = createCar();
// car.run()
// console.log(car.moved)

// var add = function () {
// 	// 부분 적용 함수 : n개의 인자를 받는 함수에 미리 m개만 넘겨 기억시켰다가 나중에 n - m 개의 인자를 넘기면 비로소 원래 함수의 실행 결과를 얻을 수 있게 함
// 	var result = 0;
// 	for (var i = 0; i < arguments.length; i++) {
// 		result += arguments[i];
// 	}
// 	return result;
// };
// var addPartial = add.bind(null, 1, 2, 3, 4, 5);
// console.log(addPartial(6, 7, 8, 9, 10));

// var debounce = function (eventName, func, wait) {
// 	// 부분 적용 함수 예제
// 	var timeoutId = null;
// 	return function (event) {
// 		var self = this;
// 		console.log(eventName, '이벤트 발생');
// 		clearTimeout(timeoutId);
// 		timeoutId = setTimeout(func.bind(self, event), wait);
// 	};
// };

// var moveHandler = function (e) {
// 	console.log(e, '마우스가 움직인다!');
// };
// document.body.addEventListener('mousemove', debounce('move', moveHandler, 500));

var curry3 = function (func) {
	return function (a) {
		return function (b) {
			return func(a, b);
		};
	};
};

var getMaxWith10 = curry3(Math.max)(10);
console.log(getMaxWith10(8))

// 클로저란?


// 클로저: 외부 함수 안에 있는 변수를 참조하는 내부 함수를 외부로 노출한다.

const Component = () => {
  const onClick = (title) => () => {
    setPage(title)
  }

  return Other(onClick("Main"), onClick("Banner"))
}
