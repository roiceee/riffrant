import Image from "next/image";
import nextjs from "/public/nextjs2.png";
import typescript from "/public/typescript1.png";
import mongodb from "/public/mongodb.png";
import react from "/public/react.png";
import tailwind from "/public/tailwind.png";
import html from "/public/html.png";
import css from "/public/css.png";
import share from "/public/share.svg";
import theme from "/public/theme1.svg";
import filter from "/public/filter.svg";
import edit from "/public/edit.svg";
import deletePost from "/public/delete.svg";
import vote from "/public/vote.svg";
import NextImage from "@/components/about/next-image";

function AboutPage() {

  

  return (
    <main className="prose mx-auto p-4">
      <section>
        <h1 className="font-bold text-center">RiffRant</h1>
        <p className="text-justify m-4">
          Join the conversation, express your thoughts, and build connections in a space designed for the joy of sharing—your very own hub for daily dialogue and meaningful interactions.
        </p>
      </section>

      <section className="mt-20">

        <h2 className="flex items-center justify-center m-0 p-0">Features</h2>

        <div className="flex items-center justify-center flex-wrap-reverse my-10" >

          <Image
                  className=" flex-1 m-0"
                  src={share}
                  width={400}
                  height={400}
                  alt="no image"
                />

            <div className="flex-1 m-0">
              <h4>Share your Thoughts</h4>
              <p className="text-justify">
                Users can express their opinions, ideas, or reactions by posting their thoughts on the platform.  
              </p>
            </div>
          </div>

        <div className="flex items-center justify-center flex-wrap my-10" >

        <div className="flex-1 m-0">
            <h4>Filter Posts</h4>
            <p className="text-justify">
              Allows user to customize the contents they see in their feed. 
            </p>
          </div>

        <Image
                className="flex-1 m-0"
                src={filter}
                width={300}
                height={300}
                alt="no image"
              />
        </div>

        <div className="flex items-center justify-center flex-wrap-reverse my-10" >

        <Image
                className=" flex-1 m-0"
                src={edit}
                width={300}
                height={300}
                alt="no image"
              />

          <div className="flex-1 m-0">
            <h4>Edit Posts</h4>
            <p className="text-justify">
              Users have the ability to modify the content of their posts after posting. 
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center flex-wrap my-10" >

            <div className="flex-1 m-0">
                <h4>Delete Posts</h4>
                <p className="text-justify">
                  Users can remove their posts from the platform. 
                </p>
              </div>

            <Image
                    className="flex-1 m-0"
                    src={deletePost}
                    width={300}
                    height={300}
                    alt="no image"
                  />
          </div>

          <div className="flex items-center justify-center flex-wrap-reverse my-10" >

              <Image
                      className=" flex-1 m-0"
                      src={vote}
                      width={300}
                      height={300}
                      alt="no image"
                    />

                <div className="flex-1 m-0">
                  <h4>Upvote & Downvote</h4>
                  <p className="text-justify">
                    This allows users to express their approval (upvote) or disapproval (downvote) of a post or comment.
                  </p>
                </div>
          </div>

        <div className="flex items-center justify-center flex-wrap my-10" >

          <div className="flex-1 m-0">
            <h4>Light and Dark Mode</h4>
            <p className="text-justify">
              Users can choose between a light and dark color scheme for the platform&apos;s interface. 
            </p>
          </div>

          <Image
                className=" flex-1 m-0"
                src={theme}
                width={300}
                height={300}
                alt="no image"
              />
        </div>

      </section>

      <section className="mt-14">
        <h3 className="text-center mb-8">Technologies used</h3>
        <div>
          <div className="flex flex-row flex-wrap items-center justify-center text-md gap-6">

            <div className="flex flex-col items-center justify-center">
              <NextImage/>
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
