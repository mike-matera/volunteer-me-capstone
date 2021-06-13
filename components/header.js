import React from 'react';

class Header extends React.Component{
    constructor(props) {
        super(props)

        this.state = {
            scroll: 70,
        }
        this.image = React.createRef()
    }
    componentDidMount() {
        window.addEventListener("scroll", this.handleNavigation)
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleNavigation)
    }

    handleNavigation = () => {
        let ticking = false
        if (!ticking) {
            window.requestAnimationFrame(() => {
                let scrollPercent =
                    (window.pageYOffset / this.image.current.offsetHeight) * 100
                let factor = 3.6
                let currentScroll = scrollPercent / factor + 70

                if (this.image.current.offsetHeight >= window.pageYOffset - 50) {
                    this.setState({ scroll: currentScroll })
                }
                ticking = false
            })
            ticking = true
        }
    }

    render() {
        return (
            <div
                style={{
                    WebkitClipPath: `polygon(0 0, 100% 0, 100% ${this.state.scroll}%, 32% 100%, 0 ${this.state.scroll}%)`,
                    clipPath: `polygon(0 0, 100% 0, 100% ${this.state.scroll}%, 32% 100%, 0 ${this.state.scroll}%)`,
                    width: "100%",
                    height: "60vh",
                    zIndex: "999",
                    position: "relative",
                    background: "url(https://alumni.andrews.edu/wp-content/uploads/2014/07/alumi_volunteer_header-1.jpg) no-repeat center center / cover",
                }}
                ref={this.image}
            >
                {this.props.children}
            </div>
        )
    }
}
export default Header