import styled from "styled-components";
import Leftside from "./Leftside";
import Rightside from "./Rightside";
import Main from "./Main";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
// import { Redirect } from "react-router-dom";

const Home= (props)=>{
    return (
    <Container>
        {!props.user && < Navigate to = "/"/>}
        <Section>
            <h5>
                <a> Hiring in hurry? -</a>
                </h5>
            <p>Find  talented  props in record with time  Upwork and keep business moving.</p>
        </Section>

        <Layout>
          <Leftside/>
          <Main/>
          <Rightside/>
            
        </Layout>
    </Container>
)
}

const Container=styled.div`
padding-top: 52px;
max-width: 100%;


`;

const Content=styled.div`
max-width: 1128px;
margin-left: auto;
margin-right: auto;
`;
const Section=styled.section`
min-height: 50px;
padding: 16px 0;
box-sizing: content-box;
text-align: center;
display: flex;
justify-content: center;
text-decoration: underline;


h5{
    color:#0a66c2;
    font-size: 14px;
    a {
        font-weight: 700;
    }
}

p{
    font-size:14px;
    color: #434649;
    font-weight: 600;
}
@media screen (max-width:768px) {
    flex-direction:colum;
    padding: 0 5px;
}
`;

const Layout=styled.div`
display: grid;
grid-template-areas: "leftside main rightside";
grid-template-columns: minmax(0, 5fr) minmax(0 , 12fr) minmax(300px, 7fr);
column-gap: 25px;
row-gap: 25px;
/* grid-template-rows: auto; */
margin: 25px 0;
@media  (max-width:768px) {
    display: flex;
    flex-direction: column;
    padding: 0.5px;
}

`;
const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
    };
};




export default connect(mapStateToProps)(Home);