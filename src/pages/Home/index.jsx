import Picture from "../../assets/photographie-goran-paunovic.webp";
import Links from "../../components/Links";
import ModalButton from "../../components/ModalButton";
import PictureProfile from "../../components/PictureProfile";
import Contact from "../../components/Profil";
import "../Home/Home.scss";

export default function Home() {
  return (
    <div className="home">
      <PictureProfile picture={Picture} name="Goran Paunovic" />
      <div className="home__profil">
        <Contact name="Goran Paunovic" text="Développeur Web" />
        <ModalButton />
        <Contact name="" text="Le Breil sur Mérize, 72370" />
        <hr className="home__profil--separation"></hr>
        <Links title="Liens utiles" />
      </div>
    </div>
  );
}
