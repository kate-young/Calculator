var calculator = {
    first_value: null,
    second_value: null,
    add: function() {
        return this.first_value + this.second_value;
    },
    multiply: function() {
        return this.first_value * this.second_value;
    },
    subtract: function() {
        return this.first_value - this.second_value;
    },
    divide: function() {
        return this.first_value / this.second_value;
    },
    clear: function() {
        this.first_value = 0;
        this.second_value= 0;
        this.result = 0;
    },
    operate: function(operator) {
        switch(operator) {
        case "+": 
            return this.add();
            break;
        case "x":
            return this.multiply();
            break;
        case "-":
            return this.subtract();
            break;
        case "/":
            return this.divide();
            break;
        default:
            this.clear();
        }
    }
}


$(document).ready(function() {
    var $screen = $("#screen");
    var clear = false;
    var current_operator = null;
    var clearScreen = function() {
        if(clear) {
            $screen.text("");
            clear = false;
        }
    }

    $(".number").on("click", function() {
        clearScreen();
        if(current_operator) {
            calculator.second_value = parseFloat($screen.text() + $(this).text());
            $screen.text(calculator.second_value);
        } else {
            calculator.first_value = parseFloat($screen.text() + $(this).text());
            $screen.text(calculator.first_value);
        }
    });

    $("#dot").on("click", function() {
        clearScreen();
        if(!calculator.first_value) {
            first_value = 0;
        }
        $screen.text($screen.text() + ".");
    });

    $(".operator").on("click", function() {
        if(calculator.first_value) {
           current_operator = $(this).text(); 
           clear = true;
        }        
    });

    $("#equals").on("click", function() {
       if(calculator.second_value) {
          $screen.text(calculator.operate(current_operator));
       } 
       calculator.first_value = parseFloat($screen.text());
       calculator.second_value = null;
       current_operator = null;
       clear = true;
    });
    
    $("#clear").on("click", function() {
        calculator.clear();
        $screen.text("");
    });

    $("#negate").on("click",function() {
       if(calculator.second_value) {
          calculator.second_value *= -1; 
          $screen.text(calculator.second_value); 
       } else {
          calculator.first_value *= -1;
          $screen.text(calculator.first_value);
       }
    });

    $("#percent").on("click",function() {
        if(current_operator) {
            calculator.second_value = parseFloat($screen.text() + $(this).text());
            calculator.second_value /= 100;
            $screen.text(calculator.second_value);
        } else {
            calculator.first_value = parseFloat($screen.text() + $(this).text());
            calculator.first_value /= 100;
            $screen.text(calculator.first_value);
        }
    });
});
