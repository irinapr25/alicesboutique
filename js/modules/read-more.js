/* Read More */
const textBtnMore = document.querySelector('.text__btn_more');
const textBtnLess = document.querySelector('.text__btn_less');
function readMore(targetElementId) {
	const targetElement = document.getElementById(targetElementId);
	if (targetElement) {
		const textDots = targetElement.querySelector('.text__dots');
		const textMore = targetElement.querySelector('.text__more');
		const breedArticle = targetElement.querySelector('.article-breed');

		if (textDots.style.display === 'none') {
			textDots.style.display = 'inline';
			// textBtn.innerHTML = 'читать больше';
			// textMore.style.display = 'none';
			textMore.style.maxHeight = 0;
			textMore.style.opacity = 0;
			textMore.style.visibility = 'hidden';

			// breedArticle.style.alignItems = 'center';
			setTimeout(() => {
				breedArticle.classList.remove('align-start');
			}, 300);

			textBtnMore.style.display = 'inline';
			textBtnLess.style.display = 'none';
		} else {
			textDots.style.display = 'none';
			// textBtn.innerHTML = 'читать меньше';
			// textMore.style.display = 'block';

			textMore.style.maxHeight = textMore.scrollHeight + 'px';
			textMore.style.opacity = 1;
			textMore.style.visibility = 'visible';

			// breedArticle.style.alignItems = 'start';
			/* setTimeout(() => {
			}, 300); */
			breedArticle.classList.add('align-start');

			textBtnMore.style.display = 'none';
			textBtnLess.style.display = 'inline';
		}
	}
}

if (textBtnMore || textBtnLess) {
	textBtnMore.addEventListener('click', function () {
		readMore('breed-maine-coon');
	});
	textBtnLess.addEventListener('click', function () {
		readMore('breed-maine-coon');
	});
}
