import './style.css'
import {FaFacebookF, FaTwitter, FaGoogle, FaInstagram, FaLinkedinIn, FaGithub} from 'react-icons/fa'


function Index() {
    const socials = [
        {icon: <FaFacebookF/>, color: 'btn-facebook'},
        {icon: <FaTwitter/>, color: 'btn-twitter'},
        {icon: <FaGoogle/>, color: 'btn-google'},
        {icon: <FaInstagram/>, color: 'btn-instagram'},
        {icon: <FaLinkedinIn/>, color: 'btn-linkedin'},
        {icon: <FaGithub/>, color: 'btn-github'},
    ]

    return (
        <footer className="bg-dark text-center py-4">
            <div className="d-flex justify-content-center gap-2 mb-3">
                {socials.map((s, i) => (
                    <a key={i} href="#" className={`btn ${s.color} btn-floating rounded-circle`}
                       style={{
                           width: '40px',
                           height: '40px',
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'center'
                       }}
                    >
                        {s.icon}
                    </a>
                ))}
            </div>

            <p className="text-secondary mb-0" style={{fontSize: '14px'}}>
                © 2026 Copyright:{' '}
                <a href="https://github.com/4NUB1Ss2" className="text-info text-decoration-none ">
                    Giovanni Rohrig
                </a>


            </p>

        </footer>
    )

}

export default Index