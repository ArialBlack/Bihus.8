(function ($) {
    $(function() {

        var resizeTimer;
        
        $( document ).ready(function() {


            /////////////////////////////////////
            var html = document.documentElement;
            var startSize =  parseInt(getComputedStyle(html, '').fontSize);

            up.onclick = function() {
                html.style.fontSize = parseInt(getComputedStyle(html, '').fontSize) + 2 + 'px';
            };
            down.onclick = function() {
                var currentSize = parseInt(getComputedStyle(html, '').fontSize);
                if (currentSize >= startSize + 2) {
                    html.style.fontSize = currentSize - 2 + 'px';
                }
            };
            /////////////////////////////////////

        });

        $(window).on('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {

            }, 250);
        });
         
    });
}(jQuery));