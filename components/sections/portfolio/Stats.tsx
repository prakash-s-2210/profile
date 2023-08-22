import Image from "next/image";

import { userStats } from "@/constants";
import { IProfile } from "@/types";

interface IStatsProps {
  profileData: IProfile;
}

const Stats = ({ profileData }: IStatsProps) => {
  return (
    <section className="flex justify-start flex-col gap-6">
      <h3 className="text-2xl font-bold text-zinc-900">Stats</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {userStats.map(
          (stat) =>
            ((profileData.achievementBadges &&
              (stat.label === "Longest streak" ||
                stat.label === "Current league" ||
                stat.label === "Karma points")) ||
              (profileData.xp && stat.label === "Experience points")) && (
              <div
                key={stat.label}
                className="flex gap-3 px-5 py-3 border border-zinc-100 rounded-xl bg-zinc-50"
              >
                <Image
                  src={stat.imgUrl}
                  alt="lightning"
                  width={32}
                  height={32}
                />

                <div>
                  <p className="text-xl font-bold text-zinc-900">
                    {stat.value}
                  </p>

                  <p className="text-base text-zinc-500">{stat.label}</p>
                </div>
              </div>
            )
        )}
      </div>
    </section>
  );
};

export default Stats;
