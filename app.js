// Function to launch confetti
const launchConfetti = () => {
  const duration = 2 * 1000; //confetti will appear for 2 seconds
  const animationEnd = Date.now() + duration; //This breaks the confetti loop
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  const randomInRange = (min, max) => {
    //adds randomness to the confetti particles position
    return Math.random() * (max - min) + min;
  };

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration); // particle count divides the timeleft by the duration and puts less confetti out towards the end for it to fade out
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: {
          x: randomInRange(0.1, 0.3),
          y: Math.random() - 0.2,
        },
      })
    );
    confetti(
      Object.assign({}, defaults, {
        // this function randomly assigns where the confetti will appear on screen
        particleCount,
        origin: {
          x: randomInRange(0.7, 0.9),
          y: Math.random() - 0.2,
        },
      })
    );
  }, 250); // this makes the confetti appear every 250 milliseconds
};

// Function to handle form submission
const handleSubmit = (event) => {
  event.preventDefault(); // Prevent default form submission
  const form = event.target;
  if (form.checkValidity() === false) {
    event.stopPropagation();
  } else {
    const formData = new FormData(form);
    const dob = formData.get("dob"); // retireves the value of dob
    const yearLastDigit = dob.split("-")[0].slice(-1); //split[0] takes the year, slice(-1) takes the last digit
    if (yearLastDigit === "5" || yearLastDigit === "0") {
      // Checks if the year of birth ends in 5 or 0
      launchConfetti();
      // launch confetti
    } else {
      alert(
        "Sorry :( confetti only for users with a birthyear ending in 5 or 0!"
      );
    }
  }

  form.classList.add("was-validated"); // adds was-validated class to the form to enable bootstrap validation styles
};

document.addEventListener("DOMContentLoaded", () => {
  // ensures the code runs after the whole document is complete
  const form = document.getElementById("userForm");
  form.addEventListener("submit", handleSubmit);
});
