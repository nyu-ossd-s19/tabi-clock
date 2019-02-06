(function() {

  /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;


  /**
   * change the background color of the screeb
   */
  function changeBG(color) {
    clearScreen();
    document.body.style.backgroundColor = color;
  }


  /**
   * display weather report
   * WIP: needs some API; optional function!
   * can be removed if no time
   */
  function displayWeather(){
    alert("use weather API!");
  }


  /**
   * displays the current Time
   * WIP: currently only displays static time; no clock yet
   */
  function displayTime(){
    const date = new Date();
    document.body.innerHTML = "" + date.getHours() + " " + date.getMinutes();
    document.body.style.fontSize = "2em";
  }

  /**
   * clear the screen
   * WIP: currently only turns screen white
   */
  function clearScreen() {
    document.body.style.backgroundColor = "white";

  }

  /**
   * Listen for messages from the background script.
   * Call "displayTime()", displayWeather() or "clearScreen()".
  */
  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "weather") {
      changeBG(message.bgColor);
      displayWeather();
      // insertBeast(message.beastURL);
    } else if (message.command === "time") {
      changeBG(message.bgColor);
      displayTime();

    } else if (message.command === "reset") {
      clearScreen();
    }
  });

})();
