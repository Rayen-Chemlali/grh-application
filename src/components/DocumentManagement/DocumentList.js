import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import { getDocumentsByUser } from './documentService';
import DownloadButton from './DownloadButton';
import DeleteButton from './DeleteButton';

const DocumentList = ({ userId, refresh }) => {
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await getDocumentsByUser(userId);
                setDocuments(response.data);
            } catch (error) {
                console.error('There was an error fetching the documents!', error);
            }
        };

        fetchDocuments();
    }, [userId, refresh]);

    const handleDelete = (documentId) => {
        setDocuments(docs => docs.filter(doc => doc.id !== documentId));
    };

    return (
        <Table className="align-items-center table-flush" responsive>
            <thead className="thead-light">
            <tr>
                <th scope="col">Document Name</th>
                <th scope="col">Description</th>
                <th scope="col">Download Document</th>
                <th scope="col">Delete Document</th>
            </tr>
            </thead>
            <tbody>
            {documents.map(doc => (
                <tr key={doc.id}>
                    <td>{doc.filename}</td>
                    <td>{doc.description}</td>
                    <td>
                        <DownloadButton documentId={doc.id} />
                    </td>
                    <td>
                        <DeleteButton
                            documentId={doc.id}
                            onDelete={() => handleDelete(doc.id)}
                        />
                    </td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
};

export default DocumentList;
