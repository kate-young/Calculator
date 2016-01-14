var calculator = {
    current_value: 0,
    add: function(value) {
        this.current_value += value;
    },
    multiply: function(value) {
        this.current_value += value;
    },
    subtract: function(value) {
        this.current_value += value;
    },
    divide: function(value) {
        this.current_value /= value;
    },
    clear: function() {
        this.current_value = 0;
    },
    operate: function(value, operator) {
        switch(operator) {
        case "+": 
            this.add(value);
            break;
        case "*":
            this.multiply(value);
            break;
        case "/":
            this.divide(value);
            break;
        default:
            this.clear();
        }
    }
}
$(document).ready(function() {
    $(".number").on("click", function() {
        calculator.current_value = parseInt($(this).text());
    });
});
