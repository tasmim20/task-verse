import React from 'react';
import Image from "next/image"; 
import Img1 from "../../../../public/1.jpg"; 
import Img2 from "../../../../public/2.jpg"; 
import Img3 from "../../../../public/3.jpg"; 
import WorkImage from "../.././../../public/workSpaceBg.jpg";
const Workspace = () => {
    return (
        <div>
            <section className="py-20 bg-gradient-to-r from-blue-700 to-blue-500 text-white"
            style={{ backgroundImage: `url(${WorkImage.src})` }}>
        <div className="container mx-auto px-6 text-center">

          <h3 className="text-orange-400 text-lg font-semibold">Workspace</h3>
          <h2 className="text-4xl font-bold mt-2">
            Scales with your team <br /> and across the organization
          </h2>

          <div className="grid md:grid-cols-4 gap-8 mt-12  ">

            <div className="group relative flex flex-col items-center text-center px-6 py-10 transition duration-300 border h-96  md:border-white/20">
              <Image
                src={Img1}
                alt="Professional"
                className="w-12 h-12 mt-6"
              />
              <hr className="w-12 border-t-2 border-white my-4" />
              <h3 className="text-xl font-semibold">Professional</h3>
              <p className="text-gray-300 mt-2">
                Unburden yourself from the hassle of handling pesky chores and
                focus on things that help you succeed and put a smile on your
                face every day.
              </p>
              {/* Button */}
              <a
                href="/login"
                className="absolute bottom-8  bg-orange-400 text-white font-semibold text-lg px-6 py-3 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition duration-300"
              >
                Get started for free
              </a>
            </div>

            {/* Project Manager */}
            <div className="group relative flex flex-col items-center text-center px-6 py-8 transition duration-300 border h-96  border-white/20">
              <Image
                src={Img2}
                alt="Project Manager"
                className="w-12 h-12 mt-6"
              />
              <hr className="w-12 border-t-2 border-white my-4" />
              <h3 className="text-xl font-semibold">Project Manager</h3>
              <p className="text-gray-300 mt-2">
                Propel your project towards a successful completion. Make a
                smooth transition from initiation to closure with absolute
                transparency.
              </p>
              {/* Button */}
              <a
                href="/login"
                className="absolute bottom-8 bg-orange-400 text-white font-semibold text-lg px-6 py-3 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition duration-300"
              >
                Get started for free
              </a>
            </div>

            {/* Marketing Professional */}
            <div className="group relative flex flex-col items-center text-center px-6 py-8 transition duration-300 border h-96  border-white/20">
              <Image
                src={Img3}
                alt="Project Manager"
                className="w-12 h-12 mt-6"
              />
              <hr className="w-12 border-t-2 border-white my-4" />
              <h3 className="text-xl font-semibold">Marketing Professional</h3>
              <p className="text-gray-300 my-2">
                From ideation to implementation, TaskQue covers all bases and
                gives marketers complete control over their activities.
              </p>
              {/* Button */}
              <a
                href="/login"
                className="absolute bottom-8 bg-orange-400 text-white font-semibold text-lg px-6 py-3 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition duration-300"
              >
                Get started for free
              </a>
            </div>

            {/* Freelancer */}
            <div className="group relative flex flex-col border h-96  items-center text-center px-6 py-8 transition duration-300 border-white/20">
              <Image
                src={Img2}
                alt="Freelancer"
                className="w-12 h-12 mt-6"
              />
              <hr className="w-12 border-t-2 border-white my-4" />
              <h3 className="text-xl font-semibold">Freelancer</h3>
              <p className="text-gray-300 mt-2">
                Excite and turn your clients into a stream of recurring
                opportunities by involving them at each step of the creative and
                development process.
              </p>
              {/* Button */}
              <a
                href="/login"
                className="absolute bottom-8 bg-orange-400 text-white font-semibold text-lg px-6 py-3 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition duration-300"
              >
                Get started for free
              </a>
            </div>
          </div>
        </div>
      </section>
        </div>
    );
};

export default Workspace;