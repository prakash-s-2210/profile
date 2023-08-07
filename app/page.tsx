import Image from "next/image";
const Home = () => {
  return (
    <main className="pt-11 max-w-[738px] mx-auto flex flex-col gap-10">
      <section className="flex flex-col gap-6">
        <div className="relative">
          <Image
            src="/assets/images/cover.png"
            alt="cover picture"
            width={738}
            height={160}
            className="h-40 w-full"
          />

          <div className="absolute top-2 sm:top-6 right-2 sm:right-6 flex-center gap-2 p-2 bg-[rgba(255,255,255,0.16)] rounded-lg backdrop-blur-[6px]">
            <Image
              src="/assets/icons/edit.svg"
              alt="edit"
              width={13}
              height={13}
            />

            <p className="max-sm:hidden text-xs font-semibold text-white">
              Edit cover
            </p>
          </div>
        </div>

        <div className="flex md:flex-row flex-col gap-6 max-md:px-5">
          <div className="relative bottom-[70px] md:left-5 w-fit h-fit">
            <Image
              src="/assets/images/user.png"
              alt="user"
              width={140}
              height={140}
            />

            <Image
              src="/assets/icons/badge.svg"
              alt="badge"
              width={20}
              height={20}
              className="absolute w-min md:top-14 max-md:-bottom-2 right-0 md:-right-2"
            />
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-[28px] leading-8 font-bold text-zinc-900">
                  Anna Cheng
                </h2>

                <p className="px-3 py-[2px] rounded bg-success-300 text-zinc-900 text-sm font-semibold">
                  Pro
                </p>

                <p className="px-3 py-[2px] rounded bg-secondary-100 text-secondary-800 text-sm font-semibold">
                  Looking for job
                </p>
              </div>

              <p className="text-zinc-500 text-base">{`Full stack dev at codedamn | Harvard'22"`}</p>

              <div className="flex items-center gap-1">
                <Image
                  src="/assets/icons/location.svg"
                  alt="location"
                  width={12}
                  height={12}
                />

                <p className="text-zinc-400 text-base">Mumbai, India</p>
              </div>
            </div>

            <div className="flex gap-3 flex-wrap">
              <p className="py-2 px-3 rounded-lg bg-zinc-100">HTML 5</p>
              <p className="py-2 px-3 rounded-lg bg-zinc-100">CSS</p>
              <p className="py-2 px-3 rounded-lg bg-zinc-100">Javascript</p>
              <p className="py-2 px-3 rounded-lg bg-zinc-100">Sanity</p>
              <p className="py-2 px-3 rounded-lg bg-zinc-100">React</p>
              <p className="py-2 px-3 rounded-lg bg-zinc-100">SQL</p>
              <p className="py-2 px-3 rounded-lg bg-zinc-100">Node.JS</p>
              <p className="py-2 px-3 rounded-lg bg-zinc-100">Docker</p>
              <p className="py-2 px-3 rounded-lg bg-zinc-100">Mongodb</p>
              <p className="py-2 px-3 rounded-lg bg-zinc-100">Express</p>
              <p className="py-2 px-3 rounded-lg bg-zinc-100">Next.JS</p>
            </div>

            <div className="border-t border-t-[#F4F4F5] pt-8"></div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
