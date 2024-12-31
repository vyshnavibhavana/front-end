import DeleteIcon from "@mui/icons-material/Delete";
import { AppBar, Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Paper, Switch, Tab, Tabs, TextField, Toolbar, Typography } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from '@mui/icons-material/Close';
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormContext } from "../App";
import { deleteForm, getForm } from "./auth/auth.service";

const Dashboard = (props) => {
    const [darkMode, setDarkMode] = useState(props?.darkMode);
    const [items, setItems] = useState([]);
    const [open, setOpen] = useState(false);
    // const [folders, setFolders] = useState([]);
    const [newFolderName, setNewFolderName] = useState('');
    const [openFolder, setOpenFolder] = useState(false);
    const navigate = useNavigate();
    const {folders, setFolders} = useContext(FormContext);
    const handleThemeChange = () => {
        setDarkMode(!darkMode);
    };

    const handleAddTypebot = (index) => {
        // let tmp = [...folders[index].form];
        let folder = [...folders];
        let tmp = { id: folder[index].form.length + 1, formName: `New Form ${folder[index].form.length + 1}`,formData:[] };
        folder[index].form = [...folder[index].form, tmp];
        setFolders(folder);
    };

    const handleDeleteTypebot = (id, index) => {
        let folder = [...folders];
        folder[index].form = folder[index].form.filter((item)=>item.id !== id);
        setFolders(folder);
    };

    const handleCloseSharePopup = () => {
        setOpen(false);
    };
    useEffect(() => {
        console.log(props, 'props');
        setDarkMode(props?.darkMode);
        setOpen(props?.openModal);
    }, [props?.darkMode, props?.openModal])

    const addFolder = () => {
        if (newFolderName.trim() === '') return;

        const newFolder = { folderId: Date.now(), folderName: newFolderName , form:[]};

        setFolders([...folders, newFolder]);
        setNewFolderName('');
        setOpenFolder(false);
    };

    const deleteFolder = (id) => {
        deleteForm(id).then((res)=>{
            console.log(res,'response');
            fetchData();
        })
        setFolders(folders.filter((folder) => folder.id !== id));
    };
    function fetchData(){
        getForm().then((res) => {
            console.log(res, 'response');
            setFolders(res);
        })
    }
    useEffect(()=>{
        fetchData();
    },[])
    return (
        <Box
            sx={{
                backgroundColor: !darkMode ? "#121212" : "#f4f4f4",
                color: !darkMode ? "#fff" : "#000",
                minHeight: "100vh",
                padding: 2,
            }}
        >
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Button variant="contained" color="primary" onClick={() => setOpenFolder(!openFolder)}>
                    Create Folder
                </Button>
            </Box>
                {folders.map((folder, index) => (
                    <><Card
                        key={folder.id}
                        sx={{ width: 200, bgcolor: !darkMode ? 'grey.800' : 'white', display: 'flex' }}
                    >
                        <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 !important' }}>
                            <Typography>{folder.folderName}</Typography>
                            <IconButton
                                sx={{
                                    color: "red",
                                }}
                                onClick={() => deleteFolder(folder._id)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </CardContent>
                    </Card>
                    <Grid container spacing={3} sx={{ marginTop: 3 }}>
                            <Grid item xs={12} sm={4} md={3}>
                                <Paper
                                    elevation={3}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        height: 150,
                                        cursor: "pointer",
                                        backgroundColor: "#252525",
                                        color: "#fff",
                                    }}
                                    onClick={()=>handleAddTypebot(index)}
                                >
                                    <Box textAlign="center">
                                        <AddIcon sx={{ fontSize: 40 }} />
                                        <Typography>Create a Typebot</Typography>
                                    </Box>
                                </Paper>
                            </Grid>

                            {folder?.form?.map((item) => (
                                <Grid item xs={12} sm={4} md={3} key={item.id}>
                                    <Paper
                                        elevation={3}
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            height: 140,
                                            backgroundColor: "#1e1e1e",
                                            color: "#fff",
                                            padding: 2,
                                            position: "relative",
                                        }}
                                    >
                                        <Box textAlign="center" onClick={() => navigate(`/createForm/${folder.folderId}/${item.id}`)}>
                                            <FolderIcon sx={{ fontSize: 40 }} />
                                            <Typography>{item.formName}</Typography>
                                        </Box>
                                        <IconButton
                                            sx={{
                                                position: "absolute",
                                                top: 5,
                                                right: 5,
                                                color: "white",
                                            }}
                                            onClick={() => handleDeleteTypebot(item.id, index)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                        </>
                            ))}
            <Dialog
                open={open}
                onClose={handleCloseSharePopup}
                fullWidth
                maxWidth="md"
                sx={{
                    "& .MuiDialog-paper": {
                        backgroundColor: darkMode ? "#121212" : "#f4f4f4",
                        color: darkMode ? "#fff" : "#000",
                        width: "80%",
                    },
                }}
            >
                <DialogActions
                    style={{
                        display: "flex",
                        justifyContent: "end",
                        backgroundColor: darkMode ? "#121212" : "#f4f4f4",
                        color: darkMode ? "#fff" : "#000",
                    }}
                >
                    <Button onClick={handleCloseSharePopup}>
                        <CloseIcon />
                    </Button>
                </DialogActions>

                <div style={{ margin: "6px 3px" }}>
                    <DialogTitle>Invite By Mail</DialogTitle>
                    <DialogContent
                        sx={{
                            backgroundColor: darkMode ? "#121212" : "#f4f4f4",
                            color: !darkMode ? "#fff" : "#000",
                            "& .MuiInputBase-root": {
                                color: !darkMode ? "#fff" : "#000",
                                backgroundColor: !darkMode ? "#1e1e1e" : "#fff",
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: !darkMode ? "#fff" : "#000",
                            },
                        }}
                    >
                        <TextField
                            autoFocus
                            margin="dense"
                            placeholder="Email Address"
                            type="email"
                            fullWidth
                            variant="outlined"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={handleCloseSharePopup}
                            color="primary"
                            sx={{
                                width: "100%",
                                color: "white",
                                backgroundColor: "#1E88E5",
                            }}
                        >
                            Send Invite
                        </Button>
                    </DialogActions>

                    <DialogTitle>Invite by link</DialogTitle>

                    <DialogActions>
                        <Button
                            onClick={handleCloseSharePopup}
                            sx={{
                                width: "100%",
                                color: "white",
                                backgroundColor: "#1E88E5",
                            }}
                        >
                            Copy Link
                        </Button>
                    </DialogActions>
                </div>
            </Dialog>
            <Dialog
                open={openFolder}
                onClose={() => setOpenFolder(false)}
                fullWidth
                maxWidth="md"
                sx={{
                    "& .MuiDialog-paper": {
                        backgroundColor: !darkMode ? "#121212" : "#f4f4f4",
                        color: !darkMode ? "#fff" : "#000",
                        width: "80%",
                    },
                }}
            >
                <DialogActions
                    style={{
                        display: "flex",
                        justifyContent: "end",
                        backgroundColor: !darkMode ? "#121212" : "#f4f4f4",
                        color: darkMode ? "#fff" : "#000",
                    }}
                >
                    <Button onClick={() => setOpenFolder(false)}>
                        <CloseIcon />
                    </Button>
                </DialogActions>

                <div style={{ margin: "6px 3px" }}>
                    <DialogTitle>Create New Folder</DialogTitle>
                    <DialogContent
                        sx={{
                            backgroundColor: !darkMode ? "#121212" : "#f4f4f4",
                            color: !darkMode ? "#fff" : "#000",
                            "& .MuiInputBase-root": {
                                color: !darkMode ? "#fff" : "#000",
                                backgroundColor: !darkMode ? "#1e1e1e" : "#fff",
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: !darkMode ? "#fff" : "#000",
                            },
                        }}
                    >
                        <TextField
                            autoFocus
                            margin="dense"
                            placeholder="Enter Folder Name"
                            type="text"
                            fullWidth
                            value={newFolderName}
                            onChange={(e) => setNewFolderName(e.target.value)}
                            variant="outlined"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={addFolder}
                            color="primary"
                            sx={{
                                width: "100%",
                                color: "white",
                            }}
                        >
                            Done
                        </Button>
                        <Button
                            onClick={() => setOpenFolder(false)}
                            color="primary"
                            sx={{
                                width: "100%",
                                color: "white",
                            }}
                        >
                            Cancel
                        </Button>
                    </DialogActions>
                </div>
            </Dialog>
        </Box>
    );
};

export default Dashboard;
