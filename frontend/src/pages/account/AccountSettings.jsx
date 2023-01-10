import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function AccountSettings() {
    const navigate = useNavigate()
  
    const { user } = useSelector((state) => state.user)

	const [image, setImage] = useState("");
	const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()
	const [uploading, setUploading] = useState(false);
  
    useEffect(() => {
      if (!user) {
        navigate('/login')
      }

		if (!selectedFile) {
			setPreview(undefined)
			return
		}

		const objectUrl = URL.createObjectURL(selectedFile)
		setPreview(objectUrl)

		// free memory when ever this component is unmounted
		return () => URL.revokeObjectURL(objectUrl)

	}, [user, navigate, selectedFile])

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
	
		const icon_text = document.querySelector(".icon-text");
		icon_text.textContent = e.target.files[0].name;
	
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

	return (
		<>
			<div className='row'>
				<div className="col-sm-12">
					<h4 className='mt-4 mb-3'>Account Information</h4>
					<div className="card border-0" style={{ width: '700px' }}>
						<div class="card-body">

							<div className='col-sm-12'>
								<div className="d-flex justify-content-start align-items-center">
									<span className='profile_img_account'>
										{selectedFile ? <img id="profile_image_preview" src={preview} alt="" /> : <img id="profile_image_preview" src={require('../../components/test.jpg')} alt="" />}
									</span>
									<p className='flex-grow-1' style={{ marginBottom: '0px', marginLeft: '20px' }}>{selectedFile ? selectedFile.name : 'Profile Picture'}</p>
									<div className='custom_upload_container'>
										Upload new Profile Image
										<input type="file" id="profile_image_upload" onChange={uploadFileHandler} className='custom_file_upload' />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default AccountSettings;