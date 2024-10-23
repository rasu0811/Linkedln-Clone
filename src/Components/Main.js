import styled from "styled-components";
import PostModel from "./PostModel"

import { connect } from "react-redux";
import {useEffect, useState}  from "react";
import { getArticlesAPI } from "../actions";


const Main=(props)=>{
    const [showModel , setShowModel]=useState("close");

    useEffect(() => {
        props.getArticles();
    },[]);
     
    const handleClick = (e) => {
        e.preventDefault();
        // if (e.target !== e.currentTarget) return;
        // Toggle the state only when the user clicks on the button
        if (showModel === 'open') {
            setShowModel('close');
        } else {
            setShowModel('open');
        }
    };


    return(
    
        <Container>
            <ShareBox>
            <div>
                
                    <img src="/Images/user.svg" alt="" />
                
                <button onClick={handleClick} disabled={props.loading  ? true: false}>Start a Post</button>
             
            </div>

            <div>
                <button>
                <img src="/Images/photo-001.ico" alt="" />
                <span>Photo</span>
                </button>

               <button>
                <img src="/Images/videoo-001.ico" alt="" />
                <span>Video</span>
                </button> 

                <button>
                <img src="/Images/event-001.svg.ico" alt="" />
                <span>Event</span>
                </button>

                <button>
                <img src="/Images/article.svg-001.ico" alt="" />
                <span> Write Article</span>
                </button>
            
                </div>

                </ShareBox>
                <Content>
        
                <Article  >
                     <SharedActor>
                        <a>
                            <img src="Images/user.svg" alt="" />
                            <div>
                                <span>Title</span>
                                <span>Info</span>
                                <span>Date</span>
                            </div>
                        </a>
                        <button>
                            <img src="/Images/dotss.ico" alt="" />
                        </button>
                     </SharedActor>
                     <Description>
                        description
                     </Description>

                     <SharedImg>

                        <a>
                            <img src="/Images/Nature.jpg" alt="" />
                        </a>
                     </SharedImg>
                  <SocialCounts>
                    <li>
                        <button>
                            <img src="/Images/likesss-001.ico" alt="" />
                            <img src="/Images/clapping-001.ico" alt="" />
                            <span>75</span>
                        </button>
                    </li>
                    <li>
                        <a > 2 comments</a>
                    </li>
                  </SocialCounts>
                  <SocialActions>
                     <button>
                        <img src="/Images/icon like-001.ico" alt="" />
                        <span>Like</span>
                     </button>
                     <button>
                        <img src="/Images/comment icon-001.ico" alt="" />
                        <span>Comment</span>
                     </button>
                     <button>
                        <img src="/Images/share icon-001.ico" alt="" />
                        <span>Share</span>
                     </button>
                     <button>
                        <img src="/Images/blue.ico" alt="" />
                        <span>Send</span>
                     </button>
                     </SocialActions>

                </Article>
                    
                </Content>
                 <PostModel showModel={showModel} handleClick={handleClick} /> 

        </Container>
)}
    
    


const Container=styled.div`
grid-area: main;

`;
    
const commonCard=styled.div`
text-align:center;
overflow: hidden;
margin-bottom: 8px;
background-color: #fff;
border-radius: 5px;
transition:box-shadow 83ms;
position: relative;
border: none;
box-shadow: 0 0 0 1px rgba(0 0 0 /15%), 0 0 0 rgba(0 0 0/20%); 

`;
const ShareBox=styled(commonCard)`
display: flex;
flex-direction: column;
color: #958b7b;
margin: 0 0 8px;
background: white;
div{
    button{
        outline: none;
        color: rgba(0,0,0,0.6);
        font-size: 14px;
        line-height: 1.5;
        min-height: 48px;
        background: transparent;
        border: none;
        display: flex;
        align-items: center;
        font-weight: 600;
    }

    &:first-child{
        display: flex;
        align-items: center;
        padding: 8px 16px 0 16px;
        img{
            width: 48px;
            border-radius: 50%;
            margin-right: 8px;
        }

        button{
            margin: 4px 0;
            flex-grow: 1;
            padding-left: 16px;
            border: 1px solid rgba(0,0,0,0.15);
            border-radius: 35px;
            background-color: white;
            text-align: left;
        }
 
    }
     &:nth-child(2){
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        padding-bottom: 4px;


        button{
            img{
                margin: 0 4px 0 -2px;
            }

            span{
                color: #70b5f9;
            }
        }
     }
}
`;

const Article=styled(commonCard)`
padding: 0;
margin: 0 0 8px;
overflow: visible;

`;

const SharedActor=styled.div`
padding-right: 40px;
flex-wrap: nowrap;
padding: 17px 16px 0;
margin-bottom: 8px;
align-items: center;
display: flex;
a{
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;

img{
    height:48px;
    width:48px;
}

&> div{
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-basis: 0;
    margin-left: 8px;
    overflow: hidden;

    span{
        text-align: left;
        &:first-child{
            font-size: 14px;
            font-weight: 700;
            color: rgba(0,0,0,1);
        }
        &:nth-child(n+1){
            font-size: 12px;
            color: rgba(0,0,0,0.6);
        }
    }
}
}

button{
position: absolute;
right: 12px;
top: 0;
background: transparent;
border: none;
outline: none;


}

`;

const Description=styled.div`
padding: 0 16px;
overflow: hidden;
color: rgba(0,0,0,0.9);
font-size: 14px;
text-align: left;



`;
const SharedImg=styled.div`
margin-top: 8px;
width: 100%;
display: block;
position: relative;
background-color: #f9fafb;
img{
    object-fit: contain;
    width: 100%;
}
`;

const SocialCounts=styled.ul`
line-height: 1.3;
display: flex;
align-items: flex-start;
overflow: auto;
margin: 0 16px;
padding: 8px 0;
border-bottom: 1px solid #e9e5df;
list-style: none;
li{
    margin-right: 5px;
    font-size: 12px;
    button{
        display: flex;
    }
}

`;

const SocialActions=styled.div`
align-items: center;
display: flex;
justify-content: flex-start;
margin: 0;
min-height: 40px;
padding: 4px 8px;
button{
    display: inline-flex;
    align-items: center;
    padding: 8px;
    color: #0a66c2;

    @media (min-width: 768px){
        span{
            margin-left: 8px;
        }
    }
}

`;

const Content = styled.div`
  text-align: center;
  & > img{
    width : 30px;
  }

`;

const mapStateToProps = (state) => {
    return{
        loading: state.articleState.loading,
        user: state.userState.user,
        articles : state.articleState.articles  || [],
    };
};

const mapDispatchToProps = (dispatch) =>  ({
getArticles : () => dispatch(getArticlesAPI()),
});

export default  connect (mapStateToProps, mapDispatchToProps)(Main);