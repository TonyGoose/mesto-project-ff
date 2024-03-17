const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-8",
  headers: {
    authorization: "fb3eb883-7ac4-4273-84f2-c6471c46b3b2",
    "Content-Type": "application/json",
  },
};

function request(url, options) {
  return fetch(url, options).then(handleResponse);
}

const updateUserAvatar = (avatar) => {
  return request(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar,
    }),
  });
};

const unLikeCard = (cardID) => {
  return request(`${config.baseUrl}/cards/likes/${cardID}`, {
    method: "DELETE",
    headers: config.headers,
  });
};

const likeCard = (cardID) => {
  return request(`${config.baseUrl}/cards/likes/${cardID}`, {
    method: "PUT",
    headers: config.headers,
  });
};

const getInitialCards = () => {
  return request(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  });
};

const getUserData = () => {
  return request(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  });
};

const updateUserProfile = (name, job) => {
  return request(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: job,
    }),
  });
};

const addNewCard = (name, link) => {
  return request(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  });
};

const deleteCard = (cardID) => {
  return request(`${config.baseUrl}/cards/${cardID}`, {
    method: "DELETE",
    headers: config.headers,
  });
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

