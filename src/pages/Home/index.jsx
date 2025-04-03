import Picture from "../../assets/photographie-goran-paunovic.webp";
import ExperienceTable from "../../components/ExperienceTable";
import Links from "../../components/Links";
import ModalButton from "../../components/ModalButton";
import PictureProfile from "../../components/PictureProfile";
import Presentation from "../../components/presentation";
import Contact from "../../components/Profil";
import Project from "../../components/Project";
import Stack from "../../components/Stack";
import "../Home/Home.scss";

export default function Home() {
  return (
    <div className="home">
      <section className="home__about">
        <div className="home__about--profil">
          <PictureProfile picture={Picture} name="Goran Paunovic" />
          <Contact name="Goran Paunovic" text="Développeur Web" />
          <ModalButton />
          <Contact name="" text="Le Breil sur Mérize, 72370" />
          <hr className="separation"></hr>
          <Links title="Liens utiles" />
        </div>
        <div className="home__about--presentation">
          <div className="pres">
            <Presentation
              title="BIENVENUE SUR MON PORTFOLIO"
              text={`Je m’appelle Goran Paunovic, j’ai 37 ans et je suis passionné par le développement web et en pleine reconversion professionnelle. Après 8 ans dans le secteur des télécoms et des centaines de déplacements, j’ai décidé de suivre ma passion et de me former à plein temps dans ce domaine.\n
Aujourd’hui, je développe des applications web performantes et accessibles en utilisant la stack MERN, et je continue d'élargir mes compétences avec Next.js et TypeScript à travers de projets concrets.\n Je suis à la recherche d'une alternance qui me permettra de monter en compétence.

Bonne visite et n’hésitez pas à me contacter pour échanger !`}
            />
            <Stack />
          </div>
        </div>
      </section>
      <section className="home__career">
        <div className="home__career--exp">
          <ExperienceTable />
        </div>
        <div className="home__career--project">
          <Project />
        </div>
      </section>
    </div>
  );
}
