<?php
// Create connection
include "ConnectDB.php";
$request = json_decode(file_get_contents('php://input'));
$nameEN = $conn->real_escape_string($request->nameEN);
$genre1 = $conn->real_escape_string($request->genre1);
$genre2 = $conn->real_escape_string($request->genre2);
$genre3 = $conn->real_escape_string($request->genre3);
$sound = $conn->real_escape_string($request->sound);
$subtitle = $conn->real_escape_string($request->subtitle);
$runtime = $conn->real_escape_string($request->runtime);
$releaseDate = $conn->real_escape_string($request->releaseDate);
$cd = $conn->real_escape_string($request->cd);
$dvd = $conn->real_escape_string($request->dvd);
$bluray = $conn->real_escape_string($request->bluray);
$priceCd = $conn->real_escape_string($request->priceCd);
$priceDvd = $conn->real_escape_string($request->priceDvd);
$priceBluray = $conn->real_escape_string($request->priceBluray);
$discountCd = $conn->real_escape_string($request->discountCd);
$discountDvd = $conn->real_escape_string($request->discountDvd);
$discountBluray = $conn->real_escape_string($request->discountBluray);
$imgPoster = $conn->real_escape_string($request->imgPoster);
$imgCover = $conn->real_escape_string($request->imgCover);
$synopsis = $conn->real_escape_string($request->synopsis);



$insert_row = $conn->query("INSERT INTO movies(id, nameEN, genre1, genre2, genre3, synopsis, sound, subtitle, runtime, releaseDate, priceCd, priceDvd, priceBluray, discountCd, discountDvd, discountBluray, cd, dvd, bluray, cdSold, dvdSold, bluraySold, sold, onSale, imgPoster, imgCover) VALUES ('$id','$nameEN','$genre1','$genre2','$genre3','$synopsis','$sound','$subtitle','$runtime','$releaseDate','$priceCd','$priceDvd','$priceBluray','$discountCd','$discountDvd','$discountBluray','$cd','$dvd','$bluray','0','0','0','0','0','$imgPoster','$imgCover')");

$conn->close();

?>