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