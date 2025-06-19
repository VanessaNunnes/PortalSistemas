// quiz.js
document.addEventListener('DOMContentLoaded', function() {
    const quizForm = document.getElementById('quiz-form');
    const questions = document.querySelectorAll('.quiz-question');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progressBar = document.querySelector('.progress-bar');
    const progressText = document.querySelector('.progress-text');
    const quizResult = document.getElementById('quiz-result');
    const resultContent = document.getElementById('result-content');
    const restartQuizBtn = document.getElementById('restart-quiz');
    
    let currentQuestion = 0;
    const totalQuestions = questions.length;
    const answers = {};
    
    // Inicializar quiz
    function initQuiz() {
        showQuestion(currentQuestion);
        updateProgress();
    }
    
    // Mostrar questão atual
    function showQuestion(index) {
        questions.forEach((question, i) => {
            question.classList.toggle('active', i === index);
        });
        
        prevBtn.disabled = index === 0;
        nextBtn.textContent = index === totalQuestions - 1 ? 'Ver Resultado' : 'Próxima';
    }
    
    // Atualizar barra de progresso
    function updateProgress() {
        const progress = ((currentQuestion + 1) / totalQuestions) * 100;
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `Pergunta ${currentQuestion + 1} de ${totalQuestions}`;
    }
    
    // Navegação entre questões
    function goToNextQuestion() {
        if (currentQuestion < totalQuestions - 1) {
            currentQuestion++;
            showQuestion(currentQuestion);
            updateProgress();
        } else {
            calculateResult();
        }
    }
    
    function goToPrevQuestion() {
        if (currentQuestion > 0) {
            currentQuestion--;
            showQuestion(currentQuestion);
            updateProgress();
        }
    }
    
    // Calcular resultado
    function calculateResult() {
        const scores = { ux: 0, dev: 0, qa: 0 };
        
        // Contar respostas
        for (let i = 1; i <= totalQuestions; i++) {
            const selectedOption = document.querySelector(`input[name="q${i}"]:checked`);
            if (selectedOption) {
                scores[selectedOption.value]++;
            }
        }
        
        // Determinar resultado
        let result;
        if (scores.ux >= scores.dev && scores.ux >= scores.qa) {
            result = 'ux';
        } else if (scores.dev >= scores.ux && scores.dev >= scores.qa) {
            result = 'dev';
        } else {
            result = 'qa';
        }
        
        showResult(result);
    }
    
    // Mostrar resultado
    function showResult(result) {
        quizForm.style.display = 'none';
        quizResult.style.display = 'block';
        
        const resultsData = {
            ux: {
                title: 'Trilha UX Design',
                icon: 'fas fa-paint-brush',
                description: 'Sua criatividade e empatia fazem de você um ótimo candidato para a Trilha de UX Design! Você se destacará criando interfaces incríveis que melhoram a experiência do usuário.'
            },
            dev: {
                title: 'Trilha Desenvolvimento',
                icon: 'fas fa-code',
                description: 'Sua lógica e habilidade técnica indicam que a Trilha de Desenvolvimento é perfeita para você! Você será capaz de construir sistemas robustos e inovadores.'
            },
            qa: {
                title: 'Trilha QA',
                icon: 'fas fa-bug',
                description: 'Seu olhar atento e meticulosidade combinam perfeitamente com a Trilha de QA! Você será essencial para garantir a qualidade dos sistemas desenvolvidos.'
            }
        };
        
        resultContent.innerHTML = `
            <div class="result-image">
                <i class="${resultsData[result].icon}"></i>
            </div>
            <h3>${resultsData[result].title}</h3>
            <p class="result-description">${resultsData[result].description}</p>
            <a href="jornadas-especializadas.html" class="btn">Conheça esta Trilha</a>
        `;
    }
    
    // Reiniciar quiz
    function restartQuiz() {
        currentQuestion = 0;
        quizForm.reset();
        quizForm.style.display = 'block';
        quizResult.style.display = 'none';
        showQuestion(currentQuestion);
        updateProgress();
    }
    
    // Event listeners
    nextBtn.addEventListener('click', goToNextQuestion);
    prevBtn.addEventListener('click', goToPrevQuestion);
    restartQuizBtn.addEventListener('click', restartQuiz);
    
    // Iniciar quiz
    initQuiz();
});