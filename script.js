document.addEventListener("DOMContentLoaded", function () {
  const typingArea = document.getElementById("typingArea");
  const charCountDisplay = document.getElementById("charCount");
  const timerDisplay = document.getElementById("timer");
  const saveButton = document.getElementById("saveProgress");
  const loadButton = document.getElementById("loadProgress");
  const fullscreenButton = document.getElementById("fullscreenBtn");

  let timerStarted = false;
  let timeElapsed = 0;
  let timerInterval;

  // Function to toggle fullscreen mode
  fullscreenButton.addEventListener("click", function () {
      if (document.fullscreenElement) {
          document.exitFullscreen();
      } else {
          typingArea.requestFullscreen();
      }
  });

  // Prevent specific keys and start timer
  typingArea.addEventListener("keydown", function (e) {
      // Prevent backspace, delete, cut, copy, paste
      if (
          e.key === "Backspace" ||
          e.key === "Delete" ||
          ((e.ctrlKey || e.metaKey) && (e.key === "x" || e.key === "c" || e.key === "v"))
      ) {
          e.preventDefault();
      }

      if (!timerStarted) {
          timerStarted = true;
          timerInterval = setInterval(function () {
              timeElapsed++;
              timerDisplay.textContent = `Time: ${timeElapsed} seconds`;
          }, 1000);
      }
  });

  // Prevent right-click context menu
  typingArea.addEventListener("contextmenu", function (e) {
      e.preventDefault();
  });

  // Update character count
  typingArea.addEventListener("input", function () {
      charCountDisplay.textContent = `Characters: ${typingArea.value.length}`;
  });

  // Save progress
  saveButton.addEventListener("click", function () {
      localStorage.setItem("typingContent", typingArea.value);
      localStorage.setItem("timeElapsed", timeElapsed);
      alert("Progress saved!");
  });

  // Load progress
  loadButton.addEventListener("click", function () {
      const savedContent = localStorage.getItem("typingContent");
      const savedTime = localStorage.getItem("timeElapsed");

      if (savedContent !== null && savedTime !== null) {
          typingArea.value = savedContent;
          charCountDisplay.textContent = `Characters: ${typingArea.value.length}`;
          timeElapsed = parseInt(savedTime, 10);
          timerDisplay.textContent = `Time: ${timeElapsed} seconds`;
          alert("Progress loaded!");
      } else {
          alert("No saved progress found.");
      }
  });
});
