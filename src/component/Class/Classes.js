import React from 'react'

class Classes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {classes: {}}

    }

    postClass() {
        fetch('api/class', {method: "POST"}).then(r => {

        })
    }

    componentDidMount() {
        fetch('api/class', {method: "GET"})
            .then(res => {
                res.json()
            })

    }


    render() {
        return (
            <>
                <button onClick={this.postClass}>Make Class</button>
            </>
        )
    }
}


export default Classes