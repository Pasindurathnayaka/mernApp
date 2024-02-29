import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import styles from '../styles/update.module.css';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton'; // Import RadioButtonprice

const UpdateBlog = () => {

    const { id } = useParams();

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


    useEffect(() => {
        async function getBlog() {

            try {
                const res = await fetch(`https://mernapp-e3ri.onrender.com/api/v1/blogs/${id}`, {

                });
                const data = await res.json();
                // console.log(data)

                if (data) {
                    setSchoolCode(data.schoolCode);
                    setSchoolName(data.schoolName);
                    setAddress(data.address);
                    setMachineType(data.machineType);
                    setLength(data.length);
                    setFootSize(data.footSize);
                    setGrade(data.grade);
                    setStudentCount(data.studentCount);
                    setPrice(data.price);
                    setContactNumber(data.contactNumber);

                } else {
                    console.error("Failed to fetch blog");
                }

            } catch (error) {
                console.error(error.message);
            }
        }

        getBlog();

    }, [id]); // Include navigateand token in the dependency array


    const navigate = useNavigate();
    async function handleSubmit(e) {
        e.preventDefault();
    
        const formData = {
            schoolCode,
            schoolName,
            address,
            machineType,
            length,
            footSize,
            grade,
            studentCount,
            price,
            designcode,
            nitting,
            contactNumber
        };
    
        try {
            const response = await fetch(`https://mernapp-e3ri.onrender.com/api/v1/blogs/${id}`, {
                method: "PUT",
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.ok) {
                // Blog updated successfully
                setSuccessMessage("Blog updated successfully");
    
                // Update state with new data
                setSchoolCode(formData.schoolCode);
                setSchoolName(formData.schoolName);
                setAddress(formData.address);
                setMachineType(formData.machineType);
                setLength(formData.length);
                setFootSize(formData.footSize);
                setGrade(formData.grade);
                setStudentCount(formData.studentCount);
                setPrice(formData.price);
                setDesigncode(formData.designcode);
                setNitting(formData.nitting);
                setContactNumber(formData.contactNumber)
    
                // Redirect to home page after 1 seconds
                setTimeout(() => {
                    navigate('/');
                }, 1500);
    
            } else {
                console.error("Failed to update blog");
            }
        } catch (error) {
            console.error(error.message);
        }
    }
    
    return (
        <>
            <NavBar />

            <h1 className={styles.header}>Update Item</h1>
            <div className={styles.container}>
                <form className={styles.form} onSubmit={handleSubmit}>

                    {/* Render the Tailwind CSS success alert */}
                    {successMessage && (
                        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 ml-2 mr-3 md:ml-7">
                            <p>{successMessage}</p>
                        </div>
                    )}

                    <label className={styles.label}>School Name:</label>
                    <InputText
                        className={styles.input}
                        type="text"
                        value={schoolName}
                        onChange={(e) => setSchoolName(e.target.value)}
                    />

                    <br /><br />

                    <label className={styles.label}>school Code:</label>
                    <InputText
                        className={styles.input}
                        type="text"
                        value={schoolCode}
                        onChange={(e) => setSchoolCode(e.target.value)}
                    />

                    <br /><br />
                    <label className={styles.label}>Address:</label>
                    <InputText
                        className={styles.input}
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />

                    <br /><br />

                    <label className={styles.label}>Contact Number:</label>
                    <InputText
                        className={styles.input}
                        type="text"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                    />

                    <br /><br />

                    <label className={styles.label}>Grade:</label>
                    <InputText
                        className={styles.input}
                        type="text"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                    />

                    <br /><br />

                    <label className={styles.label}>Length:</label>
                    <InputText
                        className={styles.input}
                        type="text"
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                    />

                    <br /><br />

                    <label className={styles.label}>Machine Type:</label>
                    <InputText
                        className={styles.input}
                        type="text"
                        value={machineType}
                        onChange={(e) => setMachineType(e.target.value)}
                    />

                    <br /><br />

                    <label className={styles.label}>Student Count:</label>
                    <InputText
                        className={styles.input}
                        type="text"
                        value={studentCount}
                        onChange={(e) => setStudentCount(e.target.value)}
                    />


<br /><br />

<label className={styles.label}>Design code:</label>
<InputText
    className={styles.input}
    type="text"
    value={designcode}
    onChange={(e) => setDesigncode(e.target.value)}
/>


<label className={styles.label}>Nitting:</label>
<InputText
    className={styles.input}
    type="text"
    value={nitting}
    onChange={(e) => setNitting(e.target.value)}
/>

                     
 
                     
                     

                    <Button className={styles.button} type="submit" label="Update" />

                </form>
            </div>

            <Footer />
        </>
    );
};

export default UpdateBlog;
