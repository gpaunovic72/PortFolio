import Picture from "../../../public/assets/photographie-goran-paunovic.webp";
import ExperienceTable from "../../components/ExperienceTable";
import Links from "../../components/Links";
import ModalButton from "../../components/ModalButton";
import PictureProfile from "../../components/PictureProfile";
import Presentation from "../../components/presentation";
import Contact from "../../components/Profil";
import Stack from "../../components/Stack";
import "../Home/Home.scss";

export default function Home() {
  return (
    <div className="home">
      <section className="home__profil">
        <PictureProfile picture={Picture} name="Goran Paunovic" />
        <Contact name="Goran Paunovic" text="Développeur Web" />
        <ModalButton />
        <Contact name="" text="Le Breil sur Mérize, 72370" />
        <hr className="home__profil--separation"></hr>
        <Links title="Liens utiles" />
      </section>
      <section className="home__presentation">
        <div className="home__presentation--pres">
          <Presentation
            title="BIENVENUE SUR MON PORTFOLIO"
            text="Je m’appelle Goran Paunovic, j’ai 37 ans et je suis passionné par le développement web et en pleine reconversion professionnelle. Après 8 ans dans le secteur des télécoms et des centaines de déplacements, j’ai décidé de suivre ma passion et de me former à plein temps dans ce domaine.
Aujourd’hui, je conçois des applications web performantes et accessibles, avec une soif d’apprendre et une curiosité toujours tournée vers les nouvelles technologies.
Bonne visite et n’hésitez pas à me contacter pour échanger !"
          />
          <Stack />
        </div>
        <div className="home__exp">
          <ExperienceTable />
        </div>
      </section>
    </div>
  );
}
