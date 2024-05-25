import axios from 'axios';
import { useSelector } from 'react-redux';
import { styled } from 'styled-components';
import Button from '../Button/Button';
import Form from '../Form/UploadFileForm';

export default function Handlers() {
    const videoId = useSelector((state) => state.video.video_id);

    function detectFireAndSmokeOnVideo() {
        const data = {
            video_id: videoId,
        };
        axios
            .put('http://localhost:8080/api/v1/detect', data)
            .then((response) => {
                console.log(response);
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
    }

    const ButtonsDiv = styled.div`
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 10px;
    `;

    return (
        <section>
            <h2>Обработайте видеоролик, используя кнопки ниже:</h2>
            <ButtonsDiv>
                <Form></Form>
                <Button onClick={detectFireAndSmokeOnVideo}>Обработать видео</Button>
            </ButtonsDiv>
        </section>
    );
}
