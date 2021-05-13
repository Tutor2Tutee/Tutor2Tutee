import React from 'react'

const About = ({match}) => {
    return (
        <div>
            <h2>
                This is About {match.params.name}
            </h2>
        </div>
    )
}

export default About
