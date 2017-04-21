'use strict';

module.exports = function(expressValidator) {
    expressValidator.validator.extend('isArray', function(str) {
        return Array.isArray(str);
    });
}
