import React from 'react';
import { Button } from 'reactstrap';
import { downloadDocument } from './documentService';

const DownloadButton = ({ documentId }) => {
    const handleDownload = () => {
        downloadDocument(documentId)
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `document_${documentId}.pdf`);
                document.body.appendChild(link);
                link.click();
                link.remove();
            })
            .catch(error => {
                console.error('There was an error downloading the document!', error);
            });
    };

    return (
        <Button color="primary" onClick={handleDownload}>Download</Button>
    );
};

export default DownloadButton;
