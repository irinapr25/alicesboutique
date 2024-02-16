/* PRELOADER */
/* 	const preloader = document.querySelector('.preloader');
	if (preloader) {
		setTimeout(() => {
			preloader.classList.add('_hide');
			// if (!preloader.classList.contains('_hide')) {
			// }
			// preloader.remove();
			// preloader.classList.add('_hide');
		}, 500);
	} */

/* 	// Проверяем, была ли страница посещена ранее
	const isPageVisited = localStorage.getItem('visited');
	const preloader = document.querySelector('.preloader');

	if (preloader) {
		if (!isPageVisited) {
			// Если страница посещена впервые, скрываем preloader и удаляем его через
			preloader.classList.remove('_hide');

			setTimeout(() => {
				preloader.classList.add('_hide');
			}, 400);

			// Помечаем страницу как посещенную
			localStorage.setItem('visited', 'true');
		} else {
			// 	 setTimeout(() => {
			// 	preloader.remove();
			// }, 0);
			// Если страница уже посещена, скрываем preloader сразу
			// preloader.remove();
			// preloader.classList.add('_hide');
		}
	} */
