function init(){
   let log = console.log;

//    uses copy html and add box as many you want with images in
//    To adjust number of card shown give width to

        // for 4 cards
//     .scrollBarOuter{
//    max-width: 1200px;
//     }
        // for 3 cards
//     .scrollBarOuter{
//      max-width: 990px;
//     }
        // for big 3 cards
//     .scrollBarOuter{
//    max-width: 800px;
//     }
        // for 2 cards
//     .scrollBarOuter{
//    max-width: 700px;
//     }
        // for 1 cards
//     .scrollBarOuter{
//    max-width: 335px;
//     }



{/* copy it and adjust cards form above
    <div class="scrollBarOuter">
    
    <div class="scrollBox">
<div class="scrollInner">

    <div class="box">
        <img src="web/gallery-img-01-tn.jpg" class="" alt="">
    </div>
    <div class="box">
        <img src="web/gallery-img-02-tn.jpg" class="" alt="">
    </div>
    <div class="box">
        <img src="web/gallery-img-02-tn.jpg" class="" alt="">
    </div>
    <div class="box">
        <img src="web/gallery-img-02-tn.jpg" class="" alt="">
    </div>
    <div class="box">
        <img src="web/gallery-img-02-tn.jpg" class="" alt="">
    </div>

</div>
<div class="dots">
</div>
</div>
</div>

*/}


    function giveStyle(){
        style = `
        
        .scrollBox{
            width:100%;
            overflow-x:hidden ;
            margin: auto;
        }

        @media (min-width:1200px){
            .scrollBox{
                max-width: 1200px;
            }
        }
        
        @media (min-width:1000px) and (max-width:1200px){
            .scrollBox{
                max-width: 990px;
            }
        }
        @media (min-width:800px) and (max-width:1000px){
            .scrollBox{
                max-width: 800px;
            }
        }
        @media (min-width:700px) and (max-width:800px){
            .scrollBox{
                max-width: 700px;
            }
        }
        @media (min-width:0px) and (max-width:700px){
            .scrollBox{
                max-width: 335px;
            }
        }
        
        
        
        .scrollInner{
            display: flex;
            justify-content: space-between;
            transform: translateX(0px);
            cursor: grab;
        }
        
        .box{
            width:270px;
            height: 360px;
            background-color:cornflowerblue;
            user-select: none;
            overflow: hidden;
        }
        .box img{
            user-select: none;
            pointer-events: none;
            width:100%;
            object-fit: cover;
            
        }
        .box:nth-child(2n){
            background-color: blueviolet;
        }
        
        /* dots */
        
        .dots{
            display: flex;
            margin-top: 2rem;
            padding: 1rem;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .dots .dot{
            width:20px;
            height:20px;
            background: #ddd;
            border-radius: 50%;
            cursor: pointer;
            margin: 0rem 0.1rem;
        }
        .dots .dot.dotActive{
            background: #999;
        }
        
        
        `;

        let sty = document.createElement('style');
        sty.textContent = style;
        document.head.append(sty);
    }

     giveStyle();
  
    

    let scroll = {
        done:true,
        removeDots: function removeDots(n){

                    
            let num = scroll.realDot.length - n;
            scroll.realDot.forEach((item,index)=>{
                if(index > num){
                    item.style.display = 'none';
                }else{
                    item.style.display = 'block';
                    scroll.lastDot = index;
                }
            });
            
        },
        breakPoints:[],
        dots:document.querySelector('.dots'), // only outerBox of dots
        realDot:null,
        lastDot:null,
        scrollBox:document.querySelector('.scrollBox'),
        scrollInner:document.querySelector('.scrollInner'),
        boxs:document.querySelectorAll('.scrollInner .box'),
        cardShow:0,
        init(){
            //userAdjust
            scroll.calculateSize();
            //autoAdujust
            scroll.autoAdjustSize();
            //translate control
            scroll.transControl();
       


        },
        calculateSize(){
            switch(scroll.cardShow){
                case 1:

                        scroll.boxs.forEach(item=>{
                            // item.style.maxWidth = '370px';
                            item.style.width = '335px';
                            scroll.scrollInner.style.width = (scroll.boxs.length + 0.9) * 335 + 'px';
                        });
                    break;
                case 2:
                    
                        scroll.boxs.forEach(item=>{
                            // item.style.maxWidth = '70px';
                            item.style.width = '250px';
                            scroll.scrollInner.style.width = (scroll.boxs.length + 0.4) * 250 + 'px';
                        });
                    break;
                case 3:

                        scroll.boxs.forEach(item=>{
                            // item.style.maxWidth = '370px';
                            item.style.width = '310px';
                            scroll.scrollInner.style.width = (scroll.boxs.length + 0.4) * 310 + 'px';
                        });
                    break;
                case 4:
                        scroll.boxs.forEach(item=>{
                            item.style.width = '280px';
                            scroll.scrollInner.style.width = (scroll.boxs.length + 0.4) * 280 + 'px';
                        });
                    break;
            }
        },
        autoAdjustSize(){
            let observer = new ResizeObserver(checkIt);
                observer.observe(scroll.scrollBox);
       
      function checkIt(data){
        if(scroll.done){
            scroll.done = false;
                let w = data[0].contentRect.width;

                if(w >= 1200){
                scroll.cardShow = 4;
                scroll.calculateSize();
                scroll.setBreakPoints();
                scroll.removeDots(4);

                } else if(w < 1200 && w >= 990){
                    scroll.cardShow = 3;
                    scroll.calculateSize();
                    scroll.setBreakPoints();
                    scroll.removeDots(3);
                    log('big 3 breakPoints' , scroll.breakPoints);

                    
                } else if(w < 990 && w >= 800){
                    scroll.cardShow = 2;
                    scroll.calculateSize();
                    scroll.setBreakPoints();
                    scroll.removeDots(3);

                    log('small 3 breakPoints',scroll.breakPoints);



                } else if(w < 800){

                    scroll.cardShow = 1;
                    scroll.calculateSize();
                    scroll.setBreakPoints();
                    log('verySmall 1 breakPoints',scroll.breakPoints);


                    
                } 
                
            }
            }
  
      

        },
        setBreakPoints(){
                this.breakPoints = [];
                this.dots.innerHTML = '';
                scroll.boxs.forEach((item,index)=>{
                        let offLeft = item.offsetLeft;
                        this.breakPoints.push(-offLeft);
                        let div = document.createElement("div");
                        div.classList.add('dot');
                        div.setAttribute('data-trans',-offLeft);
                        div.addEventListener('click',function(){
                            let trans = parseInt(this.getAttribute('data-trans'));
                            scroll.scrollInner.style.transform = `translateX(${trans}px)`;
                            let dotActive = document.querySelector('.dotActive');
                            dotActive.classList.remove('dotActive');
                            this.classList.add('dotActive');
                        });
                        scroll.dots.appendChild(div);
                });
                scroll.realDot = document.querySelectorAll('.dot');
              //dotActive for active
            scroll.realDot[0].classList.add('dotActive');
               
                this.breakPoints.reverse();
        },
        transControl(){
            let done = false;
            let startX;
            let alreadyTrans;
            let endX;
            let walk;
            let totall;
            //mousedown
            scroll.scrollInner.addEventListener('mousedown',mouseDown);
            scroll.scrollInner.addEventListener('touchstart',mouseDown);
            function mouseDown(ev){
                done = true;
                startX = ev.clientX || ev.touches[0].clientX;
                alreadyTrans = parseInt(window.getComputedStyle(scroll.scrollInner).transform.slice(19));
                scroll.scrollInner.style.transition = 'all 0s linear';
            }
            //mousemove
           document.documentElement.addEventListener('mousemove',mouseMove);
           document.documentElement.addEventListener('touchmove',touchMove);
            function mouseMove(ev){

                if(!done){return};
                endX = ev.clientX ;
                walk = endX - startX;
                totall = walk + alreadyTrans;
                scroll.scrollInner.style.transform = `translateX(${totall}px)`;

            }
            function touchMove(ev){
                if(!done){return};
                endX = ev.touches[0].clientX;
                walk = endX - startX;
                totall = walk + alreadyTrans;
                scroll.scrollInner.style.transform = `translateX(${totall}px)`;

            }
            //mouseup
            scroll.scrollInner.addEventListener('mouseup',mouseUp);
            scroll.scrollInner.addEventListener('touchend',mouseUp);
            document.documentElement.addEventListener('mouseup',mouseUp);
            function mouseUp(ev){
                done = false;
                scroll.scrollInner.style.transition = 'all 0.3s linear';
                scroll.setNearPoint(walk,totall);
            }
        },
        setNearPoint(w,al){
            let value = scroll.breakPoints.find(item=>{

                if((al + 100) < item && w > 0){
                    return (al + 100) < item;

                } else if((al - 300) < item && w < 0){

                    return (al - 300) < item;
                }
            });
            if (scroll.cardShow != 1){
                let x = parseInt(scroll.realDot[scroll.lastDot].getAttribute('data-trans') );
                (value < x)?value = x:null;
            }
            
            (value)?null: value = 0;
            this.scrollInner.style.transform = `translate(${value}px)`;
     
            setTimeout(()=>{

                let nowValue = parseInt(window.getComputedStyle(scroll.scrollInner).transform.slice(19));
                let round = document.querySelector(`.dot[data-trans='${nowValue}']`);
                let dotActive = document.querySelector('.dotActive');
                if(round){
                    dotActive.classList.remove('dotActive');
                    round.classList.add('dotActive');
                }

            },350);


        },
       
       


    }


    scroll.init();




  
}









document.addEventListener('DOMContentLoaded', init);