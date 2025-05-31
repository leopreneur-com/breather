'use strict';

window.addEventListener('DOMContentLoaded', () => {

  // Initialize rounds & total times
  let round = 0,
  roundTimes = [],
  totalTime = 0,
  totalTimeInterval = null;

  // Assign elements
  const
  appInfo = document.querySelector("#app_info"),
  appInfoWpr = document.querySelector("#app_info_wrapper"),
  appInfoClose = document.querySelector("#app_info_close"),
  appLogo = document.querySelector("#topnav_logo"),
  topnavInfo = document.querySelector("#topnav_right_info"),
  topNavFinish = document.querySelector("#topnav_right_finish"),
  cntIntro = document.querySelector("#content_intro"),
  introStartWrp = document.querySelector("#intro_start_wrapper"),
  cntRoundStart = document.querySelector("#content_roundstart"),
  cntBthCyc = document.querySelector("#content_breath_cycle"),
  bthAnimator = document.querySelector("#breathe_animator"),
  //bthAnimatorIn = document.querySelector("#breathe_animator_inner"),
  bthNumber = document.querySelector("#breather_animator_number"),
  cntBthRtnt = document.querySelector("#content_breath_retention"),
  bthRtntTimer = document.querySelector("#retention_timer"),
  bthRtntTimerM = document.querySelector("#retention_timer_minutes"),
  bthRtntTimerS = document.querySelector("#retention_timer_seconds"),
  bthRtntAnimator = document.querySelector("#retention_animator"),
  cntDeepInhale = document.querySelector("#content_deep_inhale"),
  reload = document.querySelector("#finish_reload");




  // Open info modal window
  topnavInfo.addEventListener("click", () => {
    appInfo.classList.remove("hidden");

  });

  // Close modal if close button or outside of modal clicked
  appInfo.addEventListener("click", event => {
    
    appInfo.classList.toggle("hidden");
  });




  const startRound = () => {
    round++;
    console.log("Starting round: " + round);

    cntIntro.classList.add("hidden");
    cntRoundStart.classList.remove("hidden");

    topnav_round.textContent = "ROUND " + round;
    topnav_right_info.style.display = "none";
    topnav_right_finish.style.display = "inline-block";

    let startCount = 3;
    const roundStartNmb = document.querySelector("#roundstart_number");
    const roundStartTxt = document.querySelector("#roundstart_text");

    console.log("Round " + round + ". Start count: " + startCount);

    // Apply round info to html elements
    roundStartNmb.innerHTML = round;
    roundStartTxt.innerHTML = 'Round';

    // Initialize gsap properties
    gsap.set(roundStartNmb, { autoAlpha: 1, scale: 1 });
    gsap.set(roundStartTxt, { autoAlpha: 1, scale: 1 });

    // Apply gsap animations
    gsap.from(roundStartNmb, 0.9, { autoAlpha: 0, scale: 0.5, transformOrigin: "50% bottom" });
    gsap.to(roundStartNmb, 0.8, { autoAlpha: 0, delay: 1.7 });
    gsap.from(roundStartTxt, 1.0, { autoAlpha: 0, scale: 0.5, transformOrigin: "50% top", delay: 0.3 });
    gsap.to(roundStartTxt, 0.8, { autoAlpha: 0, delay: 1.8 });

    startCount = 3;

    // Start initial countdown
    let startInterval = setInterval(() => {
      startCount--;
      console.log("Round " + round + ". Start count: " + startCount);

      // When countdown finished, proceed to the breath cycle
      if (startCount <= 0) {
        clearInterval(startInterval);
        cntRoundStart.classList.add("hidden");
        breathCycle(30);
      };
    }, 1000);

    // Clear the interval if finish clicked
    topNavFinish.addEventListener("click", () => {
      clearInterval(startInterval);
    });
  };






  const breathCycle = breaths => {
    let count = 0;
    const speed = 3400;
    const speed_exhale = Math.floor(speed - speed * 0.4444);
    let lastBreathTimer = null;

    cntBthCyc.classList.remove("hidden");
    bthNumber.textContent = count;


    const breathCount = () => {

      // Initialize gsap properties
      gsap.set(bthAnimator, { scale: 0.50, autoAlpha: 0.15 });


      // Declare the gsap animation function
      let breatheAnimation = function (scale1, alpha1, scale2, alpha2) {
        // Inhale
        gsap.to(bthAnimator, 1.5, { ease: "power1.inOut", scale: scale1, autoAlpha: alpha1 });

        // Exhale
        setTimeout(() => {
          gsap.to(bthAnimator, 1.3, { ease: "power1.inOut", scale: scale2, autoAlpha: alpha2 });
        }, speed_exhale);
      };

      breatheAnimation(1.00, 1.00, 0.50, 0.15);



      count++;
      bthNumber.textContent = count;


      // Last breath
      if (count >= breaths - 1) {
        console.log(`Breath cycle reached ${breaths - 1}. Taking one last breath`);

        breatheAnimation(1.10, 1.00, 0.30, 0.0);

        // Hide text, stop breath interval and move to breath retention
        lastBreathTimer = setTimeout(() => {
          clearInterval(breathInterval);
          cntBthCyc.classList.add("hidden");
          breathRetention();
        }, 3000);
      }
    };

    // Run breathCount function & create breath count interval
    breathCount();
    const breathInterval = setInterval(breathCount, speed);

    // Clear the interval & timeouts if finish clicked
    topNavFinish.addEventListener("click", () => {
      clearInterval(breathInterval);
      clearTimeout(lastBreathTimer);
    });

  };





  const breathRetention = () => {

    console.log("Breath retention");

    cntBthRtnt.classList.remove("hidden");
    bthRtntTimerM.classList.add("zero_minutes");

    // Initialize minute and seconds counter
    let minutes = 0;
    let seconds = 0;
    let retTotal = 0;

    // Start interval
    const retentionCount = () => {
      seconds++;
      retTotal++;

      console.log("Retentionseconds: " + seconds);

      // Add a minute every 60 seconds, zero the seconds
      if (seconds >= 60) {
        seconds = 0;
        minutes++;
        bthRtntTimerM.classList.remove("zero_minutes");
      }

      // Stop the interval if timer exceeds 60 minutes
      minutes >= 60 ? clearInterval(retentionInterval) : null;

      // Display seconds and minutes
      // Add leading zeros to seconds if under 1 minute
      bthRtntTimerM.textContent = minutes;
      bthRtntTimerS.textContent = minutes >= 1 ? `0${seconds}`.slice(-2) : seconds;


      // RETENTION TESTING (seconds)

      /*if (seconds >= 10) {
          console.log("TEST: 10 SECONDS OF RETENTION")
          clearInterval(retentionInterval);
          cntBthRtnt.classList.add("hidden");
           // Reset minutes and seconds
          setTimeout(() => {
              bthRtntTimerM.textContent = 0;
              bthRtntTimerS.textContent = 0;
          }, 1000);
           roundTimes.push(seconds);
          deepInhale();
      }*/



    };

    // Create breath retention interval
    const retentionInterval = setInterval(retentionCount, 1000);

    // Stop the breath retention when element clicked
    cntBthRtnt.onclick = function () {
      console.log("Retention clicked. Stopping retention...");
      clearInterval(retentionInterval);
      cntBthRtnt.classList.add("hidden");

      // Reset minutes and seconds
      setTimeout(() => {
        bthRtntTimerM.textContent = 0;
        bthRtntTimerS.textContent = 0;
      }, 1000);

      roundTimes.push(retTotal);
      deepInhale();
    };

    // Clear the interval if finish clicked
    topNavFinish.addEventListener("click", () => {
      clearInterval(retentionInterval);
    });
  };





  const deepInhale = () => {
    const deepInhaleIntro = document.querySelector("#deep_inhale_info_intro"),
    deepInhaleExhale = document.querySelector("#deep_inhale_info_exhale"),
    deepInhaleTimer = document.querySelector("#deep_inhale_timer"),
    deepInhaleTimerS = document.querySelector("#deep_inhale_timer_seconds"),
    deepInhaleAnimator = document.querySelector("#deep_inhale_animator");

    let inhaleLength = 15,
    exhaleTimer = null,
    roundStartTimer = null;

    console.log("Deep inhale initialized");
    cntDeepInhale.classList.remove("hidden");

    // Initialize gsap properties
    gsap.set(deepInhaleAnimator, { scale: 0, autoAlpha: 0 });
    gsap.set(deepInhaleIntro, { autoAlpha: 1 });
    gsap.set(deepInhaleTimer, { autoAlpha: 1 });
    gsap.set(deepInhaleExhale, { autoAlpha: 0, scale: 1 });

    gsap.to(deepInhaleAnimator, 0.8, { scale: 1, autoAlpha: 1, ease: "power1.out" });


    deepInhaleTimerS.textContent = inhaleLength;

    // Start inhale countdown
    const inhaleCountdown = () => {
      inhaleLength--;
      deepInhaleTimerS.textContent = inhaleLength;

      // When countdown reaches 0, stop interval
      if (inhaleLength <= 0) {
        clearInterval(inhaleInterval);
        console.log("Inhale lenght <= 0. Stopping deep inhale...");

        gsap.to(deepInhaleIntro, 0.5, { autoAlpha: 0 });
        gsap.to(deepInhaleTimer, 0.4, { autoAlpha: 0 });
        gsap.to(deepInhaleExhale, 0.8, { autoAlpha: 1, delay: 0.1 });
        gsap.to(deepInhaleExhale, 2.0, { scale: 1.2, delay: 0.1 });
        gsap.to(deepInhaleAnimator, 1.7, { scale: 0, ease: "power1.inOut", delay: 0.3 });
        gsap.to(deepInhaleAnimator, 0.8, { autoAlpha: 0, delay: 1.0 });

        // After timeout: finish the round with one last exhale
        exhaleTimer = setTimeout(function () {
          console.log("Stopping exhale");
          gsap.to(deepInhaleExhale, 0.8, { autoAlpha: 0 });

          // Start new round
          roundStartTimer = setTimeout(function () {
            cntDeepInhale.classList.add("hidden");
            startRound();
          }, 1000);
        }, 3500);
      }
    };

    // Create inhale interval
    const inhaleInterval = setInterval(inhaleCountdown, 1000);

    // Clear the interval & timeouts if finish clicked
    topNavFinish.addEventListener("click", () => {
      clearInterval(inhaleInterval);
      clearTimeout(exhaleTimer);
      clearTimeout(roundStartTimer);
    });
  };






  const finish = () => {
    const contentDivs = document.querySelectorAll(".content");
    const contentFinish = document.querySelector("#content_finish");
    const finishResults = document.querySelector("#finish_results");
    const finishTableBody = document.querySelector("#finish_results_table_body");

    console.log("SESSION FINISHED. Total session time: " + totalTime);

    // Hide the rest of the content elements
    contentDivs.forEach(function (elem) {
      elem.classList.add("hidden");
    });

    // Reveal the finish container
    contentFinish.classList.remove("hidden");



    // Check if roundTimes is not 0
    if (roundTimes.length > 0) {

      // Hide finish button
      topNavFinish.style.display = "none";

      // Initialize seconds & minutes
      let roundMinutes,roundSeconds,averageMinutes,averageSeconds,totalMinutes,totalSeconds = 0;

      // Calculate sum of all rounds and round average time
      const roundsSum = roundTimes.reduce((a, b) => a + b, 0);
      const roundsAverage = Math.floor(roundsSum / roundTimes.length);


      // If more than one retention has been finished apply average round time
      if (roundTimes.length >= 2) {
        // Transform average time to minutes and seconds
        averageMinutes = Math.floor(roundsAverage / 60);
        averageSeconds = ("00" + (roundsAverage - averageMinutes * 60)).slice(-2);

        // Append average round time as the first table row
        finishTableBody.innerHTML += `<tr class="round_average"><td>Average</td><td>${averageMinutes}:${averageSeconds}</td></tr>`;
      }


      // Append all rounds to table
      for (let i = 0; i < roundTimes.length; i++) {
        roundMinutes = Math.floor(roundTimes[i] / 60);
        roundSeconds = ("00" + (roundTimes[i] - roundMinutes * 60)).slice(-2);
        finishTableBody.innerHTML += `<tr><td>Round ${i + 1}</td><td>${roundMinutes}:${roundSeconds}</td></tr>`;
      }

      // Append session total time as the last table row
      totalMinutes = Math.floor(totalTime / 60);
      totalSeconds = ("00" + (totalTime - totalMinutes * 60)).slice(-2);
      finishTableBody.innerHTML += `<tr><td>Total session time</td><td>${totalMinutes}:${totalSeconds}</td></tr>`;
    }
    // If session is finished before the first retention...
    else {
        console.log("Session stopped before finishing first retention. Returning to intro...");
        round = 0;
        totalTime = 0;
        cntIntro.classList.remove("hidden");
        contentFinish.classList.add("hidden");

        // Hide finish button
        topNavFinish.style.display = "none";
        topnavInfo.style.display = "inline-block";
      }


  };






  const totalTimeCountdown = () => {
    totalTime++;
    //console.log("Total time: " + totalTime);
  };


  // Start the breathing exercise with the intro start-button
  introStartWrp.addEventListener("click", () => {
    startRound();
    totalTimeCountdown();
    totalTimeInterval = setInterval(totalTimeCountdown, 1000);
  });

  // Finish the session
  topNavFinish.addEventListener("click", () => {
    finish();
    clearInterval(totalTimeInterval);
  });

  function refreshPage() {
  location.reload();
}

  // Reload page when clicked
  reload.addEventListener("click", () => {
    refreshPage();
  });

  appLogo.addEventListener("click", () => {
    refreshPage();
  });


});