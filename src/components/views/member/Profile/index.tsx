import MemberLayout from "@/components/layouts/MemberLayout";
import styles from "./Profile.module.scss";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { uploadFile } from "@/lib/firebase/service";
import { useState } from "react";
import userServices from "@/services/user";

const ProfileMemberView = ({
  profile,
  setProfile,
  session,
  setToaster,
}: any) => {
  const [changeImage, setChangeImage] = useState<any>({});
  const [isLoading, setIsLoading] = useState("");

  const handleChangeProfile = async (e: any) => {
    e.preventDefault();
    setIsLoading("profile");
    const form = e.target as HTMLFormElement;
    const data = {
      fullname: form.fullname.value,
      phone: form.phone.value,
    };
    const result = await userServices.updateProfile(
      profile.id,
      data,
      session.data?.accessToken
    );

    if (result.status === 200) {
      setIsLoading("");
      setProfile({ ...profile, fullname: data.fullname, phone: data.phone });
      form.reset();
      setToaster({
        variant: "success",
        message: "Success Update Profile",
      });
    } else {
      setIsLoading("");
    }
  };
  const handleChangeProfilePicture = (e: any) => {
    e.preventDefault();
    setIsLoading("picture");
    const file = e.target[0]?.files[0];
    if (file) {
      uploadFile(
        profile.id,
        file,
        async (status: boolean, newImageURL: string) => {
          if (status) {
            const data = {
              image: newImageURL,
            };
            const result = await userServices.updateProfile(
              profile.id,
              data,
              session.data?.accessToken
            );
            if (result.status === 200) {
              setIsLoading("");
              setProfile({ ...profile, image: newImageURL });
              setChangeImage({});
              e.target[0].value = "";
              setToaster({
                variant: "success",
                message: "Success Change Avatar",
              });
            } else {
              setIsLoading("");
            }
          } else {
            setIsLoading("");
            setChangeImage({});
            setToaster({
              variant: "danger",
              message: "Failed Change Profile",
            });
          }
        }
      );
    }
  };

  const handleChangePassword = async (e: any) => {
    e.preventDefault();
    setIsLoading("password");
    const form = e.target as HTMLFormElement;
    const data = {
      password: form["new-password"].value,
      oldPassword: form["old-password"].value,
      encryptedPassword: profile.password,
    };
    const result = await userServices.updateProfile(
      profile.id,
      data,
      session.data?.accessToken
    );

    if (result.status === 200) {
      setIsLoading("");
      form.reset();
      setToaster({
        variant: "success",
        message: "Success Change Password",
      });
    } else {
      setIsLoading("");
      setToaster({
        variant: "danger",
        message: "Failed Change Password",
      });
    }
  };

  return (
    <MemberLayout>
      <h1 className={styles.profile__title}>Profile</h1>
      <div className={styles.profile__main}>
        <div className={styles.profile__main__row}>
          <div className={styles.profile__main__row__avatar}>
            <h2 className={styles.profile__main__row__avatar__title}>Avatar</h2>
            {profile.image ? (
              <Image
                className={styles.profile__main__row__avatar__image}
                src={profile.image}
                alt="profile"
                width={200}
                height={200}
              />
            ) : (
              <div className={styles.profile__main__row__avatar__image}>
                {profile?.fullname?.charAt(0)}
              </div>
            )}
            <form onSubmit={handleChangeProfilePicture}>
              <label
                className={styles.profile__main__row__avatar__label}
                htmlFor="upload-image"
              >
                {changeImage.name ? (
                  <p>{changeImage.name}</p>
                ) : (
                  <>
                    <p>
                      Upload a new avatar, Larger image will be resized
                      automatically
                    </p>
                    <p>
                      Maximum Upload size is <b>1 MB</b>
                    </p>
                  </>
                )}
              </label>
              <input
                className={styles.profile__main__row__avatar__input}
                type="file"
                name="image"
                id="upload-image"
                onChange={(e: any) => {
                  e.preventDefault();
                  setChangeImage(e.currentTarget.files[0]);
                }}
              />
              <Button
                className={styles.profile__main__row__avatar__button}
                type="submit"
                variant="primary"
              >
                {isLoading === "picture" ? "Uploading..." : "Upload"}
              </Button>
            </form>
          </div>
          <div className={styles.profile__main__row__profile}>
            <h2 className={styles.profile__main__row__profile__title}>
              Profile
            </h2>
            <form onSubmit={handleChangeProfile}>
              <Input
                label="Fullname"
                type="text"
                name="fullname"
                defaultValue={profile.fullname}
              />
              <Input
                label="Phone"
                type="number"
                name="phone"
                defaultValue={profile.phone}
              />
              <Input
                label="Email"
                type="email"
                name="email"
                defaultValue={profile.email}
                disabled
              />
              <Input
                label="Role"
                type="text"
                name="role"
                defaultValue={profile.role}
                disabled
              />
              <Button type="submit" variant="primary">
                {isLoading === "profile" ? "loading..." : "Upload Profile"}
              </Button>
            </form>
          </div>
          <div className={styles.profile__main__row__password}>
            <h2 className={styles.profile__main__row__password__title}>
              Change Password
            </h2>
            <form onSubmit={handleChangePassword}>
              <Input name="old-password" label="Old Password" type="password" />
              <Input name="new-password" label="New Password" type="password" />
              <Button variant="primary" type="submit">
                {isLoading === "password" ? "loading..." : "Upload Password"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </MemberLayout>
  );
};

export default ProfileMemberView;
