var myAppModule = angular.module('myApp', []);

myAppModule.factory('productFactory', function() {
    var listofProducts = [];
    
    return {
        addProduct: function(product) {
            listofProducts.push(product);
        },
        getProducts: function(callbackFn){
            callbackFn(listofProducts);
        },

        deleteProduct: function(index) {
            listofProducts.splice(index, 1);
        },

        buyProduct: function(index){
          console.log( listofProducts[index].productQuantity -1 );
          listofProducts[index].productQuantity-- ;

        }
    };
});


myAppModule.controller('ProductsController', ['productFactory', ProductsController])

// myAppModule.controller('OrdersController',)

function ProductsController(productFactory) {

    var vm = this;
    productFactory.getProducts(function(data) {
        vm.productList = data
    });

    vm.createProduct = function() {
        productFactory.addProduct({
            productName: vm.product.productName,
            productPrice: vm.product.productPrice,
            productQuantity: 50
        });

        vm.product.productName = '';
        vm.product.productPrice = '';
    }

    vm.deleteProduct = function(index) {
        productFactory.deleteProduct(index);
    }
}

myAppModule.controller('OrdersController', ['productFactory', OrdersController])
                       
function OrdersController(productFactory){
  var om = this;
  
  productFactory.getProducts(function (data) {
    om.productList = data;  
  });
  
   om.buyProduct = function(index){
    productFactory.buyProduct(index);
  }
   
  }
