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
              text={`Je m’appelle Goran Paunovic, développeur web passionné, spécialisé dans la conception d'applications web modernes, performantes et accessibles.
                
Je conçois des interfaces soignées et des fonctionnalités robustes en m’appuyant sur des technologies comme React, Node.js, Prisma, MySQL, et Next.js.

Chaque projet est pour moi une opportunité de progresser, d’appliquer les bonnes pratiques et de proposer des solutions efficaces, toujours avec sérieux et implication.

Curieux, rigoureux et motivé, je m’investis pleinement dans chaque mission avec un souci constant de qualité et de fiabilité.

Bonne visite, et n’hésitez pas à me contacter pour échanger ou collaborer !`}
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
