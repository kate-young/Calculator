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
        stac = new Array();
    },
    size: function() {
        return this.stac.length;
    }
}

var calculator = {
    add_value: function(value) {
        stack.push(value);
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
        stack.push(value);
    },
    percent: function() {
        value = stack.pop();
        value *= .01;
        stack.push(value);
    },
    clear: function() {
        stack.clear();
    },
    operate: function() {
        var second = stack.pop();
        var operator = stack.pop();
        var first = stack.pop();
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
    var clearScreen = function() {
        calculator.clear();
        $screen.text("");
    }
    $(".number").on("click", function() {
        var value = parseFloat($screen.text() + $(this).text());
        $screen.text(calculator.update_value(value));
    });

    $("#dot").on("click", function() {
        var value = parseFloat($screen.text() + $(this).text());
        calculator.update_value(value); 
    });

    $(".operator").on("click", function() {
        calculator.add_value($(this).text());
        $screen.text("");
    });

    $("#equals").on("click", function() {
        $screen.text(calculator.operate());
    });
    
    $("#clear").on("click", function() {
        calculator.clear();
        $screen.text("");
    });

    $("#negate").on("click",function() {
        $sceen.text(calculator.negate());
    });

    $("#percent").on("click",function() {
        $screen.text(calculator.percent()); 
    });
});
