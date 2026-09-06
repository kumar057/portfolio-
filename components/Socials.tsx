import Link from "next/link";
import type { IconType } from "react-icons";
import {
  RiLinkedinLine,
  RiMailLine,
  RiPhoneLine,
  RiGithubLine,
} from "react-icons/ri";

export const socialData: { name: string; link: string; Icon: IconType }[] = [
  {
    name: "Email",
    link: "mailto:guddantipraveenkumar@gmail.com",
    Icon: RiMailLine,
  },
  {
    name: "Phone",
    link: "tel:+916301055471",
    Icon: RiPhoneLine,
  },
  {
    name: "LinkedIn",
    link: "https://linkedin.com/in/guddanti-praveen-kumar",
    Icon: RiLinkedinLine,
  },
  {
    name: "Github",
    link: "https://github.com/kumar057",
    Icon: RiGithubLine,
  },
];

const Socials = () => {
  return (
    <div className="flex items-center gap-x-5 text-lg">
      {socialData.map((social, i) => (
        <Link
          key={i}
          title={social.name}
          href={social.link}
          target="_blank"
          rel="noreferrer noopener"
          className={`${
            social.name === "Github"
              ? "bg-accent rounded-full p-1.25 hover:text-white"
              : "hover:text-accent"
          } transition-all duration-300`}
        >
          <social.Icon aria-hidden />
          <span className="sr-only">{social.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default Socials;
