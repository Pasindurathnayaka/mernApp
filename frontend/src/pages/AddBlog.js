import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import styles from '../styles/add.module.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from "react";
import { RadioButton } from 'primereact/radiobutton'; // Import RadioButton

const AddBlog = () => {

  const [schoolCode, setSchoolCode] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [address, setAddress] = useState("");
  const [footSize, setFootSize] = useState("S"); // Initialize footSize with default value
  const [price, setPrice] = useState("L"); // Initialize price with default value
  const [machineType, setMachineType] = useState("");
  const [length, setLength] = useState("");
  const [grade, setGrade] = useState("");
  const [studentCount, setStudentCount] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [designcode, setDesigncode] = useState("");
  const [nitting, setNitting] = useState("");
  const [successMessage, setSuccessMessage] = useState('');
  const [file, setFile] = useState(null);

  const handleUpload = (e) => {
    const formdata = new FormData();
    formdata.append('file', file);
    axios.post('http://localhost:5000/upload', formdata)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }


  async function handleSubmit(e) {

    e.preventDefault();

    const formData = {
      schoolCode: schoolCode,
      schoolName: schoolName,
      address: address,
      machineType: machineType,
      length: length,
      footSize: footSize,
      grade: grade,
      studentCount: studentCount,
      price: price,
      contactNumber: contactNumber,
      designcode: designcode,
      nitting: nitting
    };

    try {

      const response = await fetch('http://localhost:5000/api/v1/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });


      if (response.ok) {
        // Blog added successfully
        // alert('Blog added!');
        setSuccessMessage("Blog added successfully");
        setSchoolCode("");
        setSchoolName("");
        setAddress("");
        setMachineType("");
        setLength("");
        setGrade("");
        setStudentCount("");
        setPrice("");
        setContactNumber("");
        setFootSize("");

        // Redirect to home page after 1.5 seconds
        setTimeout(() => {
          window.location.href = '/';
        }, 1500);

      } else {
        // Handle error case
        console.error('Failed to add blog');
      }

    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      <NavBar />

      <h1 className={styles.header}>Add New Item</h1>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>

          {/* Render the Tailwind CSS success alert */}
          {successMessage && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 m-4">
              <p>{successMessage}</p>
            </div>
          )}



          <span className="p-float-label">
            <InputText id="schoolCode" className={styles.input} value={schoolCode} onChange={(e) => setSchoolCode(e.target.value)} required />
            <label htmlFor="schoolCode" className={styles.input}>Enter schoolCode:</label>
          </span>

          <br />

          <span className="p-float-label">
            <InputText id="schoolName" className={styles.input} value={schoolName} onChange={(e) => setSchoolName(e.target.value)} required />
            <label htmlFor="schoolName" className={styles.input}>Enter schoolName:</label>
          </span>

          <br />

          <span className="p-float-label">
            <InputTextarea id="address" className={styles.text} value={address} onChange={(e) => setAddress(e.target.value)} rows={5} cols={30} required />
            <label htmlFor="address" className={styles.input}>Enter address:</label>
          </span>

          <br />

          <span className="p-float-label">
            <InputText id="footSize" className={styles.input} value={footSize} onChange={(e) => setFootSize(e.target.value)} required />
            <label htmlFor="footSize" className={styles.input}>Foot Size:</label>
          </span>

          <br />

          <span className="p-float-label">
            <InputText id="length" className={styles.input} value={length} onChange={(e) => setLength(e.target.value)} required />
            <label htmlFor="length" className={styles.input}>Enter length:</label>
          </span>

          <br />

          <span className="p-float-label">
            <InputText id="price" className={styles.input} value={price} onChange={(e) => setPrice(e.target.value)}  required />
            <label htmlFor="price" className={styles.input}>Price:</label>
          </span>

          <br />

          <span className="p-float-label">
            <InputText id="machineType" className={styles.input} value={machineType} onChange={(e) => setMachineType(e.target.value)} required />
            <label htmlFor="machineType" className={styles.input}>Enter machineType:</label>
          </span>

          <br />

          <span className="p-float-label">
            <InputText id="grade" className={styles.input} value={grade} onChange={(e) => setGrade(e.target.value)} required />
            <label htmlFor="grade" className={styles.input}>Enter grade:</label>
          </span>

          <br />

          <span className="p-float-label">
            <InputText id="studentCount" className={styles.input} value={studentCount} onChange={(e) => setStudentCount(e.target.value)} required />
            <label htmlFor="studentCount" className={styles.input}>Enter studentCount:</label>
          </span>

          <br />

          <span className="p-float-label">
            <InputText id="contactNumber" className={styles.input} value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} required />
            <label htmlFor="contactNumber" className={styles.input}>Enter contactNumber:</label>
          </span>

          <br />

          <span className="p-float-label">
            <InputTextarea id="designcode" className={styles.text} value={designcode} onChange={(e) => setDesigncode(e.target.value)} rows={1} cols={40} required />
            <label htmlFor="designcode" className={styles.input}>Design Code:</label>
          </span>

          <br />

          <span className="p-float-label">
            <InputTextarea id="nitting" className={styles.text} value={nitting} onChange={(e) => setNitting(e.target.value)} rows={1} cols={40} required />
            <label htmlFor="nitting" className={styles.input}>Nitting:</label>
          </span>

          <br />

          <div>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button className={styles.uploadButton} onClick={handleUpload}>Upload</button>
            <br /><br />
          </div>

          {/* <Button className={styles.button} type="submit" label="Submit" /> */}

        </form>
      </div>
      <Footer />
    </>
  );
};

export default AddBlog;