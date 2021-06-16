import React from 'react'
import "./Class.css"
import ClassCard from './../../component/ClassCard/ClassCard'
import { connect } from 'react-redux'

import Locale from './../../locale/language.json'

class Class extends React.Component{
    state = {
        classes: [
        // Demo Data
        {
            title:"DS Algo",
            date:"03/6/2021"
        },
        {
            title:"Statistic",
            date:"03/6/2021"
        }
    ]
    }

    componentDidMount() {
        fetch('api/class', {method: "GET"})
        .then(res => res.json())
        .then(data => this.setState({classes: data.classes}))
    }

    postClass() {
        fetch('api/class', {method: "POST"}).then(() => {
            console.log('fetch completed')
        })
    }

    render(){
        return (
            <div className="class__container">
                <div className="class__make--button">
                    <button onClick={this.postClass}>{Locale.class.class_heading[this.props.language]}</button>
                </div>
                <ul className="class__main--ul">
                    {this.state.classes.map(item => <ClassCard title={item.title} date={item.date} />)}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language:state.lang.language
    }
}

export default connect(mapStateToProps)(Class)