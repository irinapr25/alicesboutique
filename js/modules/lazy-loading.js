export function lazyLoading() {
	const lazyLoadingImages = document.querySelectorAll('img[data-src]');

	if (lazyLoadingImages.length) {
		const loadImages = function (entries, observer) {
			entries.forEach(entry => {
				if (!entry.isIntersecting) {
					return;
				} else if (entry.target.dataset.src) {
					// смена изображения на изображение с высоким разрешением
					entry.target.src = entry.target.dataset.src;

					entry.target.addEventListener('load', function () {
						entry.target.offsetParent.classList.remove('_lazy-loading');
						entry.target.removeAttribute('data-src');
					});
					observer.unobserve(entry.target);
				}
			});
		};

		const lazyLoadingImagesObserver = new IntersectionObserver(loadImages, {
			// root: null,
			threshold: 0,
			rootMargin: '300px 0px 0px 0px',
		});
		lazyLoadingImages.forEach(lazyImg => {
			lazyLoadingImagesObserver.observe(lazyImg);
		});
	}
}

/* export function lazyLoading() {
	const lazyLoadingImages = document.querySelectorAll('img[data-src]');

	const loadImages = function (entries, observer) {
		entries.forEach(entry => {
			if (!entry.isIntersecting) {
				return;
			} else {
				if (!entry.target.getAttribute('data-loaded')) {
					// Устанавливаем флаг, указывающий, что изображение было загружено
					entry.target.setAttribute('data-loaded', 'true');

					// Меняем исходный источник изображения на версию с более высоким разрешением
					entry.target.src = entry.target.dataset.src;

					entry.target.addEventListener('load', function () {
						entry.target.offsetParent.classList.remove('_lazy-loading');
					});
				}
				observer.unobserve(entry.target);
			}
		});
	};

	const lazyLoadingImagesObserver = new IntersectionObserver(loadImages, {
		root: null,
		threshold: 0,
		rootMargin: '300px 0px 0px 0px',
	});

	lazyLoadingImages.forEach(lazyImg => {
		lazyLoadingImagesObserver.observe(lazyImg);
	});
} */

/* export function lazyLoading() {
	const lazyLoadingImages = document.querySelectorAll('img[data-src]');

	const loadImages = function (entries, observer) {
		entries.forEach(entry => {
			if (!entry.isIntersecting) {
				return;
			} else {
				// Получаем атрибут data-src
				const dataSrc = entry.target.dataset.src;
				console.log(dataSrc);
				console.log(entry.target);
				if (dataSrc) {
					const hasBeenLoaded = sessionStorage.getItem(dataSrc);
					console.log(hasBeenLoaded);
					console.log(sessionStorage);
					if (!hasBeenLoaded) {
						// Устанавливаем флаг в sessionStorage, указывая, что изображение было загружено
						sessionStorage.setItem(dataSrc, 'true');

						// Меняем исходный источник изображения на версию с более высоким разрешением
						entry.target.src = dataSrc;

						entry.target.addEventListener('load', function () {
							entry.target.offsetParent.classList.remove('_lazy-loading');
						});
					}
					// Убираем изображение из IntersectionObserver, чтобы оно больше не обрабатывалось
					observer.unobserve(entry.target);
				}
			}
		});
	};

	const lazyLoadingImagesObserver = new IntersectionObserver(loadImages, {
		root: null,
		threshold: 0,
		// rootMargin: '300px 0px 0px 0px',
	});

	lazyLoadingImages.forEach(lazyImg => {
		lazyLoadingImagesObserver.observe(lazyImg);
	});
} */

// Функция для инициализации ленивой загрузки изображений
/* export function lazyLoading() {
	const lazyLoadingImages = document.querySelectorAll('img[data-src]');

	// Получаем данные о загруженных изображениях из localStorage
	const loadedImages = JSON.parse(localStorage.getItem('loadedImages')) || {};

	console.log(loadedImages); // Вывод данных в консоли для отладки

	const loadImages = function (entries, observer) {
		entries.forEach(entry => {
			if (!entry.isIntersecting) {
				return;
			} else {
				const img = entry.target;
				if (img.dataset.src && img.src !== img.dataset.src) {
					// Проверяем, было ли изображение уже загружено
					if (!loadedImages[img.dataset.src]) {
						img.src = img.dataset.src;
						loadedImages[img.dataset.src] = true; // Отмечаем изображение как загруженное
						img.addEventListener('load', function () {
							img.offsetParent.classList.remove('_lazy-loading');
							observer.unobserve(img);
						});
					}
				}
			}
		});

		// Сохраняем данные о загруженных изображениях в localStorage
		localStorage.setItem('loadedImages', JSON.stringify(loadedImages));
	};

	const lazyLoadingImagesObserver = new IntersectionObserver(loadImages, {
		root: null,
		threshold: 0,
		rootMargin: '300px 0px 0px 0px',
	});

	lazyLoadingImages.forEach(lazyImg => {
		lazyLoadingImagesObserver.observe(lazyImg);
	});
} */
