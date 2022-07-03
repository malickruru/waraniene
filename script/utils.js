const $ = (id) => {
  return document.getElementById(id);
};

const $$ = (classe) => {
  return document.querySelectorAll(classe);
};

const $_ = (classe) => {
  return document.querySelector(classe);
};