var slideModule = angular.module('slideModule', []);
slideModule.controller('slideController', ['$scope','$stateParams','SlidesFactory','UserLoginFactory', function($scope,$stateParams,SlidesFactory,UserLoginFactory){
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
            var overlay;
            // ----------
            App = {
                save: function(dataPoints){

//                       var lineData = [ { "x": 1,   "y": 1},{ "x": 0.5,  "y": 1},{ "x": 1,  "y": 0.5}, { "x": 1,  "y": 0},{ "x": 2,  "y": 1},  { "x": 1, "y": 3}];//This is the accessor function we talked about above
//                       var lineFunction = d3.svg.line().x(function(d) { return d.x; }).y(function(d) { return d.y; }).interpolate("basis");//The SVG Container
                       var line = d3.svg.line()
                            .interpolate("basis");
                       var lineGraph = d3.select(overlay.node()).append("path")
                                .attr("class","currentPath")
                                .style("stroke-width", 0.005)
                                .style("stroke",'red')
                                .style("fill", "none");
                            lineGraph
                              .datum(dataPoints)
                              .attr("d", line);

                },
//                convert: function(data){
//                    for (var temp in data)
//                    {
//                    //;debugger
//
//                        var webPoint = new OpenSeadragon.Point(data[temp][0], data[temp][1]);
//
////                        console.log(webPoint);
//                        var viewportPoint = this.viewer.viewport.pointFromPixel(webPoint,true);
//
//                        // Convert from viewport coordinates to image coordinates.
//                        var imagePoint = this.viewer.viewport.viewportToImageCoordinates(viewportPoint);
////                        data[temp][0]=imagePoint.x/4096;
////                        data[temp][1]=imagePoint.y/3061;
//
//                        console.log(imagePoint.x);
//                        // Show the results.
//                        console.log(webPoint.toString(), viewportPoint.toString(), imagePoint.toString());
//
//                    }
//                    return data;
//                },
                // ----------
                init: function() {
                    self = this;

                    var tileSource = {
                        Image: {
                            xmlns: "http://schemas.microsoft.com/deepzoom/2008",
                            Url: "/assets/img/dzi image/1002_files/",
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
            $(document).ready(function() {
                App.init([]);
            });
            $('#remove').on('click',function(){
                  $('#infoi').remove();
               });
           $('#add').on('click',function(e){
            if($("#add").attr("disabled")!="disabled")
            {
            var iDiv = document.createElement('div');
            iDiv.id = 'infoi';
            data=[];
             console.log("here",p.x,p.y,scale);
//             iDiv.className = 'openseadragon1';
            document.getElementById('container').appendChild(iDiv);
                     // $('#contentDiv').prop('disabled',true);
                   var svg = d3.select('#infoi')
                  .append('svg')
                  .attr('width', 100+'%')
                  .attr('height', 100+'%');
                var line = d3.svg.line()
                    .interpolate("basis");

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
//                    console.log(height,width);
                    drawObj.dataPoints.push(
                      [d3.event.x-width, d3.event.y-height]
                    );
//                    console.log(d3.event.x,d3.event.y);
//                    console.log(d3.event.x,d3.event.y);
                    data.push([(d3.event.x - p.x - width)/scale, (d3.event.y - p.y - height)/scale])
//                      data.push([(d3.event.x + 425.823587063051 - width)/711.8823913753675, (d3.event.y + 621.9411956876835-height)/711.8823913753675])
                    if (!drawObj.currentPath){
                      drawObj.currentPath = svg.append("path")
                        .attr("class","currentPath")
                        .style("stroke-width", 1)
                        .style("stroke",drawObj.color)
                        .style("fill", "none");
                    }
                    drawObj.currentPath
                      .datum(drawObj.dataPoints)
                      .attr("d", line);
                  }
                });
                svg.on("mouseup", function(){
//                  console.log(data);
//                  data = App.convert(data);
//                  console.log(data)
                  App.save(data)
//                  console.log(data);
                  drawObj.isDown = false;
                  drawObj.currentPath.attr("class","oldPath");
                  drawObj.dataPoints = [];
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
            //controller
             $("#add").attr("disabled",'disabled');
             $("#add").css("background-color","silver");
             $scope.checkLoginUser = function()
             {
                 var data = UserLoginFactory.get();
                 data.$promise.then(function(result) {
                     if(result.admin != undefined)
                     {
                         $("#add").removeAttr("disabled");;
                         $("#add").css("background-color","transparent");
                     }
                 });
             };
             $scope.getSlide = function(){
                 var data = SlidesFactory.get({id:$stateParams.id});
                 data.$promise.then(function(result) {
                     $scope.slide= result;
                 });
             };
             $scope.getSlide();
             $scope.checkLoginUser();
}]);