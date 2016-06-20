var slideModule = angular.module('slideModule', []);
slideModule.controller('slideController', ['$scope','$rootScope','$stateParams','SlidesFactory','UserLoginFactory','OverlayFactory','OverlayUpdateFactory','$filter','$compile','$timeout',
 function($scope,$rootScope,$stateParams,SlidesFactory,UserLoginFactory,OverlayFactory,OverlayUpdateFactory,$filter,$compile,$timeout){

            if($stateParams.header === 'appOverlay')
            {
                $rootScope.header = true;
            }
            else if($stateParams.header === 'overlay')
            {
                $rootScope.header = false;
            }

            $scope.resetData = function(){
                $('#addOverlay').modal('hide');
                $scope.overlayPoints = [];
                $scope.overlayInfo={};
                dataPoints=[];
                data=[];
                $scope.loaded = true;
                $scope.edit = false;
                $("#overlayName").prop("disabled",false);
                $("#parent").prop("disabled",false);
                $scope.overlayInfo.name="";
                $scope.overlayInfo.id = -1;
                $scope.overlayInfo.description="";
                $scope.zoom = zoom;
                $scope.scale = scale;
                $scope.bounds = self.viewer.viewport.getBounds(true);
                $scope.overlayInfo.parent = -1;
                $scope.enable=false;
             };
              $scope.filterParent = function(id)
              {
                 var tempData =[];
                 angular.forEach($scope.slide.overlayInfos,function(value,key)
                 {
                    if(value.parent!=null)
                    {
                         if(value.parent.id === id)
                         {
                             tempData.push(value);
                         }
                    }
                 });
                 return tempData;
              }
            var overlay;
               var line = d3.svg.line()
                                        .interpolate("basis");
             var lineGraph = null;
            // ----------
            App = {
                save: function(dataPoints){

                    if(!lineGraph)
                    {
                        var svg = d3.select('body')
                              .append('svg')
                              .attr('width', 100+'%')
                              .attr('height', 100+'%');
                        lineGraph = svg.append("path")
                                .attr("class","currentPath")
                                .style("stroke-width", $scope.lineWidth)
                                .style("stroke",$scope.overlayColor)
                                .style("fill", "none");
                    }
                    lineGraph
                      .datum(dataPoints)
                      .attr("d", line);
                      html =  html + svg.html();



                },
                init: function() {
                    self = this;
                    var tileSource = {
                        Image: {
                            xmlns: "http://schemas.microsoft.com/deepzoom/2008",
                            Url: "/assets/img/dzi image/"+$scope.slide.slidePath+"_files/",
                            Format: "jpg",
                            Overlap: "1",
                            TileSize: "256",
                            Size:{
                                Height: "103061",
                                Width:  "104096"
                            }
//                            Size: {
//                                Height: "306939",
//                                Width:  "106259"
//                            }
                        }
                    };

                    this.viewer = OpenSeadragon({
                        id: "navi",
                        prefixUrl: "openseadragon/images/",
                        tileSources: [{
                            tileSource: tileSource,
                            width:2,
                            y: 0.5,
                            x: 0.5
                        }]
                    });
                    overlay = this.viewer.svgOverlay();
                    $(window).resize(function() {
                        overlay.resize();
                    });
                }
            };
//            $(document).ready(function() {
//                App.init([]);
//            });

            $('#remove').on('click',function(){
                  $('#infoi').remove();
                  $scope.resetData();
            });
           $('#add').on('click',function(e){
            $scope.isDescription = false;
            if($("#add").attr("disabled") != "disabled")
            {
                $(".currentPath").remove();
                $(".oldPath").remove();
                $scope.zoom = zoom;
                $scope.scale =scale;
                $scope.bounds = self.viewer.viewport.getBounds(true);
                var iDiv = document.createElement('div');
                iDiv.id = 'infoi';
                data=[];
                document.getElementById('container').appendChild(iDiv);
                   var svg = d3.select('#infoi')
                  .append('svg')
                  .attr('width', 100+'%')
                  .attr('height', 100+'%');

                var drawObj = {
                  isDown: false,
                  dataPoints: [],
                  currentPath: null,
                  color:"red"
                }

                svg.on("mousedown", function(){
                  drawObj.isDown = true;

                });
                svg.on("mousemove", function(){
                  if (drawObj.isDown){
                    var height =$("#container").height()*13/100;
                    var width = $("#container").width()*3/100;
                    drawObj.dataPoints.push(
                      [d3.event.clientX-width, d3.event.clientY-height]
                    );
                    if(data.length === 0 )
                    {
                        $scope.overlayPoints.push({
                            "x":(d3.event.clientX - width),
                            "y":(d3.event.clientY - height),
                            "start":true
                        });
                        $scope.enable=true;
                    }
                    else{
                        $scope.overlayPoints.push({
                            "x":(d3.event.clientX - width),
                            "y":(d3.event.clientY - height)
                        });
                    }
                    data.push([(d3.event.x - p.x - width)/scale, (d3.event.y - p.y - height)/scale])
                    if (!drawObj.currentPath){
                      drawObj.currentPath = svg.append("path")
                        .attr("class","currentPath")
                        .style("stroke-width", $scope.lineWidth)
                        .style("stroke",$scope.color)
                        .style("fill", "none");
                    }
                    drawObj.currentPath
                      .datum(drawObj.dataPoints)
                      .attr("d", line);
                  }
            });
            svg.on("mouseup", function(){
              drawObj.isDown = false;
              drawObj.currentPath.attr("class","oldPath");
              drawObj.dataPoints = [];
              data=[];
              drawObj.currentPath = null;
            })
            }
        });
        $(document).on('click', function (e) {
            if (($(e.target).closest($elem).length === 0) && ($(e.target).closest($elem2).length === 0)) {
                setTimeout(function(){
                    $('body').removeClass('modal-open');
                    $($elem).removeClass('toggled');
                    $('#header').removeClass('sidebar-toggled');
                    $($elem2).removeClass('open');
                });
            }
            });
             $("#add").attr("disabled",'disabled');
             $("#add").css("opacity","0.1");
             $scope.admin = false;
             $scope.checkLoginUser = function()
             {
                 var data = UserLoginFactory.get();
                 data.$promise.then(function(result) {
                     if(result.admin != undefined)
                     {
                         $("#add").removeAttr("disabled");;
                         $("#add").css("opacity","1");
                         $scope.login = true;
                         $scope.admin = result.admin;
                     }
                 });
             };
             $scope.login=false;
             $scope.temp=true;
             $scope.color = "#eecccc";
             $scope.lineWidth = 1;
             $scope.loaded = true;
             $scope.treeStart = true;
             $scope.editData;
             oldOverlay=false;
             $scope.drawOverlay = function(overlayInfo){

                 var elt = document.createElement("div");
                 elt.className = "runtime-overlay";
                 elt.id = "runtime-overlay";
                 elt.style.opacity = "1";

                 html =  "<svg width='100%' height='100%' viewBox='0 0 " + self.viewer.container.clientWidth + " " + self.viewer.container.clientHeight + "'>";
                 $(".highlight").removeClass("highlight");
                 $("#la"+overlayInfo.id).addClass("highlight");
//                 #("#la"+overlayInfo.id)
                 $scope.overlayBounds = new OpenSeadragon.Rect(overlayInfo.x,overlayInfo.y,overlayInfo.width,overlayInfo.height);
                 $scope.isDescription=true;
                 $scope.id = overlayInfo.id;
                 $scope.description = overlayInfo.description;
                 $scope.overlayColor = overlayInfo.color;
                 $scope.overlayScale = overlayInfo.scale;
                 $scope.overlayLineWidth = overlayInfo.lineWidth;
                 $('.profile-menu .main-menu').hide();
                 $elem = '#sidebar';
                 $elem2 = '#menu-trigger';

                 $('#chat-trigger').removeClass('open');

                 if (!$('#chat').hasClass('toggled')) {
                     $('#header').toggleClass('sidebar-toggled');
                 }
                 else {
                     $('#chat').removeClass('toggled');
                 }
                 $('.currentPath').remove();
                 $('.oldPath').remove();
                 $scope.resetData();
                 var count = 0;
                 lineGraph=null;
                 if(oldOverlay)
                 {
                     self.viewer.removeOverlay("runtime-overlay");
                 }
                 angular.forEach(overlayInfo.overlayPoints, function(point, key){
                     if(point.start && count == 0)
                     {
                         count++;
                         data.push([point.x,point.y])
                     }
                     else if(count >= 1 && point.start)
                     {

                         self.viewer.viewport.fitBounds($scope.overlayBounds,false)
                         App.save(data);
                         lineGraph.attr("class","oldPath");
                         lineGraph=null;
                         data=[];
                         data.push([point.x,point.y])
                     }
                     else
                     {
                       data.push([point.x,point.y])
                     }
                 });
                 self.viewer.viewport.fitBounds($scope.overlayBounds,false)
//                 if(overlayInfo.zoom < zoom)
//                 {
//                    timer = (zoom - overlayInfo.zoom) * 200 ;
//                 }
//                 else
//                 {
//                    timer =   (overlayInfo.zoom - zoom) * 100;
//                 }
                 $timeout(function(){
                     App.save(data);
                     oldOverlay=true;
                     elt.innerHTML= html + "</svg>";
                     self.viewer.addOverlay({
                           element: elt,
                           location: self.viewer.viewport.getBounds(true)
                       });

                 },500 );
             }
             $("#full").spectrum({
                 color: "#ECC",
                 showInput: true,
                 className: "full-spectrum",
                 showInitial: true,
                 showPalette: true,
                 showSelectionPalette: true,
                 maxSelectionSize: 10,
                 preferredFormat: "hex",
                 localStorageKey: "spectrum.demo",
                 move: function (color) {

                 },
                 show: function () {

                 },
                 beforeShow: function () {

                 },
                 hide: function () {

                 },
                 change: function() {

                 },
                 palette: [
                     ["rgb(0, 0, 0)", "rgb(67, 67, 67)", "rgb(102, 102, 102)",
                     "rgb(204, 204, 204)", "rgb(217, 217, 217)","rgb(255, 255, 255)"],
                     ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 153, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)",
                     "rgb(0, 255, 255)", "rgb(74, 134, 232)", "rgb(0, 0, 255)", "rgb(153, 0, 255)", "rgb(255, 0, 255)"],
                     ["rgb(230, 184, 175)", "rgb(244, 204, 204)", "rgb(252, 229, 205)", "rgb(255, 242, 204)", "rgb(217, 234, 211)",
                     "rgb(208, 224, 227)", "rgb(201, 218, 248)", "rgb(207, 226, 243)", "rgb(217, 210, 233)", "rgb(234, 209, 220)",
                     "rgb(221, 126, 107)", "rgb(234, 153, 153)", "rgb(249, 203, 156)", "rgb(255, 229, 153)", "rgb(182, 215, 168)",
                     "rgb(162, 196, 201)", "rgb(164, 194, 244)", "rgb(159, 197, 232)", "rgb(180, 167, 214)", "rgb(213, 166, 189)",
                     "rgb(204, 65, 37)", "rgb(224, 102, 102)", "rgb(246, 178, 107)", "rgb(255, 217, 102)", "rgb(147, 196, 125)",
                     "rgb(118, 165, 175)", "rgb(109, 158, 235)", "rgb(111, 168, 220)", "rgb(142, 124, 195)", "rgb(194, 123, 160)",
                     "rgb(166, 28, 0)", "rgb(204, 0, 0)", "rgb(230, 145, 56)", "rgb(241, 194, 50)", "rgb(106, 168, 79)",
                     "rgb(69, 129, 142)", "rgb(60, 120, 216)", "rgb(61, 133, 198)", "rgb(103, 78, 167)", "rgb(166, 77, 121)",
                     "rgb(91, 15, 0)", "rgb(102, 0, 0)", "rgb(120, 63, 4)", "rgb(127, 96, 0)", "rgb(39, 78, 19)",
                     "rgb(12, 52, 61)", "rgb(28, 69, 135)", "rgb(7, 55, 99)", "rgb(32, 18, 77)", "rgb(76, 17, 48)"]
                 ]
             });

             $scope.treeData=[];
             var count = 0;
             $scope.tree = function(){
                if($scope.treeStart)
                {
                    $scope.slide.overlayInfos.sort(function(a, b) {
                        return parseFloat(a.id) - parseFloat(b.id);
                    });
                    $scope.treeData=[];
                    var complete = false;
                    angular.forEach($scope.slide.overlayInfos,function(value,key){
//                     $scope.treeData[key]=( $filter('filter')($scope.slide.overlayInfos, { parent:{id: value.id}}));
                       $scope.treeData[key] = $scope.filterParent(value.id);
                       if($scope.treeData[key].length > 0)
                       {

                               $timeout(function(){

                                var elem = (document.getElementById(value.id));
                                $("#sp"+value.id+" i").removeClass("fa-file-image-o").addClass("fa-minus")
                                var ul = '<li ng-repeat="overlay in treeData['+key+']"><span id="sp{{overlay.id}}"><i class="fa fa-file-image-o"></i></span> <label class="margin-left-label" ng-click="drawOverlay(overlay)" id="la{{overlay.id}}">{{overlay.name}}</label><ul id="{{overlay.id}}"></ul></li>';
                                $("#"+value.id).append(ul);
                                $compile($("#"+value.id))($scope);
                                },count);
                                count = count+5;
                        }
                    });
                    $timeout(function(){
                    $('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
                    $('.tree li.parent_li > span').on('click', function (e) {
                        var children = $(this).parent('li.parent_li').find(' > ul > li');
                        if (children.is(":visible")) {
                            children.hide('fast');
                            $(this).attr('title', 'Expand this branch').find(' > i').addClass('fa-plus').removeClass('fa-minus');
                        } else {
                            children.show('fast');
                            $(this).attr('title', 'Collapse this branch').find(' > i').addClass('fa-minus').removeClass('fa-plus');
                        }
                        e.stopPropagation();
                    });
                    },count);
                    $scope.treeStart = false;
                }
             }
             $scope.getSlide = function(){
                 var data = SlidesFactory.get({id:$stateParams.id});
                 data.$promise.then(function(result) {
                     $scope.slide= result;
                     if($scope.temp){
                        App.init([]);
                        $scope.temp=false;
                        $scope.resetData();
                     }
                     var max = -1;
                      var depth = 0, nodes = $scope.slide.overlayInfos.filter(function(item) {
                            return item.parent == null;
                        }), total = nodes.length;

                        do {
                            depth++;
                            nodes.forEach(function(node) {
                                if(max < depth)
                                {
                                    max = depth;
                                }
                            });
                            var ids = nodes.map(function(item) {return item["id"];});
                            nodes = $scope.slide.overlayInfos.filter(function(item) {
                                if(item.parent === null)
                                {
                                    return ids.indexOf(item.parent) > -1
                                }
                                else{
                                    return ids.indexOf(item.parent.id) > -1;
                                }
                            });
                            total += nodes.length
                        } while (nodes.length > 0 && total <= $scope.slide.overlayInfos.length);
                        if(max > 2)
                        {
                            var width = 100 + ((max - 2) * 15);
                            $('.well').css('width', width+'%');
                        }
                        else
                        {
                             $('.well').css('width', '100%');
                        }
                     $scope.treeStart = true;
                     $scope.tree();
                 });
             };
              $scope.closeError = function(){
                 $scope.isError = false;
                 $scope.errorMsg = "";
             };
             $scope.saveOverlay =function(){
                    var localData;
                     if($scope.overlayInfo.name==""){
                         $scope.isError=true;
                         $scope.errorMsg = "Please Enter name";
                     }
                     else if($scope.overlayInfo.description==""){
                         $scope.isError=true;
                         $scope.errorMsg = "Please Enter Description";
                     }
                     else{
                         $scope.loaded = false;
                         if(!$scope.edit)
                         {
                             $scope.jsonData = {
                                "name":$scope.overlayInfo.name,
                                "description":$scope.overlayInfo.description,
                                "zoom":$scope.zoom,
                                "scale":$scope.scale,
                                "color":$scope.color,
                                "lineWidth":$scope.lineWidth,
                                "x":$scope.bounds.x,
                                "y":$scope.bounds.y,
                                "width":$scope.bounds.width,
                                "height":$scope.bounds.height,
                                "overlayPoints":$scope.overlayPoints,
                                "overlayInfo":{
                                    "id":$scope.overlayInfo.parent
                                },
                                "slide":{
                                    "id":$scope.slide.id
                                }
                             }
                             localData = OverlayFactory.save({}, $scope.jsonData);
                         }
                         else
                         {
                             $scope.jsonData = {
                               "id":$scope.overlayInfo.id,
                               "description":$scope.overlayInfo.description
                             }
                              localData = OverlayUpdateFactory.save({}, $scope.jsonData);
                         }

                         localData.$promise.then(function(result) {
                             $scope.loaded = true;
                             $scope.getSlide();
                             $scope.description = $scope.overlayInfo.description;
                             showSuccessMessage($scope.overlayInfo.name,' add overlay ',' into overlays', 'inverse');
                             $scope.resetData();
                         },function(){
                             showErrorMessage($scope.overlayInfo.name,'inverse');
                             $scope.resetData();
                         });
                     }
                 };
                 $scope.closeDescription = function(){
                    $scope.isDescription = false;
                 }
                 $scope.closeDescription();
                $scope.openDialog = function(){
                    if(!$scope.enable)
                    { return; }
                    $("#infoi").remove();
                     $('#addOverlay').modal('show');

                };
                $scope.clear = function(){
                    if(!$scope.enable)
                    { return; }
                      $('.oldPath').remove();
                      $scope.resetData();
                }

             $scope.getSlide();
             $scope.closeError();
             $scope.checkLoginUser();
             $('.c-overflow').niceScroll({
                 cursorcolor: 'rgba(0,0,0,0.3)',
                 cursorborder: 0,
                 cursorborderradius: 0,
                 cursorwidth: '5px',
                 bouncescroll: true,
                 mousescrollstep: 100
             });
             $scope.remove = function(){
                $scope.loaded=false;
                var response=OverlayFactory.delete({"id":$scope.id});
                    response.$promise.then(function(result) {
                        $scope.loaded=true;
                        $(".oldPath").remove();
                        $(".currentPath").remove();
                        showSuccessMessage($scope.overlayInfo.name,' remove overlay ',' from overlays', 'inverse');
                        $scope.isDescription=false;
                		$scope.getSlide();
//                        $("#"+$scope.id).remove();

                },function(){
                	alert("Error DeviceId or Device_type is not valid");
                });
             };
             $scope.editOverlay = function(){
                  $scope.edit = true;
                   $("#overlayName").prop("disabled",true);
                   $("#parent").prop("disabled",true);
                    $scope.overlayInfo.id = $scope.editData.id;
                   $scope.overlayInfo.name = $scope.editData.name;
                   $scope.overlayInfo.parent = $scope.editData.parent.id;
                   $scope.overlayInfo.description = $scope.editData.description;
                   $('#addOverlay').modal('show');
             };
}]);