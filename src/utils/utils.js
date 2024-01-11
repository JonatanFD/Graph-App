export const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
};

export const generateRandomName = () => {
    let generated = "";
    for (let i = 0; i < 3; i++) {
        generated += String.fromCharCode(generateRandomNumber(65, 65 + 26));
    }
    return generated.trim();
};

export const generateAlphabeticNames = (amount) => {
    let letras = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
    let names = [];
    let template = "";
    let repeat = 0
    for (let i = 0; i < amount; i++) {
        if (i === letras.length - 1) { 
            amount -= letras.length;
            i = 0;
            
            template = names[repeat]
            repeat += 1
            console.log(letras);
        }
        names.push(template + letras[i]);
    }
    return names
};
