import { ILanguage } from "@interfaces/language";

export const languages: ILanguage[] =
[
    { src: 'assets/media/flags/saudi-arabia.svg',  code: 'ar', name: 'العربية' },
    { src: 'assets/media/flags/united-states.svg', code: 'en', name: 'English'  },
    // --
    { src: 'assets/media/flags/turkey.svg',        code: 'tr', name: 'Türk'             },
    { src: 'assets/media/flags/indonesia.svg',     code: 'id', name: 'Bahasa Indonesia' },
    { src: 'assets/media/flags/pakistan.svg',      code: 'pk', name: 'Urdu'             },
    // --
    { src: 'assets/media/flags/germany.svg',       code: 'de', name: 'Deutsche' },
    { src: 'assets/media/flags/italy.svg',         code: 'it', name: 'Italiano' },
    { src: 'assets/media/flags/spain.svg',         code: 'sp', name: 'Español'  },
    { src: 'assets/media/flags/portugal.svg',      code: 'pt', name: 'Português' },
    { src: 'assets/media/flags/france.svg',        code: 'fr', name: 'Français'  },
    // --
    { src: 'assets/media/flags/japan.svg',         code: 'jp', name: '日本語'    },
    { src: 'assets/media/flags/china.svg',         code: 'cn', name: '简体中文'  },
];

export const languageWithArabicCharacters: string[] = ["ar", "pk"];