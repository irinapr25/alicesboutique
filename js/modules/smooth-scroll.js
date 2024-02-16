/* SMOOTH SCROLL */
import { removePaddingRight } from './functions.js';

const header = document.querySelector('.header');
const body = document.body;

export function handleGotoLinks() {
	const gotoLinks = document.querySelectorAll('[data-goto]');
	gotoLinks.forEach(gotoLink => {
		gotoLink.addEventListener('click', function (e) {
			e.preventDefault();
			const targetId = gotoLink.getAttribute('data-goto');

			const targetBlock = document.querySelector(targetId);

			if (targetBlock) {
				if (header) {
					const headerHeight = header.offsetHeight;

					const targetPosition =
						targetBlock.getBoundingClientRect().top + window.scrollY - headerHeight;

					// закрытие выпадающего меню
					if (document.body.classList.contains('menu-open')) {
						document.body.classList.remove('menu-open');
						removePaddingRight(body, header);
					}
					window.scrollTo({
						top: targetPosition,
						behavior: 'smooth',
					});
				} else {
					// альтернативный способ прокрутки к целевому элементу, если не определен заголовок (header).
					targetBlock.scrollIntoView({ behavior: 'smooth' });
				}
			}
		});
	});
}

// SMOOTH SCROLL
// const menuLinks = document.querySelectorAll('.menu__link');
/* export function handleGotoLinks() {
	const gotoLinks = document.querySelectorAll('[data-goto]');
	gotoLinks.forEach(gotoLink => {
		gotoLink.addEventListener('click', function (e) {
			e.preventDefault();
			const targetId = gotoLink.getAttribute('data-goto');

			const targetBlock = document.querySelector(targetId);

			if (targetBlock) {
				if (header) {
					const headerHeight = header.offsetHeight;

					const targetPosition =
						targetBlock.getBoundingClientRect().top + window.scrollY - headerHeight;

					// закрытие выпадающего меню
					if (document.body.classList.contains('menu-open')) {
						document.body.classList.remove('menu-open');
					}
					window.scrollTo({
						top: targetPosition,
						behavior: 'smooth',
					});
				} else {
					// альтернативный способ прокрутки к целевому элементу, если не определен заголовок (header).
					targetBlock.scrollIntoView({ behavior: 'smooth' });
				}
			}
		});
	});
} */
