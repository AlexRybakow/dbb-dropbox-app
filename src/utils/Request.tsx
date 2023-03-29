import { useState, useEffect } from 'react';
import "../components/styles.css";
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button';
import ShowDetails from './Details';

const GetRequests = () => {
  const [requests, setRequests] = useState<string | boolean>(false)
  const [details, setDetails] = useState<boolean>(false)
  const [showDetButton, setShowDetButton] = useState<boolean>(false)

  const handleDetails = () => {
    setDetails(true)
  }
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://api.dropboxapi.com/2/file_requests/count", {
          method: "POST",
          body: "null",
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
            "Content-Type": "application/json"
          },
        });
        const data = await res.json();
        const reqNumber = data.file_request_count;
        if (res.status === 200) {
          setRequests(`You have made ${reqNumber} file requests.`)
          setShowDetButton(true)
        } else {
          setRequests('Oops! Something went wrong, try again later')
          setTimeout(() => {
            setRequests(false)
          }, 2000)
        }
      } catch (err) {
        return new Error('No data');
      }
    }
    fetchData();
  }, []);
  return (
    <div>
      {requests ? <Alert severity={requests ? "success" : "error"}>{requests}</Alert> : null}
      {showDetButton ? <Button variant="contained" className="btn-details" onClick={handleDetails}>Show the latest</Button> : null}
      {details ? <ShowDetails /> : null}
    </div>
  )
};

export default GetRequests;