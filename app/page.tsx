import HomepageHeader from "@/components/Headers/HomepageHeader";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-white h-screen pt-16">
      <HomepageHeader />
      <main className="px-32 w-full">
        <section className="mt-16 px-40 w-full text-center flex flex-col items-center">
          <h1 className="text-[48px] font-bold">
            Agile Project Management <br /> That Feels Like a Breeze
          </h1>
          <p className="mt-4 max-w-[800px]">
            HiperBoard simplifies software development using Scrum principles.
            Manage backlogs, create tickets, and engage in productive
            discussions within a collaborative environment. Stay on track with
            clear sprint timelines, empowering your team to set and achieve
            project goals efficiently .
          </p>
          <Link
            href="/home"
            className="mt-20 bg-gray-800 text-white rounded-full px-16 py-2 w-fit"
          >
            <span> Get Started </span>
            <i className="fa fa-arrow-right ml-2" />
          </Link>
        </section>
      </main>
    </div>
  );
}
