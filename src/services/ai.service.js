import axios from 'axios'

const API_URL = 'https://api.openai.com/v1/images/generations'
const apiKey = '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'

const AIService = {

    generateImage(payload){

        return axios.post(`${API_URL}`,payload,{
            headers: {
                "Authorization": `Bearer ${apiKey}`,
            }
        })

    }

}
export default AIService