const config = {
  Url: "https://nomoreparties.co/v1/wff-cohort-8",
  headers: {
    authorization: "fb3eb883-7ac4-4273-84f2-c6471c46b3b2",
    "Content-Type": "application/json",
  },
};

const updateUserAvatar = (avatar) => {
  return fetch(`${config.Url}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar,
    }),
  }).then(handleResponse);
};

const unLikeCard = (cardID) => {
  return fetch(`${config.Url}/cards/likes/${cardID}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleResponse);
};

const likeCard = (cardID) => {
  return fetch(`${config.Url}/cards/likes/${cardID}`, {
    method: "PUT",
    headers: config.headers,
  }).then(handleResponse);
};

const getInitialCards = () => {
  return fetch(`${config.Url}/cards`, {
    method: "GET",
    headers: config.headers,
  }).then(handleResponse);
};

const getUserData = () => {
  return fetch(`${config.Url}/users/me`, {
    method: "GET",
    headers: config.headers,
  }).then(handleResponse);
};

// const updateUserProfile = (name, job) => {
//   return fetch(`${config.Url}/users/me`, {
//     method: "PATCH",
//     headers: config.headers,
//     body: JSON.stringify({
//       name: name,
//       about: job,
//     }),
//   }).then(handleResponse);
// };

function updateUserProfile (name, about) {
  return getUserData("users/me", "PATCH", { name: name, about: about });
}

const addNewCard = (name, link) => {
  return fetch(`${config.Url}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then(handleResponse);
};

const deleteCard = (cardID) => {
  return fetch(`${config.Url}/cards/${cardID}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleResponse);
};

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

export {
  updateUserAvatar,
  unLikeCard,
  likeCard,
  updateUserProfile,
  addNewCard,
  deleteCard,
  getUserData,
  getInitialCards,
};
