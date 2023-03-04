import axios from 'axios'
import { useEffect, useState } from 'react'
import AIService from '../services/ai.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const AIgenerator = () => {

    const [image,setImage] = useState(null)
    const [prompt, setPrompt] = useState("A triangular donut");
    const [size, setSize] = useState("512x512");
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);


        const generateImage = async() => {

            
            const payload = {
                model: "image-alpha-001",
                prompt,
                n: 2,
                size,
            }

            try {

                const response = await AIService.generateImage(payload)
                const image = response.data.data[0].url;
                setImage(image);   
                setLoading(false);
                
            } catch (error) {
                console.log(error)
                setLoading(false);

            }

        }

        // useEffect(()=>{
        //     fetchimage()
        // },[])

        const handleSubmit = (e) => {
            e.preventDefault();
            setLoading(true);

            generateImage();
          };
        

    return(
    <>
        <h1>AI Generate</h1>

        <form onSubmit={handleSubmit} >
        <div style={{ display: 'flex', alignItems: 'center' }}>
    <label htmlFor="prompt" style={{ marginRight: '1rem' }}>Prompt:</label>
    <input
      id="prompt"
      type="text"
      value={prompt}
      onChange={(e) => setPrompt(e.target.value)}
      style={{ marginRight: '1rem' }}
    />
    <button type="submit">Generate Image</button>
  </div>
  <div>
    <label htmlFor="size" style={{ marginRight: '1rem' }}>Size:</label>
    <select id="size" value={size} onChange={(e) => setSize(e.target.value)}>
      <option value="256x256">256x256</option>
      <option value="512x512">512x512</option>
      <option value="1024x1024">1024x1024</option>
    </select>
  </div>
      <br/>
      {loading ? (
        <div style={{ textAlign: 'center' }}>
          <FontAwesomeIcon icon={faSpinner} spin /> Loading...
        </div>
      ) : (
        image ? (
          <>

      <img src={image} alt="Generated Image" />
          {/* <br />
      <a href={`https://www.google.com/searchbyimage?image_url=${image}`} target="_blank">Open in Google Lens</a> */}

          </>
          
        ) : null
      )}
    </form>

    </>
    )
}

export default AIgenerator