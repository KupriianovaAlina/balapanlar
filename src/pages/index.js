import "./index.css";
import { PopupWithCourse } from "../components/PopupWithCourse.js";
import { PopupWithPartner } from "../components/PopupWithPartner.js";
import { PopupWithBurger } from "../components/PopupWithBurger.js";
import { checkScreenWidth } from "../components/headerState.js";
import { Tween } from "../components/tween.js";
import { scrollToAnchor } from "../utils.js/anchorLinkScroll.js";
// import { WhyTextChange } from "../components/WhyTextChange.js";


const cards = document.querySelectorAll(".course-card");

cards.forEach((card) => {
	if (card.querySelector(".course-card__list")) {
		const courseList = card.querySelector(".course-card__list");
		const items = courseList.querySelectorAll(".course-card__list-item");
		if (items.length > 1) {
			for (let i = 1; i < items.length; i++) {
				items[i].style.display = "none";
			}
		}
	}
});

const popupHeader = new PopupWithBurger(".popup_type_header");

checkScreenWidth(popupHeader);

window.addEventListener("resize", () => checkScreenWidth(popupHeader));

popupHeader.burgerButton.addEventListener(
	"mousedown",
	popupHeader.toggleBurgerMenu
);

const popup = new PopupWithCourse(".popup_type_course");

document.querySelectorAll(".course-card__popup-button").forEach((btn) => {
	btn.addEventListener("mousedown", () => {
		popup.open(btn.closest(".course-card").cloneNode(true).innerHTML);
	});
});

const popupPartner = new PopupWithPartner(".popup_type_partner");

const partners = document.querySelectorAll(".partners__partner-item");
partners.forEach((partner) => {
	partner.addEventListener("click", (evt) => {
		popupPartner.open(partner.cloneNode(true));
	});
});

const principlesTweenData = {
	selector: ".principles",
	horizontalShift: -66.66666666,
	triggerSelector: ".principles",
	pinState: true,
	tabletWidth: 768,
};

const principlesHeadingTweenData = {
	selector: ".principles__heading",
	horizontalShift: 66.66666666,
	triggerSelector: ".principles",
	pinState: false,
	tabletWidth: 768,
};

const whylikeTweenData = {
	selector: ".why-like__wrapper",
	horizontalShift: -70.5,
	triggerSelector: ".why-like__wrapper",
	pinState: true,
	tabletWidth: 768,
	snap: false,
};

const principlesTween = new Tween(principlesTweenData);
const principlesHeadingTween = new Tween(principlesHeadingTweenData);
const whylikeTween = new Tween(whylikeTweenData);

principlesTween.toggleTween();
principlesTween.toggleTween();
whylikeTween.toggleTween();

window.addEventListener("resize", principlesTween.toggleTween);
window.addEventListener("resize", principlesHeadingTween.toggleTween);
window.addEventListener("resize", whylikeTween.toggleTween);

document
	.querySelectorAll("[data-attribute-anchor]")
	.forEach((link) => scrollToAnchor(link));

/// часть, анимирующая раздел FAQ
const openButtons = document.querySelectorAll(".questions__button");

// функция, показывающая или скрывающая текст ответа
const openCloseAnswer = (answers) => {
	answers.forEach((answer) => {
		answer.classList.toggle("questions__text_shown");
	});
};

// функция, которая меняет в кнопке раскрытия + на -
const changeIcon = (openButton) => {
	openButton.textContent === "+"
		? (openButton.textContent = "-")
		: (openButton.textContent = "+");
};

// функция, изменяющая состояние области ответа
const changeStatusOfAnswer = (openButton) => {
	const openButtonParent = openButton.closest(".questions__element");
	const answers = openButtonParent.querySelectorAll(".questions__text");

	openCloseAnswer(answers);
	changeIcon(openButton);
};

// вешаем на каждую кнопку открытия ответа обработчик события
openButtons.forEach((openButton) => {
	openButton.addEventListener("click", function () {
		changeStatusOfAnswer(openButton);
	});
});

//открытие попапа секции Как Нас Найти (place)
const popupPlace = document.querySelector('.popup-place');
const placeOpenBtn = document.querySelector('.place__button') ;

placeOpenBtn.addEventListener('click', () => {
	popupPlace.classList.add('popup-place_opened')
});

function openPlace() {
	popupPlace.classList.remove('popup-place_opened');
};

const PlaceCloseBtn = document.querySelector('.popup-place__close-button')
PlaceCloseBtn.addEventListener('click', () => {
	openPlace()
});

popupPlace.addEventListener('click', (evt) => {
	openPlace()
});


// BM JS/ Создание класса динамического заголовка
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
			header.innerHTML = this.data.desktop;
		}

		else if (window.innerWidth > 600 && window.innerWidth < 768){
			header.innerHTML = this.data.tablet;

		}
		else if (window.innerWidth <= 600){
			header.innerHTML = this.data.mobile;
		}
	}
}

// Класс для адаптивного блока
class AdaptiveTextBlock {
	constructor(blockClass) {
		this.data = blockClass;
	}

		// Здесь начинаются методы
		toggleText = () => {
			const block = document.querySelector(this.data.selector);
			const statement = block.querySelector('.why-like__statement');
			const text = block.querySelector('.why-like__text');

			if (window.innerWidth > 768){
				statement.innerHTML = this.data.stDesktop;
				text.innerHTML = this.data.txtDesktop;

			}

			else if (window.innerWidth > 600 && window.innerWidth < 768){
				statement.innerHTML = this.data.stTablet;
				text.innerHTML = this.data.txtTablet;

			}
			else if (window.innerWidth <= 600){
				statement.innerHTML = this.data.stMobile;
				text.innerHTML = this.data.txtMobile;
			}
		}

}


const AdaptHeaderData = {
	selector: '.section-title_type_why-like',
	desktop: 'Почему вашему&nbsp;ребёнку понравится у&nbsp;нас',
	tablet: 'Почему вашему&nbsp;ребёнку понравится&nbsp;у&nbsp;нас',
	mobile: 'Почему вашему ребёнку понравится у&nbsp;нас'
};

const whyLikeAdaptiveHeader = new AdaptiveHeader (AdaptHeaderData);
whyLikeAdaptiveHeader.toggleText();
window.addEventListener("resize", whyLikeAdaptiveHeader.toggleText);

const AdaptBlockData1 = {
	// Оранжевый блок
	selector: '.why-like__item_back_orange',
	stDesktop: 'Самые&nbsp;современные и&nbsp;полные&nbsp;курсы',
	stTablet: 'Самые&nbsp;современные и&nbsp;полные&nbsp;курсы',
	stMobile: 'Самые современные и&nbsp;полные&nbsp;курсы',
	txtDesktop:'<ul class="why-like__tag-list"><li class="why-like__tag">python start</li><li class="why-like__tag">разработка web-сайтов</li><li class="why-like__tag">3D технологии</li><li class="why-like__tag">иностранные языки</li></ul>',
	txtTablet:'<ul class="why-like__tag-list"><li class="why-like__tag">python start</li><li class="why-like__tag">разработка web-сайтов</li><li class="why-like__tag">3D технологии</li><li class="why-like__tag">иностранные языки</li></ul>',
	txtMobile:'<ul class="why-like__tag-list"><li class="why-like__tag">python start</li><li class="why-like__tag">разработка web-сайтов</li><li class="why-like__tag">3D технологии</li><li class="why-like__tag">иностранные языки</li></ul>',
};

const whyLikeAdaptiveBlock1 = new AdaptiveTextBlock (AdaptBlockData1);
whyLikeAdaptiveBlock1.toggleText();
window.addEventListener("resize", whyLikeAdaptiveBlock1.toggleText);

const AdaptBlockData2 = {
	// Блок с тренером
	selector: '.why-like__item_back_podhod',
	stDesktop: 'В&nbsp;обучении&nbsp;используем 100%&nbsp;неформальный&nbsp;подход',
	stTablet: 'В&nbsp;обучении&nbsp;используем 100%&nbsp;неформальный подход',
	stMobile: 'В&nbsp;обучении используем&nbsp;100% неформальный подход',
	txtDesktop:'Мы&nbsp;даём&nbsp;студентам&nbsp;практику&nbsp;разработки собственного&nbsp;проекта&nbsp;для&nbsp;портфолио к&nbsp;концу&nbsp;курса',
	txtTablet:'Мы&nbsp;даём&nbsp;студентам&nbsp;практику разработки&nbsp;собственного&nbsp;проекта для&nbsp;портфолио&nbsp;к концу&nbsp;курса',
	txtMobile:'Мы даём студентам практику разработки собственного проекта для портфолио к концу курса',
};

const whyLikeAdaptiveBlock2 = new AdaptiveTextBlock (AdaptBlockData2);
whyLikeAdaptiveBlock2.toggleText();
window.addEventListener("resize", whyLikeAdaptiveBlock2.toggleText);

const AdaptBlockData3 = {
	// Блок небесного цвета
	selector: '.why-like__item_back_blue',
	stDesktop: 'Уютное&nbsp;место&nbsp;для&nbsp;тех, кто&nbsp;хочет&nbsp;прийти&nbsp;до&nbsp;занятий или&nbsp;остаться&nbsp;после&nbsp;них',
	stTablet: 'Уютное&nbsp;место&nbsp;для&nbsp;тех, кто&nbsp;хочет&nbsp;прийти до&nbsp;занятий или&nbsp;остаться&nbsp;после&nbsp;них',
	stMobile: 'Уютное&nbsp;место для&nbsp;тех,&nbsp;кто&nbsp;хочет прийти&nbsp;до&nbsp;занятий или&nbsp;остаться после&nbsp;них',
	txtDesktop:'Студенты&nbsp;могут&nbsp;сами&nbsp;дойти до&nbsp;нашего&nbsp;центра&nbsp;и&nbsp;домой',
	txtTablet:'Студенты&nbsp;могут&nbsp;сами&nbsp;дойти до&nbsp;нашего&nbsp;центра&nbsp;и&nbsp;домой',
	txtMobile:'Студенты&nbsp;могут&nbsp;сами дойти&nbsp;до&nbsp;нашего&nbsp;центра и&nbsp;домой',
};

const whyLikeAdaptiveBlock3 = new AdaptiveTextBlock (AdaptBlockData3);
whyLikeAdaptiveBlock3.toggleText();
window.addEventListener("resize", whyLikeAdaptiveBlock3.toggleText);

const AdaptBlockData4 = {
	// Блок олимпиады
	selector: '.why-like__item_back_olimpiads',
	stDesktop: 'Участие&nbsp;в&nbsp;конкурсах и&nbsp;олимпиадах',
	stTablet: 'Участие&nbsp;в&nbsp;конкурсах и&nbsp;олимпиадах',
	stMobile: 'Участие в&nbsp;конкурсах и&nbsp;олимпиадах',
	txtDesktop:'',
	txtTablet:'',
	txtMobile:'',
};

const whyLikeAdaptiveBlock4 = new AdaptiveTextBlock (AdaptBlockData4);
whyLikeAdaptiveBlock4.toggleText();
window.addEventListener("resize", whyLikeAdaptiveBlock4.toggleText);

const AdaptBlockData5 = {
	//  Желтый блок лекции
	selector: '.why-like__item_back_yellow',
	stDesktop: 'Лекции,&nbsp;консультации и&nbsp;встречи&nbsp;с&nbsp;лучшими IT-экспертами&nbsp;для&nbsp;наших студентов',
	stTablet: 'Лекции,&nbsp;консультации и&nbsp;встречи&nbsp;с&nbsp;лучшими&nbsp;IT- экспертами для&nbsp;наших&nbsp;студентов',
	stMobile: 'Лекции, консультации и&nbsp;встречи с&nbsp;лучшими&nbsp;IT- экспертами для&nbsp;наших студентов',
	txtDesktop:'',
	txtTablet:'',
	txtMobile:'',
};

const whyLikeAdaptiveBlock5 = new AdaptiveTextBlock (AdaptBlockData5);
whyLikeAdaptiveBlock5.toggleText();
window.addEventListener("resize", whyLikeAdaptiveBlock5.toggleText);
