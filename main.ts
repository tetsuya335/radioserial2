// 【変更】最初は画面に何も表示しない
input.onButtonPressed(Button.A, function () {
    serial.writeLine("START")
    // 【変更】受信したらハートを表示
    basic.showIcon(IconNames.EighthNote)
    // 【変更】0.5秒（500ミリ秒）そのまま待つ
    basic.pause(500)
    // 【変更】画面を消す
    basic.clearScreen()
})
// 無線を受信したときの処理
radio.onReceivedString(function (receivedString) {
    serial.writeLine(receivedString)
    // 【変更】受信したらハートを表示
    basic.showIcon(IconNames.Heart)
    // 【変更】0.5秒（500ミリ秒）そのまま待つ
    basic.pause(500)
    // 【変更】画面を消す
    basic.clearScreen()
})
input.onButtonPressed(Button.B, function () {
    serial.writeLine("STOP")
    // 【変更】受信したらハートを表示
    basic.showIcon(IconNames.Yes)
    // 【変更】0.5秒（500ミリ秒）そのまま待つ
    basic.pause(500)
    // 【変更】画面を消す
    basic.clearScreen()
})
radio.setGroup(1)
serial.redirectToUSB()
// 【変更】最初は画面に何も表示しない
basic.clearScreen()
