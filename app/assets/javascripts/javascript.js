$(document).on("turbolinks:load", function () {
    if (JSON.parse(localStorage.getItem("tab_content"))) {
        let tabContent = JSON.parse(localStorage.getItem("tab_content"))
        console.log(tabContent)
        if (tabContent === "content1") {
            $("#lamp").removeClass().addClass(tabContent)
            // notで指定した要素以外を取得
            $(".tab-content > div").not("#tab1").hide()
        } else if (tabContent === "content2") {
            $("#lamp").removeClass().addClass(tabContent)
            $(".tab-content > div").not("#tab2").hide()
        } else {
            console.log("w")
            $("#lamp").removeClass().addClass(tabContent)
            $(".tab-content > div").not("#tab3").hide()
        }
    } else {
        $("#lamp").removeClass().addClass("content1")
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
                `<li class= "book_list" ><a href="${array[key].url}">${array[key].title}</a></li>`
            )
        }
    }
})

$(function () {
    $(document).on("turbolinks:load", function () {
        // link-boxクラスをドラッグ可能に
        $(".link-box").draggable({
            // カーソルの位置
            cursorAt: { left: 85, top: 85 },
            // ドラッグ終了時に元の場所に戻る設定
            revert: true,
            revertDuration: 1,
            // ドラッグ中
            drag: function (e, ui) {
                $(this).children("a").attr("href", "")
                $(this).css({
                    height: "105px",
                    width: "105px",
                })
                $(this).find("img").css({
                    margin: "3px auto 5px",
                })
            },
            // ドラッグ終了時
            stop: function (e, ui) {
                $(this).css({
                    height: "",
                    width: "",
                })
                $(this).find("img").css({
                    margin: "",
                })
                localStorage.setItem(
                    "tab_content",
                    JSON.stringify($("#lamp").attr("class"))
                )
                // リロードしないとaタグのhref属性が元に戻らない
                location.reload()
            },
        })

        // link-boxクラスがtrash-boxクラスにドロップされた時にイベント発火
        $(".trash-box").droppable({
            tolerance: "touch",
            // link-boxクラスがドラッグされている間trash-boxクラスにmove-trashクラスを付与
            activeClass: "move-trash",
            drop: function (e, ui) {
                e.preventDefault()
                let deleteMessage = confirm("本当に削除しますか？")
                if (deleteMessage == true) {
                    //ドロップされた要素を取得。jQueryオブジェクトからDOM要素を取り出す
                    let deleteItem = ui.draggable[0]
                    //idを取得。
                    let deleteId = ui.draggable.data("item_id")
                    let deleteUrl = "/links/" + deleteId
                    $.ajax({
                        url: deleteUrl,
                        type: "POST",
                        data: { id: deleteId, _method: "DELETE" },
                        dataType: "json",
                    })
                        .done(function (data) {
                            deleteItem.remove()
                            location.reload()
                        })
                        .fail(function () {
                            alert("エラー")
                        })
                }
            },
        })
    })
})
