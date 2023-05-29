// function Circle(radius) {
// 	this.radius = radius;
// 	// this.getArea = function () {
// 	// 	return Math.PI * this.radius ** 2;
// 	// };
// }
// Circle.prototype.getArea = function () {
// 	return Math.PI * this.radius ** 2;
// };
// const circle1 = new Circle(1);
// const circle2 = new Circle(2);
// console.log(circle1.getArea === circle2.getArea);
// console.log(circle1.getArea());
// console.log(circle2.getArea());

const person = { name: 'Lee' }; // 일반 객체는 프로토타입이 없다.

// console.log(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__'));
// console.log(Object.getPrototypeOf(person)); // [Object: null prototype] {}
// console.dir(person); // undefined
console.log(person.__proto__ === Object.prototype); // true
var arr = [1, 2];
console.log(arr.__proto__ === Array.prototype); // true
