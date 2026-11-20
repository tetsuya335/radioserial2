let isSwitchPressed = false

function sendTrigger() {
    serial.writeLine("TOGGLE")
    control.inBackground(function () {
        basic.showIcon(IconNames.SmallDiamond)
        basic.pause(150)
        basic.clearScreen()
    })
}

// P0の物理スイッチ監視（踏んだ瞬間だけ1回送信・離すまでロック）
basic.forever(function () {
    if (pins.digitalReadPin(DigitalPin.P0) == 0) {
        if (!isSwitchPressed) {
            isSwitchPressed = true
            sendTrigger()
            basic.pause(80) // 踏み込み時の接点バウンド吸収
        }
    } else {
        if (isSwitchPressed) {
            basic.pause(80) // 離す瞬間の接点バウンド吸収
            isSwitchPressed = false
        }
    }
    basic.pause(5) // 監視間隔を5msに高速化
})

// 本体のAボタンでも同じトリガーを送信
input.onButtonPressed(Button.A, function () {
    sendTrigger()
})

// 無線を受信したときの処理（そのまま維持）
radio.onReceivedString(function (receivedString) {
    serial.writeLine(receivedString)
    control.inBackground(function () {
        basic.showIcon(IconNames.Heart)
        basic.pause(200)
        basic.clearScreen()
    })
})

pins.setPull(DigitalPin.P0, PinPullMode.PullUp)
radio.setGroup(1)
serial.redirectToUSB()
basic.clearScreen()