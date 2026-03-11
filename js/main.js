class CharacterStory{
    #currentCharacterStoryIdx = 0;
    #characterStoryNum = 0;

    #characterStoryInterval = null;

    constructor() {
        this.#characterStoryNum = $('.character_story--js').length;

        this.#initPagination();

        this.#startTypeText();

        this.#setInterval();
    }

    #initPagination(){
        let c_this = this;

        if(c_this.#characterStoryNum > 1){
            $('.pagination--js', '.section_01--js').addClass('show');

            let characterStoryNum = c_this.#characterStoryNum;

            while(characterStoryNum--){
                $('.pagination--js', '.section_01--js').append("<div></div>");
            }

            $('.pagination--js div', '.section_01--js').eq(c_this.#currentCharacterStoryIdx).addClass('active');

            $('.pagination--js div', '.section_01--js').click(function() {
                c_this.#currentCharacterStoryIdx = $(this).index();
                c_this.#changeCharacterStory();

                clearInterval(c_this.#characterStoryInterval);
                c_this.#setInterval();
            });
        }
    }

    #startTypeText() {
        let c_this = this;

        $('.character_story--js').eq(c_this.#currentCharacterStoryIdx).find('.title--js img').removeClass('active');

        let currentTitleText = 0;

        setTitleTextWidth(this.#currentCharacterStoryIdx);
        function setTitleTextWidth(currentCharacterStoryIdx) {
            if(c_this.#currentCharacterStoryIdx != currentCharacterStoryIdx){
                return;
            }

            let imgEl = $('.character_story--js').eq(c_this.#currentCharacterStoryIdx).find('.title--js img').eq(currentTitleText);

            if(imgEl.length === 0){
                return;
            }

            imgEl.addClass('active');
            currentTitleText++;

            setTimeout(() => {
                setTitleTextWidth(currentCharacterStoryIdx);
            }, 200);
        }
    }

    #setInterval() {
        this.#characterStoryInterval = setInterval(() => {
            if(this.#currentCharacterStoryIdx + 1 >= this.#characterStoryNum){
                this.#currentCharacterStoryIdx = 0;
            }else{
                this.#currentCharacterStoryIdx++;
            }

            this.#changeCharacterStory();
        }, 5000);
    }

    #changeCharacterStory() {
        this.#startTypeText();

        $('.character_story--js').removeClass('active');
        $('.pagination--js div', '.section_01--js').removeClass('active');

        $('.character_story--js').eq(this.#currentCharacterStoryIdx).addClass('active');
        $('.pagination--js div', '.section_01--js').eq(this.#currentCharacterStoryIdx).addClass('active');
    }
}

$(() => {
    $('html, body').animate({ scrollTop: 0 });
    
    // ----- 共用 -----
    setTimeout(()=> {
        AOS.init();
    },100);

    let lastScrollTop = 0;

    window.addEventListener("scroll", ()=>{
        let currentScrollTop = window.scrollY || document.documentElement.scrollTop;

        setMenuActive(currentScrollTop);
        setCharacterStoryOpacity(currentScrollTop);
        setTestRideBtn(currentScrollTop);
        controlSection02Video(currentScrollTop);
        setChapterTitleImgActive(currentScrollTop);
        setSection03BackGround(currentScrollTop);
        controlSection04Video(currentScrollTop);

        lastScrollTop = currentScrollTop;
    }, 200);

    function openPopup(popupName) {
        $(`.${popupName}--js`).addClass('open');
        $('body').addClass('overflow_y_hidden');
    }

    function closePopup(popupName) {
        $(`.${popupName}--js`).removeClass('open');
        $('body').removeClass('overflow_y_hidden');
    }

    // header
    function setMenuActive(currentScrollTop) {
        let section01OffsetTop = 0;
        let section01OffsetBottom = section01OffsetTop + $('.section_01--js').outerHeight();

        let section02OffsetTop = Math.floor($('.section_02--js').offset().top);
        let section02OffsetBottom = section02OffsetTop + $('.section_02--js').outerHeight();

        let section02UPS01OffsetTop = Math.floor($('.chapter_box--js[data-chapter_id="0"]', '.section_02--js').offset().top);
        let section02UPS01OffsetBottom = section02UPS01OffsetTop + $('.chapter_box--js[data-chapter_id="0"]', '.section_02--js').outerHeight();

        let section02UPS02OffsetTop = Math.floor($('.chapter_box--js[data-chapter_id="1"]', '.section_02--js').offset().top);
        let section02UPS02OffsetBottom = section02UPS02OffsetTop + $('.chapter_box--js[data-chapter_id="1"]', '.section_02--js').outerHeight();

        let section02UPS03OffsetTop = Math.floor($('.chapter_box--js[data-chapter_id="2"]', '.section_02--js').offset().top);
        let section02UPS03OffsetBottom = section02UPS03OffsetTop + $('.chapter_box--js[data-chapter_id="2"]', '.section_02--js').outerHeight();

        let section02UPS04OffsetTop = Math.floor($('.chapter_box--js[data-chapter_id="3"]', '.section_02--js').offset().top);
        let section02UPS04OffsetBottom = section02UPS04OffsetTop + $('.chapter_box--js[data-chapter_id="3"]', '.section_02--js').outerHeight();

        let section03OffsetTop = Math.floor($('.section_03--js').offset().top);
        let section03OffsetBottom = section03OffsetTop + $('.section_03--js').outerHeight();

        function setActive(el, isChild){
            if(!el.hasClass('active')){
                if(isChild){
                    $('.item--js', '.menu--js').removeClass('active');
                }else{
                    $('li', '.menu--js').removeClass('active');
                    $('.item--js', '.menu--js').removeClass('active');
                }

                el.addClass('active');
            }
        }

        if(currentScrollTop >= section01OffsetTop && currentScrollTop <= section01OffsetBottom){
            setActive($('[data-section="1"]', '.menu--js'), false);
        }else if(currentScrollTop >= section02OffsetTop && currentScrollTop <= section02OffsetBottom){
            setActive($('[data-section="2"]', '.menu--js'), false);

            if(currentScrollTop >= section02UPS01OffsetTop && currentScrollTop <= section02UPS01OffsetBottom){
                setActive($('.item--js[data-item="0"]', '.menu--js'), true);
            }else if(currentScrollTop >= section02UPS02OffsetTop && currentScrollTop <= section02UPS02OffsetBottom){
                setActive($('.item--js[data-item="1"]', '.menu--js'), true);
            }else if(currentScrollTop >= section02UPS03OffsetTop && currentScrollTop <= section02UPS03OffsetBottom){
                setActive($('.item--js[data-item="2"]', '.menu--js'), true);
            }else if(currentScrollTop >= section02UPS04OffsetTop && currentScrollTop <= section02UPS04OffsetBottom){
                setActive($('.item--js[data-item="3"]', '.menu--js'), true);
            }
        }else if(currentScrollTop >= section03OffsetTop && currentScrollTop <= section03OffsetBottom){
            setActive($('[data-section="3"]', '.menu--js'), false);
        }

        if (currentScrollTop > lastScrollTop) {
            // 向下滾動
            $('header').addClass('hide');
        } else {
            // 向上滾動
            $('header').removeClass('hide');
        }
    }

    $('li', '.menu--js').click(function() {
        let section = $(this).data('section');

        if(section !== 2){
            $('.mob_menu--js').removeClass('active');
            $('body').removeClass('overflow_y_hidden');
        }

        switch(section){
            case 1:
                $('html, body').animate({ scrollTop: 0 }, 1000);
            break;
            case 3:
                $('html, body').animate({
                    scrollTop: $('.section_03--js').offset().top
                }, 1000);
            break;
        }
    });

    $('li .item--js', '.menu--js').click(function(event) {
        var itemId = $(this).data('item');

        $('html, body').animate({
            scrollTop: $(`.chapter_box--js[data-chapter_id="${itemId}"]`, '.section_02--js').offset().top
        }, 1000);

        $('.mob_menu--js').removeClass('active');
        $('body').removeClass('overflow_y_hidden');
    });

    $('.mob_menu_icon--js').click(() => {
        $('.mob_menu--js').addClass('active');
        $('body').addClass('overflow_y_hidden');
    });

    $('.close--js', '.mob_menu--js').click(() =>{
        $('.mob_menu--js').removeClass('active');
        $('body').removeClass('overflow_y_hidden');
    });

    $('.control_drop_down_menu--js', '.mob_menu--js').click(() =>{
        $('.control_drop_down_menu--js', '.mob_menu--js').toggleClass('open');
        $('.drop_down_menu--js', '.mob_menu--js').toggleClass('open');
    });

    // ----- section_01 -----
    new CharacterStory();

    function setCharacterStoryOpacity(currentScrollTop) {
        let start = 0;
        let end = 0;

        if(currentScrollTop > start){
            $('.section_01--js').addClass('hidden');

            if(currentScrollTop < end){
                let opacity = (((end - currentScrollTop) / (end - start))).toFixed(2);

                $('.section_01--js').css('opacity', opacity);
            }else{
                $('.section_01--js').css('opacity', 0);
            }
        }else{
            $('.section_01--js').removeClass('hidden');
            $('.section_01--js').css('opacity', 1);
        }
    }

    function setTestRideBtn(currentScrollTop) {
        if(currentScrollTop > 0){
            $('.test_ride_btn--js').addClass('active');
        }else{
            $('.test_ride_btn--js').removeClass('active');
        }
    }

    // ----- section_02 -----
    function controlSection02Video(currentScrollTop) {
        let video01El = $('.chapter_box--js[data-chapter_id="0"] .video--js', '.section_02--js');
        let video03El = $('.chapter_box--js[data-chapter_id="2"] .video--js', '.section_02--js');
        let video04El = $('.chapter_box--js[data-chapter_id="3"] .video--js', '.section_02--js');

        let chapterHeaderBox01El = $('.chapter_box--js[data-chapter_id="0"] .chapter_header_box--js', '.section_02--js');
        let chapterHeaderBox03El = $('.chapter_box--js[data-chapter_id="2"] .chapter_header_box--js', '.section_02--js');
        let chapterHeaderBox04El = $('.chapter_box--js[data-chapter_id="3"] .chapter_header_box--js', '.section_02--js');

        let video01OuterHeight       = Math.floor(video01El.outerHeight()) / 2;
        let chapterHeaderBox01Height = Math.floor(chapterHeaderBox01El.outerHeight());
        let chapterHeaderBox01Top    = Math.floor(chapterHeaderBox01El.offset().top);
        let chapterHeaderBox01Bottom = chapterHeaderBox01Height + chapterHeaderBox01Top;
        let video01StartPlayTop      = chapterHeaderBox01Top - 50;
        let video01EndPlayBottom     = chapterHeaderBox01Bottom - video01OuterHeight -50;

        let video03OuterHeight       = Math.floor(video03El.outerHeight()) / 2;
        let chapterHeaderBox03Height = Math.floor(chapterHeaderBox03El.outerHeight());
        let chapterHeaderBox03Top    = Math.floor(chapterHeaderBox03El.offset().top);
        let chapterHeaderBox03Bottom = chapterHeaderBox03Height + chapterHeaderBox03Top;
        let video03StartPlayTop      = chapterHeaderBox03Top - 50;
        let video03EndPlayBottom     = chapterHeaderBox03Bottom - video03OuterHeight -50;

        let video04OuterHeight       = Math.floor(video04El.outerHeight()) / 2;
        let chapterHeaderBox04Height = Math.floor(chapterHeaderBox04El.outerHeight());
        let chapterHeaderBox04Top    = Math.floor(chapterHeaderBox04El.offset().top);
        let chapterHeaderBox04Bottom = chapterHeaderBox04Height + chapterHeaderBox04Top;
        let video04StartPlayTop      = chapterHeaderBox04Top - 50;
        let video04EndPlayBottom     = chapterHeaderBox04Bottom - video04OuterHeight -50;

        function setVideoState(el, startPlay, endPlay) {
            if(currentScrollTop > startPlay && currentScrollTop < endPlay){
                el.play();
            }else{
                el.pause();
            }
        }

        if(video01El.length > 0){
            let arrangeVideo01EndPlayBottom = video01EndPlayBottom;

            if(window.screen.width <= 768){
                arrangeVideo01EndPlayBottom = arrangeVideo01EndPlayBottom - $('.chapter_box--js[data-chapter_id="0"] .additional_text_mob--js', '.section_02--js').outerHeight();
            }

            setVideoState(video01El[0], video01StartPlayTop, arrangeVideo01EndPlayBottom);
        }

        if(video03El.length > 0){
            let arrangeVideo03EndPlayBottom = video03EndPlayBottom;

            if(window.screen.width <= 768){
                arrangeVideo03EndPlayBottom = arrangeVideo03EndPlayBottom - $('.chapter_box--js[data-chapter_id="2"] .additional_text_mob--js', '.section_02--js').outerHeight();
            }

            setVideoState(video03El[0], video03StartPlayTop, arrangeVideo03EndPlayBottom);
        }

        if(video04El.length > 0){
            let arrangeVideo04EndPlayBottom = video04EndPlayBottom;

            if(window.screen.width <= 768){
                arrangeVideo04EndPlayBottom = arrangeVideo04EndPlayBottom - $('.chapter_box--js[data-chapter_id="3"] .additional_text_mob--js', '.section_02--js').outerHeight();
            }

            setVideoState(video04El[0], video04StartPlayTop, arrangeVideo04EndPlayBottom);
        }
    }

    function setSection02PaddingTop(){
        let stickyHeight    = $('.sticky_box--js .sticky').outerHeight()
        let stickyBoxHeight = stickyHeight * 1.2

        $('.sticky_box--js').css('height', stickyHeight * 1.2);
        $('.sticky_box--js').css('top', stickyHeight / 2);

        let paddingTop = stickyBoxHeight;

        $('.section_02--js').css('padding-top', paddingTop);
    }

    function setChapterTitleImgActive(currentScrollTop) {
        let windowHeight = window.innerHeight;
        let windowBottomHeight = windowHeight + currentScrollTop;

        let chapterTitleImg01El = $('.chapter_box--js[data-chapter_id="0"] .chapter_title_img--js', '.section_02--js');
        let chapterTitleImg02El = $('.chapter_box--js[data-chapter_id="1"] .chapter_title_img--js', '.section_02--js');
        let chapterTitleImg03El = $('.chapter_box--js[data-chapter_id="2"] .chapter_title_img--js', '.section_02--js');
        let chapterTitleImg04El = $('.chapter_box--js[data-chapter_id="3"] .chapter_title_img--js', '.section_02--js');

        let chapterTitleImg01OffsetTop = Math.floor(chapterTitleImg01El.offset().top) + 200;
        let chapterTitleImg01OffsetBottom= chapterTitleImg01OffsetTop + chapterTitleImg01El.outerHeight();

        let chapterTitleImg02OffsetTop = Math.floor(chapterTitleImg02El.offset().top) + 200;
        let chapterTitleImg02OffsetBottom= chapterTitleImg02OffsetTop + chapterTitleImg02El.outerHeight();

        let chapterTitleImg03OffsetTop = Math.floor(chapterTitleImg03El.offset().top) + 200;
        let chapterTitleImg03OffsetBottom= chapterTitleImg03OffsetTop + chapterTitleImg03El.outerHeight();

        let chapterTitleImg04OffsetTop = Math.floor(chapterTitleImg04El.offset().top) + 200;
        let chapterTitleImg04OffsetBottom= chapterTitleImg04OffsetTop + chapterTitleImg04El.outerHeight();

        if(chapterTitleImg01OffsetTop < windowBottomHeight && currentScrollTop < chapterTitleImg01OffsetBottom){
            chapterTitleImg01El.addClass('active');
        }else{
            chapterTitleImg01El.removeClass('active');
        }

        if(chapterTitleImg02OffsetTop < windowBottomHeight && currentScrollTop < chapterTitleImg02OffsetBottom){
            chapterTitleImg02El.addClass('active');
        }else{
            chapterTitleImg02El.removeClass('active');
        }

        if(chapterTitleImg03OffsetTop < windowBottomHeight && currentScrollTop < chapterTitleImg03OffsetBottom){
            chapterTitleImg03El.addClass('active');
        }else{
            chapterTitleImg03El.removeClass('active');
        }

        if(chapterTitleImg04OffsetTop < windowBottomHeight && currentScrollTop < chapterTitleImg04OffsetBottom){
            chapterTitleImg04El.addClass('active');
        }else{
            chapterTitleImg04El.removeClass('active');
        }
    }

    let webUpsImgInterval = [
        null,
        null,
        null,
        null,
    ];
    let mobUpsImgInterval = [
        null,
        null,
        null,
        null,
    ];
    function setWebUpsImgInterval(chapterId) {
        clearInterval(webUpsImgInterval[chapterId]);
        webUpsImgInterval[chapterId] = null;

        let chapterEl = $('.chapter_box--js[data-chapter_id=' + chapterId + ']');
        let imgNum    = $('.ups_img_list--js img', chapterEl).length;

        if(imgNum > 1){
            webUpsImgInterval[chapterId] = setInterval(() => {
                let showImg = $('.ups_img_list--js img.show', chapterEl);

                let index   = showImg.index();
                let nextIdx = 0;

                if(index + 1 < imgNum){
                    nextIdx = index + 1;
                }
    
                $('.ups_img_list--js img', chapterEl).eq(index).removeClass('show');
                $('.ups_img_list--js img', chapterEl).eq(nextIdx).addClass('show');
            }, 4000);
        }
    }
    function setMobUpsImgInterval(chapterId) {
        clearInterval(mobUpsImgInterval[chapterId]);
        mobUpsImgInterval[chapterId] = null;

        let chapterEl    = $('.chapter_box--js[data-chapter_id=' + chapterId + ']');
        let upsInfoBoxEl = $('.ups_info_box--js', chapterEl);
        let upsInfoEl    = $('.ups_info--js', upsInfoBoxEl);

        let currentUpsId = $(upsInfoBoxEl).data('current_ups_id');
        let currentUpsEl = $(upsInfoEl).eq(currentUpsId);

        let imgNum = $('.mob_ups_img_list--js img', currentUpsEl).length;

        if(imgNum > 1){
            mobUpsImgInterval[chapterId] = setInterval(() => {
                let showImg   = $('.mob_ups_img_list--js img.show', currentUpsEl);

                let index   = showImg.index();
                let nextIdx = 0;

                if(index + 1 < imgNum){
                    nextIdx = index + 1;
                }

                $('.mob_ups_img_list--js img', currentUpsEl).eq(index).removeClass('show');
                $('.mob_ups_img_list--js img', currentUpsEl).eq(nextIdx).addClass('show');
            }, 4000);
        }
    }

    setSection02AllUpsImgList();
    function setSection02AllUpsImgList() {
        setWebSection02UpsImgList(0);
        setWebSection02UpsImgList(1);
        setWebSection02UpsImgList(2);
        setWebSection02UpsImgList(3);

        setMobSection02AllUpsImgList();
    }
    function setWebSection02UpsImgList(chapterId) {
        let el = $('.ups_info_box--js', '.section_02--js').eq(chapterId)

        let currentUpsId = $(el).data('current_ups_id');
        let upsImgListEl = $('.ups_img_list--js', el);

        upsImgListEl.html('');
        upsList[chapterId][currentUpsId].imgUrlList.forEach((imgUrl, idx) => {
            let isShow = false;

            if(idx === 0){
                isShow = true;
            }

            upsImgListEl.append(`
                <img src="${imgUrl}" alt="ups_img" class="${isShow ? 'show' : ''}">
            `);
        });

        setWebUpsImgInterval(chapterId);
    }
    function setMobSection02AllUpsImgList() {
        let chapterEl = $('.chapter_box--js', '.section_02--js');

        chapterEl.each((chapterId, _chapterEl) => {
            $('.ups_info--js', _chapterEl).each((upsId, upsInfoEl) => {
                upsList[chapterId][upsId].imgUrlList.forEach((imgUrl, idx) => {
                    let isShow = false;

                    if(idx === 0){
                        isShow = true;
                    }

                    $('.mob_ups_img_list--js', upsInfoEl).append(`
                        <img src="${imgUrl}" alt="ups_img" class="${isShow ? 'show' : ''}">
                    `);
                });
            });

            setMobUpsImgInterval(chapterId);
        });
        
    }

    $('[alt="section_title"]', '.sticky_box--js').on('load', function() {
        setSection02PaddingTop();
    });
    setSection02PaddingTop();
    $(window).resize(function() {
        setSection02PaddingTop();
    });

    $('.ups_info_control--js', '.section_02--js').click(function() {
        let chapterId = $(this).parents('.chapter_box--js').data('chapter_id');
        let parentEl  = $(`.chapter_box--js[data-chapter_id="${chapterId}"]`);

        parentEl.find('.ups_info--js').removeClass('active');
        $(this).parents('.ups_info--js').addClass('active');

        let upsId = $(this).parents('.ups_info--js').data('ups_id');
        $('.ups_info_box--js', parentEl).data('current_ups_id', upsId);

        setWebSection02UpsImgList(chapterId);
        setMobUpsImgInterval(chapterId);
    });

    $('.control_sound--js', '.section_02--js').click(function() {
        $(this).toggleClass('open_sound');
        $(this).toggleClass('mute');

        let chapterId = $(this).parents('.chapter_box--js').data('chapter_id');
        let videoEl   = $(`.chapter_box--js[data-chapter_id="${chapterId}"] .video--js`, '.section_02--js')[0];

        if($(this).hasClass('mute')){
            videoEl.muted = true;
        }else{
            videoEl.muted = false;
        }
    });

    $('.control_sound--js', '.video_popup--js').click(function() {
        $(this).toggleClass('open_sound');
        $(this).toggleClass('mute');

        let videoEl = $(`.video--js`, '.video_popup--js')[0];

        if($(this).hasClass('mute')){
            videoEl.muted = true;
        }else{
            videoEl.muted = false;
        }
    });

    $('.maximize--js', '.section_02--js').click(function() {
        let chapterId = $(this).parents('.chapter_box--js').data('chapter_id');
        let videoEl   = $(`.chapter_box--js[data-chapter_id="${chapterId}"] .video--js`, '.section_02--js');

        let videoUrl = videoEl.children('source').attr('src');

        let videoCurrentTime = videoEl[0].currentTime;

        videoEl[0].pause();

        let popupVideoEl = $('.video--js', '.video_popup--js');

        $('.video_popup--js').data('current_chapter_id', chapterId);

        popupVideoEl.children('source').attr('src', videoUrl);
        popupVideoEl[0].load();

        openPopup('video_popup');

        popupVideoEl[0].currentTime = videoCurrentTime;
        popupVideoEl[0].play();
    });

    $('.minimize--js', '.video_popup--js').click(() => {
        let popupVideoEl = $('.video--js', '.video_popup--js');
        popupVideoEl[0].pause();
        popupVideoEl[0].muted = true;

        $('.control_sound--js', '.video_popup--js').addClass('open_sound');
        $('.control_sound--js', '.video_popup--js').removeClass('mute');

        closePopup('video_popup');

        let chapterId = $('.video_popup--js').data('current_chapter_id');

        if(chapterId === 'section_04'){
            let videoEl = $(`.video--js`, '.section_04--js');

            videoEl[0].currentTime = popupVideoEl[0].currentTime;
            videoEl[0].play();
        }else{
            let videoEl = $(`.chapter_box--js[data-chapter_id="${chapterId}"] .video--js`, '.section_02--js');

            videoEl[0].currentTime = popupVideoEl[0].currentTime;
            videoEl[0].play();
        }
    });

    let upsPopupImgInterval = null;
    function setUpsPopupInfo(chapterInfo, upsId) {
        let title         = chapterInfo[upsId].title;
        let content       = chapterInfo[upsId].content;
        let UpsImgListUrl = chapterInfo[upsId].imgUrlList;

        $('.ups_img--js', '.ups_popup--js').data('ups_id', upsId)

        $('.ups_popup--js').animate({ scrollTop: 0 });
        $('.title--js', '.ups_popup--js').html(title);
        $('.content--js', '.ups_popup--js').html(content);

        clearInterval(upsPopupImgInterval);
        $('.ups_img_list--js', '.ups_popup--js').html('');

        UpsImgListUrl.forEach((imgUrl, idx) => {
            let isShow = false;

            if(idx === 0){
                isShow = true;
            }

            $('.ups_img_list--js', '.ups_popup--js').append(`
                <img src="${imgUrl}" alt="ups_img" class="${isShow ? 'show' : ''}">
            `);
        });

        if(UpsImgListUrl.length > 1){
            upsPopupImgInterval = setInterval(() => {
                let $showImg = $('.ups_img_list--js img.show', '.ups_popup--js');
    
                let index   = $showImg.index();
                let nextIdx = 0;
    
                if(index + 1 < UpsImgListUrl.length){
                    nextIdx = index + 1;
                }
    
                $('.ups_img_list--js img', '.ups_popup--js').eq(index).removeClass('show');
                $('.ups_img_list--js img', '.ups_popup--js').eq(nextIdx).addClass('show');
            }, 4000);
        }
    }

    $('.open_ups_popup--js', '.section_02--js').click(function(){
        let chapterId = $(this).parents('.chapter_box--js').data('chapter_id');

        let chapterInfo = upsList[chapterId];
        let upsId       = $(this).parents('.ups_info_box--js').data('current_ups_id');

        let chapterTitleImgUrl = `./assets/img/popup/chapter${chapterId + 1}_title.svg`;
        $('.chapter_title_img--js', '.ups_popup--js').attr('src', chapterTitleImgUrl);

        $('.ups_popup--js').data('current_chapter_id', chapterId);

        setUpsPopupInfo(chapterInfo, upsId);

        openPopup('ups_popup');
    });

    $('.close_btn--js', '.ups_popup--js').click(() => {
        clearInterval(upsPopupImgInterval);
        upsPopupImgInterval = null;

        closePopup('ups_popup');
    });

    $('.prev--js', '.ups_popup--js').click(function() {
        let chapterId = $('.ups_popup--js').data('current_chapter_id');

        let chapterInfo = upsList[chapterId];
        let upsId       = $('.ups_img--js', '.ups_popup--js').data('ups_id');

        if(upsId == 0){
            upsId = chapterInfo.length - 1;
        }else{
            upsId--;
        }

        setUpsPopupInfo(chapterInfo, upsId);
    });

    $('.next--js', '.ups_popup--js').click(function() {
        let chapterId = $('.ups_popup--js').data('current_chapter_id');

        let chapterInfo = upsList[chapterId];
        let upsId       = $('.ups_img--js', '.ups_popup--js').data('ups_id');

        if(upsId == chapterInfo.length - 1){
            upsId = 0;
        }else{
            upsId++;
        }

        setUpsPopupInfo(chapterInfo, upsId);
    });

    // ----- section_03 -----
    function setSection03BackGround(currentScrollTop){
        let windowInnerHeight  = window.innerHeight;
        let section03OffsetTop = $('.section_03--js').offset().top;

        if(currentScrollTop + windowInnerHeight > section03OffsetTop + 300){
            $('.section_03--js').addClass('show_background');
        }else{
            $('.section_03--js').removeClass('show_background');
        }
    }

    //swiper loop 2&3 會有問題，做特別處理
    let swiperNews = news;
    if(swiperNews.length === 2 || swiperNews.length === 3){
        swiperNews = [...news, ...news];
    }

    swiperNews.forEach((newsInfo) => {
        let id            = newsInfo['id'];
        let title         = newsInfo['title'];
        let introduction  = newsInfo['introduction'];
        let videoImgUrl   = newsInfo['videoImgUrl'];
        let youtubeIframe = newsInfo['youtubeIframe'];

        let gaViewDetailClickEventName = newsInfo['gaViewDetailClickEventName'];

        let topEl = '';
        if(videoImgUrl){
            topEl = `
                <div class="img_box img_box--js">
                    <div class="start_btn">
                        <img src="./assets/img/icon/triangle.png" alt="news">
                    </div>
                    <img src="${videoImgUrl}" alt="news">
                </div>
            `;
        }else{
            topEl = `
                <div class="iframe_box">${youtubeIframe}</div>
            `;
        }

        $('.swiper-wrapper--js', '.section_03--js').append(`
            <div class="swiper-slide swiper-slide--js" data-id="${id}">
                ${topEl}

                <p class="title">${title}</p>

                <div class="content">
                    <p>${introduction}</p>
                    <button class="btn btn-red btn--js ${gaViewDetailClickEventName}">View Detail</button>
                </div>
            </div>
        `);
    });

    news.forEach((newsInfo) => {
        let id    = newsInfo['id'];
        let title = newsInfo['title'];

        let ganewsListClickEventName = newsInfo['ganewsListClickEventName'];

        $('.news_list--js', '.section_03--js').append(`
            <li data-id="${id}" class="${ganewsListClickEventName}">${title}</li>
        `);
    });

    if(news.length > 1){
        $('.pagination_total--js', '.section_03--js').text(news.length);

        new Swiper(".section_03_swiper--js", {
            slidesPerView: "auto",
            centeredSlides: true,
            spaceBetween: 40,
            loop: true,
            navigation: {
              nextEl: ".swiper-control-next--js",
              prevEl: ".swiper-control-prev--js",
            },
            on: {
                slideChange: function() {
                    let currentId = this.realIndex + 1;

                    //swiper loop 2&3 會有問題，做特別處理
                    if(news.length === 2 || news.length === 3){
                        if(currentId > news.length){
                            currentId = currentId - news.length;
                        }
                    }

                    $('.pagination_current--js', '.section_03--js').text(currentId);
                }
            }
        });

        $('li', '.section_03--js .news_list--js').click(function() {
            openNewsPopup($(this).data('id'), 'newsList');
        });
    }else{
        $('.section_03_swiper--js').addClass('no_swiper');
        $('.news_list--js').hide();
    }

    $('.img_box--js', '.section_03--js .swiper-wrapper--js').click(function() {
        openNewsPopup($(this).parents('.swiper-slide--js').data('id'));
    });
    $('.btn--js', '.section_03--js .swiper-wrapper--js').click(function() {
        openNewsPopup($(this).parents('.swiper-slide--js').data('id'), 'viewDetail');
    });

    function openNewsPopup(newsId, clickTpye){
        let newsInfo    = news[newsId];
        let newsContent = newsInfo['content'];

        let eventLabel = '';
        switch(clickTpye){
            case 'viewDetail':
                eventLabel = newsInfo['gaViewDetailClickEventName'];
                break;
            case 'newsList':
                eventLabel = newsInfo['ganewsListClickEventName'];
                break;
        }
        try{
            window.dataLayer.push({
                event: 'gtm.click',
                'gtm.elementClasses': eventLabel
            });
        }catch(e){
            console.log(e);
        }

        let popupBody = $('.news_popup--js .body');

        popupBody.append(`
            <div class="close_btn close_btn--js"></div>
            <p class="title">${newsInfo['title']}</p>
        `);

        $('.close_btn--js', '.news_popup--js').click(() => {
            let popupBody = $('.news_popup--js .body');
    
            popupBody.html('');
    
            closePopup('news_popup');
        });

        newsContent.forEach((data) => {
            if(!data.value) return;

            switch(data.type){
                case 'iframe':
                    popupBody.append(`
                        <div class="iframe_box">${data.value}</div>
                    `);
                    break;
                case 'video':
                    popupBody.append(`
                        <video class="video--js" controls autoplay muted playsinline="playsinline" preload="auto">
                            <source src="${data.value}" type="video/mp4" />
                        </video>
                    `);
                    break;
                case 'text':
                    popupBody.append(`
                        <p class="content">${data.value}</p>
                    `);
                    break;
                case 'newsOutline':
                    popupBody.append(`
                        <div class="with_title_box">
                            <div class="title">【新聞大綱】&emsp;</div>
                            <div class="content">${data.value}</div>
                        </div>
                    `);
                    break;
                case 'newsAndTechnology':
                    popupBody.append(`
                        <div class="with_title_box">
                            <div class="title">【新聞與技術】</div>
                            <div class="content">${data.value}</div>
                        </div>
                    `);
                    break;
                case 'currentCarModels':
                    popupBody.append(`
                        <div class="with_title_box">
                            <div class="title">【現售車款】&emsp;</div>
                            <div class="content">${data.value}</div>
                        </div>
                    `);
                    break;
                case 'img':
                    popupBody.append(`
                        <img src="${data.value}" alt="img">
                    `);
                    break;
                case 'img_list':
                    popupBody.append(`
                        <div class="img_list"></div>
                    `);

                    data.value.forEach((value) => {
                        popupBody.children('.img_list').append(`
                            <img src="${value}" alt="img">
                        `);
                    });
                    break;
            }
        });

        openPopup('news_popup');
    }

    // ----- section_04 -----
    function controlSection04Video(currentScrollTop) {
        let video01El = $('.video--js', '.section_04--js');

        let windowHeight = window.innerHeight / 2;
        let startPlayHeightMax = windowHeight + currentScrollTop + 100;
        let startPlayHeightMin = windowHeight + currentScrollTop - 200;

        let isVideo01Exist = video01El.length === 1;
        let video01OffsetTop = isVideo01Exist ? Math.floor($('.video--js', '.section_04--js').offset().top) : 0;
        let video01OffsetMiddle = isVideo01Exist ? video01OffsetTop + (video01El.outerHeight() / 2) : 0;

        function setVideoState(el, offsetMiddle) {
            if(offsetMiddle < startPlayHeightMax && offsetMiddle > startPlayHeightMin){
                el.play();
            }else{
                el.pause();
            }
        }

        if(isVideo01Exist){
            setVideoState(video01El[0], video01OffsetMiddle);
        }
    }

    $('.control_sound--js', '.section_04--js').click(function() {
        $(this).toggleClass('open_sound');
        $(this).toggleClass('mute');

        let videoEl = $(`.video--js`, '.section_04--js')[0];

        if($(this).hasClass('mute')){
            videoEl.muted = true;
        }else{
            videoEl.muted = false;
        }
    });

    $('.maximize--js', '.section_04--js').click(function() {
        let chapterId = 'section_04';
        let videoEl   = $(`.video--js`, '.section_04--js');

        let videoUrl = videoEl.children('source').attr('src');

        let videoCurrentTime = videoEl[0].currentTime;

        videoEl[0].pause();

        let popupVideoEl = $('.video--js', '.video_popup--js');

        $('.video_popup--js').data('current_chapter_id', chapterId);

        popupVideoEl.children('source').attr('src', videoUrl);
        popupVideoEl[0].load();

        openPopup('video_popup');

        popupVideoEl[0].currentTime = videoCurrentTime;
        popupVideoEl[0].play();
    });

});