import PropTypes from "prop-types";
import GitHub from "../../assets/icon-github.webp";
import Linkedin from "../../assets/icon-linkedin.webp";
import "../Links/Links.scss";

export default function Links({ title }) {
  const openLink = (url) => {
    window.open(url, "_blank");
  };
  return (
    <div className="links">
      <h2 className="links__title">{title}</h2>
      <div className="links__lien">
        <img
          src={GitHub}
          alt="Icon GitHub"
          className="links__lien--git"
          onClick={() => openLink("https://github.com/gpaunovic72")}
        />
        <img
          src={Linkedin}
          alt="Icon Linkedin"
          className="links__lien--linkedin"
          onClick={() =>
            openLink("https://www.linkedin.com/in/goran-paunovic-41a978208/")
          }
        />
        {/* <img
          src={CV}
          alt="Icon CV"
          className="links__lien--cv"
          onClick={() => openLink("/PortFolio/Goran_Paunovic_CV.pdf")}
        /> */}
      </div>
    </div>
  );
}

Links.propTypes = {
  title: PropTypes.string.isRequired,
};
