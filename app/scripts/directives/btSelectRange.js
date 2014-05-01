(function(Boomstrap) {
  'use strict';

  Boomstrap.directive('btSelectRange', function($window, $timeout, $filter) {
    return {
      restrict: 'E',
      require: 'ngModel',
      templateUrl: function(tElement, tAttrs) {
        // Set the template to number by default
        var templateUrl = 'template/select-range/number.tpl.html';
        if (tAttrs && tAttrs.rangeType) {
          var rangeType = tAttrs.rangeType;
          if (rangeType === 'money') {
            templateUrl = 'template/select-range/money.tpl.html';
          }
        }
        return templateUrl;
      },
      replace: true,
      scope: {
        values: '='
      },
      link: function(scope, iElement, iAttrs, ngModel) {
        scope.minimum = {
          value: iCtrl.$modelValue.minimum
        };
        scope.maximum = {
          value: iCtrl.$modelValue.maximum
        };

        var validateMinMax = function(flippingFn) {
          // Normalize values first
          if(!angular.isNumber(scope.minimum.value)) {
            scope.minimum.value = null;
          }
          if(!angular.isNumber(scope.maximum.value)) {
            scope.maximum.value = null;
          }

          if(scope.maximum.value !== null && scope.minimum.value !== null && scope.maximum.value < scope.minimum.value && flippingFn) {
            flippingFn();
          }
        };

        var addValueToValues = function(value) {
          var parsedValue = value.replace(/[^0-9]+/, '');
          parsedValue = parseInt(parsedValue, 10);
          if (!isNaN(parsedValue) && $scope.values.indexOf(parsedValue) === -1) {
            $scope.values.unshift(parsedValue);
          }
        };

        scope.$watch(function() { return iCtrl.$modelValue.minimum; }, function(newVal, oldVal) {
          if (newVal !== oldVal) {
            scope.minimum.value = iCtrl.$modelValue.minimum;
          }
        });

        scope.$watch(function() { return iCtrl.$modelValue.maximum; }, function(newVal, oldVal) {
          if (newVal !== oldVal) {
            scope.maximum.value = iCtrl.$modelValue.maximum;
          }
        });

        scope.$watch('minimum', function(newMin, oldMin) {
          if (newMin !== oldMin) {
            validateMinMax(function() {
              // Pass in the flipping function if the min/max order is invalid.
              scope.maximum.value = scope.minimum.value;
            });
            addValueToValues(scope.minimum.value);

            iCtrl.$modelValue.minimum = scope.minimum.value;
            iCtrl.$setViewValue(iCtrl.$viewValue);
          }
        });

        scope.$watch('maximum', function(newMax, oldMax) {
          if (newMax !== oldMax) {
            validateMinMax(function() {
              // Pass in the flipping function if the min/max order is invalid.
              scope.minimum.value = scope.maximum.value;
            });
            addValueToValues(scope.maximum.value);

            iCtrl.$modelValue.maximum = scope.maximum.value;
            iCtrl.$setViewValue(iCtrl.$viewValue);
          }
        });

        scope.getValues = function(newValue) {
          var newValues = $scope.values.slice();
          var parsedValue;

          if (value) {
            parsedValue = value.replace(/[^0-9]+/, '');
            parsedValue = parseInt(parsedValue, 10);
            if (!isNaN(parsedValue) && newValues.indexOf(parsedValue) === -1) {
              newValues.unshift(parsedValue);
            }
          }

          return newValues;
        };
      }
    };
  });
})(angular.module('boomstrap'));