import React from 'react';
import './NewsPageTop.css';
import logo from "../../../assets/images/Logo_White.png";
import {useNavigate} from "react-router-dom";
import {actions} from "../../../store/news-page-reducer";
import {useDispatch} from "react-redux";
import * as _ from "lodash";

function NewsPageTop({data}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const redirectToArticleHandler = (date, title, trailText, body, img, id, item) => {
        const idClone = _.cloneDeep(id);
        let params = idClone.split('/')
        const section = params[0];
        const yearPublishing = params[1];
        const monthPublishing = params[2];
        const dayPublishing = params[3];
        const newsId = params[4];

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

        // return navigate(`/article`,{ state:{id}, replace:false })
        return navigate(`/article/${section}/${yearPublishing}/${monthPublishing}/${dayPublishing}/${newsId}`)
    }

    return (
        <div>
            {data.length !== 0 &&
                <div id="content">
                    <main onClick={() => redirectToArticleHandler(data[0].webPublicationDate,
                        data[0].webTitle, data[0].fields.trailText, data[0].fields.bodyText, data[0].fields.thumbnail,
                        data[0].id, data[0])}>
                        <div style={{
                            height: "40%", width: "100%", backgroundColor: "#09357B", position: "absolute",
                            bottom: 0, opacity: 0.8
                        }}>
                            <div style={{
                                width: "90%", display: "flex", height: "100%", flexDirection: "column",
                                justifyContent: "center", margin: "0 auto"
                            }}>
                                <p>{data[0].webTitle}</p>
                            </div>
                        </div>
                        <div style={{
                            display: "flex", justifyContent: "center", alignItems: "center",
                            height: data[0].fields.thumbnail !== undefined ? "100%" : "70%"
                        }}>
                            <img
                                style={{
                                    width: data[0].fields.thumbnail !== undefined ? "100%" : "60%",
                                    height: data[0].fields.thumbnail !== undefined ? "100%" : "",
                                    objectFit: data[0].fields.thumbnail !== undefined ? "cover" : "",
                                    backgroundColor: data[0].fields.thumbnail === undefined ? "#0D47A1" : ""
                                }}
                                src={data[0].fields.thumbnail !== undefined ?
                                    data[0].fields.thumbnail : logo}
                                alt="new"
                            />
                        </div>
                    </main>
                    <section onClick={() => redirectToArticleHandler(data[1].webPublicationDate,
                        data[1].webTitle, data[1].fields.trailText, data[1].fields.bodyText, data[1].fields.thumbnail,
                        data[1].id, data[1])}>
                        <div style={{
                            width: "90%", display: "flex", height: "100%", flexDirection: "column",
                            justifyContent: "center", margin: "0 auto"
                        }}>
                            <p>{data[1].webTitle}</p>
                        </div>
                    </section>
                    <sectionSecond onClick={() => redirectToArticleHandler(data[2].webPublicationDate,
                        data[2].webTitle, data[2].fields.trailText, data[2].fields.bodyText, data[2].fields.thumbnail,
                        data[2].id,data[2])}>
                        <div style={{
                            width: "90%", display: "flex", height: "100%", flexDirection: "column",
                            justifyContent: "center", margin: "0 auto"
                        }}>
                            <p>{data[2].webTitle}</p>
                        </div>
                    </sectionSecond>
                    <sectionThird onClick={() => redirectToArticleHandler(data[3].webPublicationDate,
                        data[3].webTitle, data[3].fields.trailText, data[3].fields.bodyText, data[3].fields.thumbnail,
                        data[3].id, data[3])}>
                        <div style={{
                            height: "40%", width: "100%", backgroundColor: "#09357B", position: "absolute",
                            bottom: 0, opacity: 0.8
                        }}>
                            <div style={{
                                width: "90%", display: "flex", height: "100%", flexDirection: "column",
                                justifyContent: "center", margin: "0 auto"
                            }}>
                                <p>{data[3].webTitle}</p>
                            </div>
                        </div>
                        <div style={{
                            display: "flex", justifyContent: "center", alignItems: "center",
                            height: data[3].fields.thumbnail !== undefined ? "100%" : "70%"
                        }}>
                            <img
                                style={{
                                    width: data[3].fields.thumbnail !== undefined ? "100%" : "60%",
                                    height: data[3].fields.thumbnail !== undefined ? "100%" : "",
                                    objectFit: data[3].fields.thumbnail !== undefined ? "cover" : "",
                                    backgroundColor: data[3].fields.thumbnail === undefined ? "#0D47A1" : ""
                                }}
                                src={data[3].fields.thumbnail !== undefined ?
                                    data[3].fields.thumbnail : logo}
                                alt="new"
                            />
                        </div>
                    </sectionThird>
                    <aside onClick={() => redirectToArticleHandler(data[4].webPublicationDate,
                        data[4].webTitle, data[4].fields.trailText, data[4].fields.bodyText, data[4].fields.thumbnail,
                        data[4].id, data[4])}>
                        <div style={{
                            height: "20vh", width: "100%", backgroundColor: "#09357B", position: "absolute",
                            bottom: 0, opacity: 0.8
                        }}>
                            <div style={{
                                width: "90%", display: "flex", height: "100%", flexDirection: "column",
                                justifyContent: "center", margin: "0 auto"
                            }}>
                                <h3 style={{fontWeight: 700, marginBottom: 0, marginTop: 0}}>
                                    {data[4].webTitle}
                                </h3>
                                <p style={{fontSize: 14, marginTop: 5, marginBottom: 0}}>
                                    {data[4].fields.trailText.split('.').shift().replace(/(<([^>]+)>)/gi, "")}
                                </p>
                            </div>
                        </div>
                        <div style={{
                            display: "flex", justifyContent: "center", alignItems: "center",
                            height: data[4].fields.thumbnail !== undefined ? "100%" : "70%"
                        }}>
                            <img
                                style={{
                                    width: data[4].fields.thumbnail !== undefined ? "100%" : "60%",
                                    height: data[4].fields.thumbnail !== undefined ? "100%" : "",
                                    objectFit: data[4].fields.thumbnail !== undefined ? "cover" : "",
                                    backgroundColor: data[4].fields.thumbnail === undefined ? "#0D47A1" : ""
                                }}
                                src={data[4].fields.thumbnail !== undefined ?
                                    data[4].fields.thumbnail : logo}
                                alt="new"
                            />
                        </div>
                    </aside>
                </div>}
        </div>
    );
}

export default NewsPageTop;