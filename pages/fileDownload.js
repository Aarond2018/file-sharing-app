import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "../styles/Home.module.css";

export default function FileDownload() {
	const [fileResponse, setFileResponse] = useState();
	const [axiosCallStatus, setAxiosCallStatus] = useState()

	const { id } = useRouter().query;

	useEffect(() => {
		if (id === undefined) return;
		(async () => {
			setAxiosCallStatus("Loading...")
			try {
				const response = await axios.get(`/api/file?id=${id}`);
				setFileResponse(response.data);
				setAxiosCallStatus("")
			} catch (error) {
				setAxiosCallStatus("File not found, refresh your browser")
			}
		})();
	}, [id]);

	return (
		<div className={styles.app}>
			<div className={styles.box}>
				<h2>Your file is Ready</h2>
				{fileResponse ? (
					<a href={fileResponse.secure_url.replace(
							"/upload/",
							`/upload/fl_attachment:${fileResponse.original_filename
								.split(" ")
								.join("_")}/`)}
					>
						Click to download
					</a>
				) : <p>{axiosCallStatus}</p>}
			</div>
		</div>
	);
}
