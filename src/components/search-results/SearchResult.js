import React, {useRef, useCallback} from 'react'
import {useDispatch, useSelector} from "react-redux";
import logo from "../../assets/images/Logo_White.png";
import {actions, searchNewContent} from "../../store/news-page-reducer";
import {useNavigate} from "react-router-dom";
import * as _ from "lodash";


export default function SearchResult({searchData}) {

    const userSearchRequest = useSelector((state) => state.newsMainPage.userSearchRequest);
    const pageNum = useSelector((state) => state.newsMainPage.pageNum);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const observer = useRef()
    const lastBookElementRef = useCallback(node => {
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(async entries => {
            if (entries[0].isIntersecting) {
                dispatch(actions.changePageLoaderStatus(true))
                await dispatch(searchNewContent(userSearchRequest, pageNum, 'scroll', searchData));
                dispatch(actions.changePageLoaderStatus(false))
            }
        })
        if (node) observer.current.observe(node)
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchData])

    const redirectToArticleHandler = async (date, title, trailText, body, img, id, item) => {
        const idClone = _.cloneDeep(id);
        dispatch(actions.articleData(
            {
                date: date,
                title: title,
                trailText: trailText,
                body: body,
                img: img,
                id: id,
                item: [item]
            }
        ))
        return navigate(`/article/${idClone}`)
    }

    return (
        <div style={{marginTop: "3em"}}>
            {searchData.results.length !== 0 && (
                <div id="PhotoContainer">
                    {searchData.results.map((item, index) => {
                        if (searchData.results.length === index + 1 && searchData.results.length !== 1) {
                            return <div className="sectionMiddleFirst"
                                        onClick={() => redirectToArticleHandler(item.webPublicationDate,
                                            item.webTitle, item.fields.trailText, item.fields.bodyText, item.fields.thumbnail,
                                            item.id, item)}>
                                <div style={{
                                    height: "40%", width: "100%", backgroundColor: "#09357B", position: "absolute",
                                    bottom: 0, opacity: 0.8
                                }}>
                                    <div style={{width: "90%", margin: "0 auto"}}>
                                        <p>{item.webTitle}</p>
                                    </div>
                                </div>

                                <div style={{
                                    display: "flex", justifyContent: "center", alignItems: "center",
                                    height: item.fields.thumbnail !== undefined ? "100%" : "70%"

                                }}
                                     ref={lastBookElementRef} key={item}
                                >
                                    <img
                                        style={{
                                            width: item.fields.thumbnail !== undefined ? "100%" : "60%",
                                            height: item.fields.thumbnail !== undefined ? "100%" : "",
                                            objectFit: item.fields.thumbnail !== undefined ? "cover" : "",
                                            backgroundColor: item.fields.thumbnail === undefined ? "#0D47A1" : ""
                                        }}
                                        src={item.fields.thumbnail !== undefined ?
                                            item.fields.thumbnail : logo}
                                        alt="new"
                                    />
                                </div>
                            </div>
                        } else {
                            return <div className="sectionMiddleFirst"
                                        onClick={() => redirectToArticleHandler(item.webPublicationDate,
                                            item.webTitle, item.fields.trailText, item.fields.bodyText, item.fields.thumbnail,
                                            item.id, item)}>
                                <div style={{
                                    height: "40%", width: "100%", backgroundColor: "#09357B", position: "absolute",
                                    bottom: 0, opacity: 0.8
                                }}>
                                    <div style={{width: "90%", margin: "0 auto"}}>
                                        <p>{item.webTitle}</p>
                                    </div>
                                </div>

                                <div style={{
                                    display: "flex", justifyContent: "center", alignItems: "center",
                                    height: item.fields.thumbnail !== undefined ? "100%" : "70%"

                                }} key={item}>
                                    <img
                                        style={{
                                            width: item.fields.thumbnail !== undefined ? "100%" : "60%",
                                            height: item.fields.thumbnail !== undefined ? "100%" : "",
                                            objectFit: item.fields.thumbnail !== undefined ? "cover" : "",
                                            backgroundColor: item.fields.thumbnail === undefined ? "#0D47A1" : ""
                                        }}
                                        src={item.fields.thumbnail !== undefined ?
                                            item.fields.thumbnail : logo}
                                        alt="new"
                                    />
                                </div>
                            </div>
                        }
                    })}
                </div>)}
        </div>
    )
}

