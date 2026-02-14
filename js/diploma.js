// ============================================
// SISTEMA DE DIPLOMAS - PYTHON ADVENTURE
// Prof. Luz Eliana Martinez Ramos
// ============================================

// Mostrar diploma
function showDiploma() {
    const modal = document.getElementById('diplomaModal');
    
    // Verificar si completó todos los módulos
    // [MODO DEMO] Comentado temporalmente para ver el diseño
    // if (appState.currentUser.completedModules.length < courseModules.length) {
    //     Swal.fire({
    //         title: '🚀 ¡Casi ahí!',
    //         text: `Te faltan ${courseModules.length - appState.currentUser.completedModules.length} módulos para obtener tu diploma`,
    //         icon: 'info',
    //         confirmButtonColor: '#6c5ce7'
    //     });
    //     return;
    // }
    
    // Configurar fecha
    document.getElementById('diplomaDate').innerHTML = new Date().toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Configurar módulos completados
    document.getElementById('modulesCompleted').innerHTML = `${appState.currentUser.completedModules.length}/${courseModules.length} módulos`;
    
    // Configurar puntos totales
    document.getElementById('totalPoints').innerHTML = `${appState.currentUser.points} puntos totales`;
    
    // Efecto de celebración
    startConfetti();
    
    // Precargar nombre si existe
    if (appState.currentUser.name) {
        document.getElementById('studentNameInput').value = appState.currentUser.name;
    }
    
    modal.style.display = 'flex';
}

// Cerrar diploma
function closeDiploma() {
    const modal = document.getElementById('diplomaModal');
    modal.style.display = 'none';
}

// Generar PDF del diploma
async function generatePDF() {
    // Verificar que se completaron todos los módulos
    if (appState.currentUser.completedModules.length < courseModules.length) {
        Swal.fire({
            title: '🚫 Diploma no disponible',
            text: `Completa todos los módulos primero. Te faltan ${courseModules.length - appState.currentUser.completedModules.length}.`,
            icon: 'error',
            confirmButtonColor: '#d33'
        });
        return;
    }
    
    const studentName = document.getElementById('studentNameInput').value;
    
    if (!studentName) {
        Swal.fire({
            title: '✏️ Ingresa tu nombre',
            text: 'Escribe tu nombre para personalizar el diploma',
            icon: 'warning',
            confirmButtonColor: '#6c5ce7'
        });
        return;
    }
    
    // Guardar nombre
    appState.currentUser.name = studentName;
    localStorage.setItem('pythonStudentName', studentName);
    
    // Mostrar cargando
    Swal.fire({
        title: '📄 Generando diploma...',
        html: 'Preparando tu mención de honor',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    try {
        await createDiplomaPDF(studentName);
        
        Swal.fire({
            title: '🎓 ¡Diploma generado!',
            text: 'Se ha descargado tu Mención de Honor',
            icon: 'success',
            confirmButtonColor: '#6c5ce7'
        });
    } catch (error) {
        console.error('Error al generar PDF:', error);
        Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al generar el diploma. Intenta de nuevo.',
            icon: 'error',
            confirmButtonColor: '#d33'
        });
    }
}

// Crear PDF del diploma
async function createDiplomaPDF(studentName) {
    const { jsPDF } = window.jspdf;
    const element = document.querySelector('.diploma-inner');
    
    // Asegurar que el elemento es visible y capturable
    // Opciones para mejorar calidad
    const options = {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
    };

    try {
        const canvas = await html2canvas(element, options);
        const imgData = canvas.toDataURL('image/png');
        
        // Crear PDF (Landscape, A4 o tamaño personalizado según el diseño)
        // El diseño parece horizontal
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4'
        });

        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        
        // Centrar verticalmente si es necesario
        const y = (pdf.internal.pageSize.getHeight() - pdfHeight) / 2;

        pdf.addImage(imgData, 'PNG', 0, y, pdfWidth, pdfHeight);
        pdf.save(`Diploma_Python_Adventure_${studentName.replace(/\s+/g, '_')}.pdf`);
        
    } catch (error) {
        throw error;
    }
}

// Efecto de Confetti
function startConfetti() {
    if (typeof confetti === 'undefined') return;
    
    var duration = 3 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function() {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        var particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}

// Compartir logro
function shareAchievement() {
    const studentName = document.getElementById('studentNameInput').value || 'Estudiante';
    
    if (navigator.share) {
        navigator.share({
            title: '¡Completé Python Adventure!',
            text: `🎓 ${studentName} ha completado el curso Python Adventure con la profe Luz Eliana Martinez Ramos`,
            url: window.location.href,
        }).catch(console.error);
    } else {
        // Fallback para pc
        Swal.fire({
            title: '🎉 ¡Felicidades!',
            html: `Has completado el curso.<br>Comparte tu logro tomando una foto al diploma.`,
            icon: 'success',
            confirmButtonColor: '#6c5ce7'
        });
    }
}

// Exportar funciones
window.showDiploma = showDiploma;
window.closeDiploma = closeDiploma;
window.generatePDF = generatePDF;
window.shareAchievement = shareAchievement;