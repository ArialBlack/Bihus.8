(function ($) {
    $(function() {

        var resizeTimer;

        function pdfLink2Iframe() {
            var $pdfLink = $('article .paragraph--type--pdf .file-link a');
            //console.log($pdfLink);

            $pdfLink.each(function( index ) {

                var $iframe = '<iframe src="' + $(this).attr('href') + '" width="100%" height="600"></iframe>';

                //console.log('<iframe scr="' + $(this).attr('href') + '" width="100%" height="600"></iframe>');

                $('article .paragraph--type--pdf').before($iframe);

            });
        }
        
        $( document ).ready(function() {


           console.log('run!');
            pdfLink2Iframe();

            var $imagesNames = $('.paragraph--type--gallery .field--name-field-media-images .field--item img');
            console.log();

            $('.paragraph--type--gallery .field--name-field-media-images').fotorama({
                width: 700,
                maxwidth: '100%',
                ratio: 16/9,
                allowfullscreen: true,
                nav: 'thumbs'
            });

            var $c = 0;
            var $thumbs = $('.fotorama__thumb');
            console.log($thumbs);
            $thumbs.each(function( index ) {
                $(this).css({
                    'background-image': 'url("'+ $($imagesNames[$c]).attr('srcset') + '")',
                });
                $c++;
            });


            //http://bihus.d8/sites/default/files/styles/media_thumbnail/public/2017-02/pfukfdjydgmuz_0.png?itok=UYRsaKvO
           

        });

        $(window).on('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {

            }, 250);
        });
         
    });
}(jQuery));