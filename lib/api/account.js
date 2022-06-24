// const handler={};  //tu atejai pas accounta, o ka tu nori kad jis padarytu ?
// //aprasom musu handlerio metodus
// handler.account=()=>{
//     //sakysim kad klientas gali kreiptis pas mus su vienu is vardintu methodu
//     const acceptableMethods=['get', 'post', 'put', 'delete']; //kliento intencija ka jis nori daryti
// if (acceptableMethods.includes(data.httpMethod)) {
//     console.log('dirbam toliau');
//     return resizeBy.end(JSON.stringify);
// }
// return false;
// }

// //GET
// handler.get=()=>{}

// //post
// handler.post=()=>{}

// // PUT (kapitalinis info pakeitimas / PATCH (vienos info dalies pakeitimas))
// handler.put=()=>{}

// //DELETE
// handler.delete=()=>{}

// export default handler;

// handler[httpMethod: OK] -> funccija grazins
// handler[httpMethod: kita] -> underfines
// handler[httpMethod: OK] -> funccija() grazins OK
// handler[httpMethod: kita] -> underfined() tai grazins fatal error

const handler = {};

handler.account = (data, res) => {
    const acceptableMethods = ['get', 'post', 'put', 'delete'];

    if (acceptableMethods.includes(data.httpMethod)) {
        return handler._account[data.httpMethod](data, res);
    }

    return res.end(JSON.stringify('Tavo norimas HTTPmethod yra nepalaikomas'));
}

handler._account = {};

// GET
handler._account.get = (data, res) => {
    return res.end(JSON.stringify('Account: get'));
}

// POST - sukuriame paskyra
handler._account.post = (data, res) => {
    const {payload} = data;

    /*
    1. Patikrinti, ar teisinga info (payload)
    -email
    -pass
    -fullname-isitikinti jog atejusiame objekte nera kitu keys aprat> email, fullname ir password
       */ 
      
    /*2. ar toks vartotojas jau egzistuoja
    -jei taip tai error
    -jei ne - tesiam (zr.3)

    3. issaugoti duomenys (payload)
    -jei pavyko issaugoti duomenys, reiskia paskyra sukurta
     - - siunciam patvirtinimo laiska
    -jei nepavyko issaugoti duomenys - tuomet error

    4) tapatybes patvirtinimas
    */


    console.log(payload);
    return res.end(JSON.stringify('Account: post'));
}

// PUT (kapitalinis info pakeistimas) / PATCH (vienos info dalies pakeitimas)
handler._account.put = (data, res) => {
    return res.end(JSON.stringify('Account: put'));
}

// DELETE
handler._account.delete = (data, res) => {
    return res.end(JSON.stringify('Account: delete'));
}

export default handler; 