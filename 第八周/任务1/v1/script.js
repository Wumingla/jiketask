function test() {
    alert(2);
    return "me test";
}

Function.prototype.before = function(fn) {
    var __self = this;
    return function() {
        fn.apply(this.arguments);
        return __self.apply(__self, arguments);
    }

}

Function.prototype.after = function(fn) {
    var __self = this;
    return function() {
    		var result = __self.apply(__self, arguments);
    		if(result==false){
    			return false;
    		}
        	fn.apply(this.arguments);
        	return result;
    }

}

test.after(function(){
    alert(3);
}).before(function(){
	alert(1);
})();

// test.after(function(){
// 	alert(3);
// });
