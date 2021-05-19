import React from 'react'

function postClass() {
    fetch('api/class', {method: "POST"}).then(() => {
        console.log('fetch completed')
    })
}

class Classes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {classes: {}}

    }


    componentDidMount() {
        fetch('api/class', {method: "GET"})
            .then(res => res.json())
            .then(data => this.setState({classes: data.classes}))

    }


    render() {
        const classes = this.state
        return (
            <>
                <button onClick={() => {
                    postClass()
                }}>Make Class
                </button>
                {classes.size > 0
                    ? classes.map((_class) => {
                        return <li>{_class.name}</li>
                    })
                    : <p>Nothing here</p>}
            </>
        )
    }

}


export default Classes