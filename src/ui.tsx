import * as React from 'react'
import * as ReactDOM from 'react-dom'
import SetKeyForm from './components/setKeyForm'
import CopyTextForm from './components/copyTextForm'
import './ui.css'

function App() {
    const [didMount, setDidMount] = React.useState(false)
    const [editingKey, setEditingKey] = React.useState(false)
    const [apiKey, setApiKey] = React.useState("")
    const [bytes, setBytes] = React.useState()

    window.onmessage = async event => {
        if(event.data.pluginMessage.command === "setKey") {
            setEditingKey(true)
        }

        if(event.data.pluginMessage.command === "copyText") {
            if(!event.data.pluginMessage.apiKey) {
                window.parent.postMessage({pluginMessage: {
                    result: 'noKey',
                    message: 'Please set API key'
                }}, '*')
            }
            setBytes(event.data.pluginMessage.bytes)
        }

        setApiKey(event.data.pluginMessage.apiKey)
        setDidMount(true)
    };
  
    if (!didMount) return null
  
    return (
        <>
        {
            editingKey ? (
                <SetKeyForm apiKey={apiKey} />
            ) : (
                <CopyTextForm apiKey={apiKey} bytes={bytes} />
            )
        }
        </>
    ) 
}

ReactDOM.render(<App />, document.getElementById("root"));
