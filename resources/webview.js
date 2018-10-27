document.getElementById('button').addEventListener('click', function () {
  window.postMessage('nativeLog', 'Called from the webview')
})

// called from the plugin
window.setRandomNumber = function (randomNumber) {
  document.getElementById('answer').innerHTML = 'Random number from the plugin: ' + randomNumber
}
