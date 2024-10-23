import styled from "styled-components";
import { useState } from "react";
import ReactPlayer from "react-player";
import {connect} from "react-redux";
import { Timestamp } from 'firebase/firestore';
import { postArticleAPI } from "../actions";

const PostModel = (props) => {
    const[editorText, setEditorText]=useState("");
    const[shareImage, setShareImage]=useState('');
    const [vedioLink , setVedioLink] = useState('');
    const[assetArea ,setAssetArea] = useState('');

    const handleChange = (e) => {
        const image = e.target.files[0]
    
    if (image  === '' || image === undefined){
        alert (`not a image, this file is a ${typeof image}`)
    }

    setShareImage(image)
};

const switchAssestArea = ( area) => {
    setShareImage('');
    setVedioLink('');
    setAssetArea(area);
}
  
   const postArticle = (e) => {
    console.log("post malone: rasii");
    e.preventDefault();
    if (e.target !== e.currentTarget){
    
        return;
    }
    const payload= {
        image: shareImage,
        vedio: vedioLink,
        user: props.user,
        description :editorText,
        timeStamp: Timestamp.now(),
    
       }

      console.log('Payload:', payload);
       props.postArticle(payload);
       
       reset(e);

   }

      
   const reset = (e) => {
    setEditorText(""); 
    setAssetArea('');
    setShareImage('');
    setVedioLink('');   // reset editor content
    props.handleClick(e); // trigger the closing of the modal
};


    return (
        <>
        { props.showModel === "open" && (
    <Container>
        <Content>
            <Header>
                <h2>Create a post</h2>
                <button onClick= {(event ) => reset (event)}>
                    <img src="/Images/cross-001.ico" alt="" />
                </button>
            </Header>
            <SharedContent>
                <UserInfo >
                    {props.user.photoURL ? (
                        <img src = {props.user.photoURL}/>
                     ) : (
                   <img src="/Images/user.svg" alt="" />
                  )}
                    <span>{ props.user ? props.user.displayName : "User"}</span>
                </UserInfo>
                <Editor>
                <textarea 
                value={editorText} 
                onChange={(e) => setEditorText(e.target.value)}
                placeholder="What do you want to talk about?"
                autoFocus={true}

                /> 
                
                { assetArea === "image"  ? (
                <UploadImage>
                    <input type="file" 
                     accept= "image/gif , image/jpeg , image/png"
                    name="image"
                    id="file"
                    style= {{display:"none"}}
                    onChange={handleChange} />
                    <p>
                        <label htmlFor="file" > Select an image to share </label>
                    </p>
                    {shareImage  && <img src={URL.createObjectURL(shareImage)} />}

                    </UploadImage>

                    ) : (
                    assetArea === "media"  && (
                   <>
                   <input 
                   type="text"
                   placeholder="Please input a vedio link " 
                   value={vedioLink}
                   onChange={ (e) => setVedioLink(e.target.value)}/>
                   
                   {vedioLink && <ReactPlayer width={"100%"}  url={vedioLink}/>}
                   
                   </>
                 )
                )}
                
                </Editor>
            </SharedContent>
            <SharedCreation>
                <AttachAsset>
                    <AssetButton onClick={() => switchAssestArea("image")}>
                        <img src="/Images/photo-001.ico" alt="" />
                    </AssetButton>
                    <AssetButton  onClick={() => switchAssestArea("media")}>
                        <img src="/Images/video iconb-001.ico" alt="" />
                    </AssetButton>
                </AttachAsset>
                <ShareComment>
                    <AssetButton>
                      <img src="/Images/comment icon-001.ico" alt="" />
                    </AssetButton>
                </ShareComment>
                <PostButton disabled ={!editorText ? true : false}
                      onClick={(event) => postArticle(event) }
                >
                    Post
                </PostButton>
            </SharedCreation>
            </Content> 
        </Container>
        )}
        </>
    )
};

const Container = styled.div`
position: fixed;
top:0;
bottom:0;
right:0;
left:0;
z-index:9999;
color:black;
background-color: rgba(0,0,0,0.8);
animation: fadeIn 0.3s;
`;

const Content= styled.div `
width:100%;
max-width:552px;
background-color: white;
overflow: initial;
border-radius: 5px;
position: relative;
display: flex;
flex-direction: column;
top: 32px;
margin: 0 auto;

`;

const Header = styled.div`
display: block;
padding: 16px 20px;
border-bottom: 1px solid rgba(0,0,0,0.15);
font-size: 16px;
font-weight: 400;
line-height: 1.5;
color: rgba(0,0,0,0.6);
display: flex;
justify-content: space-between;
align-items: center;
button{
    height: 40px;
    width: 40px;
    min-width: auto;
    color: rgba(0,0,0,0.15);
    svg , img{
        pointer-events: none;
    }
}
`;

const SharedContent = styled.div`
display: flex;
direction: column;
flex-grow: 1;
overflow-y: auto;
vertical-align: baseline;
background:transparent;
padding: 8px, 12px;
`;
const UserInfo=styled.div`
display: flex;
align-items: center;
padding: 12px 24px;
svg, img{
    height: 48px;
    width: 48px;
    background-clip: content-box;
    border: 2px solid transparent;
    border-radius: 50%;
}
span{
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    margin-left: 5px;
}
`;
const SharedCreation = styled.div`
display:flex;
justify-content: space-between;
padding: 12px 24px 12px 16px;

`;

const AssetButton=styled.button`
display: flex;
align-items: center;
height: 40px;
min-width: auto;
color: rgba(0, 0, 0, 0.5);
padding: 6px 6px;

`;

const AttachAsset=styled.div`
align-items: center;
padding-right:8px;
display: flex;
${AssetButton}{
    width: 40px;
}`;
const ShareComment = styled.div`
padding-left: 8px;
margin-right: auto;
border-left: 1px solid rgba(0,0,0,0.15);
${AssetButton}{
    svg{
        margin-right:5px
    }
}
`;
const PostButton=styled.button`
min-width: 60px;
border-radius: 20px;
padding-left: 16px;
padding-right: 16px;
background:  ${(props) => (props.disabled ? "rgba(0,0,0,0.8)" : "#0a66c2" )};
color: ${(props) => (props.disabled ? "rgba(1,1,1,0.2)" : "white")};
&:hover{
    background: ${(props) => (props.disabled ? "rgba(0,0,0,0.08)" : "#004182" )}
}
`;

const Editor=styled.div`
padding: 12px 24px;
textarea{
    width:100%;
    min-height: 100px;
    resize: none;
}

input{
    width: 100%;
    height: 35px;
    font-size: 16px;
    margin-bottom: 20px;

}
`;

 const UploadImage = styled.div`
 text-align: center;
  img{
    width: 100%;
 }
 `;

const mapStateToProps = (state) => {
   return{
    user : state.userState.user,
   }
}

const mapDispatchToProps = (dispatch) => ({

        postArticle: (payload) => dispatch(postArticleAPI(payload)),
     
})


export default  connect (mapStateToProps,mapDispatchToProps)(PostModel);