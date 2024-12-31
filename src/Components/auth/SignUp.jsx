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
import { registerUser } from "./auth.service";

const SignupSchema = Yup.object().shape({
    name: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password is too short").required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
});
const Signup = () => {
    const initialValues = { name: "", email: "", password: "", confirmPassword: "" }
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: SignupSchema,
        onSubmit: (values) => {
            registerUser(values).then((res)=>{
                console.log(res,'resons')
            })
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

            {/* Signup Form */}
            <Box
                sx={{
                    // backgroundColor: "#1E1E1E",
                    padding: 4,
                    borderRadius: 2,
                    width: "400px",
                }}
            >
                <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                    <Grid2 container spacing={2}>
                        <Grid2 size={{ xs: 12, md: 12 }} sx={{textAlign:'left'}}>
                            <label htmlFor="name" className="form-label">
                                User Name
                            </label>
                            <TextField
                                placeholder="Username"
                                variant="outlined"
                                fullWidth
                                name='name'
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.touched.name && Boolean(formik.errors.name)
                                }
                                helperText={
                                    formik.touched.name && formik.errors.name
                                }
                                sx={{
                                    mb: 2, color: 'white', "& .MuiInputLabel-root": { color: "#fff" }, // Label color
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
                            <label htmlFor="name" className="form-label">
                                Email
                            </label>
                            <TextField
                                placeholder="Email"
                                variant="outlined"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.touched.email && Boolean(formik.errors.email)
                                }
                                helperText={
                                    formik.touched.email && formik.errors.email
                                }
                                fullWidth
                                sx={{
                                    mb: 2, color: 'white', "& .MuiInputLabel-root": { color: "#fff" }, // Label color
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
                            <label htmlFor="name" className="form-label">
                                Password
                            </label>
                            <TextField
                                placeholder="Password"
                                type="password"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.touched.password && Boolean(formik.errors.password)
                                }
                                helperText={
                                    formik.touched.password && formik.errors.password
                                }
                                variant="outlined"
                                fullWidth
                                sx={{
                                    mb: 2, color: 'white', "& .MuiInputLabel-root": { color: "#fff" }, // Label color
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
                            <label htmlFor="name" className="form-label">
                                Confirm Password
                            </label>
                            <TextField
                                placeholder="Confirm Password"
                                type="password"
                                name="confirmPassword"
                                variant="outlined"
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)
                                }
                                helperText={
                                    formik.touched.confirmPassword && formik.errors.confirmPassword
                                }
                                fullWidth
                                sx={{
                                    mb: 2, color: 'white', "& .MuiInputLabel-root": { color: "#fff" }, // Label color
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": { borderColor: "#fff" }, // Border color
                                        "&:hover fieldset": { borderColor: "#2979FF" }, // Hover border color
                                        "&.Mui-focused fieldset": { borderColor: "#2979FF" }, // Focused border color
                                        "& input": { color: "#fff" }, // Input text color
                                        "& input::placeholder": { color: "#fff", opacity: 1 },
                                    }
                                }}
                            /></Grid2>
                        <Grid2 size={{ xs: 12, md: 12 }} sx={{ textAlign: 'left' }}>
                            <Button
                                variant="contained"
                                type="submit"
                                fullWidth
                                sx={{
                                    backgroundColor: "#2979FF",
                                    "&:hover": {
                                        backgroundColor: "#1E88E5",
                                    },
                                }}
                            >
                                Sign Up
                            </Button>
                        </Grid2>
                    </Grid2></form>
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
                <Link href="/" underline="hover" sx={{ mt: 2, display: "block", color: "#fff" }}>
                    Already have an account? Sign in
                </Link>
            </Box>
        </Box>
    );
};

export default Signup;
