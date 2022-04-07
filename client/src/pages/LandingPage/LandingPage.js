import React , {useState, useEffect}from "react";
import {useLocation} from 'react-router-dom'
import axios from 'axios';
import Navbar from '../../components/Navbar/NavUser'
import './LandingPage.css'
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';


function LandingPage() {

  const loggedUser = useLocation().state.data.idToken.payload.email;
  const baseURL = 'http://localhost:8081';
  const [dropdown, setDropdown] = useState("Private")
  const [allFiles, setAllFiles]= useState([]);
  const [selectFile, setSelectFile] = useState(null);

  // const headers = {
  //   "Access-Control-Allow-Headers" : "Content-Type",
  //   "Access-Control-Allow-Origin": "*",
  //   "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
  // }

  const handleFileChange = (e) => {
    setSelectFile(e.target.files[0]);
  }

  const handleDropDown = (e)=> {
    setDropdown(e.target.value)}

  const handleUploadClick = (e) => {    
    const data = new FormData();
    data.append('file', selectFile);
    data.append('userName',document.getElementsByName('webpage')[0].id);
    data.append('privacy',dropdown);
    axios.post(baseURL + "/api/upload", data)
    .then(res=> {window.location.reload()})
  }

  const fileNameEdit = (name) =>{
    const nameString = String(name)
    if(nameString.startsWith('Public/')){
      return nameString.substring(7, nameString.length)
    }
    return nameString.substring(document.getElementsByName('webpage')[0].id.length+1, nameString.length)
  }

  const setVisibility = (name) =>{
    const nameString = String(name)
    if(nameString.startsWith('Public/')){
      return "Public"
    }
    return "Private"
  }

  const handleSearch = () =>{

    const searchKey = document.getElementById('searchBar').value;
    let rows = document.getElementsByTagName('tr');
    for(let i = 0 ;i<document.getElementsByTagName('tr').length;i++){
      let isValidRow = false;
      for(let j=0; j<document.getElementsByTagName('tr')[i].childNodes.length;j++){
        if(document.getElementsByTagName('tr')[i].childNodes[j].tagName === 'TH'){
          isValidRow = true;
          break;
        }
        if(String(document.getElementsByTagName('tr')[i].childNodes[j].innerHTML).includes(searchKey) && 
          document.getElementsByTagName('tr')[i].childNodes[j].childElementCount === 0){
          isValidRow = true;
          break;
        }
      }
      if(!isValidRow){
        document.getElementsByTagName('tr')[i].style = 'display:none'
      }
      else{
        document.getElementsByTagName('tr')[i].style = 'display:true'
      }
    }
  }

  const handleDownload = (key) => {
    console.log(baseURL + "/api/download?key="+key+'&user='+document.getElementsByName('webpage')[0].id);
    window.location.href = baseURL + "/api/download?key="+key+'&user='+document.getElementsByName('webpage')[0].id;
  }

  useEffect(() => {
    getIntialData()
  }, []);

  const setID  = () =>{
    console.log(loggedUser);
    if(loggedUser){
      document.getElementsByName('webpage')[0].id = loggedUser;
    }
  }

  const getIntialData = () =>{
    setID();
    axios.post(baseURL + "/api/getInfo",  {'userName':document.getElementsByName('webpage')[0].id}).then(result => {
      const data = result.data;
      setAllFiles(data);
    }
    ).then(err=> console.log(err))
  }

  return (
    <div className="pagewrapper" id='localStorageUserName' name='webpage'>
        <Navbar />

      <div className="search-bar-div">
        <input className='search-bar' type='text' id='searchBar' name='search' placeholder='Search...' />
        <AiIcons.AiOutlineSearch style={{fontSize: '30px'}} onClick={handleSearch} />
      </div>
      <form className="upload-a-file">
        <input className="choose-file" type="file" onChange={handleFileChange}/>
        <label className="label-privacy-dropdown" for="privacy">Choose Visibility</label>
        <select className="dropdown-privacy" onChange={handleDropDown} name="privacy" id="privacy">
          <option value="Private">Private</option>
          <option value="Public">Public</option>
        </select>
        <button className="upload-button" onClick={handleUploadClick} >UPLOAD<FaIcons.FaUpload style={{marginLeft: '10px', fontSize:'15px', color: '#488bf6'}} /></button>
      </form>


      <table className="table" style={{marginTop: '30px'}}>
      <thead class="thead-dark">
        <tr>
          <th scope="col">File Name</th>
          <th scope="col">Last Modified</th>
          <th scope="col">File Size (kb)</th>
          <th scope="col">File Visibility</th>
          <th scope="col">Download</th>
        </tr>
      </thead>
        <tbody>
        {allFiles.map((files) => (
          <tr>
            <td>{fileNameEdit(files.Key)}</td>
            <td>{files.LastModified}</td>
            <td>{files.Size}</td>
            <td>{setVisibility(files.Key)}</td>
            <td><button className="download-button" onClick={()=> handleDownload(files.Key)}><FaIcons.FaDownload style={{fontSize: "15px"}}/></button></td>
          </tr>
        ))}
        </tbody>
      </table>
      
    </div>

  );
}

export default LandingPage;