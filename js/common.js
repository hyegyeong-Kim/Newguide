// var $ = jQuery;
$(document).ready(function(){
    $('header').load($('header').attr('data-include-path'));
    $('footer').load($('footer').attr('data-include-path'));

    /*============== sample ==============*/
    /* tab */
    tab_active('.tab_wrap > ul', 'click');
    tab_active('.tab_wrap .tab_wrap > ul', 'mouseover');

    /* accordion */
    accordion('.board_type_toggle', 'click');

    /* go_top */
    go_top('.top_btn');

    /* page scroll progress */
    progress_bar();

    /* follow cusor */
    follow_cursor();
    /*============== //sample ==============*/
});

/* ajax */
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
/* //ajax */

/* tab */
function tab_active(_target, evt) {//_target : 대상 / evt : 핸들러
    var evt,
    tab = document.querySelectorAll(_target);
    
    tab.forEach(el => {
        el.querySelectorAll('a').forEach((el, i) => {
            el.addEventListener(evt, function(){
                const parent_index = Array.from(el.closest('ul').children).indexOf(el.parentNode);
                for(j=0; j<el.closest('ul').childElementCount; j++){
                    el.closest('ul').children[j].classList.remove('current')
                    el.closest('ul').nextElementSibling.children[j].classList.remove('current');
                }
                el.parentNode.classList.add('current');
                el.closest('ul').nextElementSibling.children[i].classList.add('current');
            });
        });
    })
}
/* //tab */

/* go_top */
function go_top(_target){
    let top_btn = document.querySelector(_target)
    var show_pos = 300;
    window.addEventListener('scroll', function(){
        (this.scrollY > show_pos) ? top_btn.classList.add('show') : top_btn.classList.remove('show')
    })
    top_btn.addEventListener('click',function(){
        window.scrollTo({top: 0, behavior: 'smooth'});
    })
}
/* //go_top */

/* Scroll Indicator */
function progress_bar() {
    const b = document.createElement('em');
    b.setAttribute('class','progress_bar');
    b.innerHTML = "i'm progress_bar!! khk made me!!";
    document.querySelector('body').append(b);

    window.addEventListener('scroll', function(){
        var winScroll = document.body.scrollTop || document.documentElement.scrollTop,
        height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        document.querySelector('.progress_bar').style.width = ((winScroll / height) * 100) + "%";
    });
}

/* new cursor */
function follow_cursor(){
    const b = document.createElement('em');
    b.setAttribute('class','cursor');
    b.innerHTML = "i'm follower!! khk made me!!";
    document.querySelector('body').append(b);

    var cursor = document.querySelector('.cursor');
    document.addEventListener('mousemove', function(e){
        cursor.style.cssText = "left:" + e.clientX + "px; top :" + e.clientY + "px;";
    })
}

/* ========= ▽ 정리중 ▽ ==========*/
function accordion(_target, evt){
    var evt,
    accordion = document.querySelectorAll(_target, evt);

    accordion.forEach(el => {
        el.querySelectorAll('dt > a').forEach((el, i) => {
            el.addEventListener(evt, function(){
                if(el.closest('dl').classList.contains('single')){
                    const parent_index = Array.from(el.closest('dl').getElementsByTagName('dt')).indexOf(el.parentNode);

                    for(j=0; j<el.closest('dl').getElementsByTagName('dt').length; j++){
                        if(i != j){
                            el.closest('dl').getElementsByTagName('dt')[j].nextElementSibling.classList.remove('show');
                        }
                    }
                }

                if(el.parentNode.nextElementSibling.classList.contains('show')){
                    el.parentNode.nextElementSibling.classList.remove('show');
                } else {
                    el.parentNode.nextElementSibling.classList.add('show');
                }
            });
        });
    });
}



/* accodian toggle */
// let board_type_toggle = document.querySelectorAll('.board_type_toggle')//배열
// board_type_toggle.forEach(function(a){
//   if(a.classList.contains('single')){
//     /* 해당리스트 1개만 오픈 */
//     let board_type_toggle_dt = a.querySelectorAll('dt')
//       for(let j=0; j<board_type_toggle_dt.length; j++){
//         board_type_toggle_dt[j].addEventListener('click', function(){
//             let board_type_toggle_dd = a.querySelectorAll('dd');
//             board_type_toggle_dd.forEach(function(e){
             
//               e.classList.remove('show')
//               e.style.maxHeight = null;
//             })
//             board_type_toggle_dd[j].classList.toggle('show')
//             // board_type_toggle_dd[j].maxHeight = content.scrollHeight + "px";
//           })
//       }//2_for   
//   }else{
//       let board_type_toggle_dt = a.querySelectorAll('dt')
//       for(let j=0; j<board_type_toggle_dt.length; j++){
//         board_type_toggle_dt[j].addEventListener('click', function(){
//             let board_type_toggle_dd = a.querySelectorAll('dd');
//             board_type_toggle_dd[j].classList.toggle('show')
//           })
//       }//2_for   
//   }//else
// })//forEach




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
        now -= step;}, 50);
    }
    window.onload = () => {
    // 카운트를 적용시킬 요소
    const $counter = document.querySelectorAll(".count");
    const max = [333,345,3436];//카운터 데이터 배열형태 숫자로 입력
    for(let i=0; i<$counter.length; i++){
    setTimeout(() => counter($counter[i], max[i]), 2000);
    }
}

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