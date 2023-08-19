import Image from "next/image";

import { timeAgo } from "@/lib/utils";
import { IPlayground } from "@/types";
import EditPlayground from "../edit-form-modal/EditPlayground";

interface IPlaygroundsProps {
  playground: IPlayground;
}

const PlaygroundCard = ({ playground }: IPlaygroundsProps) => {
  const [label, imgSrc] = playground.technology.split("|");

  return (
    <div className="flex gap-3 p-4 rounded-lg border border-zinc-100 bg-zink-50">
      <Image src={imgSrc} alt={label} width={40} height={40} className="h-10" />

      <div>
        <div className="flex-between">
          <h3 className="text-lg font-semibold text-zinc-900">
            {playground.title}
          </h3>

          <EditPlayground playground={playground} />
        </div>

        <div className="mt-1 flex items-center gap-2 text-sm text-zinc-500">
          <p>{label}</p>

          <span className="h-1 w-1 rounded-full bg-zinc-500"></span>

          <p>{timeAgo(playground.updatedAt)}</p>
        </div>

        <div className="mt-2 flex items-center gap-2">
          <Image
            src="/assets/images/avatars.png"
            alt="avatar"
            width={44}
            height={24}
          />

          <p className="text-xs text-zinc-500">
            Shared with <span className="font-bold">Adam, Anna.. </span>+7 more
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlaygroundCard;
