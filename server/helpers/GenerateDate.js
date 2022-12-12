export const GenerateDateString = () =>  {
    let today = new Date();
    let date =
        today.getFullYear() +
        '-' +
        (today.getMonth() + 1 <= 9 ? '0' + Number(today.getMonth() + 1) : today.getMonth() + 1) +
        '-' +
        (today.getDate() <= 9 ? '0' + Number(today.getDate()) : today.getDate());
    return date;
}