radio.setGroup(1)
serial.redirectToUSB()
basic.clearScreen() // 【変更】最初は画面に何も表示しない

input.onButtonPressed(Button.A, function () {
    serial.writeLine("START")
    basic.showIcon(IconNames.Heart)  // 【変更】受信したらハートを表示
    basic.pause(500)                 // 【変更】0.5秒（500ミリ秒）そのまま待つ
    basic.clearScreen()              // 【変更】画面を消す
})

input.onButtonPressed(Button.B, function () {
    serial.writeLine("STOP")
    basic.showIcon(IconNames.Heart)  // 【変更】受信したらハートを表示
    basic.pause(500)                 // 【変更】0.5秒（500ミリ秒）そのまま待つ
    basic.clearScreen()              // 【変更】画面を消す
})

// 無線を受信したときの処理
radio.onReceivedString(function (receivedString) {
    serial.writeLine(receivedString)
    
    basic.showIcon(IconNames.Heart)  // 【変更】受信したらハートを表示
    basic.pause(500)                 // 【変更】0.5秒（500ミリ秒）そのまま待つ
    basic.clearScreen()              // 【変更】画面を消す
})