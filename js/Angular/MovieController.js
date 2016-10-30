var app = angular.module('MovieStore',['ui.bootstrap']);

app.controller('menuController', function($scope,$log){
  $scope.contactlist = [
    'Telephone number',
    'Location',
    'E-mail'
  ];
  $scope.stylelist = [
    'Action',
    'Drama',
    'Sci-fi'
  ];
  $scope.status = {
    isopen: false
  };

});

app.controller('MovieController', function ($scope) {
  var currIndex = $scope.currIndex = 0;
  $scope.infoId = 0;

  // function
  $scope.genreList =[ 'Action','Adventure','Animation','Biography','Comedy','Crime','Documentary','Drama','Family','Fantasy',"Film-Noir",
                      'History','Horror','Music','Musical','Mystery','Romance','Sci-fi','Sport','Thriller','War','Western'];
  $scope.catList = ["New Releases","Best Sellers","Promotion","All Movies","Coming Soon"];
  $scope.catStyle = [{},{},{},{},{}];
  $scope.wasSelect = [false,false,false,true,false];

  // Service
  $scope.salemovies = [
    {  id: 0,nameEN: "Secret life of mitty", nameTH: "ชีวิตพิศวงของ วอลเตอร์ มิตตี้", 
       desc: "The manager of the negative assets sector of Life magazine, Walter Mitty, has been working for sixteen years for the magazine and has a tedious life, not going anywhere but from his home to his job and vice-versa.",
       image: "images/mitty2.jpg",price1: 250,price2: 199, 
       genre: [false,true,false,false,true,false,false,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false]
    },
    {  id: 1,nameEN: "Interstellar", nameTH: "ทะยานดาวกู้โลก ", 
       desc: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
       image: "images/inter2.jpg",price1: 300,price2: 219,
       genre: [false,true,false,false,false,false,false,true,false,false,false,false,false,false,false,false,false,true,false,false,false,false]
    },
    {  id: 2,nameEN: "Guardians of the Galaxy", nameTH: "รวมพันธุ์นักสู้พิทักษ์จักรวาล", 
       desc: "A group of intergalactic criminals are forced to work together to stop a fanatical warrior from taking control of the universe.",
       image: "images/guar2.jpg",price1: 300,price2: 209, 
       genre: [true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,false,false,false,false]
    },
    {  id: 3,nameEN: "Secret life of mitty", nameTH: "ชีวิตพิศวงของ วอลเตอร์ มิตตี้", 
       desc: "The manager of the negative assets sector of Life magazine, Walter Mitty, has been working for sixteen years for the magazine and has a tedious life, not going anywhere but from his home to his job and vice-versa.",
       image: "images/mitty2.jpg",price1: 250,price2: 199, 
       genre: [false,true,false,false,true,false,false,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false]
    },
    {  id: 4,nameEN: "Interstellar", nameTH: "ทะยานดาวกู้โลก ", 
       desc: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
       image: "images/inter2.jpg",price1: 300,price2: 219,
       genre: [false,true,false,false,false,false,false,true,false,false,false,false,false,false,false,false,false,true,false,false,false,false]
    },
    {  id: 5,nameEN: "Guardians of the Galaxy", nameTH: "รวมพันธุ์นักสู้พิทักษ์จักรวาล", 
       desc: "A group of intergalactic criminals are forced to work together to stop a fanatical warrior from taking control of the universe.",
       image: "images/guar2.jpg",price1: 300,price2: 209, 
       genre: [true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,false,false,false,false]
    }
  ];

  $scope.hotmovies = [
    {  id: 0,nameEN: "Secret life of mitty", nameTH: "ชีวิตพิศวงของ วอลเตอร์ มิตตี้", 
       desc: "The manager of the negative assets sector of Life magazine, Walter Mitty, has been working for sixteen years for the magazine and has a tedious life, not going anywhere but from his home to his job and vice-versa.",
       image: "images/mitty2.jpg",price1: 250,price2: 199, 
       genre: [false,true,false,false,true,false,false,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false]
    },
    {  id: 1,nameEN: "Interstellar", nameTH: "ทะยานดาวกู้โลก ", 
       desc: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
       image: "images/inter2.jpg",price1: 300,price2: 219,
       genre: [false,true,false,false,false,false,false,true,false,false,false,false,false,false,false,false,false,true,false,false,false,false]
    },
    {  id: 2,nameEN: "Guardians of the Galaxy", nameTH: "รวมพันธุ์นักสู้พิทักษ์จักรวาล", 
       desc: "A group of intergalactic criminals are forced to work together to stop a fanatical warrior from taking control of the universe.",
       image: "images/guar2.jpg",price1: 300,price2: 209, 
       genre: [true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,false,false,false,false]
    }
  ];

  $scope.movies = [
    {  id: 0,nameEN: "Secret life of mitty", nameTH: "ชีวิตพิศวงของ วอลเตอร์ มิตตี้", 
       desc: "The manager of the negative assets sector of Life magazine, Walter Mitty, has been working for sixteen years for the magazine and has a tedious life, not going anywhere but from his home to his job and vice-versa.",
       image: "images/mitty2.jpg",price1: 250,price2: 199, 
       genre: [false,true,false,false,true,false,false,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false]
    },
    {  id: 1,nameEN: "Interstellar", nameTH: "ทะยานดาวกู้โลก ", 
       desc: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
       image: "images/inter2.jpg",price1: 300,price2: 219,
       genre: [false,true,false,false,false,false,false,true,false,false,false,false,false,false,false,false,false,true,false,false,false,false]
    },
    {  id: 2,nameEN: "Guardians of the Galaxy", nameTH: "รวมพันธุ์นักสู้พิทักษ์จักรวาล", 
       desc: "A group of intergalactic criminals are forced to work together to stop a fanatical warrior from taking control of the universe.",
       image: "images/guar2.jpg",price1: 300,price2: 209, 
       genre: [true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,false,false,false,false]
    },
    {  id: 3,nameEN: "Secret life of mitty", nameTH: "ชีวิตพิศวงของ วอลเตอร์ มิตตี้", 
       desc: "The manager of the negative assets sector of Life magazine, Walter Mitty, has been working for sixteen years for the magazine and has a tedious life, not going anywhere but from his home to his job and vice-versa.",
       image: "images/mitty2.jpg",price1: 250,price2: 199, 
       genre: [false,true,false,false,true,false,false,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false]
    },
    {  id: 4,nameEN: "Interstellar", nameTH: "ทะยานดาวกู้โลก ", 
       desc: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
       image: "images/inter2.jpg",price1: 300,price2: 219,
       genre: [false,true,false,false,false,false,false,true,false,false,false,false,false,false,false,false,false,true,false,false,false,false]
    },
    {  id: 5,nameEN: "Guardians of the Galaxy", nameTH: "รวมพันธุ์นักสู้พิทักษ์จักรวาล", 
       desc: "A group of intergalactic criminals are forced to work together to stop a fanatical warrior from taking control of the universe.",
       image: "images/guar2.jpg",price1: 300,price2: 209, 
       genre: [true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,false,false,false,false]
    },
    {  id: 6,nameEN: "Secret life of mitty", nameTH: "ชีวิตพิศวงของ วอลเตอร์ มิตตี้", 
       desc: "The manager of the negative assets sector of Life magazine, Walter Mitty, has been working for sixteen years for the magazine and has a tedious life, not going anywhere but from his home to his job and vice-versa.",
       image: "images/mitty2.jpg",price1: 250,price2: 199, 
       genre: [false,true,false,false,true,false,false,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false]
    },
    {  id: 7,nameEN: "Interstellar", nameTH: "ทะยานดาวกู้โลก ", 
       desc: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
       image: "images/inter2.jpg",price1: 300,price2: 219,
       genre: [false,true,false,false,false,false,false,true,false,false,false,false,false,false,false,false,false,true,false,false,false,false]
    },
    {  id: 8,nameEN: "Guardians of the Galaxy", nameTH: "รวมพันธุ์นักสู้พิทักษ์จักรวาล", 
       desc: "A group of intergalactic criminals are forced to work together to stop a fanatical warrior from taking control of the universe.",
       image: "images/guar2.jpg",price1: 300,price2: 209, 
       genre: [true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,false,false,false,false]
    },
    {  id: 9,nameEN: "Secret life of mitty", nameTH: "ชีวิตพิศวงของ วอลเตอร์ มิตตี้", 
       desc: "The manager of the negative assets sector of Life magazine, Walter Mitty, has been working for sixteen years for the magazine and has a tedious life, not going anywhere but from his home to his job and vice-versa.",
       image: "images/mitty2.jpg",price1: 250,price2: 199, 
       genre: [false,true,false,false,true,false,false,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false]
    },
    {  id: 10,nameEN: "Interstellar", nameTH: "ทะยานดาวกู้โลก ", 
       desc: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
       image: "images/inter2.jpg",price1: 300,price2: 219,
       genre: [false,true,false,false,false,false,false,true,false,false,false,false,false,false,false,false,false,true,false,false,false,false]
    },
    {  id: 11,nameEN: "Guardians of the Galaxy", nameTH: "รวมพันธุ์นักสู้พิทักษ์จักรวาล", 
       desc: "A group of intergalactic criminals are forced to work together to stop a fanatical warrior from taking control of the universe.",
       image: "images/guar2.jpg",price1: 300,price2: 209, 
       genre: [true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,false,false,false,false]
    },
    {  id: 12,nameEN: "Secret life of mitty", nameTH: "ชีวิตพิศวงของ วอลเตอร์ มิตตี้", 
       desc: "The manager of the negative assets sector of Life magazine, Walter Mitty, has been working for sixteen years for the magazine and has a tedious life, not going anywhere but from his home to his job and vice-versa.",
       image: "images/mitty2.jpg",price1: 250,price2: 199, 
       genre: [false,true,false,false,true,false,false,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false]
    },
    {  id: 13,nameEN: "Interstellar", nameTH: "ทะยานดาวกู้โลก ", 
       desc: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
       image: "images/inter2.jpg",price1: 300,price2: 219,
       genre: [false,true,false,false,false,false,false,true,false,false,false,false,false,false,false,false,false,true,false,false,false,false]
    },
    {  id: 14,nameEN: "Guardians of the Galaxy", nameTH: "รวมพันธุ์นักสู้พิทักษ์จักรวาล", 
       desc: "A group of intergalactic criminals are forced to work together to stop a fanatical warrior from taking control of the universe.",
       image: "images/guar2.jpg",price1: 300,price2: 209, 
       genre: [true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,false,false,false,false]
    },
    {  id: 15,nameEN: "Secret life of mitty", nameTH: "ชีวิตพิศวงของ วอลเตอร์ มิตตี้", 
       desc: "The manager of the negative assets sector of Life magazine, Walter Mitty, has been working for sixteen years for the magazine and has a tedious life, not going anywhere but from his home to his job and vice-versa.",
       image: "images/mitty2.jpg",price1: 250,price2: 199, 
       genre: [false,true,false,false,true,false,false,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false]
    },
    {  id: 16,nameEN: "Interstellar", nameTH: "ทะยานดาวกู้โลก ", 
       desc: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
       image: "images/inter2.jpg",price1: 300,price2: 219,
       genre: [false,true,false,false,false,false,false,true,false,false,false,false,false,false,false,false,false,true,false,false,false,false]
    },
    {  id: 17,nameEN: "Guardians of the Galaxy", nameTH: "รวมพันธุ์นักสู้พิทักษ์จักรวาล", 
       desc: "A group of intergalactic criminals are forced to work together to stop a fanatical warrior from taking control of the universe.",
       image: "images/guar2.jpg",price1: 300,price2: 209, 
       genre: [true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,false,false,false,false]
    },
    {  id: 18,nameEN: "Secret life of mitty", nameTH: "ชีวิตพิศวงของ วอลเตอร์ มิตตี้", 
       desc: "The manager of the negative assets sector of Life magazine, Walter Mitty, has been working for sixteen years for the magazine and has a tedious life, not going anywhere but from his home to his job and vice-versa.",
       image: "images/mitty2.jpg",price1: 250,price2: 199, 
       genre: [false,true,false,false,true,false,false,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false]
    },
    {  id: 19,nameEN: "Interstellar", nameTH: "ทะยานดาวกู้โลก ", 
       desc: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
       image: "images/inter2.jpg",price1: 300,price2: 219,
       genre: [false,true,false,false,false,false,false,true,false,false,false,false,false,false,false,false,false,true,false,false,false,false]
    }
  ];

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

