import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { queryClient } from "../../api/queryClient";
import { loadingImg } from "../../api/adminImg";
import { v4 } from "uuid";
import style from './LoadImgServ.module.scss'



function LoadImgServ() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [lastUploadedFile, setLastUploadedFile] = useState(null);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files as FileList).map((file) => ({
      id: v4(),
      file,
    }));
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    setLastUploadedFile(files[files.length - 1].file.name);
  };

  const mutateImg = useMutation(
    {
      mutationFn: (data: { formData: FormData }) => loadingImg(data.formData),
    },
    queryClient
  );

  const handleUpload = async () => {
    const formData = new FormData();
    selectedFiles.forEach(({ file }) => {
      formData.append("files", file);
    });
    console.log('ntfg' + formData)
    mutateImg.mutate( formData );
  };

  const handleRemoveFile = (id) => {
    setSelectedFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((file) => file.id !== id);
      if (updatedFiles.length > 0) {
        setLastUploadedFile(updatedFiles[updatedFiles.length - 1].file.name);
      } else {
        setLastUploadedFile(null);
      }
      return updatedFiles;
    });
  };

  useEffect(() => {
    if (selectedFiles) {
      console.log(selectedFiles);
    }
  }, [selectedFiles]);

  return (
    <div>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className={style.hiddenInput}
        id="fileInput"
      />
      <label htmlFor="fileInput" className={style.customLabel}>
        Выбрать файлы
      </label>
      {lastUploadedFile && (
        <span className={style.fileName}>
          Последний загруженный файл: {lastUploadedFile}
        </span>
      )}
      
      <ul>
        {selectedFiles.map(({ id, file }) => (
          <li key={id}>
            {file.name}
            <button onClick={() => handleRemoveFile(id)}>Удалить</button>
          </li>
        ))}
      </ul>
      <button onClick={handleUpload}>Загрузить</button>
    </div>
  );
}

export default LoadImgServ;
