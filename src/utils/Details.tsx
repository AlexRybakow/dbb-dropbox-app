import { useState, useEffect } from 'react';
import "../components/styles.css";
import Alert from '@mui/material/Alert'

const ShowDetails = () => {

  const [fileTitle, setfileTitle] = useState<string>('')
  const [date, setDate] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  useEffect(() => {
    async function fetchDetails() {
      try {
        const res = await fetch("https://api.dropboxapi.com//2/file_requests/get", {
          method: "POST",
          body: JSON.stringify({
            'id': 'KnplCPjNUQ7yTHpxmiic'
          }),
          headers: {
            Authorization: "Bearer sl.Bbf7-s1XZ5JDk2wktHRyrNIjknYgT8JIIgSWKqnHU4CVOne_zfEdEx_GCCC0GMDPDcHbWb3WBAGMiwt4iXRqGXihTqz5xVlKA_PAHbpNIbp1inVdbSZNDyxAsPKSv3RnAAeLVt03",
            "Content-Type": "application/json"
          },
        });
        const data = await res.json();
        const reqTitle = data.title;
        const reqName = data.created.substring(10, 0);
        if (res.status === 200) {
          setfileTitle(reqTitle)
          setDate(reqName)
        } else {
          setError(true)
        }
      } catch (err) {
        return new Error('No data');
      }
    }
    fetchDetails();
  }, []);
  return (
    <div>
      {error ?
        <Alert severity="error">Oops! Something went wrong, try again later</Alert>
        :
        <Alert severity="success">Your latest request is <span>{fileTitle}</span> made on <span>{date}</span> </Alert>
      }
    </div>
  )
};

export default ShowDetails;