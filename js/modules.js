// ============================================
// MÓDULOS DEL CURSO - PYTHON ADVENTURE
// Prof. Luz Eliana Martinez Ramos
// ============================================

const courseModules = [
    {
        id: 1,
        title: "¡Python te saluda!",
        icon: "🐣",
        level: "Principiante",
        duration: "10 min",
        xp: 100,
        concept: {
            title: "¿Qué es Python?",
            emoji: "🤔",
            description: "Python es como un amigo súper inteligente que entiende instrucciones. Es un lenguaje de programación creado por Guido van Rossum, ¡y es famoso por ser fácil y divertido!",
            funFact: "¿Sabías que Python se llama así por los Monty Python? ¡No por la serpiente! 🐍"
        },
        explanation: {
            text: "La función print() es como un robot mensajero. Todo lo que le pongas entre paréntesis, lo mostrará en pantalla.",
            example: '# Mi primer programa\nprint("¡Hola, mundo!")  # Esto mostrará: ¡Hola, mundo!\nprint("Python es genial")  # Otro mensaje',
            tips: [
                "Las comillas pueden ser simples ' ' o dobles \" \"",
                "Todo después de # es un comentario (Python lo ignora)",
                "print() puede mostrar números sin comillas"
            ]
        },
        exercises: [
            {
                id: 1,
                title: "¡Tu primer saludo!",
                description: "Escribe un programa que muestre '¡Python mola mucho!'",
                hint: "Usa la función print() y no olvides las comillas para el texto.",
                solution: "print('¡Python mola mucho!')",
                test: (code) => {
                    const clean = code.toLowerCase().replace(/\s+/g, '');
                    return clean.includes("print('¡pythonmolamucho!')") ||
                        clean.includes('print("¡pythonmolamucho!")');
                }
            },
            {
                id: 2,
                title: "Múltiples mensajes",
                description: "Usa dos print() para mostrar tu nombre y tu edad en líneas separadas",
                hint: "Usa dos funciones print(), una para cada línea.",
                solution: "print('Ana')\nprint(15)",
                test: (code) => {
                    const lines = code.split('\n').filter(l => l.trim());
                    return lines.length >= 2 &&
                        lines.every(l => l.includes('print'));
                }
            }
        ],
        quiz: [
            {
                question: "¿Qué hace print()?",
                options: [
                    "Calcula matemáticas",
                    "Muestra texto en pantalla",
                    "Crea una variable",
                    "Guarda un archivo"
                ],
                correct: 1
            }
        ]
    },
    {
        id: 2,
        title: "Variables: Cajas Mágicas",
        icon: "📦",
        level: "Principiante",
        duration: "15 min",
        xp: 150,
        concept: {
            title: "Guardando información",
            emoji: "🎁",
            description: "Las variables son como cajas donde guardas tus tesoros digitales. Cada caja tiene un nombre único y puede contener diferentes tipos de información.",
            funFact: "El signo '=' en programación significa 'asignación', no es como en matemáticas. ¡Es como poner algo dentro de una caja! 📦"
        },
        explanation: {
            text: "Para crear una variable, solo necesitas inventar un nombre y usar el signo =",
            example: '# Variables de texto (strings)\nnombre = "Lucas"\nmascota = "Rex"\n\n# Variables numéricas\nedad = 12\nestatura = 1.45\n\n# Variables booleanas (Verdadero/Falso)\nes_estudiante = True\nle_gusta_python = True',
            tips: [
                "Los nombres no pueden tener espacios (usa guión bajo: mi_variable)",
                "No uses palabras especiales de Python (if, for, while, etc)",
                "¡Los nombres deben ser descriptivos!"
            ]
        },
        exercises: [
            {
                id: 1,
                title: "Crea tus primeras variables",
                description: "Crea una variable llamada 'comida_favorita' con tu comida preferida, y otra llamada 'veces_semana' con cuántas veces la comes",
                hint: "Recuerda: nombre_variable = 'valor'. Usa guiones bajos para espacios.",
                solution: "comida_favorita = 'pizza'\nveces_semana = 2",
                test: (code) => {
                    return code.includes('comida_favorita') &&
                        code.includes('veces_semana') &&
                        code.includes('=');
                }
            },
            {
                id: 2,
                title: "Operaciones con variables",
                description: "Crea dos variables con números, súmalas y muestra el resultado",
                hint: "Crea dos variables con números y luego imprime su suma con el operador +.",
                solution: "a = 5\nb = 3\nprint(a + b)",
                test: (code) => {
                    return code.includes('print') &&
                        (code.includes('+') || code.includes('suma'));
                }
            }
        ],
        quiz: [
            {
                question: "¿Qué signo se usa para asignar un valor a una variable?",
                options: [
                    "->",
                    "=",
                    "==",
                    ":"
                ],
                correct: 1
            }
        ]
    },
    {
        id: 3,
        title: "Input: ¡Habla con tu programa!",
        icon: "🎤",
        level: "Principiante",
        duration: "15 min",
        xp: 150,
        concept: {
            title: "Haciendo preguntas",
            emoji: "❓",
            description: "input() es como hacerle una pregunta a alguien. El programa espera pacientemente a que escribas algo y luego usa esa información.",
            funFact: "input() siempre devuelve texto. Si quieres números, debes convertirlos con int() o float() 🎮"
        },
        explanation: {
            text: "input() muestra un mensaje y guarda lo que el usuario escribe",
            example: '# Preguntando datos\nnombre = input("¿Cómo te llamas? ")\nedad = input("¿Cuántos años tienes? ")\n\nprint(f"Hola {nombre}, tienes {edad} años")',
            tips: [
                "Siempre guarda el resultado de input() en una variable",
                "Puedes poner espacios en el mensaje para que se vea mejor",
                "Usa int(input()) si necesitas un número para operaciones"
            ]
        },
        exercises: [
            {
                id: 1,
                title: "Encuesta personal",
                description: "Pregunta al usuario su color favorito y su animal favorito, luego muestra un mensaje con ambos",
                hint: "Usa input() dos veces para guardar las respuestas y luego print() para mostrarlas.",
                solution: "color = input('Color favorito: ')\nanimal = input('Animal favorito: ')\nprint(f'Te gusta el {color} y los {animal}')",
                test: (code) => {
                    return code.includes('input') &&
                        code.includes('print') &&
                        code.split('input').length >= 3;
                }
            },
            {
                id: 2,
                title: "Calculadora de edad",
                description: "Pregunta el año de nacimiento y calcula la edad aproximada",
                hint: "Recuerda convertir el input a número usando int() antes de restar.",
                solution: "año = int(input('¿En qué año naciste? '))\nedad = 2026 - año\nprint(f'Tienes {edad} años')",
                test: (code) => {
                    return code.includes('int(input') &&
                        code.includes('2026') &&
                        code.includes('print');
                }
            }
        ],
        quiz: [
            {
                question: "¿Qué tipo de dato devuelve siempre la función input()?",
                options: [
                    "Número (int)",
                    "Texto (string)",
                    "Booleano",
                    "Lista"
                ],
                correct: 1
            }
        ]
    },
    {
        id: 4,
        title: "If: El Semáforo Mágico",
        icon: "🚦",
        level: "Intermedio",
        duration: "20 min",
        xp: 200,
        concept: {
            title: "Tomando decisiones",
            emoji: "🤖",
            description: "if es como un semáforo que decide qué camino tomar. Si se cumple una condición, hace algo; si no, hace otra cosa.",
            funFact: "Los programadores toman decisiones todo el día. ¡Un programa sin if es como un robot sin cerebro! 🧠"
        },
        explanation: {
            text: "La estructura if-else permite que tu programa reaccione de manera diferente según las circunstancias",
            example: 'edad = 15\n\nif edad >= 18:\n    print("Eres mayor de edad")\n    print("¡Puedes votar!")\nelse:\n    print("Eres menor de edad")\n    print("Disfruta tu juventud")',
            tips: [
                "No olvides los dos puntos (:) después de if y else",
                "El código dentro del if debe tener sangría (4 espacios o tab)",
                "Puedes usar elif para múltiples condiciones"
            ]
        },
        exercises: [
            {
                id: 1,
                title: "¿Eres mayor de 12?",
                description: "Pregunta la edad y di si es mayor o menor de 12 años",
                hint: "Usa if para comprobar si es mayor a 12 y else para el caso contrario. ¡Cuidado con la sangría!",
                solution: "edad = int(input('Edad: '))\nif edad > 12:\n    print('Mayor de 12')\nelse:\n    print('Menor o igual a 12')",
                test: (code) => {
                    return code.includes('if') &&
                        code.includes('else') &&
                        code.includes('> 12');
                }
            },
            {
                id: 2,
                title: "¿Aprobado o reprobado?",
                description: "Pregunta una calificación (0-100) y muestra 'Aprobado' si es >= 60, 'Reprobado' si es menor",
                hint: "Compara la nota con 60 usando >=. Recuerda los dos puntos al final de if y else.",
                solution: "nota = int(input('Tu calificación: '))\nif nota >= 60:\n    print('Aprobado')\nelse:\n    print('Reprobado')",
                test: (code) => {
                    return code.includes('if') &&
                        code.includes('>= 60');
                }
            }
        ],
        quiz: [
            {
                question: "¿Qué palabra clave se usa para cuando la condición del if NO se cumple?",
                options: [
                    "then",
                    "finish",
                    "else",
                    "stop"
                ],
                correct: 2
            }
        ]
    },
    {
        id: 5,
        title: "Bucles: Repite conmigo",
        icon: "🔄",
        level: "Intermedio",
        duration: "20 min",
        xp: 200,
        concept: {
            title: "La magia de repetir",
            emoji: "🪄",
            description: "Los bucles for y while son como poner una canción en repetición. ¡Hacen que tu computadora trabaje sin cansarse!",
            funFact: "Un programador perezoso usa bucles. ¿Por qué escribir 1000 print() si puedes escribir 3 líneas con un bucle? 😉"
        },
        explanation: {
            text: "for se usa cuando sabes cuántas veces repetir, while cuando repites hasta que algo cambie",
            example: '# For: repite 5 veces\nfor i in range(5):\n    print("Python es genial!")\n\n# While: repite mientras se cumpla\ncontador = 0\nwhile contador < 5:\n    print("Vuelta:", contador)\n    contador = contador + 1',
            tips: [
                "range(5) da: 0,1,2,3,4 (5 números)",
                "range(1,6) da: 1,2,3,4,5",
                "¡Cuidado! while puede repetir infinitamente si olvidas cambiar la condición"
            ]
        },
        exercises: [
            {
                id: 1,
                title: "Tabla de multiplicar",
                description: "Usa un bucle for para mostrar la tabla del 5 (5x1, 5x2, ..., 5x10)",
                hint: "Usa un bucle for con range(1, 11) para iterar del 1 al 10.",
                solution: "for i in range(1,11):\n    print(f'5 x {i} = {5*i}')",
                test: (code) => {
                    return code.includes('for') &&
                        code.includes('range') &&
                        code.includes('5*');
                }
            },
            {
                id: 2,
                title: "Cuenta regresiva",
                description: "Usa un bucle while para contar del 10 al 1",
                hint: "Usa while num > 0 y recuerda restar 1 a la variable en cada vuelta.",
                solution: "num = 10\nwhile num > 0:\n    print(num)\n    num = num - 1\nprint('¡Despegue!')",
                test: (code) => {
                    return code.includes('while') &&
                        code.includes('num') &&
                        code.includes('= num - 1');
                }
            }
        ],
        quiz: [
            {
                question: "¿Qué función crea una secuencia de números para un bucle for?",
                options: [
                    "list()",
                    "count()",
                    "sequence()",
                    "range()"
                ],
                correct: 3
            }
        ]
    },
    {
        id: 6,
        title: "Listas: Tu colección",
        icon: "📚",
        level: "Intermedio",
        duration: "20 min",
        xp: 200,
        concept: {
            title: "Agrupando cosas",
            emoji: "🗂️",
            description: "Las listas son como mochilas donde puedes guardar múltiples items. ¡Puedes agregar, quitar y ordenar tus cosas!",
            funFact: "En Python, las listas pueden tener diferentes tipos de datos mezclados: números, texto, ¡hasta otras listas! 🎒"
        },
        explanation: {
            text: "Las listas se crean con corchetes [] y puedes acceder a cada elemento por su posición (índice)",
            example: '# Creando listas\namigos = ["Ana", "Carlos", "María"]\nnumeros = [1,2,3,4,5]\nmezcla = ["Hola", 42, True, 3.14]\n\n# Accediendo a elementos\nprint(amigos[0])  # Ana\nprint(amigos[-1]) # María (último)\n\n# Modificando\namigos.append("Luis")  # Agregar\namigos[1] = "Pedro"   # Cambiar',
            tips: [
                "Los índices empiezan en 0 (¡importante!)",
                "len(lista) te da la cantidad de elementos",
                "Puedes unir listas con +"
            ]
        },
        exercises: [
            {
                id: 1,
                title: "Mi playlist",
                description: "Crea una lista con tus 3 canciones favoritas y muestra la primera",
                hint: "Crea la lista con corchetes [] y accede al primero con el índice [0].",
                solution: "canciones = ['Bohemian Rhapsody', 'Imagine', 'Billie Jean']\nprint(canciones[0])",
                test: (code) => {
                    return code.includes('[') &&
                        code.includes(']') &&
                        code.includes('[0]');
                }
            },
            {
                id: 2,
                title: "Agregando invitados",
                description: "Crea una lista de invitados vacía y agrega 3 nombres usando append()",
                hint: "Empieza con una lista vacía [] y usa .append() para agregar cada nombre.",
                solution: "invitados = []\ninvitados.append('Ana')\ninvitados.append('Luis')\ninvitados.append('Mía')\nprint(invitados)",
                test: (code) => {
                    return code.includes('append') &&
                        code.includes('[]');
                }
            }
        ],
        quiz: [
            {
                question: "¿Cuál es el índice del PRIMER elemento de una lista?",
                options: [
                    "1",
                    "0",
                    "-1",
                    "A"
                ],
                correct: 1
            }
        ]
    },
    {
        id: 7,
        title: "Funciones: Tus superpoderes",
        icon: "⚡",
        level: "Avanzado",
        duration: "25 min",
        xp: 250,
        concept: {
            title: "Creando tus propios comandos",
            emoji: "🦸",
            description: "Las funciones son como crear tu propio superpoder. Agrupas código que hace algo específico y puedes usarlo cuando quieras.",
            funFact: "¡Python tiene más de 70 funciones integradas, pero tú puedes crear infinitas más! 🦸‍♂️"
        },
        explanation: {
            text: "def es la palabra mágica para crear funciones. Luego les das un nombre y paréntesis ()",
            example: '# Definiendo una función\ndef saludar(nombre):\n    """Esta función saluda a alguien"""\n    print(f"Hola {nombre}!")\n\n# Usando la función\nsaludar("Ana")  # Hola Ana!\nsaludar("Carlos")  # Hola Carlos!\n\n# Función que devuelve un valor\ndef sumar(a, b):\n    return a + b\n\nresultado = sumar(5, 3)\nprint(resultado)  # 8',
            tips: [
                "Usa nombres descriptivos para tus funciones",
                "return devuelve un valor, print solo muestra",
                "Los parámetros son opcionales",
                "Los docstrings ('''texto''') explican qué hace la función"
            ]
        },
        exercises: [
            {
                id: 1,
                title: "Tu primera función",
                description: "Crea una función llamada 'cantar' que muestre 'La la la'",
                hint: "Define la función con def y luego llámala escribiendo su nombre con paréntesis.",
                solution: "def cantar():\n    print('La la la')\n\ncantar()",
                test: (code) => {
                    return code.includes('def cantar') &&
                        code.includes('print');
                }
            },
            {
                id: 2,
                title: "Calculadora personal",
                description: "Crea una función 'multiplicar' que reciba dos números y muestre el resultado",
                hint: "Define la función aceptando dos parámetros y muestra su multiplicación dentro.",
                solution: "def multiplicar(a, b):\n    print(a * b)\n\nmultiplicar(4, 5)",
                test: (code) => {
                    return code.includes('def multiplicar') &&
                        code.includes('*') &&
                        code.includes('print');
                }
            }
        ],
        quiz: [
            {
                question: "¿Qué palabra clave se usa para devolver un valor en una función?",
                options: [
                    "give",
                    "send",
                    "return",
                    "output"
                ],
                correct: 2
            }
        ]
    },
    {
        id: 8,
        title: "Diccionarios: Agenda digital",
        icon: "📖",
        level: "Avanzado",
        duration: "25 min",
        xp: 250,
        concept: {
            title: "Pares de información",
            emoji: "🔑",
            description: "Los diccionarios guardan pares de clave:valor. Como una agenda de contactos: buscas por el nombre (clave) y obtienes el número (valor)",
            funFact: "En otros lenguajes se llaman 'mapas' o 'arrays asociativos'. ¡Pero Python los llama diccionarios por los diccionarios reales! 📕"
        },
        explanation: {
            text: "Los diccionarios usan llaves {} y pares clave: valor",
            example: '# Creando un diccionario\npersona = {\n    "nombre": "Ana",\n    "edad": 15,\n    "ciudad": "Madrid",\n    "hobbies": ["leer", "dibujar", "python"]\n}\n\n# Accediendo a valores\nprint(persona["nombre"])  # Ana\nprint(persona["hobbies"][0])  # leer\n\n# Modificando\npersona["edad"] = 16\npersona["color_fav"] = "azul"  # Agregar nuevo',
            tips: [
                "Las claves deben ser únicas (como los nombres en tu agenda)",
                "Puedes usar strings, números o booleanos como claves",
                ".keys() te da todas las claves, .values() los valores"
            ]
        },
        exercises: [
            {
                id: 1,
                title: "Mi perfil",
                description: "Crea un diccionario 'yo' con tu nombre, edad y ciudad",
                hint: "Usa llaves {} y separa clave: valor con dos puntos.",
                solution: "yo = {'nombre': 'Ana', 'edad': 15, 'ciudad': 'Bogotá'}\nprint(yo)",
                test: (code) => {
                    return code.includes('{') &&
                        code.includes('nombre') &&
                        code.includes('edad');
                }
            },
            {
                id: 2,
                title: "Actualizando datos",
                description: "Al diccionario anterior, agrega tu comida favorita y cambia la ciudad",
                hint: "Para agregar o cambiar valores, usa diccionario['clave'] = nuevo_valor.",
                solution: "yo = {'nombre': 'Ana', 'edad': 15, 'ciudad': 'Bogotá'}\nyo['comida_fav'] = 'pizza'\nyo['ciudad'] = 'Medellín'\nprint(yo)",
                test: (code) => {
                    return code.includes('comida_fav') &&
                        code.includes('ciudad') &&
                        code.includes('=');
                }
            }
        ],
        quiz: [
            {
                question: "¿Cómo se llaman los dos elementos que forman un par en un diccionario?",
                options: [
                    "Llave y Puerta",
                    "Clave y Valor",
                    "Índice y Contenido",
                    "Nombre y Apellido"
                ],
                correct: 1
            }
        ]
    },
    {
        id: 9,
        title: "Proyecto Final: Mini Juego",
        icon: "🎮",
        level: "Experto",
        duration: "30 min",
        xp: 300,
        concept: {
            title: "¡Todo junto!",
            emoji: "🏆",
            description: "Es momento de usar todo lo aprendido. Vamos a crear un juego de adivinanza donde el programa piensa un número y tú debes adivinarlo.",
            funFact: "¡Este es el primer tipo de juego que muchos programadores crean! ¿Sabías que el primer videojuego fue hecho en 1958? 🕹️"
        },
        explanation: {
            text: "Vamos a combinar input, if, while y random para crear nuestro juego",
            example: 'import random\n\nnumero_secreto = random.randint(1, 10)\nintentos = 0\n\nprint("🎮 ¡Adivina el número!")\n\nwhile True:\n    intento = int(input("Tu número (1-10): "))\n    intentos += 1\n    \n    if intento == numero_secreto:\n        print(f"🎉 ¡Correcto! Lo lograste en {intentos} intentos")\n        break\n    elif intento < numero_secreto:\n        print("📈 Más alto...")\n    else:\n        print("📉 Más bajo...")',
            tips: [
                "import random trae la biblioteca de números aleatorios",
                "randint(a,b) da un número entre a y b",
                "break sale del bucle",
                "Puedes añadir un límite de intentos"
            ]
        },
        exercises: [
            {
                id: 1,
                title: "Adivina el número",
                description: "Crea un juego donde el programa elige un número del 1 al 5 y tú lo adivinas. ¡Debes dar pistas!",
                hint: "Importa random, genera el número secreto y usa un bucle while para pedir intentos.",
                solution: "import random\nsecreto = random.randint(1,5)\nwhile True:\n    n = int(input('Número: '))\n    if n == secreto:\n        print('¡Ganaste!')\n        break\n    else:\n        print('¡No era ese!')",
                test: (code) => {
                    return code.includes('random') &&
                        code.includes('while') &&
                        code.includes('break');
                }
            },
            {
                id: 2,
                title: "Reto: Puntajes",
                description: "Mejora el juego: cuenta los intentos y muestra un mensaje según cuántos intentos tomó",
                hint: "Inicializa un contador en 0 y súmale 1 en cada intento. Al final verifica su valor.",
                solution: "import random\nsecreto = random.randint(1,5)\nintentos = 0\nwhile True:\n    n = int(input('Número: '))\n    intentos += 1\n    if n == secreto:\n        print(f'¡Ganaste en {intentos} intentos!')\n        break",
                test: (code) => {
                    return code.includes('intentos') &&
                        code.includes('+= 1') &&
                        code.includes('f');
                }
            }
        ],
        quiz: [
            {
                question: "¿Qué librería usamos para generar números aleatorios?",
                options: [
                    "math",
                    "random",
                    "numbers",
                    "chance"
                ],
                correct: 1
            }
        ]
    },
    {
        id: 10,
        title: "Desafío Final: Gran Maestro",
        icon: "🎓",
        level: "Experto",
        duration: "45 min",
        xp: 1000,
        concept: {
            title: "La Prueba Final",
            emoji: "🏆",
            description: "Has viajado lejos, joven padawan del código. Es hora de demostrar todo lo que has aprendido para convertirte en un verdadero Maestro Python.",
            funFact: "En la antigüedad, los programadores escribían código en tarjetas perforadas. ¡Tú tienes suerte de tener pantallas! 🖥️"
        },
        explanation: {
            text: "Este módulo es diferente. No hay explicación, solo una prueba de tus habilidades. Responde correctamente para graduarte.",
            example: "# Tu código aquí\n# ¡Buena suerte!",
            tips: [
                "Lee bien cada pregunta",
                "Confía en lo que has aprendido",
                "¡Tú puedes!"
            ]
        },
        exercises: [],
        quiz: [
            {
                question: "¿Cómo se imprime 'Hola' en la consola?",
                options: ["echo 'Hola'", "print('Hola')", "console.log('Hola')", "write('Hola')"],
                correct: 1
            },
            {
                question: "¿Cuál es una variable válida en Python?",
                options: ["2nombre", "mi-variable", "mi_variable", "for"],
                correct: 2
            },
            {
                question: "¿Para qué sirve la función input()?",
                options: ["Para mostrar texto", "Para recibir datos del usuario", "Para sumar números", "Para borrar la pantalla"],
                correct: 1
            },
            {
                question: "¿Qué tipo de dato devuelve type(5)?",
                options: ["float", "str", "int", "bool"],
                correct: 2
            },
            {
                question: "¿Qué hace 'if x > 5:'?",
                options: ["Repite 5 veces", "Ejecuta si x es mayor a 5", "Ejecuta si x es menor a 5", "Define una función"],
                correct: 1
            },
            {
                question: "¿Cómo empieza un bucle que repite 5 veces?",
                options: ["for i in range(5):", "repeat 5 times:", "loop 5:", "while 5:"],
                correct: 0
            },
            {
                question: "¿Cuándo termina un bucle while?",
                options: ["Nunca", "Cuando la condición es Falsa", "Cuando la condición es Verdadera", "Después de 10 vueltas"],
                correct: 1
            },
            {
                question: "¿Cómo agregas el elemento 'x' a una lista llamada L?",
                options: ["L.add('x')", "L.push('x')", "L.append('x')", "L.plus('x')"],
                correct: 2
            },
            {
                question: "¿Qué palabra clave se usa para definir una función?",
                options: ["function", "def", "func", "define"],
                correct: 1
            },
            {
                question: "¿Cómo accedes al valor de la clave 'nombre' en el diccionario 'dic'?",
                options: ["dic('nombre')", "dic.nombre", "dic['nombre']", "dic{nombre}"],
                correct: 2
            }
        ]
    }
];

// Logros y medallas
const achievements = [
    {
        id: 1,
        name: "Primer Código",
        description: "¡Escribiste tu primer programa en Python!",
        icon: "fa-code",
        xpReward: 50,
        condition: (completed) => completed.includes(1)
    },
    {
        id: 2,
        name: "Variable Master",
        description: "Dominas el arte de guardar información",
        icon: "fa-cube",
        xpReward: 75,
        condition: (completed) => completed.includes(2)
    },
    {
        id: 3,
        name: "Loop Hero",
        description: "Repites código como un profesional",
        icon: "fa-redo",
        xpReward: 100,
        condition: (completed) => completed.includes(5)
    },
    {
        id: 4,
        name: "Function Wizarding",
        description: "¡Creaste tus propios superpoderes!",
        icon: "fa-magic",
        xpReward: 125,
        condition: (completed) => completed.includes(7)
    },
    {
        id: 5,
        name: "Game Developer",
        description: "Creaste tu primer juego en Python",
        icon: "fa-gamepad",
        xpReward: 150,
        condition: (completed) => completed.includes(9)
    },
    {
        id: 6,
        name: "Python Sensei",
        description: "¡Completaste todo el curso!",
        icon: "fa-crown",
        xpReward: 500,
        condition: (completed) => completed.length === 9
    }
];

// Exportar datos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { courseModules, achievements };
}

