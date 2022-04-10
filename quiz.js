

const DEFAULTS = {
    ease: "back"
}


/**************************************** */
/* Handle all button click functionality  */
/* 1. Save Selection                      */
/* 2. Trigger next question animation     */


function answerClick(btn) {
   sessionStorage.setItem($(btn).data('question'), $(btn).data('choice'));
    $('#' + $(btn).data('question')).text(sessionStorage.getItem($(btn).data('question')));
    playMaster()
}









/********************************** */
/* Handle all animations with GSAP */

// Handle moving the entire animation container into view each round of questions
function moveUp() {
    gsap.to("#inner-quiz-container", { y: "-=100"});
}


// First Startup Animations
function startup() {
    var t1 = gsap.timeline({onComplete: pauseMaster, defaults: DEFAULTS });
    
    t1.from("#message1", { x : "-=100%", duration: .5 })
    t1.from("#answer_row_1", {x : "-=100%", duration: .5})

    
    return t1;
}



// Second animation after first user input
function second() {
    var t2 = gsap.timeline({onComplete: pauseMaster, defaults:DEFAULTS });
    
    t2.from("#user_message_1", {x : "+=200%", duration: .5})
    t2.to("#inner-quiz-container", { y: "-=500"});
    t2.from("#message2", { x : "-=200%", duration: .5 })
    t2.from("#answer_row_2", {x : "-=200%", duration: .5})

    
    return t2;
}



// Third animation after second user input
function third() {
    var t3 = gsap.timeline({onComplete: pauseMaster, defaults: DEFAULTS });
    
    t3.from("#user_message_2", {x : "+=200%", duration: .5})
    t3.to("#inner-quiz-container", { y: "-=500"})
    t3.from("#message3", { x : "-=200%", duration: .5 })
    t3.from("#answer_row_3", {x : "-=200%", duration: .5})

    
    return t3;
}

//fourth animation after third user input 

function final() {
    var t4 = gsap.timeline({onComplete: showAnswerStart, defaults: DEFAULTS });
    
    t4.from("#user_message_3", {x : "+=200%", duration: .5})
    t4.to("#inner-quiz-container", { y: "-=500"})
 
    
    return t4;
}


function showAnswer() {
    var t5 = gsap.timeline({onComplete: pauseMaster, defaults: DEFAULTS });
    
    t5.from("#finalAnswer", { x : "-=200%", duration: .5 })

    
    return t5;
}


function showAnswerStart() {
    let answer = sessionStorage.getItem('look');

    if(answer.startsWith('be')) {
        $("#answer_text").text('Babe, our XL Twist Digital Titanium Styler is everything you need.With digital heat control settings and strand-protecting titanium plates, she\'ll give you all the twisted, breezy texture you can handle.OR if you like options, we also recommend SugarBOO\'s 3-in-1 Curling Wand Set. She\'s built with the same protective titanium as our XL Twist Digital Titanium Styler, but allows you to switch up the intensity of your twists with interchangeable, different-sized barrels for all the curly, wavy or kinky styles you can dream of. No creases, no damage.')
    } else if (answer.startsWith('s')) {
        $("#answer_text").text('You + the XL Digital Titanium Styler is a match made in heaven. Get all the smooth, frizz-free texture you want without sacrificing the health of your hair. She is built with the same protective titanium as all of our styling tools.')
    } else if (answer.startsWith('c')){
        $("#answer_text").text('Give SugarBOO’s 3-in-1 Curling Wand Set a shot. Each interchangeable barrel is built with strand-saving titanium, and the versatility lets you switch up the intensity of your twists. From curly to wavy to kinky styles, your bounciest hair dreams are all yours, babe')
    } else {
        $("#answer_text").text('Honey, if  volume and drama is what you are in the mood for, then the Big Blow Out Hair Dryer Set is all you need. She will give you salon-level results thanks to her negative ions that infuse hair with smoothing and softening particles. Reduce frizz, lock in shine, and retain moisture all in with one tool.')
    }


}




 
var master = gsap.timeline( );

master
.add(startup())
.add(second())
.add(third())
.add(final())
.add(showAnswer())

// Play and Pause Functions for master

function pauseMaster() {
    master.pause();
}

function playMaster() {
    master.play();
}

/* END ANIMATIONS */