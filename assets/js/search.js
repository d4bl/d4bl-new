
$(function(){

    $('.search').removeClass('highlight');

    $('.search-button').click(function(){
      $('.search-button').hide();
      $('.search-spiral, .close-search').show();
      $('.banner-link').hide();
    });

    $('.search-spiral, .close-search').click(function(){
      $('.search-button').show();
      $('.search-spiral, .close-search').hide();
      $('.banner-link').show();
      window.scrollTo(0, 0);
    });

     $('.search-button, .search-spiral, .close-search').click(function(){
        $('.search').toggle();
        $('.search-background-blur').toggleClass('blur');
        // $(this).toggleClass('search-button-focus');
        $('.ais-search-box--input').focus();
        $('#footer').toggle();

        // clear search string from url
        var clean_uri = location.protocol + "//" + location.host + location.pathname;
        window.history.replaceState({}, document.title, clean_uri);

        // $(this).text(function(i, text){
        //   return text === "Search" ? "Close" : "Search";
        // })
    });

    if (window.location.href.indexOf("?q=") > -1) {
      $('.search').show();
      $('.search-background-blur').addClass('blur');
      // $('.search-button').addClass('search-button-focus');
      // $('.ais-search-box--input').focus();
      // $('.ais-search-box--input').scrollTop = 999999;
      $('#footer, .search-button').hide();
    }
});

const search = instantsearch({
  appId: 'BR7W05XB5G',
  apiKey: 'e53a8465ffdeeb730fbc45160e984f65',
  indexName: 'tci',
  urlSync: true,
  searchParameters: {
    restrictSearchableAttributes: [
      'title',
      'content'
    ]
  },

  searchFunction: function(helper) {
    var searchResults = $('.search-results');
    var noResults = $('.no-results');
    if (helper.state.query === '') {
      searchResults.hide();
      noResults.show();
      return;
    }
    helper.search();
    searchResults.show();
    noResults.hide();
  }

});

const hitTemplate = function(hit) {
  const url = hit.url;
  const title = hit._highlightResult.title.value;
  const content = hit._highlightResult.html.value;
  const vocation = hit.vocation;
  const crop_image = hit.crop_image;
  const date = moment.unix(hit.date).format('MMM D, YYYY');

  if (hit.crop_image == null) {
    return `
      <div class="result-item">
        <h2><a class="post-link" href="${url}">${title}</a></h2>
        <div class="search-post-snippet">${content}</div>
        <div class="clearer"></div>
      </div>
    `;
  } else {
    return `
      <div class="result-item">
        <h2><a class="post-link" href="${url}">${title} <img class="search-crop-image" style="max-width:20px;" src="${crop_image}" /></a></h2>
        <div class="search-date">${date}</div>
        <div class="search-post-snippet">${content}</div>
        <div class="clearer"></div>
      </div>
    `;
  }

  if (hit.crop_image == null) {
    $('.search-crop-image').hide();
  }

  if (hit.date == null) {
    $('.search-date').hide();
  }
}

search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#search-searchbar',
    placeholder: '...'
  })
);

// search.addWidget(
//   instantsearch.widgets.hits({
//     container: '#search-hits',
//     templates: {
//       item: hitTemplate
//     }
//   })
// );

search.addWidget(
  instantsearch.widgets.infiniteHits({
    container: '#infinite-hits-container',
    templates: {
      empty: "Sorry, we couldn't anything matching your search. You can always view everything on TCI in the <a href=\"/archive\">archive</a>. <div class=\"search-snail\"></div>",
      showMoreLabel: 'More results',
      item: hitTemplate
    }
    // escapeHits: true,
  })
);

search.start();

// search.helper.on('result', function(res) {
//   if (res.crop_image == null) {
//     $('.search-crop-image').hide();
//     console.log('%%%%%%%');
//   }
//
//   if (res.date == null) {
//     $('.search-date').hide();
//   }
// });
