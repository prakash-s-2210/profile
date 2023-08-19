"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState, useTransition } from "react";

import { IProfile } from "@/types";
import { useUploadThing } from "@/lib/uploadthing";
import { Switch } from "../shadcn-ui/switch";
import { isBase64Image } from "@/lib/utils";
import { updateProfile } from "@/lib/actions/edit-form/editForm.actions";

interface IProfileFormProps {
  profileData: IProfile;
}

const Profile = ({ profileData }: IProfileFormProps) => {
  const { startUpload } = useUploadThing("media");
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [files, setFiles] = useState<File[]>([]);
  const [profileInfo, setProfileInfo] = useState({
    name: profileData.name,
    profilePicture: profileData.profilePicture,
    headline: profileData.headline,
    location: profileData.location,
    about: profileData.about,
    profession: profileData.profession,
    dob: profileData.dob,
    gender: profileData.gender,
    visibility: profileData.visibility,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const blob = profileInfo.profilePicture;

    const hasImageChanged = isBase64Image(blob);
    let picture = null;

    if (hasImageChanged) {
      const imageResponse = await startUpload(files);
      if (imageResponse?.[0]?.url) {
        picture = imageResponse[0].url;
      }
    }
    const { name, about, headline, location, profession, dob, gender, visibility } = profileInfo;
    const profilePicture = picture ?? profileInfo.profilePicture;
    const id = profileData._id;
    await updateProfile({
      name,
      profilePicture,
      headline,
      location,
      about,
      profession,
      dob,
      gender,
      visibility,
      id,
    });

    setFiles([]);
    setIsSubmitting(false);
    setHasChanges(false);
    startTransition(() => {
      router.refresh();
    });
  };

  const handleInputChange = (
    name: string,
    value: string,
    originalValue: string
  ) => {
    value === originalValue ? setHasChanges(false) : setHasChanges(true);
    setProfileInfo({
      ...profileInfo,
      [name]: value,
    });
  };

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: string,
    originalValue: string
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      setFiles(Array.from(e.target.files));

      setHasChanges(true);

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() ?? "";

        handleInputChange(fieldChange, imageDataUrl, originalValue);
      };

      fileReader.readAsDataURL(file);
    }
  };

  return (
    <section className="max-w-[628px] mx-auto w-full">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-6 flex-wrap">
          <Image
            src={profileInfo.profilePicture}
            alt={profileData.name}
            width={72}
            height={72}
            className="rounded-full w-[72px] h-[72px] object-contain"
          />

          <div className="flex gap-3">
            <label className="cursor-pointer py-2 px-4 bg-primary-600 rounded-lg text-sm font-semibold text-white">
              Upload new picture{" "}
              <input
                type="file"
                accept="image/*"
                id="file-input"
                onChange={(e) =>
                  handleImage(e, "profilePicture", profileData.profilePicture)
                }
                className="hidden"
              />
            </label>

            <button
              className="py-2 px-4 bg-zinc-100 rounded-lg text-zinc-900 text-sm font-semibold"
              onClick={() => {
                profileData.profilePicture === "/assets/images/user.webp"
                  ? setHasChanges(false)
                  : setHasChanges(true);
                setProfileInfo({
                  ...profileInfo,
                  profilePicture: "/assets/images/user.webp",
                });
              }}
            >
              Delete
            </button>
          </div>
        </div>

        <div className="pt-10">
          <label
            htmlFor="user-name"
            className="text-zinc-900 inline-block font-semibold text-sm"
          >
            Display name
          </label>

          <input
            type="text"
            required
            placeholder="Enter a name"
            value={profileInfo.name}
            className="w-full mt-1 mb-2 pt-3 px-3 py-[14px] text-sm text-zinc-900 outline-none placeholder:text-zinc-400 border border-zinc-200 rounded-lg focus:border-2 focus:border-primary-600"
            onChange={(e) =>
              handleInputChange("name", e.target.value, profileData.name)
            }
          />

          <p className="text-sm text-zinc-500">
            Name entered above will be used for all issued certificates
          </p>
        </div>

        <div className="pt-6">
          <label
            htmlFor="about"
            className="text-zinc-900 inline-block font-semibold text-sm"
          >
            About
          </label>

          <textarea
            required
            placeholder="Tell us about yourself..."
            value={profileInfo.about}
            className="w-full mt-1 mb-2 pt-3 px-3 py-[14px] text-sm text-zinc-900 outline-none placeholder:text-zinc-400 border border-zinc-200 rounded-lg focus:border-2 focus:border-primary-600"
            onChange={(e) =>
              handleInputChange("about", e.target.value, profileData.about)
            }
          />
        </div>

        <div className="pt-6">
          <label
            htmlFor="headline"
            className="text-zinc-900 inline-block font-semibold text-sm"
          >
            Headline
          </label>

          <input
            type="text"
            required
            placeholder="Enter a Headline"
            value={profileInfo.headline}
            className="w-full mt-1 pt-3 px-3 py-[14px] text-sm text-zinc-900 outline-none placeholder:text-zinc-400 border border-zinc-200 rounded-lg focus:border-2 focus:border-primary-600"
            onChange={(e) =>
              handleInputChange(
                "headline",
                e.target.value,
                profileData.headline
              )
            }
          />
        </div>

        <div className="pt-6">
          <label
            htmlFor="location"
            className="text-zinc-900 inline-block font-semibold text-sm"
          >
            Location
          </label>

          <input
            type="text"
            required
            placeholder="Enter a Location"
            value={profileInfo.location}
            className="w-full mt-1 pt-3 px-3 py-[14px] text-sm text-zinc-900 outline-none placeholder:text-zinc-400 border border-zinc-200 rounded-lg focus:border-2 focus:border-primary-600"
            onChange={(e) =>
              handleInputChange(
                "location",
                e.target.value,
                profileData.location
              )
            }
          />
        </div>

        <div className="pt-6">
          <label
            htmlFor="profession"
            className="text-zinc-900 inline-block font-semibold text-sm"
          >
            Profession
          </label>

          <input
            type="text"
            required
            placeholder="Enter a Profession"
            value={profileInfo.profession}
            className="w-full mt-1 pt-3 px-3 py-[14px] text-sm text-zinc-900 outline-none placeholder:text-zinc-400 border border-zinc-200 rounded-lg focus:border-2 focus:border-primary-600"
            onChange={(e) =>
              handleInputChange(
                "profession",
                e.target.value,
                profileData.profession
              )
            }
          />
        </div>

        <div className="pt-6">
          <label
            htmlFor="date-of-birth"
            className="text-zinc-900 inline-block font-semibold text-sm"
          >
            Date of birth
          </label>

          <input
            type="date"
            placeholder="DD/MM/YY"
            value={new Date(profileInfo.dob).toISOString().split("T")[0]}
            className="w-full mt-1 pt-3 px-3 py-[14px] text-sm text-zinc-900 outline-none placeholder:text-zinc-400 border border-zinc-200 rounded-lg focus:border-2 focus:border-primary-600"
            onChange={(e) =>
              handleInputChange(
                "dob",
                e.target.value,
                profileData.dob.toString()
              )
            }
          />
        </div>

        <div className="pt-6">
          <label
            htmlFor="gender"
            className="text-zinc-900 inline-block font-semibold text-sm"
          >
            Gender
          </label>

          <input
            type="text"
            placeholder="Enter your gender here..."
            value={profileInfo.gender}
            className="w-full mt-1 pt-3 px-3 py-[14px] text-sm text-zinc-900 outline-none placeholder:text-zinc-400 border border-zinc-200 rounded-lg focus:border-2 focus:border-primary-600"
            onChange={(e) =>
              handleInputChange("gender", e.target.value, profileData.gender)
            }
          />
        </div>

        <div className="pt-10">
          <h3 className="text-zinc-900 text-xl font-bold">
            Section visibility
          </h3>

          <p className="text-zinc-500 text-base pt-1">
            Select which sections and content should show on your profile page.
          </p>

          <div className="p-6  mt-6 flex flex-col gap-4">
            <div className="flex-between gap-5">
              <div className="flex flex-col gap-1">
                <h4 className="text-zinc-900 text-base font-bold">
                  Followers and following
                </h4>

                <p className="text-sm text-zinc-500">
                  Shows your followers and the users you follow on codedamn
                </p>
              </div>

              <Switch
                defaultChecked={profileInfo.visibility.includes(
                  "followers and following"
                )}
                checked={profileInfo.visibility.includes(
                  "followers and following"
                )}
                onCheckedChange={() => {
                  if (
                    profileInfo.visibility.includes("followers and following")
                  ) {
                    setProfileInfo({
                      ...profileInfo,
                      visibility: profileInfo.visibility.filter(
                        (field) => field !== "followers and following"
                      ),
                    });
                    setHasChanges(true);
                  } else {
                    setProfileInfo({
                      ...profileInfo,
                      visibility: [
                        ...profileInfo.visibility,
                        "followers and following",
                      ],
                    });
                    setHasChanges(true);
                  }
                }}
              />
            </div>

            <div className="flex-between gap-5">
              <div className="flex flex-col gap-1">
                <h4 className="text-zinc-900 text-base font-bold">XP</h4>

                <p className="text-sm text-zinc-500">
                  Shows the XP you have earned
                </p>
              </div>

              <Switch
                defaultChecked={profileInfo.visibility.includes("xp")}
                checked={profileInfo.visibility.includes("xp")}
                onCheckedChange={() => {
                  if (profileInfo.visibility.includes("xp")) {
                    setProfileInfo({
                      ...profileInfo,
                      visibility: profileInfo.visibility.filter(
                        (field) => field !== "xp"
                      ),
                    });
                  } else {
                    setProfileInfo({
                      ...profileInfo,
                      visibility: [...profileInfo.visibility, "xp"],
                    });
                  }
                }}
              />
            </div>

            <div className="flex-between gap-5">
              <div className="flex flex-col gap-1">
                <h4 className="text-zinc-900 text-base font-bold">
                  Achievement badges
                </h4>

                <p className="text-sm text-zinc-500">
                  Shows your relative percentile and proficiency
                </p>
              </div>

              <Switch
                defaultChecked={profileInfo.visibility.includes(
                  "achievement badges"
                )}
                checked={profileInfo.visibility.includes("achievement badges")}
                onCheckedChange={() => {
                  if (profileInfo.visibility.includes("achievement badges")) {
                    setProfileInfo({
                      ...profileInfo,
                      visibility: profileInfo.visibility.filter(
                        (field) => field !== "achievement badges"
                      ),
                    });
                  } else {
                    setProfileInfo({
                      ...profileInfo,
                      visibility: [
                        ...profileInfo.visibility,
                        "achievement badges",
                      ],
                    });
                  }
                }}
              />
            </div>
          </div>
        </div>

        <div className="w-full flex justify-end gap-3 text-sm font-semibold">
          <button
            type="button"
            className="py-2 px-4 bg-zinc-100 rounded-lg  text-zinc-900"
            onClick={() => {
              setProfileInfo({
                name: profileData.name,
                profilePicture: profileData.profilePicture,
                headline: profileData.headline,
                location: profileData.location,
                about: profileData.about,
                profession: profileData.profession,
                dob: profileData.dob,
                gender: profileData.gender,
                visibility: profileData.visibility,
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
export default Profile;
