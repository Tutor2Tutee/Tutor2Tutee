import React,{useState} from 'react'
import "./Header.css"
import { useSelector,useDispatch } from 'react-redux'

import ImgSrc from './../../shared/ImgSrc'
import Nav from './../Nav/Nav'
import * as actionCreator from './../../store/actions/language'

const Header = (props) => {
    const [showLang,setShowLang] = useState(false)

    let language = useSelector(state => state.lang.language)
    
    const dispatch = useDispatch()
    const languageHandler = (lang) => {
        dispatch(actionCreator.toggleLang(lang))
    }

    return (
        <header className="header">
            <div><h1 className="header__h1">Tutor<label className="header__h1--label">2</label>Tutee</h1></div>
            <div className="header__lang--container">
                <div className="header__lang--main" onClick={() => setShowLang(prev => !prev)} > 
                    <div>
                        <img src={ImgSrc.translate} /> 
                    </div>
                    <h1>{language === "kor" ? "언어" : "Language"}</h1>
                </div>
                {
                    showLang && (
                    <div className="header__lang--option" onClick={() => setShowLang( prev => !prev)}>
                        <button onClick={languageHandler.bind(this,"kor")}>한국어</button>
                        <button onClick={languageHandler.bind(this,"en")}>English</button>
                    </div>
                    )
                }
            </div>
            
            <div onClick={props.toggleSD} className="header_toggle--btn">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <Nav />
        </header>
    )
}

export default Header;