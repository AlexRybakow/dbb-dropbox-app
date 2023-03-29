import React, { useState } from "react";
import "./styles.css";
import GetRequests from "../utils/Request";
import DropboxChooser from 'react-dropbox-chooser'
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert';

export const Home = () => {
  const [link, setLink] = useState<string>("")
  const [anchor, setAnchor] = useState<null | HTMLElement>(null)
  const [openedMsg, setOpenedMsg] = useState<boolean>(false)
  const [shownRequests, setShownRequests] = useState<boolean>(false)
  function handleSuccess(files: { thumbnailLink: React.SetStateAction<string>; }[]) {
    setLink(files[0].thumbnailLink)
    console.log(link)
  }
  const handleOpenOrganiseMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget);
  };
  const handleCloseOrganiseMenu = () => {
    setAnchor(null);
  };

  const AlertMessage = () => {
    return (
      <Alert severity="info">Not implemented, coming soon!</Alert>
    )
  }

  const handleOpenAlert = () => {
    setOpenedMsg(true)
    setTimeout(() => {
      setOpenedMsg(false)
    }, 1000)
  }

  const ShowRequests = () => {
    setShownRequests(true)
  }

  return (
    <div className="App">
      <h1 className="title">Upload Or Review Your Files</h1>
      <br /><br />
      <div className="container">
        <div className="buttons">
          <DropboxChooser appKey={process.env.REACT_APP_API_KEY}
            success={handleSuccess}
            cancel={() => console.log('closed')}
            multiselect={true}
          >
            <Button variant="contained">Upload</Button>
          </DropboxChooser>
          <Button variant="contained" onClick={handleOpenOrganiseMenu} className="multi-folder">Organizer</Button>
          <Menu
            sx={{ mt: '30px' }}
            id="menu-appbar"
            anchorEl={anchor}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchor)}
            onClose={handleCloseOrganiseMenu}
          >
            <MenuItem className="menu-item" onClick={handleOpenAlert}>
              <Typography textAlign="center">Files organizing</Typography>
            </MenuItem>
            <MenuItem className="menu-item" onClick={handleOpenAlert}>
              <Typography textAlign="center">Naming convention</Typography>
            </MenuItem>
            <MenuItem className="menu-item" onClick={handleOpenAlert}>
              <Typography textAlign="center">Automation</Typography>
            </MenuItem>
          </Menu>
          <Button variant="contained" className="requests" onClick={ShowRequests}>Show Requests</Button>
        </div>
        <br /><br />
        <h3>Uploaded Files</h3>
        {openedMsg ? <AlertMessage /> : null}
        {shownRequests ? <GetRequests /> : null}
      </div>
    </div>
  );
}

export default Home;