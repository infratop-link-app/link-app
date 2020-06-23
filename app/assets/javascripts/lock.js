function myEnter() {
    if (sessionStorage.getItem("blue_certification")) {
        location.href = "links/blue_index"
    } else {
        const LOCK_PASSWORD = gon.index_key
        myPassWord = prompt("パスワードを入力してください", "")
        if (myPassWord == LOCK_PASSWORD) {
            sessionStorage.setItem("blue_certification", "passed")
            location.href = "links/blue_index"
        } else {
            alert("パスワードが違います!")
        }
    }
}

$(document).on("turbolinks:load", function () {
    let currentUrl = location.href
    if (currentUrl.endsWith("/links/blue_index")) {
        if (sessionStorage.getItem("blue_certification")) {
            return
        } else {
            const LOCK_PASSWORD = gon.index_key
            myPassWord = prompt("パスワードを入力してください", "")
            if (myPassWord == LOCK_PASSWORD) {
                sessionStorage.setItem("blue_certification", "passed")
                location.href = "/links/blue_index"
            } else {
                alert("パスワードが違います!")
                location.href = "/links"
            }
        }
    }
})
