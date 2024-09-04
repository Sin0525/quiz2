let quiz = [
  {
    question: "1. What is the main cause of global warming?",
    options: ["A.Solar system", "B.Volcanic eruption", "C.Greenhouse gas emissions from human activities", "D.Changes in Earth's orbit"],
    correct: 2,
    explanation: "Increasing Greenhouses Gases are effecting the Global warming.",
    type: "mcq"
    //https://science.nasa.gov/climate-change/causes/
  },
   {
    question: "2.Which greenhouse gas is the most significant contributor to global warming?",
    options: ["A.Methane (CH₄)", "B.Carbon dioxide (CO₂)", "C. Water vapor (H₂O)", "D.None of them"],
    correct: 1,
    explanation: "Carbon dioxide CO₂ is the most significant contributor to the greenhouse gas emissions.",
    type: "mcq"
     //https://www.epa.ie/our-services/monitoring--assessment/climate-change/ghg/#:~:text=Carbon%20dioxide%20CO%E2%82%82%20is%20the,fossil%20fuels%20in%20all%20sectors.
  },
  {
    question: "3. Which of the following is a consequence of global warming?",
    options: ["A. Cooler summers", "B. More severe weather", "C. More ice in the Arctic", "D. Fewer storms"],
    correct: 1,
    explanation: "Due to global warming, more severe weather events are happening.",
    type: "mcq"
    // https://climate.ec.europa.eu/climate-change/consequences-climate-change_en
  },
   {
    question: "4. How much has Earth's temperature increased recently?",
    options: ["A. 0.5°C", "B. 1.1°C", "C. 2.0°C", "D. 3.0°C"],
    correct: 1,
    explanation: "The average global temperature on Earth has increased by at least 1.1° Celsius (1.9° Fahrenheit) since 1880.",
    type: "mcq"
    //https://earthobservatory.nasa.gov/world-of-change/global-temperatures
  },
  {
    question: "5. What happens to sea levels because of global warming?",
    options: ["A. Rise", "B. Fall", "C.Remain same. ", "D. Polluted"],
    correct: 0,
    explanation: "Global sea levels are rising as a result of human-caused global warming.",
    type: "mcq"
    //https://www.climate.gov/news-features/understanding-climate/climate-change-global-sea-level#:~:text=Global%20warming%20is%20causing%20global,expanding%20as%20the%20water%20warms.
  },
  {
  question: "6. Even if you reduce your electricity consumption, it will not help to decrease your carbon footprint.",
    correct: false,
    explanation: "Switching to clean energy sources, changing the way you travel, and reducing your consumption by recycling and reusing will help decreasing carbon footprint!",
    type: "tf"
    //https://explore.panda.org/climate/how-to-reduce-your-carbon-footprint#:~:text=Reduce%20your%20carbon%20footprint%20through,by%20recycling%20and%20reusing%20everything!
  },
  {
    question: "7. What are renewable energy sources that can help reduce global warming?",
    options: ["A. Coal and oil", "B. Solar and wind", "C.Gasoline and diesel. ", "D. None of the above"],
    correct: 1,
    explanation: "Renewable energy sources, such as wind and solar, emit little to no greenhouse gases, are readily available and in most cases cheaper than coal, oil or gas.",
    type: "mcq"
    //https://www.un.org/en/climatechange/raising-ambition/renewable-energy#:~:text=Renewable%20energy%20sources%2C%20such%20as,than%20coal%2C%20oil%20or%20gas.
  },
  {
  question: "8.Trees remove climate-warming carbon dioxide from the air through photosynthesis, helping us reduce the impact of climate change.",
    correct: true,
    explanation: "",
    type: "tf"
    //https://www.nationalforests.org/blog/a-breath-of-fresh-air-how-trees-help-mitigate-climate-change
  },
  {
  question: "9. Which of these helps slow down global warming?",
    options: ["A. Planting trees", "B. Using more plastic", "C.Burning more coal. ", "D. Cutting down forests"],
    correct: 1,
    explanation: "",
    type: "mcq"
  },
  {
   question: "10.Global warming has no impact on polar ice caps, and their melting does not contribute to rising sea levels.",
    correct: false,
    explanation: "",
    type: "tf"
    //https://www.climate.gov/news-features/understanding-climate/climate-change-global-sea-level#:~:text=Global%20warming%20is%20causing%20global,expanding%20as%20the%20water%20warms.
  },
];

let currentQuestion = 0;
let userAnswer = -1;
let score = 0;
let timer = 10;
let intervalId;
let state = "start";
let feedbackMessage = "";
let feedbackColor;
let feedbackTimer;
let feedbackX;

let values = [];
let step;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(20);
  feedbackX = -width;
  
  step = width / 8;
  generateNewEllipses();
}

function draw() {
  background(220);
  
  drawEllipses();
  
  noStroke(); // Remove stroke from text
  
  if (state === "start") {
    displayStartScreen();
  } else if (state === "quiz") {
    displayQuestion();
    displayTimer();
  } else if (state === "feedback") {
    displayFeedback();
    animateFeedback();
  } else if (state === "end") {
    displayEndScreen();
  }
}

function generateNewEllipses() {
  values = [];
  for (let i = 0; i <= 8; i++) {
    values[i] = random(5, 60);
  }
}

function drawEllipses() {
  let y = height / 4;
  
  for (let i = 0; i < values.length; i++) {
    let x = i * step + step / 2;
    let r = values[i];
    
    let red = random(255);
    let green = random(255);
    let blue = random(255);
    stroke(red,green,blue);
    fill(0,0,50);
    ellipse(x, y, r);
  }
}

function displayStartScreen() {
  textAlign(CENTER);
  textSize(32);
  fill(0);
  text("Welcome to the Quiz!", width / 2, height / 2 + 30);
  textSize(20);
  text("Tap to Start", width / 2, height / 2 + 60);
}

function startQuiz() {
  state = "quiz";
  resetTimer();
}

function resetTimer() {
  clearInterval(intervalId);
  timer = 10;
  intervalId = setInterval(() => {
    timer--;
    if (timer <= 0) {
      checkAnswer(-1);
    }
  }, 1000);
}

function displayQuestion() {
  let q = quiz[currentQuestion];
  textAlign(LEFT);
  textSize(20);
  textStyle(BOLD);
  fill(0);
  textWrap(WORD);
  text(q.question, 20, height / 2 - 60, width - 40);

  if (q.type === "mcq") {
    for (let i = 0; i < q.options.length; i++) {
      fill(0, 0, 0, 20); 
      rect(20, height / 2 + 10 + i * 40, width - 40, 30, 5);
      fill(255);
      textSize(16);
      textStyle(NORMAL);
      text(q.options[i], 30, height / 2 + 30 + i * 40);
    }
  } else if (q.type === "tf") {
    fill(0, 0, 0, 20);
    rect(20, height / 2 + 10, (width - 60) / 2, 40, 10);
    rect(40 + (width - 60) / 2, height / 2 + 10, (width - 60) / 2, 40, 10);
    fill(255);
    textSize(16);
    textStyle(NORMAL);
    text("True", 30 + (width - 60) / 4, height / 2 + 35);
    text("False", 50 + 3 * (width - 60) / 4, height / 2 + 35);
  }
}

function displayTimer() {
  textAlign(CENTER);
  textSize(46);
  textStyle(BOLD);
  fill(0);
  text(timer, width / 2, 80);
  textStyle(NORMAL);
}

function checkAnswer(selectedOption) {
  let q = quiz[currentQuestion];
  clearInterval(intervalId);

  if ((q.type === "mcq" && selectedOption === q.correct) ||
    (q.type === "tf" && selectedOption === q.correct)) {
    score++;
    feedbackMessage = "Correct!\n" + q.explanation;
    feedbackColor = color(0, 210, 0);
  } else {
    feedbackMessage = "Incorrect!\n" + q.explanation;
    feedbackColor = color(255, 0, 0);
  }

  state = "feedback";
  feedbackTimer = millis();
  feedbackX = 10;
}

function animateFeedback() {
  if (feedbackX < width / 2) {
    feedbackX += 15;
  }
}

function displayFeedback() {
  textAlign(CENTER);
  textSize(24);
  fill(feedbackColor);
  textWrap(WORD);
  text(feedbackMessage, width / 2 - 200, height / 2, 400);

  if (millis() - feedbackTimer > 2000) {
    nextQuestion();
  }
}

function displayEndScreen() {
  textAlign(CENTER);
  textSize(32);
  fill(0);
  text("Quiz Over!", width / 2, height / 2 - 50);
  textSize(24);
  text("Your Score: " + score + " / " + quiz.length, width / 2, height / 2);
  textSize(20);
  text("Tap to Restart", width / 2, height / 2 + 50);
}

function keyPressed() {
  if (state === "start" && (keyCode === ENTER || mouseIsPressed)) {
    startQuiz();
  } else if (state === "end" && (keyCode === ENTER || mouseIsPressed)) {
    currentQuestion = 0;
    score = 0;
    state = "start";
  }
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion >= quiz.length) {
    state = "end";
  } else {
    state = "quiz";
    generateNewEllipses();
    resetTimer();
  }
}

// Use touchStarted() for touch events
function touchStarted() {
  if (state === "quiz") {
    let q = quiz[currentQuestion];
    if (q.type === "mcq") {
      for (let i = 0; i < q.options.length; i++) {
        if (mouseX > 20 && mouseX < width - 20 && mouseY > height / 2 + 10 + i * 40 && mouseY < height / 2 + 40 + i * 40) {
          checkAnswer(i);
          return false; // Prevents default behavior
        }
      }
    } else if (q.type === "tf") {
      if (mouseX > 20 && mouseX < (width - 60) / 2 + 20 && mouseY > height / 2 + 10 && mouseY < height / 2 + 50) {
        checkAnswer(true);
        return false; // Prevents default behavior
      } else if (mouseX > 40 + (width - 60) / 2 && mouseX < width - 20 && mouseY > height / 2 + 10 && mouseY < height / 2 + 50) {
        checkAnswer(false);
        return false; // Prevents default behavior
      }
    }
  } else if (state === "start") {
    startQuiz();
    return false; // Prevents default behavior
  } else if (state === "end") {
    currentQuestion = 0;
    score = 0;
    state = "start";
    return false; // Prevents default behavior
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  step = width / 25;
  generateNewEllipses();
}
