// Sample Data Structure
const questions = {
    english: [
        { q: "Choose the synonym for 'Eloquent'", options: ["Fluent", "Silent", "Slow", "Rude"], correct: 0 },
        { q: "Identify the noun: 'The cat sat on the mat.'", options: ["Sat", "On", "Cat", "Slowly"], correct: 2 },
        // ... add 18 more
    ],
    biology: [
    { q: "Which organelle is responsible for cellular respiration?", options: ["Ribosome", "Mitochondria", "Golgi body", "Chloroplast"], correct: 1 },
    { q: "The process of maintaining a constant internal environment is:", options: ["Osmosis", "Homeostasis", "Diffusion", "Respiration"], correct: 1 },
    { q: "Which of these is a function of the liver?", options: ["Production of bile", "Production of insulin", "Storage of urine", "Digestion of starch"], correct: 0 },
    { q: "The deficiency of Vitamin C causes:", options: ["Rickets", "Scurvy", "Beri-beri", "Pellagra"], correct: 1 },
    { q: "In a DNA molecule, Adenine pairs with:", options: ["Guanine", "Cytosine", "Thymine", "Uracil"], correct: 2 }
    ],
    
       
        
        // ... add 19 more
    
    
    physics: [
    { q: "Which of the following is a scalar quantity?", options: ["Force", "Velocity", "Momentum", "Energy"], correct: 3 },
    { q: "The unit of Power is the:", options: ["Joule", "Newton", "Watt", "Pascal"], correct: 2 },
    { q: "A lens that is thinner at the middle than at the edges is a:", options: ["Convex lens", "Diverging lens", "Converging lens", "Biconvex lens"], correct: 1 },
    { q: "The speed of light in a vacuum is approximately:", options: ["3.0 x 10^8 m/s", "3.0 x 10^6 m/s", "1.5 x 10^8 m/s", "9.8 x 10^7 m/s"], correct: 0 },
    { q: "The temperature at which water is at its maximum density is:", options: ["0°C", "100°C", "4°C", "-4°C"], correct: 2 }
    ],
    chemistry: [
    { q: "What is the oxidation state of Manganese in KMnO4?", options: ["+2", "+5", "+6", "+7"], correct: 3 },
    { q: "Which of the following is an isotopes of Hydrogen?", options: ["Deuterium", "Helium", "Lithium", "Beryllium"], correct: 0 },
    { q: "The process of vulcanization involves the addition of:", options: ["Carbon", "Sulfur", "Nitrogen", "Oxygen"], correct: 1 },
    { q: "What is the shape of a methane molecule?", options: ["Linear", "Trigonal", "Tetrahedral", "Octahedral"], correct: 2 },
    { q: "Which gas is evolved when Dilute HCl reacts with Calcium Carbonate?", options: ["Hydrogen", "Oxygen", "Carbon dioxide", "Chlorine"], correct: 2 }
    ],
    
    
    // Repeat for physics and chemistry
};

let currentSub = 'english';
let currentIdx = 0;
let userAnswers = { english: {}, biology: {}, chemistry: {}, physics: {} };
let timeLeft = 3600; // 60 minutes in seconds

function init() {
    renderQuestion();
    renderGrid();
    startTimer();
}

function renderQuestion() {
    const qData = questions[currentSub][currentIdx];
    document.getElementById('current-subject-title').innerText = currentSub.toUpperCase();
    document.getElementById('question-text').innerText = `Question ${currentIdx + 1}: ${qData.q}`;
    
    const optionsDiv = document.getElementById('options-container');
    optionsDiv.innerHTML = '';
    
    qData.options.forEach((opt, i) => {
        const isChecked = userAnswers[currentSub][currentIdx] === i ? 'checked' : '';
        optionsDiv.innerHTML += `
            <label>
                <input type="radio" name="opt" onclick="saveAnswer(${i})" ${isChecked}> ${opt}
            </label>
        `;
    });
    updateGridUI();
}

function saveAnswer(idx) {
    userAnswers[currentSub][currentIdx] = idx;
    updateGridUI();
}

function switchSubject(sub) {
    currentSub = sub;
    currentIdx = 0;
    renderQuestion();
    renderGrid();
}

function renderGrid() {
    const grid = document.getElementById('question-grid');
    grid.innerHTML = '';
    questions[currentSub].forEach((_, i) => {
        const btn = document.createElement('div');
        btn.className = 'grid-item';
        btn.innerText = i + 1;
        btn.onclick = () => { currentIdx = i; renderQuestion(); };
        grid.appendChild(btn);
    });
}

function updateGridUI() {
    const items = document.querySelectorAll('.grid-item');
    items.forEach((item, i) => {
        item.classList.remove('active', 'answered');
        if (i === currentIdx) item.classList.add('active');
        if (userAnswers[currentSub][i] !== undefined) item.classList.add('answered');
    });
}

function nextQuestion() {
    if (currentIdx < questions[currentSub].length - 1) {
        currentIdx++;
        renderQuestion();
    }
}

function prevQuestion() {
    if (currentIdx > 0) {
        currentIdx--;
        renderQuestion();
    }
}

function startTimer() {
    const timerEl = document.getElementById('timer');
    const interval = setInterval(() => {
        let mins = Math.floor(timeLeft / 60);
        let secs = timeLeft % 60;
        timerEl.innerText = `Time Left: ${mins}:${secs < 10 ? '0' : ''}${secs}`;
        if (timeLeft <= 0) {
            clearInterval(interval);
            showResults();
        }
        timeLeft--;
    }, 1000);
}

function showResults() {
    let totalScore = 0;
    let summaryHTML = "";

    for (let sub in questions) {
        let subScore = 0;
        questions[sub].forEach((q, i) => {
            if (userAnswers[sub][i] === q.correct) subScore++;
        });
        totalScore += subScore;
        summaryHTML += `<p>${sub.toUpperCase()}: ${subScore} / ${questions[sub].length}</p>`;
    }

    document.getElementById('score-summary').innerHTML = summaryHTML + `<h3>Total Score: ${totalScore}</h3>`;
    document.getElementById('result-modal').style.display = 'flex';
}

init();
z