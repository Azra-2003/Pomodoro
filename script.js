let timerInterval;
let timeLeft = 25 * 60;
let isPaused = false;

document.getElementById('startButton').addEventListener('click', startTimer);
document.getElementById('pauseButton').addEventListener('click', pauseTimer);
document.getElementById('addTaskButton').addEventListener('click', addTask);
const startSound = document.getElementById("startSound");
const endSound = document.getElementById("endSound");

function startTimer() {
  startSound.play();
  if (!isPaused) {
  timerInterval = setInterval(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    document.getElementById('timer').innerText = formattedTime;
    document.title = formattedTime + " - Tamatie-Time"; // Update tab title
    timeLeft--;
    eatTomato();
    if (timeLeft < 0) {
      clearInterval(timerInterval);
      endSound.play();
    }
  }, 1000);
}
}

function pauseTimer() {
  if (isPaused){
    isPaused = false;
  document.getElementById('pauseButton').innerText = 'Pause';
  startTimer();
} else {
  isPaused = true;
  document.getElementById('pauseButton').innerText = 'Resume';
  clearInterval(timerInterval);
}
}
function resetTimer() {
  clearInterval(timerInterval);
  timeLeft = 25 * 60;
  document.getElementById('timer').innerText = '25:00';
  document.getElementById('tomato').style.clipPath = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
}

function eatTomato() {
  const eatenPercentage = (timeLeft / (25 * 60)) * 100;
  document.getElementById('tomato').style.clipPath = `polygon(0% 0%, ${eatenPercentage}% 0%, ${eatenPercentage}% 100%, 0% 100%)`;
}
function addTask() {
  const taskInput = document.getElementById('taskInput');
  const task = taskInput.value.trim();

  if (task !== '') {
    const taskList = document.getElementById('taskList');
    const listItem = document.createElement('li');
    listItem.textContent = task;
    
    listItem.addEventListener('click', function() {
      taskList.removeChild(listItem);
    });
    
    taskList.appendChild(listItem);
    taskInput.value = ''; // Clear text section after adding task
  }
}