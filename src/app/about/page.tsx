import Image from "next/image";
import nextjs from "/public/nextjs2.png";
import typescript from "/public/typescript1.png";
import mongodb from "/public/mongodb.png";
import react from "/public/react.png";
import tailwind from "/public/tailwind.png";
import html from "/public/html.png";
import css from "/public/css.png";

function AboutPage() {
  return (
    <main className="prose mx-auto p-4">
      <section>
        <h2 className="font-bold text-center">Welcome to RiffRant</h2>
        <p className="text-justify m-4">
        Welcome to RiffRant, where diverse opinions thrive in a respectful community. Express yourself responsibly with a limited number of posts to ensure a high-quality experience and prevent spam. Access your profile for reflection, but engage with the community by posting directly on personal profiles. Our advanced spam tracker, using hash mapping, ensures a spam-free space. Users have control, with the ability to delete posts that are automatically removed from their profile view. Administrators uphold a positive atmosphere, blocking accounts that violate guidelines. Join RiffRant to contribute to dynamic discussions through comments and be part of a community that values and elevates diverse opinions. Let&apos;s redefine online conversations together!
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
                src={mongodb}
                width={70}
                height={70}
                alt="no image"
              />
              <p className="m-1">MongoDB</p>
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
