/**
 * 
 */
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;
google.maps.event.addDomListener(window, 'load', 
function(){
	var directionsRerenderOptions = {
			markerOptions:{
			icon: new google.maps.MarkerImage("img/OilWell3.png")
	
			}};
	directionsDisplay = new google.maps.DirectionsRenderer();
	directionsDisplay.setOptions(directionsRerenderOptions);
	map=new google.maps.Map(document.getElementById('div_map'),{
		zoom:5,
		center: new google.maps.LatLng(19.430, -99.100),
		mapTypeId:google.maps.MapTypeId.ROADMAP
	});
	directionsDisplay.setMap(map);
	
/**/
	var info5=new google.maps.InfoWindow;
	var clickMarker5= function(){
		var marker= this;
		var latLng= marker.getPosition();
		info5.setContent('<h2>CANCUN</h2><img src="img/OilWell2.png"/>'+"<br /><br />"
				+"latitude "+latLng+"<br /><br />"+
				'<h3>Site type: oil.</h3>'+
				"<a href='https://es.wikipedia.org/wiki/Canc%C3%BAn'/a>" );
		info5.open(map, marker);
	};

	google.maps.event.addListener(map, 'mouseout',function(){
			info5.close();
	});

	var marker5=new google.maps.Marker({
		map:map,
		position:new google.maps.LatLng(19.17, -88.077),

	});
	google.maps.event.addListener(marker5,'mouseover',clickMarker5);
	

/**/

	var info4=new google.maps.InfoWindow;
	var clickMarker4= function(){
		var marker= this;
		var latLng= marker.getPosition();
		info4.setContent('<h2>City of Mexico</h2><img src="img/Oil-Barrel-icon.png"/>'+"<br /><br />"
				+"latitude "+latLng+"<br /><br />"+
				'<h3>Site type: Gas.</h3>'+
				"<a href='https://es.wikipedia.org/wiki/Ciudad_de_M%C3%A9xico'/a>" );
		info4.open(map, marker);
	};

	google.maps.event.addListener(map, 'mouseout',function(){
			info4.close();
	});

	var marker4=new google.maps.Marker({
		map:map,
		position:new google.maps.LatLng(19.425, -99.142),

	});
	google.maps.event.addListener(marker4,'mouseover',clickMarker4);
		

	var info6=new google.maps.InfoWindow;
	var clickMarker6= function(){
		var marker= this;
		var latLng= marker.getPosition();
		info6.setContent('<h3>Veracruz </h3><img src="img/OilWell2.png"/>'+"<br /><br />"
				+"latitude "+latLng+'<h3>Site type: Oil.</h3>'+
				"<a href='http://veracruz.gob.mx/'>Link of site Veracruz</a>");
		info6.open(map, marker);
	};

	google.maps.event.addListener(map, 'mouseout',function(){
			info6.close();
	});
		
	var marker6=new google.maps.Marker({
		map:map,
		position:new google.maps.LatLng(19.7955159,  -98.3896181),
	});
	google.maps.event.addListener(marker6,'mouseover',clickMarker6);
	

	 

var info2=new google.maps.InfoWindow;
var clickMarker2= function(){
	var marker= this;
	var latLng= marker.getPosition();
	info2.setContent('<h2>SINALOA</h2><img src="img/Oil-Barrel-icon.png"/>'+"<br /><br />"
			+"latitude "+latLng+"<br /><br />"+
			'<h3>Site type: Gas.</h3>'+
			"<a href='http://www.mexicodesconocido.com.mx/mexico-estados-monografia-sinaloa.html'>Link of site Sonora</a>" );
	info2.open(map, marker);
};

google.maps.event.addListener(map, 'mouseout',function(){
		info2.close();
});

var marker2=new google.maps.Marker({
	map:map,
	position:new google.maps.LatLng(24.766, -107.427),

});
google.maps.event.addListener(marker2,'mouseover',clickMarker2);

var info3=new google.maps.InfoWindow;
var clickMarker3= function(){
	var marker= this;
	var latLng= marker.getPosition();
	info3.setContent('<h2>MATAMOROS</h2><img src="img/OilWell2.png"/>'
			+"<br /><br />"
			+"latitude "+latLng+"<br /><br />"+
			'<h3>Site type: Oil.</h3>'+
			"<a href='http://matamoros.gob.mx/inicio/</a>"		
	);
	info3.open(map, marker);
};

google.maps.event.addListener(map, 'mouseout',function(){
		info3.close();
});


	
var marker3=new google.maps.Marker({
	map:map,
	position:new google.maps.LatLng(25.859, -97.494),

});
google.maps.event.addListener(marker3,'mouseover',clickMarker3);


});

var robot;
function handleDirectionsResponse(start, escale, directionsResult){
	directionsDisplay.setDirections(directionsResult);
	var routes = directionsResult.routes;
	for(var i=0; i<routes.length; i++){
		var totalDistance = 0;
		var legs = routes[i].legs;
		for(j=0; j<legs.length; j++){
			totalDistance += legs[j].distance.value;
		}
		document.getElementById("distance").innerHTML= Math.round(totalDistance/1000);
var month = ((totalDistance/1000) /730)/0.1;

	
		if ((totalDistance/1000) <=0 ){
			robot = 0;
		}if ((totalDistance/1000) <=403.2 ){
			robot = 1;
		}if ((totalDistance/1000) >403.2 && (totalDistance/1000)<=806.4){
			robot = 2; 
		}if ((totalDistance/1000) >806.4 && (totalDistance/1000)<=1209.6){
			robot = 3;
		}if ((totalDistance/1000) >1209.6 && (totalDistance/1000)<=1612.8){
			robot = 4;
		}if ((totalDistance/1000) >1612.8 && (totalDistance/1000)<=2016){
			robot = 5;
		}if ((totalDistance/1000) >2016){
			robot = "No aply";
		}
		document.getElementById("rrobo").innerHTML= robot;
		
	}
		
  }


function calcRoute(){
	var start = document.getElementById("start").value;
	var escale = document.getElementById("escale").value;
	var request = { origin: start, destination: escale,
		travelMode: google.maps.DirectionsTravelMode.DRIVING
	};
	directionsService.route(request, function(directionsResult, status){
		if(status==google.maps.DirectionsStatus.OK){
			handleDirectionsResponse(
					start, escale, directionsResult);
		}
	});
	

	
}



var rob;

function handleDirectionsResponsefirst(escale, end, directionsResults){
	directionsDisplay.setDirections(directionsResults);
	var routes = directionsResults.routes;
	for(var ai=0; ai<routes.length; ai++){
		var totalDistances = 0;
		var legs = routes[i].legs;
		for(ja=0; ja<legs.length; ja++){
			totalDistances += legs[ja].distance.value;
		}
		document.getElementById("distance1").innerHTML= Math.round(totalDistances/1000);
	
		if ((totalDistances/1000) <=403.2 ){
			rob = 1;
					
		}if ((totalDistances/1000) >403.2 && (totalDistances/1000)<=806.4){
			rob = 2; 
					
		}if ((totalDistances/1000) >806.4 && (totalDistances/1000)<=1209.6){
			rob = 3;
			
		}if ((totalDistances/1000) >1209.6 && (totalDistances/1000)<=1612.8){
			rob = 4;
			
		}if ((totalDistances/1000) >1612.8 && (totalDistances/1000)<=2016){
			rob = 5;
			
		}
				
		document.getElementById("rob").innerHTML= rob;
		
	}
 }

function calcRoute1(){
	var escale = document.getElementById("escale").value;
	var end = document.getElementById("end").value;

	var request = { origin: escale, destination: end,
		travelMode: google.maps.DirectionsTravelMode.DRIVING
	};
	directionsService.route(request, function(directionsResults, status){
		if(status==google.maps.DirectionsStatus.OK){
			handleDirectionsResponsefirst(
					escale, end,  directionsResults);
		}
	});
	
 }



  