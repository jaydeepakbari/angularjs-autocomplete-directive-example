
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
                        if(iAttrs.uiCallback){ // ui-callback attributes for callback function
                            var val = 'scope.' + iAttrs.uiCallback +'(ui.item)';
                        } else {
                            var val = 'scope.' + iAttrs.uiParent +'= ui.item';
                        }
                        eval(val)
                    });                       
                },
            });
        }
    };
});     
