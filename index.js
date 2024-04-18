const LENGTH_OF_NUMBERS = 10;
    const MAX_NUMBER = 10;
    const INTERVAL = 1_500;
    const numbers = [];

    document.querySelector("#playNow").addEventListener("click", (event) => {
      startGame();
    });

    const sumForm = document.querySelector("form#sumForm");

    sumForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const data = new FormData(sumForm);
      const answer = data.get("sum");

      endGame(answer);
    });

    const switchActiveSectionTo = (sectionId) => {
      const section = document.querySelector("section.active");
      const visibleSection = document.querySelector(`#${sectionId}`);

      section?.classList.remove("active");
      visibleSection.classList.add("active");
    };

    const getUserInput = () => {
      switchActiveSectionTo("yourInput");
    };

    const addNewNumber = () => {
      const coefficient = Math.floor(Math.random() * 2) === 0 ? 1 : -1;
      const number = Math.floor(Math.random() * (MAX_NUMBER + 1)) * coefficient;
      numbers.push(number);
      document.querySelector("#currentNumber").innerHTML = number;
      console.log({number});
    };

    const startGame = () => {
      switchActiveSectionTo("numbers");

      const interval = setInterval(() => {
        if (numbers.length < LENGTH_OF_NUMBERS) {
          addNewNumber();
          return;
        }
          clearInterval(interval);
          switchActiveSectionTo("yourInput")
      }, INTERVAL);
    };
    const endGame = (answer) => {
      const correctAnswer = numbers.reduce((sum, n) => sum + n, 0);
      console.log(correctAnswer, answer, numbers);
      if (parseInt(answer, 10) === correctAnswer) {
        switchActiveSectionTo("results-correct");
      } else {
        switchActiveSectionTo("results-incorrect");
        document.querySelector("#correctAnswer").innerHTML = correctAnswer;
        document.querySelector("#subtext").innerHTML = answer > correctAnswer ? "Your answer was too high" : "Your answer was too low";
        document.querySelector("#yourNumbers").innerHTML = numbers.join(", ");
      }
    }
    const resetGame = () => {
      window.location.reload();
    }