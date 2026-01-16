// Quiz data
const questions = [
    {
        question: "Apa ibukota Indonesia?",
        options: ["Jakarta", "Bandung", "Surabaya", "Medan"],
        correct: 0
    },
    {
        question: "Suku bangsa terbesar di Indonesia adalah...",
        options: ["Jawa", "Sunda", "Batak", "Melayu"],
        correct: 0
    },
    {
        question: "Siapa presiden pertama Indonesia?",
        options: ["Soekarno", "Soeharto", "Habibie", "Megawati"],
        correct: 0
    },
{
        question: "Apa semboyan negara Indonesia?",
        options: ["Merah Putih", "Pancasila", "Bhinneka Tunggal Ika", "Indonesia Raya"],
        correct: 2
    },
    {
        question: "Kapan Hari Kemerdekaan Indonesia diperingati?",
        options: ["17 Agustus 1945", "28 Oktober 1928", "1 Juni 1945", "10 November 1945"],
        correct: 0
    },
    {
        question: "Apa judul lagu kebangsaan Indonesia?",
        options: ["Garuda Pancasila", "Tanah Airku", "Maju Tak Gentar", "Indonesia Raya"],
        correct: 3
    },
    {
        question: "Siapa pencipta lagu kebangsaan Indonesia Raya?",
        options: ["Ismail Marzuki", "W.R. Supratman", "C. Simanjuntak", "Ibu Soed"],
        correct: 1
    },
    {
        question: "Pulau dengan jumlah penduduk terbanyak di Indonesia adalah...",
        options: ["Sumatra", "Kalimantan", "Jawa", "Sulawesi"],
        correct: 2
    },
    {
        question: "Gunung tertinggi di Indonesia adalah...",
        options: ["Gunung Rinjani", "Gunung Semeru", "Puncak Jaya", "Gunung Kerinci"],
        correct: 2
    },
    {
        question: "Apa nama mata uang resmi Indonesia?",
        options: ["Dollar", "Ringgit", "Baht", "Rupiah"],
        correct: 3
    },
    {
        question: "Candi Buddha terbesar di dunia yang terletak di Indonesia adalah...",
        options: ["Candi Prambanan", "Candi Borobudur", "Candi Mendut", "Candi Plaosan"],
        correct: 1
    },
    {
        question: "Siapa wakil presiden pertama Indonesia?",
        options: ["Adam Malik", "B.J. Habibie", "Soeharto", "Mohammad Hatta"],
        correct: 3
    },
    {
        question: "Warna bendera Indonesia, Merah Putih, melambangkan...",
        options: ["Siang dan Malam", "Gula dan Kopi", "Berani dan Suci", "Tanah dan Air"],
        correct: 2
    },
    {
        question: "Indonesia memiliki berapa zona waktu?",
        options: ["1", "2", "3", "4"],
        correct: 2
    },
    {
        question: "Hari Sumpah Pemuda diperingati setiap tanggal...",
        options: ["20 Mei", "1 Juni", "28 Oktober", "10 November"],
        correct: 2
    },
    {
        question: "Di pulau manakah letak Ibukota Nusantara (IKN)?",
        options: ["Jawa", "Kalimantan", "Sumatra", "Sulawesi"],
        correct: 1
    },
    {
        question: "Negara Eropa yang paling lama menjajah Indonesia adalah...",
        options: ["Portugis", "Spanyol", "Inggris", "Belanda"],
        correct: 3
    },
    {
        question: "Apa bahasa resmi dan bahasa persatuan Indonesia?",
        options: ["Bahasa Jawa", "Bahasa Indonesia", "Bahasa Melayu", "Bahasa Sanskerta"],
        correct: 1
    },
    {
        question: "Berapa jumlah provinsi di Indonesia saat ini (per 2024)?",
        options: ["34", "35", "37", "38"],
        correct: 3
    },
    {
        question: "Hari Lahir Pancasila diperingati setiap tanggal...",
        options: ["1 Juni", "17 Agustus", "1 Oktober", "22 Desember"],
        correct: 0
    }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let userAnswers = [];

function startQuiz() {
    userAnswers = [];  // Reset user answers when starting new quiz
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    showQuestion();
}

function showQuestion() {
    const question = questions[currentQuestion];
    document.getElementById('question-text').textContent = question.question;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.onclick = () => selectOption(index);
        optionsContainer.appendChild(optionElement);
    });

    document.getElementById('current-question').textContent = currentQuestion + 1;
    selectedAnswer = null;
}

function selectOption(index) {
    const options = document.querySelectorAll('.option');
    options.forEach(option => option.classList.remove('selected'));
    options[index].classList.add('selected');
    selectedAnswer = index;
}

function nextQuestion() {
    if (selectedAnswer !== null) {
        if (selectedAnswer === questions[currentQuestion].correct) {
            score++;
        }
        
        // Store user's answer
        userAnswers.push({
            questionIndex: currentQuestion,
            userAnswer: selectedAnswer
        });
        
        currentQuestion++;
        
        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    } else {
        alert('Silakan pilih jawaban terlebih dahulu!');
    }
}

function showResult() {
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('result-screen').style.display = 'block';
    document.getElementById('score').textContent = score;
}

function showReview() {
    document.getElementById('result-screen').style.display = 'none';
    document.getElementById('review-screen').style.display = 'block';
    
    const reviewContainer = document.getElementById('review-answers');
    reviewContainer.innerHTML = '';
    
    userAnswers.forEach((answer, index) => {
        const question = questions[answer.questionIndex];
        const isCorrect = answer.userAnswer === question.correct;
        
        const reviewItem = document.createElement('div');
        reviewItem.className = 'review-item';
        
        reviewItem.innerHTML = `
            <div class="review-question">Soal ${index + 1}: ${question.question}</div>
            <div class="review-options">
                <div>Jawaban Anda: <span class="${isCorrect ? 'correct-answer' : 'wrong-answer'}">${question.options[answer.userAnswer]}</span></div>
                ${!isCorrect ? `<div>Jawaban Benar: <span class="correct-answer">${question.options[question.correct]}</span></div>` : ''}
            </div>
        `;
        
        reviewContainer.appendChild(reviewItem);
    });
}

function backToResult() {
    document.getElementById('review-screen').style.display = 'none';
    document.getElementById('result-screen').style.display = 'block';
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    document.getElementById('result-screen').style.display = 'none';
    document.getElementById('review-screen').style.display = 'none';
    document.getElementById('start-screen').style.display = 'block';
}