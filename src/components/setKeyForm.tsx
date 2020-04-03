import * as React from 'react'
import '../../static/figma-plugin-ds.min.css'

function SetKeyForm(props) {
    const [apiKey, setApiKey] = React.useState(props.apiKey)
    const [disclosureOpen, setDisclosureOpen] = React.useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        window.parent.postMessage({pluginMessage: {
            result: 'setKey',
            key: apiKey
        }}, '*')
    }

    const handleToggle = (e) => {
        setDisclosureOpen(!disclosureOpen)
    }

    return (
        <>
            <form style={{'margin': '8px'}} onSubmit={handleSubmit}>
                
                <label>
                    <div className="section-title">API Key</div>
                    <div className="input-icon">
                        <div className="input-icon__icon">
                            <div className="icon icon--hyperlink icon--black-3"></div>
                        </div>
                        <input
                            type="input"
                            className="input-icon__input"
                            value={apiKey}
                            placeholder="Enter your API key"
                            onChange={e => setApiKey(e.target.value)}
                        />
                    </div>
                </label>
                <button style={{"width": "100%", 'marginTop': '8px'}} className="button button--secondary" type="submit">Save and close</button>
            </form>

            <div className="divider"></div>
            <ul className={`disclosure ${!disclosureOpen ? "" : "disclosure--expanded"}`} onClick={handleToggle}>
                <li className="disclosure__item">
                    <div className="disclosure--section disclosure__label">Instructions</div>
                    <div className="disclosure__content">Obtain an API key from <a href="https://ocr.space/OCRAPI#free" target="_blank">ocr.space</a> and enter it above.</div>
                </li>
            </ul>

{/* 
            <div style={{'margin': '8px'}}>
                <div className="section-title">How does this work?</div>
                <p className="type type--pos-small-normal">Obtain an API key from <a href="https://ocr.space/OCRAPI#free" target="_blank">ocr.space</a> and enter it below.</p>
            </div> */}
        </>
    )
}

export default SetKeyForm