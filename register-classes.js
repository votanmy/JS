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
    regButtons.forEach( (bttn) =>{bttn.click()} );
    setTimeout(() => {
      document.querySelectorAll('.ant-btn-primary').forEach( (submit) =>{submit.click()} );
    }, 1000);
  }
}

// Show real time clock
setInterval(realClock, 1000);
function realClock() {
  const d = new Date();
  const t = d.toLocaleTimeString();
  document.querySelector('#realclock').value = t;
}

// Select classes, highlight them then trigger submit
setTimeout(() => {
  Array.from(document.getElementsByClassName('ant-card-hoverable')).forEach( (ele) =>{
    ele.onclick = function(){
      if( this.querySelector('.register') !== null ){
        this.classList.add('selected');
        regButtons.push(this.querySelector('.register'));
      }
    }
  });
  alert("LET'S START!");
}, 5000);

// Trigger submit
document.getElementById('regall').onclick = function(){
    clearInterval(intervalId);
  	if( document.getElementById('altclock').value !== '00:00:00' ){
  		clock = document.getElementById('altclock').value;
  	}
    intervalId = setInterval(regClass, 1000, clock, regButtons);
    console.log(regButtons);
    setTimeout(() => {
      alert("ALL SELECTED CLASSES WILL AUTOMATICALLY REGISTERED AT " + clock);
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
    border: 5px solid green;
    background-color: lightgreen !important;
  }
  .ant-card-hoverable:has(.ant-card-actions):has(button.registered),
  .ant-card.remove-cursor:has(.ant-card-actions):has(button.registered){
    border: 5px solid green;
    background-color: lightgreen !important;
  }
`;
document.head.appendChild(style);
