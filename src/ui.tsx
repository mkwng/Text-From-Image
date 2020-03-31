import * as React from 'react'
import * as ReactDOM from 'react-dom'
import SetKeyForm from './components/setKeyForm'
import CopyTextForm from './components/copyTextForm'

function App() {
    const [didMount, setDidMount] = React.useState(false)
    const [editingKey, setEditingKey] = React.useState(false)

    window.onmessage = async event => {
        if(event.data.pluginMessage.command === "setKey") {
            setEditingKey(true)
        }

        if(event.data.pluginMessage.command === "copyText") {
        }

        setDidMount(true)
    };
  
    if (!didMount) return null
  
    return (
        <>
        {
            editingKey ? (
                <SetKeyForm />
            ) : (
                <CopyTextForm />
            )
        }
        </>
    ) 
}

ReactDOM.render(<App />, document.getElementById("root"));
