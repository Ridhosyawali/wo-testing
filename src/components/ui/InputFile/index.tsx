import { Dispatch, SetStateAction } from "react";
import styles from "./Input.module.scss";

type Proptypes = {
  uploadedImage: File | null;
  name: string;
  required?: boolean;
  setUploadedImage: Dispatch<SetStateAction<File | null>>;
};

const InputFile = (props: Proptypes) => {
  const { uploadedImage, setUploadedImage, name, required } = props;
  return (
    <div className={styles.file}>
      <label className={styles.file__label} htmlFor={name}>
        {uploadedImage?.name ? (
          <p>{uploadedImage.name}</p>
        ) : (
          <>
            <p>
              Unggah gambar baru, gambar yang lebih besar akan diubah ukurannya
              secara otomatis
            </p>
            <p>
              Maksimum ukuran <b>1 MB</b>
            </p>
          </>
        )}
      </label>
      <input
        className={styles.file__input}
        type="file"
        name={name}
        id={name}
        onChange={(e: any) => {
          e.preventDefault();
          setUploadedImage(e.currentTarget.files[0]);
        }}
        required={required}
      />
    </div>
  );
};

export default InputFile;
