import Image from "next/image";
import nextjs from "/public/nextjs1.png";
import typescript from "/public/typescript1.png";
import spring from "/public/spring1.png";
import postgresql from "/public/postgresql1.png";
import react from "/public/react.png";
import tailwind from "/public/tailwind.png";
import html from "/public/html.png";
import css from "/public/css.png";

function AboutPage() {
  return (
    <main className="prose mx-auto p-4">
      <section>
        <h2 className="font-bold text-center">Welcome to USePinion</h2>
        <p className="text-justify m-4">
          Where student opinions take center stage! Our web-based platform is
          all about letting students freely share their thoughts on various
          topics. USePinion uses smart hash maps to keep things organized and
          user-friendly. It&apos;s not just a place to express opinions;
          it&apos;s a vibrant community where every voice matters. Join us in
          making opinions heard and discussions lively. USePinion: Your space,
          your voice, your opinions!
        </p>
      </section>

      <section className="mt-14">
        <h3 className="text-center mb-8">Technologies used</h3>
        <div>
          <div className="flex flex-row flex-wrap items-center justify-center text-md gap-6">

            <div className="flex flex-col items-center justify-center">
              <Image
                className="m-0"
                src={nextjs}
                width={70}
                height={70}
                alt="no image"
              />
              <p className="m-1">Next.Js</p>
              
            </div>

            <div className="flex flex-col items-center justify-center">
              <Image
                className="m-0"
                src={typescript}
                width={70}
                height={70}
                alt="no image"
              />
              <p className="m-1">TypeScript</p>
            </div>

            <div className="flex flex-col items-center justify-center">
              <Image
                className="m-0"
                src={spring}
                width={70}
                height={70}
                alt="no image"
              />
              <p className="m-1">Spring</p>
            </div>

            <div className="flex flex-col items-center justify-center">
              <Image
                className="m-0"
                src={postgresql}
                width={70}
                height={70}
                alt="no image"
              />
              <p className="m-1">PostgreSQL</p>
            </div>

            <div className="flex flex-col items-center justify-center">
              <Image
                className="m-0"
                src={react}
                width={70}
                height={70}
                alt="no image"
              />
              <p className="m-1">React</p>
            </div>

            <div className="flex flex-col items-center justify-center">
              <Image
                className="m-0"
                src={tailwind}
                width={70}
                height={70}
                alt="no image"
              />
              <p className="m-1">Tailwind</p>
            </div>

            <div className="flex flex-col items-center justify-center">
              <Image
                className="m-0"
                src={html}
                width={70}
                height={70}
                alt="no image"
              />
              <p className="m-1">HTML</p>
            </div>

            <div className="flex flex-col items-center justify-center">
              <Image
                className="m-0"
                src={css}
                width={70}
                height={70}
                alt="no image"
              />
              <p className="m-1">CSS</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AboutPage;
