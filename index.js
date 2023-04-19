const url = "https://api.dictionaryapi.dev/api/v2/entries/en";
const btn = document.getElementById("search");
const input = document.getElementById("input");
const result = document.getElementById("result");
const audio = document.getElementById("sound");

btn.addEventListener("click", () => {
  let inputValue = document.getElementById("input").value;
  fetch(`${url}/${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      result.innerHTML = `
      <div class="word">
      <h4>${inputValue}</h4>
      <button onClick = "playVoice()">
          <i class="fa-solid fa-volume-high" ></i>
      </button>
      </div>
      <div class="details">
          <p>${data[0].meanings[0].partOfSpeech || " "}</p>
          <p>${data[0].phonetic || " "}</p>
      </div>
      <p class="meaning">
         ${data[0].meanings[0].definitions[0].definition}
      </p>
      <p class="example">
      ${data[0].meanings[0].synonyms[2] || " "}
      </p>
      `;
      if (data[0].phonetics[0].audio) {
        sound.setAttribute("src", `${data[0].phonetics[0].audio}`);
      } else if (data[0].phonetics[0].audio == " ") {
        sound.setAttribute("src", `${data[0].phonetics[1].audio}`);
      } else {
        const soundBtnIcon = document.querySelector(".word button i");
        let soundBtnClass =
          document.querySelector(".word button i").classList.value;
        soundBtnClass = "fa-solid fa-volume-xmark";
        soundBtnIcon.setAttribute("class", soundBtnClass);
      }
    });
});

function playVoice() {
  sound.play();
}
