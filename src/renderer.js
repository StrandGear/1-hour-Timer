// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const { ipcRenderer } = require('electron')
const ipc = ipcRenderer

let exit = document.querySelector(".exit")
exit.addEventListener("click", () => {
   ipc.send("closeApp")
})

let minimize = document.querySelector(".minimize")
minimize.addEventListener("click", () => {
    ipc.send("minimizeApp")
})

var root = document.querySelector(':root')

var img2_purple =  document.getElementById("img2_purple")
var img2_green = document.getElementById("img2_green")
var img1_green = document.getElementById("tree1")
var img1_purple = document.getElementById("monica1")
var green_sounds = [
  './sounds/a-wild-river-to-take-you-home-[AudioTrimmer.com].mp3',
  './sounds/cody-francis-mountain-air-[AudioTrimmer.com].mp3',
  './sounds/message-to-bears-you-are-a-memory-[AudioTrimmer.com].mp3',
  './sounds/plastic-patina-you-were-my-lantern-official-[AudioTrimmer.com].mp3',
  './sounds/satie-gymnopedie-no-1-[AudioTrimmer.com].mp3',
  './sounds/yann-tiersen-comptine-dun-autre-ete-amelie-[AudioTrimmer.com].mp3'
]
var purple_sounds = [
  './sounds/doki1.mp3',
  './sounds/doki2.mp3',
  './sounds/doki3.mp3',
  './sounds/doki4.mp3',
  './sounds/doki5.mp3'
]
var max_num = purple_sounds.length
var purple_theme = true
document.querySelector("#green_dot").onclick = () => {
  root.style.setProperty('--bg_color', 'var(--light-green)')
  root.style.setProperty('--button_color', 'var(--green)')
  root.style.setProperty('--titlebar_color', 'var(--dark-green)')
  root.style.setProperty('--btn_text_color', 'var(--white)')
  root.style.setProperty('--dark_color', 'var(--dark-green)')
  img2_purple.style.display = "none"
  img2_green.style.display = "inline-block"
  img1_green.style.display = "inline-block"
  img1_purple.style.display = "none"
  max_num = green_sounds.length
  purple_theme = false
}
document.querySelector("#purple_dot").onclick = () => {
  root.style.setProperty('--bg_color', 'var(--light-purple)')
  root.style.setProperty('--button_color', 'var(--middle-purple)')
  root.style.setProperty('--titlebar_color', 'var(--purple-dark)')
  root.style.setProperty('--btn_text_color', 'var(--gray)')
  root.style.setProperty('--dark_color', 'var(--purple-dark)')
  img2_green.style.display = "none"
  img2_purple.style.display = "inline-block"
  img1_green.style.display = "none"
  img1_purple.style.display = "inline-block"
  max_num = purple_sounds.length
  purple_theme = true
}

startDiv = document.getElementById("first")
processDiv = document.getElementById("second")
finishDiv = document.getElementById("third")
resultBlock = document.getElementById("resultBlock")
audioElem = document.getElementById("alert")
alertPanel =  document.getElementById("alertPanel")
backBtn = document.getElementById("backButton")
startBtn = document.getElementById("startButton")
continueBtn = document.getElementById("continueButton")
confirmBtn = document.getElementById("confirmBtn")
disconfirmBtn = document.getElementById("disconfirmBtn")
titleElem = document.getElementById("barTitle")

startDiv.style.display = "block"
processDiv.style.display = "none"
finishDiv.style.display = "none"

titleElem.onclick = () => {
  alertPanel.style.display = "block"
}
confirmBtn.onclick = () => {
    mainScreenOn = true
    resultBlock.style.display = "none"
    startDiv.style.display = "block"
    processDiv.style.display = "none"
    finishDiv.style.display = "none"
    continueBtn.style.display = "none"
    alertPanel.style.display = "none"
}
disconfirmBtn.onclick = () => {
  mainScreenOn = false
  alertPanel.style.display = "none"
}

var interval = 1000
var expected = 0
var finalTime = 3600
let time
let hoursQuantity
mainScreenOn = false

startBtn.onclick = () => {
  startDiv.style.display = "none"
  processDiv.style.display = "block"
  mainScreenOn = false
  statsReset()
  setTimeout(updateTimer, interval)
}

countdownElement = document.getElementById("countdown")

function updateTimer() {
  var dt = Date.now() - expected
  if (dt > interval)
    console.log("curr time > interval of timer")

    let seconds = time % 60
    let minutes = Math.floor(time / 60)

    seconds = seconds < 10 ? '0' + seconds : seconds
    minutes = minutes < 10 ? '0' + minutes : minutes

    countdownElement.innerHTML = `${minutes}:${seconds}`

    if (time >= finalTime)
    {
      if (!mainScreenOn)
      hourPassed()
    }
    else {
        time++
        expected += interval;
        setTimeout(updateTimer, Math.max(0, interval - dt))
      }
}

function hourPassed() {
    hoursQuantity++
    processDiv.style.display = "none"
    finishDiv.style.display = "block"
    time = 0
    playRandomSound()
    buttonsBlock.style.display = "flex"
}

function playRandomSound() {
  num = randomNum = getRandomInt(0, max_num)
  purple_theme ? sound_url = purple_sounds[num] : sound_url = green_sounds[num]
  audioElem.src = sound_url
  audioElem.volume = 0.15
  audioElem.play()
}
continueBtn.onclick = () =>{
  document.getElementById("resultBlock").style.display = "none"
  finishDiv.style.display = "none"
  processDiv.style.display = "block"
  continueBtn.style.display = "none"
  expected = Date.now() + interval
  setTimeout(updateTimer, interval)
}

let productiveCoefficient = 0
let unproductiveCoefficient = 0

document.getElementById("productiveBtn").onclick = () => {
  productiveCoefficient++
  buttonsBlock.style.display = "none"
  showResult()
}
document.getElementById("unproductiveBtn").onclick = () => {
  unproductiveCoefficient++
  buttonsBlock.style.display = "none"
  showResult()
}

function showResult(){
  audioElem.load()
  resultBlock.style.display = "block"

  hoursQuantity == 1 ? document.getElementById("hours").innerHTML = "You had <b>" + hoursQuantity + "</b> life hour" : document.getElementById("hours").innerHTML = "You had <b>" + hoursQuantity + "</b> life hours"

  productiveCoefficient == 1 ? document.getElementById("productive").innerHTML = "<b>1</b> of them was useful" : document.getElementById("productive").innerHTML = "<b>" + productiveCoefficient + "</b> of them were useful"

  switch (unproductiveCoefficient) {
  case 0 : document.getElementById("unproductive").innerHTML = ""
  break
  case 1 : document.getElementById("unproductive").innerHTML = " <b>1</b> hour you could spend differently"
  break
  default : document.getElementById("unproductive").innerHTML = "<b>" + unproductiveCoefficient + "</b> hours you could spend differently"
  }
  continueBtn.style.display = "inline-block"
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function statsReset() {
  time = 0
  hoursQuantity = 0
  audioElem.load()
  expected = Date.now() + interval
  productiveCoefficient = 0
  unproductiveCoefficient = 0
}