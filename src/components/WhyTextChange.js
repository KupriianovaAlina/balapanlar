/* Нужно создать 2 класса, класс заголовка и класс блока
На класс блока должно передаваться 3 версии текста для заголовка блока и подзаголовка на все версии адаптивных устройств;
Функция должна подставлять необходимый текст в зависимости от ширины экрана. */

// Класс для адаптивного заголовка секции
class AdaptiveHeader {
	constructor(blockClass) {
		this.data = blockClass;
		/* Нужно получить сначала ... */
	}

	// Здесь начинаются методы
	toggleText = () => {
		const header = document.querySelector(this.data.selector);
		if (window.innerWidth > 768){
			header.innerHTML = '1';
		}

		else if (window.innerWidth > 600 && window.innerWidth < 768){
			header.innerHTML = '2';

		}
		else if (window.innerWidth <= 600){
			header.innerHTML = '3';
		}
	}
}

// Класс для адаптивного блока
class AdaptiveTextBlock {
	constructor(blockClass) {
		this.data = blockClass;
		/* Нужно получить сначала  */


	}

	// Здесь начинаются методы

}
