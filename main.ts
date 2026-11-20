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

// 本体のAボタン、または P0端子 でSTARTを実行
input.onButtonPressed(Button.A, function () {
    doStart()
})
input.onPinPressed(TouchPin.P0, function () {
    doStart()
})

// 本体のBボタン、または P2端子 でSTOPを実行
input.onButtonPressed(Button.B, function () {
    doStop()
})
input.onPinPressed(TouchPin.P2, function () {
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