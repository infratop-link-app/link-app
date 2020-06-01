$(document).on("turbolinks:load", function () {
    $(".tab-content > div").not("#tab1").hide()
    // .not()で除外
    $(".tab-buttons span").click(function () {
        let thisclass = $(this).attr("class")
        // 上記だとthisにあるclassを取得する
        $("#lamp").removeClass().addClass(thisclass)
        $(".tab-content>div").each(function () {
            if ($(this).hasClass(thisclass)) {
                // 要素集合全てのうちから、引数に指定したクラスを持つ要素がひとつでもあればtrueを返す。
                $(this).fadeIn(400)
            } else {
                $(this).hide()
            }
        })
    })
})

$(document).on("turbolinks:load", function () {
    // すでにお気に入りされている場合classをnot_favoritedからfavoritedに変更
    if (JSON.parse(localStorage.getItem("fav_links"))) {
        let array = JSON.parse(localStorage.getItem("fav_links"))

        for (let i = 0; i < array.length; i++) {
            dataId = array[i]["id"]
            $(`#fav_${dataId} > i`)
                .removeClass("fa-bookmark-o")
                .addClass("fa-bookmark")
            $(`#fav_${dataId}`).removeClass().addClass("favorited")
        }
    }

    $(".icon_button > span").click(function () {
        if ($(this).attr("class") == "not_favorited") {
            let linkId = $(this).data("id")
            let url = $(this).parent("p").next("a").attr("href")
            let title = $(this).parent("p").next("a").children("p").text()
            // お気に入りをしたことがあるかないか
            if (JSON.parse(localStorage.getItem("fav_links"))) {
                let links_array = JSON.parse(localStorage.getItem("fav_links"))
                let fav_links = {
                    id: linkId,
                    url: url,
                    title: title,
                }
                // すでにお気に入りに追加している場合はreturnを返す
                if (links_array.some((link) => link.id === linkId)) {
                    return
                } else {
                    links_array.push(fav_links)
                    localStorage.setItem(
                        "fav_links",
                        JSON.stringify(links_array)
                    )
                }
                // 初めてお気に入りに追加する場合
            } else {
                let links_array = []
                let fav_links = {
                    id: linkId,
                    url: url,
                    title: title,
                }

                links_array.push(fav_links)
                localStorage.setItem("fav_links", JSON.stringify(links_array))
            }
            $(`#fav_${linkId} > i`)
                .removeClass("fa-bookmark-o")
                .addClass("fa-bookmark")
            $(this).removeClass().addClass("favorited")
        } else {
            let linkId = $(this).data("id")
            let links_array = JSON.parse(localStorage.getItem("fav_links"))
            // お気に入り解除を押した要素のid(linkId)と配列中のオブジェクトのidが一致すれば、その要素を配列から削除
            for (let i = 0; i < links_array.length; i++) {
                if (links_array[i]["id"] === linkId) {
                    links_array.splice(i, 1)
                }
            }

            localStorage.setItem("fav_links", JSON.stringify(links_array))
            $(`#fav_${linkId} > i`)
                .removeClass("fa-bookmark")
                .addClass("fa-bookmark-o")
            $(this).removeClass().addClass("not_favorited")
        }
    })
})

$(document).on("turbolinks:load", function () {
    if (".list-container".length) {
        let array = JSON.parse(localStorage.getItem("fav_links"))
        for (key in array) {
            $(".list-container").append(
                `<li><a href="${array[key].url}">${array[key].title}</a></li>`
            )
        }
    }
})
