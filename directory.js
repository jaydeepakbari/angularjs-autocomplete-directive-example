
app.directive('autoComplete', function clientAutoCompleteDir() {
    return {
        restrict: 'A', 
        require: 'ngModel',      
        link: function (scope, elem, iAttrs, ngModel) {
            elem.autocomplete({
                source: function (request, response) {
                    $.getJSON('api.php&term=" + request.term, function (data) {
                        response($.map(data, function (value, key) {
                            return value;
                        }));
                    });
                },
                minLength: 1,                       
                select: function (event, ui) {
                    event.preventDefault();
                    scope.$apply(function(){
                        scope[iAttrs.uiParent] = ui.item;
                    });                       
                },
            });
        }
    };
});     
