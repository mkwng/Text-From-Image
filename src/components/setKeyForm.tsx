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
            <p>Obtain an API key from <a href="https://ocr.space/OCRAPI#free" target="_blank">ocr.space</a> and enter it here.</p>
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