var appId = "b12030e9";
var appKey = "e5c52b99e35767495bc466c168e152b2";
var mcDonaldsUrl = "https://api.nutritionix.com/v1_1/search/mcdonalds?results=0:20&fields=item_name,brand_name,item_id,nf_calories&appId=b12030e9&appKey=e5c52b99e35767495bc466c168e152b2"


S.ajax({
    url: mcDonaldsURL,
    success: function(cata) {
        console.log(data)
    }
})