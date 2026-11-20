let isRunning = false
let isSwitchPressed = false // スイッチが踏まれっぱなしかどうかを監視

// STARTの共通処理
function doStart() {
    serial.writeLine("START")
    // 画面表示と消去を裏側で実行し、次の入力受付を止めない
    control.inBackground(function () {
        basic.showIcon(IconNames.EighthNote)
        basic.pause(400)
        basic.clearScreen()
    })
}

// STOPの共通処理
function doStop() {
    serial.writeLine("STOP")
    control.inBackground(function () {
        basic.showIcon(IconNames.Yes)
        basic.pause(400)
        basic.clearScreen()
    })
}

// 交互切り替え処理
function toggleStartStop() {
    if (isRunning == false) {
        isRunning = true
        doStart()
    } else {
        isRunning = false
        doStop()
    }
}

// 【改善】P0の物理スイッチ監視（チャタリング完全防止・離すまで再反応しない）
basic.forever(function () {
    // P0とGNDがつながった（0になった）瞬間
    if (pins.digitalReadPin(DigitalPin.P0) == 0) {
        if (isSwitchPressed == false) {
            isSwitchPressed = true // ロックをかける
            toggleStartStop()
            basic.pause(150) // 踏み込み時の接点バウンド（チャタリング）を無視
        }
    } else {
        // 足を完全に離して 1 に戻ったらロック解除
        if (isSwitchPressed == true) {
            basic.pause(150) // 離す瞬間のチャタリングを無視
            isSwitchPressed = false
        }
    }
    basic.pause(10)
})

// 本体のAボタンでも交互切り替え
input.onButtonPressed(Button.A, function () {
    toggleStartStop()
})

// 本体のBボタンで強制STOP（リセット用）
input.onButtonPressed(Button.B, function () {
    isRunning = false
    doStop()
})

// 無線を受信したときの処理
radio.onReceivedString(function (receivedString) {
    serial.writeLine(receivedString)
    control.inBackground(function () {
        basic.showIcon(IconNames.Heart)
        basic.pause(400)
        basic.clearScreen()
    })
})

// 初期設定
pins.setPull(DigitalPin.P0, PinPullMode.PullUp) // P0を物理スイッチ用に安定化
radio.setGroup(1)
serial.redirectToUSB()
basic.clearScreen()