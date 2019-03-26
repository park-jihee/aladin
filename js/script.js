var title = '';
getThisTitle();

window.addEventListener("hashchange", function () {
  getThisTitle();
}, false);

function getThisTitle() {
  if(location.href.split('#').length == 2) {
    title = decodeURI(location.href.split('#')[1]); 
    $('#title').val(title);
    getinformation(title);
  }
}

$('#title').on('change', function () {
  var thisTitle = $(this).val();
  if (title != thisTitle) {
    location.href = 'search.html#' + encodeURI(thisTitle);
    title = thisTitle;
  }
  getinformation(title);
});

function getinformation(title) {
  $('.list li').remove();
  $('.result').text('');

  var search = title ? title : "";
  var ttbkey = 'ttbysasm21451849002';
  var url = 'http://www.aladin.co.kr/ttb/api/ItemSearch.aspx';
  url += '?' + encodeURIComponent('ttbkey') + '=' + ttbkey;
  url += '&' + encodeURIComponent('QueryType') + '=' + encodeURIComponent('Title');
  url += '&' + encodeURIComponent('Version') + '=' + encodeURIComponent('20131101');
  url += '&' + encodeURIComponent('Query') + '=' + encodeURIComponent(search);

  $.get(url, function (res) {
    var items = $(res).find('item');
    var result = '"<b>' + search + '</b>" 검색결과 입니다.';
    for (var i = 0; i < items.length; i++) {
      var title = $(items[i]).find('title').text();
      var author = $(items[i]).find('author').text();
      var cover = $(items[i]).find('cover').text();
      var customerReviewRank = $(items[i]).find('customerReviewRank').text();
      var isbn13 = $(items[i]).find('isbn13').text();
      var code = '<li class="list-item" onclick="ask(' + isbn13 + ');">' +
        '<img src="' + cover + '">' +
        '<div class="content">' +
        '<p>' + title + '</p>' +
        '<p>' + author + '</p>' +
        '<span class="star-prototype"></span>' +
        '<input id="star" type="hidden" value="' + customerReviewRank + '">';
        '</div>' +
        '</li>';
      $('.list').append(code);
      if (i == items.length - 1) {
        $('.result').append(result);
      }
    }
    var starProto = $('#star');
    var star = '';
    for (let i = 0; i < starProto.length; i++) {
      console.log($(starProto)[i].val);
      for (let j = 0; j < starProto; j++) {
        star += "<img src='./img/star.png' width='20px'/>"
      }
      $('.star-prototype').append(star);
    }
  });
}

function ask(isbn) {
  location.href = "ask.html?isbn=" + isbn;
}
