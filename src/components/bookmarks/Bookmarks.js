import React, {useEffect} from 'react';
import Navbar from "../../components/navbar/Navbar";
import {useDispatch, useSelector} from "react-redux";
import TopMenuPanel from "../../components/top-menu-panel/TopMenuPanel";
import '../HelperFunctions&Components/progress-bar/Loader.css'
import NewsPageMiddle from "../news-main-page/middle-part/NewsPageMiddle";
import {actions} from "../../store/news-page-reducer";
import './Bookmarks.css'


function Bookmark() {
    const dispatch = useDispatch();
    const bookmarksData = useSelector((state) => state.newsMainPage.bookmarksData);
    const localData = localStorage.getItem('bookmarks');

    useEffect(() => {
        if (localData) {
            let bookmarksData = JSON.parse(localData);
            dispatch(actions.changeBookmarksData(bookmarksData))
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <Navbar/>
            <TopMenuPanel title={"All bookmark"} dropDownStatus={'none'}/>
            <div>
                <NewsPageMiddle data={bookmarksData.results} name={"bookmarks"}/>
            </div>
            <div className={"footer"}/>
        </div>
    );
}

export default Bookmark;