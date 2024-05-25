import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateVideo } from '../../store/videoSlice';
import Button from '../Button/Button';

export default function Form() {
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();

    const handleFileSelected = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile.type !== 'video/mp4') {
            console.log('Incorrect!');
        }
        setFile(selectedFile);
    };

    const uploadFile = () => {
        let formData = new FormData();
        formData.append('video', file);
        axios
            .post('http://localhost:8080/api/v1/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
                console.log(response);
                if (response.status === 201) {
                    const data = {
                        video_id: response.data['video_id'],
                    };
                    dispatch(updateVideo(data));
                } else if (response.status === 500) {
                    console.log('Произошла ошибка при загрузке файла');
                }
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log('server responded');
                } else if (error.request) {
                    console.log('network error');
                } else {
                    console.log(error);
                }
            });
    };

    return (
        <>
            <form method="post" encType="multipart/form-data">
                <label className="input">
                    <input type="file" name="file" onChange={handleFileSelected} />
                </label>
            </form>
            <Button onClick={uploadFile}>Загрузить файл</Button>
        </>
    );
}
