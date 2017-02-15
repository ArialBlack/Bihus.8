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
           

        });

        $(window).on('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {

            }, 250);
        });
         
    });
}(jQuery));