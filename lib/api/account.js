const handler={};  //tu atejai pas accounta, o ka tu nori kad jis padarytu ?
//aprasom musu handlerio metodus
handler.account=()=>{
    //sakysim kad klientas gali kreiptis pas mus su vienu is vardintu methodu
    const acceptableMethods=['get', 'post', 'put', 'delete'];
if (acceptableMethods.includes(data.httpMethod)) {
    console.log('dirbam toliau');
    return resizeBy.end(JSON.stringify);
}
return false;
}

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