import React, {useEffect} from 'react';
import Navbar from "../navbar/Navbar";
import bookmarkLogo from "../../assets/images/bookmark-logo.png";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import logo from "../../assets/images/Logo_White.png";
import {actions, getDataForNewsArticle} from "../../store/news-page-reducer";
import Snackbar from "../HelperFunctions&Components/snackbars/Snackbar";
import "../HelperFunctions&Components/snackbars/Snackbar.css";
import {useParams} from 'react-router-dom'
import './NewsArticle.css'

function NewsArticle() {
    const dispatch = useDispatch();
    const {section, yearPublishing, monthPublishing, dayPublishing, newsId} = useParams();
    const articleData = useSelector((state) => state.newsMainPage.articleData);
    const bookmarksData = useSelector((state) => state.newsMainPage.bookmarksData);
    const snackbarStatus = useSelector((state) => state.newsMainPage.snackbarStatus);
    const localData = localStorage.getItem('bookmarks');

    useEffect(() => {
        if (articleData.item === "") {
            const articleId = section + "/" + yearPublishing + "/" + monthPublishing + "/" + dayPublishing + "/" + newsId;
            dispatch(getDataForNewsArticle(articleId));
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [articleData])


    useEffect(() => {
        if (localData) {
            let bookmarksData = JSON.parse(localData);
            dispatch(actions.changeBookmarksData(bookmarksData))
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    let day = moment(articleData.date).format('ddd');
    let month = moment(articleData.date).format("MMM");
    let time = moment(articleData.date).format("HH:mm");
    let date = moment(articleData.date).format("DD");
    let year = moment(articleData.date).format("YYYY");

    const addBookmarkHandler = () => {
        dispatch(actions.changeSnackbarStatus(true))
        localStorage.setItem('bookmarks', JSON.stringify({results: [...new Set([...articleData.item, ...bookmarksData.results])]}));
        dispatch(actions.changeBookmarksData(
            {results: [...new Set([...articleData.item, ...bookmarksData.results])]}
        ))
        setTimeout(() => {
            dispatch(actions.changeSnackbarStatus(false))
        }, 3000)
    }

    const deleteBookmarkHandler = () => {
        dispatch(actions.changeSnackbarStatus(true))
        const filteredData = bookmarksData.results.filter(i => i.id !== articleData.id)
        localStorage.setItem('bookmarks', JSON.stringify({results: filteredData}));
        dispatch(actions.changeBookmarksData(
            {results: filteredData}
        ))
        setTimeout(() => {
            dispatch(actions.changeSnackbarStatus(false))
        }, 3000)
    }

    return (
        <div style={{height: "100%"}}>
            <Navbar/>
            {articleData.item === "" ? <></> : (
                <div className={"bookMarkSection"}>
                    <div style={{
                        width: 170,
                        height: 30,
                        padding: "5px 12px 4px 12px",
                        backgroundColor: "#09357B",
                        cursor: "pointer",
                        borderRadius: 4,
                        boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.06)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-evenly"
                    }}
                         onClick={bookmarksData.results.filter(i => i.id === articleData.id).length === 0 ? addBookmarkHandler :
                             deleteBookmarkHandler}
                    >
                        <img style={{height: 18, width: 20, marginTop: 2, objectFit: "contain"}} src={bookmarkLogo}
                             alt="searchLogo"/>
                        <p style={{
                            fontStyle: "Roboto", fontWeight: 500, fontSize: 14, color: "#FFFFFF"
                        }}>
                            {bookmarksData.results.filter(i => i.id === articleData.id).length === 0 ? "ADD BOOKMARK" : "REMOVE BOOKMARK"}
                        </p>
                    </div>
                    <div className={"dateTitlesSection"}>
                        <p style={{fontFamily: "Roboto", fontWeight: 400, fontSize: 12, marginTop: "2em"}}>
                            {day} {date} {month} {year} {time} BST
                        </p>
                        <p style={{
                            fontFamily: "Georgia",
                            fontWeight: 700,
                            fontSize: 34,
                            marginTop: "0.5em",
                            marginBottom: "0em"
                        }}>
                            {articleData.title}
                        </p>
                        <p style={{fontFamily: "Georgia", fontWeight: 700, fontSize: 20, marginTop: "0.5em"}}>
                            {articleData.trailText.split('.').shift().replace(/(<([^>]+)>)/gi, "")}
                        </p>
                    </div>
                    <div className={"bodyTextSection"}>
                        <p style={{
                            fontFamily: "Roboto", fontWeight: 400, fontSize: 14, width: "100%", marginRight: "4em",
                            marginTop: 0, borderTop: "0.5px solid #979797", paddingTop: "1em"
                        }}>
                            {articleData.body.replace(/[^\w\s]/gi, '')}
                        </p>
                        <img
                            className={articleData.img === undefined ? "imgSection" : "imgSectionSecond"}
                            src={articleData.img !== undefined ? articleData.img : logo}
                            alt="new"
                        />
                    </div>
                </div>)}
            <div className={!snackbarStatus ? "snackbar" : "snackbarShow"} style={{
                marginTop: snackbarStatus ?
                    "3em" : ""
            }}>
                <Snackbar title={bookmarksData.results.filter(i => i.id === articleData.id).length !== 0 ?
                    "SAVED TO BOOKMARKS" : "REMOVED FROM BOOKMARKS"}
                          status={bookmarksData.results.filter(i => i.id === articleData.id).length !== 0 ?
                              "addBookmark" : "deleteBookmark"}/>
            </div>
            {articleData.item === "" ? <></> : (
                <div style={{
                    width: "100%",
                    height: 126,
                    backgroundColor: "#09357B",
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "end",
                    marginTop: !snackbarStatus ? "5em" : ""
                }}/>)}
        </div>
    );
}

export default NewsArticle;