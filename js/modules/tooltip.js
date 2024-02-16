/* TOOLTIP */

//=======================================================
import { handleGotoLinks } from './smooth-scroll.js';
export function tooltip() {
	const tooltips = document.querySelectorAll('._tooltip');
	if (tooltips.length) {
		// добавляем class _show-after, чтобы показать знак ?/i как метку того, что есть пояснение
		tooltips.forEach(tooltip => {
			/* const availabilityText = tooltip.textContent.toLowerCase();
			if (
				availabilityText.includes('available') ||
				availabilityText.includes('доступ') ||
				availabilityText.includes('pieejam') ||
				availabilityText.includes('consider') ||
				availabilityText.includes('рассмотрении') ||
				availabilityText.includes('izskat') ||
				availabilityText.includes('reserved') ||
				availabilityText.includes('резерв') ||
				availabilityText.includes('rezervēt') ||
				availabilityText.includes('sold') ||
				availabilityText.includes('продан') ||
				availabilityText.includes('pārdots')
			) {
				tooltip.classList.add('_show-after');
				// tooltip.style.paddingBottom = '10px';
			} else {
				tooltip.classList.add('_show-after');
			} */
			tooltip.classList.add('_show-after');
		});
	}

	let tooltipModule = (function () {
		let flag = true;
		let tooltip = null;
		let activeTooltip = null;

		// Вычисление положения tooltip в зависимости от родительского элемента
		function calculateTooltipPosition(parent) {
			const parentCoords = parent.getBoundingClientRect();
			const spaceBelow = window.innerHeight - parentCoords.bottom;

			if (parent.closest('.about')) {
				const spaceRight = document.body.offsetWidth - parentCoords.right;
				const spaceLeft = parentCoords.left;

				// Проверяем, где больше места
				if (spaceRight <= spaceLeft) {
					// Если больше места справа, располагаем tooltip справа от элемента
					tooltip.style.left = 'auto';
					tooltip.style.right = spaceRight + 'px';
				} else {
					// Если больше места слева, располагаем tooltip слева от элемента
					tooltip.style.right = 'auto';
					tooltip.style.left = spaceLeft + 'px';
					// tooltip.style.borderRadius = '0 30px 30px 30px';
					tooltip.style.borderRadius = '0 2.14em 2.14em 2.14em';
				}
			} else {
				// Для других блоков - выравниваем правый край tooltip с правым краем родителя
				tooltip.style.right = document.body.offsetWidth - parentCoords.right + 'px';
			}

			if (spaceBelow >= tooltip.offsetHeight) {
				// Отобразить подсказку под родителем
				tooltip.style.top = parentCoords.bottom - 1 + 'px';
				tooltip.style.bottom = 'auto'; // Сбрасываем значение bottom
			} else {
				// Отобразить подсказку над родителем
				tooltip.style.bottom = window.innerHeight - parentCoords.top - 2 + 'px';
				tooltip.style.borderRadius = '30px 30px 0 30px';
			}
		}

		// Создание всплывающей подсказки для HTML-элемента
		function createTooltip(parent) {
			// создаем span с class-ом _tooltip-comment, куда будет выводится информация (содержание tooltip)
			tooltip = document.createElement('span');
			tooltip.classList.add('_tooltip-comment');

			// получаем содержимое элемента с data-tooltip (это родитель tooltip)
			const message = parent.getAttribute('data-tooltip');
			// находим размеры parent и его позицию относительно видимой части окна (вьюпорта)
			const parentCoords = parent.getBoundingClientRect();
			// текст в tooltip
			tooltip.innerHTML = message;
			// добавления дочернего элемента в конец списка дочерних элементов родительского узла
			parent.appendChild(tooltip);

			parent.classList.add('_active');

			// Вычисляем позицию tooltip
			// Выравниваем правый край tooltip с правым краем родителя
			// tooltip.style.right = window.innerWidth - parentCoords.right - 23 + 'px';
			/* tooltip.style.right = document.body.offsetWidth - parentCoords.right + 'px';*/

			/* // Если tooltip в блоке about
			if (parent.classList.contains('about')) {
				// Вычисляем доступное пространство справа и слева от родительского элемента
				const spaceRight = document.body.offsetWidth - parentCoords.right;
				const spaceLeft = parentCoords.left;

				// Проверяем, где больше места
				if (spaceRight <= spaceLeft) {
					// Если больше места справа, располагаем tooltip справа от элемента
					// tooltip.style.left = 'auto';
					tooltip.style.right = spaceRight + 'px';
				} else {
					// Если больше места слева, располагаем tooltip слева от элемента
					// tooltip.style.right = 'auto';
					tooltip.style.left = spaceLeft + 'px';
					tooltip.style.borderRadius = '0 30px 30px 30px';
				}
			} */

			/* // tooltip.style.top = parentCoords.bottom + 'px';
			const spaceBelow = window.innerHeight - parentCoords.bottom;
			if (spaceBelow >= tooltip.offsetHeight) {
				// Отобразить подсказку под родителем
				tooltip.style.top = parentCoords.bottom - 1 + 'px';
			} else {
				// Отобразить подсказку над родителем
				tooltip.style.bottom = window.innerHeight - parentCoords.top - 2 + 'px';
				tooltip.style.borderRadius = '30px 30px 0 30px';
			} */

			calculateTooltipPosition(parent);

			// ?Проверяем, есть ли уже активная подсказка
			/* if (activeTooltip) {
				activeTooltip.classList.remove('_active');
				activeTooltip.parentElement.removeChild(activeTooltip);
			} */

			// Сохраняем текущую подсказку как активную
			activeTooltip = tooltip;

			flag = false;

			// При создании tooltip, добавьте обработчики событий к элементам с data-goto
			handleGotoLinks();
		}

		// Удаление всех созданных на странице всплывающих подсказок
		function destroyTooltip() {
			const tooltips = document.querySelectorAll('._tooltip-comment');

			tooltips.forEach(tooltip => {
				tooltip.classList.remove('_active');
				const tooltipParent = tooltip.parentElement;
				if (tooltipParent) {
					tooltipParent.removeChild(tooltip);
					tooltipParent.classList.remove('_active');
				}
			});

			setTimeout(function () {
				for (let i = 0; i < tooltips.length; i++) {
					let tooltipParent = tooltips[i].parentElement;
					if (tooltipParent) {
						tooltipParent.removeChild(tooltips[i]);
					}
				}
				// время должно быть меньше, чем transition у ._tooltip-comment иначе не создается при клике/наведении сразу на другой tooltip
			}, 200);

			flag = true;
			// Сбрасываем активную подсказку
			activeTooltip = null;
		}

		// Функция инициализации и проверки
		function init() {
			const tooltipContainer = document.querySelectorAll('._tooltip');

			if (!tooltipContainer.length) {
				return;
			}

			// Обработка события клика на всем документе с проверкой на наличие атрибута data-tooltip
			document.addEventListener('click', function (e) {
				// const dataTooltip = e.target.dataset.tooltip;

				// const parent = e.target;
				// console.log(parent);

				const el = e.target;
				if (el.hasAttribute('data-tooltip') || el.closest('[data-tooltip]')) {
					const parent = el.hasAttribute('data-tooltip') ? el : el.closest('[data-tooltip]');

					// const parentParent = e.target.closest('._tooltip');
					const tooltipCommentElement = parent.querySelector('._tooltip-comment');
					console.log(tooltipCommentElement);
					// console.log('tooltip-height:', tooltipCommentElement.getBoundingClientRect().height);

					const dataTooltip = parent.dataset.tooltip;
					// console.log(dataTooltip);

					// console.log(e.target);
					if (dataTooltip && flag) {
						createTooltip(parent);
						tooltip.classList.add('_active');
					} else if (tooltipCommentElement) {
						// чтобы при клике на уже существующий tooltip ничего не происходило
					} else {
						destroyTooltip();
					}
				} else if (!el.closest('._tooltip-comment')) {
					// Если клик произошел вне подсказки, удаляем её
					destroyTooltip();
				}
			});

			// удаление tooltip при scroll
			window.addEventListener('scroll', function () {
				setTimeout(function () {
					destroyTooltip();
				}, 200);
			});

			if (window.innerWidth > 768) {
				for (let i = 0; i < tooltipContainer.length; i++) {
					tooltipContainer[i].addEventListener('mouseenter', function (e) {
						let parent = this;

						if (flag) {
							createTooltip(parent);
							// Добавляем задержку перед добавлением класса '_active'
							setTimeout(function () {
								tooltip.classList.add('_active');
							}, 300);

							parent.addEventListener('mouseleave', function (e) {
								destroyTooltip();
							});
						}
					});
				}
			}
		}

		// Вызываем функцию init для запуска модуля всплывающих подсказок
		init();
	})();
}

//=======================================================
/* tooltip для parents test */
export function setTestDataTooltip() {
	const tooltipsMaineCoon = document.querySelectorAll(
		'#kittens-maine-coon .parents-spoilers-kittens__item ._tooltip'
	);

	const langAttribute = document.documentElement.lang;

	// MAINE-COON
	if (tooltipsMaineCoon.length) {
		tooltipsMaineCoon.forEach(tooltip => {
			// tooltip.classList.add('_show-after');
			if (langAttribute === 'ru') {
				tooltip.setAttribute(
					'data-tooltip',
					`<span><u><b>N/N&nbsp;&ndash; НЕГАТИВНЫЙ / НЕГАТИВНЫЙ</b></u><br>дефектных генов не&nbsp;обнаружено, особь без&nbsp;мутаций, болезнь у&nbsp;особи не&nbsp;проявится&nbsp;&ndash; нормальный генотип</span>
				<span><b>ГКМП/НСМ</b>&nbsp;&ndash; Гипертрофическая кардиомиопатия (сердечное заболевание)</span>
				<span><b>СМА/SMA</b>&nbsp;&ndash; Спинальная мышечная атрофия (поражение нейронов спинного мозга)</span>
				<span><b>PK def</b>&nbsp;&ndash; Дефицит эритроцитарной пируваткиназы кошек (врожденная гемолитическая анемия)</span>
				<span><b>Polydactyly Hw Allele</b>&nbsp;&ndash; Полидактилия (наличие большего числа пальцев на лапах)</span>`
				);
			} else if (langAttribute === 'lv') {
				tooltip.setAttribute(
					'data-tooltip',
					`<span><u><b>N/N &nbsp;&ndash; NEGATĪVS / NEGATĪVS</b></u><br>defektīvie ģēni nav konstatēti, indivīds bez mutācijām, slimība indivīdā neparādīsies&nbsp;&ndash; normāls genotips</span>
				<span><b>НСМ</b>&nbsp;&ndash; Hipertrofiskā kardiomiopātija (patoloģijas sirds slimība)</span>
				<span><b>SMA</b>&nbsp;&ndash; Muguras muskuļu atrofija (neironu zudumu skeleta muskulatūrā)</span>
				<span><b>PK def</b>&nbsp;&ndash; Piruvāta kināzes deficīts (iedzimta hemolītiska anēmija)</span>`
				);
			} else if (langAttribute === 'en-GB') {
				tooltip.setAttribute(
					'data-tooltip',
					`<span><u><b>N/N &nbsp;&ndash; NEGATIVE / NEGATIVE</b></u><br>no defective genes detected, individual without mutations, the individual will not develop a&nbsp;disease&nbsp;&ndash; normal genotype</span>
				<span><b>НСМ</b>&nbsp;&ndash; Hypertrophic cardiomyopathy (heart disease)</span>
				<span><b>SMA</b>&nbsp;&ndash; Spinal muscular atrophy (disease that causes the loss of the spinal-cord neurons)</span>
				<span><b>PK def</b>&nbsp;&ndash; Pyruvate kinase deficiency of erythrocyte (haemolytic anaemia)</span>
				<span><b>Polydactyly Hw Allele</b>&nbsp;&ndash; Polydactylism (having one or more extra toes on a paw)</span>`
				);
			}
		});
	}

	// ABYSSINIAN
	const tooltipsAbyssinian = document.querySelectorAll(
		'#kittens-abyssinian .parents-spoilers-kittens__item ._tooltip'
	);
	// SPHINX
	const tooltipsSphynx = document.querySelectorAll(
		'#kittens-sphynx .parents-spoilers-kittens__item ._tooltip'
	);

	function setTooltipData(tooltips) {
		tooltips.forEach(tooltip => {
			// tooltip.classList.add('_show-after');
			if (langAttribute === 'ru') {
				tooltip.setAttribute(
					'data-tooltip',
					`<span><u><b>N/N</b>&nbsp;&ndash; <b>НЕГАТИВНЫЙ / НЕГАТИВНЫЙ</b></u><br>Не&nbsp;несет аллель заболевания. Заболевание, ассоциированное с&nbsp;исследованной мутацией, не&nbsp;будет развиваться. Животное не&nbsp;передаст аллель заболевания потомству.</span>
				<span><b>PRA-rdAc</b>&nbsp;&ndash; Прогрессирующая атрофия сетчатки</span>
				<span><b>PK def</b>&nbsp;&ndash; Дефицит эритроцитарной пируваткиназы кошек (врожденная гемолитическая анемия)</span>`
				);
			} else if (langAttribute === 'lv') {
				tooltip.setAttribute(
					'data-tooltip',
					`<span><u><b>N/N</b>&nbsp;&ndash; <b>NEGATĪVS / NEGATĪVS</b></u><br>Nepārnēsā slimības alēli. Ar&nbsp;pētīto mutāciju saistītā slimība neattīstīsies. Dzīvnieks nenodos slimības alēli saviem pēcnācējiem.</span>
				<span><b>PRA-rdAc</b>&nbsp;&ndash; Progresējoša tīklenes atrofija</span>
				<span><b>PK def</b>&nbsp;&ndash; Kaķu eritrocītu piruvāta kināzes deficīts (iedzimta hemolītiska anēmija)</span>`
				);
			} else if (langAttribute === 'en-GB') {
				tooltip.setAttribute(
					'data-tooltip',
					`<span><u><b>N/N</b>&nbsp;&ndash; <b>NEGATIVE / NEGATIVE</b></u><br>Clear, not a&nbsp;carrier of&nbsp;the disease allele. The disease associated with the investigated mutation will not develop. The animal will not pass the disease allele on&nbsp;to&nbsp;its offspring.</span>
				<span><b>PRA-rdAc</b>&nbsp;&ndash; Retinal degeneration in cats</span>
				<span><b>PK def</b>&nbsp;&ndash; Pyruvate kinase deficiency of erythrocyte (haemolytic anaemia)</span>`
				);
			}
		});
	}
	setTooltipData(tooltipsAbyssinian);
	setTooltipData(tooltipsSphynx);
}
//=======================================================
export function tooltip0() {
	// const tooltipText = document.querySelectorAll('.item-kitten__header ._tooltip-text');

	const tooltips = document.querySelectorAll('.item-kitten__header ._tooltip');
	if (tooltips.length) {
		tooltips.forEach(tooltip => {
			const tooltipText = tooltip.parentElement.querySelector('._tooltip-text');
			tooltip.addEventListener('click', function () {
				console.log(tooltipText);

				tooltipText.style.visibility =
					tooltipText.style.visibility === 'visible' ? 'hidden' : 'visible';
			});
			window.addEventListener('scroll', function () {
				if (tooltipText.style.visibility === 'visible') {
					tooltipText.style.visibility = 'hidden';
				}
			});
		});
	}
	/* var tooltip = document.querySelector('.item-kitten__header .tooltip');

	tooltip.addEventListener('mouseenter', function () {
		tooltipText.style.visibility = 'visible';
		tooltipText.style.opacity = 1;
		tooltipText.style.top = '70%';
	});

	tooltip.addEventListener('mouseleave', function () {
		tooltipText.style.visibility = 'hidden';
		tooltipText.style.opacity = 0;
		tooltipText.style.top = '50%';
	}); */
}
//=======================================================
export function tooltip2() {
	let tooltipElem;

	function showTooltip(target, tooltipHtml) {
		console.log(target);
		// Создадим элемент для подсказки
		tooltipElem = document.createElement('div');
		tooltipElem.className = 'tooltip';
		tooltipElem.innerHTML = tooltipHtml;
		// document.body.append(tooltipElem);
		target.append(tooltipElem);
		// Добавьте tooltipElem внутрь элемента .item-kitten__header
		/* 	let itemHeader = target.closest('.item-kitten__header');
		console.log(itemHeader);
		if (itemHeader) {
			itemHeader.appendChild(tooltipElem);
		} */

		// Спозиционируем его сверху от аннотируемого элемента (top-center)
		let coords = target.getBoundingClientRect();

		let left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;
		if (left < 0) left = 0; // Не заезжать за левый край окна

		let top = coords.top - tooltipElem.offsetHeight - 5;
		if (top < 0) {
			// Если подсказка не помещается сверху, то отображать её снизу
			top = coords.top + target.offsetHeight + 5;
		}

		tooltipElem.style.left = left + 'px';
		tooltipElem.style.top = top + 'px';
	}

	function hideTooltip() {
		if (tooltipElem) {
			tooltipElem.remove();
			tooltipElem = null;
		}
	}

	// Добавим обработчики для событий мыши
	document.addEventListener('mouseover', function (event) {
		let target = event.target;
		let tooltipHtml = target.getAttribute('data-tooltip'); // Получаем значение атрибута data-tooltip
		if (tooltipHtml) {
			showTooltip(target, tooltipHtml);
		}
	});

	document.addEventListener('mouseout', function (event) {
		hideTooltip();
		// event.stopPropagation();
	});

	/* 	// Добавим обработчики для событий клика
	document.addEventListener('click', function (event) {
		let target = event.target;
		let tooltipHtml = target.getAttribute('data-tooltip'); // Получаем значение атрибута data-tooltip
		if (tooltipHtml) {
			showTooltip(target, tooltipHtml);
			// event.stopPropagation(); // Остановим всплытие события, чтобы клик на документе не сразу его скрыл
		}
	});
	// Добавим обработчик для скрытия подсказки при клике вне элемента с подсказкой
	document.addEventListener('click', function (event) {
		if (
			tooltipElem &&
			event.target !== tooltipElem &&
			!event.target.hasAttribute('data-tooltip')
		) {
			console.log('нет');
			hideTooltip();
		}
	}); */

	/* 	// Добавим обработчики для событий касания
	document.addEventListener('touchstart', function (event) {
		let target = event.target;
		let tooltipHtml = target.dataset.tooltip;
		if (tooltipHtml) {
			showTooltip(target, tooltipHtml);
		}
	});

	document.addEventListener('touchend', function (event) {
		hideTooltip();
	}); */
	// Функция для отображения подсказки при касании элемента
	function showTooltipOnMobile(event) {
		if (tooltipElem) {
			return; // Если подсказка уже отображается, выходим из функции
		}
		let target = event.target;

		// Если у нас есть подсказка...
		let tooltipHtml = target.dataset.tooltip;
		if (!tooltipHtml) return;

		// Создаем элемент для подсказки
		tooltipElem = document.createElement('div');
		tooltipElem.className = 'tooltip';
		tooltipElem.innerHTML = tooltipHtml;
		document.body.append(tooltipElem);

		// Спозиционируем его как в вашем оригинальном коде

		let coords = target.getBoundingClientRect();

		let left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;
		if (left < 0) left = 0; // Не заезжать за левый край окна

		let top = coords.top - tooltipElem.offsetHeight - 5;
		if (top < 0) {
			// Если подсказка не помещается сверху, то отображать её снизу
			top = coords.top + target.offsetHeight + 5;
		}

		tooltipElem.style.left = left + 'px';
		tooltipElem.style.top = top + 'px';

		// Явно указываем, что необходимо предотвратить действие по умолчанию
		// event.preventDefault();
	}

	// Добавляем обработчик для события "touchstart"
	// document.addEventListener('touchstart', showTooltipOnMobile);

	// Добавляем обработчик для события "touchend" для скрытия подсказки при окончании касания
	/* document.onmouseout = function (e) {
		if (tooltipElem) {
			tooltipElem.remove(); // Удалить элемент из DOM
			tooltipElem = null; // Установить ссылку на элемент в null
		}
	}; */
	document.addEventListener('touchend', function () {
		if (tooltipElem) {
			tooltipElem.remove();
			tooltipElem = null;
		}
	});
	// Добавляем обработчик события scroll
	window.addEventListener('scroll', function () {
		if (tooltipElem) {
			tooltipElem.remove();
			tooltipElem = null;
		}
	});
}
//=======================================================

//=======================================================
// модуль для tooltip
/* export function tooltip2() {
	let tooltipModule = function () {
		let flag = true;
		let tooltip = null;
		init();

		// принимаю HTMLElement, присваиваю ему текст, активный класс и координаты
		function createTooltip(parent) {
			let message = parent.getAttribute('data-comment');
			console.log(message);
			let coords = parent.getBoundingClientRect();
			tooltip = document.createElement('span');

			tooltip.innerHTML = message;
			tooltip.classList.add('active-comment');

			tooltip.style.left = coords.left + 'px';
			tooltip.style.top = coords.height + coords.top + 3 + 'px';

			parent.appendChild(tooltip);
			flag = false;
		}

		// получает все tooltip, созданные на странице и удаляет их
		function destroyTooltip() {
			let tooltips = document.querySelectorAll('.active-comment');

			for (let i = 0; i < tooltips.length; i++) {
				let tooltipParent = tooltip[i].parentElement;
				tooltipParent.removeChild(tooltip[i]);
			}
			flag = true;
		}

		// функция, с которой начинается инициализация и главная проверка
		function init() {
			let tooltipContainer = document.querySelectorAll('.js-span-comment');

			if (!tooltipContainer.length) {
				return;
			}

			// клик на весь документ с проверкой на data-атрибут
			document.addEventListener('click', function (e) {
				let dataComment = e.target.dataset.comment;
				let parent = e.target;

				if (dataComment && flag) {
					createTooltip(parent);
				} else if (e.target.classList.contains('active-comment')) {
				} else {
					destroyTooltip();
				}
			});

			window.addEventListener('scroll', function () {
				destroyTooltip();
			});

			if (window.innerWidth > 992) {
				for (let i = 0; i < tooltipContainer.length; i++) {
					tooltipContainer[i].addEventListener('mouseover', function (e) {
						let parent = this;

						if (flag) {
							createTooltip(parent);

							tooltip.addEventListener('mouseleave', function (e) {
								destroyTooltip();
							});
						}
					});
				}
			}
		}
	};
	tooltipModule();
} */

//=======================================================
/* // Включаем анимацию с помощью установки класса 'active'
			tooltip.classList.add('_active'); */
/* if (window.innerWidth > 768) {
				// Добавляем задержку перед добавлением класса '_active'
				setTimeout(function () {
					tooltip.classList.add('_active');
				}, 500);
			} else {
				tooltip.classList.add('_active');
			} */

/* let left = coords.left + (parent.offsetWidth - tooltip.offsetWidth) / 2;
			if (left < 0) left = 0; // Не заезжать за левый край окна

			let top = coords.top - tooltip.offsetHeight - 5;
			if (top < 0) {
				// Если подсказка не помещается сверху, то отображать её снизу
				top = coords.top + parent.offsetHeight + 5;
			}

			tooltip.style.left = left + 'px';
			tooltip.style.top = top + 'px'; */
//=======================================================

/* else if (e.target.classList.contains('_tooltip-comment')) {
				} */
// чтобы при клике на уже существующий tooltip ничего не происходило и при клике на другой tooltip тот закрывался, новый открывался
/* const tooltipCommentParent = parent.parentElement.querySelector('._tooltip-comment');
					if (!tooltipCommentParent) {
						destroyTooltip();
					} */

//=======================================================
/* const parent = e.target;
				console.log(parent); */

// const parentElement = parent.parentElement;
// console.log(parentElement);
// const tooltipCommentElement = parentElement.querySelector('._tooltip-comment'); // Ищем элемент с классом '_tooltip-comment' внутри родителя

/* 	const dataTooltip = e.target.dataset.tooltip;
				const targetSpan = e.target.closest('._tooltip');
				const parent = dataTooltip || (targetSpan ? targetSpan.parentElement : null);

				if (parent) {
					const parentElement = parent.parentElement;
					const tooltipCommentElement = parentElement.querySelector('._tooltip-comment');
					console.log(tooltipCommentElement);
				} else {
					console.log(
						'Не найдено ни data-tooltip, ни элемента с классом _tooltip в родительских элементах.'
					);
				} */
//=======================================================
/* if (window.innerWidth > 768) {
				tooltipContainer.forEach(function (container) {
					container.addEventListener('mouseenter', function (e) {
						if (flag) {
							const parent = e.target.closest('._tooltip'); // Найти ближайший элемент с классом _tooltip
							if (parent) {
								createTooltip(parent);

								parent.addEventListener('mouseleave', function (e) {
									destroyTooltip();
								});
							}
						}
					});
				});
			} */
