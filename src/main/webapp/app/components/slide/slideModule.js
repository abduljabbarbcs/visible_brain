var slideModule = angular.module('slideModule', []);
slideModule.controller('slideController', ['$scope','$stateParams','SlidesFactory','UserLoginFactory','OverlayFactory',
 function($scope,$stateParams,SlidesFactory,UserLoginFactory,OverlayFactory){
            $('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
            $('.tree li.parent_li > span').on('click', function (e) {
                 var children = $(this).parent('li.parent_li').find(' > ul > li');
                 if (children.is(":visible")) {
                     children.hide('fast');
                     $(this).attr('title', 'Expand this branch').find(' > i').addClass('icon-plus-sign').removeClass('icon-minus-sign');
                 } else {
                     children.show('fast');
                     $(this).attr('title', 'Collapse this branch').find(' > i').addClass('icon-minus-sign').removeClass('icon-plus-sign');
                 }
                 e.stopPropagation();
            });
            $scope.resetData = function(){
                $('#addOverlay').modal('hide');
                $scope.overlayPoints = [];
                $scope.overlayInfo={};
                dataPoints=[];
                data=[];
                $scope.loaded = true;
                $scope.overlayInfo.name="";
                $scope.overlayInfo.description="";
                $scope.zoom=0;
                $scope.overlayInfo.parent = -1;
                $scope.enable=false;
             };
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
             $scope.checkLoginUser = function()
             {
                 var data = UserLoginFactory.get();
                 data.$promise.then(function(result) {
                     if(result.admin != undefined)
                     {
                         $("#add").removeAttr("disabled");;
                         $("#add").css("opacity","1");
                         $scope.login = true;
                     }
                 });
             };
             $scope.resetData();
             $scope.login=false;
             $scope.temp=true;
             $scope.color = "#ff0000"
             $scope.getSlide = function(){
                 var data = SlidesFactory.get({id:$stateParams.id});
                 data.$promise.then(function(result) {
                     $scope.slide= result;
                     if($scope.temp){
                        App.init([]);
                        $scope.temp=false;
                     }
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
//                     else if($scope.overlayInfo.parent === -1 && $scope.slide.overlayInfos.length > 0 )
//                     {
//                         $scope.isError=true;
//                         $scope.errorMsg = "Please Select Parent";
//                     }
                     else if($scope.overlayInfo.description==""){
                         $scope.isError=true;
                         $scope.errorMsg = "Please Enter Description";
                     }
                     else{
                         $scope.loaded = false;
                         var jsonData = {
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
                         var localData = OverlayFactory.save({}, jsonData);
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
                $scope.drawOverlay = function(overlayInfo){
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
                var response=OverlayFactory.delete({"id":$scope.id});
                    response.$promise.then(function(result) {
                			$scope.getSlide()
                },function(){
                	alert("Error DeviceId or Device_type is not valid");
                });
             };
//              scrollbar('.c-overflow', 'rgba(0,0,0,0.5)', '5px');
}]);