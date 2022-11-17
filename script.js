document.getElementById('btnTobegin').addEventListener('click', function () {  
    document.querySelector('.title-page').classList.add('hidden');              
    document.querySelector('.value-range').classList.remove('hidden');          
    document.querySelector('.valueRange').classList.remove('hidden');           
    document.querySelector('.form-inline').classList.remove('hidden');          
    document.querySelector('#btnTobegin').classList.add('hidden');            
    document.querySelector('#btnProceed').classList.remove('hidden');           
})

document.getElementById('btnProceed').addEventListener('click', function () {  
    document.querySelector('.value-range').classList.add('hidden');             
    document.querySelector('.terms').classList.remove('hidden');                
    document.querySelector('.valueRange').classList.add('hidden');              
    document.querySelector('.form-inline').classList.add('hidden');             
    document.querySelector('.guessNumber').classList.remove('hidden');          
    document.querySelector('#btnProceed').classList.add('hidden');              
    document.querySelector('#btnPlay').classList.remove('hidden');              
    minValue = parseInt(document.querySelector('#formInputMin').value);
    maxValue = parseInt(document.querySelector('#formInputMax').value);
    minValue = (minValue < -999) ? minValue = -999 : (minValue > 999) ? minValue = 999 : minValue;
    maxValue = (maxValue > 999) ? maxValue = 999 : (maxValue < -999) ? maxValue = -999 : maxValue;
    if (maxValue < minValue) {
        [maxValue, minValue] = [minValue, maxValue]; 
    }
    if (Number.isNaN(maxValue) || Number.isNaN(minValue)) {
        minValue = 0;
        maxValue = 100;
    }
    guessNumber.innerText = `Загадай любое целое число от ${minValue} до ${maxValue}, а Билли его угадает`;
})


document.getElementById('btnPlay').addEventListener('click', function () {      
    document.querySelector('.terms').classList.add('hidden');                   
    document.querySelector('.question').classList.remove('hidden');             
    document.querySelector('.guessNumber').classList.add('hidden');             
    document.querySelector('.no-gutters').classList.remove('hidden');           
    document.querySelector('#btnPlay').classList.add('hidden');               
    document.querySelector('#btnLess').classList.remove('hidden');              
    document.querySelector('#btnEqual').classList.remove('hidden');             
    document.querySelector('#btnOver').classList.remove('hidden');              
    document.querySelector('.btn-link').classList.remove('hidden');             

    let answerNumber = Math.floor((minValue + maxValue) / 2); 
    let orderNumber = 1; 
    let gameRun = true;

    const orderNumberField = document.getElementById('orderNumberField'); // Попытка №_
    const answerField = document.getElementById('answerField');

    

    let units = ['', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'];
    let teens = ['', 'десять', 'одинадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'];
    let dozens = ['', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'];
    let hundreds = ['', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'];

    function numberToText() { 
        let number = Math.abs(answerNumber);
        let text = '';

        if (number == 0) {
            text = 'ноль';
            return text;
        }

        if (number <= 9) {
            return units[Math.floor(Math.abs(number) / 1)];
        }

        if (number > 9 && number < 20) {
            return teens[Math.floor(number / 10 + number % 10)];
        }

        if (number >= 20 && number <= 99) {
            return dozens[(Math.floor(number / 10)) - 1] + " " + units[Math.floor(number % 10)];
        }

        if (number >= 100 && number <= 999) {
            return hundreds[Math.floor(number / 100)] + " " + numberToTextHundreds();
        }
    }

    function numberToTextHundreds() { 
        let unitsTeensDozens = Math.abs(answerNumber) % 100;

        if (unitsTeensDozens <= 9) {
            return units[Math.floor(unitsTeensDozens / 1)];
        }

        if (unitsTeensDozens > 9 && unitsTeensDozens < 20) {
            return teens[(Math.floor(unitsTeensDozens / 10)) + (unitsTeensDozens % 10)];
        }

        if (unitsTeensDozens >= 20 && unitsTeensDozens <= 99) {
            return dozens[(Math.floor(unitsTeensDozens / 10)) - 1] + " " + units[Math.floor(unitsTeensDozens % 10)];
        }
    }

    orderNumberField.innerText = orderNumber; 
    answerField.innerText = answerNumber >= 0 ? numberToText().length < 20 && answerNumber >= 0 ? `Вы загадали число ${numberToText()}?` : `Вы загадали число ${answerNumber}?` : numberToText().length < 20 ? `Вы загадали число минус ${numberToText()}?` : `Вы загадали число ${answerNumber}?`;
    

    document.getElementById('btnLess').addEventListener('click', function () { // Код кнопки «Меньше».
        if (gameRun) {
            if (minValue === maxValue || minValue == answerNumber) {
                const phraseRandom = Math.round(Math.random() * 3);
                switch (phraseRandom) {
                    case 0:
                        answerPhrase = `Не обманывай меня!\n\u{1F479}`
                        break;

                    case 1:
                        answerPhrase = `Кажется, кто-то играет не по правилам?\n\u{1F47F}`
                        break;

                    case 2:
                        answerPhrase = `Не разбивайте Билли сердце!\n\u{1F494}`
                        break;

                    case 3:
                        answerPhrase = `Я знаю, что угадал, а неправ - ты!!!\n\u{1F4A9}`
                        break;
                }
                answerField.innerText = answerPhrase;
                gameRun = false;
            } else {
                maxValue = answerNumber - 1; 
                answerNumber = Math.floor((minValue + maxValue) / 2);
                orderNumber++;
                orderNumberField.innerText = orderNumber;
                const phraseRandom = Math.round(Math.random() * 4); // Генератор ответа от 0 до 4.
                switch (phraseRandom) {
                    case 0:
                        answerPhrase = `Ты загадал число `
                        break;

                    case 1:
                        answerPhrase = `Возможно, твое число `
                        break;

                    case 2:
                        answerPhrase = `Это цифра `
                        break;

                    case 3:
                        answerPhrase = `Кажется, я знаю, что это число `
                        break;

                    case 4:
                        answerPhrase = `Это число `
                        break;
                }
                answerField.innerText = answerNumber >= 0 ? numberToText().length < 20 && answerNumber >= 0 ? `Вы загадали число ${numberToText()}?` : `Вы загадали число ${answerNumber}?` : numberToText().length < 20 ? `Вы загадали число минус ${numberToText()}?` : `Вы загадали число ${answerNumber}?`;
            }
        }
    })

    document.getElementById('btnOver').addEventListener('click', function () { // Код кнопки «Больше».
        if (gameRun) {
            if (minValue === maxValue) {
                const phraseRandom = Math.round(Math.random() * 3);
                switch (phraseRandom) {
                    case 0:
                        answerPhrase = `Не обманывай меня!\n\u{1F479}`
                        break;

                    case 1:
                        answerPhrase = `Кажется, кто-то играет не по правилам?\n\u{1F47F}`
                        break;

                    case 2:
                        answerPhrase = `Не разбивайте Билли сердце!\n\u{1F494}`
                        break;

                    case 3:
                        answerPhrase = `Я знаю, что угадал, а неправ - ты!!!\n\u{1F4A9}`
                        break;
                }
                answerField.innerText = answerPhrase;
                gameRun = false;
            } else {
                minValue = answerNumber + 1; 
                answerNumber = Math.floor((minValue + maxValue) / 2);
                orderNumber++;
                orderNumberField.innerText = orderNumber;
                const phraseRandom = Math.round(Math.random() * 4); // Генератор ответа число от 0 до 4.
                switch (phraseRandom) {
                    case 0:
                        answerPhrase = `Ты загадал число `
                        break;

                    case 1:
                        answerPhrase = `Возможно, твое число `
                        break;

                    case 2:
                        answerPhrase = `Это цифра `
                        break;

                    case 3:
                        answerPhrase = `Кажется, я знаю, что это число `
                        break;

                    case 4:
                        answerPhrase = `Это число `
                        break;
                }
                answerField.innerText = answerNumber >= 0 ? numberToText().length < 20 && answerNumber >= 0 ? `Вы загадали число ${numberToText()}?` : `Вы загадали число ${answerNumber}?` : numberToText().length < 20 ? `Вы загадали число минус ${numberToText()}?` : `Вы загадали число ${answerNumber}?`;
            }
        }
    })

    document.getElementById('btnEqual').addEventListener('click', function () { // Код кнопки "Верно".
        if (gameRun) {
            const phraseRandom = Math.round(Math.random() * 3);
            switch (phraseRandom) {
                case 0:
                    answerPhrase = `Билли никогда не проигрывает\n\u{1F47B}`
                    break;

                case 1:
                    answerPhrase = `Отлично! \n\u{1F480}`
                    break;

                case 2:
                    answerPhrase = `Я всегда прав!\n\u{1F4AF}`
                    break;

                case 3:
                    answerPhrase = `Я угадал!\n\u{1F4AA}`
                    break;
            }
            answerField.innerText = answerPhrase;
            gameRun = false;
        }
    })
})


document.getElementById('btnRetry').addEventListener('click', function () {     
    document.querySelector('.question').classList.toggle('hidden');             
    document.querySelector('.value-range').classList.toggle('hidden');          
    document.querySelector('.no-gutters').classList.toggle('hidden');           
    document.querySelector('.valueRange').classList.toggle('hidden');           
    document.querySelector('.form-inline').classList.toggle('hidden');          
    document.querySelector('#btnLess').classList.toggle('hidden');             
    document.querySelector('#btnEqual').classList.toggle('hidden');             
    document.querySelector('#btnOver').classList.toggle('hidden');              
    document.querySelector('.btn-link').classList.toggle('hidden');             
    document.querySelector('#btnProceed').classList.toggle('hidden');           
    document.querySelector('#formInputMin').value = '';
    document.querySelector('#formInputMax').value = '';
    minValue = (minValue < -999) ? minValue = -999 : (minValue > 999) ? minValue = 999 : minValue;
    maxValue = (maxValue > 999) ? maxValue = 999 : (maxValue < -999) ? maxValue = -999 : maxValue;
    if (maxValue < minValue) {
        [maxValue, minValue] = [minValue, maxValue]; 
    }
    if (Number.isNaN(maxValue) || Number.isNaN(minValue)) {
        minValue = 0;
        maxValue = 100;
    }
    guessNumber.innerText = `Загадай любое целое число от ${minValue} до ${maxValue}, а Билли его угадает`;

   
    
    document.getElementById('btnProceed').addEventListener('click', function () {   
        document.querySelector('.value-range').classList.add('hidden');             
        document.querySelector('.terms').classList.remove('hidden');                
        document.querySelector('.valueRange').classList.add('hidden');              
        document.querySelector('.form-inline').classList.add('hidden');             
        document.querySelector('.guessNumber').classList.remove('hidden');         
        document.querySelector('#btnProceed').classList.add('hidden');              
        document.querySelector('#btnPlay').classList.remove('hidden');              
    })
})

