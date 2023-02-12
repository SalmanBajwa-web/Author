let log = console.log;


function init() {

//    burger
        let burger = document.querySelector('.burgerBox');
        let menu = document.querySelector('.menu');
        burger.addEventListener('click',()=>{
            burger.classList.toggle('on');
            menu.classList.toggle('show');
        });








    // slider

    

        slider = {
            outerSlider :document.querySelector('.outerSlider'),
            innerSlider :document.querySelector('.innerSlider'),
            slide :document.querySelectorAll('.innerSlider .slide'),
            left:null,
            right:null,
            dots :null,
            dot :null,
            index:0,
            len :null,
            autoRun:false,
            clearId:null,
            init(){
                //calculating width of slides also manking dots
                slider.calculateSize();
                //slider first time
                this.sliderEngine(this.index);
                //listeners
                this.left.addEventListener('click',()=>this.sliderEngine(this.index +=-1));
                this.right.addEventListener('click',()=>this.sliderEngine(this.index +=1));
                //touchHandle
                this.touchHandle();
                //autoPlay func
                if(this.autoRun){
                    this.autoPlay();
                }
            },
            calculateSize(){    
                this.outerSlider.appendChild(document.createRange().createContextualFragment(`<div class="arrow left"><i class="fa fa-angle-left"></i></div>
                <div class="arrow right"><i class="fa fa-angle-right"></i></div>
                <div class="dots"></div>`));
                this.dots = document.querySelector('.dots');
                slider.innerSlider.style.width = `${this.slide.length * 100}%`;
                this.slide.forEach(item => {
                    let div = document.createElement('div');
                    div.classList.add('dot');
                    this.dots.appendChild(div); 
                });
                this.dot = document.querySelectorAll('.dots .dot');
                this.left = document.querySelector('.left');
                this.right = document.querySelector('.right');
                 // for length of slides
                    let len = ()=>{
                        let length = slider.slide.length - 1;
                        let precent = 100/slider.slide.length;
                        log(precent);
                         slider.len =  [length,precent];
                    }
                    len();
                //listeners for dots
    
                this.dot.forEach((item,index)=>{
                    item.addEventListener('click',()=>{
                        this.sliderEngine(index);
                        this.index = index;
                    });
                });
    
            },
            sliderEngine(n){
                if(n > this.len[0]){
                    n = this.len[0];
                    this.index = this.len[0];
                }else if(n < 0){
                    n = 0;
                    this.index = 0;
                }
                this.removeClases(n);
                this.innerSlider.style.transform = `translateX(-${n * (this.len[1])}%)`;
    
            },
            removeClases(x){
                let slideActive = document.querySelector('.slideActive');
                (slideActive)?slideActive.classList.remove('slideActive'):null;
                this.slide[x].classList.add('slideActive');
    
                let dotActive = document.querySelector('.dotActive');
                (dotActive)?dotActive.classList.remove('dotActive'):null;
                this.dot[x].classList.add('dotActive');
            },
            touchHandle(){
        let startX;
        let endX;
        let walk;
        let computedSty;
        let done = false;
        slider.innerSlider.addEventListener('mousedown',mouseDown);
        slider.innerSlider.addEventListener('touchstart',mouseDown);
    
    
        function mouseDown(ev){
            ev.stopPropagation();
            ev.stopImmediatePropagation();
            slider.innerSlider.classList.add('grab');
            slider.innerSlider.style.transition = `none`;
            done = true;
            startX = (ev.clientX || ev.clientX == 0)?ev.clientX: ev.touches[0].clientX;
            computedSty = parseInt(window.getComputedStyle(slider.innerSlider).transform.slice(19));
        }
    
        slider.innerSlider.addEventListener('mousemove',mouseMove);
        slider.innerSlider.addEventListener('touchmove',mouseMove);
        document.documentElement.addEventListener('mousemove',mouseMove);
        document.documentElement.addEventListener('touchmove',mouseMove);
    
        function mouseMove(ev){
            ev.stopPropagation();
            if(!done){return}
            if(walk > 100){
            ev.preventDefault();
            }else if(walk < -100){
                ev.preventDefault();
            }
            endX = (ev.clientX || ev.clientX == 0)?ev.clientX: ev.touches[0].clientX;
            walk = endX - startX;
            slider.innerSlider.style.transform = `translateX(${walk + computedSty}px)`;
        }
        
        slider.innerSlider.addEventListener('mouseup',mouseUp);
        slider.innerSlider.addEventListener('touchend',mouseUp);
        document.documentElement.addEventListener('touchend',mouseUp,true);
        document.documentElement.addEventListener('mouseup',mouseUp,true);
        function mouseUp(ev){
            ev.stopPropagation();
            if(!done){return}
            done = false;
            slider.innerSlider.classList.remove('grab');
            ev.stopPropagation();
            slider.innerSlider.style.transition = `all 0.3s linear`;
            if(walk > 150){
                slider.sliderEngine(slider.index +=-1);
            }else if(walk < -150){
                slider.sliderEngine(slider.index +=1);
            }else{
                slider.innerSlider.style.transform = `translateX(${computedSty}px)`;
            }
            walk = 0;
        }
        
            },
            autoPlay(){
                let done = true;
                slider.clearId =  setInterval(() => {
                        if(done){
                            this.sliderEngine(this.index +=1);  
                            if(this.index == this.slide.length-1){
                                done = false;
                            }
                        }else{
                            this.sliderEngine(this.index +=-1);  
                            if(this.index == 0){
                                done = true;
                            }
                        }
                    },3000);
    
                
                 function mouseEnter(ev){
                     clearInterval(slider.clearId);
                 }
                 function mouseLeave(ev){
                        slider.clearId =  setInterval(() => {
                                if(done){
                                    slider.sliderEngine(slider.index +=1);  
                                    if(slider.index == slider.slide.length-1){
                                        done = false;
                                    }
                                }else{
                                    slider.sliderEngine(slider.index +=-1);  
                                    if(slider.index == 0){
                                        done = true;
                                    }
                                }
                            },3000);
                 }
                 slider.innerSlider.addEventListener('mouseenter',mouseEnter);
                 slider.innerSlider.addEventListener('mouseleave',mouseLeave);
    
    
            },
    
    
        }
        slider.init();

  
       
}

  
    











document.addEventListener('DOMContentLoaded',init);