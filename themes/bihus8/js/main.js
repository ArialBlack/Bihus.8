(function ($) {
    $(function() {

        var resizeTimer,
            panel = $( "#authors-panel" ),
            panelOffset;

        function createCookie(name,value,days) {
            if (days) {
                var date = new Date();
                date.setTime(date.getTime()+(days*24*60*60*1000));
                var expires = "; expires="+date.toGMTString();
            }
            else var expires = "";
            document.cookie = name+"="+value+expires+"; path=/";
        }

        function readCookie(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for(var i=0;i < ca.length;i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1,c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
            }
            return null;
        }

        function eraseCookie(name) {
            createCookie(name,"",-1);
        }

        function pdfLink2Iframe() {
            var $pdfPar = $('article .paragraph--type--pdf');
            $pdfPar.each(function( index ) {
                var $pP = $(this),
                    $pdfLink = $pP.find('.file-link a');

                $pdfLink.each(function( index ) {
                    var $iframe = '<div class="pdf-frame"><iframe src="' + $(this).attr('href') + '" width="100%" height="600"></iframe></div>';
                    $pP.before($iframe);
                });
            });

        }

        function link2Coub() {
            var $coubLink = $('article .paragraph--type--coub .field--name-field-link a');

            if (!$('body').hasClass('context-follow-bihus')) {
                $coubLink.each(function( index ) {
                    var $this = $(this),
                        src = $this.attr('href'),
                        pos = src.lastIndexOf('/'),
                        id = src.substring(pos + 1),
                        $iframe = '<iframe src="//coub.com/embed/' + id + '?muted=false&autostart=false&originalSize=false&startWithHD=false" allowfullscreen="true" frameborder="0" width="100%" height="600"></iframe>';
                    $this.parent('.field--item').html($iframe);
                });
            } else {
                var coubs = ["6p6tx",
                    "f2vob",
                    "d9bz5",
                    "5xpll",
                    "8l616",
                    "18cvg",
                    "6p6tx",
                    "8ums2",
                    "5vw3s",
                    "6pus0",
                    "3wt3j260",
                    "40aen",
                    "hfd6jk",
                    "6p6tx",
                    "bwkbfs8",
                    "ch6g28q"];

                var coubID = coubs[Math.floor(Math.random()*coubs.length)];

                $coubLink.each(function( index ) {
                    var $this = $(this),

                        $iframe = '<iframe src="//coub.com/embed/' + coubID + '?muted=false&autostart=false&originalSize=false&startWithHD=false" allowfullscreen="true" frameborder="0" width="100%" height="500"></iframe>';
                    $this.parent('.field--item').html($iframe);
                });
            }

        }

        function buildJsSubmenu() {
            var $select = $('.view-news .views-exposed-form select option'),
                links = [],
                c = 0,
                $html = '<ul class="news-submenu">';

            $select.each(function( index ) {
                c++;
                var $this = $(this),
                    value = $this.val(),
                    text = $this.text();

                if (value == 'All') {
                    links[c] = '<li><a data-value="' + value + '">Всі новини</a></li>';
                } else {
                    links[c] = '<li><a data-value="' + value + '">' + text + '</a></li>';
                }
                $html = $html + links[c];
            });
            $html = $html + '</ul>';
            $('#block-newsjsmenu .field--name-field-link .field--item').html($html);
        }

        //fill front-news active topic more-link
        function _fillNewsHeader () {
            var $attachHeader = $('.view-id-news .attachment .view-header'),
                select = $('.view-news .views-exposed-form select').val(),
                link = '';

            if(select == 'All') {
                link = '/news/all'
            } else {
                link = '/taxonomy/term/' + select;
            }
            $attachHeader.html('<a href="' + link + '">Більше новин <i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>');
        }

        $( document ).on( "click", ".news-submenu a", function() {
            var $this = $(this),
                value = $this.data('value'),
                $select = $('.view-id-news .views-exposed-form select'),
                $attachHeader = $('.view-id-news .attachment .view-header');

            $select.val(value);

            $('form.views-auto-submit-full-form .views-auto-submit-click').click();
        });

        function makeFotorama() {

            var $gallImages = $('.paragraph--type--gallery .field--name-field-media-images article .field--name-field-image');
            $gallImages.each(function( index ) {
                var $this = $(this),
                    $picture = $this.find('picture'),
                    $pictureSet = $picture.find('source')[0],
                    isrc= $($pictureSet).attr('srcset'),
                    $big = isrc.replace("styles/media_image_mobile/public/", "");
                $this.append( "<img class='zoomimg' src='" + $big + "' />" );
            });

            var $fotoramas=$('.paragraph--type--gallery .media-gallery'),
                $images = [],
                i = 0;

            $fotoramas.each(function( index ) {
                $images[i]= $(this).find('picture img');
                i++;
            });

            $('.paragraph--type--gallery .field--name-field-media-images').fotorama({
                width: '100%',
                maxwidth: '100%',
                ratio: 16/9,
                allowfullscreen: true,
                nav: 'thumbs'
            });

            i = 0;
            $fotoramas.each(function( index ) {
                var $thumbs = $(this).find('.fotorama__thumb'),
                    c = 0;
                $thumbs.each(function( index ) {
                    var tsrc = $($images[i][c]);
                    $(this).css({
                        'background-image': 'url("'+ $(tsrc).attr('srcset') + '")'
                    });
                    c++;
                });
                i++;
            });
        }

        function variousActions() {
            $('.view-team.view-display-id-attachment_1 h2')
                .addClass('more-link')
                .attr('data-toggle', 'collapse')
                .attr('aria-expanded', 'false')
                .attr('aria-controls', 'notWorkingJ')
                .attr('href', '#notWorkingJ');

            $('.view-team.view-display-id-attachment_1 .view-content')
                .addClass('collapse')
                .attr('id', 'notWorkingJ');

            $('.path-projects .view-projects.view-display-id-attachment_1 .view-content')
                .addClass('collapse')
                .attr('id', 'archiveP');
        }

        $( document ).ready(function() {
           //console.log('--------------run!');
            variousActions();
            buildJsSubmenu();
            makeFotorama();
            panelOffset = panel.offset();

            pdfLink2Iframe();
            link2Coub();

            $('.field--name-body p').each(function( index ) {
                if($(this).find('img').length == 1) {
                    $(this).addClass('one-image');
                }
            });

            $('.field--name-body table').each(function( index ) {
                $(this).addClass('table table-condensed table-bordered table-hover table-striped').wrap( "<div class='table-responsive'></div>" );
            });

        });

        $(window).on('load', function() {
            if($('.page-node-type-article article.show-popup').length > 0) {
                var visited = readCookie('visitedBihus');

                if (!visited || visited !== "true") {
                    createCookie('visitedBihus', "true", 30);
                    $('.subscribe-popup.modal').modal('show');
                }
            }
        });

        $(window).on('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
            }, 250);
        });

        $(window).scroll(function(){
            var scrolled = $(document).scrollTop();
            //console.log(scrolled);
            if($( "#authors-panel" ).length > 0) {
                if (scrolled >= panelOffset.top && $(document).height() > 2000) { //todo
                    $( "#authors-panel" ).addClass('ffix');
                } else {
                    $( "#authors-panel" ).removeClass('ffix');
                }
            }

        });

        $(document).ajaxStop(function() {
            //console.log('ajaxStop');
           // setTimeout('reInit',3000);
            _fillNewsHeader ();
        });

        $('#block-exposedformsearchpage-1 input')
            .focus(function() {
                $('body').addClass('search-focus');
            })
            .focusout(function() {
                $('body').removeClass('search-focus');
            });
         
    });
}(jQuery));