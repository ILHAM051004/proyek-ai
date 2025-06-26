import axios from 'axios'

const API_URL = "https://hyisnaqhamncugeppsnx.supabase.co/rest/v1/prediksi"
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5aXNuYXFoYW1uY3VnZXBwc254Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1MDk2MDUsImV4cCI6MjA2NjA4NTYwNX0.IqI78WfiH2b4rWA9tFdk4rF-KKOipS9XWlVQAJkZ2BU"

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
}

export const prediksiAPI = {
    async fetchPrediksi() {
        const response = await axios.get(API_URL, { headers })
        return response.data
    },

    async createPrediksi(data) {
        const response = await axios.post(API_URL, data, { headers })
        return response.data
    }
}