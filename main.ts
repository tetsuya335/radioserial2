// 現在スタート中かどうかを覚える変数（最初は false ＝ 停止中）
let isRunning = false

// STARTの共通処理
function doStart() {
    serial.writeLine("START")
    basic.showIcon(IconNames.EighthNote)
    basic.pause(500)
    basic.clearScreen()
}

// STOPの共通処理
function doStop() {
    serial.writeLine("STOP")
    basic.showIcon(IconNames.Yes)
    basic.pause(500)
    basic.clearScreen()
}

// 押すたびに START と STOP を交互に切り替える処理
function toggleStartStop() {
    if (isRunning == false) {
        isRunning = true
        doStart()
    } else {
        isRunning = false
        doStop()
    }
}

// P0のフットスイッチ、または本体のAボタンで交互に切り替え
input.onPinPressed(TouchPin.P0, function () {
    toggleStartStop()
})
input.onButtonPressed(Button.A, function () {
    toggleStartStop()
})

// 本体のBボタンは強制STOP用として残しておく（状態も停止にリセット）
input.onButtonPressed(Button.B, function () {
    isRunning = false
    doStop()
})

// 無線を受信したときの処理
radio.onReceivedString(function (receivedString) {
    serial.writeLine(receivedString)
    basic.showIcon(IconNames.Heart)
    basic.pause(500)
    basic.clearScreen()
})

// 初期設定
radio.setGroup(1)
serial.redirectToUSB()
basic.clearScreen()