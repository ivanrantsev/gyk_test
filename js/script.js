let cart = {};

$('document').ready(function(){
    loadGoods();
});


function loadGoods() { 
    $.getJSON("data/products.json", function(data) {
        let out = "";
        for (let key in data) {
            let str = data[key].primaryImageUrl,
                newStr = str.substring(0, str.length - 4),
                modeImg = 'http:' + newStr + '_220x220_1.jpg';
            out += "<div class='single-goods'>";
            out += "<div class='good-img'><a href='#'><img alt='Изображение отсутствует' src = '" + modeImg + "'></a></div>";
            out += "<div class='good-info'><span class='code'>Код: " + (+data[key].code) + "</span>";
            if (data[key].isActive) {
                out += "<span class='availability availability-on'>В наличии</span>";
            } else {
                out += "<span class='availability availability-off'>Товар отсутствует</span>";
            } 
            out += "<a href='#' class='title'>" + data[key].title + "</a>";
            if (data[key].assocProducts !== "") {
                out += "<p class='assocProducts'><span>Могут понадобиться: </span>";
                let arr = data[key].assocProducts.split(';');
                for (let a of arr) {
                    out += "<a class='assocProducts-link' href='#'>" + a + ";</a>";
                }
                out += "</p>";
            }
            out += "</div><div class='good-price'><p class='priceGoldAlt price-active'><span>По карте клуба </span>" + Math.floor(data[key].priceGoldAlt * 100) / 100 + " \u20BD</p>";
            out += "<p class='priceRetailAlt price-active'>" + Math.floor(data[key].priceRetailAlt * 100) / 100 + " \u20BD</p>";
            if (data[key].unit !== data[key].unitAlt) {
                out += "<p class='priceGold'><span>По карте клуба </span>" + data[key].priceGold + " \u20BD</p>";
                out += "<p class='priceRetail'>" + data[key].priceRetail + " \u20BD</p>";
                out += "<p class='bonus-price'>Можно купить за " + Math.floor(data[key].priceGold * 0.65 * 100) / 100 + " баллов</p>";
                out += "<div><span class='unitAltButton unit-active'>За " + data[key].unitAlt + "</span><span class='unitButton'>За " + data[key].unit + "</span></div>";
                out += "<div class='popup'><img src='img/unit--i.png'><span>";
                out += "Продается упаковками:<br>" + data[key].unitRatio + " " + data[key].unit + " = " + Math.floor(data[key].unitRatioAlt * 100) / 100 + " " + data[key].unitAlt;
            } else {
                out += "<p>Можно купить за " + Math.floor(data[key].priceGold * 0.65 * 100) / 100 + " баллов</p>";
                out += "<div class='popup'><img src='img/unit--i.png'><span>";
                out += "Продается штуками";
            }
            out += "</span></div><div class='add-to-cart'><div class='stepper'><input type='text' value='1'><span class='stepper-up'></span><span class='stepper-down'></span></div>";
            out += "<div class = 'add-to-cart-button' data-product-id='" + data[key].productId + "'><span class='add-to-cart-button-img'></span><span class='add-to-cart-button-text'>в корзину</span></div></div></div>";
            out += "</div>";
        }
        $('#goods').html(out);
        $('.stepper-up').click(function(event) {
            $(this).siblings('input')[0].value++;
        });
        $('.stepper-down').click(function(event) {
            $(this).siblings('input')[0].value--;
            if ($(this).siblings('input')[0].value < 1) {
                $(this).siblings('input')[0].value = 1;
            }
        });
        $('.unitButton').click(function (event) {
            $(this).addClass('unit-active');
            $(this).prev().removeClass('unit-active');
            $(this).parent().siblings('.priceGold').addClass("price-active");
            $(this).parent().siblings('.priceRetail').addClass("price-active");
            $(this).parent().siblings('.priceGoldAlt').removeClass("price-active");
            $(this).parent().siblings('.priceRetailAlt').removeClass("price-active");
        });
        $('.unitAltButton').click(function (event) {
            $(this).addClass('unit-active');
            $(this).next().removeClass('unit-active');
            $(this).parent().siblings('.priceGold').removeClass("price-active");
            $(this).parent().siblings('.priceRetail').removeClass("price-active");
            $(this).parent().siblings('.priceGoldAlt').addClass("price-active");
            $(this).parent().siblings('.priceRetailAlt').addClass("price-active");
        });
    });
}
