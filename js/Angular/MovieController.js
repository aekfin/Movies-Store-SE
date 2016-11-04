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

  // function
  $scope.genreList =[ 'Action','Adventure','Animation','Biography','Comedy','Crime','Documentary','Drama','Family','Fantasy',"Film-Noir",
                      'History','Horror','Music','Musical','Mystery','Romance','Sci-fi','Sport','Thriller','War','Western'];
  $scope.genreSelected = [false,false,false,false,false,false,false,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false];
  $scope.catList = ["New Releases","Best Sellers","Promotion","All Movies","Coming Soon"];
  $scope.catStyle = [{},{},{},{},{}];
  $scope.wasSelect = [false,false,false,true,false];
  $scope.smartNameEN = {
    'font-weight': 'bold',
    'font-size': '12px'
  };
  $scope.smartNameTH = {
    'margin-top': '-10px',
    'font-size': '10px'
  };
  $scope.smartPrice = {
    'font-weight': 'bold',
    'margin-top': '-10px',
    'font-size': '14px'
  };
  // Service
  // Promotion
  $scope.salemovies = [
    {  id: 0,nameEN: "Secret life of mitty", nameTH: "ชีวิตพิศวงของ วอลเตอร์ มิตตี้", 
       desc: "The manager of the negative assets sector of Life magazine, Walter Mitty, has been working for sixteen years for the magazine and has a tedious life, not going anywhere but from his home to his job and vice-versa.",
       imgPoster: "images/mitty1.jpg",imgCover: "images/mitty2.jpg",priceDvd: 250,discountDvd: 199, 
       genre: [false,true,false,false,true,false,false,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false]
    },
    {  id: 1,nameEN: "Interstellar", nameTH: "ทะยานดาวกู้โลก ", 
       desc: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
       imgPoster: "images/inter1.jpg",imgCover: "images/inter2.jpg",priceDvd: 300,discountDvd: 219,
       genre: [false,true,false,false,false,false,false,true,false,false,false,false,false,false,false,false,false,true,false,false,false,false]
    },
    {  id: 2,nameEN: "Guardians of the Galaxy", nameTH: "รวมพันธุ์นักสู้พิทักษ์จักรวาล", 
       desc: "A group of intergalactic criminals are forced to work together to stop a fanatical warrior from taking control of the universe.",
       imgPoster: "images/guar1.jpg",imgCover: "images/guar2.jpg",priceDvd: 300,discountDvd: 209, 
       genre: [true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,false,false,false,false]
    },
    {  id: 3,nameEN: "John Wick", nameTH: "ชีวิตพิศวงของ วอลเตอร์ มิตตี้", 
       desc: "The manager of the negative assets sector of Life magazine, Walter Mitty, has been working for sixteen years for the magazine and has a tedious life, not going anywhere but from his home to his job and vice-versa.",
       imgPoster: "images/johnwick1.jpg",priceDvd: 250,discountDvd: 199, 
       genre: [false,true,false,false,true,false,false,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false]
    },
    {  id: 4,nameEN: "Interstellar", nameTH: "ทะยานดาวกู้โลก ", 
       desc: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
       imgPoster: "images/inter1.jpg",imgCover: "images/inter2.jpg",priceDvd: 300,discountDvd: 219,
       genre: [false,true,false,false,false,false,false,true,false,false,false,false,false,false,false,false,false,true,false,false,false,false]
    },
    {  id: 5,nameEN: "Guardians of the Galaxy", nameTH: "รวมพันธุ์นักสู้พิทักษ์จักรวาล", 
       desc: "A group of intergalactic criminals are forced to work together to stop a fanatical warrior from taking control of the universe.",
       imgPoster: "images/guar1.jpg",imgCover: "images/guar2.jpg",priceDvd: 300,discountDvd: 209, 
       genre: [true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,false,false,false,false]
    }
  ];

  // Best Selling
  $scope.hotmovies = [
    {  id: 0,nameEN: "Secret life of mitty", nameTH: "ชีวิตพิศวงของ วอลเตอร์ มิตตี้", 
       desc: "The manager of the negative assets sector of Life magazine, Walter Mitty, has been working for sixteen years for the magazine and has a tedious life, not going anywhere but from his home to his job and vice-versa.",
       imgCover: "images/mitty2.jpg",priceDvd: 250,discountDvd: 199, 
       genre: [false,true,false,false,true,false,false,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false]
    },
    {  id: 1,nameEN: "Interstellar", nameTH: "ทะยานดาวกู้โลก ", 
       desc: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
       imgCover: "images/inter2.jpg",priceDvd: 300,discountDvd: 219,
       genre: [false,true,false,false,false,false,false,true,false,false,false,false,false,false,false,false,false,true,false,false,false,false]
    },
    {  id: 2,nameEN: "Guardians of the Galaxy", nameTH: "รวมพันธุ์นักสู้พิทักษ์จักรวาล", 
       desc: "A group of intergalactic criminals are forced to work together to stop a fanatical warrior from taking control of the universe.",
       imgCover: "images/guar2.jpg",priceDvd: 300,discountDvd: 209, 
       genre: [true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,false,false,false,false]
    },
    {  id: 3,nameEN: "John Wick", nameTH: "ชีวิตพิศวงของ วอลเตอร์ มิตตี้", 
       desc: "The manager of the negative assets sector of Life magazine, Walter Mitty, has been working for sixteen years for the magazine and has a tedious life, not going anywhere but from his home to his job and vice-versa.",
       imgCover: "images/johnwick2.jpg",priceDvd: 250,discountDvd: 199, 
       genre: [false,true,false,false,true,false,false,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false]
    } 
  ];

  // All movies
  $scope.fetchAmount = 100;
  $scope.movies = [ ];
  $http.get("php/GetMovies.php").success(function(data){
    $scope.dbmovies = data;
    for(i=0;i<data.length;i++){
      console.log(data[i].imgPoster);
      $scope.movies.push({
        id:data[i].id, nameEN:data[i].nameEN, genre1:data[i].genre1, genre2:data[i].genre2, genre3:data[i].genre3, 
        desc:data[i].synopsis, sound:data[i].sound, subtitle:data[i].subtitle, runtime:data[i], releaseDate:data[i].releaseDate,
        priceCd:data[i].priceCd, priceDvd:data[i].priceDvd, priceBluray:data[i].priceBluray, discountCd:data[i].discountCd, discountDvd:data[i].discountDvd,
        discountBluray:data[i].discountBluray, cd:data[i].cd, dvd:data[i].dvd, bluray:data[i].bluray, cdSold:data[i].cdSold, dvdSold:data[i].dvdSold,
        bluraySold:data[i].bluraySold, onSale:data[i].onSale, imgPoster:data[i].imgPoster, imgCover:data[i].imgCover  
      });
    }
  });

  $scope.showInfoMovie;
  $scope.clickImage = function(index){
    $scope.showInfoMovie = $scope.movies[index];
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

