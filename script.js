const subjectInput = document.getElementById("subject");
const pointsInput = document.getElementById("points");
const addBtn = document.getElementById("addBtn");
const clearBtn = document.getElementById("clearBtn");
const gradeList = document.getElementById("gradeList");
const averageDisplay = document.getElementById("average");

let grades = JSON.parse(localStorage.getItem("fos_grades")) || [];

function render() {
  gradeList.innerHTML = "";
  let sum = 0;

  for (let i = 0; i < grades.length; i++) {
    const item = grades[i];
    sum += item.points;

    const li = document.createElement("li");
    li.textContent = item.subject + ": " + item.points + " Punkte";
    gradeList.appendChild(li);
  }

  if (grades.length > 0) {
    const avg = sum / grades.length;
    averageDisplay.textContent = avg.toFixed(2);
  } else {
    averageDisplay.textContent = "-";
  }
}

addBtn.addEventListener("click", function () {
  const subject = subjectInput.value.trim();
  const points = Number(pointsInput.value);

  if (subject === "" || pointsInput.value === "" || points < 0 || points > 15) {
    alert("Bitte ein Fach und Punkte zwischen 0 und 15 eingeben.");
    return;
  }

  grades.push({ subject: subject, points: points });
  localStorage.setItem("fos_grades", JSON.stringify(grades));

  subjectInput.value = "";
  pointsInput.value = "";
  render();
});

clearBtn.addEventListener("click", function () {
  grades = [];
  localStorage.removeItem("fos_grades");
  render();
});

render();