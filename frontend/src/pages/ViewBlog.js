import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import styles from '../styles/view.module.css';

const ViewBlog = () => {

    const { id } = useParams();

    const [blog, setBlogs] = useState([]);

    useEffect(() => {

        async function getBlog() {
            

            try {
                const res = await fetch(`http://localhost:5000/api/v1/blogs/${id}`, {
                    
                });

                const data = await res.json();

                if (data) {
                    setBlogs(data);
                }

            } catch (error) {
                console.log(error.message);
            }
        }

        getBlog();

    }, [id]); // Include navigate in the dependency array

    return (
        <>
            <NavBar />

            <h1 className={styles.header} >View Item</h1>

            <hr />

            <div className={styles.container}>
                <p className={styles.author}>School Code:  {blog.schoolCode}</p>
                <p className={styles.author} >School Name: {blog.schoolName}</p>
                <p className={styles.author}>Adderess: {blog.address}</p>
                <p className={styles.author}>FootSize: {blog.footSize}</p>
                <p className={styles.author}>Length: {blog.length}</p>
                <p className={styles.author}>Price: {blog.price}</p>
                <p className={styles.author}>Machine Type: {blog.machineType}</p>
                <p className={styles.author}>Grade: {blog.grade}</p>
                <p className={styles.author}>Sudent Count: {blog.studentCount}</p>
                <p className={styles.author}>Design Code: {blog.designcode}</p>
                <p className={styles.author}>Nitting: {blog.nitting}</p>
                <p className={styles.author}>Contact Number: {blog.contactNumber}</p>
                <br />
            </div>

            <Footer />
        </>
    )
}

export default ViewBlog;
