var app = angular.module('MovieStore',['ngCookies','ui.bootstrap']);

app.controller('MenuController', function($scope,$log,$http,$cookies,$rootScope,$window){
  $scope.genreList =[ 'Action','Adventure','Animation','Biography','Comedy','Crime','Documentary','Drama','Family','Fantasy',"Film-Noir",
                      'History','Horror','Music','Musical','Mystery','Romance','Sci-fi','Sport','Thriller','War','Western'];
  $scope.categoriesList = ["New Releases","Best Sellers","Promotion","All Movies"];
  $scope.status = {
    isopen: false
  };

  $scope.ClickCategories = function(item){
    console.log(item);
    $cookies.remove('category');
    $cookies.put('category',item);
    $window.location.href = '/ShoppingPage.html';
  }

  $scope.ViewBasket = function(){
    $scope.movies = [];
    $scope.baskets = [];
    $scope.payment = false;
    $scope.totalPrice = 0;
    $http.post("php/GetMovieByCustomerId.php",{'customerId':$scope.account.id}).success(function(data){
      if(data[0] == 'not null'){
        for(i=1;i<data.length;i++){
          if(data[i].status == 'Payment'){
            $scope.payment = true;    
          }
          $scope.baskets.push(data[i]);  
          $scope.totalPrice += parseInt(data[i].totalPrice);
          $http.post("php/GetDataByID.php",{'id':data[i].movieId,'table':"movies"}).success(function(data){
            $scope.movies.push(data[0]);
          });          
        }
      }
    });
  }

  $scope.BasketDetail = function(i,type){
    $scope.basketDetail = type;
    console.log(type);
    $scope.movIndex = i;
  }

  $scope.RemoveMovieFormBasket = function(){
    $http.post("php/RemoveDataByID.php",{'id':$scope.baskets[$scope.movIndex].id,'table':'baskets'}).success(function(data){
      $scope.ViewBasket();
    });
  }

  $scope.Checkout = function(){
    for(i=0;i<$scope.movies.length;i++){
      var movie = $scope.movies[i];
      console.log(movie.nameEN);
      var basket = $scope.baskets[i];
      var orderId;
      $http.post("php/GetVariableMaxID.php",{'table':'baskets','variable':'orderId'}).success(function(data){
        orderId = parseInt(data[0].orderId)+1;
        $http.post("php/UpdateDataByID.php",{'id':basket.id,'table':'baskets','variable':'orderId','value':orderId});
        $http.post("php/UpdateDataByID.php",{'id':basket.id,'table':'baskets','variable':'status','value':'Payment'}).success(function(){
          if( i == ($scope.movies.length)){
            $scope.ViewBasket();
          }
        });
      });  
    }
  }

  $scope.SoldMovie = function(){
      for(i=0;i<$scope.movies.length;i++){
        var movie = $scope.movies[i];
        var basket = $scope.baskets[i];
        var instock;
        var sold;
        var soldout = parseInt(movie.sold)+1;
        var format;
        switch(basket.format){
          case 'CD':
              format = 'cd';
              instock = parseInt(movie.cd)-1;
              sold = parseInt(movie.cdSold)+1;                   
              break;
          case 'DVD':
              format = 'dvd';
              instock = parseInt(movie.dvd)-1;
              sold = parseInt(movie.dvdSold)+1;
              break;
          case 'Blu-ray':
              format = 'bluray';
              instock = parseInt(movie.bluray)-1;
              sold = parseInt(movie.bluraySold)+1;
              break;
        }
        $http.post("php/UpdateDataByID.php",{'id':basket.id,'table':'baskets','variable':'status','value':'Payment'});
        $http.post("php/UpdateDataByID.php",{'id':movie.id,'table':'movies','variable':format,'value':instock});
        $http.post("php/UpdateDataByID.php",{'id':movie.id,'table':'movies','variable':format+'Sold','value':sold});
        $http.post("php/UpdateDataByID.php",{'id':movie.id,'table':'movies','variable':'sold','value':soldout});
        $scope.movIndex = i;
        $scope.RemoveMovieFormBasket();
      }
  }

  $scope.ConfirmPayment = function(){
    $http.post("route.in.th:9999/api/transferbusiness",{'Customaccount':$scope.bankUsername,'amount':$scope.totalPrice,'key':'Aekkodhod'}).success(function(data){
 //   $http.post("php/PaymentBank.php",{'Customaccount':$scope.bankUsername,'amount':$scope.totalPrice,'key':'Aekkodhod'}).success(function(data){
      console.log(data);
      console.log('confirm');
    });
//    $scope.SoldMovie();
  }

  $scope.bank2error = false;
  $scope.ConfirmPayment2 = function(){
    $scope.bank2error = false;
    $scope.otp = parseInt($scope.otp);
 //   $http.post("http://bank.route.in.th:9999/api/transferbussiness",{'Customaccount':$scope.bankUsername,'amount':$scope.totalPrice,'key':'Aekkodhod'}).success(function(data){
    $http.post("php/PaymentBank2.php",{'shop_Account':'ssmoviestore','cus_Account':$scope.bankUsername2,'amount':$scope.totalPrice,'otp':$scope.otp}).success(function(data){
      if(data == "no have this shop account" || data == "no have this customer account" || data == "Wrong otp"){
        $scope.error2 = data;
        $scope.bank2error = true;
      }else{
        $scope.SoldMovie();
        $window.location.href = '/SuccessCheckout.html';
      }
      console.log('confirm2');
    });
  }

  $scope.account = {};
  $scope.loadCookie = function(){
    $scope.account.id = $cookies.get('logonUser.id');
    $scope.account.role = $cookies.get('logonUser.role');
    $scope.account.firstName = $cookies.get('logonUser.firstName');
    $scope.account.lastName = $cookies.get('logonUser.lastName');
    $scope.account.userName = $cookies.get('logonUser.userName'); 
    $scope.account.inSystem = $cookies.get('logonUser.inSystem');
  }

  $scope.Logout = function(){
    $cookies.remove('logonUser.id'); 
    $cookies.remove('logonUser.firstName'); 
    $cookies.remove('logonUser.lastName'); 
    $cookies.remove('logonUser.userName');
    $cookies.remove('logonUser.email');  
    $cookies.remove('logonUser.inSystem');   
    $scope.account.inSystem = false;
    $scope.account = {};
  }
  // take from another controller
  $rootScope.$on("loadCookie", function(){
    $scope.loadCookie();
  });

  $scope.loadCookie();
  $scope.ViewBasket();
});

app.controller('MovieController', function ($scope,$http,$cookies,$rootScope,$window) {
  var currIndex = $scope.currIndex = 0;
  $scope.infoId = 0;
  $scope.basketId;
  $scope.canBuy = true;
  $scope.order = {format:"None",amount:1};
  // function
  $scope.genreList =[ 'Action','Adventure','Animation','Biography','Comedy','Crime','Documentary','Drama','Family','Fantasy',"Film-Noir",
                      'History','Horror','Music','Musical','Mystery','Romance','Sci-fi','Sport','Thriller','War','Western'];
  $scope.genreSelected = [false,false,false,false,false,false,false,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false];
  $scope.catList = ["New Releases","Best Sellers","Promotion","All Movies"];
  $scope.catStyle = [{},{},{},{},{}];
  $scope.smartNameEN = {
    'font-weight': 'bold',
    'height': '40px',
    'font-size': '14px'
  };
  $scope.smartPrice = {
    'font-weight': 'bold',
    'height': '15px',
    'margin-top': '-5px',
    'margin-bottom': '0px',
    'font-size': '12px'
  };
  $scope.delPrice = {
    'font-weight': 'bold',
    'margin-top': '-10px',
    'margin-bottom': '0px',
    'color': 'red',
    'font-size': '12px'
  };

  // Service
  // New Release movies
  $scope.newmovies;
  $scope.minRowNM = 0;    // min row all movies
  $scope.maxRowNM = 20;
  var loadNewMovies = function(){
    $scope.newmovies = [];
    $http.post("php/GetNewMovies.php",{'min':$scope.minRowNM,'max':$scope.maxRowNM}).success(function(data){
      for(i=0;i<data.length;i++){
        $scope.newmovies.push({
          id:data[i].id, nameEN:data[i].nameEN, genre1:data[i].genre1, genre2:data[i].genre2, genre3:data[i].genre3, 
          desc:data[i].synopsis, sound:data[i].sound, subtitle:data[i].subtitle, runtime:data[i], releaseDate:data[i].releaseDate,
          priceCd:data[i].priceCd, priceDvd:data[i].priceDvd, priceBluray:data[i].priceBluray, discountCd:data[i].discountCd, discountDvd:data[i].discountDvd,
          discountBluray:data[i].discountBluray, cd:data[i].cd, dvd:data[i].dvd, bluray:data[i].bluray, cdSold:data[i].cdSold, dvdSold:data[i].dvdSold,
          bluraySold:data[i].bluraySold, onSale:data[i].onSale, imgPoster:data[i].imgPoster, imgCover:data[i].imgCover, cnShowmore:true  
        });
      }
    });
  }

  // Best Selling
  $scope.hotmovies;
  $scope.minRowHM = 0;    // min row hot movies
  $scope.maxRowHM = 20;
  var loadHotMovies = function(){
    $scope.hotmovies = [];
    $http.post("php/GetHotMovies.php",{'min':$scope.minRowHM,'max':$scope.maxRowHM}).success(function(data){
      console.log(data.length);
      for(i=0;i<data.length;i++){
        $scope.hotmovies.push({
          id:data[i].id, nameEN:data[i].nameEN, genre1:data[i].genre1, genre2:data[i].genre2, genre3:data[i].genre3, 
          desc:data[i].synopsis, sound:data[i].sound, subtitle:data[i].subtitle, runtime:data[i], releaseDate:data[i].releaseDate,
          priceCd:data[i].priceCd, priceDvd:data[i].priceDvd, priceBluray:data[i].priceBluray, discountCd:data[i].discountCd, discountDvd:data[i].discountDvd,
          discountBluray:data[i].discountBluray, cd:data[i].cd, dvd:data[i].dvd, bluray:data[i].bluray, cdSold:data[i].cdSold, dvdSold:data[i].dvdSold,
          bluraySold:data[i].bluraySold, onSale:data[i].onSale, imgPoster:data[i].imgPoster, imgCover:data[i].imgCover  
        });
      }
    });
  }

  // Promotion
  $scope.salemovies;
  $scope.minRowSM = 0;    
  $scope.maxRowSM = 20;
  var loadSaleMovies = function(){
    $scope.salemovies = [];
    $http.post("php/GetSaleMovies.php",{'min':$scope.minRowSM,'max':$scope.maxRowSM}).success(function(data){
      for(i=0;i<data.length;i++){
        $scope.salemovies.push({
          id:data[i].id, nameEN:data[i].nameEN, genre1:data[i].genre1, genre2:data[i].genre2, genre3:data[i].genre3, 
          desc:data[i].synopsis, sound:data[i].sound, subtitle:data[i].subtitle, runtime:data[i], releaseDate:data[i].releaseDate,
          priceCd:data[i].priceCd, priceDvd:data[i].priceDvd, priceBluray:data[i].priceBluray, discountCd:data[i].discountCd, discountDvd:data[i].discountDvd,
          discountBluray:data[i].discountBluray, cd:data[i].cd, dvd:data[i].dvd, bluray:data[i].bluray, cdSold:data[i].cdSold, dvdSold:data[i].dvdSold,
          bluraySold:data[i].bluraySold, onSale:data[i].onSale, imgPoster:data[i].imgPoster, imgCover:data[i].imgCover  
        });
      }
    });
  }

  // All movies
  $scope.movies;
  $scope.minRowAM = 0;    // min row all movies
  $scope.maxRowAM = 20;
  var loadMovies = function(){
    $scope.movies = [];
    $http.post("php/GetMovies.php",{'min':$scope.minRowAM,'max':$scope.maxRowAM}).success(function(data){
      console.log(data.length);
      for(i=0;i<data.length;i++){
        $scope.movies.push({
          id:data[i].id, nameEN:data[i].nameEN, genre1:data[i].genre1, genre2:data[i].genre2, genre3:data[i].genre3, 
          desc:data[i].synopsis, sound:data[i].sound, subtitle:data[i].subtitle, runtime:data[i].runtime, releaseDate:data[i].releaseDate,
          priceCd:data[i].priceCd, priceDvd:data[i].priceDvd, priceBluray:data[i].priceBluray, discountCd:data[i].discountCd, discountDvd:data[i].discountDvd,
          discountBluray:data[i].discountBluray, cd:data[i].cd, dvd:data[i].dvd, bluray:data[i].bluray, cdSold:data[i].cdSold, dvdSold:data[i].dvdSold,
          bluraySold:data[i].bluraySold, onSale:data[i].onSale, imgPoster:data[i].imgPoster, imgCover:data[i].imgCover  
        });
      }
    });
  }

  // Serach Movie
  $scope.searchmovies;
  $scope.notfound = false;
  $scope.Search = function(){
    $scope.searchmovies = [];
    $scope.notfound = false;
    $scope.keyword = $scope.searchMovie;
    $http.post("php/SearchMovieByName.php",{'name':$scope.searchMovie}).success(function(data){
      if(data[0] == "found"){
        for(i=1;i<data.length;i++){
          $scope.searchmovies.push({
            id:data[i].id, nameEN:data[i].nameEN, genre1:data[i].genre1, genre2:data[i].genre2, genre3:data[i].genre3, 
            desc:data[i].synopsis, sound:data[i].sound, subtitle:data[i].subtitle, runtime:data[i].runtime, releaseDate:data[i].releaseDate,
            priceCd:data[i].priceCd, priceDvd:data[i].priceDvd, priceBluray:data[i].priceBluray, discountCd:data[i].discountCd, discountDvd:data[i].discountDvd,
            discountBluray:data[i].discountBluray, cd:data[i].cd, dvd:data[i].dvd, bluray:data[i].bluray, cdSold:data[i].cdSold, dvdSold:data[i].dvdSold,
            bluraySold:data[i].bluraySold, onSale:data[i].onSale, imgPoster:data[i].imgPoster, imgCover:data[i].imgCover  
          });
        }
      }else{
        $scope.notfound = true;
      }
    });
  }

  $scope.showInfoMovie;
  $scope.clickImage = function(movie){
    $scope.showInfoMovie = movie;
    $scope.order = {format:"None",amount:1};
    if($scope.showInfoMovie.cd > 0)
      $scope.order.format = "CD";
    else if($scope.showInfoMovie.dvd > 0)
          $scope.order.format = "DVD";
      else if($scope.showInfoMovie.bluray > 0)
          $scope.order.format = "Bluray";
    
    if($scope.showInfoMovie.desc.length > 300){
        $scope.showInfoMovie.shortd = $scope.showInfoMovie.desc.substring(0,300)+'...'; 
        $scope.showInfoMovie.canShowmore = true;
      }else{
        $scope.showInfoMovie.shortd = $scope.showInfoMovie.desc;
        $scope.showInfoMovie.canShowmore = false;
    }
  };

  $scope.totalPrice;
  $scope.buyMovies = function(movie){
    switch($scope.order.format){
      case "CD":
        $scope.totalPrice = movie.discountCd*$scope.order.amount;
        break;
      case "DVD":
        $scope.totalPrice = movie.discountDvd*$scope.order.amount;
        break;
      case "Blu-ray":
        $scope.totalPrice = movie.discountBluray*$scope.order.amount;
        break;
    }
    $http.post("php/GetTableMaxID.php",{'table':"baskets"}).success(function(data){
      $scope.basketId = parseInt(data[0].id)+1;
      if($cookies.get('logonUser.inSystem') === undefined){
        $scope.canBuy = false;
      }else{
        var customerId = $cookies.get('logonUser.id');
        console.log(customerId);
        $scope.date = new Date();
        $http.post("php/AddToBasket.php",{'id':$scope.basketId,'customerId':customerId,'movieId':movie.id,'format':$scope.order.format,
        'amount':$scope.order.amount,'totalPrice':$scope.totalPrice,'date':$scope.date,'status':'Adding'});
      }
    });
  }

  $scope.SelectCategories = function(catagory){
    $scope.pagestyle = [];
    $scope.pagestyle[1]={"font-weight":"bold","color":"white","background-color" : "#3d3d29"};
    $scope.changePage(1,0,20);
    for(i=0;i<$scope.catStyle.length;i++){
      if(i == catagory){
        $scope.catStyle[i] = {
          "color" : "white",
          "font-weight" : "bold",
          "background-color" : "#3d3d29"
        }
        $scope.wasSelect[i] = true;
      }else{
        $scope.catStyle[i] = {};
        $scope.wasSelect[i] = false;
      }
    }
  };
  $scope.genreSelected = [];
  $scope.FilterByGenre = function(i){
    $scope.genreSelected = [];
    if($scope.genreSelected[i] != true){
      $scope.genreSelected[i] = true;
    }else{
      $scope.genreSelected[i] = false;
    }
  }

  $scope.ResetPage = function(){
    $scope.pagestyle = [];
    $scope.pagestyle[1]={"font-weight":"bold","color":"white","background-color" : "#3d3d29"};  
  }

  $scope.PageNav = function(nav){
    if(nav == "Next"){
      switch($scope.currPage){
        case 1:
          $scope.changePage(2,21,40);
          break;
        case 2:
          $scope.changePage(3,81,100);
          break;
        case 3:
          $scope.changePage(1,0,20);
          break;
      }
    }else{
      switch($scope.currPage){
        case 1:
          $scope.changePage(3,81,100);
          break;
        case 2:
          $scope.changePage(1,0,20);
          break;
        case 3:
          $scope.changePage(2,21,40);
          break;
      }
    }
  }

  $scope.currPage = 1;
  $scope.changePage = function(i,min,max){
    $scope.currPage = i;
    $scope.pagestyle = [];
    $scope.pagestyle[i] = {
      "font-weight":"bold",
      "color":"white",
      "background-color" : "#3d3d29"
    }
    if($scope.wasSelect[0]){
        $scope.minRowNM = min;    
        $scope.maxRowNM = max; 
        loadNewMovies();
    }else
      if($scope.wasSelect[1]){
          $scope.minRowHM = min;    
          $scope.maxRowHM = max;  
          loadHotMovies();
      }else 
        if($scope.wasSelect[2]){
          $scope.minRowSM = min;    
          $scope.maxRowSM = max;  
          loadSaleMovies();
        }else
          if($scope.wasSelect[3]){
            $scope.minRowAM = min;    
            $scope.maxRowAM = max;  
            loadMovies();
          }
  }

  $scope.showDesc = function(movie){
    movie.shortd = movie.desc;
    movie.canShowmore = false;
  }

  var init = function(){
    switch($cookies.get('category')){
    case 'New Releases':
      $scope.catStyle[0] = {"color" : "white","font-weight" : "bold","background-color" : "#3d3d29"};
      $scope.wasSelect = [true,false,false,false,false];
      break; 
    case 'Best Sellers':
      $scope.catStyle[1] = {"color" : "white","font-weight" : "bold","background-color" : "#3d3d29"};
      $scope.wasSelect = [false,true,false,false,false];
      break;
    case 'Promotion':
      $scope.catStyle[2] = {"color" : "white","font-weight" : "bold","background-color" : "#3d3d29"};
      $scope.wasSelect = [false,false,true,false,false];
      break;
    default:
      $scope.catStyle[3] = {"color" : "white","font-weight" : "bold","background-color" : "#3d3d29"};
      $scope.wasSelect = [false,false,false,true,false];
      break;
    }
  }

  init();
  loadSaleMovies();  
  loadNewMovies();
  loadMovies();
  loadHotMovies();
  $scope.ResetPage();
});


app.controller('AccountController', function($scope,$http,$cookies,$rootScope,$window){
  $scope.agree = false;
  $scope.rememberMe = false;
  $scope.alert = [false,false,false,false];
  $scope.account= {};
  $scope.loginUsername = "";
  $scope.loginPassword = "";
  $scope.id;
  $scope.firstName;
  $scope.lastName;
  $scope.userName;
  $scope.password;
  $scope.email;
  $scope.address;
  $scope.city;
  $scope.province;
  $scope.country;
  $scope.zip;
  $scope.successRegister = false;
  $scope.successLogin = false;
  $scope.user = {};
  $scope.regdata;
  
  $scope.Register = function(){
    $scope.alert = [false,false,false,false,false,false];
    if($scope.password != $scope.confirm || $scope.password === undefined){
      $scope.alert[0] = true;
    }else if($scope.agree == false){
      $scope.alert[1] = true;
    }else if($scope.firstName === undefined || $scope.lastName === undefined || $scope.userName === undefined || $scope.address === undefined || $scope.city === undefined || $scope.province === undefined || $scope.country === undefined || $scope.zip === undefined){
      $scope.alert[4] = true;
    }else{
      $http.post("php/GetTableMaxID.php",{'table':"accounts"}).success(function(data){
          $scope.id = parseInt(data[0].id)+1;
          $http.post("php/CheckAccount.php",{'username':$scope.userName,'email':$scope.email}).success(function(data){
            console.log(data['message']);
            if(data['found']){
              $scope.alert[2] = true;
            }else{
              $http.post("php/AddAccount.php",{'id':$scope.id,'firstName':$scope.firstName,'lastName':$scope.lastName,'userName':$scope.userName,
                'password':$scope.password,'email':$scope.email,'address':$scope.address,'city':$scope.city,'province':$scope.province,'country':$scope.country,'zip':$scope.zip})
                .success(function(data){
                  $scope.successRegister = true;
              });
            }
          });
      });
    }
  }

  $scope.Login = function(){
    $http.post("php/SearchAccount.php",{'username':$scope.loginUsername,'password':$scope.loginPassword}).success(function(data){
      console.log(data['message']);
      $scope.alert = [false,false,false,false];
      if(data['found']){
        $scope.successLogin = true;
        $cookies.put('logonUser.id',data[0].id);
        $cookies.put('logonUser.userName',data[0].userName);
        $cookies.put('logonUser.firstName',data[0].firstName);
        $cookies.put('logonUser.lastName',data[0].lastName);
        $cookies.put('logonUser.email',data[0].email);
        $cookies.put('logonUser.inSystem',true);
        if(parseInt($cookies.get('logonUser.id')) < 2){
          $cookies.put('logonUser.role','Admin');  
        }else{
          $cookies.put('logonUser.role','User');
        }
        $scope.loadCookie();
      }else{
        $scope.alert[3] = true;
      }
    });
  }

  $scope.Logout =function(){
    $scope.successLogin = false;
    $cookies.remove('logonUser.id'); 
    $cookies.remove('logonUser.firstName'); 
    $cookies.remove('logonUser.lastName'); 
    $cookies.remove('logonUser.userName');
    $cookies.remove('logonUser.email');  
    $cookies.remove('logonUser.inSystem'); 
    $cookies.remove('logonUser.role');
  }

  $scope.ChangePassword = function(){
    $scope.alert[0] = false;
    $scope.alert[1] = false;
    $scope.alert[3] = false;
    var password;
    $http.post("php/GetDataByID.php",{'id':$cookies.get('logonUser.id'),'table':"accounts"}).success(function(data){
      password = data[0].password;
      if($scope.password != $scope.confirm || $scope.password === undefined){
        $scope.alert[0] = true;
      }else if(password != $scope.oldPassword){
         $scope.alert[3] = true;
      }else{
        $scope.alert[1] = true;
        console.log($cookies.get('logonUser.id'));
        $http.post("php/UpdateDataByID.php",{'id':$cookies.get('logonUser.id'),'table':'accounts','variable':'password','value':$scope.password}).success(function(){
          $scope.Logout();
          $window.location.href = '/LoginPage.html';
        });
      }
    });
  }

  $scope.ChangeAddress = function(){
    $scope.alert[2] = false;
    $scope.alert[4] = false;
    if($scope.address === undefined || $scope.city === undefined || $scope.province === undefined || $scope.country === undefined || $scope.zip === undefined){
      $scope.alert[4] = true;
    }else{
      $http.post("php/UpdateAccountAddress.php",{'id':$cookies.get('logonUser.id'),'address':$scope.address,'city':$scope.city,'province':$scope.province,'country':$scope.country,'zip':$scope.zip}).success(function(data){
        $scope.alert[2] = true;
        $window.location.href = '/Profile.html';
      });
    }
  }

  $scope.ChangeName = function(){
    $scope.alert[0] = false;
    $scope.alert[1] = false;
    if($scope.firstName === undefined || $scope.lastName === undefined){
      $scope.alert[0] = true;
    }else{
      $http.post("php/UpdateDataByID.php",{'id':$cookies.get('logonUser.id'),'table':'accounts','variable':'firstName','value':$scope.firstName});
      $http.post("php/UpdateDataByID.php",{'id':$cookies.get('logonUser.id'),'table':'accounts','variable':'lastName','value':$scope.lastName});
      $scope.alert[1] = true;
      $window.location.href = '/Profile.html';
    }
  }

  $scope.loadAccount = function(){
    $http.post("php/GetDataByID.php",{'id':$cookies.get('logonUser.id'),'table':"accounts"}).success(function(data){
      $scope.user = data[0];
    });
  }

    $scope.test = function(){
     $http.post("php/test.php",{'me':'สวัสดี','you':'โลกนี้'}).success(function(data){
      console.log(data.me);
      console.log(data.you);
     });
  }

  // command other controller to do function
  $scope.loadCookie = function() { 
    $scope.loadAccount();   
    $rootScope.$emit("loadCookie", {});
  }

  $scope.loadAccount();

});

