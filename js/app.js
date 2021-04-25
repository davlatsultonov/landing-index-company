$(function () {
    const formTabBtns = $('.form-tab-btn');

    $('.form-tab-btn').on('click', function () {
        const buttonName = $(this).data('buttonName'),
              formInput = $(this).closest('.form').find('.form__bottom').find('.input');

        formInput.css('border-top-left-radius', $(this).hasClass('whatsapp') ? 0 : 4);
        formTabBtns.removeClass('active');
        $(this).addClass('active');
        formInput.attr('name', buttonName);
    });

    $('.js-feedback-toggle').click(function (e) {
        e.preventDefault();

        $('.modal-view').toggleClass('modal-view--open');
        $('.wrapper').toggleClass('modal-view--open');
    })

    let isValidMask = false;

    $('.phone-mask').mask('+7 (000) 000-00-00', {
        onComplete: function (cep) {
            isValidMask = true;
        },
        onInvalid: function (cep) {
            isValidMask = false;
        },

    });

    // Отправка заявки
    $('.js-zayavka').submit(function (e) {
        e.preventDefault();

        if (isValidMask) {
            ym(70783414,'reachGoal','mama_lead')
            VK.Goal('lead')
            fbq('track', 'Lead')

            $.post('/mail.php', $(this).serialize(), function (response) {
                if (response && response.status === false) {
                    alert(response.error);
                } else if (response && response.status === true) {
                    //alert(response.msg)
                    location.href = '/thanks'
                } else {
                    alert('Ошибка отправки. Пожалуйста свяжитесь с администратором!')
                }
            })
        }
    });
});
