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