let cookie = "";
function useCookies() {
  function getCookie() {
    return cookie;
  }

  function setCookie(token) {
    cookie = token;
  }

  return { getCookie, setCookie };
}

export default useCookies;
