var dictionary = {
    "en": {
        // header
        "get-in-touch": "Get in touch",

        // page1
        "name": "i’m Dima <br> Gromov",
        "info": "middle <span>ux/ui designer</span> & <br> intern ios developer",

        // page2
        "h1-p2": "what i love",


        "card-1": "designing fun <em> user<br>interactions </em>",

        // no translate
        "card-2": "Figma",
        "card-3": ".html+.css",
        "card-4": "Swift UI",

        "card-5": "creating <em>new</em> and <br><em>fresh</em> ui",


        // page3
        "h1-p3": "places where i <br> gathered experience",
        "now": "now",

        // page4
        "h1-p4": "recent projects",
        //...

        // page5
        "h1-p5": "let's get in touch",
        "p-p5": "i'm wide open for new projects",
        "telegram": "Telegram",
        "email": "Email"
    },
    "ru": {
        // header
        "get-in-touch": "Связаться",

        // page1
        "name": "я Дима <br> Громов",
        "info": "middle <span>ux/ui дизайнер</span> и <br> intern iOS разработчик",

        // page2
        "h1-p2": "что я люблю",


        "card-1": "разрабатывать<br> уникальный <em> юзер <br> экспириенс</em>",

        "card-2": "Figma",
        "card-3": ".html+.css",
        "card-4": "Swift UI",

        "card-5": "создавать <em>новый</em> и <br><em>яркий</em> ui",


        // page3
        "h1-p3": "места, где я <br> набирался опыта",
        "now": "сейчас",

        // page4
        "h1-p4": "недавние проекты",

        // page5
        "h1-p5": "мои контакты",
        "p-p5": "я открыт для новых проектов",
        "telegram": "Телеграм",
        "email": "Почта"
    }
}

class HTMLLocalizer {
    constructor() {
        customElements.define('localized-text', LocalizedTextElement);
    }
}

class LocalizedTextElement extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        var key = this.hasAttribute('key') ? this.getAttribute('key') : '';
        var lang = this.hasAttribute('lang') ? this.getAttribute('lang') : this.getLang();
        this.innerHTML = this.translate(key, lang);
    }

    getLang() {
        var lang = (navigator.languages != undefined) ? navigator.languages[0] : navigator.language;
        // Ignore country code (example: en-US -> en)
        return lang.split("-")[0];
    }

    translate(key, lang) {
        return (lang in dictionary) ? dictionary[lang][key] : dictionary['_'][key];
    }
}

new HTMLLocalizer();




function switchLanguage() {
    var currentLang = document.documentElement.lang || 'en';
    var newLang = currentLang === 'en' ? 'ru' : 'en';
    document.documentElement.lang = newLang;
    updateTextLanguage(newLang);

    document.getElementById('lang-toggle').innerHTML = newLang === 'en' 
        ? `<p id="btn-context">EN</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path d="M1 1L6 6L11 1" stroke="#CCBFB0" stroke-width="1.5"/>
            </svg>`
        : `<p id="btn-context">RU</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path d="M1 1L6 6L11 1" stroke="#CCBFB0" stroke-width="1.5"/>
            </svg>`;
}

document.getElementById('lang-toggle').addEventListener('click', function() {
    switchLanguage();
});

window.onload = function() {
    var currentLang = document.documentElement.lang || 'en';
    document.documentElement.lang = currentLang;

    document.getElementById('lang-toggle').innerHTML = currentLang === 'en' 
        ? `<p id="btn-context">EN</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path d="M1 1L6 6L11 1" stroke="#CCBFB0" stroke-width="1.5"/>
            </svg>`
        : `<p id="btn-context">RU</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path d="M1 1L6 6L11 1" stroke="#CCBFB0" stroke-width="1.5"/>
            </svg>`;
};


function updateTextLanguage(lang) {
    var elements = document.querySelectorAll('localized-text');
    elements.forEach(function (element) {
        var key = element.getAttribute('key');
        element.innerHTML = dictionary[lang][key] || dictionary['_'][key];
    });
}