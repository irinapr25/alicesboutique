/* Установить padding-right, если элемент fixed */
// находим ширину scrollbar
const paddingRightValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
console.log(paddingRightValue);
export function setPaddingRight(...elements) {
	elements.forEach(function (element) {
		element.style.paddingRight = paddingRightValue;
	});
}

/* Удалить padding-right  */
export function removePaddingRight(...elements) {
	elements.forEach(function (element) {
		element.style.removeProperty('padding-right');
	});
}

/* // Установить padding-right
function setPaddingRight() {
	document.body.style.paddingRight = paddingRightValue;
	header.style.paddingRight = paddingRightValue;
}
// Удалить padding-right
function removePaddingRight() {
	// setTimeout(function () {
	// }, 400);
	document.body.style.removeProperty('padding-right');
	header.style.removeProperty('padding-right');
} */
