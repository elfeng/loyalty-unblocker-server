export const popUp = (page, name, details) => {
	var newWin = window.open(page, name, details);
	newWin.focus();
}
