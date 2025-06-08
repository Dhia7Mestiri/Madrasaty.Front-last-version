export const phone = '[0-9]{2}\.?[0-9]{2}\.?[0-9]{2}\.?[0-9]{2}\.?[0-9]{2}';
// export const password = '^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8}$';

export const errDescrPassword         = "Le mot de passe ne peut pas être vide";
export const errDescrPasswordTooShort = "Le mot de passe doit au moins avoir 8 caractères";
export const errDescrPasswordTooLong  = "Le mot de passe doit au plus avoir 50 caractères";
export const errDescrPasswordNoNbr    = "Le mot de passe doit comporter au moins un chiffre";
export const errDescrPasswordNoLetter = "Le mot de passe doit comporter au moins une lettre";
export const errDescrPasswordNoLower  = "Le mot de passe doit comporter au moins une lettre en minuscule";
export const errDescrPasswordNoUpper  = "Le mot de passe doit comporter au moins une lettre en majuscule";
export const errDescrPasswordBadChar  = "Le mot de passe doit comporter au moins un caractère spécial";

export const errDescrPhone   = "Le numéro de téléphone doit comprendre entre 1 et 15 chiffres";
export const errDescrCountry = "Le code ISO du pays n'est pas reconnu";
export const errDescrDates   = "La date initiale doit précéder la date de la fin!";