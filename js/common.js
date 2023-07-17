
window.addEventListener('load', function(){
    include();/* header & footer include */
});
    
function include(){
    var allElements = document.getElementsByTagName('*');
    Array.prototype.forEach.call(allElements, function(el) {
        var includePath = el.dataset.includePath;
        if (includePath) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    el.outerHTML = this.responseText;
                }
            };
            xhttp.open('GET', includePath, true);
            xhttp.send();
        }
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