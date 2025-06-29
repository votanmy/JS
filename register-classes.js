let clock = '09:00:01';
let intervalId;
const regButtons = [];

// Add new elements to control
var newInput = document.createElement('input');
newInput.type = 'text';
newInput.id = 'altclock';
newInput.value = '00:00:00';
document.getElementsByClassName('ant-tabs-extra-content')[0].appendChild(newInput);

var newBttn = document.createElement('button');
newBttn.textContent = 'Register All';
newBttn.id = 'regall';
document.getElementsByClassName('ant-tabs-extra-content')[0].appendChild(newBttn);

// Main
function regClass(clock, regButtons) {
  const d = new Date();
  const t = d.toLocaleTimeString();
  if(t == clock){
    clearInterval(intervalId);
    regButtons.forEach( (bttn) =>{bttn.click()} );
    setTimeout(() => {
      document.querySelectorAll('.ant-btn-primary').forEach( (submit) =>{submit.click()} );
    }, 1000);
  }
}

// Select classes, highlight them then trigger submit
Array.from(document.getElementsByClassName('ant-card-hoverable')).forEach( (ele) =>{
  ele.onclick = function(){
    if( this.querySelector('.register') !== null ){
      this.classList.add('selected');
      regButtons.push(this.querySelector('.register'));
    }
  }
});

// Trigger submit
document.getElementById('regall').onclick = function(){
  	if( document.getElementById('altclock').value !== '00:00:00' ){
  		clock = document.getElementById('altclock').value;
  	}
    intervalId = setInterval(regClass, 1000, clock, regButtons);
    console.log(regButtons);	
}

// Styling: highlight registered classes
const style = document.createElement('style');
style.textContent = `
  input#altclock {
    padding: 10px;
  }
  button#regall {
    cursor: pointer;
    background-color: green;
    color: #fff;
    padding: 10px;
    text-transform: uppercase;
    font-family: SVN-Brandon-Grotesque;
  }
  .ant-card.ant-card-hoverable.selected {
    border: 5px solid green;
    background-color: lightgreen !important;
  }
  .ant-card-hoverable:has(.ant-card-actions):has(button.registered){
    border: 5px solid green;
    background-color: lightgreen !important;
  }
`;
document.head.appendChild(style);