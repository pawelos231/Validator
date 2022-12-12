export const ksiazki = (title, autor, isbn) =>{
    return `INSERT INTO Ksiazki (tytul, autor, isbn) VALUES ("${title}", "${autor}", "${isbn}")`
}
export const wypozyczenia = (idusera, idksiazki, dataWyp) => {
    return `INSERT INTO wypozyczenia (idusera, idksiazki, dataWyp) VALUES ("${idusera}", "${idksiazki}", "${dataWyp}")`
}
export const DaneOsobowe = (imie, nazwisko, email, pesel) =>{
    return `INSERT INTO DaneOsobowe (imie, nazwisko, email, pesel) VALUE ("${imie}", "${nazwisko}", "${email}", "${pesel}")`
}