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