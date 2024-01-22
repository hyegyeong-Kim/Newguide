$(document).ready(function(){
    $('header').load($('header').attr('data-include-path'));
    $('footer').load($('footer').attr('data-include-path'));

    $('label.input').each(function(){
        placeholder(this);
    });
});

progress_bar()

const max = [333,666,999,101010]
const _target = document.querySelectorAll(".count");
// const max = [333,345,3436];//카운터 데이터 배열형태 숫자로 입력
for(let i=0; i<max.length; i++){
    if(_target.length > i){
        setTimeout(() => counter(_target[i], max[i]));
    }
}

/* ajax */
// function ajax(_url){
//     fetch('./'+_url+'.html').then((res) => { // 페이지 호출 후 스크립트가 실행되지 않음..왜일까??
//         return res.text()
//     }).then((data) => {
//         const load_wrap = document.createElement('div');
//         document.querySelector('.content').innerHTML = '';
//         load_wrap.innerHTML = data;
//         // document.querySelector('.content').append(load_wrap)
//         document.querySelector('.content').insertAdjacentHTML('afterbegin', load_wrap);
//     });
// }
function ajax(_url,_wrap){
    $.ajax({
        url: './'+_url+'.html',
        method: 'get',
        //dataType:'html',
        success: function(data) {
            if(data){
                $(_wrap).html(data);
                // const load_wrap = document.createElement('div');
                // document.querySelector('.content').innerHTML = '';
                // load_wrap.innerHTML = data;
                // document.querySelector('.content').append(load_wrap)
            }

            $('label.input').each(function(){
                placeholder(this);
            });
        },
        complete: function(data) {
        },
        error: function(data) {
            alert('페이지를 불러오지 못했습니다.');
        }
    });
}
/* //ajax */

/* ajax - vanilla */
//XMLHttpRequest 객체 생성
function van_ajax(_url,_wrap){
    var xhr = new XMLHttpRequest();

    //요청을 보낼 방식, url, 비동기여부 설정
    xhr.open('POST', _load, true);

    //HTTP 요청 헤더 설정
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    //요청 전송
    xhr.send("id=post_ajax");

    //Callback
    xhr.onload = function () {
        if (xhr.status == 200) {
            //success
            _wrap.innerHTML = xhr.response;
        } else {
            //failed
        }
    }
}
/* //ajax - vanilla */

/* tab */
function tab_active(_target, evt) {//_target : 대상 / evt : 핸들러
    var evt,
    tab = document.querySelectorAll(_target);
    
    tab.forEach(el => {
        if(el.classList.contains('demo')){// 탭버튼에만 current 효과 줄 때
            el.querySelectorAll('button, a').forEach((el, i) => {
                el.addEventListener(evt, function(){
                    const parent_index = Array.from(el.closest('ul').children).indexOf(el.parentNode);
                    for(j=0; j<el.closest('ul').childElementCount; j++){
                        el.closest('ul').children[j].classList.remove('current');
                    }
                    el.parentNode.classList.add('current');
                });
            });
        } else {
            el.querySelectorAll('button, a').forEach((el, i) => {
                el.addEventListener(evt, function(){
                    const parent_index = Array.from(el.closest('ul').children).indexOf(el.parentNode);
                    for(j=0; j<el.closest('ul').childElementCount; j++){
                        el.closest('ul').children[j].classList.remove('current');
                        el.closest('.tab_wrap').querySelector('.tab_content').children[j].classList.remove('current');
                    }
                    el.parentNode.classList.add('current');
                    el.closest('.tab_wrap').querySelector('.tab_content').children[i].classList.add('current');
                });
            });
        }
    })
}
/* //tab */

/* accordion */
function accordion(_target, evt){ // 23.08.18 nextElementSibling 테그가 없는 경우를 위한 수정
    var evt,
    accordion = document.querySelectorAll(_target, evt);

    accordion.forEach(el => {
        el.querySelectorAll('dt > a').forEach((el, i) => {
            el.addEventListener(evt, function(){
                if(el.closest('dl').classList.contains('single')){
                    const parent_index = Array.from(el.closest('dl').getElementsByTagName('dt')).indexOf(el.parentNode);

                    for(j=0; j<el.closest('dl').getElementsByTagName('dt').length; j++){
                        if(i != j && el.closest('dl').getElementsByTagName('dt')[j].nextElementSibling != null){
                            el.closest('dl').getElementsByTagName('dt')[j].nextElementSibling.classList.remove('show');
                        }
                    }
                }
                
                if(el.parentNode.nextElementSibling != null){
                    if(el.parentNode.nextElementSibling.classList.contains('show')){
                        el.parentNode.nextElementSibling.style.height = '0px'

                        el.parentNode.nextElementSibling.addEventListener('transitionend', () => {
                            el.parentNode.nextElementSibling.classList.remove('show');
                        }, {once: true});
                    } else {
                        el.parentNode.nextElementSibling.classList.add('show');

                        el.parentNode.nextElementSibling.style.height = 'auto'
                        var height = el.parentNode.nextElementSibling.clientHeight + 'px'
                        el.parentNode.nextElementSibling.style.height = '0px'
                        setTimeout(() => {
                            el.parentNode.nextElementSibling.style.height = height
                        });
                    }
                }
            });
        });
    });
}

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

/* cursor */
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

/* toast message */
function toast(_type, _message, _time){
    var _toast = document.querySelector('.toast');
    _toast.classList.add('active', _type);
    _toast.innerHTML = '<span>'+_message +'</span>';
  if(_type == 'auto'){
    setTimeout(function(){toast_close()},_time)
  }else if(_type == 'confirm'){
    _toast.innerHTML = '<span>'+_message +'</span>'+
    '<a href="#none" onclick="toast_close();" class="btn_close">close</a>';}
}
function toast_close(){
    var _toast = document.querySelector('.toast');
    _toast.classList.remove('active')
}

/* modal open */
function modal(_target){
    var _array = [],
    attr = _target.getAttribute('data-modal'),
    split = attr.split('-');

    for(i=0; i<split.length; i++){
        _array.push(split[i])
    }

    const create_modal = document.createElement('div');
    create_modal.innerHTML = '<div class="modal_inner">'
    +   '<button class="btn_close" onclick="modal_close(this)">Close</button>'
    +   '<div class="modal_container"></div>'
    '</div>'
    create_modal.setAttribute('class','modal_wrap');
    create_modal.setAttribute('data-modal',attr);

    if(_array[0] == 'layer'){
        console.log(_target.parentNode)
        _target.parentNode.append(create_modal)
    } else {
        document.querySelector('body').append(create_modal);
        document.querySelector('body').style.overflow = 'hidden'
    }

    ajax(_target.getAttribute('data-cont'), create_modal.querySelector('.modal_container'))
}
/* modal close */
function modal_close(_target){
    _target.closest('.modal_wrap').remove();
    document.querySelector('body').style.removeProperty('overflow');
    // console.log(_target.closest('.modal_wrap'))
}

/* count_animation javascript */
function counter(_target, max) {
    let now = max;
    const handle = setInterval(() => {
        _target.innerHTML = Math.ceil(max - now);
        // 목표수치에 도달하면 정지
        if (now < 1) {
            clearInterval(handle);
        }
        // 증가되는 값이 계속하여 작아짐
        const step = now / 10;
        // 값을 적용시키면서 다음 차례에 영향을 끼침
        now -= step;
    }, 50);
}

/* Hamberger_Menu js*/
function ham_btn(_target){
    var _this = document.querySelector(_target)
    if(_this != null){
        _this.addEventListener('click', ()=>{
            for(i=0; i<_this.children.length; i++){
                _this.children[i].classList.toggle('on')
            }
        })
    }
}

/* Input Form */
function input_btn_chk(e){ // 버튼보이기
    var icon_button = e.closest('.input').querySelector('button')
    if(e.value.length>0){
        icon_button.style.cssText="display:block;"
    }else{
        icon_button.style.cssText="display:none;"
    }    
}//function input_btn_chk()
function input_btn_fn(e){ // del 클릭시, input 내용 삭제
    var input = e.closest('.input').querySelector('input');
    input.value = null;
    e.style.display="none";
    e.parentNode.querySelector('i').style.display="block";
}//function input_btn_fn()
function input_btn_chg(){
    var icon_pss = document.querySelector('button.icon_pss')
    var input_password = document.querySelector('input.password')
    icon_pss.classList.toggle('active');
    if(icon_pss.classList.contains('active')){
        
        input_password.setAttribute('type', 'text');
    }else{
        input_password.setAttribute('type', 'password');
    }
}

/* input focus */
function placeholder(_target){
    _target = $(_target);
    _target.find('i').click(function(){
        $(this).hide();
        $(this).siblings('input').focus();
    });
    _target.find('input').focus(function(){
        $(this).siblings('i').hide();
    });
    _target.find('input').blur(function(){
        if($(this).val().length < 1){
            $(this).siblings('i').show();
        }
    });
}

/* sticky_gallery */
var sticky_gallery = {
    deployment:function(e, count, hori_mg, verti_mg){
        var li = document.querySelectorAll(e);
        var imgStack = new Array();
        
        var count, hori_mg, verti_mg;

        li.forEach(e=> {
            e.style.width = (e.parentNode.clientWidth / Number(count)) - Number(hori_mg) + (Number(hori_mg) / Number(count))+'px';
        });
        setTimeout(function(){
            var colWidth = document.querySelector(e).offsetWidth + Number(hori_mg);

            for(var i = 0; i < Number(count); i++){
                imgStack[i] = 0;
            }

            for(var i = 0; i < li.length; i++){

                var minIndex = imgStack.indexOf(Math.min.apply(0, imgStack));

                var x = colWidth * minIndex;
                var y = imgStack[minIndex];
                imgStack[minIndex] += (li[i].offsetHeight + Number(verti_mg));
                li[i].style.transform = "translateX("+x+"px) translateY("+y+"px)";
                if(i === li.length - 1){
                    li[i].parentElement.style.height =  (Math.max.apply(0, imgStack) - verti_mg)+"px"
                }
            }
        },500);
    }
};