import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, } from 'mdb-react-ui-kit';

const PersonalProfile = () => {
    return (
        <div className="gradient-custom-2" style={{ backgroundColor: '#9de2ff' }}>
          <MDBContainer className="py-5 h-100">
            <MDBRow className="justify-content-center align-items-center h-100">
              <MDBCol lg="9" xl="7">
                <MDBCard>
                  <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#722', height: '200px' }}>
                    <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                      <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="Avatar" className="my-5" style={{ width: '95px', marginLeft: '20px'}} fluid />
                      <button outline color="dark" style={{height: '36px', overflow: 'visible'}}>
                        Edit profile
                      </button>
                    </div>
                    <div className="ms-3" style={{ marginTop: '130px' }}>
                      <MDBCardText tag="h5">Jade</MDBCardText>
                      <MDBCardText>UK</MDBCardText>
                    </div>
                  </div>
                  <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                    <div className="d-flex justify-content-end text-center py-1">
                      <div>
                        <MDBCardText className="mb-1 h5">24</MDBCardText>
                        <MDBCardText className="small text-muted mb-0">Saved Recipes</MDBCardText>
                      </div>
                    </div>
                  </div>
                  <MDBCardBody className="text-black p-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <MDBCardText className="lead fw-normal mb-0 h5">My Saved Recipes</MDBCardText>
                    </div>
                    <MDBRow className="g-4">
                      <MDBCol className="mb-2">
                        <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                          alt="image 1" className="w-100 rounded-3" />
                      </MDBCol>
                      <MDBCol className="mb-2">
                        <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                          alt="image 1" className="w-100 rounded-3" />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="g-4">
                      <MDBCol className="mb-2">
                        <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                          alt="image 1" className="w-100 rounded-3" />
                      </MDBCol>
                      <MDBCol className="mb-2">
                        <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                          alt="image 1" className="w-100 rounded-3" />
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      );
    }

export default PersonalProfile;