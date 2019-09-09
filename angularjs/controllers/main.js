var myapp = angular.module('myApp', []);
var barSeparator = /[\\\/]/;
var departArray = [];
var provtArray = [];
var disttArray = [];

myapp.controller('myController', function ($scope) {
    $scope.showContent = function($fileContent){
        $scope.content = $fileContent;
	};
	$scope.departs = departArray;
	$scope.provin = provtArray;
	$scope.dists = disttArray;
});

myapp.directive('onReadFile', function ($parse) {
	return {
		restrict: 'A',
		scope: false,
		link: function(scope, element, attrs) {
            var fn = $parse(attrs.onReadFile);
            
			element.on('change', function(onChangeEvent) {
				var reader = new FileReader();
                
				reader.onload = function(onLoadEvent) {
					scope.$apply(function() {
						processData(onLoadEvent.target.result);
						fn(scope, {$fileContent:onLoadEvent.target.result});
					});
				};

				reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
			});
		}
	};
});

function processData(result) {
	var lines = result.split('\n');
	for(var line = 0; line < lines.length; line++){
		var result = lines[line].split(barSeparator);
		var lenDepart = result[0].substring(0,3).length;
		
		if (result[1].trim().length==0) {
			myStructure = [];
			myStructure.id = result[0].substring(0,3).trim();
			myStructure.name = result[0].substring(lenDepart,result[0].length).trim();
			myStructure.parentCode = "-";
			myStructure.parentDescription = "-";
			departArray.push(myStructure);
		}
		
		var lenProv = result[1].substring(0,3).length;

		if (result[1].trim().length > 0 && result[2].trim().length==0) {
			myStructure = [];
			myStructure.id = result[1].substring(0,3).trim();
			myStructure.name = result[1].substring(lenProv,result[1].length).trim();
			myStructure.parentCode = result[0].substring(0,3).trim();
			myStructure.parentDescription = result[0].substring(lenDepart,result[0].length).trim();
			provtArray.push(myStructure);
		}

		var lenDist = result[2].substring(0,4).length;

		if (result[0].trim().length > 0 && result[1].trim().length > 0 && result[2].trim().length > 1) {
			myStructure = [];
			myStructure.id = result[2].substring(0,4).trim();
			myStructure.name = result[2].substring(lenDist,result[2].length).trim();
			myStructure.parentCode = result[1].substring(0,3).trim();
			myStructure.parentDescription = result[1].substring(lenProv,result[1].length).trim();
			disttArray.push(myStructure);
		}
	}
}