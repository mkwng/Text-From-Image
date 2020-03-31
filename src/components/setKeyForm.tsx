import * as React from 'react'

function SetKeyForm(props) {
    const [apiKey, setApiKey] = React.useState(props.apiKey)

    const handleSubmit = (e) => {
        e.preventDefault();
        window.parent.postMessage({pluginMessage: {
            result: 'setKey',
            key: apiKey
        }}, '*')
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    API key:
                    <input
                        type="text"
                        value={apiKey}
                        onChange={e => setApiKey(e.target.value)}
                    />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </>
    )
}

export default SetKeyForm