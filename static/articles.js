/**
 * Created by shuding on 5/23/15.
 * <ds303077135@gmail.com>
 */

;
(function () {
    var token = window.location.search.match(/=(.+)/)[1];
    var $container = $('#story-container');
    var prefix = 'http://localhost:8000/Anniversary110yr/Chitoge';
    var articles = [];
    var templateStr = '<li class="story" id="article-{{id}}">' + '<div class="author">' + '<p>{{name}}</p><span>{{year}}级毕业生</span>' + '</div>' + '<div class="content"><p>{{content}}{{image?"<br/><img class=\'figure\' src=\'"+image+"\'/>":""}}</p></div>' + '<div class="extra">' + '<span class="date">{{var t=new Date(created_at);t.toLocaleDateString()+" "+t.toLocaleTimeString();}}</span>' + '<a class="button up">赞</a>' + '<span class="up-number">{{starCount}}</span>' + '</div>' + '</li>';

    $.ajaxSetup({
        beforeSend: function(xhr) {
            function getCookie(name) {
                var cookieValue = null;
                if (document.cookie && document.cookie != '') {
                    var cookies = document.cookie.split(';');
                    for (var i = 0; i < cookies.length; i++) {
                        var cookie = jQuery.trim(cookies[i]);
                        if (cookie.substring(0, name.length + 1) == (name + '=')) {
                            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                            break;
                        }
                    }
                }
                return cookieValue;
            }
            xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
        }
    });

    var compileTemplate = function (data) {
        return templateStr.replace(/{{(.+?)}}/g, function (match, js) {
            with (data) {
                return eval(js);
            }
        });
    };

    var openPhotoSwipe = function (src) {
        var pswpElement = $('.pswp')[0];
        var items = [], options = {
                index:        0,
                shareButtons: [{
                    id:       'download',
                    label:    '下载图片',
                    url:      '{{raw_image_url}}',
                    download: true
                }, {id:    'facebook',
                    label: '分享到 Facebook',
                    url:   'https://www.facebook.com/sharer/sharer.php?u={{url}}'
                }, {id:    'twitter',
                    label: '分享到 Tweet',
                    url:   'https://twitter.com/intent/tweet?text={{text}}&url={{raw_image_url}}'
                }]
            };
        $('.figure').each(function (index, el) {
            var title = $(el).parent('p').text();
            items.push({
                src:   this.src,
                h:     this.naturalHeight,
                w:     this.naturalWidth,
                title: title
            });
            if (this.src == src) {
                options.index = index;
            }
        });
        var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };

    var fetchArticles = function () {
        if (fetchArticles.lock) {
            return false;
        }
        fetchArticles.lock = 1;
        setTimeout(function () {
            if (fetchArticles.lock == 2) {
                fetchArticles.lock = false;
            } else {
                fetchArticles.lock = 2;
            }
        }, 1000); // Request of 1000ms idle
        var offset = articles.length;
        $.get(prefix + '/article/list?offset=' + offset).success(function (data) {
            if (fetchArticles.lock == 2) {
                fetchArticles.lock = false;
            } else {
                fetchArticles.lock = 2;
            }
                articles = articles.concat(data);
                data.forEach(function (obj) {
                    var $newArticle = $(compileTemplate(obj));
                    $container.append($newArticle);
                    $newArticle.find('img').each(function () {
                        this.onclick = function () {
                            openPhotoSwipe(this.src);
                        };
                    });
                    $newArticle.find('.button.up').click(function () {
                        if (!$newArticle.find('.up-number').hasClass('liked')) {
                            $.post(prefix + '/star/' + obj.id + '/').success(function (data) {
                                $newArticle.find('.up-number').addClass('liked').html(data.starCount);
                            }).error(function (data) {
                                $newArticle.find('.up-number').addClass('liked');
                            });
                        } else {
                            $.post(prefix + '/unstar/' + obj.id + '/').success(function (data) {
                                $newArticle.find('.up-number').removeClass('liked').html(data.starCount);
                            }).error(function (data) {
                                $newArticle.find('.up-number').removeClass('liked')
                            });
                        }
                    });
                });
            });
    };

    $(document).ready(function () {

        fetchArticles();

        $(window).scroll(function () {
            if ($(window).scrollTop() > $(document).height() - $(window).height() - 100) {
                fetchArticles();
            }
        });
    });
})();
