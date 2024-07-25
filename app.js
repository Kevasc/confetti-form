// Function to launch confetti
const launchConfetti = () => {
  const duration = 2 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
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
        particleCount,
        origin: {
          x: randomInRange(0.7, 0.9),
          y: Math.random() - 0.2,
        },
      })
    );
  }, 250);
};

// Function to handle form submission
const handleSubmit = (event) => {
  event.preventDefault(); // Prevent default form submission

  const form = event.target;
  if (form.checkValidity() === false) {
    event.stopPropagation();
  } else {
    // Get form data
    const formData = new FormData(form);
    const dob = formData.get("dob");

    // Check if the year of birth ends in 5 or 0
    const yearLastDigit = dob.split("-")[0].slice(-1);
    if (yearLastDigit === "5" || yearLastDigit === "0") {
      // Show confetti
      launchConfetti();
    } else {
      alert("Confetti only for birth years ending in 5 or 0!");
    }
  }

  form.classList.add("was-validated");
};

// Add event listener to the form
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("userForm");
  form.addEventListener("submit", handleSubmit);
});
