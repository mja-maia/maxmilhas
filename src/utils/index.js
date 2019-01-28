export function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

export const convertMinsToHrsMins = (mins)  => {
    let h = Math.floor(mins / 60);
    let m = mins % 60;   h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;

    return `${h}:${m}`;
}
