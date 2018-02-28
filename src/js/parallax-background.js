let container = document.getElementById('parallax');
let parallaxItems = container.getElementsByClassName('parallaxBg');
let itemsLen = parallaxItems.length;
let offsetsFromTop = [];

let initOffsetsFromTop = (function(){
  for(let i=0;i<itemsLen;i++){
    let clientRect = parallaxItems[i].getBoundingClientRect();
    let offsetTop = ~~(clientRect.top + window.pageYOffset) || (clientRect.top + document.body.scrollTop) || ~~(clientRect.top + document.documentElement.scrollTop) || 0;
    offsetsFromTop.push(offsetTop);
  }
})();


let renderParallax = function(){
  let topOfScreen = (document.documentElement.scrollTop || document.body.scrollTop);
  
  for(let i=0;i<itemsLen;i++){
    let item = parallaxItems[i];
    let windowHeight = parallaxItems[0].parentNode.offsetHeight;
    let heightDiff = parallaxItems[0].offsetHeight - windowHeight;
    let offset = topOfScreen - offsetsFromTop[i];
    
    let itemPosition = ~~(offset / windowHeight * heightDiff);
    itemPosition = itemPosition < ~heightDiff+1 ? ~heightDiff : itemPosition;
    let transform = 'translate3d(0, '+itemPosition+'px, 0)';
    item.style.webkitTransform = transform;
    item.style.MozTransform = transform;
    item.style.msTransform = transform;
    item.style.transform = transform;
  }
};

(function loop(){
  requestAnimationFrame(loop);
  renderParallax();
})();
