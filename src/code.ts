switch(figma.command) {
    case 'setKey':
      setKey()
      break
    case 'copyText':
      if(figma.currentPage.selection.length > 1) {
        figma.notify("Please select just one item")
      } else {
        copyText(figma.currentPage.selection[0])
      }
      break
  }
  
  figma.clientStorage.getAsync('ocrapikey').then( response => {
    console.log(response)
  });
  
  async function setKey() {
    figma.showUI(__html__)
    figma.ui.postMessage({
      command: figma.command,
      apiKey: await figma.clientStorage.getAsync('ocrapikey')
    })
  
    figma.ui.onmessage = async (msg) => {
      console.log(msg)
      figma.closePlugin()
    }
  }
  
  async function copyText(node) {
    for (const paint of node.fills) {
      if (paint.type === 'IMAGE') {
        const image = figma.getImageByHash(paint.imageHash)
        const bytes = await image.getBytesAsync()
  
        figma.showUI(__html__)
        figma.ui.postMessage({
          command: figma.command,
          bytes: bytes,
          apiKey: await figma.clientStorage.getAsync('ocrapikey')
        })
  
        figma.ui.onmessage = async (msg) => {
          figma.closePlugin();
        }
      }
    }
  }