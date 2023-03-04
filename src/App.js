import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import {useSelector} from "react-redux";
import Spinner from "./components/HelperFunctions&Components/progress-bar/Loader";
import './components/HelperFunctions&Components/progress-bar/Loader.css'
import HomePage from "./components/home-page/HomePage";
import NewsArticle from "./components/news-article/NewsArticle";
import Bookmarks from "./components/bookmarks/Bookmarks";


function App() {
    const newsPageLoaderStatus = useSelector((state) => state.newsMainPage.newsPageLoaderStatus);

    return (
        <Router>
            {newsPageLoaderStatus ? (
                <div className="pos-center">
                    <Spinner/>
                </div>
            ) : (
                <></>
            )}
            <Routes>
                <Route path="*" element={<Navigate to="/home" replace />} />
                <Route path="/home" element={<HomePage />}/>
                <Route path='/article/:section/:yearPublishing/:monthPublishing/:dayPublishing/:newsId'
                       element={<NewsArticle />}/>
                <Route exact path='/bookmarks' element={<Bookmarks />}/>
            </Routes>
        </Router>
    );
}

export default App;
