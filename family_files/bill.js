

var atmSourceData = null;

$( document ).ready(function() {
    console.log( "ready!" );
    createCityOption();
    $('select#city').val('台北市');
    updateRegionOption();
    $('select#region').val('中山區');
    bindingKeywordEvent();
	updateList();
});

//打關鍵字按enter
function bindingKeywordEvent(){
	var input_ele =  $('input#keyword');
	input_ele.on('change keypress paste input',function(ev) {
        //ev.preventDefault();
	var input = $(this);
	setTimeout(function(){		
	    var value = input.val();
	    value = value.replace(/ /g, "");
		console.debug(value);			
		updateList();
	},100);

		
    });

}

//長選單
function createCityOption() {
    var select_ele = $('select#city');
    // alert(select_ele.length);
    select_ele.empty();
    if (atmSourceData == null) {
        getSourceData();
    }
    var cityArray = Object.keys(atmSourceData);
    $.each(cityArray, function(i,d){
    	select_ele.append('<option value="'+d+'">'+d+'</option>');
    });
    select_ele.prepend('<option ">請選擇</option>');
    select_ele.on('change', function(){
		updateRegionOption();
		updateList();
    });				
}

//更新行政區選單
function updateRegionOption(){
	var city = $('select#city').val();
	var select_ele = $('select#region');
	select_ele.empty();

	if (atmSourceData == null) {
        getSourceData();
    }

    
	if(city!=''&&city!=undefined&&city!='請選擇'){
		$.each(Object.keys(atmSourceData[city]), function(i,d){
	    	select_ele.append('<option value="'+d+'">'+d+'</option>');
	    });
	}
	select_ele.prepend('<option ">請選擇</option>');
	select_ele.on('change', function(){
		updateList();
    });		
}


//更新ATM據點資列表
function updateList() {
	var city = $('select#city').val();
	var region = $('select#region').val();
	var keyword = $('input#keyword').val();
	var displayArray = [];

    if (atmSourceData == null) {
        getSourceData();
    }

    // console.log('atmSourceData[city]',atmSourceData[city]);

    if(city!='' && city!=undefined && city!='請選擇'){
	    if(region!='' && region!=undefined && region!='請選擇'){
	    	$.each(atmSourceData[city][region], function(i,d){
				if(keyword!='' &&keyword!=undefined){
					if(d.channel.indexOf(keyword)!=-1 || city.indexOf(keyword)!=-1 || region.indexOf(keyword)!=-1 || d.address.indexOf(keyword)!=-1){
						displayArray.push({channel:d.channel,address:city+region+d.address,lat:d.lat,lng:d.lng});
					}
				}else{
					displayArray.push({channel:d.channel,address:city+region+d.address,lat:d.lat,lng:d.lng});
				}
			});
	    }else{
	    	var regionArray = Object.keys(atmSourceData[city]);
	    	$.each(regionArray, function(r, rd){
		    	$.each(atmSourceData[city][rd], function(i,d){
					if(keyword!='' &&keyword!=undefined){
						if(d.channel.indexOf(keyword)!=-1 || city.indexOf(keyword)!=-1 || rd.indexOf(keyword)!=-1 || d.address.indexOf(keyword)!=-1){
							displayArray.push({channel:d.channel,address:city+rd+d.address,lat:d.lat,lng:d.lng});
						}
					}else{
						displayArray.push({channel:d.channel,address:city+rd+d.address,lat:d.lat,lng:d.lng});
					}
				});    		
	    	});

	    }
	}else{
		var cityArray = Object.keys(atmSourceData);
		$.each(cityArray,function(c,cd){
			var regionArray = Object.keys(atmSourceData[cd]);
	    	$.each(regionArray, function(r, rd){
		    	$.each(atmSourceData[cd][rd], function(i,d){
					if(keyword!='' &&keyword!=undefined){
						if(d.channel.indexOf(keyword)!=-1 || city.indexOf(keyword)!=-1 || rd.indexOf(keyword)!=-1 || d.address.indexOf(keyword)!=-1){
							displayArray.push({channel:d.channel,address:cd+rd+d.address,lat:d.lat,lng:d.lng});
						}
					}else{
						displayArray.push({channel:d.channel,address:cd+rd+d.address,lat:d.lat,lng:d.lng});
					}
				});    		
	    	});
		});
	}
	

	displayList(displayArray,1);
    
    
}

//拿array長畫面
function displayList(displayArray, page){

	var pageBlock = $('.pagination');
	var dataBlock = $('ul.loaction-list');
	var pageSize = 10;

	dataBlock.empty();
	pageBlock.empty();
	if(displayArray.length>pageSize){
		var totalPage = Math.ceil(displayArray.length/pageSize);
		console.log(displayArray.length,pageSize,totalPage);

		GardenUtils.display.pagination({
	        target: $('.pagination'),
	        pageInfo: { totalPage: totalPage, currentPage: page },
	        getPageInfoCallBackFn: function(pageNum) {
	        	displayList(displayArray, pageNum);

	        	 GardenUtils.plugin.screenMoveToEle({
			         moveToObj: $('.loaction-list'),
			        minHeight: $(window).width() > 767? 103 : 58
			    });
	        },
	        nav: { prev: '<', next: '>' }
	    });

	}
	if(displayArray.length>0){
		$.each(displayArray, function(i,d){
			// console.log('i',i);
			if(i>= (page-1)*pageSize && i< (page*pageSize) ){
		    	dataBlock.append('<li><a class="atm-list" href="?lat='+d.lat+'&lng='+d.lng+'">'+
					            '<span class="location-detail">'+
					            '    <span class="location-title">'+d.channel+'</span>'+
					            '    <span class="location-addr">'+d.address+'</span>'+
					            '</span>'+
					            '<span class="location-pin"><img src="images/icon-pin.svg"></span>'+
					        '</a></li>');
	    	}
	    });

	    bindingChangeMap();

	    var firstAtm = $('.atm-list:first');
        firstAtm.parent('li:first').addClass('active');
        firstAtm.parent('li:first').find('img').attr('src', 'images/icon-pin-active.svg');

	    var lat = parseFloat(firstAtm.attr('href').split('lat=')[1].split('&')[0]) ;
		var lng = parseFloat(firstAtm.attr('href').split('lng=')[1]);
		changeGoogleMap(lat,lng);


	}else{
		var mapBlock = $('#map-block').empty();
		mapBlock.append('<div>查無據點資料，請重新輸入關鍵字...</div>');
	}
	

    
}

//取得atm原始json
function getSourceData() {
    $.ajax({
        url: 'data/ATMBase.json',
        dataType: 'html',
        async: false,
        success: function(json) {
            
            atmSourceData = $.parseJSON(json);
            console.log('source data', atmSourceData);
        },
        error:function(e){
        	console.log('ajax error'+e);
        	atmSourceData = {"請選擇":[]};
        }
    });
}

function changeGoogleMap(lat,lng) {
	console.log(lat,lng);
		
		GardenUtils.plugin.showGoogleMap({
			divId : 'map-block',
			zoom : 15,
			location: [{lat: lat, lng: lng}],
			icon : 'images/icon-pin.svg',
			scrollwheel : false,
			showDialog : false,
			mapColorStyle: 'lightGray',            // default, lightGray
			callback: function(){}
		});
}

function bindingChangeMap(){
	$('.loaction-list').find('li').off('click').on('click', function(e){
        e.preventDefault();
        $('.loaction-list > li').find('img').attr('src', 'images/icon-pin.svg');
        $('.loaction-list').find('li').removeClass('active');
        $(this).addClass('active');
        $(this).find('img').attr('src', 'images/icon-pin-active.svg');

        var aEle = $(this).find('a.atm-list');
        var lat = parseFloat(aEle.attr('href').split('lat=')[1].split('&')[0]) ;
		var lng = parseFloat(aEle.attr('href').split('lng=')[1]);
		// var address = aEle.find('.location-addr').html();
		var mapBlock = $('#map-block').empty();
		changeGoogleMap(lat,lng);

		 GardenUtils.plugin.screenMoveToEle({
	         moveToObj: mapBlock,
	        minHeight: $(window).width() > 767? 103 : 58
	    });

		// $('html,body').animate({
  //           scrollTop: mapBlock.offset().top
  //       },1200);

    });
	
}