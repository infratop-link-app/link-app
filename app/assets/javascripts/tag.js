$(document).on('turbolinks:load',function () {
  // functionがないとattrがうまくいかない
  $("button").on("click", function () {

    
      const id = $(this).attr("class")

      // lengthで存在を確認
      if($(`#tag_${id}`).length) {
          $(`#tag_${id}, #edit_${id}, #delete_${id}`).hide()
          $(`#name_${id}, #update_${id}, #back_${id}`).show()
        // カーソルを末尾にするための記述
          let v = $(`#name_${id}`).val()
          $(`#name_${id}`).val('')
          $(`#name_${id}`).focus().val(v)
      }

      $(`#back_${id}`).on("click", () => {
          $(`#name_${id}, #update_${id}, #back_${id}`).hide()
          $(`#tag_${id}, #edit_${id}, #delete_${id}`).show()
      })
  })
})