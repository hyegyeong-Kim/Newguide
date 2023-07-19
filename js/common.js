// var $ = jQuery;
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
            }
        },
        complete: function(data) {
        },
        error: function(data) {
            alert('페이지를 불러오지 못했습니다.');
        }
    });
}

/* topbtn */
let top_btn = document.querySelector('.top_btn')
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

/* 해당위치 스크롤 */
function move_scroll(_this, _target){
    $('html, body').animate({scrollTop: _target.eq(_this.index()).offset().top});
}

/* fullpage*/
// let pageable = new Pageable("#container");

/* Scroll Indicator */
window.onscroll = function() {myFunction()};
function myFunction() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop; /* 요소의 스크롤바 내린 양 (스크롤양) */
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  /* 브라우저의 크기에 따른 높이 계산법 =  해당 페이지의 총 높이: scrollHeight - 눈에 보이는 요소의 높이:  clientHeight*/
  var scrolled = (winScroll / height) * 100;
  document.querySelector(".progress_bar").style.width = scrolled + "%";
}
/* cursor event */
var cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', function(e){
    cursor.style.cssText = "left:" + e.clientX + "px; top :" + e.clientY + "px;";
})

/* typing_animation */
/* text_rolling */

/* count_animation */
const counter = ($counter, max) => {
    let now = max;
    const handle = setInterval(() => {
      $counter.innerHTML = Math.ceil(max - now);
      // 목표수치에 도달하면 정지
      if (now < 1) {clearInterval(handle);}
      // 증가되는 값이 계속하여 작아짐
      const step = now / 10;
      // 값을 적용시키면서 다음 차례에 영향을 끼침
      now -= step;}, 50);}
  window.onload = () => {
    // 카운트를 적용시킬 요소
    const $counter = document.querySelectorAll(".count");
    const max = [333,345,3436];//카운터 데이터 배열형태 숫자로 입력
    for(let i=0; i<$counter.length; i++){
        setTimeout(() => counter($counter[i], max[i]), 2000);
    }
  }

/* tab new function */
const tab = document.querySelectorAll('.tab_wrap > ul');
tab.forEach(function(e, i){
    tab_child = tab[i].querySelectorAll('a');
    tab_child.forEach(function(e, i){
        e.parentNode.setAttribute('data-index',i)
        e.addEventListener('click', function(){
            for(j=0; j<tab_child.length; j++){
                if(i != j){
                    e.closest('ul').children[j].classList.remove('current')
                }
            }
            e.parentNode.classList.add('current')
        });
    });
});
/* //tab new function */

/* tab_menu */
// let tab_wrap = document.querySelectorAll('.tab_wrap')
// let ul_tab_type_auto = document.querySelectorAll('ul[class*="tab_type"]')
// let tab_menu_list = document.querySelectorAll('.tab_type_01 li')
// let tab_content = document.querySelectorAll('.tab_content > div')
// if(tab_wrap.length > 0){
//     ul_tab_type_auto.forEach((a)=>{
//         if(a.classList.contains('auto')){
//         for(var i=0; i<a.children.length; i++){ a.children[i].style.width= (100 / a.children.length) + '%';}}
//     })
// }

// tab_wrap.forEach(function(a){
//     let tab_wrap_ul = a.querySelectorAll('ul[class*="tab_type"]')
//     let tab_wrap_li = a.querySelectorAll('.tab_type_01 li')
//     let tab_wrap_tab_content = a.querySelectorAll('.tab_content > div')
//     tab_wrap_li.forEach(function(e, i){
//         e.addEventListener('click', function(){
//         tab_wrap_tab_content.forEach((inner)=>{
//             inner.classList.remove('current') 
//         })
//         tab_wrap_li.forEach((item)=> {
//         item.classList.remove('current')
//         })
//         tab_wrap_li[i].classList.add('current')
//         tab_wrap_tab_content[i].classList.add('current')
//         })
//     })
// })

  /* modal */
let modal_btn = document.querySelector('.btn_ok')
let modal = document.querySelector('#modal')
let modal_btn_close = document.querySelector('.btn_close')
let modal_btn_cancel= document.querySelector('.btn_cancel')
function init(){
  modal_btn_close.addEventListener('click', function(){modal.classList.remove('active');});
  modal_btn_cancel.addEventListener('click', function(){modal.classList.remove('active');});
  modal_btn.addEventListener('click', function(){modal.classList.add('active');});
};

/* toast message */
let _toast = document.querySelector('.toast');
function toast(_type, _message, _time){
    _toast.classList.add('active', _type);
    _toast.innerHTML = '<span>'+_message +'</span>';
  if(_type == 'auto'){
    setTimeout(function(){toast_close()},_time)
  }else if(_type == 'confirm'){
    _toast.innerHTML =
    '<span>'+_message +'</span>'+
    '<a href="#none" onclick="toast_close();" class="btn_close">close</a>';}
}
function toast_close(){_toast.classList.remove('active')}

/* accodian toggle */
let board_type_toggle = document.querySelectorAll('.board_type_toggle')//배열
board_type_toggle.forEach(function(a){
  if(a.classList.contains('single')){
    /* 해당리스트 1개만 오픈 */
    let board_type_toggle_dt = a.querySelectorAll('dt')
      for(let j=0; j<board_type_toggle_dt.length; j++){
        board_type_toggle_dt[j].addEventListener('click', function(){
            let board_type_toggle_dd = a.querySelectorAll('dd');
            board_type_toggle_dd.forEach(function(e){
             
              e.classList.remove('show')
              e.style.maxHeight = null;
            })
            board_type_toggle_dd[j].classList.toggle('show')
            board_type_toggle_dd[j].maxHeight = content.scrollHeight + "px";
          })
      }//2_for   
  }else{
      let board_type_toggle_dt = a.querySelectorAll('dt')
      for(let j=0; j<board_type_toggle_dt.length; j++){
        board_type_toggle_dt[j].addEventListener('click', function(){
            let board_type_toggle_dd = a.querySelectorAll('dd');
            board_type_toggle_dd[j].classList.toggle('show')
          })
      }//2_for   
  }//else
})//forEach

/* Hamberger_Menu */
function ham_btn(){
  document.querySelector('.hamber_btn').addEventListener('click', ()=>{
    console.log(document.querySelector('.hamber_btn'))
    let hamber_btn_cont = document.querySelectorAll('.hamber_btn>span')
    hamber_btn_cont.forEach(function(a){
      a.classList.toggle('on')
    })
  })
}