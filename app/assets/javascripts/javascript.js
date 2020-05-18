$(function () {
  $('.tab-content > div').not('#tab1').hide();
  // .not()で除外
    $('.tab-buttons span').click(function(){
      var thisclass=$(this).attr('class');
      // 上記だとthisにあるclassを取得する
      $('#lamp').removeClass().addClass('#lamp').addClass(thisclass);
      $('.tab-content>div').each(function(){
        if($(this).hasClass(thisclass)){
// 要素集合全てのうちから、引数に指定したクラスを持つ要素がひとつでもあればtrueを返す。
          $(this).fadeIn(400);
        }
        else{
          $(this).hide();
        }
      });
    });
});