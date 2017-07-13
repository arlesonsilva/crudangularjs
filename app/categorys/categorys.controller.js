app.controller('categorysController', function($scope, $mdDialog, $mdToast, categorysFactory){
    
    $scope.readCategorys = function(){
        categorysFactory.readCategorys().then(function successCallback(response){
            $scope.categorys = response.data.records;
        }, function errorCallback(response){
            $scope.showToast("Unable to read record.");
        });
    }
     
    // showCreateCategoryForm will be here
    // show 'create category form' in dialog box
    $scope.showCreateCategoryForm = function(event){
     
        $mdDialog.show({
            controller: DialogController,
            templateUrl: './app/categorys/create_category.template.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true,
            scope: $scope,
            preserveScope: true,
            fullscreen: true // Only for -xs, -sm breakpoints.
        });
    }
    
    // createCategory will be here
    // create new category
    $scope.createCategory = function(){
     
        categorysFactory.createCategory($scope).then(function successCallback(response){
     
            // tell the user new product was created
            $scope.showToast(response.data.message);
     
            // refresh the list
            //$scope.readCategorys();
            $scope.readCategorys();            

            // close dialog
            $scope.cancel();
     
            // remove form values
            $scope.clearCategoryForm();
     
        }, function errorCallback(response){
            $scope.showToast("Unable to create record.");
        });
    }
     
    // clear variable / form values
    $scope.clearCategoryForm = function(){
        $scope.id = "";
        $scope.name = "";
        $scope.description = "";
    }

    // show toast message
    $scope.showToast = function(message){
        $mdToast.show(
            $mdToast.simple()
                .textContent(message)
                .hideDelay(3000)
                .position("top right")
        );
    }

    // readOneCategory will be here
    // retrieve record to fill out the form
    $scope.readOneCategory = function(id){
     
        // get product to be edited
        categorysFactory.readOneCategory(id).then(function successCallback(response){
     
            // put the values in form
            $scope.id = response.data.id;
            $scope.name = response.data.name;
            $scope.description = response.data.description;
            $scope.created = response.data.created;
     
            $mdDialog.show({
                controller: DialogController,
                templateUrl: './app/categorys/read_one_category.template.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                scope: $scope,
                preserveScope: true,
                fullscreen: true
            }).then(
                function(){},
     
                // user clicked 'Cancel'
                function() {
                    // clear modal content
                    $scope.clearCategoryForm();
                }
            );
     
        }, function errorCallback(response){
            $scope.showToast("Unable to retrieve record.");
        });
     
    }
   
    // showUpdateCategoryForm will be here
    // retrieve record to fill out the form
    $scope.showUpdateCategoryForm = function(id){
     
        // get category to be edited
        categorysFactory.readOneCategory(id).then(function successCallback(response){
     
            // put the values in form
            $scope.id = response.data.id;
            $scope.name = response.data.name;
            $scope.description = response.data.description;
            $scope.created = response.data.created;

            $mdDialog.show({
                controller: DialogController,
                templateUrl: './app/categorys/update_category.template.html',
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose: true,
                scope: $scope,
                preserveScope: true,
                fullscreen: true
            }).then(
                function(){},
     
                // user clicked 'Cancel'
                function() {
                    // clear modal content
                    $scope.clearCategoryForm();
                }
            );
     
        }, function errorCallback(response){
            $scope.showToast("Unable to retrieve record.");
        });
     
    }
      
    // updateCategory will be here
    // update category record / save changes
    $scope.updateCategory = function(){
     
        categorysFactory.updateCategory($scope).then(function successCallback(response){
     
            // tell the user product record was updated
            $scope.showToast(response.data.message);
     
            // refresh the product list
            $scope.readCategorys();
     
            // close dialog
            $scope.cancel();
     
            // clear modal content
            $scope.clearCategoryForm();
     
        },
        function errorCallback(response) {
            $scope.showToast("Unable to update record.");
        });
     
    }
      
    // confirmDeleteCategory will be here
    // cofirm category deletion
    $scope.confirmDeleteCategory = function(event, id){
     
        // set id of record to delete
        $scope.id = id;
     
        // dialog settings
        var confirm = $mdDialog.confirm()
            .title('Are you sure?')
            .textContent('Category will be deleted.')
            .targetEvent(event)
            .ok('Yes')
            .cancel('No');
     
        // show dialog
        $mdDialog.show(confirm).then(
            // 'Yes' button
            function() {
                // if user clicked 'Yes', delete category record
                $scope.deleteCategory();
            },
     
            // 'No' button
            function() {
                // hide dialog
            }
        );
    }

    // delete category
    $scope.deleteCategory = function(){
     
        categorysFactory.deleteCategory($scope.id).then(function successCallback(response){
     
            // tell the user category was deleted
            $scope.showToast(response.data.message);
     
            // refresh the list
            $scope.readCategorys();
     
        }, function errorCallback(response){
            $scope.showToast("Unable to delete record.");
        });
     
    }     
    
    // searchCategorys will be here
    // search categorys
    $scope.searchCategorys = function(){
     
        // use categorys factory
        categorysFactory.searchCategorys($scope.category_search_keywords).then(function successCallback(response){
            $scope.categorys = response.data.records;                    
        }, function errorCallback(response){
            $scope.showToast("Unable to read record.");
        });
    }

    // DialogController will be here
    // methods for dialog box
    function DialogController($scope, $mdDialog) {
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
    }

});