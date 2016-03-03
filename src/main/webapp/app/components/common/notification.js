
(function(){
 $("nav a").on("click", function(){
   $("nav").find(".current").removeClass("current");
   $(this).parents('.mainMenu').addClass("current");
});
})();

 function showSuccessMessage(message,messageType,types,type ){
    $.growl({
        title: ' Bootstrap Growl ',
        url: ''

    },{
        type: type,
        element: 'body',
        allow_dismiss: true,

        placement: {
            from: 'top',
            align: 'center'
        },
        delay: 4000,
        spacing: 10,
        z_index: 1031,
        timer: 1000,
        url_target: '_blank',
        mouse_over: false,

        animate: {
            enter: 'animated fadeInDown',
            exit: 'animated fadeOut'
        },
        offset: {
            x: 20,
            y: 85
        },
        icon_type: 'class',

        template: '<div class="alert alert-success alert-dismissible" role="alert" style="background-color:green;color:#fff">'+
                  '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true"></span></button>'+
                        'Well done! You successfully '+messageType +' <b>'+ message +'</b> ' +types +' '+
                    '</div>'
    });
};

function showErrorMessage(message, type){
    $.growl({
        title: ' Bootstrap Growl ',
        url: ''

    },{
        type: type,
        element: 'body',
        allow_dismiss: true,

        placement: {
            from: 'top',
            align: 'center'
        },
        delay: 4000,
        spacing: 10,
        z_index: 1031,
        timer: 1000,
        url_target: '_blank',
        mouse_over: false,

        animate: {
            enter: 'animated fadeInDown',
            exit: 'animated fadeOut'
        },
        offset: {
            x: 20,
            y: 85
        },
        icon_type: 'class',

        template: '<div class="alert alert-danger alert-dismissible" role="alert" style="background-color:red">'+
                  '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true"></span></button>'+
                        'Error! You are broken  <b>'+ message +'</b> already exist'+
                    '</div>'
    });
};



 function showNotification(notification, type){
    $.growl({
        title: ' Bootstrap Growl ',
        url: ''

    },{
        type: type,
        element: 'body',
        allow_dismiss: true,

        placement: {
            from: 'bottom',
            align: 'right'
        },
        delay: 4000,
        spacing: 10,
        z_index: 1031,
        timer: 1000,
        url_target: '_blank',
        mouse_over: false,

        animate: {
            enter: 'animated fadeInUp',
            exit: 'animated fadeOut'
        },
        offset: {
            x: 20,
            y: 85
        },
        icon_type: 'class',

        template: '<div data-growl="container" class="listview flyNotify" role="alert">' +
        '<div class="lv-body c-overflow">' +
        '<a class="lv-item" href="">' +
        ' <div class="media">' +
        '<div class="notifyDevice pull-left">' +
        '<img class="lv-img-sm" src="/static/smartorbis/assets/img/icons/device-icons/'+notification.device_type_id+'-white.png" alt="">' +
        '</div>' +
        '<div class="media-body">' +
        '<div class="lv-title">'+notification.device_id+' <span class="noteType '+notification.type+'">'+notification.type+'</span></div>' +
        '<small class="lv-small">'+notification.message+'</small>' +
        '</div>' +
        '</div>' +
        ' </a>' +
        '</div>' + 
        '</div>'
    });
};

