$(document).on("turbolinks:load", function () {
    if (JSON.parse(localStorage.getItem("tab_content"))) {
        let tabContent = JSON.parse(localStorage.getItem("tab_content"))
        if (tabContent === "content1") {
            $("#lamp").removeClass().addClass(tabContent)
            // notで指定した要素以外を取得
            $(".tab-content > div").not("#tab1").hide()
        } else if (tabContent === "content2") {
            $("#lamp").removeClass().addClass(tabContent)
            $(".tab-content > div").not("#tab2").hide()
        } else {
            $("#lamp").removeClass().addClass(tabContent)
            $(".tab-content > div").not("#tab3").hide()
        }
    } else {
        $("#lamp").removeClass().addClass("content1")
        $(".tab-content > div").not("#tab1").hide()
    }

    $(".tab-buttons span").click(function () {
        let thisclass = $(this).attr("class")
        // 上記だとthisにあるclassを取得する
        $("#lamp").removeClass().addClass(thisclass)
        // 選んだtab-contentをlocalStorageに保存
        localStorage.setItem(
            "tab_content",
            JSON.stringify($("#lamp").attr("class"))
        )
        $(".tab-content > div").each(function () {
            // 要素集合全てのうちから、引数に指定したクラスを持つ要素がひとつでもあればtrueを返す。
            if ($(this).hasClass(thisclass)) {
                $(this).fadeIn(400)
            } else {
                $(this).hide()
            }
        })
    })
})
