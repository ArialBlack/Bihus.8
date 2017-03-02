(function ($) {
    $(function() {

        var resizeTimer,
            panel = $( "#authors-panel" ),
            panelOffset;


        function pdfLink2Iframe() {
            var $pdfLink = $('article .paragraph--type--pdf .file-link a');
            //console.log($pdfLink);

            $pdfLink.each(function( index ) {

                var $iframe = '<div class="pdf-frame"><iframe src="' + $(this).attr('href') + '" width="100%" height="600"></iframe></div>';

                //console.log('<iframe scr="' + $(this).attr('href') + '" width="100%" height="600"></iframe>');

                $('article .paragraph--type--pdf').before($iframe);

            });
        }

        function link2Coub() {
            var $coubLink = $('article .paragraph--type--coub .field--name-field-link a');

            $coubLink.each(function( index ) {
                var $this = $(this),
                    src = $this.attr('href'),
                    pos = src.lastIndexOf('/'),
                    id = src.substring(pos + 1),
                    $iframe = '<iframe src="//coub.com/embed/' + id + '?muted=false&autostart=false&originalSize=false&startWithHD=false" allowfullscreen="true" frameborder="0" width="100%" height="600"></iframe>';

                $this.parent('.field--item').html($iframe);
            });
        }

        function buildJsSubmenu() {
            var $select = $('.view-id-news select#edit-project option'),
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

            $('#block-newsjsmenu .field--name-field-link').html($html);

        }

        function _fillNewsHeader () {
            //fill front-news active topic more-link

            var $attachHeader = $('.view-id-news .attachment .view-header'),
                select = $('.view-id-news select').val(),
                link = '';

            if(select == 'All') {
                link = '/news'
            } else {
                link = '/taxonomy/term/' + select;
            }

            $('<a href="' + link + '">Ще новини</a>').insertAfter( $attachHeader);
        }

        $( document ).on( "click", ".news-submenu a", function() {
            var $this = $(this),
                value = $this.data('value'),
                $select = $('.view-id-news select#edit-project'),
                $attachHeader = $('.view-id-news .attachment .view-header');

           // $select.find('option').removeAttr('selected');
            //$select.find('option[value="' + value + '"]').attr("selected",true);
            //console.log($select.find('option:selected').text());
            $select.val(value);

            $('form.views-auto-submit-full-form .views-auto-submit-click').click();
        });

        $( document ).ready(function() {
           console.log('--------------run!');
            buildJsSubmenu();

            panelOffset = panel.offset();

            pdfLink2Iframe();
            link2Coub();

            var $imagesNames = $('.paragraph--type--gallery .field--name-field-media-images .field--item img');
            console.log();

            $('.paragraph--type--gallery .field--name-field-media-images').fotorama({
                width: '100%',
                maxwidth: '100%',
                ratio: 16/9,
                allowfullscreen: true,
                nav: 'thumbs'
            });

            var $c = 0;
            var $thumbs = $('.fotorama__thumb');
            //console.log($thumbs);
            $thumbs.each(function( index ) {
                $(this).css({
                    'background-image': 'url("'+ $($imagesNames[$c]).attr('srcset') + '")',
                });
                $c++;
            });


            $('.field--name-body p').each(function( index ) {
                if($(this).find('img').length == 1) {
                    $(this).addClass('one-image');
                }
            });

            //$(this).css("color");


            //http://bihus.d8/sites/default/files/styles/media_thumbnail/public/2017-02/pfukfdjydgmuz_0.png?itok=UYRsaKvO
           

        });

        $(window).on('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {

            }, 250);
        });

        $(window).scroll(function(){

            var scrolled = $(document).scrollTop();
            //console.log(scrolled);
            if (scrolled >= panelOffset.top && $(document).height() > 2000) { //todo
                $( "#authors-panel" ).addClass('affix');
            } else {
                $( "#authors-panel" ).removeClass('affix');
            }
        });

        $(document).ajaxStop(function() {
            console.log('ajaxStop');
           // setTimeout('reInit',3000);
            _fillNewsHeader ();
        });
         
    });
}(jQuery));