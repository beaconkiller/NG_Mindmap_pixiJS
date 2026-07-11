export class SrvHelper {

    getRandomNum(lgt: number) {
        let ranString = '';

        for (let i = 0; i < 5; i++) {
            (Math.random() * 10)
        }

        let rNumber1 = Math.random().toString().split('.')[1].slice(0, 4);
        let rNumber2 = Math.random().toString().split('.')[1].slice(0, 4);
        let finString = `${rNumber1}${rNumber2}`
        console.log(finString);
        return finString;
    };



    getRandomAlphaNum(lgt: number) {
        let ranString = '';
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for (let i = 0; i < 5; i++) {
            let a = alphabet[Math.floor(Math.random() * alphabet.length)];
            ranString += a;
        }
        let rNumber1 = Math.random().toString().split('.')[1].slice(0, 2);
        let rNumber2 = Math.random().toString().split('.')[1].slice(0, 2);
        let finString = `${rNumber1}${rNumber2}`
        return `${ranString}${finString}`;
    };

}