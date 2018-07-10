export const toDateString = d => new Date(d).toDateString();

export const toSimpleDateString = date => {
    const d = new Date(date);
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}
