import React, { Component } from 'react';

import Main from './Main';

import avatar from '../../assets/images/avatar.png';
import playsport from '../../assets/images/playsport.png';
import penguin from '../../assets/images/penguin.png';
import star from '../../assets/images/star.png';
import classroom from '../../assets/images/classroom.png';
import msNhan from '../../assets/images/msNhan.png';
import msTrang from '../../assets/images/msTrang.png';
import msUyen from '../../assets/images/msUyen.png';

const StudentProfile = () => {
  return (
    <Main>
      <div className="content-body">
        <div className="content-header">
          <div className="content-info container">
            <div className="profile">
              <div className="img-profile">
                <img src={avatar}></img>
                <i className="edit-icon fa-regular fa-pen-to-square"></i>
              </div>
            </div>
            <span className="student-name">SEVENTEEN</span>
          </div>
        </div>
        <div className="content-description container">
          <div className="about-me">
            <div className="about-icon">
              <i className="icon-user fa-solid fa-user"></i>
              <span className="about-name">About me</span>
            </div>
            <div className="about-description">
              I'm a second-year student at Passerelles Numériques Vietnam, an
              NGO providing 3-year IT training to underprivileged youth. I'm
              really into learning English because I love how beautiful the
              language is. But it was difficult for me to conquer it easy, but
              because to be able to find a job easily in the IT intrusdy.
            </div>
          </div>
          <div className="fact-about">
            <div className="fact-icon">
              <i
                className="icon-fact fa-solid fa-list-check"
                style={{ marginTop: '5px' }}
              ></i>
              <span className="fact-name">Fact</span>
            </div>
            <div className="group-card">
              <div className="card">
                <img src={playsport} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Fact No .1</h5>
                  <p className="card-text">
                    I'm a person who loves sports and outdoor activities.
                  </p>
                </div>
              </div>
              <div className="card">
                <img src={penguin} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Fact No .2</h5>
                  <p className="card-text">I very like Penguin.</p>
                </div>
              </div>
              <div className="card">
                <img src={star} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Fact No .3</h5>
                  <p className="card-text">I'm a person who loves stars.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="class-objects">
            <div className="class-icon">
              <img src={classroom} className="icon-class"></img>
              <span className="class-name">Class</span>
            </div>
            <div className="class-description">
              <a href="/study/plans" className="class-card">
                <div className="card-header">
                  <div className="card-header">
                    <h3>PNV26B - TOEIC1</h3>
                    <p>Lê Nguyễn Phúc Nhân</p>
                  </div>
                  <div className="teacher-avatar">
                    <img src={msNhan} alt="Teacher" />
                  </div>
                </div>
              </a>
              <a href="/study/plans" className="class-card">
                <div
                  className="card-header"
                  style={{ backgroundColor: '#D9D9D9' }}
                >
                  <div className="card-header">
                    <h3>IT English 1</h3>
                    <p>Uyên Trần</p>
                  </div>
                  <div className="teacher-avatar">
                    <img src={msUyen} alt="Teacher" />
                  </div>
                </div>
              </a>
              <a href="/study/plans" className="class-card">
                <div
                  className="card-header"
                  style={{ backgroundColor: '#FA009E' }}
                >
                  <div className="card-header">
                    <h3>PNV26B - TOEIC1</h3>
                    <p>Comunication English</p>
                  </div>
                  <div className="teacher-avatar">
                    <img src={msTrang} alt="Teacher" />
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default StudentProfile;
