/**
 * Created by shuding on 5/23/15.
 * <ds303077135@gmail.com>
 */
$(document).ready(function() {
    var api = '/Anniversary110yr/Chitoge/article/create/';
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

    $('#share-form')[0].onsubmit = function () {
        return false;
    };

    $('#form-image').on('change', function () {
        $('#share-form').addClass('attached');
        if ($('#form-image')[0].files.length) {
            var reader = new FileReader();
            reader.readAsDataURL($('#form-image')[0].files[0]);
            reader.onload = function(e){
                $('#pic-upload-wrapper').css('background-image', 'url("' + e.target.result + '")');
            };
        }
    });

    $('#share-form').validate({
        rules: {
            year: {
                required: true,
                date: true
            }
        },
        submitHandler: function(form) {
            var formData = new FormData();
            formData.append('name', form.elements.namedItem('form-name').value);
            formData.append('year', form.elements.namedItem('form-year').value);
            formData.append('content', form.elements.namedItem('form-content').value);
            if (form.elements.namedItem('form-image').files.length)
                formData.append('image', form.elements.namedItem('form-image').files[0]);
            var request = new XMLHttpRequest();
            request.addEventListener("progress", function () {
                document.title = '上传中' + ('...').substr((new Date()).getTime() % 3);
            }, false);
            request.addEventListener("load", function () {
                window.location.href = "/Anniversary110yr/Chitoge/articles/";
            }, false);
            request.open('POST', api);
            request.setRequestHeader("X-CSRFToken", cookieValue);
            request.send(formData);
        }
    });
});

jQuery.extend(jQuery.validator.messages, {
    required: "此处不可为空",
    date: "请输入正确的日期",
    maxlength: jQuery.validator.format("最多输入 {0} 字"),
    minlength: jQuery.validator.format("最少输入 {0} 字")
});
