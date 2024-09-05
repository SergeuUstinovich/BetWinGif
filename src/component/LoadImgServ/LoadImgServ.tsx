import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { queryClient } from "../../api/queryClient";
import { loadingImg } from "../../api/adminImg";
import { v4 } from "uuid";
import style from "./LoadImgServ.module.scss";
import { Button } from "../../ui";

function LoadImgServ() {
  const refInp = useRef(null);
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
      onSuccess: () => {
        setLastUploadedFile(null)
        setSelectedFiles([])
        queryClient.invalidateQueries({queryKey: ['img']})
      }
    },
    queryClient
  );

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      alert("Файл не добавлен");
      return;
    }
    const formData = new FormData();
    selectedFiles.forEach(({ file }) => {
      formData.append("photos", file);
    });
    mutateImg.mutate({ formData });
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

  const handlePick = () => {
    refInp.current.click();
  };

  return (
    <div className={style.fileBlock}>
      <div className={style.inputBlock}>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className={style.hiddenInput}
          ref={refInp}
          accept="image/*,.png,.jpg,.gif,.web,.jpeg,.svg"
        />
        <button onClick={handlePick} className={style.customLabel}>
          Выбрать файлы
        </button>
        <Button className={style.loadButton} onClick={handleUpload}>Загрузить</Button>
      </div>
      
      {lastUploadedFile && (
        <span className={style.fileName}>
          Последний загруженный файл: {lastUploadedFile}
        </span>
      )}
      
      <ul className={style.selectedFilesList}>
        {selectedFiles.map(({ id, file }) => (
          <li key={id}>
            <p className={style.selectedFile}>Название файла: {file.name}</p>
            <Button className={style.deleteButton} onClick={() => handleRemoveFile(id)}>Удалить</Button>
          </li>
        ))}
      </ul>
      
    </div>
  );
}

export default LoadImgServ;
