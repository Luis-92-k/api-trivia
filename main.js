function getQuestions() {
    const questionsQuantity = document.getElementById('questions-number').value
    const questionsCategory = document.getElementById('questions-category').value
    const questionsType = document.getElementById('questions-type').value
    const questionsDifficulty = document.getElementById('questions-difficulty').value
    
    fetch(`https://opentdb.com/api.php?amount=${questionsQuantity}&category=${questionsCategory}&difficulty=${questionsDifficulty}&type=${questionsType}`)
        .then(response => response.json())
        .then(data => printCards(data.results))
}

function printCards(questions) {
    const container = document.getElementById('container-cards');
    container.innerHTML = '';
    questions.forEach((question, index) => {
        const card = returnCardHTML(question, index);
        container.innerHTML += card;
    });
    // poner las preguntas en mi página web
}

function returnCardHTML(q, indexCard) {
    const card = `<div class="card">
                    <div class="card-body">
                    <h5 class="card-title">${q.category}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${q.question}</h6>
                        ${returnAnswersHTML(q.correct_answer, q.incorrect_answers, indexCard)}           
                    </div>
                </div>`
    return card;
}


function returnAnswersHTML(correct, incorrects, indexcard) {
   
    incorrects.push(correct)
    let incorrectHTML = '';
    incorrects.forEach((incorrect, index) => {
        incorrectHTML += `<div class="form-check">
                            <input class="form-check-input" type="radio" name="exampleRadios" id="answer-${indexcard}-${index}" value="option1" checked>
                            <label class="form-check-label" for="answer-${indexcard}-${index}">
                            ${incorrect}
                            </label>
                        </div>`;
    })


    return incorrectHTML;
}

function getCategories() {
    fetch(`https://opentdb.com/api_category.php`)
        .then(response => response.json())
        .then(data => categoryOptions(data.trivia_categories))

}


function categoryOptions(categories) {
    const anyCategory = '<option value="">Any Category</option>';
    const options = categories.map(element => `<option value="${element.id}">${element.name}</option>`).join(" ");
    document.getElementById('questions-category').innerHTML = anyCategory + options;
}
 
getCategories();


// obtener respuestas del ususario
// comparar esas respuestas con las respuestas correctas de la api
// si las respuestas del usaurio son correctas le sumo un punto
// muestro un mensaje al usuario con su puntaje
// funtion verCalificacion() {
//     // obtenglo los radio buttons en un array
//     const elemnts = [] // aquí asumo que ya tienes este array lleno

//     // acá solo recorro el array lleno
//     elemnts.forEach(element => {
//         if(element.checked) {
//             const userAnswer = element.value
//         }
//     })
// }

// 1. generas un número entrero aleatorio entre 1 y 3 (esta va a ser la posición de la respuesta correcta) -https://www.w3schools.com/js/js_random.asp
// 2. hacemos un splice para meter en el array de respuestas incorrectas la respuesta correcta 