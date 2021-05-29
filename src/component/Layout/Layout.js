import React from 'react'

import Header from './../Header/Header'
import Footer from './../Footer/Footer'

const Layout = (props) => {
    return (
        <React.Fragment>
            <Header />
            <main style={{marginTop:"9vh",position:"relative"}}>
                {props.children}
            </main>
            <Footer />
        </React.Fragment>
    )
}

export default Layout