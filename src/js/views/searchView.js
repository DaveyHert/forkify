class SearchView {
  #parent = document.querySelector('.search');

  getQuery() {
    //   get search term of forms input value
    const query = this.#parent.querySelector('.search__field').value;
    // clear form afterwards
    this.#parent.querySelector('.search__field').value = '';
    // return the search term
    return query;
  }

  //   A subscriber publisher function that is passed a handler for its event
  addHandlerSearch(handler) {
    //   Add event listener to form
    this.#parent.addEventListener('submit', function (e) {
      e.preventDefault();
      //   call handler when triggered
      handler();
    });
  }
}

export default new SearchView();
