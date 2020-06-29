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
            if ($(".side-bar").length) {
                localStorage.setItem(
                    "tab_content",
                    JSON.stringify($("#lamp").attr("class"))
                )
            }
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
                if (JSON.parse(localStorage.getItem("fav_links"))) {
                    let links_array = JSON.parse(
                        localStorage.getItem("fav_links")
                    )
                    // お気に入り解除を押した要素のid(linkId)と配列中のオブジェクトのidが一致すれば、その要素を配列から削除
                    for (let i = 0; i < links_array.length; i++) {
                        if (links_array[i]["id"] === deleteId) {
                            links_array.splice(i, 1)
                        }
                    }
                    localStorage.setItem(
                        "fav_links",
                        JSON.stringify(links_array)
                    )
                }
                $.ajax({
                    url: deleteUrl,
                    type: "POST",
                    data: { id: deleteId, _method: "DELETE" },
                    dataType: "json",
                })
                    .done(function (data) {
                        location.reload()
                        deleteItem.remove()
                    })
                    .fail(function () {
                        alert("エラー")
                    })
            }
        },
    })
})
