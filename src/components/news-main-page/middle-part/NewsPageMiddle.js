import React from 'react';
import './NewsPageMiddle.css';
import logo from "../../../assets/images/Logo_White.png";
import {useNavigate} from "react-router-dom";
import {actions} from "../../../store/news-page-reducer";
import {useDispatch} from "react-redux";
import * as _ from "lodash";


function NewsPageMiddle({data, name}) {
    const navigate = useNavigate();
    const dispatch = useDispatch()


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
        <div>
            {name !== "" && data.length !== 0 && (
                <div className={name !== "bookmarks" ? "sectionName" : "sectionNameBookmarks"}>
                    <p style={{
                        fontStyle: "Georgia", fontWeight: 700, fontSize: 34, margin: 0
                    }}>
                        {name !== "bookmarks" && name}
                    </p>
                </div>
            )}
            {data.length !== 0 && (
                <div id="PhotoContainer">
                    {data.map((item) => (
                        <div className="sectionMiddleFirst"
                             onClick={() => redirectToArticleHandler(item.webPublicationDate,
                                 item.webTitle, item.fields.trailText, item.fields.bodyText, item.fields.thumbnail,
                                 item.id, item)}>
                            <div style={{
                                height: "45%", width: "100%", backgroundColor: "#09357B", position: "absolute",
                                bottom: 0, opacity: 0.8
                            }}>
                                <div style={{
                                    width: "90%", display: "flex", height: "100%", flexDirection: "column",
                                    justifyContent: "center", margin: "0 auto"
                                }}>
                                    <h3 style={{marginBottom: 0, marginTop: 0}}>{item.webTitle}</h3>
                                    {name === "" && name !== "bookmarks" &&
                                        <p style={{fontSize: 14, marginTop: 5, marginBottom: 0}}>
                                            {item.fields.trailText.split('.').shift().replace(/(<([^>]+)>)/gi, "")}
                                        </p>}
                                </div>
                            </div>

                            <div style={{
                                display: "flex", justifyContent: "center", alignItems: "center",
                                height: item.fields.thumbnail !== undefined ? "100%" : "70%"

                            }}>
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


                    ))}
                </div>)}
        </div>
    );
}

export default NewsPageMiddle;