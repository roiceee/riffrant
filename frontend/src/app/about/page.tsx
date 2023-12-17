import Image from "next/image";
import nextjs from "/public/nextjs.png";
import typescript from "/public/typescript.png";
import spring from "/public/spring.png";
import java from "/public/java.png";
import postgresql from "/public/postgresql.png";


function AboutPage() {


    return ( 
        <main className="prose mx-auto border-2 border-red rounded-lg p-4">
            <div>
                <h2 className="font-bold text-center">Welcome to USePinion</h2>
                <p className="text-justify m-4">
                    Where student opinions take center stage! Our web-based platform is all about letting students freely share their thoughts on various topics. USePinion uses smart hash maps to keep things organized and user-friendly. It&apos;s not just a place to express opinions; it&apos;s a vibrant community where every voice matters. Join us in making opinions heard and discussions lively. USePinion: Your space, your voice, your opinions!
                </p>
            </div>

            <div>
                <h4 className="p-4">Technologies used:</h4>
                <div className="flex space-x-4  w-100" >
                    <div className="flex flex-row ml-12 justify-between">
                        <div className="m-4 flex flex-col items-center">
                            <p>NEXT.JS</p>
                            <Image className="m-0" src={nextjs} width={40} height={40} alt="no image" />
                        </div>
                            
                        <div className="m-4 flex flex-col items-center">
                            <p>TYPESCRIPT</p>
                            <Image className="m-0" src={typescript} width={40} height={40} alt="no image" />
                        </div>

                        <div className="m-4 flex flex-col items-center">
                            <p>SPRING</p>
                            <Image className="m-0" src={spring} width={40} height={40} alt="no image" />
                        </div>

                        <div className="m-4 flex flex-col items-center">
                            <p>JAVA</p>
                            <Image className="m-0" src={java} width={40} height={40} alt="no image" />
                        </div>

                        <div className="m-4  flex flex-col items-center">
                            <p>POSTGRESQL</p>
                            <Image className="m-0" src={postgresql} width={40} height={40} alt="no image" />
                        </div>
                    </div>
                </div>
             </div>

        </main>
     );
}

export default AboutPage;