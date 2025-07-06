/*
How to use:
=================
GENERAL NOTE:
=================
Wait for an alert that say "READY NOW!" then start register your classes
=================
METHOD 1:
=================
Chrome:
- Developer tool > Sources > Snippets > Create new snippet > paste this script > Ctrl+S > right click on snippet name > Run.
- The provided clock field allows changing running time instead of default set as of "09:00:01". Leave it as is to run at default time.
Other:
- Developer tool > Console > paste this full script into console then run it.
=================
METHOD 2:
=================
Paste one of these two code into console to use js file stored in github
eval(await (await fetch('https://raw.githubusercontent.com/votanmy/JS/refs/heads/main/register-classes.js')).text())
OR
fetch('https://raw.githubusercontent.com/votanmy/JS/refs/heads/main/register-classes.js').then(response => response.text()).then(text => eval(text)).then(() => {})
=================
METHOD 3:
=================
Create a browser bookmark then place this to the URL field
javascript:fetch('https://raw.githubusercontent.com/votanmy/JS/refs/heads/main/register-classes.js').then(response => response.text()).then(text => eval(text)).then(() => {})
OR (this maybe throw error)
javascript:eval(await (await fetch('https://raw.githubusercontent.com/votanmy/JS/refs/heads/main/register-classes.js')).text())

Now open the talkfirst.com page the load the bookmark into the page to use the script
*/

let clock = '09:00:01';
let intervalId;
let realClock_intervalId;
const regButtons = [];

// Load all tabs content for them ready to interactive.
setTimeout(() => {
  document.querySelector('.ant-tabs-tab:nth-child(2)').click();
}, 1000);
setTimeout(() => {
  document.querySelector('.ant-tabs-tab:nth-child(3)').click();
}, 1000);
setTimeout(() => {
  document.querySelector('.ant-tabs-tab:nth-child(1)').click();
}, 1000);

// Add new elements to control
// Real time clock
var newInput = document.createElement('input');
newInput.type = 'text';
newInput.id = 'realclock';
newInput.classList.add('myclock');
newInput.value = '';
newInput.disabled = true;
document.getElementsByClassName('ant-tabs-extra-content')[0].appendChild(newInput);

// Set custom time to run
var newInput = document.createElement('input');
newInput.type = 'text';
newInput.id = 'altclock';
newInput.classList.add('myclock');
newInput.value = '00:00:00';
document.getElementsByClassName('ant-tabs-extra-content')[0].appendChild(newInput);

// Submit button
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
    clearInterval(realClock_intervalId);
    regButtons.forEach( (button) =>{button.click()} );
    setTimeout(() => {
      document.querySelectorAll('.ant-btn-primary').forEach( (bttn) =>{
        bttn.click();
        // for testing: list of classes (don't use when register)
        // console.log(bttn.parentElement.previousElementSibling.querySelector('.ant-modal-confirm-content strong').textContent);
      } );
    }, 1000);
  }
}

// Show real time clock
realClock_intervalId = setInterval(realClock, 1000);
function realClock() {
  const d = new Date();
  const t = d.toLocaleTimeString();
  document.querySelector('#realclock').value = t;
}

// Select / deselect classes, highlight then trigger submit.
setTimeout(() => {
  document.querySelectorAll('.ant-card-body').forEach( (ele) =>{
    let parent = ele.parentElement;
    let regbtn = ele.nextElementSibling.querySelector('.register');
    ele.onclick = function(){
      if( regbtn !== null ){
        parent.classList.toggle('selected');
        if (parent.classList.contains('selected')) {
          // Select class
          regButtons.push(regbtn);
        }else{
          // Deselect class
          let idx = regButtons.indexOf(regbtn);
          if ( idx > -1 ) {
            regButtons.splice(idx, 1);
          }
        }
      }
      console.log('selected:');
      console.log(regButtons);
    }
  });
  alert("LET'S START!");
}, 5000);

// Trigger submit
document.getElementById('regall').onclick = function(){
    // remove old interval
    clearInterval(intervalId);
  	if( document.getElementById('altclock').value !== '00:00:00' ){
  		clock = document.getElementById('altclock').value;
  	}
    // set new interval
    intervalId = setInterval(regClass, 1000, clock, regButtons);
    setTimeout(() => {
      alert(regButtons.length + " SELECTED CLASSES WILL BE REGISTERED AT " + clock);
    }, 1000);
}

// Styling: highlight registered classes
const style = document.createElement('style');
style.textContent = `
  input.myclock {
    background-color: #fff;
    border: none;
    padding: 7px;
    margin: 0 3px;
    font-size: 15px;
    border-radius: 6px;
    text-align: center;
    width: 100px;
  }
  #realclock {
      background-color: gold;
  }
  button#regall {
    cursor: pointer;
    background-color: green;
    color: #fff;
    padding: 7px 15px 7px 15px;
    text-transform: uppercase;
    font-family: SVN-Brandon-Grotesque;
    border-radius: 6px;
  }
  .ant-card.ant-card-hoverable.selected {
    background-color: lightgreen !important;
  }
  .ant-card-hoverable:has(.ant-card-actions):has(button.registered),
  .ant-card.remove-cursor:has(.ant-card-actions):has(button.registered){
    background-color: lightgreen !important;
  }
`;
document.head.appendChild(style);
