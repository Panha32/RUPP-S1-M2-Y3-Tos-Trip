const gotoSearch = (link) => {
    let linkLocation = link.textContent;
    sessionStorage.setItem("linkText", linkLocation);
    location.href = 'search_result.html';
}