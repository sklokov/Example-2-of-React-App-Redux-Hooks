import {projectApi} from "../api/api";

const initialState = {
    newsDataMainPage: {
        news: [],
        sport: [],
        culture: [],
        lifeStyle: []
    },
    searchData: {
        results: []
    },
    newsPageLoaderStatus: false,
    userSearchRequest: "",
    pageNum: 1,
    articleData: {
        date: "",
        title: "",
        trailText: "",
        body: "",
        img: "",
        id: "",
        item: ""
    },
    bookmarksData: {
        results: []
    },
    sortingStatus: "Newest first",
    snackbarStatus: false
}

const newsMainPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CHANGE_NEWS_DATA_MAIN_PAGE": {
            return {...state, newsDataMainPage: action.newsDataMainPage}
        }
        case "CHANGE_SEARCH_DATA": {
            return {...state, searchData: action.searchData}
        }
        case "NEWS_MAIN_PAGE_LOADER_STATUS": {
            return {...state, newsPageLoaderStatus: action.newsPageLoaderStatus}
        }
        case "CHANGE_USER_SEARCH_REQUEST": {
            return {...state, userSearchRequest: action.userSearchRequest}
        }
        case "CHANGE_PAGE_NUM": {
            return {...state, pageNum: action.pageNum}
        }
        case "CHANGE_ARTICLE_DATA": {
            return {...state, articleData: action.articleData}
        }
        case "CHANGE_BOOKMARKS_DATA": {
            return {...state, bookmarksData: action.bookmarksData}
        }
        case "CHANGE_SORTING_STATUS": {
            return {...state, sortingStatus: action.sortingStatus}
        }
        case "CHANGE_SNACKBAR_STATUS": {
            return {...state, snackbarStatus: action.snackbarStatus}
        }
        default:
            return state;
    }
}

export const actions = {
    changeNewsDataMainPage: (newsDataMainPage) => ({type: 'CHANGE_NEWS_DATA_MAIN_PAGE', newsDataMainPage}),
    changeSearchData: (searchData) => ({type: 'CHANGE_SEARCH_DATA', searchData}),
    changePageLoaderStatus: (newsPageLoaderStatus) => ({type: 'NEWS_MAIN_PAGE_LOADER_STATUS', newsPageLoaderStatus}),
    changeUserSearchRequest: (userSearchRequest) => ({type: 'CHANGE_USER_SEARCH_REQUEST', userSearchRequest}),
    changePageNum: (pageNum) => ({type: 'CHANGE_PAGE_NUM', pageNum}),
    articleData: (articleData) => ({type: 'CHANGE_ARTICLE_DATA', articleData}),
    changeBookmarksData: (bookmarksData) => ({type: 'CHANGE_BOOKMARKS_DATA', bookmarksData}),
    changeSortingStatus: (sortingStatus) => ({type: 'CHANGE_SORTING_STATUS', sortingStatus}),
    changeSnackbarStatus: (snackbarStatus) => ({type: 'CHANGE_SNACKBAR_STATUS', snackbarStatus}),
}

export const getDataForMainPage = (orderBy) => {
    return async (dispatch) => {
        dispatch(actions.changePageLoaderStatus(true))
        let newsData = await projectApi.getNewsContent('news', orderBy);
        let sportData = await projectApi.getNewsContent('sport', orderBy);
        let cultureData = await projectApi.getNewsContent('culture', orderBy);
        let lifeAndStyleData = await projectApi.getNewsContent('lifeandstyle', orderBy);
        dispatch(actions.changeNewsDataMainPage({
            news: newsData.response.results, sport: sportData.response.results,
            culture: cultureData.response.results, lifeStyle: lifeAndStyleData.response.results
        }))
        dispatch(actions.changePageLoaderStatus(false))
    }
}

export const getDataForNewsArticle = (id) => {
    return async (dispatch) => {
        dispatch(actions.changePageLoaderStatus(true))
        let articleData = await projectApi.getArticleContent(id);
        dispatch(actions.articleData(
            {
                date: articleData.response.results[0].webPublicationDate,
                title: articleData.response.results[0].webTitle,
                trailText: articleData.response.results[0].fields.trailText,
                body: articleData.response.results[0].fields.bodyText,
                img: articleData.response.results[0].fields.thumbnail,
                id: articleData.response.results[0].id,
                item: [articleData.response.results[0]]
            }
        ))
        dispatch(actions.changePageLoaderStatus(false))
    }
}

export const searchNewContent = (userRequest, pageNum, type, data) => {
    return async (dispatch) => {
        dispatch(actions.changePageLoaderStatus(true))
        let newPageNum = type === 'search' ? 1 : pageNum + 1;
        let searchData = await projectApi.searchNewContent(userRequest, newPageNum);
        dispatch(actions.changeUserSearchRequest(userRequest))
        dispatch(actions.changePageNum(newPageNum))
        if (data === null) {
            dispatch(actions.changeSearchData({results: searchData.response.results}))
        } else {
            dispatch(actions.changeSearchData({results: [...new Set([...data.results, ...searchData.response.results])]}))
        }
        dispatch(actions.changePageLoaderStatus(false))
    }
}

export default newsMainPageReducer;