const cats= ['Rocket', 'Stalker'];
let catImages = document.querySelectorAll('.cat');
const clickSections = document.querySelectorAll('.clicks');
let clicks = [0, 0];

console.log(catImages);
console.log(clickSections);

for (let i = 0; i < catImages.length; i++) {
  catImages[i].addEventListener('click', function(){
    clicks[i]++;
    clickSections[i].innerHTML = clicks[i];
  }, false);
}
