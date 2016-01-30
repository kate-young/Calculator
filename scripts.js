var stack = {
    stac: new Array(),
    pop: function() {
        return this.stac.pop();
    },
    push: function(item) {
        this.stac.push(item)
        return item;
    },
    clear: function() {
        for(var i = 0; i < this.stac.length; i++) {
            this.pop();
        }
    },
    size: function() {
        return this.stac.length;
    },
}

var calculator = {
    add_value: function(value) {
        stack.push(value);
    },
    truncate: function(value) {
        if(value.toString().length > 11) {
            return value.substring(0, 11);
        } else {
            return value;
        }
    },
    update_value: function(value) {
        if (stack.size() == 0 || stack.size() == 2) {
            this.add_value(value);
        } else {
            stack.pop();
            stack.push(value);
        }
        return value;
    },
    negate: function() {
        value = stack.pop();
        value *= -1;
        return stack.push(value);
    },
    percent: function() {
        value = stack.pop();
        value *= .01;
        return stack.push(value);
    },
    clear: function() {
        stack.clear();
    },
    has_value: function() {
        return stack.size() > 0;
    },
    is_full: function() {
        return stack.size() >= 3;
    },
    has_operator: function() {
        return stack.size() === 2;
    },
    operate: function() {
        var second = parseFloat(stack.pop());
        var operator = stack.pop();
        var first = parseFloat(stack.pop());
        switch(operator) {
        case "+": 
            return stack.push(first + second);
            break;
        case "x":
            return stack.push(first * second);
            break;
        case "-":
            return stack.push(first - second);
            break;
        case "/":
            return stack.push(first / second);
            break;
        default:
            this.clear();
        }
    }
}


$(document).ready(function() {
    var $screen = $("#screen");
    var clearScreen = false;
    var changeScreen = function(value) {
        if(value > 1000000) {
            value = parseFloat(value);
            $screen.text(value.toExponential().toString())
        }
        else if( value.toString().length > 11) {
            $screen.text(value.toString().substring(0,11));
        } else {
            $screen.text(value);
        }
    }
    var clear = function() {
        changeScreen("");
        clearScreen = false;
    }
    $(".number").on("click", function() {
        if(clearScreen) {
            clear();
        }
        var value = $screen.text() + $(this).text();
        changeScreen(calculator.update_value(value));
    });

    $("#dot").on("click", function() {
        changeScreen($screen.text() + $(this).text());
    });

    $(".operator").on("click", function() {
        if(calculator.has_operator()) {
            return;
        }
        if(calculator.is_full()) {
            changeScreen(calculator.operate());
        }
        calculator.add_value($(this).text());
        clearScreen = true;
    });

    $("#equals").on("click", function() {
        changeScreen(calculator.operate());
    });
    
    $("#clear").on("click", function() {
        calculator.clear();
        clear();
    });

    $("#negate").on("click",function() {
        changeScreen(calculator.negate());
    });

    $("#percent").on("click",function() {
        changeScreen(calculator.percent()); 
    });
});
