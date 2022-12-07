import React from "react";
import { Link } from "react-router-dom";
import { MdLocationOn, MdPhone, MdMail } from "react-icons/md";
import { BsTwitter, BsInstagram, BsGithub, BsFacebook } from "react-icons/bs";

const Footer = () => {
	return (
		<footer className="footer">
			<div className="footer-contact">
				<div>
					<button>
						<MdLocationOn />
					</button>
					Gliwice, Poland
				</div>
				<div>
					<button>
						<MdPhone />
					</button>
					+48 783 446 822
				</div>
				<div>
					<button>
						<MdMail />
					</button>
					weather@gmail.com
				</div>
			</div>
			<div className="footer-socials">
				<ul className="footer-socials-other">
					<li>
						<Link to="/">about</Link>
					</li>
					<li>
						<Link to="/">account</Link>
					</li>
					<li>
						<Link to="/">privacy</Link>
					</li>
				</ul>
				<div className="footer-socials-buttons">
					<button>
						<BsGithub />
					</button>
					<button>
						<BsTwitter />
					</button>
					<button>
						<BsFacebook />
					</button>
					<button>
						<BsInstagram />
					</button>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
