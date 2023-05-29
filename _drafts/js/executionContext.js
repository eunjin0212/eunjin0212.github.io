function main() {
  var fn = function () {
    console.dir(fn)
  }
  fn();
}
main();

// inner :  undefined
// outer :  1
// global :  1
// 실행 순서 : outer -> inner -> global
var a = 1;
var outer = function(){
    var b = 2;
    var inner = function() {
        console.log(b);
        debugger
    };
    inner();
}
outer();