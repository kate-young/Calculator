var calculator = {
    var current_value = 0,
    
    var add = function(value) {
        this.current_value += value;
    },

    var multiply = function(value) {
        this.current_value += value;
    },
    
    var subtract = function(value) {
        this.current_value += value;
    },

    var divide = function(value) {
        this.current_value /= value;
    },

    var clear = function(value) {
        this.current_value = 0;
    }
}
