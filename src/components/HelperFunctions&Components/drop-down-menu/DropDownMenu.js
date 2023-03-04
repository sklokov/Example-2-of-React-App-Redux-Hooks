import React, {useState} from 'react';
import arrow from "../../../assets/images/arrow.png";
import {actions, getDataForMainPage} from "../../../store/news-page-reducer";
import {useDispatch, useSelector} from "react-redux";
import {orderBy} from "lodash";
import "../../top-menu-panel/TopMenuPanel.css";

function DropDownMenu({title}) {
    const dispatch = useDispatch();
    const sortingStatus = useSelector((state) => state.newsMainPage.sortingStatus);
    const bookmarksData = useSelector((state) => state.newsMainPage.bookmarksData);
    const [active, setActive] = useState(false);


    const sortHandler = async (value) =>{
        if((value === 'Newest first' && title !== 'All bookmark') || (value === 'Oldest first' && title !== 'All bookmark')) {
            dispatch(actions.changeSortingStatus(value));
            dispatch(getDataForMainPage(value === 'Newest first' ? 'newest' : 'oldest'));
        } else {
            dispatch(actions.changeSortingStatus(value));
            let sortedBookmarks = orderBy(bookmarksData.results,  "fields.lastModified", value === 'Newest first' ? "asc" : "desc");
            dispatch(actions.changeBookmarksData(
                {results: sortedBookmarks}
            ))
        }
    }

    return (
        <>
            {active ? (
                <div className={"dropDownMenuOpened"} onClick={() => setActive(!active)}>
                    <div className={"dropDownMenuOpenedSecondPart"}>
                        <p style={{marginLeft: 5}} onClick={() => sortHandler('Newest first')}>
                            Newest first
                        </p>
                        <img style={{
                            height: 18,
                            width: 20,
                            marginTop: 2,
                            objectFit: "contain",
                            transform: "rotate(180deg)"
                        }} src={arrow}
                             alt="searchLogo"/>
                    </div>
                    <p style={{marginLeft: 5, marginTop: 5}} onClick={() => sortHandler('Oldest first')}>
                        Oldest first
                    </p>
                    {/*<p style={{marginLeft: 5, marginTop: 5}} onClick={() => sortHandler('Most popular')}>*/}
                    {/*    Most popular*/}
                    {/*</p>*/}

                </div>
            ) : (
                <div
                    className={"dropDownMenuClosed"}
                    // style={{width: 255, marginLeft: "1.5em", borderLeft: "1px solid white", background: "white",
                    // borderBottom: "1px solid black", height: 40}}
                     onClick={() => setActive(!active)}>
                    <div
                        className={"dropDownMenuClosedSecondPart"}
                    //     style={{
                    //     display: "flex",
                    //     justifyContent: "space-between",
                    //     alignItems: "center",
                    //     width: 250,
                    //     height: 38
                    // }}
                    >
                        <p style={{marginLeft: 5}}>{sortingStatus}</p>
                        <img style={{height: 18, width: 20, marginTop: 2, objectFit: "contain"}} src={arrow}
                             alt="searchLogo"/>
                    </div>
                </div>
            )}
        </>

    );
}

export default DropDownMenu;

