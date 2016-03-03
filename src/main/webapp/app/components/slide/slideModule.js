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

                       var lineData = [ { "x": 1,   "y": 1},  { "x": 0.5,  "y": 1},                { "x": 1,  "y": 0.5}, { "x": 1,  "y": 0},                 { "x": 2,  "y": 1},  { "x": 1, "y": 3}];//This is the accessor function we talked about above
                       var lineFunction = d3.svg.line().x(function(d) { return d.x; }).y(function(d) { return d.y; }).interpolate("basis");//The SVG Container
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
                            width: 2,
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
                    drawObj.dataPoints.push(
                      [d3.event.x, d3.event.y]
                    );
                    data.push([d3.event.x/600, d3.event.y/300])
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
                  App.save(data)
                  console.log(data);
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