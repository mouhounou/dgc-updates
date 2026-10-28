/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { assets } from "../assets";

const fadeUp = {
	hidden: { opacity: 0, y: 40 },
	visible: (i = 1) => ({
		opacity: 1,
		y: 0,
		transition: {
			delay: i * 0.2,
			duration: 0.6,
			ease: "easeOut",
		},
	}),
};

const HeroSection = () => {
	return (
		<div className="w-full relative z-10  h-full bg-first/75 flex flex-col text-white justify-center items-center gap-2 pb-20 px-4 text-center">
			<motion.h1
				className="text-3xl sm:text-5xl lg:text-6xl  flex items-baseline gap-2"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: false, duration: 0.6 }}
				variants={fadeUp}
				custom={1}
			>
				<span>Groupe</span>
				<span>
					<img className=" w-[3rem] sm:w-[5rem] lg:w-[6rem]" src={assets.lg} alt="" />
				</span>
				<span>- Formation</span>
			</motion.h1>

			<motion.p
				className="text-sm sm:text-base mt-2"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: false, duration: 0.6 }}
				variants={fadeUp}
				custom={2}
			>
				École d'Enseignement Supérieur à Pointe-Noire
			</motion.p>

			<motion.p
				className="font-semibold text-sm sm:text-base"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: false, duration: 0.6 }}
				variants={fadeUp}
				custom={3}
			>
				Formons les talents de demain depuis 21 ans
			</motion.p>

			<motion.div
				className="flex flex-col sm:flex-row items-center gap-3 font-semibold mt-6"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: false, duration: 0.6 }}
				variants={fadeUp}
				custom={4}
			>
				<a
					href="#atouts"
					className="px-4 py-2 bg-second rounded-md hover:opacity-90 transition"
				>
					Découvrir nos atouts
				</a>
				<a
					href="#contact"
					className="px-4 py-2 border rounded-md hover:bg-white hover:text-first transition"
				>
					Contactez-nous
				</a>
			</motion.div>

			{/* Divider SVG */}
			<div className="custom-shape-divider-bottom-1751555905 mt-12 w-full">
				<svg
					data-name="Layer 1"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 1200 120"
					preserveAspectRatio="none"
					className="w-full h-[80px]"
				>
					<path
						d="M649.97 0L599.91 54.12 550.03 0 0 0 0 120 1200 120 1200 0 649.97 0z"
						className="fill-white"
					/>
				</svg>
			</div>
		</div>
	);
};

export default HeroSection;
