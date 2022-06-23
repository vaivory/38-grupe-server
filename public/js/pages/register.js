import { IsValid } from "../components/IsValid.js";

const formDOM = document.querySelector('.form');
const inputsDOM = formDOM.querySelectorAll('input');
const submitDOM = formDOM.querySelector('button');
const notificationsDOM = formDOM.querySelector('.notifications');

if (submitDOM) {
    submitDOM.addEventListener('click', (e) => {  //jei bus error man tikrinant tai tuomet rodis, kitaip ne
        e.preventDefault();

        notificationsDOM.classList.remove('show'); //kiekviena karta kai siunciam forma tai pradedam viska is naujo
        notificationsDOM.innerText = '';

        const data = {};
        const errors = [];

        for (const inputDOM of inputsDOM) { //jei yra checkbox tai darau taip, jei nera tai kitaip
            // console.log([inputDOM]); //skaito kaip js objekta
            // console.log(inputDOM);  //skaito kaip html
            if (inputDOM.type !== 'checkbox') {
                const rule = inputDOM.dataset.validation;
                const [err, msg] = IsValid[rule](inputDOM.value); //destrukturizavimas, iskonstravimas
                //[true, 'erre msg']
                //[false[0]]
                if (err) {
                    errors.push(msg);

                } else {
                    // console.log('klaida su', inputDOM);
                    data[inputDOM.name] = inputDOM.value; //paimam objekta nurodeom raktazodi ir priskyriam reiksme
                }
            }
            else {
                data[inputDOM.name] = inputDOM.checked; //paimam objekta nurodeom raktazodi ir priskyriam reiksme
                if (!inputDOM.checked) {
                    errors.push('Privaloma sutikti su TOS');
                }
            }

        }

        if (inputsDOM[2].value !== inputsDOM[3].value) {
            errors.push('Slaptazodziai nesutampa');
        }

        if (errors.length) {  //ateina paklausiams ,tai ar buvo klaidu ar ne
            notificationsDOM.classList.add('show');
            //  notificationsDOM.innerHTML=error.map(e=>`<p>${e}.`).join('');
            notificationsDOM.innerText = errors.join('.\n') + '.';  //slash n yra simbolis kuris reiskia nauja eilute kaip ir \r naujas return       }
        } else {
            //jei klaidu visgi ne buvo rasta, tuomet:
            //siunciam tuomet duomenys i serveri ir atspausdinam juos
            //console.log('KLAIDU NERASTA...');
            // console.log('SIUNCIAM DUOMENIS I SERVERI...');
            // console.log(data);

            delete data.repass;
            delete data.tos;

            // async/await

            fetch(formDOM.action{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });

            async function postData() {
                const response = await fetch(formDOM.action, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data),
                });
                return response.json();
            }

            postData();
        }

        // console.log(data);
        //tikriname ar laukai ne tusti
        //tikriname ar geros vertes:
        //ar vardas "tinkamas" (minimum 2 zodziai)
        //ar email "tinkamas"
        //ar password "tinkamas"
        //ar repeat-password "tinkamas"
        //as password === repeat-password
        //ar TOS pazymetos (check)
        //JEI yra klaidu:
        // Klaidas atvaizduojame pranesimu bloke
        //Jei klaidu nera:
        //sekmes pranesima atvaizduojame pranesimu bloke


        //Siunciam i backenda (API)
        //
    })
}
