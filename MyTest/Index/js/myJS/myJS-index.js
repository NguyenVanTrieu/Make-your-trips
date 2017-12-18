$(document).ready(function () {
        var listLanguages = [
        "Hà Nội",
        "Ha Noi",
        "hà nội",
        "Ha Noi",
        "C",
        "C++",
        "Clojure",
        "COBOL",
        "ColdFusion",
        "Erlang",
        "Fortran",
        "Groovy",
        "Haskell",
        "Java",
        "JavaScript",
        "Lisp",
        "Perl",
        "PHP",
        "Python",
        "Ruby",
        "Scala",
        "Scheme"
    ];
    $("#key").autocomplete({
        source: listLanguages
    });

    var showChar = 47;
    $('.view > h3 > a').each(function() {
        var content = $(this).html();
        if(content.length > showChar) {
            var c = content.substr(0, showChar);
            var html = c + ' ...';
            $(this).html(html);
        }
 
    });
    var showCharAddress = 27;
    $('.view .adrs').each(function() {
        var contentAddress = $(this).html();
        if(contentAddress.length > showCharAddress) {
            var c = contentAddress.substr(0, showCharAddress);
            var html = c + ' ...';
            $(this).html(html);
        }
    });
});
var n=0;
function fadeLogin(){
    if(n==0){
        $('#login-dp').fadeIn(300);
        n++;
    }else{
        $('#login-dp').fadeOut(300);
        n--;
    }
}