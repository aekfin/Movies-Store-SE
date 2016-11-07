var app = angular.module('MovieStore',['ngCookies','ui.bootstrap']);

app.controller('MenuController', function($scope,$log,$cookies){
  $scope.contactlist = [
    'Telephone number',
    'Location',
    'E-mail'
  ];
    
  $scope.genreList =[ 'Action','Adventure','Animation','Biography','Comedy','Crime','Documentary','Drama','Family','Fantasy',"Film-Noir",
                      'History','Horror','Music','Musical','Mystery','Romance','Sci-fi','Sport','Thriller','War','Western'];
  $scope.categoriesList = ["New Releases","Best Sellers","Promotion","All Movies","Coming Soon"];
  $scope.status = {
    isopen: false
  };
  $scope.account = {};
  var loadCookie = function(){
    $scope.account.id = $cookies.get('logonUser.id');
    $scope.account.firstName = $cookies.get('logonUser.firstName');
    $scope.account.lastName = $cookies.get('logonUser.lastName');
    $scope.account.userName = $cookies.get('logonUser.userName'); 
    $scope.account.inSystem = $cookies.get('logonUser.inSystem');
  }

  $scope.Logout =function(){
    $cookies.remove('logonUser');  
    $cookies.remove('logonUser.inSystem');   
    $scope.account.inSystem =false;
    $scope.account = {};
  }

  loadCookie();

});

app.controller('MovieController', function ($scope,$http,$cookies) {
  var currIndex = $scope.currIndex = 0;
  $scope.infoId = 0;
  $scope.order = {format:"None",amount:1};
  // function
  $scope.genreList =[ 'Action','Adventure','Animation','Biography','Comedy','Crime','Documentary','Drama','Family','Fantasy',"Film-Noir",
                      'History','Horror','Music','Musical','Mystery','Romance','Sci-fi','Sport','Thriller','War','Western'];
  $scope.genreSelected = [false,false,false,false,false,false,false,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false];
  $scope.catList = ["New Releases","Best Sellers","Promotion","All Movies","Coming Soon"];
  $scope.catStyle = [{},{},{},{},{}];
  $scope.wasSelect = [false,false,false,true,false];
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
  // Promotion
  $scope.salemovies = [];
  var loadSaleMovies = function(targetID){
    $scope.salemovies = [];
    $http.post("php/GetDataByID.php",{'id':targetID,'database':'movies'}).success(function(data){
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

  // All movies
  $scope.movies;
  $scope.minRowAM = 0;    // min row all movies
  $scope.maxRowAM = 20;
  var loadMovies = function(){
    $scope.movies = [];
    $http.post("php/GetMovies.php",{'min':$scope.minRowAM,'max':$scope.maxRowAM}).success(function(data){
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

  loadSaleMovies(10);
  loadSaleMovies(4);
  loadSaleMovies(1);
  loadSaleMovies(8);
  loadNewMovies();
  loadMovies();
  loadHotMovies();


  $scope.showInfoMovie;
  $scope.clickImage = function(movie){
    $scope.showInfoMovie = movie;

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
    console.log($scope.isSearching);
  };

  $scope.catStyle[3] = {"color" : "white","font-weight" : "bold","background-color" : "#cc2900"}
  $scope.SelectCategories = function(catagory){
    for(i=0;i<$scope.catStyle.length;i++){
      if(i == catagory){
        $scope.catStyle[i] = {
          "color" : "white",
          "font-weight" : "bold",
          "background-color" : "#cc2900"
        }
        $scope.wasSelect[i] = true;
      }else{
        $scope.catStyle[i] = {};
        $scope.wasSelect[i] = false;
      }
    }
  };

  $scope.FilterByGenre = function(i){
    if($scope.genreSelected[i] == false){
      console.log($scope.genreList[i]+"("+i+")");
      $scope.genreSelected[i] = true;
    }else{
      $scope.genreSelected[i] = false;
    }
  }

  $scope.pagestyle = [];
  $scope.pagestyle[1]={"font-weight":"bold","color":"white","background-color" : "#cc2900"};
  $scope.changePage = function(i,min,max){
    $scope.pagestyle = [];
    $scope.pagestyle[i] = {
      "font-weight":"bold",
      "color":"white",
      "background-color" : "#cc2900"
    }
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

});


app.controller('AccountController', function($scope,$http,$cookies){
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
    $scope.alert = [false,false,false,false];
    if($scope.password != $scope.confirm){
      $scope.alert[0] = true;
    }else if($scope.agree == false){
      $scope.alert[1] = true;
    }else{
      $http.get("php/FetchAccountMaxID.php").success(function(data){
          $scope.id = parseInt(data[0].id)+1;
          $http.post("php/CheckAccount.php",{'username':$scope.userName}).success(function(data){
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
        $scope.user.firstName = $cookies.get('logonUser.firstName');
        $scope.user.lastName = $cookies.get('logonUser.lastName');
        $scope.user.userName = $cookies.get('logonUser.userName'); 
      }else{
        $scope.alert[3] = true;
      }
    });
  }

  $scope.Logout =function(){
    $scope.successLogin = false;
    $cookies.remove('logonUser.id');
    $cookies.remove('logonUser.userName');
    $cookies.remove('logonUser.firstName');
    $cookies.remove('logonUser.lastName');
    $cookies.remove('logonUser.email');
    $cookies.remove('logonUser.inSystem');
  }

});

