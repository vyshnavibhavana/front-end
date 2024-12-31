import React from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    Link,
    Grid,
    Grid2,
} from "@mui/material";
import triangle from '../../assets/images/Group 2.png';
import ellipse from '../../assets/images/Ellipse 1.png';
import * as Yup from "yup";
import GoogleIcon from '@mui/icons-material/Google';
import { useFormik } from "formik";
import { loginUser } from "./auth.service";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const validationSchemas = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password is too short").required("Password is required"),
});

const Login = () => {

    const [loading, setLoading] = useState(true);
    
    const initialValues = { email: "", password: "" }
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchemas,
        onSubmit: (values) => {
            console.log(values, 'values')
            setLoading(true);
            loginUser(values).then((res)=>{
                console.log(res, 'respones');
                sessionStorage.setItem('user', JSON.stringify(res));
                toast.success(res.message, { position: 'top-right' });
                setLoading(false);
                navigate('/dashboard')
            }).catch((err) => toast.error(err.message, {position:'top-right'}))
        }
    })
    return (
        <Box
            sx={{
                backgroundColor: "#121212",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#fff",
                position: "relative",
            }}
        >

            {/* Background Shapes */}
            <img
                src={triangle}
                alt="Triangle"
                style={{
                    position: "absolute",
                    width: '250px',
                    top: "20%",
                    left: "12%",
                }}
            />
            <img
                src={ellipse}
                alt="Ellipse"
                style={{
                    position: "absolute",
                    bottom: "10%",
                    right: "10%",
                }}
            />

            {/* Login Form */}
            <Box
                sx={{
                    // backgroundColor: "#1E1E1E",
                    padding: 4,
                    borderRadius: 2,
                    width: "400px",
                }}
            >
                {loading && (
                                <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                                    <CircularProgress />
                                </Box>
                            )}
                <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                    <Grid2 container spacing={2}>
                        <Grid2 size={{ xs: 12, md: 12 }} sx={{ textAlign: 'left' }}>
                            <label htmlFor="name" className="form-label">
                                Email
                            </label>
                            <TextField
                                placeholder="Email"
                                variant="outlined"
                                fullWidth
                                name='email'
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.touched.email && Boolean(formik.errors.email)
                                }
                                helperText={
                                    formik.touched.email && formik.errors.email
                                }
                                sx={{
                                    mb: 2,"& .MuiInputLabel-root": { color: "#fff" },
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": { borderColor: "#fff" },
                                        "&:hover fieldset": { borderColor: "#2979FF" }, 
                                        "&.Mui-focused fieldset": { borderColor: "#2979FF" }, 
                                        "& input": { color: "#fff" }, 
                                        "& input::placeholder": { color: "#fff", opacity: 1 },
                                    }
                                }}
                            />
                        </Grid2>
                        <Grid2 size={{ xs: 12, md: 12 }} sx={{ textAlign: 'left' }}>
                            <label htmlFor="name" className="form-label">
                                Password
                            </label>
                            <TextField
                                placeholder="Password"
                                type="password"
                                variant="outlined"
                                fullWidth
                                name='password'
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.touched.password && Boolean(formik.errors.password)
                                }
                                helperText={
                                    formik.touched.password && formik.errors.password
                                }
                                sx={{
                                    mb: 2, "& .MuiInputLabel-root": { color: "#fff" }, // Label color
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": { borderColor: "#fff" }, // Border color
                                        "&:hover fieldset": { borderColor: "#2979FF" }, // Hover border color
                                        "&.Mui-focused fieldset": { borderColor: "#2979FF" }, // Focused border color
                                        "& input": { color: "#fff" }, // Input text color
                                        "& input::placeholder": { color: "#fff", opacity: 1 },
                                    }
                                }}
                            />
                        </Grid2>
                        <Grid2 size={{ xs: 12, md: 12 }} sx={{ textAlign: 'left' }}>
                            <Button
                                variant="contained"
                                fullWidth
                                type="submit"
                                sx={{
                                    backgroundColor: "#2979FF",
                                    mb: 2,
                                    "&:hover": {
                                        backgroundColor: "#1E88E5",
                                    },
                                }}
                            >
                                Sign In
                            </Button>
                        </Grid2>
                    </Grid2>
                </form>
                <Typography>
                    OR
                </Typography>

                <Button
                    variant="contained"
                    startIcon={<GoogleIcon />}
                    fullWidth
                    sx={{
                        backgroundColor: "#1E88E5",
                        color: "#fff",
                    }}
                >
                    Sign in with Google
                </Button>
                <Link to={"auth/register"} onClick={()=>navigate('/auth/register')} underline="hover" sx={{ mt: 2, display: "block", color: "#fff" }}>
                    Don't have an account? Register here
                </Link>
            </Box>
            <ToastContainer />
        </Box>
    );
};

export default Login;
