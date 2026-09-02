import "../components/example.js";


let activity1Score = 0;
let activity2Score = 0;
let activity3Score = 0;
let activity4Score = 0;
let activity5Score = 0;
let totalScore = 0;

let values = [
    { class: ".1h", correctValue: "influence", enteredValue: "" },
    { class: ".2h", correctValue: "sympathy", enteredValue: "" },
    { class: ".3h", correctValue: "reciprocity", enteredValue: "" },
    { class: ".4h", correctValue: "activelistening", enteredValue: "" },
    { class: ".5h", correctValue: "senseofurgency", enteredValue: "" },
    { class: ".6h", correctValue: "objections", enteredValue: "" },
    { class: ".1v", correctValue: "coherence", enteredValue: "" },
    { class: ".2v", correctValue: "empathy", enteredValue: "" },
    { class: ".3v", correctValue: "resilience", enteredValue: "" },
    { class: ".4v", correctValue: "probing", enteredValue: "" },
];

let valuesFourthActivity = {
    input1: "cross sale",
    input2: "cold sale",
    input3: "warm sale",
}


let pointsConnect = {
    point1l: { x: 14, y: 12 },
    point2l: { x: 14, y: 91.5 },
    point3l: { x: 14, y: 171 },
    point4l: { x: 14, y: 250.5 },
    point5l: { x: 14, y: 330 },
    point6l: { x: 14, y: 409.5 },
    point7l: { x: 14, y: 489 },

    point1r: { x: 285, y: 12.5 },
    point2r: { x: 285, y: 91.5 },
    point3r: { x: 285, y: 171 },
    point4r: { x: 285, y: 250.5 },
    point5r: { x: 285, y: 330 },
    point6r: { x: 285, y: 409.5 },
    point7r: { x: 285, y: 489 },
}

let pointsCorrect = {

    point1l: 'point2r',
    point2l: 'point4r',
    point3l: 'point1r',
    point4l: 'point6r',
    point5l: 'point5r',
    point6l: 'point7r',
    point7l: 'point3r',

}

/* [
    { startPoint: 'point1l', endPoint: 'point2r' },
    { startPoint: 'point2l', endPoint: 'point4r' },
    { startPoint: 'point3l', endPoint: 'point1r' },
    { startPoint: 'point4l', endPoint: 'point6r' },
    { startPoint: 'point5l', endPoint: 'point5r' },
    { startPoint: 'point6l', endPoint: 'point7r' },
    { startPoint: 'point7l', endPoint: 'point3r' },

] */

$(document).ready(function () {


    let tempchance = verifyLocalStorage();
    $('#chances-number').html(tempchance + " chances")

    runIntroAnimation(); //This function runs the introduction animation

    if (verifyLocalStorage() == 1 || verifyLocalStorage() == 2) {
        //Revealing the modal with the number of attempts.
        $("#overlay-close-button").click(function () {
            $(".overlay-01").animate({ top: "120vh", opacity: 0 });

            //The #start-intro-button is only activated after closing the modal
            $("#start-intro-button").click(function () {
                $(".left-lines").animate({ left: "-35vw", opacity: 0 }, 700);
                $(".right-lines").animate({ right: "-35vw", opacity: 0 }, 700);
                $(".titles-container").css({ top: "-35vh", opacity: 0 });
                $(".logo-button-container").animate({ bottom: "-35vh", opacity: 0 }, 700);

                setTimeout(() => {
                    redirectPage("first-activity");
                    runActivityOne();
                }, 750);
            });
        });
    }



    //runActivityTwo();
    //createCrosswordGrid();
    //runActivityFour();
    //runActivityFive()

    /***************************************/
    /******  Buttons click assignment ******/
    /***************************************/



});

function runIntroAnimation() {

    $(".ball-container").css({ transform: "rotate(180deg)", opacity: 1 });

    $(".ball-container").on("transitionend", function () {
        setTimeout(() => {
            $(".ball-container").css("transform", "rotate(360deg)");
            $(".left-block").animate({ left: 0 }, 700);
            $(".right-block").animate({ right: 0 }, 700);

            setTimeout(() => {
                $(".bottom-ball").animate({ left: "-50vw", opacity: 0 }, 700);
                $(".top-ball").animate({ right: "-50vw", opacity: 0 }, 700);
                $(".left-lines").animate({ left: "6.094vw", opacity: 1 }, 700);
                $(".right-lines").animate({ right: "6.094vw", opacity: 1 }, 700);
                $(".titles-container").css({
                    top: "22vh",
                    transform: "scale(1)",
                    opacity: 1,
                });
                $(".logo-button-container").animate(
                    { bottom: "8.57vh", opacity: 1 },
                    700
                );

                setTimeout(() => {
                    $(".overlay-01").animate({ top: 0, opacity: 1 }); //Revelar el modal con el numero de intentos
                }, 2000);
            }, 700);
        }, 150);
    });
}

/**********************/
/******  ROUTER  ******/
/**********************/

function redirectPage(id) {
    let newPath = "#" + id;

    $(".left-side-face").css("opacity", "1").animate({ left: 0 }, 700);
    $(".right-side-face")
        .css("opacity", "1")
        .animate({ right: 0 }, 700, function () {
            $(
                "#intro, #first-activity, #second-activity, #third-activity, #fourth-activity, #fifth-activity, #final-section"
            ).hide();
            $(newPath).show();

            $(".overlay-02").css({ display: 'none' }).animate({ opacity: 0 }, 1)
            $(".overlay-02 main").css({ top: '120vh', opacity: 0, transform: 'rotate(-135deg)' });


        });

    setTimeout(() => {
        $(".left-side-face").animate({ left: "-50vw" }, 700);
        $(".right-side-face").animate({ right: "-50vw" }, 700);
        setTimeout(() => {
            $(".left-side-face").animate({ opacity: 0 }, 700);
            $(".right-side-face").animate({ opacity: 0 }, 700);
        }, 300);
    }, 825);
}

/*****************************/
/******  Js Activity 1  ******/
/*****************************/

function runActivityOne() {
    let answerActivity = [];
    /******  First Question  ******/
    let palabraArrastrada = null;
    let palabraAnterior = null;
    let offset = null;

    $(".drag-activity-01").draggable({
        revert: "invalid",
        cursor: "move",
        start: function (event, ui) {
            palabraArrastrada = ui.helper;
            offset = ui.offset;
            $("#drop-activity-01")
                .addClass("drop-animation")
                .removeClass("bottom-border");
            $(this).css("border", "none");
        },
        stop: function (event, ui) {
            $("#drop-activity-01")
                .removeClass("drop-animation")
                .addClass("bottom-border");
        },
    });
    $("#drop-activity-01").droppable({
        accept: ".drag-activity-01",
        drop: function (event, ui) {
            if (palabraAnterior !== null && palabraAnterior != palabraArrastrada) {
                palabraAnterior
                    .css({
                        position: "relative",
                        border: "solid var(--px1) var(--color-fuchsia)",
                    })
                    .animate({ left: "0", top: "0" });
            }
            answerActivity[0] = { answer: ui.helper.text() };
            verifyFirstActivity(answerActivity); //Check if you have already answered the questions
            palabraAnterior = palabraArrastrada;

            let containerWidth = $(this).width();
            let containerHeight = $(this).height();

            let elementWidth = ui.draggable.width();
            let elementHeight = ui.draggable.height();

            ui.draggable.animate({
                left:
                    $(this).offset().left -
                    offset.left +
                    (containerWidth / 2 - elementWidth / 2) / 4 +
                    "px",
                top:
                    $(this).offset().top -
                    offset.top +
                    (containerHeight - elementHeight) +
                    "px",
            });
        },
    });

    /******  Second Question  ******/
    let palabraArrastrada2 = null;
    let palabraAnterior2 = null;
    let offset2 = null;

    $(".drag-activity-02").draggable({
        revert: "invalid",
        cursor: "move",
        start: function (event, ui) {
            palabraArrastrada2 = ui.helper;
            offset2 = ui.offset;
            $("#drop-activity-02")
                .addClass("drop-animation")
                .removeClass("bottom-border");
            $(this).css("border", "none");
        },
        stop: function (event, ui) {
            $("#drop-activity-02")
                .removeClass("drop-animation")
                .addClass("bottom-border");
        },
    });
    $("#drop-activity-02").droppable({
        accept: ".drag-activity-02",
        drop: function (event, ui) {
            if (palabraAnterior2 !== null && palabraAnterior2 != palabraArrastrada2) {
                palabraAnterior2
                    .css({
                        position: "relative",
                        border: "solid var(--px1) var(--color-fuchsia)",
                    })
                    .animate({ left: "0", top: "0" });
            }
            answerActivity[1] = { answer: ui.helper.text() };
            verifyFirstActivity(answerActivity); //Check if you have already answered the questions
            palabraAnterior2 = palabraArrastrada2;

            let containerWidth = $(this).width();
            let containerHeight = $(this).height();

            let elementWidth = ui.draggable.width();
            let elementHeight = ui.draggable.height();

            if (ui.helper.text() == "Balance") {
                ui.draggable.animate({
                    left:
                        $(this).offset().left -
                        offset2.left +
                        (containerWidth - elementWidth) / 4 +
                        "px",
                    top:
                        $(this).offset().top -
                        offset2.top +
                        (containerHeight - elementHeight) / 4 +
                        "px",
                });
            } else {
                ui.draggable.animate({
                    left:
                        $(this).offset().left -
                        offset2.left -
                        (containerWidth - elementWidth) / 2 +
                        "px",
                    top:
                        $(this).offset().top -
                        offset2.top +
                        (containerHeight - elementHeight) / 4 +
                        "px",
                });
            }
        },
    });

    /******  Third Question  ******/
    let palabraArrastrada3 = null;
    let palabraAnterior3 = null;
    let offset3 = null;

    $(".drag-activity-03").draggable({
        revert: "invalid",
        cursor: "move",
        start: function (event, ui) {
            palabraArrastrada3 = ui.helper;
            offset3 = ui.offset;
            $("#drop-activity-03")
                .addClass("drop-animation")
                .removeClass("bottom-border");
            $(this).css("border", "none");
        },
        stop: function (event, ui) {
            $("#drop-activity-03")
                .removeClass("drop-animation")
                .addClass("bottom-border");
        },
    });
    $("#drop-activity-03").droppable({
        accept: ".drag-activity-03",
        drop: function (event, ui) {
            if (palabraAnterior3 !== null && palabraAnterior3 != palabraArrastrada3) {
                palabraAnterior3
                    .css({
                        position: "relative",
                        border: "solid var(--px1) var(--color-fuchsia)",
                    })
                    .animate({ left: "0", top: "0" });
            }
            answerActivity[2] = { answer: ui.helper.text() };
            verifyFirstActivity(answerActivity); //Check if you have already answered the questions
            palabraAnterior3 = palabraArrastrada3;

            let containerWidth = $(this).width();
            let containerHeight = $(this).height();

            let elementWidth = ui.draggable.width();
            let elementHeight = ui.draggable.height();

            if (ui.helper.text() == "Balance") {
                ui.draggable.animate({
                    left:
                        $(this).offset().left -
                        offset3.left +
                        (containerWidth - elementWidth) / 4 +
                        "px",
                    top:
                        $(this).offset().top -
                        offset3.top +
                        (containerHeight - elementHeight) / 4 +
                        "px",
                });
            } else {
                ui.draggable.animate({
                    left:
                        $(this).offset().left -
                        offset3.left -
                        (containerWidth - elementWidth) / 16 +
                        "px",
                    top:
                        $(this).offset().top -
                        offset3.top +
                        (containerHeight - elementHeight) / 4 +
                        "px",
                });
            }
        },
    });

    $("#verify-first-activity-button").click(function () {

        $("#overlay-02-close-button").click(function () {
            redirectPage("second-activity");
            runActivityTwo();
        })


        let correctAnswers = 0;

        answerActivity.forEach((element, index) => {
            if (index == 0 && element.answer == "Exchange") {
                correctAnswers++;
            } else if (index == 1 && element.answer == "Mixed polling") {
                correctAnswers++;
            } else if (index == 2 && element.answer == "Human behavior") {
                correctAnswers++;
            }
        });


        activity1Score = correctAnswers * 10;
        totalScore += correctAnswers * 10;


        $("#score").html(totalScore);
        $("#correct-number").html(correctAnswers);
        $("#incorrect-number").html(3 - correctAnswers);
        $(".overlay-02").css({ display: 'flex' }).animate({ opacity: 1 }, 1)
        $(".overlay-02 main").css({ top: 0, opacity: 1, transform: 'rotate(0)' });
    });
}

function verifyFirstActivity(answerActivity) {
    let count = 0;
    answerActivity.forEach((element) => {
        if (element.answer.length > 1) {
            count++;
        }
    });

    if (count == 3) {
        $("#verify-first-activity-button").css({ bottom: "5vh", opacity: 1 });
    } else {
        $("#verify-first-activity-button").css({ bottom: "-15vh", opacity: 0 });
    }
}


/*****************************/
/******  Js Activity 2  ******/
/*****************************/

function runActivityTwo() {

    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    const lines = []; // Array para almacenar las líneas dibujadas
    let buttonAppeared = false;

    const devicePixelRatio = window.devicePixelRatio || 1;
    canvas.width = 300 * devicePixelRatio;
    canvas.height = 500 * devicePixelRatio;
    /* canvas.style.width = "245px"; // Tamaño en CSS
    canvas.style.height = "448px"; // Tamaño en CSS */
    canvas.style.width = "12.76vw"; // Tamaño en CSS vw
    canvas.style.height = "48vh";

    // Escala de píxeles del contexto
    ctx.scale(devicePixelRatio, devicePixelRatio);


    function dibujarLinea(start, end, x1, y1, x2, y2) {

        ctx.strokeStyle = 'rgb(254,0,130)';
        ctx.lineWidth = 5;
        ctx.lineCap = "round";
        ctx.lineJoin = 'round'; // Cambiar el estilo de unión de las líneas
        ctx.lineCap = 'round'; // Cambiar el estilo de los extremos de las líneas


        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.closePath();

    }

    function borrarLinea(start, end) {


        const index = lines.findIndex(line => line.start === start || line.end === end);


        if (index !== -1) {

            let newLines = [...lines.splice(index, 1)]; // Elimina la línea del registro
            console.log(newLines)


            // Borrar el contenido del canvas y volver a dibujar las líneas restantes
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (const line of lines) {

                dibujarLinea(line.start, line.end, line.x1, line.y1, line.x2, line.y2);
            }
        }
    }

    let startPoint = '';
    let endPoint = '';

    $('.description-point').click(function () {

        if (startPoint != '') {
            let tempId = '#' + startPoint;
            $(tempId).css('background', 'white')
        }

        startPoint = $(this).attr('id')

        $(this).css('background', 'rgb(254,0,130)')

        let index = lines.findIndex(line => line.startPoint === startPoint);

        if (index !== -1) {

            lines.splice(index, 1)

            // Borrar el contenido del canvas y volver a dibujar las líneas restantes
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (const line of lines) {

                dibujarLinea(line.start, line.end, line.x1, line.y1, line.x2, line.y2);
            }
        }
        comprobarEstado()//Revelar o esconder el boton #verify
    })


    $('.term-point').click(function () {
        endPoint = $(this).attr('id')

        if (startPoint != '') {

            let tempId = '#' + startPoint;

            let index = lines.findIndex(line => line.endPoint === endPoint);

            if (index !== -1) {
                lines.splice(index, 1)

                // Borrar el contenido del canvas y volver a dibujar las líneas restantes
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                for (const line of lines) {

                    dibujarLinea(line.start, line.end, line.x1, line.y1, line.x2, line.y2);
                }
            }

            dibujarLinea(startPoint, endPoint, pointsConnect[startPoint].x, pointsConnect[startPoint].y, pointsConnect[endPoint].x, pointsConnect[endPoint].y);
            lines.push({ startPoint, endPoint, x1: pointsConnect[startPoint].x, y1: pointsConnect[startPoint].y, x2: pointsConnect[endPoint].x, y2: pointsConnect[endPoint].y });
            startPoint = ''
            $(tempId).css('background', 'white')

            comprobarEstado()//Revelar o esconder el boton #verify

        }

    })


    function comprobarEstado() {
        if (lines.length == 7) {
            $('#verify-second-activity-button').animate({ bottom: '5vh', opacity: 1 }, 1, function () { buttonAppeared = true; })
        } else {
            $('#verify-second-activity-button').animate({ bottom: '-15vh', opacity: 0 }, 1, function () { buttonAppeared = false; })
        }
    }



    $('#verify-second-activity-button').on("click", function () {



        $("#overlay-02-close-button").off("click"); //Reassign the click function of the close button of the overlay-02
        $("#overlay-02-close-button").click(function () {
            redirectPage("third-activity");
            createCrosswordGrid();
        })

        let correctAnswers = 0;

        lines.forEach((line, index) => {

            console.log({ p1: line.endPoint, p2: pointsCorrect[line.startPoint], result: (line.endPoint == pointsCorrect[line.startPoint]) })
            if (line.endPoint == pointsCorrect[line.startPoint]) {
                correctAnswers++;
            }

        });


        activity2Score = correctAnswers * 10;
        totalScore += correctAnswers * 10;
        $("#score").html(totalScore);
        $("#correct-number").html(correctAnswers);
        $("#incorrect-number").html(7 - correctAnswers);
        $(".overlay-02").css({ display: 'flex' }).animate({ opacity: 1 }, 1)
        $(".overlay-02 main").css({ top: 0, opacity: 1, transform: 'rotate(0)' });

    });






}



/*****************************/
/******  Js Activity 3  ******/
/*****************************/


function createCrosswordGrid() {
    let crosswordGrid = $("#crossword-grid");

    let matrizGrid = [
        [0, 0, 0, 0, 0, 0, 0, "1h", "1h", "1h", "1h", "1h", "1h", "1h", "1h 1v", "1h", 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "1v", 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, "2h", "2h", "2h", "2h", "2h", "2h", "2h 1v", "2h", 0],
        ["2v", 0, 0, "3v", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "1v", 0, 0],
        ["2v", 0, "3h", "3h 3v", "3h", "3h", "3h", "3h", "3h", "3h", "3h", "3h", "3h", 0, "1v", 0, 0],
        ["2v", 0, 0, "3v", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "1v", 0, 0],
        ["2v 4h", "4h", "4h", "3v 4h", "4h", "4h", "empty", "4h", "4h", "4h", "4h", "4h", "4h", "4h", "4h 1v", "4h", 0],
        ["2v", 0, 0, "3v", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "1v", 0, 0],
        ["2v", 0, 0, "3v", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "1v", 0, 0],
        ["2v", 0, 0, "3v", 0, 0, 0, 0, 0, 0, 0, "4v", 0, 0, 0, 0, 0],
        [0, "5h", "5h", " 3v 5h", "5h", "5h", "empty", "5h", "5h", "empty", "5h", "5h 4v", "5h", "5h", "5h", "5h", "5h"],
        [0, 0, 0, "3v", 0, 0, 0, 0, 0, 0, 0, "4v", 0, 0, 0, 0, 0],
        [0, 0, 0, "3v", 0, 0, 0, 0, 0, 0, 0, "4v", 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, "6h", "6h", "6h", "6h", "6h", "6h", "4v 6h", "6h", "6h", "6h", 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "4v", 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "4v", 0, 0, 0, 0, 0],
    ];

    for (let i = 0; i < matrizGrid.length; i++) {
        let tr = $("<tr>");

        for (let j = 0; j < matrizGrid[i].length; j++) {
            let td = $("<td>");

            if (matrizGrid[i][j] != 0) {
                let input = '';


                if (matrizGrid[i][j] == 'empty') {
                    td.addClass("empty")
                } else {
                    td.addClass("letter-cell");
                    input = $('<input type="text" maxlength="1">').addClass(
                        matrizGrid[i][j]
                    );
                }

                if (i == 0 || matrizGrid[i - 1][j] == 0) {
                    td.addClass("border-t");
                }
                if (i == matrizGrid.length - 1 || matrizGrid[i + 1][j] == 0) {
                    td.addClass("border-b");
                }
                if (j == 0 || matrizGrid[i][j - 1] == 0) {
                    td.addClass("border-l");
                }
                if (j == matrizGrid[i].length - 1 || matrizGrid[i][j + 1] == 0) {
                    td.addClass("border-r");
                }
                td.append(input);
            }
            tr.append(td);
        }
        crosswordGrid.append(tr);
    }


    $('.crossword-container').animate({ opacity: 1 }, 500)

    $('#verify-third-activity-button').on("click", function () {

        $("#overlay-02-close-button").off("click"); //Reassign the click function of the close button of the overlay-02
        $("#overlay-02-close-button").click(function () {
            redirectPage("fourth-activity");
            runActivityFour();
        })

        let correctAnswers = 0;

        values.forEach((item, index) => {

            let tempValues = "";

            $(item.class).each(function () {
                let inputValue = $(this).val();
                tempValues += inputValue.toLowerCase();
            });
            
            values[index].enteredValue = tempValues.toLowerCase(); //save the entered value

            console.log(values[index].enteredValue, values[index].correctValue, (values[index].enteredValue == values[index].correctValue))
            if (values[index].enteredValue == values[index].correctValue) {

                correctAnswers++;
            }

        });

        activity3Score = correctAnswers * 10;
        totalScore += correctAnswers * 10;
        $("#score").html(totalScore);
        $("#correct-number").html(correctAnswers);
        $("#incorrect-number").html(10 - correctAnswers);
        $(".overlay-02").css({ display: 'flex' }).animate({ opacity: 1 }, 1)
        $(".overlay-02 main").css({ top: 0, opacity: 1, transform: 'rotate(0)' });

    });
}



/*****************************/
/******  Js Activity 4  ******/
/*****************************/

function runActivityFour() {

    let buttonAppeared = false;

    // Crear un objeto para realizar un seguimiento de los inputs con valores escritos
    let inputStatus = {
        input1: false,
        input2: false,
        input3: false
    };

    // Agregar controladores de eventos para verificar el valor de los inputs
    $(".sale-input").on("input", function () {
        inputStatus[this.id] = $(this).val().trim() !== ""; // Verificar si tiene un valor escrito
        comprobarEstado();
    });

    function comprobarEstado() {
        // Comprobar si todos los inputs tienen valores escritos
        let allInputsFilled = Object.values(inputStatus).every(function (filled) {
            return filled;
        });

        if (allInputsFilled && buttonAppeared == false) {
            $('#verify-fourth-activity-button').animate({ bottom: '5vh', opacity: 1 }, 1, function () { buttonAppeared = true; })
        } else if (!allInputsFilled && buttonAppeared == true) {
            $('#verify-fourth-activity-button').animate({ bottom: '-15vh', opacity: 0 }, 1, function () { buttonAppeared = false; })
        }
    }

    $('#verify-fourth-activity-button').click(function () {

        $("#overlay-02-close-button").off("click"); //Reassign the click function of the close button of the overlay-02
        $("#overlay-02-close-button").click(function () {
            redirectPage("fifth-activity");
            runActivityFive();
        })

        let correctAnswers = 0;

        $('.sale-input').each(function () {
            let inputValue = $(this).val().toLowerCase().trim();

            if (inputValue == valuesFourthActivity[$(this).attr('id')]) {
                correctAnswers++;
            }

        });

        activity4Score = correctAnswers * 10;
        totalScore += correctAnswers * 10;
        $("#score").html(totalScore);
        $("#correct-number").html(correctAnswers);
        $("#incorrect-number").html(3 - correctAnswers);
        $(".overlay-02").css({ display: 'flex' }).animate({ opacity: 1 }, 1)
        $(".overlay-02 main").css({ top: 0, opacity: 1, transform: 'rotate(0)' });
    })


}


/*****************************/
/******  Js Activity 5  ******/
/*****************************/

function runActivityFive() {
    // Habilita el arrastre de elementos
    $(".li-drag").draggable({
        revert: "invalid", // Para que los elementos regresen si no se sueltan en un área válida
        cursor: "move",
    });

    $(".drop-area").droppable({
        accept: ".li-drag", // Acepta solo elementos con la clase "li-drag"
        drop: function (event, ui) {
            // Modifica la posición antes de agregar el elemento al área
            ui.helper.css({
                left: 0, // Nueva posición izquierda
                top: 0,  // Nueva posición superior
            });
            // Agrega el elemento arrastrado al área
            $(this).append(ui.helper);


            comprobarEstado()
        },
    });


    function comprobarEstado() {

        if ($('.drag-list').find("li").length === 0) {
            $('.verify-box').css({ opacity: 1, top: 'calc(50% - 12.40vh/2)' })
        } else {
            $('.verify-box').css({ opacity: 0, top: '120vh' })
        }
    }

    $('#verify-fifth-activity-button').click(function () {

        $("#overlay-02-close-button").off("click"); //Reassign the click function of the close button of the overlay-02
        $("#overlay-02-close-button").click(function () {

            $("#activity1-points").html(activity1Score + " Pts.")
            $("#activity2-points").html(activity2Score + " Pts.")
            $("#activity3-points").html(activity3Score + " Pts.")
            $("#activity4-points").html(activity4Score + " Pts.")
            $("#activity5-points").html(activity5Score + " Pts.")
            $("#total-score").html("TOTAL SCORE: " + totalScore)

            redirectPage("final-section");

            $("#try-again").click(function () {
                subtractOne();
                location.reload();
            })

            $("#exit").click(function() {
                window.close();
            })

        })

        let correctAnswers = 0;


        if ($("#drop-area-01").find('.tl').length > 0) {
            correctAnswers += $("#drop-area-01").find('.tl').length;
        }

        if ($("#drop-area-02").find('.tr').length > 0) {
            correctAnswers += $("#drop-area-02").find('.tr').length;
        }

        if ($("#drop-area-03").find('.bl').length > 0) {
            correctAnswers += $("#drop-area-03").find('.bl').length;
        }

        if ($("#drop-area-04").find('.br').length > 0) {
            correctAnswers += $("#drop-area-04").find('.br').length;
        }

        activity5Score = correctAnswers * 10;
        totalScore += correctAnswers * 10;
        $("#score").html(totalScore);
        $("#correct-number").html(correctAnswers);
        $("#incorrect-number").html(20 - correctAnswers);
        $(".overlay-02").css({ display: 'flex' }).animate({ opacity: 1 }, 1)
        $(".overlay-02 main").css({ top: 0, opacity: 1, transform: 'rotate(0)' });
    })

}





function verifyLocalStorage() {
    let chancesSalesMaster = localStorage.getItem('chances_salesMaster');
    if (!chancesSalesMaster) {
        chancesSalesMaster = 2;
        localStorage.setItem('chances_salesMaster', chancesSalesMaster);
    }
    return chancesSalesMaster;
}




function subtractOne() {

    let chancesSalesMaster = localStorage.getItem('chances_salesMaster');

    chancesSalesMaster = parseInt(chancesSalesMaster, 10) - 1;

    localStorage.setItem('chances_salesMaster', chancesSalesMaster);

    return chancesSalesMaster;
}