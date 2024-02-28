import React from "react";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import styles from '../styles/home.module.css';
import { InputText } from 'primereact/inputtext';
import axios from 'axios';

const Home = () => {

  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    Image5: '',
  });

  let Image3;
  useEffect(() => {
    axios.get(`http://localhost:5000/getImage`)
      .then(res => {
        // debugger
        setImage(res.data);
        console.log("test", res.data[0].image);
        let image2 = res.data;
        formData.Image5 = image2.map((element) => element.image);

        console.log("Image3", formData.Image5);
        console.log("Image", Image);  // Assuming Image is supposed to be defined somewhere in your code

      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  console.log("Image4", formData.Image5);

  useEffect(() => {
    async function getBlogs() {
      try {

        const res = await fetch("http://localhost:5000/api/v1/blogs");

        const data = await res.json();

        if (data) {
          setBlogs(data);
          setIsLoading(false); // Set loading to false when data is fetched
        }

      } catch (error) {
        console.log(error.toString());
        setIsLoading(false); // Set loading to false even if there's an error
      }
    }

    getBlogs();

  }, [])

  async function deleteBlog(id) {
    try {
      // Check if the user is logged in before proceeding with the delete request
      // const isLoggedIn = localStorage.getItem('token');

      const response = await fetch(
        `http://localhost:5000/api/v1/blogs/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Blog deleted successfully
        alert("Blog deleted!");

        // Remove the deleted blog from the state
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));

      } else {
        console.error("Failed to delete blog");
      }
    } catch (error) {
      console.log(error.toString());
    }
  }

  function handleSearch(e) {
    setSearchQuery(e.target.value);
  }

  // Filter blogs based on search query
  const filteredBlogs = blogs.filter((blog) =>
    blog.schoolCode.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <>
      <div id="page">

        <NavBar />

        <div className={styles.container}>

          <br></br>
          <div className={styles.searchContainer}>
            <span className="p-input-icon-left" >
              <i className="pi pi-search" />
              <InputText placeholder="Search" value={searchQuery} onChange={handleSearch} />
            </span>
          </div>

          <div>
            <button className={styles.addButton} onClick={() => { window.location.href = `/AddBlog` }}>Add a new Item</button>
          </div>

          <br></br>
          {/* <button className={styles.pdfButton} onClick={GenerateReport}>Generate PDF</button> */}

          <div className={styles.tableContainer}>
            {isLoading ? (
              <h1 style={{ fontSize: "40px" }}>🌀 Loading...</h1>
            ) : (

              
              <table>

                <thead>
                  <tr>
                    <th>Image</th>
                    <th>School Code</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredBlogs.map((blog, index) => (
                    <tr key={blog._id}>
                      <td>
                        <div>
                          <img className={styles.roundedImage} src={`http://localhost:5000/uploads/${formData.Image5[index]}`} alt="image" />
                        </div>
                      </td>
                      <td>{blog.schoolCode}</td>
                      <td className={styles.actionButtons}>
                        <button id={styles.view} onClick={() => { window.location.href = `/viewBlog/${blog._id}` }}>View</button>
                        <button onClick={() => { window.location.href = `/updateBlog/${blog._id}` }}>Update</button>
                        <button id={styles.delete} onClick={() => deleteBlog(blog._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            )}
          </div>

         

        </div>

        <Footer />

      </div>
    </>
  )
}

export default Home;