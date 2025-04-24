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
    console.log('accordion :', accordion)
    accordion.forEach(el => {
        console.log('el :', el)
        el.querySelectorAll('.board_type_toggle > dt > a').forEach((el, i) => {
            el.addEventListener(evt, function(){
                if(el.closest('dl').classList.contains('single')){
                    console.log('closet :', el.closest('dl'))
                    const parent_index = Array.from(el.closest('dl').getElementsByTagName('dt')).indexOf(el.parentNode);
                    console.log('parent_index :', parent_index)
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

const modal = {
    o:(e)=>{
        a = e.currentTarget;
    },
    open:(_target, _type)=>{ //모달 열 때,

        _target = document.getElementById(_target); //open할 모달 아이디.
        _target.setAttribute('modal-type', _type); //모달 타입.

        _modal = document.querySelectorAll('.modal_wrap.active'); //모달 갯수로 늘어날 모달의 z-index값을 만듦.

        if(!_target.classList.contains('active')){ //모달 중복 z-index값 방어.
            _target.classList.add('active');
            _target.setAttribute('z-index', (100 + _modal.length));

            zIdx = Number(_target.getAttribute('z-index')); //z-index 속성값을 선언한 이유는 스타일에서 z-index 값을 꺼낼 대 다른 스타일과 함께 있으면 z-index만 꺼내기 불편해서.

            _target.style.zIndex = zIdx;

            if(document.querySelectorAll('.modal_dim').length > 0){
                document.querySelector('.modal_dim').style.zIndex = zIdx - 1; //dim z-index 증가. 모달이 새로 뜰 때마다 이전 모달 위로 dim 올림.
            }
        }

        if(document.querySelectorAll('.modal_dim').length < 1 && _type.indexOf('no_dim') == -1){ //dim을 하나만 만듦.
            /* modal dim 만들기 */
            const dim = document.createElement('div');
            dim.className = 'modal_dim';
            document.body.append(dim);
            /* //modal dim 만들기 */
        }

        modal.o(event);

        /* ajax */
        if(a.hasAttribute('data-cont')){
            $.ajax({
                url: './'+a.getAttribute('data-cont')+'.html',
                method: 'get',
                //dataType:'html',
                success: function(data) {
                    _target.querySelector('.modal_container').innerHTML = data;
                },
                complete: function(data) {
                },
                error: function(data) {
                    alert('페이지를 불러오지 못했습니다.');
                }
            });
        }
        /* //ajax */

        /* layer position */
        if(_target.getAttribute('modal-type').indexOf('layer') > -1){
            _target.style.cssText = 'top:'+a.offsetTop+'px; left:'+(a.offsetLeft + a.offsetWidth)+'px'
        }

    }, close:(_target)=>{ //모달 닫을 때,

        _target = event.target.closest('.modal_wrap');

        _target.classList.remove('active');
        _target.removeAttribute('modal-type');
        _target.removeAttribute('style'); //모달 초기화를 위해 속성값 다 제거.

        zIdx = Number(_target.getAttribute('z-index')); //닫히는 모달의 z-index 값을 받아서 dim의 z-index 값 수정
        _target.removeAttribute('z-index');

        if(document.querySelectorAll('.modal_dim').length > 0 && document.querySelector('.modal_dim').hasAttribute('style')){ //dim이 없는 경우 에러가 나는 것을 벙어.
            document.querySelector('.modal_dim').style.zIndex = (zIdx-2);
        }

        /* 모달을 닫을 때, 모달 갯수가  0이거나, 모달 갯수가  0이 아니지만 dim이 없는 모달만 남은 경우 dim을 제거해 줌. */
        _modal = document.querySelectorAll('.modal_wrap.active');

        let noDimCnt = 0;

        for(i = 0; i < _modal.length; i++) {
            if(_modal[i].getAttribute('modal-type').indexOf('no_dim') > -1){
                noDimCnt++;
            }
        }

        if(document.querySelectorAll('.modal_dim').length > 0 && _modal.length == noDimCnt) {
            document.querySelector('.modal_dim').remove();
        }
        /* //모달을 닫을 때, 모달 갯수가  0이거나, 모달 갯수가  0이 아니지만 dim이 없는 모달만 남은 경우 dim을 제거해 줌. */

        const body = document.querySelector("body");

        if (body.hasAttribute("scrollY")) {
        body.classList.remove("lockbody");
        body.scrollTop = Number(body.getAttribute("scrollY"));
        body.removeAttribute("scrollY");
        }

        body.removeEventListener("touchmove", modal.lockScrollHandle, { passive: true });
    }, lockScrollHandle(event) {
        const e = event || window.event;

        // 멀티 터치는 터치 되게 한다
        if (e.touches.length > 1) return;

        // event 초기화 속성이 있음 초기화
        e.preventDefault();
    }
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

function swip_delete(_target){
    var del_pos = _target.width()*0.7;
    var sY=0
        eY=0,
        sX=0,
        eX=0,
        lY=0,
        lX=0;
    $(_target).on("touchstart", function (e) {
        sY = e.originalEvent.touches[0].clientY;
        sX = e.originalEvent.touches[0].clientX;
        // $('.draggable li').draggable( "disable" );
    })

    $(_target).on("touchmove", function (e) {
        eY = e.originalEvent.changedTouches[0].clientY,
        eX = e.originalEvent.changedTouches[0].clientX;

        lY = Math.abs(sY - eY);
        lX = Math.abs(sX - eX);
        if(lY < lX){
            console.log('a'+(eX-sX));
            if((eX-sX) > 0){
                $(this).css({
                    transform:'translateX('+(eX-sX)+'px)'
                });
                if((eX-sX) > del_pos){
                    $(this).animate({
                        height:0,
                        paddingTop:0,
                        opacity:0
                    },{
                        complete: function(){
                            _target.parent().find('.delete').remove(); // remove
                        }
                    },250);
                } else {
                    $('this').stop().animate({
                        opacity:1
                    },100);
                }
            }
        }
    })

    $(_target).on("touchend", function (e) {
        if((eX-sX) < del_pos){
            $(this).css({
                transform:'translateX(0)'
            });
        }
    })
}

/* text_animation */
window.addEventListener('scroll', function(){
    let scrollTop = window.scrollY
    let winHeight = window.outerHeight * 0.4
    let delay = 100
    // console.log(document.querySelector('.sec_3').offsetTop-250,scrollTop)
    if(document.querySelector('.jumps') != null){
        let sec_offset = document.querySelector('.jumps').offsetTop - winHeight;
        let header_height = document.querySelector('header').offsetHeight;
       
        if(scrollTop >= (sec_offset - header_height)){
            var text = document.querySelectorAll('.jumps .element_jumps > li > img')
            text.forEach(function(a,i){
                setTimeout(function(){
                a.style.animation = "jumps 2s ease-in-out 1 alternate";
                a.style.animationDelay = (delay*i);
                // console.log('1 : '+i)
                }, (delay*i))
                console.log(delay*i)
            })
        }
    }
});