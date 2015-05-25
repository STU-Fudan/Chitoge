/**
 * Created by shuding on 5/23/15.
 * <ds303077135@gmail.com>
 */
$(document).ready(function() {
    var api = 'http://localhost:8000/Anniversary110yr/Chitoge/article/create/';
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, 'csrftoken'.length + 1) == ('csrftoken' + '=')) {
                cookieValue = decodeURIComponent(cookie.substring('csrftoken'.length + 1));
                break;
            }
        }
    }

    $('#fullpage').fullpage({
        anchors:['welcome', 'share-story'],
        animateAnchor: false,
        recordHistory: true,
        paddingTop: '44px'
    });

    $('#share-form').validate({
        rules: {
            year: {
                required: true,
                date: true
            }
        },
        submitHandler: function(form) {
            var formData = new FormData(form);
            $.ajax({
                url: api,
                method: 'POST',
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("X-CSRFToken", cookieValue);
                },
                data: formData
            });
        }
    });
});

jQuery.extend(jQuery.validator.messages, {
    required: "此处不可为空",
    date: "请输入正确的日期",
    maxlength: jQuery.validator.format("最多输入 {0} 字"),
    minlength: jQuery.validator.format("最少输入 {0} 字")
});
