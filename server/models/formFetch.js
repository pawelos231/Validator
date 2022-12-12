export const findIfIsbnExists = (isbn) =>{
    return `SELECT * FROM Ksiazki WHERE isbn = "${isbn}"`
}