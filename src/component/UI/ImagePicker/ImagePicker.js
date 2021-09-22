import React, { useState, useRef, useEffect } from 'react';
import './ImagePicker.css';

const ImagePicker = (props) => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isValid, setIsValid] = useState(false);
    const pickerRef = useRef();

    useEffect(() => {
        if (!image) {
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreview(fileReader.result);
        };
        fileReader.readAsDataURL(image);
    }, [image]);

    const imageSelectedHandler = (event) => {
        event.preventDefault();
        let selectedImage;
        let valid;
        if (event.target.files[0] && event.target.files.length === 1) {
            selectedImage = event.target.files[0];
            valid = true;
            setImage(selectedImage);
            setIsValid(valid);
        } else {
            valid = false;
            setIsValid(valid);
        }
        props.onPick(selectedImage, valid);
    };

    return (
        <div>
            {preview && (
                <div className="profileimage__ImageContainer">
                    <img
                        className="profileimage__Image"
                        src={preview}
                        alt="preview"
                    />
                </div>
            )}
            <div>
                <input
                    onChange={imageSelectedHandler}
                    style={{ display: 'none' }}
                    type="file"
                    accept=".png,.jpg,.jpeg"
                    ref={pickerRef}
                />
                <button
                    className="profileimage__picker--btn"
                    onClick={() => pickerRef.current.click()}
                >
                    Profile Image
                </button>
            </div>
        </div>
    );
};

export default ImagePicker;
