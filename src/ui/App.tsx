import * as React from 'react'

function App() {
  const [didMount, setDidMount] = React.useState(false)
  const [editingKey, setEditingKey] = React.useState(false)
  
  window.onmessage = async event => {
    if(event.hasOwnProperty('data')) {
      if(event.data.pluginMessage.type === 'setKey') {
      }

      if(event.data.pluginMessage.type === 'copyText') {
      }

      setDidMount(true)
    }
  };

  // if (!didMount) return null

  return (
    <>
      {
        editingKey ? (
          <span>Rendered when `truthy`</span>
        ) : (
          <span>Rendered when `falsy`</span>
        )
      }
    </>
  ) 
}

export default App