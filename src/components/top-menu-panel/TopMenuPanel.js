import React from 'react';
import bookmarkLogo from "../../assets/images/bookmark-logo.png";
import DropDownMenu from "../HelperFunctions&Components/drop-down-menu/DropDownMenu";
import {useNavigate} from "react-router-dom";
import "./TopMenuPanel.css";

function TopMenuPanel({title, dropDownStatus}) {
    const navigate = useNavigate();


    return (
        <>
            <div className={"bookmarkSectionTitle"}>
                <p style={{
                    fontStyle: "Georgia", fontWeight: 700, fontSize: 48,
                }}>
                    {title}
                </p>
            </div>
            <div className={"bookmarkSortingSection"}>
                {dropDownStatus === "none" ? <></> : (
                    <div
                        className={"bookmarkSortingSectionButton"}
                         onClick={() => navigate(`/bookmarks`)}>
                        <img style={{height: 18, width: 20, marginTop: 2, objectFit: "contain"}} src={bookmarkLogo}
                             alt="searchLogo"/>
                        <p style={{
                            fontStyle: "Roboto", fontWeight: 500, fontSize: 14, color: "#FFFFFF"
                        }}>
                            VIEW BOOKMARK
                        </p>
                    </div>)}
                <DropDownMenu title={title}/>
            </div>
        </>
    );
}

export default TopMenuPanel;