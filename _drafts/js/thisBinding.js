// const circle = {
// 	radius: 5,
// 	getDiameter() {
// 		return 2 * this.radius;
// 		// this는 circle 을 가리킨다
// 	},
// };
// console.log('circle :', circle.getDiameter());

// function Circle(radius) {
// 	this.radius = radius;
// 	// this는 생성자 함수가 생성할 인스턴스를 가리킨다
// }

// Circle.prototype.getDiameter = function () {
// 	return 2 * this.radius;
// 	// this 생성자 함수가 생성할 인스턴스를 가리킨다
// };

// const circleInstance = new Circle(5);
// // 인스턴스 생성

// console.log('circleInstance :', circleInstance.getDiameter());

// console.log('global :', this);
// // node thisBinding.js 로 봤을 때 빈 객체가 나온다
// // 이유는 웹 브라우저와 node 자바스크립트 런타임 환경이 달라서이다
// // 웹 브라우저에서의 전역 this는 window 객체,
// // node.js 상에서는 전역 this는 module 객체를 가리킨다
// // 브라우저에서 콘솔과 터미널에서 콘솔 결과가 다른 이유!
// // https://haeunyah.tistory.com/86
// const global = 0;
// function square(number) {
// 	console.log('square :', this);
// 	// 일반 함수 내부에서는 this 는 window를 가리킨다.
// 	return number * number;
// }
// square(2);

// const person = {
// 	name: 'kim',
// 	getName() {
// 		console.log('person :', this);
// 		// 메서드 내부에서는 호출한 객체를 가리킨다
// 		return this.name;
// 	},
// };

// console.log(person.getName());

// function Person(name) {
// 	this.name = name;
// 	// 생성자 함수 내부에서 this는 생성자 함수가 생성할 인스턴스를 가리킨다
// 	console.log('Person construtor: ', this);
// }

// const me = new Person('kim');

// const foo = function () {
// 	console.dir(this);
// };
// foo(); // 일반 함수 호출 : window

// const obj = { foo };
// obj.foo(); // 매서드 호출, 함수를 obj의 프로퍼티 값으로 할당하여 호출 obj { foo: [Funtion: foo] }

// new foo(); // 생성자 함수로 호출, new 연산자와 함께 생성자 함수로 호출 foo {}

// const bar = { name: 'bar' };
// foo.call(bar); // { name: 'bar' }
// foo.apply('ej'); // [String: 'ej']
// foo.bind(['bind'])(); // [ 'bind' ]
// // Funtion.prototype.method (bind, call, apply)에 의한 간접 호출 내부 this는 인수에 의해 결정됨

// function foo() {
// 	// 일반 함수로 호출했기 때문에 전역객체가 바인딩 된다
// 	console.log('foo :', this); // foo : window
// 	function bar() {
// 		console.log('bar :', this); // bar : window
// 	}
// 	bar();
// }
// foo();

// function strictFoo() {
// 	'use strict';
// 	// 엄격 모드에서는 window가 아닌 undefined
// 	// this 객체의 프로퍼티나 메서드를 참조하기 위한 자기 참조 변수이기 때문에
// 	// 객체를 생성하지 않는 일반 함수는 의미가 없다
// 	console.log('strictFoo :', this); // strictFoo : undefined
// 	function strictBar() {
// 		console.log('strictBar :', this); // strictBar : undefined
// 	}
// 	strictBar();
// }
// strictFoo();

// var value = 1;
// // var 로 선언한 전역변수는 전역객체의 프로퍼티지만 const 로 선언한 전역 변수는 전역객체의 프로퍼티가 아니다.

// const obj = {
// 	value: 100,
// 	foo() {
// 		console.log('foo :', this); // foo : { value: 100, foo: [Function: foo] }
// 		console.log('foo value :', this.value); // foo value : 100

// 		// 메서드 내부 함수나 콜백 함수의 this를 메서드와 일치 시키는 방법
// 		// - 변수에 this 할당
// 		const that = this;
// 		setTimeout(function () {
// 			console.log('callback function variable this :', that.value); //callback function variable this : 100
// 		}, 100);

// 		// - Function.prototype.call, Function.prototype.apply, Function.prototype.bind 메서드 이용
// 		setTimeout(
// 			function () {
// 				console.log('bind method this :', this.value); // bind method this : 100
// 			}.bind(this),
// 			100
// 		);

// 		// - 화살표 함수를 이용 (화살표 함수 내부 this는 상위 스코프의 this를 가졌다)
// 		setTimeout(() => console.log('arrow function this :', this.value), 100); // arrow function this : 100

// 		function bar() {
// 			console.log('bar :', this); // bar : window
// 			console.log('bar value :', this.value); // bar value : 1 (browser) undefined (node)
// 		}
// 		bar();
// 	},
// };
// obj.foo();

// const person = {
// 	name: 'Lee',
// 	getName() {
//     // person 객체에 포함이 아닌 독립적으로 존재한다
//     // 메서드 내부의 this는 프로퍼티로 메서드를 가리키고 있는 객체와 상관 없다 누가 호출했는지가 더 중요함
//     // getName라는 프로퍼티는 함수 객체를 가리키고 있을 뿐!
// 		return this.name;
// 	},
// };
// console.log('person :', person.getName()); // person : Lee
// // person 객체를 바인딩 시킴

// const anotherPerson = {
// 	name: 'Kim',
// };
// anotherPerson.getName = person.getName;
// console.log('anotherPerson :', anotherPerson.getName()); // anotherPerson : Kim
// // anotherPerson 객체를 바인딩 시킴

// const getName = person.getName;
// console.log('global :', getName()); // global : '' (browser) undefined (node)
// // 일반 함수로 호출된 getName 함수 내부 this.name은 브라우저 환경에서 window.name과 같음

// class Person {
// 	constructor(name) {
// 		this.name = name;
// 	}
// }
// Person.prototype.getName = function () {
// 	return this.name;
// };

// Person.prototype.name = 'Kim';
// console.log('Person :', Person.prototype.getName()); // Person : Kim

// const me = new Person('Lee');
// console.log('me :', me.getName()); // me : Lee

// function Circle(radius) {
// 	this.radius = radius;
// 	this.getDiameter = function () {
// 		return 2 * this.radius;
// 	};
// }
// const circle1 = new Circle(5);
// const circle2 = new Circle(10);

// console.log('circle1 :', circle1.getDiameter()); // circle1 : 10
// console.log('circle2 :', circle2.getDiameter()); // circle2 : 20

// const circle3 = Circle(15);
// console.log('circle3 :', circle3); // 일반 함수로 호출하면 반환문이 없으므로 circle3 : undefined
// console.log('radius :', radius); // 일반 함수로 호줄된 Circle 내부의 this는 전역객체를 가리킴 radius : 15

// function getThisBinding() {
// 	return this;
// }

// const thisArg = { a: 1 };
// console.log(getThisBinding()); // window
// console.log('apply :', getThisBinding.apply(thisArg)); // apply : { a: 1 }
// console.log('call :', getThisBinding.call(thisArg)); // call : { a: 1 }

// var func = function (a, b) {
//   console.log(this, a, b);
// }

// var b = {};

// var func1 = func.bind({x:1})
// b.func = func1;
// b.func();
// var foo = {
// 	bar: 1,
// 	func: setTimeout(() => { console.log(this) }, 500)
// }

// var Foo = function (value) {
// 	this.value = value;
// };

// var foos = new Foo(1);
// console.log(foos);

// var foo = function (a, b, c) {
// 	console.log(this, a, b, c);
// };
// foo.apply('this', [1, 2, 3]); // [String: 'this'] 1 2 3

var func = function (a, b, c, d) {
	console.log(this, a, b, c, d);
};
var bindFunc = func.bind({ x: 1 }, 2, 3);
bindFunc(4, 5);
