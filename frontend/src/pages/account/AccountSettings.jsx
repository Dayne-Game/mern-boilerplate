import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { update, reset } from '../../features/user/UserSlice';
import { toast } from 'react-toastify'
import axios from 'axios';

function AccountSettings() {
    const navigate = useNavigate()
	const dispatch = useDispatch()
  
    const { user, isError, isLoading, isSuccess, message } = useSelector((state) => state.user);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	const [image, setImage] = useState("");
	const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()
	const [uploading, setUploading] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);
  
    useEffect(() => {
        if (!user) {
            navigate("/login");
        } else {
            setName(user.name);
            setEmail(user.email);
        }

        if (isError) {
            toast.error(message)
			dispatch(reset());
        }

        if (isSuccess) {
            toast.success('Account Information Updated!');
			dispatch(reset());
        }

        if (!selectedFile) {
            setPreview(undefined);
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);

        // free memory when ever this component is unmounted
        return () => {
            URL.revokeObjectURL(objectUrl);
        } 

	}, [user, navigate, selectedFile, dispatch, message, isError, isSuccess])

	const uploadFileHandler = async (e) => {
		const file = e.target.files[0];
		const formData = new FormData();
		formData.append("image", file);
		setUploading(true);

		if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0])
	
		try {
		  const config = {
			headers: {
			  "Content-Type": "multipart/form-data",
			},
		  };
	
		  const { data } = await axios.post("/api/upload", formData, config);
	
		  setImage(data);
		  setUploading(false);
		} catch (error) {
		  console.error(error);
		  setUploading(false);
		}
	};

	const submitHandler = (e) => {
		e.preventDefault();

		if(password !== password2) {
            toast.error("Passwords Do not match");
        } else {
            const userData = { name, email, image, password }
            dispatch(update(userData));
        }
	}

	return (
		<>
			<div className='row'>
				<div className="col-sm-12">
					<h4 className='mt-4 mb-3'>Account Information</h4>
					<form onSubmit={submitHandler}  style={{ width: '700px' }}>
						<div className="card border-0 mb-3">
							<div class="card-body">
								<div className='col-sm-12'>
									<div className="d-flex justify-content-start align-items-center">
										<span className='profile_img_account'>
											{selectedFile ? <img id="profile_image_preview" src={preview} alt="" /> : <img id="profile_image_preview" src={user && user.image} alt="" />}
										</span>
										<p className='flex-grow-1' style={{ marginBottom: '0px', marginLeft: '20px' }}>{selectedFile ? selectedFile.name : 'Profile Picture'}</p>
										<div className='custom_upload_container'>
											{uploading? (
												<span style={{fontWeight: 'bold'}}>UPLOADING <i className="fa-solid fa-circle-notch fa-spin upload-image-loader"></i></span>
											) : ('Browse')}
											<input type="file" id="profile_image_upload" onChange={uploadFileHandler} className='custom_file_upload' />
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className='mb-3'>
							<input type="text" className="form-control border-0 p-10" id="name" name="name" value={name} placeholder='Name' onChange={(e) => setName(e.target.value)}></input>
						</div>
						<div className='mb-3'>
							<input type="email" className="form-control border-0 p-10" id="email" name="email" value={email} placeholder='Email address' onChange={(e) => setEmail(e.target.value)}></input>
						</div>
						<div className='mb-3'>
							<div className='input-group'>
								<input type="password" className="form-control border-0 p-10" id="password" name="password" value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)}></input>
							</div>
						</div>
						<div className='mb-3'>
							<div className='input-group'>
								<input type="password" className="form-control border-0 p-10" id="password2" name="password2" value={password2} placeholder='Confirm Password' onChange={(e) => setPassword2(e.target.value)}></input>
							</div>
						</div>
						<div className='d-grid mb-3'>
							<button type="submit" className="btn btn-primary btn-block p-10">{ isLoading ? <i className="fa-solid fa-circle-notch fa-spin loading-btn-size"></i> : "Update Details" }</button>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}

export default AccountSettings;