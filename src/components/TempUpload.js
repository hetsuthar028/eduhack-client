import axios from 'axios';
import React, {useState} from 'react';
// import {} from 'form-data'


const Tempupload = () => {

    // const [userFile, setUserFile] = useState(null);
    const [userFile, setUserFile] = useState([]);
    const [prevFile, setPrevFile] = useState('');

    let data = new FormData();

    const fileSelectHandler = async (e) => {
        const param = e.target.files[0];
        // console.log("params", param)
        let reader = new FileReader();
        // await reader.readAsDataURL(param)
        // console.log("Reader", reader);
        // setFile(reader);
        // data.append('file', uFile);
        // data.append('ss', 1);

        // let image_as_base64 = URL.createObjectURL(e.target.files[0])

        for(const [key, value] of Object.entries(e.target.files)){
            console.log("Typeof", value)
            setUserFile(oldValue => [...oldValue, value]);
            // setUserFile([...userFile, value])
        }
        
        // e.target.files.map((file) => {
        //     setUserFile([...userFile, file])
        // })

        // let image_as_base64 = URL.createObjectURL(e.target.files)
        // let image_as_files = e.target.files[0];

        // setUserFile(image_as_files)
        // setPrevFile(image_as_base64)
    }

    const handleSubmit = (e) => {
        e.preventDefault();


        if (userFile !=null){
            let formData = new FormData();
            userFile.map((uFile) => {
                console.log("UFile", uFile);
                formData.append('userImage', uFile)
            })
            

            // axios.post('http://localhost:4400/api/hackathon/upload', formData, {
            //     headers: {
            //         "Content-type": "multipart/form-data",
            //     },
            // }).then((res) => {
            //     console.log("Success", res.data);
            // }).catch(err => {
            //     console.log("ERROR::::", err.response.data);
            // })

            console.log("User File", userFile);

            axios.post('http://localhost:4400/api/hackathon/tempUpload', formData, {
                    headers: {
                        "Content-type": "multipart/form-data",
                    }
                }
            ).then((resp) => {

            }).catch((err) => {
                console.log("ERR", err);
            })

        }

        const headers = {
            "Content-Type": "form-data"
        };

        // if (userFile !=null){
        //     let formData = new FormData();
        //     formData.append('userImage', userFile)

        //     axios.post('http://localhost:4400/api/hackathon/upload', formData, {
        //         headers: {
        //             "Content-type": "multipart/form-data",
        //         },
        //     }).then((res) => {
        //         console.log("Success", res.data);
        //     }).catch(err => {
        //         console.log("ERROR::::", err);
        //     })
        // }

        // const data = new FormData();
        // console.log("file", uFile);
        // data.append('file', uFile);

        // data.forEach((file) => {
        //     console.log("File: ", file);
        // })

        // let options = { content: data };


        // for (var key of data.entries()) {
		// 	console.log(key[0] + ', ' + key[1])
		// }

        // console.log("Form", data);

        // const config = {     
        //     headers: { 'content-type': 'multipart/form-data' }
        // }

        // let formData = new FormData();    //formdata object

        // formData.append('name', 'ABC');   //append the values with key, value pair
        // formData.append('age', 20);

        // axios({     method: 'post',     url: 'http://localhost:4400/api/hackathon/upload',     data: formData,     headers: {'Content-Type': 'multipart/form-data' }   })
        //     .then(function (response) {
        //       //handle success
        //       console.log(response);
        //     })
        //     .catch(function (response) {
        //       //handle error
        //       console.log(response);
        //     });
        
        // axios.post("http://localhost:4400/api/hackathon/upload", formData, config)
        //     .then((res) => {
        //         console.log("Got Image Upload Result", res.data);
        //     }).catch(err => {
        //         console.log("Got errors while Uploading", err);
        //     })

    }
    return (
        <div>
            <form method="POST" onSubmit={handleSubmit} encType="multipart/form-data">
                <input type="file" multiple name="userImage" accept=".png, .jpg, .jpeg" onChange={fileSelectHandler}></input>
                <button type="submit" className="button">Submit</button>
            </form>
        </div>
    );
}

export default Tempupload;
