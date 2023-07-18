$(document).ready(function(){
    $('header').load($('header').attr('data-include-path'));
    $('footer').load($('footer').attr('data-include-path'));

    // $('ul.sample_wrap').delegate('click','li', function(){
    //     alert('a')
    // });
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

/* topbtn */
let top_btn = document.querySelector('.top_btn')
console.log(top_btn)
window.addEventListener('scroll', function(){
    if(this.scrollY > 300){/* 높이값 변경을 원할 시, 숫자 부분 수정 */
        top_btn.classList.add('show'); 
    }else{
        top_btn.classList.remove('show')
    }
})

top_btn.addEventListener('click',function(){
    window.scrollTo({top: 0, behavior: 'smooth'});
})

/* fullpage*/
// let pageable = new Pageable("#container");
