const { dialog } = require('electron').remote

export function selectDir() {
  return dialog.showOpenDialog({properties: ['openDirectory']})
}

export function selectFile(filter) {
  filter = filter || []
  return dialog.showOpenDialog({
    properties: ['openFile'],
    filter
  })
}
