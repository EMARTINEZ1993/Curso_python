// ============================================
// APLICACIÓN PRINCIPAL - PYTHON ADVENTURE
// Prof. Luz Eliana Martinez Ramos
// ============================================

// Estado global de la aplicación
let appState = {
    currentUser: {
        name: localStorage.getItem('pythonStudentName') || '',
        points: parseInt(localStorage.getItem('pythonPoints')) || 0,
        completedModules: JSON.parse(localStorage.getItem('pythonCompleted')) || [],
        streak: parseInt(localStorage.getItem('pythonStreak')) || 0,
        lastActive: localStorage.getItem('pythonLastActive') || new Date().toDateString(),
        achievements: JSON.parse(localStorage.getItem('pythonAchievements')) || []
    },
    currentModuleId: parseInt(localStorage.getItem('currentModule')) || 1,
    theme: localStorage.getItem('pythonTheme') || 'light',
    soundEnabled: localStorage.getItem('pythonSound') !== 'false'
};

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function () {
    console.log('🐍 Python Adventure - Prof. Luz Eliana Martinez Ramos');
    initializeApp();
    setupEventListeners();
    checkStreak();
    initializeThemeAndSound();
});

function initializeApp() {
    renderModules();
    loadModule(appState.currentModuleId);
    updateUI();
    renderProgressMarkers();
    checkAchievements();
    renderAchievementBadges();
}

// ===== RENDERIZADO DE MÓDULOS =====
function renderModules() {
    const container = document.getElementById('modulesContainer');
    if (!container) return;

    container.innerHTML = courseModules.map(module => {
        const isCompleted = appState.currentUser.completedModules.includes(module.id);
        const isActive = appState.currentModuleId === module.id;

        return `
            <div class="module-card ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}" 
                 onclick="loadModule(${module.id})">
                <div class="module-icon">${module.icon}</div>
                <div class="module-info">
                    <div class="module-title">${module.title}</div>
                    <div class="module-status">
                        <i class="fas fa-clock"></i> ${module.duration}
                        <span style="margin-left: 10px;">
                            <i class="fas fa-star" style="color: #ffd700;"></i> +${module.xp} XP
                        </span>
                    </div>
                </div>
                ${isCompleted ? '<i class="fas fa-check-circle" style="color: #00b894;"></i>' : ''}
            </div>
        `;
    }).join('');
}

// ===== CARGAR MÓDULO =====
function loadModule(moduleId) {
    appState.currentModuleId = moduleId;
    localStorage.setItem('currentModule', moduleId);

    const module = courseModules.find(m => m.id === moduleId);
    if (!module) return;

    const content = document.getElementById('lessonContent');
    if (!content) return;

    // Renderizar contenido del módulo
    content.innerHTML = `
        <div class="lesson-header">
            <div class="lesson-title">
                <span class="emoji-icon">${module.icon}</span>
                <h2>${module.title}</h2>
            </div>
            <div class="lesson-tags">
                <span class="tag"><i class="fas fa-signal"></i> ${module.level}</span>
                <span class="tag"><i class="fas fa-hourglass-half"></i> ${module.duration}</span>
                <span class="tag"><i class="fas fa-star"></i> ${module.xp} XP</span>
            </div>
        </div>
        
        <!-- Tarjeta de concepto -->
        <div class="concept-card">
            <div style="display: flex; align-items: center; margin-bottom: 15px;">
                <span style="font-size: 40px; margin-right: 15px;">${module.concept.emoji}</span>
                <h3 style="color: var(--primary);">${module.concept.title}</h3>
            </div>
            <p style="font-size: 1.1em; margin-bottom: 15px;">${module.concept.description}</p>
            <div style="background: rgba(255, 215, 0, 0.1); padding: 15px; border-radius: 10px; border-left: 5px solid #ffd700;">
                <i class="fas fa-lightbulb" style="color: #ffd700;"></i>
                <span style="margin-left: 10px;"><strong>Dato curioso:</strong> ${module.concept.funFact}</span>
            </div>
        </div>
        
        <!-- Explicación y ejemplos -->
        <div style="background: #f8faff; padding: 25px; border-radius: 20px; margin: 30px 0;">
            <h3><i class="fas fa-chalkboard-teacher"></i> Explicación</h3>
            <p style="margin: 15px 0;">${module.explanation.text}</p>
            
            <div class="example-box">
                <pre style="font-family: 'Fira Code', monospace; margin: 0; white-space: pre-wrap;">${module.explanation.example}</pre>
            </div>
            
            <div style="background: #e8f4f8; padding: 15px; border-radius: 10px; margin-top: 15px;">
                <h4><i class="fas fa-tips"></i> Tips Pro:</h4>
                <ul style="list-style-type: none; padding-left: 0;">
                    ${module.explanation.tips.map(tip => `
                        <li style="margin: 10px 0;">
                            <i class="fas fa-check-circle" style="color: var(--success);"></i> ${tip}
                        </li>
                    `).join('')}
                </ul>
            </div>
        </div>
        
        <!-- Ejercicios -->
        <h3 style="color: var(--danger); margin: 30px 0 20px;">
            <i class="fas fa-dumbbell"></i> ¡Practiquemos!
        </h3>
        
        ${module.exercises.map((exercise, index) => `
            <div style="background: white; border: 2px solid #e0e0e0; border-radius: 15px; padding: 20px; margin-bottom: 30px;">
                <h4 style="display: flex; justify-content: space-between;">
                    <span>
                        <span style="background: var(--primary); color: white; padding: 3px 10px; border-radius: 20px; font-size: 14px; margin-right: 10px;">
                            Ejercicio ${index + 1}
                        </span>
                        ${exercise.title}
                    </span>
                    <span style="color: #666;">
                        <i class="fas fa-star" style="color: #ffd700;"></i> +50 XP
                    </span>
                </h4>
                
                <p style="margin: 15px 0; font-size: 1.1em;">${exercise.description}</p>
                
                <div class="code-editor-container">
                    <div class="editor-header">
                        <span class="file-tab">
                            <i class="fab fa-python"></i> ejercicio_${module.id}_${index + 1}.py
                        </span>
                        <span style="color: #ffd700;">
                            <i class="fas fa-lightbulb"></i> Pista: ${exercise.hint}
                        </span>
                    </div>
                    <textarea 
                        id="code-${module.id}-${index}" 
                        class="code-textarea" 
                        placeholder="# Escribe tu código aquí..."
                    ></textarea>
                    <div style="padding: 15px; display: flex; gap: 15px;">
                        <button class="btn btn-primary" onclick="runExercise(${module.id}, ${index})">
                            <i class="fas fa-play"></i> Ejecutar
                        </button>
                        <button class="btn btn-secondary" onclick="showHint(${module.id}, ${index})">
                            <i class="fas fa-hint"></i> Ver pista
                        </button>
                    </div>
                </div>
                
                <div id="result-${module.id}-${index}" class="result-box" style="display: none;"></div>
            </div>
        `).join('')}
        
        <!-- Mini Quiz (solo si tiene) -->
        ${module.quiz ? `
            <div style="background: linear-gradient(135deg, #667eea15, #764ba215); padding: 25px; border-radius: 20px; margin-top: 40px;">
                <h3><i class="fas fa-question-circle"></i> Mini Quiz</h3>
                <div id="quiz-${module.id}"></div>
            </div>
        ` : ''}
    `;

    // Cargar quiz si existe
    if (module.quiz) {
        renderQuiz(module);
    }

    renderModules(); // Actualizar sidebar
}

// ===== EJECUTAR EJERCICIO =====
function runExercise(moduleId, exerciseIndex) {
    const module = courseModules.find(m => m.id === moduleId);
    if (!module) return;

    const exercise = module.exercises[exerciseIndex];
    const codeElement = document.getElementById(`code-${moduleId}-${exerciseIndex}`);
    const resultElement = document.getElementById(`result-${moduleId}-${exerciseIndex}`);

    if (!codeElement || !resultElement) return;

    const userCode = codeElement.value.trim();

    if (!userCode) {
        showResult(resultElement, '¡Escribe tu código primero!', 'error');
        return;
    }

    // Evaluar el código
    const isCorrect = exercise.test(userCode);

    if (isCorrect) {
        // Ejercicio correcto
        const reward = module.xp; // usar xp definido en el módulo
        showResult(
            resultElement,
            `¡Excelente! 🎉 Tu código es correcto. +${reward} XP`,
            'success'
        );

        // Recompensa solo si no estaba completado
        if (!appState.currentUser.completedModules.includes(moduleId)) {
            appState.currentUser.points += reward;
            appState.currentUser.completedModules.push(moduleId);
            saveProgress();
            updateUI();
            renderModules();

            // Sonido de éxito
            if (appState.soundEnabled) {
                playSound('success');
            }

            // Verificar logros
            checkAchievements();
        }
    } else {
        showResult(
            resultElement,
            '❌ Casi lo tienes. ¡Sigue intentando!',
            'error'
        );

        if (appState.soundEnabled) {
            playSound('error');
        }
    }
}

// ===== MOSTRAR RESULTADO =====
function showResult(element, message, type) {
    element.style.display = 'block';
    element.className = `result-box result-${type}`;
    element.innerHTML = `
        <div style="display: flex; align-items: center; gap: 15px;">
            <span style="font-size: 30px;">
                ${type === 'success' ? '🎉' : '💪'}
            </span>
            <div>
                <strong>${type === 'success' ? '¡Bien hecho!' : '¡Sigue intentando!'}</strong>
                <p style="margin-top: 5px;">${message}</p>
            </div>
        </div>
    `;
}

// ===== MOSTRAR PISTA =====
function showHint(moduleId, exerciseIndex) {
    const module = courseModules.find(m => m.id === moduleId);
    if (!module) return;

    const exercise = module.exercises[exerciseIndex];

    Swal.fire({
        title: '💡 Pista',
        text: exercise.hint,
        icon: 'info',
        confirmButtonColor: '#6c5ce7',
        background: '#f8faff',
        backdrop: 'rgba(108,92,231,0.2)'
    });
}

// ===== ACTUALIZAR UI =====
function updateUI() {
    // Actualizar puntos
    const pointsDisplay = document.getElementById('pointsDisplay');
    if (pointsDisplay) {
        pointsDisplay.textContent = appState.currentUser.points;
    }

    // Actualizar módulos completados
    const completedDisplay = document.getElementById('completedModulesDisplay');
    if (completedDisplay) {
        completedDisplay.textContent = `${appState.currentUser.completedModules.length}/${courseModules.length}`;
    }

    // Actualizar racha
    const streakDisplay = document.getElementById('streakDisplay');
    if (streakDisplay) {
        streakDisplay.textContent = appState.currentUser.streak;
    }

    // Actualizar barra de progreso
    const progressFill = document.getElementById('mainProgressFill');
    if (progressFill) {
        const progress = (appState.currentUser.completedModules.length / courseModules.length) * 100;
        progressFill.style.width = `${progress}%`;
    }

    // Actualizar nivel
    const levelBadge = document.getElementById('levelBadge');
    if (levelBadge) {
        const level = getLevel(appState.currentUser.points);
        levelBadge.innerHTML = `
            <span class="level-number">${level.level}</span>
            <span class="level-text">${level.title}</span>
        `;
    }

    // Guardar en localStorage
    localStorage.setItem('pythonPoints', appState.currentUser.points);
    localStorage.setItem('pythonCompleted', JSON.stringify(appState.currentUser.completedModules));
}

// ===== OBTENER NIVEL =====
function getLevel(points) {
    if (points < 200) return { level: 1, title: 'Python Explorer' };
    if (points < 500) return { level: 2, title: 'Code Adventurer' };
    if (points < 1000) return { level: 3, title: 'Loop Master' };
    if (points < 1500) return { level: 4, title: 'Function Wizard' };
    return { level: 5, title: 'Python Sensei' };
}

// ===== GUARDAR PROGRESO =====
function saveProgress() {
    localStorage.setItem('pythonPoints', appState.currentUser.points);
    localStorage.setItem('pythonCompleted', JSON.stringify(appState.currentUser.completedModules));
    localStorage.setItem('pythonStreak', appState.currentUser.streak);
    localStorage.setItem('pythonAchievements', JSON.stringify(appState.currentUser.achievements));
    localStorage.setItem('pythonLastActive', new Date().toDateString());
}

// ===== VERIFICAR RACHA =====
function checkStreak() {
    const lastActive = new Date(localStorage.getItem('pythonLastActive'));
    const today = new Date();

    if (lastActive.toDateString() !== today.toDateString()) {
        const diffDays = Math.floor((today - lastActive) / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
            // Día consecutivo
            appState.currentUser.streak += 1;
            showStreakNotification();
        } else if (diffDays > 1) {
            // Perdió la racha
            appState.currentUser.streak = 1;
        }

        saveProgress();
        updateUI();
    }
}

// ===== MOSTRAR NOTIFICACIÓN DE RACHA =====
function showStreakNotification() {
    Swal.fire({
        title: `🔥 ¡Racha de ${appState.currentUser.streak} días!`,
        text: 'Sigue así, no pierdas tu racha',
        icon: 'success',
        timer: 3000,
        showConfirmButton: false,
        toast: true,
        position: 'top-end'
    });
}

// ===== VERIFICAR LOGROS =====
function checkAchievements() {
    let newUnlocked = false;
    achievements.forEach(achievement => {
        if (!appState.currentUser.achievements.includes(achievement.id) &&
            achievement.condition(appState.currentUser.completedModules)) {

            // Desbloquear logro
            appState.currentUser.achievements.push(achievement.id);
            appState.currentUser.points += achievement.xpReward;
            newUnlocked = true;

            // Sonido de logro
            if (appState.soundEnabled) playSound('achievement');

            // Mostrar notificación
            Swal.fire({
                title: '🏆 ¡Logro desbloqueado!',
                html: `<strong>${achievement.name}</strong><br>${achievement.description}<br>+${achievement.xpReward} XP`,
                icon: 'success',
                confirmButtonColor: '#6c5ce7',
                background: '#f8faff'
            });
        }
    });

    if (newUnlocked) {
        renderAchievementBadges();
    }

    saveProgress();
    updateUI();
}

// ===== RENDERIZAR BADGES =====
function renderAchievementBadges() {
    const container = document.getElementById('achievementBadges');
    if (!container) return;
    container.innerHTML = achievements.map(ach => {
        const unlocked = appState.currentUser.achievements.includes(ach.id);
        const classes = `badge ${unlocked ? 'unlocked' : 'locked'}`;
        return `
            <div class="${classes}" title="${ach.name}">
                <i class="fas ${ach.icon}"></i>
            </div>
        `;
    }).join('');
}


// ===== REINICIAR PROGRESO =====
function resetProgress() {
    Swal.fire({
        title: '¿Reiniciar progreso?',
        text: 'Perderás todos tus puntos y logros',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, reiniciar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            appState.currentUser.points = 0;
            appState.currentUser.completedModules = [];
            appState.currentUser.achievements = [];
            appState.currentUser.streak = 0;
            appState.currentModuleId = 1;

            saveProgress();
            initializeApp();

            Swal.fire(
                '¡Reiniciado!',
                'Tu progreso ha sido reiniciado',
                'success'
            );
        }
    });
}

// ===== RENDERIZAR MARCAS DE PROGRESO =====
function renderProgressMarkers() {
    const markersContainer = document.getElementById('progressMarkers');
    if (!markersContainer) return;

    markersContainer.innerHTML = courseModules.map((_, index) => {
        const position = (index / (courseModules.length - 1)) * 100;
        return `<div class="marker" style="left: ${position}%;"></div>`;
    }).join('');
}

// ===== RENDERIZAR QUIZ =====
// ===== RENDERIZAR QUIZ =====
function renderQuiz(module) {
    const quizContainer = document.getElementById(`quiz-${module.id}`);
    if (!quizContainer) return;

    // Estado del quiz actual
    let currentQuestionIndex = 0;
    let score = 0;
    const questions = module.quiz;
    const isMultiQuestion = questions.length > 1;

    function showQuestion(index) {
        if (index >= questions.length) {
            finishQuiz();
            return;
        }

        const q = questions[index];
        let html = `
            <div class="quiz-header" style="margin-bottom: 15px; display: flex; justify-content: space-between; align-items: center;">
                <span style="font-weight: bold; color: var(--primary);">Pregunta ${index + 1}/${questions.length}</span>
                ${isMultiQuestion ? `<span class="badge" style="background: var(--light); color: var(--dark);">Puntos: ${score}</span>` : ''}
            </div>
            <p style="font-weight: bold; font-size: 1.1em; margin-bottom: 20px;">${q.question}</p>
            <div class="quiz-options">
                ${q.options.map((opt, i) => `
                    <button class="btn btn-secondary quiz-option" data-index="${i}">
                        ${opt}
                    </button>
                `).join('')}
            </div>
            <div class="quiz-result" id="quiz-result-${module.id}" style="margin-top: 20px;"></div>
        `;

        quizContainer.innerHTML = html;

        // Event delegation
        quizContainer.querySelectorAll('.quiz-option').forEach(btn => {
            btn.addEventListener('click', () => handleAnswer(parseInt(btn.getAttribute('data-index')), q.correct));
        });
    }

    function handleAnswer(selectedIndex, correctIndex) {
        const resultEl = document.getElementById(`quiz-result-${module.id}`);
        const options = quizContainer.querySelectorAll('.quiz-option');

        // Deshabilitar botones
        options.forEach(btn => {
            btn.disabled = true;
            if (parseInt(btn.getAttribute('data-index')) === correctIndex) {
                btn.classList.remove('btn-secondary');
                btn.style.backgroundColor = 'var(--success)';
                btn.style.color = 'white';
            } else if (parseInt(btn.getAttribute('data-index')) === selectedIndex) {
                btn.classList.remove('btn-secondary');
                btn.style.backgroundColor = 'var(--danger)';
                btn.style.color = 'white';
            }
        });

        if (selectedIndex === correctIndex) {
            score++;
            if (appState.soundEnabled) playSound('success');
            resultEl.innerHTML = `<span style="color: var(--success); font-weight:bold;">✅ ¡Correcto!</span>`;
        } else {
            if (appState.soundEnabled) playSound('error');
            resultEl.innerHTML = `<span style="color: var(--danger); font-weight:bold;">❌ Incorrecto</span>`;
        }

        // Siguiente pregunta después de una pausa
        setTimeout(() => {
            currentQuestionIndex++;
            showQuestion(currentQuestionIndex);
        }, 1500);
    }

    function finishQuiz() {
        // Cálculo de aprobación (70%)
        const percentage = (score / questions.length) * 100;
        const passed = percentage >= 70;

        let message = '';
        let icon = '';

        if (passed) {
            message = `¡Felicidades! Has aprobado con ${score}/${questions.length} (${percentage}%)`;
            icon = '🏆';
            if (appState.soundEnabled) playSound('achievement');

            // Otorgar recompensas si es nuevo
            if (!appState.currentUser.completedModules.includes(module.id)) {
                appState.currentUser.points += module.xp;
                appState.currentUser.completedModules.push(module.id);
                saveProgress();
                updateUI();
                renderModules();
                checkAchievements();
            }
        } else {
            message = `Has obtenido ${score}/${questions.length}. Necesitas 70% para aprobar.`;
            icon = '💪';
        }

        quizContainer.innerHTML = `
            <div style="text-align: center; padding: 20px; background: var(--bg-color); border-radius: 15px;">
                <div style="font-size: 50px; margin-bottom: 10px;">${icon}</div>
                <h3 style="margin-bottom: 10px;">${passed ? '¡Prueba Superada!' : '¡Sigue Intentando!'}</h3>
                <p style="margin-bottom: 20px;">${message}</p>
                <button class="btn btn-primary" id="retry-quiz-${module.id}">
                    ${passed ? 'Repasar' : 'Intentar de Nuevo'}
                </button>
            </div>
        `;

        document.getElementById(`retry-quiz-${module.id}`).addEventListener('click', () => {
            currentQuestionIndex = 0;
            score = 0;
            showQuestion(0);
        });
    }

    // Iniciar
    showQuestion(0);
}

// ===== CONFIGURAR EVENTOS =====
function setupEventListeners() {
    // Tecla Enter para ejecutar código
    document.addEventListener('keydown', function (e) {
        if (e.ctrlKey && e.key === 'Enter') {
            const activeElement = document.activeElement;
            if (activeElement.classList.contains('code-textarea')) {
                // Ejecutar el ejercicio actual
                const id = activeElement.id;
                const parts = id.split('-');
                if (parts.length === 3) {
                    runExercise(parseInt(parts[1]), parseInt(parts[2]));
                }
            }
        }
    });
}

// ===== REPRODUCIR SONIDO =====
function playSound(type) {
    if (!appState.soundEnabled) return;
    switch (type) {
        case 'success':
            console.log('🔔 sonido de éxito');
            break;
        case 'error':
            console.log('⚠️ sonido de error');
            break;
        case 'achievement':
            // breve tono musical usando Web Audio API
            try {
                const ctx = new (window.AudioContext || window.webkitAudioContext)();
                const o = ctx.createOscillator();
                const g = ctx.createGain();
                o.type = 'sine';
                o.frequency.setValueAtTime(880, ctx.currentTime); // La5
                o.connect(g);
                g.connect(ctx.destination);
                g.gain.setValueAtTime(0.1, ctx.currentTime);
                o.start();
                o.stop(ctx.currentTime + 0.2);
            } catch (e) {
                console.log('🔊 logro desbloqueado (no audio)');
            }
            break;
        default:
            console.log('🔊 sonido', type);
    }
}


// ===== EXPORTAR FUNCIONES GLOBALES =====
window.loadModule = loadModule;
window.runExercise = runExercise;
window.showHint = showHint;
window.resetProgress = resetProgress;
window.toggleTheme = toggleTheme;
window.toggleSound = toggleSound;

// ===== TEMA Y SONIDO =====
function initializeThemeAndSound() {
    // Aplicar tema guardado
    if (appState.theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.getElementById('themeBtn').innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Aplicar estado del sonido
    updateSoundIcon();
}

function toggleTheme() {
    if (appState.theme === 'light') {
        appState.theme = 'dark';
        document.documentElement.setAttribute('data-theme', 'dark');
        document.getElementById('themeBtn').innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        appState.theme = 'light';
        document.documentElement.removeAttribute('data-theme');
        document.getElementById('themeBtn').innerHTML = '<i class="fas fa-moon"></i>';
    }
    localStorage.setItem('pythonTheme', appState.theme);
}

function toggleSound() {
    appState.soundEnabled = !appState.soundEnabled;
    localStorage.setItem('pythonSound', appState.soundEnabled);
    updateSoundIcon();

    // Feedback sonoro
    if (appState.soundEnabled) {
        playSound('success');
    }
}

function updateSoundIcon() {
    const btn = document.getElementById('soundBtn');
    if (appState.soundEnabled) {
        btn.innerHTML = '<i class="fas fa-volume-up"></i>';
        btn.classList.remove('muted');
    } else {
        btn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        btn.classList.add('muted');
    }
}