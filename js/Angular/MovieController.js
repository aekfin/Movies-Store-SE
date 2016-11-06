var app = angular.module('MovieStore',['ui.bootstrap']);

app.controller('MenuController', function($scope,$log){
  $scope.contactlist = [
    'Telephone number',
    'Location',
    'E-mail'
  ];
  $scope.genreList =[ 'Action','Adventure','Animation','Biography','Comedy','Crime','Documentary','Drama','Family','Fantasy',"Film-Noir",
                      'History','Horror','Music','Musical','Mystery','Romance','Sci-fi','Sport','Thriller','War','Western'];
  $scope.status = {
    isopen: false
  };

});

app.controller('MovieController', function ($scope,$http) {
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
    $http.post("php/GetMoviesByID.php",{'id':targetID}).success(function(data){
      console.log(data[0].nameEN);
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
    $http.post("php/GetNewMovies.php",{'min':$scope.minRowNM,max:$scope.maxRowNM}).success(function(data){
      for(i=0;i<data.length;i++){
        $scope.newmovies.push({
          id:data[i].id, nameEN:data[i].nameEN, genre1:data[i].genre1, genre2:data[i].genre2, genre3:data[i].genre3, 
          desc:data[i].synopsis, sound:data[i].sound, subtitle:data[i].subtitle, runtime:data[i], releaseDate:data[i].releaseDate,
          priceCd:data[i].priceCd, priceDvd:data[i].priceDvd, priceBluray:data[i].priceBluray, discountCd:data[i].discountCd, discountDvd:data[i].discountDvd,
          discountBluray:data[i].discountBluray, cd:data[i].cd, dvd:data[i].dvd, bluray:data[i].bluray, cdSold:data[i].cdSold, dvdSold:data[i].dvdSold,
          bluraySold:data[i].bluraySold, onSale:data[i].onSale, imgPoster:data[i].imgPoster, imgCover:data[i].imgCover  
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
    $http.post("php/GetHotMovies.php",{'min':$scope.minRowHM,max:$scope.maxRowHM}).success(function(data){
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
    $http.post("php/GetMovies.php",{'min':$scope.minRowAM,max:$scope.maxRowAM}).success(function(data){
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
  $scope.clickImage = function(index){
    $scope.showInfoMovie = $scope.movies[index];
    if($scope.showInfoMovie.cd > 0)
      $scope.order.format = "CD";
    else if($scope.showInfoMovie.dvd > 0)
          $scope.order.format = "DVD";
      else if($scope.showInfoMovie.bluray > 0)
          $scope.order.format = "Bluray";
    console.log($scope.isSearching);
  };

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

  // assign short description
  for(i=0;i<$scope.hotmovies.length;i++){
    $scope.hotmovies[i].shortd = $scope.hotmovies[i].desc.substring(0,20)+'...'; 
  }
  for(i=0;i<$scope.salemovies.length;i++){
    $scope.salemovies[i].shortd = $scope.salemovies[i].desc.substring(0,20)+'...'; 
  }
  for(i=0;i<$scope.movies.length;i++){
    $scope.movies[i].shortd = $scope.movies[i].desc.substring(0,20)+'...'; 
  }
});

