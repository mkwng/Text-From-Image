switch(figma.command) {
  case 'setKey':
    setKey()
    break
  case 'copyText':
    if(figma.currentPage.selection.length == 0) {
      figma.notify("Please select an item first before running the plugin")
      figma.closePlugin()
      break
    }

    if(figma.currentPage.selection.length > 1) {
      figma.notify("One item at a time, please")
      figma.closePlugin()
      break
    } 
    
    copyText(figma.currentPage.selection[0])
    break
}

async function setKey() {
  figma.showUI(__html__)
  figma.ui.postMessage({
    command: figma.command,
    apiKey: await figma.clientStorage.getAsync('ocrapikey')
  })

}

async function copyText(node) {
  let didFindImage = false
  for (const paint of node.fills) {
    if (paint.type === 'IMAGE') {
      didFindImage = true
      const image = figma.getImageByHash(paint.imageHash)
      const bytes = await image.getBytesAsync()

      figma.showUI(__html__)
      figma.ui.postMessage({
        command: figma.command,
        bytes: bytes,
        apiKey: await figma.clientStorage.getAsync('ocrapikey')
      })
      break
    }
  }
  if(!didFindImage) {
    figma.notify("No image fill found on selected layer")
    figma.closePlugin()
  }
}

figma.ui.onmessage = async (msg) => {
  switch(msg.result) {
    case 'noKey':
    case '403':
      figma.notify(msg.message)
      break
    case 'setKey':
      figma.clientStorage.setAsync('ocrapikey', msg.key).then( response => {
        figma.notify("Your API key is saved!")
      });
      break
    case 'done':
      figma.notify("Copied to clipboard")
      break
    default:
      break
  }
  figma.closePlugin()
}