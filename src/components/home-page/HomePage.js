import React, {useEffect} from 'react';
import Navbar from "../../components/navbar/Navbar";
import NewsPageTop from "../../components/news-main-page/top-part/NewsPageTop";
import {useDispatch, useSelector} from "react-redux";
import TopMenuPanel from "../../components/top-menu-panel/TopMenuPanel";
import NewsPageMiddle from "../../components/news-main-page/middle-part/NewsPageMiddle";
import {getDataForMainPage} from "../../store/news-page-reducer";
import * as _ from 'lodash';
import '../HelperFunctions&Components/progress-bar/Loader.css'
import SearchResult from "../search-results/SearchResult";
import './HomePage.css'


function HomePage() {
    const dispatch = useDispatch();
    const newsDataMainPage = useSelector((state) => state.newsMainPage.newsDataMainPage);
    const searchData = useSelector((state) => state.newsMainPage.searchData);


    useEffect(() => {
        if (newsDataMainPage.news.length === 0) {
            dispatch(getDataForMainPage('newest'));
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newsDataMainPage])

    const newsDataMainPageCloneFirst = _.cloneDeep(newsDataMainPage.news);
    const newsDataMainPageCloneSecond = _.cloneDeep(newsDataMainPage.news);


    return (
        <div>
            <Navbar/>
            <TopMenuPanel title={searchData.results.length === 0 ? "Top stories" : "Search results"}/>
            <>
                {searchData.results.length === 0 ? (
                    <div className={"homePageMainSection"}>
                        <div className={"homePageSection"}>
                            <NewsPageTop
                                data={newsDataMainPage.news.length !== 0 ? newsDataMainPageCloneFirst.splice(0, 5) : []}/>
                        </div>
                        <div className={"homePageSectionFirst"}>
                            <NewsPageMiddle data={newsDataMainPageCloneSecond.splice(0, 3)} name={""}/>
                        </div>
                        <div className={"homePageSectionSecond"}>
                            <NewsPageMiddle data={newsDataMainPage.sport} name={"Sport"}/>
                        </div>
                        <div className={"homePageSectionThird"}>
                            <NewsPageMiddle data={newsDataMainPage.culture} name={"Culture"}/>
                        </div>
                        <div className={"homePageSectionFour"}>
                            <NewsPageMiddle data={newsDataMainPage.lifeStyle} name={"Life Style"}/>
                        </div>
                    </div>
                ) : (
                    <div style={{marginTop: "6em"}}>
                        <SearchResult searchData={searchData}/>
                    </div>
                )}
                {searchData.results.length === 0 && newsDataMainPage.news.length === 0 ? <></> : (
                    <div className={"footer"} />
                )}
            </>
        </div>
    );
}

export default HomePage;