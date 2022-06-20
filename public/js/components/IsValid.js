//error/first approach ar vykdant darba iskyla klaida, taip arba ne. Taip is kyla ir tokia...

class IsValid {
    //cia turesim kruva metodu kurie galis patikrinti ar varads geras, ir tt
    static fullname(str) {  //statiniai metodai nereikalauja objekto, galima tiesiog i juos kreiptis IsValid.fullname
        if (str.length<2)  {
            return [true,'Per trumpas fullname tesktas'];
        }

        const parts=str.split('');
        if (parts.length<2){
            return [true,'Per mazai fullname zodziu'];
        }
        return [false, 'OK'];

    }
    static email(str) {
        if (str.length<2)  {
            return [true,'Per trumpas email tesktas'];
        }
        return [false, 'OK'];
    }
    static password(str) {
        if (str.length<2)  {
            return [true,'Per trumpas password tekstas'];
        }
        return [false, 'OK'];
    }
}
export { IsValid };