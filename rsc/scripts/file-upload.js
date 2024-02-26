const filenameText = document.querySelector('[filename]');
const uploadFileButton = document.querySelector('[upload-file]');
const selectFileButton = document.querySelector('[select-file]');
const uploadField = document.querySelector('[upload-field]');

var selectedFile;

selectFileButton.addEventListener('click', () => {
    uploadField.click();
});

uploadFileButton.addEventListener('click', () => {
    if (!selectedFile)
        alert('Please select a file.');
    else {
        const formData = new FormData();

        formData.append('uploadedFile', selectedFile)
        fetch('file_upload', {
            method: 'PUT',
            body: formData
        }).then(res => res.json()).then(({ uploaded }) => {
            
        })
    }
});

uploadField.addEventListener('change', () => {
    selectedFile = uploadField.files[0];
    filenameText.innerHTML = `Filename: <b>${selectedFile.name}</b>`;
});
