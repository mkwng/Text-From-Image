import * as React from 'react'
const apiUrl = 'https://api.ocr.space/parse/image'

function CopyTextForm(props) {
    const [isError, setIsError] = React.useState(false)
    const [text, setText] = React.useState("")

    function Uint8ToString(u8a){
        var CHUNK_SZ = 0x8000;
        var c = [];
        for (var i=0; i < u8a.length; i+=CHUNK_SZ) {
            c.push(String.fromCharCode.apply(null, u8a.subarray(i, i+CHUNK_SZ)));
        }
        return c.join("");
    }

    const b64encoded = btoa(Uint8ToString(props.bytes))

    var data = new FormData();
    data.append("base64image", 'data:image/jpeg;base64,' + b64encoded)

    var request = new XMLHttpRequest()
    request.responseType = 'json'
    request.onreadystatechange = function() {
        if (this.status == 403) {
            window.parent.postMessage({pluginMessage: {
                result: '403',
                msg: 'Your API key may be incorrect. Check the key and try again'
            }}, '*')
            setIsError(true)
        }
        if (this.readyState == 4 && this.status == 200) {
            window.parent.postMessage({pluginMessage: request.response}, '*')
        }
    }

    request.open("POST", apiUrl);
    request.setRequestHeader("apikey", props.apiKey);
    console.log(props.apiKey)

    request.send(data);

    return (
        <>
        {
            isError ? (
                <>Error</>
            ) : (
                <>
                    <textarea
                        value={text}
                        onChange={e => setText(e.target.value)}
                    >
                    </textarea>
                </>
            )
        }
        </>
    )
}

export default CopyTextForm