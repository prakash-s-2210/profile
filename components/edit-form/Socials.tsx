"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { IProfile } from "@/types";
import { updateSocials } from "@/lib/actions/edit-form/editForm.actions";
import { Switch } from "../shadcn-ui/switch";
import { useToast } from "../shadcn-ui/use-toast";

interface IProfileFormProps {
  profileData: IProfile;
}

const Socials = ({ profileData }: IProfileFormProps) => {
  const {toast} = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [socialsInfo, setSocialsInfo] = useState({
    github: profileData.github,
    linkedin: profileData.linkedin,
    facebook: profileData.facebook,
    instagram: profileData.instagram,
    dribble: profileData.dribble,
    behance: profileData.behance,
    youtube: profileData.youtube,
    gmail: profileData.gmail,
    socialLinks: profileData.socialLinks,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      variant: "destructive",
      description: "You are not Authorized",
    });
    // setIsSubmitting(true);
    // const {
    //   github,
    //   linkedin,
    //   facebook,
    //   instagram,
    //   dribble,
    //   behance,
    //   youtube,
    //   gmail,
    //   socialLinks
    // } = socialsInfo;
    // const id = profileData._id;
    // await updateSocials({
    //   github,
    //   linkedin,
    //   facebook,
    //   instagram,
    //   dribble,
    //   behance,
    //   youtube,
    //   gmail,
    //   socialLinks,
    //   id,
    // });
    // setIsSubmitting(false);
    // setHasChanges(false);
    startTransition(() => {
      router.push("/");
      router.refresh();
    });
  };

  const handleInputChange = (name: string, value: string | boolean) => {
    const newSocialsInfo = {
      ...socialsInfo,
      [name]: value,
    };

    // Check if there are any changes in the newProfileInfo compared to the original data
    const hasChanges =
      newSocialsInfo.github !== profileData.github ||
      newSocialsInfo.linkedin !== profileData.linkedin ||
      newSocialsInfo.facebook !== profileData.facebook ||
      newSocialsInfo.instagram !== profileData.instagram ||
      newSocialsInfo.dribble !== profileData.dribble ||
      newSocialsInfo.behance !== profileData.behance ||
      newSocialsInfo.youtube !== profileData.youtube ||
      newSocialsInfo.gmail !== profileData.gmail ||
      newSocialsInfo.socialLinks !== profileData.socialLinks;

    setHasChanges(hasChanges);
    setSocialsInfo(newSocialsInfo);
  };

  return (
    <section className="max-w-[628px] mx-auto w-full">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <div>
            <label
              htmlFor="github"
              className="text-zinc-900 inline-block font-semibold text-sm"
            >
              GitHub
            </label>

            <input
              type="text"
              required
              placeholder="Github profile URL"
              value={socialsInfo.github}
              className="w-full mt-1 px-3 py-[14px] text-sm text-zinc-900 outline-none placeholder:text-zinc-400 border border-zinc-200 rounded-lg focus:border-2 focus:border-primary-600"
              onChange={(e) => handleInputChange("github", e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="linkedin"
              className="text-zinc-900 inline-block font-semibold text-sm"
            >
              Linkedin
            </label>

            <input
              type="text"
              required
              placeholder="Linkedin profile URL"
              value={socialsInfo.linkedin}
              className="w-full mt-1 px-3 py-[14px] text-sm text-zinc-900 outline-none placeholder:text-zinc-400 border border-zinc-200 rounded-lg focus:border-2 focus:border-primary-600"
              onChange={(e) => handleInputChange("linkedin", e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="facebook"
              className="text-zinc-900 inline-block font-semibold text-sm"
            >
              Facebook
            </label>

            <input
              type="text"
              placeholder="Facebook profile URL"
              value={socialsInfo.facebook}
              className="w-full mt-1 px-3 py-[14px] text-sm text-zinc-900 outline-none placeholder:text-zinc-400 border border-zinc-200 rounded-lg focus:border-2 focus:border-primary-600"
              onChange={(e) => handleInputChange("facebook", e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="instagram"
              className="text-zinc-900 inline-block font-semibold text-sm"
            >
              Instagram
            </label>

            <input
              type="text"
              placeholder="Instagram profile URL"
              value={socialsInfo.instagram}
              className="w-full mt-1 px-3 py-[14px] text-sm text-zinc-900 outline-none placeholder:text-zinc-400 border border-zinc-200 rounded-lg focus:border-2 focus:border-primary-600"
              onChange={(e) => handleInputChange("instagram", e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="dribble"
              className="text-zinc-900 inline-block font-semibold text-sm"
            >
              Dribble
            </label>

            <input
              type="text"
              placeholder="Dribble profile URL"
              value={socialsInfo.dribble}
              className="w-full mt-1 px-3 py-[14px] text-sm text-zinc-900 outline-none placeholder:text-zinc-400 border border-zinc-200 rounded-lg focus:border-2 focus:border-primary-600"
              onChange={(e) => handleInputChange("dribble", e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="behance"
              className="text-zinc-900 inline-block font-semibold text-sm"
            >
              Behance
            </label>

            <input
              type="text"
              placeholder="Behance profile URL"
              value={socialsInfo.behance}
              className="w-full mt-1 px-3 py-[14px] text-sm text-zinc-900 outline-none placeholder:text-zinc-400 border border-zinc-200 rounded-lg focus:border-2 focus:border-primary-600"
              onChange={(e) => handleInputChange("behance", e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="youtube"
              className="text-zinc-900 inline-block font-semibold text-sm"
            >
              Youtube
            </label>

            <input
              type="text"
              placeholder="Youtube channel link"
              value={socialsInfo.youtube}
              className="w-full mt-1 px-3 py-[14px] text-sm text-zinc-900 outline-none placeholder:text-zinc-400 border border-zinc-200 rounded-lg focus:border-2 focus:border-primary-600"
              onChange={(e) => handleInputChange("youtube", e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="gmail"
              className="text-zinc-900 inline-block font-semibold text-sm"
            >
              Gmail
            </label>

            <input
              type="text"
              required
              placeholder="Enter gmail id"
              value={socialsInfo.gmail}
              className="w-full mt-1 px-3 py-[14px] text-sm text-zinc-900 outline-none placeholder:text-zinc-400 border border-zinc-200 rounded-lg focus:border-2 focus:border-primary-600"
              onChange={(e) => handleInputChange("gmail", e.target.value)}
            />
          </div>
        </div>

        <section className="pt-10">
          <h3 className="text-zinc-900 text-xl font-bold">
            Section visibility
          </h3>

          <div className="flex-between gap-5 p-6  mt-6">
            <div className="flex flex-col gap-1">
              <h4 className="text-zinc-900 text-base font-bold">
                Social Links
              </h4>

              <p className="text-sm text-zinc-500">
                Show your social links 
              </p>
            </div>

            <Switch
              defaultChecked={socialsInfo.socialLinks}
              checked={socialsInfo.socialLinks}
              onCheckedChange={() => {
                handleInputChange("socialLinks", !socialsInfo.socialLinks);
              }}
            />
          </div>
        </section>

        <div className="w-full flex justify-end gap-3 text-sm font-semibold pt-10">
          <button
            type="button"
            className="py-2 px-4 bg-zinc-100 rounded-lg  text-zinc-900"
            onClick={() => {
              setSocialsInfo({
                github: profileData.github,
                linkedin: profileData.linkedin,
                facebook: profileData.facebook,
                instagram: profileData.instagram,
                dribble: profileData.dribble,
                behance: profileData.behance,
                youtube: profileData.youtube,
                gmail: profileData.gmail,
                socialLinks: profileData.socialLinks
              });
              setHasChanges(false);
            }}
          >
            cancel
          </button>

          <button
            type="submit"
            className={`${
              hasChanges ? "opacity-100" : "pointer-events-none opacity-50"
            } px-4 py-2 bg-primary-600 rounded-lg text-white`}
          >
            {isSubmitting ? "Saving..." : "Save changes"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Socials;
