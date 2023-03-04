import React, {useCallback, useEffect, useState} from 'react';
import './Navbar.css';
import logo from '../../assets/images/Logo_White.png'
import searchLogo from '../../assets/images/search.png'
import debounce from 'lodash.debounce';
import {actions, searchNewContent} from "../../store/news-page-reducer";
import {useDispatch, useSelector} from "react-redux";
import {useComponentVisible} from "../HelperFunctions&Components/useComponentVisible";
import {useNavigate} from "react-router-dom";

function useDebounce(callback, delay) {
    //eslint-disable-next-line react-hooks/exhaustive-deps
    return useCallback(
        debounce((...args) => callback(...args), delay),
        [delay]
    );
}

function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const newsPageLoaderStatus = useSelector((state) => state.newsMainPage.newsPageLoaderStatus);
    const [dbValueUserRequest, setDbValueUserRequest] = useState('');
    const debouncedUserRequest = useDebounce((e) => setDbValueUserRequest(e.target.value), 2000);
    const {
        ref,
        isComponentVisible,
        setIsComponentVisible
    } = useComponentVisible(false);


    useEffect(() => {
        if (dbValueUserRequest) {
            handleSearch(dbValueUserRequest, 1);
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dbValueUserRequest])


    const goToHomeHandler = () => {
        dispatch(actions.changeSearchData({results: []}))
        navigate(`/home`)
    }

    async function handleSearch(query, pageNumber) {
        dispatch(actions.changePageLoaderStatus(true))
        await dispatch(searchNewContent(query, pageNumber, 'search', null));
        dispatch(actions.changePageLoaderStatus(false))
    }

    const checkKeyPress = (e) => {
        const {keyCode} = e;
        if (keyCode === 13) {
            debouncedUserRequest(e)
        }
    };

    return (
        <div>
            <div style={{
                width: "100%",
                height: 126,
                backgroundColor: "#09357B",
                display: "flex",
                justifyContent: "end",
                alignItems: "end"
            }}>
                <img className={"logoSection"}
                     src={logo} alt="logo" onClick={goToHomeHandler}/>
                <div ref={ref}>
                    {isComponentVisible && (
                        <div style={{position: "relative", padding: 0, margin: 0}}>
                            <input id="inputID" autoComplete="off" disabled={newsPageLoaderStatus} style={{
                                width: "22vw",
                                height: 40,
                                color: "white",
                                backgroundColor: "#2253A3",
                                borderBottom: "3px solid white",
                                marginRight: "10em",
                                display: "flex",
                                justifyContent: "space-around",
                                alignItems: "center",
                                position: "relative"
                            }}
                                   placeholder={"Search all news"}
                                   onChange={(e) => debouncedUserRequest(e)}
                                   onKeyDown={(e) => checkKeyPress(e)}
                            />
                            <img style={{height: 30, width: 30, objectFit: "contain"}} src={searchLogo} alt="searchLogo"
                                 className={"image"}/>
                        </div>
                    )}
                    {!isComponentVisible && (
                        <div className={"searchSection"}
                             onClick={() => setIsComponentVisible(true)}>
                            <img style={{height: 30, width: 30, objectFit: "contain"}} src={searchLogo}
                                 alt="searchLogo"/>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

export default Navbar;