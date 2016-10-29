var app = angular.module('MovieStore',[]);

app.controller('PromotionMovieController', function ($scope) {
  var currIndex = $scope.currIndex = 0;
  $scope.infoId = 0;
  $scope.hotmovies = [
    {  id: 0,nameEN: "Secret life of mitty", nameTH: "ชีวิตพิศวงของ วอลเตอร์ มิตตี้", 
       desc: "The manager of the negative assets sector of Life magazine, Walter Mitty, has been working for sixteen years for the magazine and has a tedious life, not going anywhere but from his home to his job and vice-versa.",
       image: "images/mitty2.jpg",price1: 250,price2: 199
    },
    {  id: 1,nameEN: "Interstellar", nameTH: "ทะยานดาวกู้โลก ", 
       desc: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
       image: "images/inter2.jpg",price1: 300,price2: 219
    },
    {  id: 2,nameEN: "Guardians of the Galaxy", nameTH: "รวมพันธุ์นักสู้พิทักษ์จักรวาล", 
       desc: "A group of intergalactic criminals are forced to work together to stop a fanatical warrior from taking control of the universe.",
       image: "images/guar2.jpg",price1: 300,price2: 209
    },
    {  id: 3,nameEN: "Secret life of mitty", nameTH: "ชีวิตพิศวงของ วอลเตอร์ มิตตี้", 
       desc: "The manager of the negative assets sector of Life magazine, Walter Mitty, has been working for sixteen years for the magazine and has a tedious life, not going anywhere but from his home to his job and vice-versa.",
       image: "images/mitty2.jpg",price1: 250,price2: 199
    },
    {  id: 4,nameEN: "Interstellar", nameTH: "ทะยานดาวกู้โลก ", 
       desc: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
       image: "images/inter2.jpg",price1: 300,price2: 219
    },
    {  id: 5,nameEN: "Guardians of the Galaxy", nameTH: "รวมพันธุ์นักสู้พิทักษ์จักรวาล", 
       desc: "A group of intergalactic criminals are forced to work together to stop a fanatical warrior from taking control of the universe.",
       image: "images/guar2.jpg",price1: 300,price2: 209
    }
  ];

  var movies = $scope.movies = [
    {  id: 0,nameEN: "Secret life of mitty", nameTH: "ชีวิตพิศวงของ วอลเตอร์ มิตตี้", 
       desc: "The manager of the negative assets sector of Life magazine, Walter Mitty, has been working for sixteen years for the magazine and has a tedious life, not going anywhere but from his home to his job and vice-versa.",
   	   image: "images/mitty1.jpg",price1: 250,price2: 199
   	},
    {  id: 1,nameEN: "Interstellar", nameTH: "ทะยานดาวกู้โลก ", 
       desc: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
       image: "images/inter1.jpg",price1: 300,price2: 219
    },
    {  id: 2,nameEN: "Guardians of the Galaxy", nameTH: "รวมพันธุ์นักสู้พิทักษ์จักรวาล", 
       desc: "A group of intergalactic criminals are forced to work together to stop a fanatical warrior from taking control of the universe.",
       image: "images/guar1.jpg",price1: 300,price2: 209
    }
  ];

  $scope.addSlide = function() {
    movies.push({
      id: currIndex++,nameEN: "Secret life of mitty", nameTH: "ชีวิตพิศวงของ วอลเตอร์ มิตตี้", 
      desc: "The manager of the negative assets sector of Life magazine, Walter Mitty, has been working for sixteen years for the magazine and has a tedious life, not going anywhere but from his home to his job and vice-versa. He is an escapist, daydreaming into a world of fantasy many times a day. Walter has a crush on the recently hired Cheryl Melhoff but he is too shy to invite her on a date and he is trying to contact her via online dating. The magazine is preparing to release its last printed edition and the loathsome manager of transition Ted Hendricks is preparing an inevitable downsizing over the next few days. Walter has been the liaison between the magazine and the mysterious independent photographer Sean O'Connell who has sent to him a package of negatives and a wallet as a gift for his work. Sean also suggests to the senior management the use of negative 25 for the cover of the last edition. However, Walter cannot find the negative that is missing. Walter has no means to contact Sean and finds a clue that he might be in Greenland. He decides to travel to Greenland to track Sean down in the beginning of an unbelievable adventure.",
      image: "images/mitty1.jpg",price: 129,
    });
  };

  $scope.Click = function(){
    console.log("Hello");
  };

});


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