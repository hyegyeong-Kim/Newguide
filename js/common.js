$(document).ready(function(){
    $('header').load($('header').attr('data-include-path'));
    $('footer').load($('footer').attr('data-include-path'));
});

function ajax(_url){
    $.ajax({
        url: './'+_url+'.html',
        method: 'get',
        //dataType:'html',
        success: function(data) {
            if(data){
                $('.content').html(data);
            } else {
                console.log(data+'를 불러오지 못했습니다.');
            }
        },
        complete: function(data) {
        },
        error: function(data) {
            alert('페이지를 불러오지 못했습니다.');
        }
    });
}

function move_scroll(_this, _target){
    $('html, body').animate({
        scrollTop: _target.eq(_this.index()).offset().top
    });
}