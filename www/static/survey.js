//var apipath='http://127.0.0.1:8000/mrepmobile_new/android_acme/'
//var apipath='http://m.businesssolutionapps.com/mrepmobile/android_acme/'
var apipath='http://e.businesssolutionapps.com/mrepmobile/android_acme/'


var mobile_off_flag=0;

//-------GET GEO LOCATION
function getLocationInfo() { //location
	navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

// onSuccess Geolocation
function onSuccess(position) {
	$("#lat").val(position.coords.latitude);
	$("#long").val(position.coords.longitude);
	
	$("#lat_p").val(position.coords.latitude);
	$("#long_p").val(position.coords.longitude);
	
	$("#checkLocation").html('Location Confirmed');
	$("#checkLocationProfileUpdate").html('Location Confirmed');	
}

function onError(error) {
	$("#lat").val(0);
	$("#long").val(0);
	
	$("#lat_p").val(0);
	$("#long_p").val(0);
	
	$("#checkLocation").html('Location not found');
	$("#checkLocationProfileUpdate").html('Location not found');
	}

// -------------- If Not synced, Show login
function first_page(){
	if ((localStorage.synced!='YES')){
		var url = "#login";
		$.mobile.navigate(url);		
	}
}

// -------------- visit page show if mobile off 
function cancelVisitPage(){
	localStorage.visit_page=""
	mobile_off_flag=0;
	
	localStorage.visitMarketStr=""
	localStorage.visit_distributor_nameid=""
	localStorage.visit_type=""
	localStorage.scheduled_date=""
	localStorage.visit_client=""
	
	var url = "#pageHome";
	$.mobile.navigate(url);
}

//================= Clear authorization
function clear_autho(){	
	var check_clear=$("input[name='clear_auth_check']:checked").val();
	
	if(check_clear!='Yes'){
		$("#error_login").html("Required Confirm Clear");			
	}else{
		localStorage.base_url='';
		localStorage.photo_url='';
		
		localStorage.cid='';
		localStorage.user_id='';
		localStorage.user_pass='';
		localStorage.synccode='';
		localStorage.marketListStr='';
		localStorage.productListStr='';
		localStorage.marchandizingItem='';
		localStorage.distributorListStr='';	
		localStorage.synced=''
		
		localStorage.client_string=''	
		localStorage.visit_client=''
		
		localStorage.visit_type=''
		localStorage.scheduled_date=''
		localStorage.visitMarketStr=''
		localStorage.visit_distributor_nameid=''
		localStorage.marchandizingStr=''
		localStorage.clientProfileStr=''
		
			
		localStorage.product_tbl_str=''
		
		localStorage.product_tbl_del_str=''
		
		localStorage.distributor_name=''
		localStorage.delivery_date=''
		localStorage.dis_client_string=''
		
		localStorage.plan_market=''
		localStorage.plan_date=''
		
		localStorage.m_plan_client_string=''
		localStorage.plan_ret_name=''
		
		localStorage.marketInfoStr=''
		localStorage.marketInfoSubmitStr=''
		localStorage.productOrderStr=''
		localStorage.marchandizingInfoStr=''
		
		localStorage.visit_plan_marketlist_combo=''
		localStorage.visit_plan_client_cmb_list=''
		localStorage.delivery_distributor_cmb_list=''
		localStorage.delivery_retailer_cmb_list=''
		localStorage.market_cmb_list_cp=''
		localStorage.unschedule_market_cmb_id=''
		
		localStorage.profile_m_client_org_id=''
		
		//----------
		localStorage.campaign_string=''	
		localStorage.visit_camp_list_str=''
		localStorage.visit_camp_submit_str=''
		//------
		localStorage.brand_list_string=''
		
		localStorage.visit_page=""
		
		//----------- empty brand data from local storage
		var brandList = localStorage.brand_list_string.split('<rd>');
		var brandListLength=brandList.length	
		for (var i=0; i < brandListLength; i++){
			var brandName = brandList[i]
			if(brandName!=""){
				var brandCharStr=brandName.replace(' ','').replace('-','').replace('.','');
				localStorage[brandCharStr]='';	
			}																					
		}
										
		
		var url = "#login";
		$.mobile.navigate(url);	
		location.reload();
	};
}

function get_login() {
	var url = "#login";
	$.mobile.navigate(url);
	}

							
//========================= Longin: Check user
function check_user() {
	var cid=$("#cid").val();
	var user_id=$("#user_id").val();
	var user_pass=$("#user_pass").val();
	
	var base_url='';
	var photo_url='';
	
	
	//-----
	
	if (cid=="" || cid==undefined ||user_id=="" || user_id==undefined || user_pass=="" || user_pass==undefined){
		var url = "#login";      
		$.mobile.navigate(url);
		$("#error_login").html("Required User ID and Password");	
	}else{
		localStorage.base_url=apipath;
							
		//localStorage.cid='AAGRO';
		localStorage.cid=cid;
		localStorage.user_id=user_id;
		localStorage.user_pass=user_pass;   		
		localStorage.synced='NO'
		
		
		$("#wait_image_login").show();
		$("#loginButton").hide();
		//alert (localStorage.cid);					
		//alert(localStorage.base_url+'check_user?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode);
		//http://127.0.0.1:8000/lscmreporting/syncmobile/check_user?cid=LSCRM&rep_id=1001&rep_pass=123&synccode=
		
//		=================================
		//Get encripted code
		//var urlPerameter=localStorage.cid + separetor + localStorage.user_id + separetor + localStorage.user_pass + separetor + localStorage.synccode + separetor + "42";
		//$("#error_login").html(apipath + 'encript_function?cid=' + localStorage.cid + '&user_id=' + localStorage.user_id + '&user_pass=' + localStorage.user_pass + '&synccode=' + localStorage.synccode );
		
		$.ajax({
				 type: 'POST',
				 url: apipath + 'encript_function?cid=' + localStorage.cid + '&user_id=' + localStorage.user_id + '&user_pass=' + localStorage.user_pass + '&synccode=' + localStorage.synccode ,
				 success: function(result) {
						if (result.length > 50){
							resultArray=result.split('<Synccode>');
							localStorage.httppass=resultArray[1];
							localStorage.synccode=resultArray[2];
							var url_parameter_en=resultArray[0];
							localStorage.url_parameter_en=url_parameter_en;
							//alert (localStorage.synccode);
							//localStorage.httppass='airnetMreport2009';
							
							//$("#error_login").html(url_parameter_en);	
							
							
						}else{							
							 $("#error_login").html('Problem in encription');
							 $("#wait_image_login").hide();
					  		 $("#loginButton").show();	
							// $("#error_login").html(apipath + 'encript_function?cid=' + localStorage.cid + '&user_id=' + localStorage.user_id + '&user_pass=' + localStorage.user_pass + '&synccode=' + localStorage.synccode );		
						}
					  },
				  error: function(result) {	
				     // alert ('aaaa');					 
					  $("#wait_image_login").hide();
					  $("#loginButton").show();
					  $("#error_login").html('Invalid Request');
					  
					  var url = "#login";
					  $.mobile.navigate(url);	
				  }
			  });//end ajax*/
		
//		===================================
		
		
		//Hit for login
		if (localStorage.url_parameter_en.length >50){
			
			//$("#error_login").html(apipath + 'syncRep?cid=' + localStorage.cid + '&string_get=' + localStorage.url_parameter_en );
			$.ajax({
					 type: 'POST',
					 url: apipath + 'syncRep?cid=' + localStorage.cid + '&string_get=' + localStorage.url_parameter_en ,
					 success: function(result) {
							//$("#error_login").html(result);
							if (result==''){
								$("#wait_image_login").hide();
								$("#loginButton").show();
								$("#error_login").html('Sorry Network not available');
								
							}else{							
										
								if (result.length < 100){
									$("#wait_image_login").hide();
									$("#loginButton").show();								
									//$("#error_login").html(resultArray[1]);
									
								}else if (result.length >100){
																	
									if ((result.indexOf("<START>")!=-1) || (result.indexOf("<END>")!=-1)){
										var resultArray = result.split('</USERTYPE>');
										var user_type=resultArray[0].replace('<START><USERTYPE>','');
										
										
										
										var result_1=resultArray[1]
										var user_typeArray = result_1.split('<fd><rd></SUBMODE>');
										var submode=user_typeArray[0].replace('<SUBMODE>','');
										
										var submodeArray=user_typeArray[1].split('<fd><rd></HTTPPASS>');
										var httppass=submodeArray[0].replace('<HTTPPASS>','');;
										
										var httppassArray=submodeArray[1].split('</SETTINGSMODE>');
										var settingsmode=httppassArray[0].replace('<SETTINGSMODE>','');
										
										var settingArray=httppassArray[1].split('</AREASTART>');
										var area=settingArray[0].replace('<AREASTART>','');
										
										var areaArray=settingArray[1].split('</BUYERSTART>');
										var buyer=areaArray[0].replace('<BUYERSTART>','');
										
										var buyerArray=areaArray[1].split('</PRODUCTSTART>');
										var product=buyerArray[0].replace('<PRODUCTSTART>','');
										
										var disareaArray=buyerArray[1].split('</DISTRIBUTORAREASTART>');
										var distributorArea=disareaArray[0].replace('<DISTRIBUTORAREASTART>','');
										
										var distributorareaArray=disareaArray[1].split('</DISTRIBUTORCATEGORYSTART>');
										var distributorCatagory=distributorareaArray[0].replace('<DISTRIBUTORCATEGORYSTART>','');
										
										
										
										var p_1=product.replace('<PRODUCTSTART>','');
										var p_2=product.replace('</PRODUCTSTART>','');
										
										var a_1=area.replace('<AREASTART>','');
										var a_2=area.replace('</AREASTART>','');
										
										var b_1=buyer.replace('<BUYERSTART>','');
										var b_2=buyer.replace('</BUYERSTART>','');
										
										
										
										
										
										
										
										localStorage.user_type=user_type;
										localStorage.submode=submode;
										localStorage.httppass=httppass;
										localStorage.settingsmode=settingsmode;
										
										localStorage.buyer=buyer;
										
										localStorage.marketListStr=a_2;
										localStorage.productListStr=p_2;
										localStorage.distributorListStr=resultArray[5];	
										
										
										localStorage.distributorArea=distributorArea;
										localStorage.distributorCatagory=distributorCatagory;

										

									
									
									//------------ Order Item list		
									var productList=localStorage.productListStr.split('<rd>');
									var productLength=productList.length;						
									var product_tbl_order='<table border="0" id="order_tbl" cellpadding="0" cellspacing="0" style="background-color:#F7F7F7; border-radius:5px;">';
									//alert (productLength);
									for (var j=0; j < productLength-1; j++){
										var pArray = productList[j].split('<fd>');
										
										var product_name=pArray[0];	
										var product_id=pArray[1];
										var product_price=pArray[2];
										var product_category=pArray[3];
										
										var product_qty='';																		
										product_tbl_order+='<tr  style="border-bottom:1px solid #D2EEE9;"><td width="40%" style="text-align:center; padding-left:5px;"><input type="number" id="order_qty'+product_id+'" value="'+product_qty+'" placeholder="0" ><input type="hidden" id="order_id'+product_id+'" value="'+product_id+'" ><input type="hidden" id="order_price'+product_id+'" value="'+product_price+'" ><input type="hidden" id="order_name'+product_id+'" value="'+product_name.toUpperCase()+'" placeholder="qty" ></td><td width="60%" style="text-align:left;">&nbsp;&nbsp;'+product_name.toUpperCase()+'</td></tr>';
										
									}
									product_tbl_order+='</table>';								
									localStorage.product_tbl_str=product_tbl_order
									//alert (localStorage.product_tbl_str);
									
									$("#product_list_tbl").html(localStorage.product_tbl_str);
									
									//------------- Visit Plan Market List / Client Profile Market List / Unschedule
									var planMarketList = localStorage.marketListStr.split('<rd>');
									var planMarketListShowLength=planMarketList.length	
									
									var visitPlanMarketComb=''								
									var profileMarketComb='';								
									var unscheduleMarketComb='';
									
									for (var k=0; k < planMarketListShowLength; k++){
										var planMarketValueArray = planMarketList[k].split('<fd>');
										planMarketID=planMarketValueArray[0];
										planMarketName=planMarketValueArray[1];
										marketID=planMarketID
										marketName=planMarketName
										var marketNameID=planMarketName+'-'+planMarketID;
										
										if(planMarketID!=''){
											unscheduleMarketComb+='<li class="ui-btn ui-shadow ui-corner-all ui-btn-icon-left ui-icon-location" style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin"><a onClick="marketNextLV(\''+marketNameID+'\')">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+marketNameID+'</a></li>';
											//visitPlanMarketComb+='<li class="ui-btn ui-shadow ui-corner-all ui-btn-icon-left ui-icon-location" style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin"><a onClick="visitPlanMarketNextLV(\''+marketNameID+'\')">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+marketNameID+'</a></li>';
											//profileMarketComb+='<li class="ui-btn ui-shadow ui-corner-all ui-btn-icon-left ui-icon-location" style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin"><a onClick="marketNextCProfileLV(\''+marketNameID+'\')">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+marketNameID+'</a></li>';
											}
									}
																	
									//localStorage.visit_plan_marketlist_combo=visitPlanMarketComb;								
									localStorage.unschedule_market_cmb_id=unscheduleMarketComb
									localStorage.market_cmb_list_cp=profileMarketComb;
									
									
									
									
									}
									
								
									//---------------
									$("#error_login").html('');
									$("#wait_image_login").hide();
									$("#loginButton").show();
									
									//----------------
									localStorage.visit_page=""
														
									localStorage.synced='YES';
								    var url = "#pageHome";
									$.mobile.navigate(url);								
									location.reload();
									
								}else{
									$("#wait_image_login").hide();
									$("#loginButton").show();
									$("#error_login").html('Server Error');							
									}
							}
						  },// end success
					  error: function(result) {					 
						  $("#wait_image_login").hide();
						  $("#loginButton").show();
						 // $("#error_login").html('Invalid Request');
						  
						  var url = "#login";
						  $.mobile.navigate(url);	
					  }
				  });//end ajax
								
			}// end enflag if
						//-------------		
		  }//end else	
	}//function

function getOtherOutlet(){	
	if (mobile_off_flag==1){
		mobile_off_flag=0;
		
		var url = "#pageHome";
		$.mobile.navigate(url);
		
	}else{
		var visit_type=localStorage.visit_type;
		//alert(visit_type);
		if (visit_type=="Scheduled"){
			var url = "#page_scheduled";
			$.mobile.navigate(url);
			
		}else if(visit_type=="Unscheduled"){
			var url = "#page_market_ret";
			$.mobile.navigate(url);
		};
	};
}


//------------------------------Unsheduled visit: market
function addMarketList() {
	//$("#btn_unschedule_market").hide();
	//$("#wait_image_unschedule_market").show();
	$("#unschedule_market_combo_id").val('');
	
	var unschedule_market_combo_list=localStorage.unschedule_market_cmb_id;
	
	//---
	//alert (localStorage.httppass);
	/*var unschedule_market_combo_ob=$('#unschedule_market_combo_id');
	unschedule_market_combo_ob.empty()
	unschedule_market_combo_ob.append(unschedule_market_combo_list);
	unschedule_market_combo_ob[0].selectedIndex = 0;*/
	
	var unschedule_market_combo_ob=$('#unschedule_market_combo_id_lv');
	unschedule_market_combo_ob.empty()
	unschedule_market_combo_ob.append(unschedule_market_combo_list);
	
	//-------	
	var url = "#page_market";
	$.mobile.navigate(url);
	//unschedule_market_combo_ob.selectmenu("refresh");
	unschedule_market_combo_ob.listview("refresh");
}

//--------------------------------- Unsheduled visit: Client list by market id

function marketNextLV(lvalue) {
	$("#unschedule_market_combo_id").val(lvalue);
	//alert(lvalue);
	marketNext();	
	}

function marketNext() {
	localStorage.client_list_str='';
	$("#unscheduled_m_client_combo_id").val('');
	
	market_name=$("#unschedule_market_combo_id").val();
	
	if(market_name=='' || market_name==0){
		$("#err_market_next").text("Market required");
	}else{
		$("#err_market_next").text("");			
		$("#btn_unschedule_market").hide();
		$("#wait_image_unschedule_market").show();		
		
		
		//visitMarketStr
		var marketNameId=market_name.split('-');
		var market_Id=marketNameId[1];
		
		localStorage.market_Id=market_Id
	//	alert (localStorage.market_Id);
		
		//==================Depot according to market start============
		//alert (localStorage.distributorArea);
		var depot_area_string=localStorage.distributorArea;
		var depot_areaList = depot_area_string.split('<rd>');
		var depot_area_stringLength=depot_areaList.length;	

			
		var depot='';	
		
		for (var i=0; i < depot_area_stringLength-1; i++){
			if ( depot_areaList[i].length > 0){
				var depotArray = depot_areaList[i].split('<fd>');
				var depotID=depotArray[0];
				var depotName=depotArray[1];
				var depotArea=depotArray[2];
				//alert (depotArea)
				if(depotArea == market_Id){
					depot=depotID;
					localStorage.depot=depot;
					localStorage.depot_name=depotName;
					
					}
				
			}
								
		}
			
		//==================Depot according to market end============
		
		
		
		
			
		//==================create buyer list according to market start============
		var client_string=localStorage.buyer;
		var clientList = client_string.split('<rd>');
		var client_stringLength=clientList.length;	

			
		var client_list_str='';	
		//alert (localStorage.buyer);
		for (var i=0; i < client_stringLength; i++){
			if ( clientList[i].length > 0){
				var clientArray = clientList[i].split('<fd>');
				var clientID=clientArray[0];
				var clientName=clientArray[1];
				var clientMarket=clientArray[2];
				if(clientMarket == market_Id){
					client_list_str=client_list_str + clientID + '<fd>' + clientName +'<fd><rd>';
					
					}
				
			}
								
		}
			
		//==================create buyer list according to market end============
		//alert ('client_list_str');
		if (client_list_str==''){
			$("#err_market_next").text("Sorry Network not available");	
			$("#wait_image_unschedule_market").hide();		
			$("#btn_unschedule_market").show();
		}else{					
								
				localStorage.client_list_str=client_list_str;
				var m_client_string=client_list_str;
				//----------------
				var visit_type="Unscheduled";
				var scheduled_date="";
				
				//-----------------------------------
								
				var mClientList = m_client_string.split('<rd>');
				var mClientListShowLength=mClientList.length	
				
				//var unscheduled_m_client_list='<option value="0" > Select Retailer</option>'
				var unscheduled_m_client_list=''
				for (var i=0; i < mClientListShowLength; i++){
					var mClientValueArray = mClientList[i].split('<fd>');
					var mClientID=mClientValueArray[0];
					var mClientName=mClientValueArray[1];
					if(mClientID!=''){
						//unscheduled_m_client_list+='<option value="'+mClientName+'-'+mClientID+'" >'+mClientName+'-'+mClientID+'</option>';
						unscheduled_m_client_list = unscheduled_m_client_list+'<li class="ui-btn ui-shadow ui-corner-all ui-btn-icon-left ui-icon-location" style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin"><a onClick="marketRetailerNextLV(\''+mClientName+'-'+mClientID+'\')">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+mClientName+'-'+mClientID+'</a></li>';
						}								
				}

								
				var unscheduled_m_client_combo_ob=$('#unscheduled_m_client_combo_id_lv');
				unscheduled_m_client_combo_ob.empty()
				unscheduled_m_client_combo_ob.append(unscheduled_m_client_list);
												
				$(".market").html(market_name);								
				$(".visit_type").html(visit_type);								
				$(".s_date").html(scheduled_date);
				
				localStorage.visit_type=visit_type
				localStorage.scheduled_date=scheduled_date
				
				//-----------------------------------
				$("#err_market_next").text("");
				$("#wait_image_unschedule_market").hide();		
				$("#btn_unschedule_market").show();
								
					//------- 
					var url = "#page_market_ret";	
					$.mobile.navigate(url);
					
					//unscheduled_m_client_combo_ob.selectmenu("refresh");
					unscheduled_m_client_combo_ob.listview("refresh");
					
				}
			}

}

//--------------------------------- Unsheduled visit: retailer next
function marketRetailerNextLV(lvalue) {
	$("#unscheduled_m_client_combo_id").val(lvalue);
	//alert(lvalue);
	marketRetailerNext();	
	}

function marketRetailerNext() {
	$("#err_m_retailer_next").text("");
	visit_client=$("#unscheduled_m_client_combo_id").val();		
	
	if(visit_client=='' || visit_client==0){
			$("#err_m_retailer_next").text("Retailer required");
		}else{
			$("#btn_unschedule_market_ret").hide();
			$("#wait_image_unschedule_market_ret").show();		
			
			visitClientId=visit_client.split('-')[1]
			if (visitClientId==''){
				$("#err_m_retailer_next").text("Sorry Network not available");
				$("#wait_image_unschedule_market_ret").hide();		
				$("#btn_unschedule_market_ret").show();
			}else{
				$("#wait_image_unschedule_market_ret").hide();		
				$("#btn_unschedule_market_ret").show();
				var visitMarketStr=$("#unschedule_market_combo_id").val();
							
				visit_distributor_nameid=localStorage.depot_name + '-' + localStorage.depot;
				$(".market").html(visitMarketStr);
				$(".visit_distributor").html(visit_distributor_nameid);
				$(".visit_client").html(visit_client);
					
				localStorage.visit_client=visit_client;
				localStorage.visitMarketStr=visitMarketStr;
				localStorage.visit_distributor_nameid=visit_distributor_nameid
				
				localStorage.visit_page="YES"
				
				//--------
				$("#err_m_retailer_next").text("");
				$("#wait_image_unschedule_market_ret").hide();		
				$("#btn_unschedule_market_ret").show();

				var url = "#page_visit";
				$.mobile.navigate(url);
				//location.reload();

			}

		}
}





//--------------------------------- Order: Show order from home
function getOrder(){	
	
	var url = "#page_order";	
	$.mobile.navigate(url);	
	//-----
	
	/*var productList=localStorage.productListStr.split('<rd>');
	var productLength=productList.length;
	//alert (localStorage.productListStr);
	for (var i=0; i < productLength; i++){
		var productArray2 = productList[i].split('<fd>');
		var product_id2=productArray2[1];	
		var product_name2=productArray2[0];
		$("#order_qty"+product_id2).val('');
		//alert (product_id2);
	}*/
	//alert (localStorage.productOrderStr);
	if (localStorage.productOrderStr.length >0 ){
		var orderProductList=localStorage.productOrderStr.split('_');
		var orderProductLength=orderProductList.length;
		for (var j=0; j < orderProductLength; j++){
			var orderProductIdQtyList=orderProductList[j].split('-');
			if(orderProductIdQtyList.length==2){
				var orderProductId=orderProductIdQtyList[0];
				var orderProductQty=orderProductIdQtyList[1];		
				$("#order_qty"+orderProductId).val(orderProductQty);
			}		
		}
	}
}

//--------------------------------- Order: Set Order data
function getOrderData(){	
	var productList=localStorage.productListStr.split('<rd>');
	var productLength=productList.length;						
	var productOrderStr='';
	for (var j=0; j < productLength-1; j++){
		var productArray = productList[j].split('<fd>');
		var product_id=productArray[1];
		var pid=$("#order_id"+product_id).val();
		var pname=$("#order_name"+product_id).val();
		var pqty=$("#order_qty"+product_id).val();
		//alert (j);
		//alert (pqty);
		if (pqty!='' && eval(pqty) > 0){
			if (productOrderStr==''){
				productOrderStr=pid+'-'+pqty
				productOrderShowStr=pname+'('+pqty+')'
			}else{
				productOrderStr+='_'+pid+'-'+pqty
				productOrderShowStr+=', '+pname+'('+pqty+')'
				}		
		}
	}
	
	
	
	
	localStorage.productOrderStr=productOrderStr
	//alert (localStorage.productOrderStr);
	
	var url = "#page_cart";	
	$.mobile.navigate(url);	
		
	}



//-----VISIT SUBMIT
function lscVisitSubmit(){	
	$("#errorChkVSubmit").text("");
	
	visitClientId=localStorage.visit_client.split('-')[1]	
	visit_type=localStorage.visit_type
	
	if (localStorage.scheduled_date==''){
		var d = new Date();
		localStorage.scheduled_date= d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
	}
	scheduled_date=localStorage.scheduled_date
	
	localStorage.marketInfoSubmitStr = undefined;
	localStorage.marchandizingInfoStr = undefined;
	localStorage.visit_camp_submit_str = undefined;
	imageName='';
	
	marketInfoStr=localStorage.marketInfoSubmitStr //Generated by Done
	productOrderStr=localStorage.productOrderStr
	marchandizingInfoStr=localStorage.marchandizingInfoStr //Generated by Done
	campaign_str=localStorage.visit_camp_submit_str //Generated by Done
	
	if (marketInfoStr==undefined){
		marketInfoStr=''
		}
	if (productOrderStr==undefined){
		productOrderStr=''
		}
	
	//----------------------- marchandizing status check
	if (marchandizingInfoStr==undefined){
		marchandizingInfoStr=''
	}else{
		var marchandizingList=marchandizingInfoStr.split('<rd>');	
		var marchandizingItemLength=marchandizingList.length;	
		var photoRequired="No";
		for (var i=0; i < marchandizingItemLength; i++){		
			var marchandizingArray = marchandizingList[i].split('<fd>');
			var item_status=marchandizingArray[5];	
			if(item_status=='Bad'){
				photoRequired="Yes";
				break;
				}
		}
	}
	
	//------------------------
	if (campaign_str==undefined){
		campaign_str=''
		}
	
	var lscPhoto=$("#lscPhoto").val();
	var lat=$("#lat").val();
	var long=$("#long").val();
	var now = $.now();
	lat==0;
	long==0;
		//if (lat=='' || lat==0 || long=='' || long==0){
		if (lat=='' || long=='' ){
			$("#errorChkVSubmit").html('Location not Confirmed');		
		}else{
			
			if (visitClientId=='' || visitClientId==undefined){
				$("#errorChkVSubmit").html('Invalid Client');		
			}else{
				if(visit_type=='' || visit_type==undefined){
					$("#errorChkVSubmit").html('Invalid Visit Type');
				}else{
					$("#btn_visit_submit").hide();
					$("#wait_image_visit_submit").show();		
					
					
					

//		===================================
					
					
					
					
					
					
					
					
					

					//$("#errorChkVSubmit").text(localStorage.base_url+'visitSubmit?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&client_id='+visitClientId+'&visit_type='+visit_type+'&schedule_date='+scheduled_date+'&market_info='+marketInfoStr+'&order_info='+productOrderStr+'&merchandizing='+marchandizingInfoStr+'&campaign='+campaign_str+'&lat='+lat+'&long='+long+'&visit_photo='+imageName+'&httpPass='+localStorage.httppass+'&depot='+localStorage.depot+'&area_id='+localStorage.market_Id)
					// ajax-------
					$.ajax({
						 type: 'POST',
						 url: localStorage.base_url+'visitSubmit?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass+'&synccode='+localStorage.synccode+'&client_id='+visitClientId+'&visit_type='+visit_type+'&schedule_date='+scheduled_date+'&market_info='+marketInfoStr+'&order_info='+productOrderStr+'&merchandizing='+marchandizingInfoStr+'&campaign='+campaign_str+'&lat='+lat+'&long='+long+'&visit_photo='+imageName+'&httpPass='+localStorage.httppass+'&depot='+localStorage.depot+'&area_id='+localStorage.market_Id,
						 success: function(result) {
								
								//alert(result);
								if (result==''){					
									//$("#errorChkVSubmit").html('Sorry Network not available');
									$("#wait_image_visit_submit").hide();
									$("#btn_visit_submit").show();									
								}else{					
									var resultArray = result.split('success');			
									var result_string=resultArray[1].replace('END','');
										//-----------
										localStorage.visit_client=''
										//localStorage.visit_type=''
										//localStorage.scheduled_date=''
										localStorage.marchandizingStr=''
										localStorage.productOrderStr=''

										
										//-------------
										$("#errorChkVSubmit").html('');
										$("#lat").val('');
										$("#long").val('');
										$("#lscPhoto").val('');
										document.getElementById('myImage').src = '';
										
										$("#lat_p").val('');
										$("#long_p").val('');								
										
										$("#checkLocation").html('');
										$("#checkLocationProfileUpdate").html('');
										
										$("#wait_image_visit_submit").hide();
										$("#btn_visit_submit").show();
										

										
										//--
										$("#visit_result").html(result_string);
										
										
										
										
										
										
										
										// Clear localStorage
										
										localStorage.productOrderStr='';
										localStorage.visit_client='';
										localStorage.visit_type='';
										
										
										
										
										var url = "#page_confirm_visit_success";	
										$.mobile.navigate(url);

								}
							  },
						  error: function(result) {			  
								$("#errorChkVSubmit").html('Invalid Request');
								$("#wait_image_visit_submit").hide();
								$("#btn_visit_submit").show();	
						  }
					 });//end ajax	
				}
			}
		  }//locaction check

  }









//--------------------------------------------- Exit Application
function exit() {	
	navigator.app.exitApp();
}



//--------------------Item Search Start----------------
function search_item() {	
	var p_name=$("#item_search").val();
	
	
	
	/*var string=p_name;
	var n=string.split(".");
	var vfinal=""
	for(i=0;i<n.length;i++)
	{
	   var spaceput=""
	   var spaceCount=n[i].replace(/^(\s*).*$/,"$1").length;
	   n[i]=n[i].replace(/^\s+/,"");
	   var newstring=n[i].charAt(n[i]).toUpperCase() + n[i].slice(1);
	   for(j=0;j<spaceCount;j++)
	   spaceput=spaceput+" ";
	   vfinal=vfinal+spaceput+newstring+".";
	 }
	 vfinal=vfinal.substring(0, vfinal.length - 1);*/
	 
	
	vfinal=p_name.toUpperCase()
	
	
	
	
	var productList=localStorage.productListStr.split('<rd>');
	var productLength=productList.length;										
	for (var j=0; j < productLength; j++){				
		var orderItemArray = productList[j].split('<fd>');
		var product_name=orderItemArray[0];	
		var product_id=orderItemArray[1];
		
		if (product_name.indexOf(vfinal)==0){
			//alert (product_name);
			jQuery("#order_qty"+product_id).focus().select();
			$("#item_search").val('');
			return;
		}
				
	}
	
}


//--------------------Item Search End----------------

//--------------------cart Start----------------
function cart_data() {	
	
	if (localStorage.productOrderStr.length >0){
		var orderProductList=localStorage.productOrderStr.split('_');
		var orderProductLength=orderProductList.length;
		var product_tbl_cart_str='<table border="1" width="100%"  bordercolor="#CCCCCC" id="order_tbl" cellpadding="0" cellspacing="0" style="background-color:#F7F7F7; border-radius:5px;">';
		var total_value=0
		for (var j=0; j < orderProductLength; j++){
			var orderProductIdQtyList=orderProductList[j].split('-');
			if(orderProductIdQtyList.length==2){
				var orderProductId=orderProductIdQtyList[0];
				var orderProductQty=orderProductIdQtyList[1];
				//alert (orderProductId+'    '+orderProductQty);
				var product_name=$("#order_name"+orderProductId).val(); 
				var product_price=$("#order_price"+orderProductId).val(); 
				var total= parseFloat(product_price)* parseFloat(orderProductQty);
				total_value=total_value+total;
				//alert (orderProductQty);
				product_tbl_cart_str=product_tbl_cart_str+'<tr  style="border-bottom:1px solid #D2EEE9;"><td width="20%" style="text-align:center; padding-left:5px;">'+orderProductQty+'</td><td width="80%" style="text-align:left;">&nbsp;&nbsp;'+product_name+'</td></tr>';
				}
		
		}
		product_tbl_cart_str=product_tbl_cart_str+'</table>';								
		localStorage.product_tbl_cart=product_tbl_cart_str
		localStorage.total_value=total_value.toFixed(2);
		$("#product_list_tbl_cart").html(localStorage.product_tbl_cart);
		$("#product_total_cart").html("Total Order Amount: "+localStorage.total_value + " BDT");

	}
	else{
		var url = "#page_order";	
		$.mobile.navigate(url);
	}
	
	
	
	
}
//----------------------cart end----------------