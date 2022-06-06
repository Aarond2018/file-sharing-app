import { useState } from "react";
import axios from "axios";
import FileUpload from "../components/FileUpload";
import FileLinkPreview from "../components/FileLinkPreview";
import styles from "../styles/Home.module.css";

export default function Home() {
	const [file, setFile] = useState();
	const [status, setStatus] = useState();
	const [fileId, setFileId] = useState();

	const handleUpload = (e) => {
		e.preventDefault();
		uploadFile();
	};

	const uploadFile = async () => {
		setStatus("Uploading...");
		const formData = new FormData();
		formData.append("file", file);
		try {
			const response = await axios.post("/api/file", formData);
			setFileId(response.data.public_id);
			setStatus("Upload successful");
		} catch (error) {
			setStatus("Upload failed..");
		}
	};

	return (
		<div className={styles.app}>
			<h1>Want to share a file?</h1>
			{status !== "Upload successful" ? (
				<FileUpload
					file={file}
					setFile={setFile}
					handleUpload={handleUpload}
					status={status}
				/>) : (
				<FileLinkPreview file={file} id={fileId} setStatus={setStatus} />
			)}		
		</div>
	);
}
