import React from 'react'

export class AppFooter extends React.Component {
    render() {
        return (
            <footer>
                <a href="/" className="app-name pointer">Mister Toy</a>
                <div className="contact-us">
                    <a target="_blank" href="https://www.linkedin.com/in/matan-levi-561115199/" className="fab fa-linkedin"></a>
                    <a target="_blank" href="https://www.linkedin.com/in/matan-levi-561115199/" className="name">Matan</a>
                </div>
            </footer>
        )
    }
}
