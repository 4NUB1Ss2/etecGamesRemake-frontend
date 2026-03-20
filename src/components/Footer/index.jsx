import './style.css'
import { FaFacebookF, FaTwitter, FaGoogle, FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa'

function Index() {
    const socials = [
        { icon: <FaFacebookF />, color: '#1877f2', link: '#', label: 'Facebook' },
        { icon: <FaTwitter />,   color: '#1da1f2', link: '#', label: 'Twitter' },
        { icon: <FaGoogle />,    color: '#ea4335', link: '#', label: 'Google' },
        { icon: <FaInstagram />, color: '#c13584', link: '#', label: 'Instagram' },
        { icon: <FaLinkedinIn />,color: '#0a66c2', link: '#', label: 'LinkedIn' },
        { icon: <FaGithub />,    color: '#e0e0e0', link: 'https://github.com/4NUB1Ss2', label: 'GitHub' },
    ]

    return (
        <footer className="footer-custom">
            <div className="footer-line" />
            <div className="footer-inner">

                <div className="footer-brand">
                    <span className="footer-logo-bracket">[</span>
                    ETEC<span className="footer-logo-accent">Games</span>
                    <span className="footer-logo-bracket">]</span>
                </div>

                <div className="footer-socials">
                    {socials.map((s, i) => (
                        <a
                            key={i}
                            href={s.link}
                            target={s.link !== '#' ? '_blank' : undefined}
                            rel="noreferrer"
                            className="footer-social-btn"
                            style={{ '--social-color': s.color }}
                            title={s.label}
                        >
                            {s.icon}
                        </a>
                    ))}
                </div>

                <p className="footer-copy">
                    © 2026 —{' '}
                    <a href="https://github.com/4NUB1Ss2" target="_blank" rel="noreferrer" className="footer-author">
                        Giovanni Rohrig
                    </a>
                </p>

            </div>
        </footer>
    )
}

export default Index