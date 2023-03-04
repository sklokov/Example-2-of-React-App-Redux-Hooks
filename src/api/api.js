import axios from "axios";


export const projectApi = {
    getNewsContent(sectionName, orderBy) {
        return axios.get(`https://content.guardianapis.com/search?section=${sectionName}&show-fields=all&order-by=${orderBy}&api-key=${process.env.REACT_APP_API_KEY}`, {
            headers: {
                withCredentials: true,
            },
        })
            .then(res => res.data)
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response.data)
                    console.log(error.response.status)
                    console.log(error.response.headers)
                    return error.response.data
                }
            })
    },
    getArticleContent(ids) {
        return axios.get(`https://content.guardianapis.com/search?ids=${ids}&show-fields=all&api-key=${process.env.REACT_APP_API_KEY}`, {
            headers: {
                withCredentials: true,
            },
        })
            .then(res => res.data)
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response.data)
                    console.log(error.response.status)
                    console.log(error.response.headers)
                    return error.response.data
                }
            })
    },
    searchNewContent(userRequest,pageNum) {
        return axios.get(`https://content.guardianapis.com/search?q=${userRequest}&page=${pageNum}&show-fields=all&api-key=${process.env.REACT_APP_API_KEY}`, {
            headers: {
                withCredentials: true,
            },
        })
            .then(res => res.data)
            .catch(function (error) {
                if (axios.isCancel(error)) return;
                if (error.response) {
                    console.log(error.response.data)
                    console.log(error.response.status)
                    console.log(error.response.headers)
                    return error.response.data
                }
            })
    }
}

