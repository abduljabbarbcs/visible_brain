var slideModule = angular.module('slideModule', []);
slideModule.controller('slideController', ['$scope','$stateParams','SlidesFactory','UserLoginFactory','OverlayFactory','$filter','$compile','$timeout',
 function($scope,$stateParams,SlidesFactory,UserLoginFactory,OverlayFactory,$filter,$compile,$timeout){
            $scope.resetData = function(){
                $('#addOverlay').modal('hide');
                $scope.overlayPoints = [];
                $scope.overlayInfo={};
                dataPoints=[];
                data=[];
                $scope.loaded = true;
                $scope.overlayInfo.name="";
                $scope.overlayInfo.description="";
                $scope.zoom = zoom;
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
                        lineGraph = d3.select(overlay.node()).append("path")
                                .attr("class","currentPath")
                                .style("stroke-width", 0.005)
                                .style("stroke",$scope.overlayColor)
                                .style("fill", "none");
                    }
                    lineGraph
                      .datum(dataPoints)
                      .attr("d", line);
                },
                init: function() {
                    self = this;
                    var tileSource = {
                        Image: {
                            xmlns: "http://schemas.microsoft.com/deepzoom/2008",
                            Url: "/assets/img/dzi image/"+$scope.slide.slidePath+"_files/",
                            Format: "jpg",
                            Overlap: "1",
                            TileSize: "254",
                            Size: {
                                Height: "3061",
                                Width:  "4096"
                            }
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
            if($("#add").attr("disabled")!="disabled")
            {
                $(".currentPath").remove();
                $(".oldPath").remove();
                $scope.zoom = zoom;
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
                      [d3.event.x-width, d3.event.y-height]
                    );
                    if(data.length === 0 )
                    {
                        $scope.overlayPoints.push({
                            "x":(d3.event.x - p.x - width)/scale,
                            "y":(d3.event.y - p.y - height)/scale,
                            "start":true
                        });
                        $scope.enable=true;
                    }
                    else{
                        $scope.overlayPoints.push({
                            "x":(d3.event.x - p.x - width)/scale,
                            "y":(d3.event.y - p.y - height)/scale
                        });
                    }
                    data.push([(d3.event.x - p.x - width)/scale, (d3.event.y - p.y - height)/scale])
                    if (!drawObj.currentPath){
                      drawObj.currentPath = svg.append("path")
                        .attr("class","currentPath")
                        .style("stroke-width", 1)
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
             $scope.color = "#ff0000";
             $scope.loaded = true;
             $scope.treeStart = true;
             $scope.drawOverlay = function(overlayInfo){
                 $(".highlight").removeClass("highlight");
                 $("#la"+overlayInfo.id).addClass("highlight");
//                 #("#la"+overlayInfo.id)
                 $scope.isDescription=true;
                 $scope.id = overlayInfo.id;
                 $scope.description = overlayInfo.description;
                 $scope.overlayColor = overlayInfo.color;
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
                 angular.forEach(overlayInfo.overlayPoints, function(point, key){
                     if(point.start && count == 0)
                     {
                         count++;
                         data.push([point.x,point.y])
                     }
                     else if(count >= 1 && point.start)
                     {
                         self.viewer.viewport.zoomTo(overlayInfo.zoom,null,false);
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
                 self.viewer.viewport.zoomTo(overlayInfo.zoom,null,false);
                 App.save(data);
             }
             $scope.treeData=[];
             var count = 0;
             $scope.tree = function(){
                if($scope.treeStart)
                {
                    $scope.treeData=[];
                    var complete = false;
                    angular.forEach($scope.slide.overlayInfos,function(value,key){
//                       $scope.treeData[key]=( $filter('filter')($scope.slide.overlayInfos, { parent:{id: value.id}}));
                       $scope.treeData[key] = $scope.filterParent(value.id);
                       if($scope.treeData[key].length > 0)
                       {

//                            angular.forEach($scope.treeData[key],function(child,key){
//                                var ul = '<li><span id="sp'+child.id+'"><i class="fa fa-file-image-o"></i></span> <label class="margin-left-label" ng-click="drawOverlay('child')">'+child.name+'</label><ul id="'+child.id+'"></ul></li>';
//                                $("#"+value.id).append(ul);
//                                $compile($("#"+value.id))($scope);
//                            });
                               $timeout(function(){

                                var elem = (document.getElementById(value.id));
                                $("#sp"+value.id+" i").removeClass("fa-file-image-o").addClass("fa-minus")
                                var ul = '<li ng-repeat="overlay in treeData['+key+']"><span id="sp{{overlay.id}}"><i class="fa fa-file-image-o"></i></span> <label class="margin-left-label" ng-click="drawOverlay(overlay)" id="la{{overlay.id}}">{{overlay.name}}</label><ul id="{{overlay.id}}"></ul></li>';
                                $("#"+value.id).append(ul);
                                $compile($("#"+value.id))($scope);
                                },10);
                                count = count+10;
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
                     $scope.treeStart = true;
                     $scope.tree();
                 });
             };
              $scope.closeError = function(){
                 $scope.isError = false;
                 $scope.errorMsg = "";
             };
             $scope.saveOverlay =function(){
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
                         $scope.jsonData = {
                            "name":$scope.overlayInfo.name,
                            "description":$scope.overlayInfo.description,
                            "zoom":$scope.zoom,
                            "color":$scope.color,
                            "overlayPoints":$scope.overlayPoints,
                            "overlayInfo":{
                                "id":$scope.overlayInfo.parent
                            },
                            "slide":{
                                "id":$scope.slide.id
                            }
                         }
                         var localData = OverlayFactory.save({}, $scope.jsonData);
                         localData.$promise.then(function(result) {
                             $scope.loaded = true;
                             $scope.getSlide();
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
}]);