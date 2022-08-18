import React from 'react';
import './Header.css';
// import logo from '../../assets/images/bookLogo.png'
// import threeLines from '../../assets/images/threeLines.png'
import iconFolder from './icons/folder.png'

// import { useNavigate } from 'react-router-dom';


const Header = () => {

  // const navigate = useNavigate();

  // const navLogin = () => {
  //   navigate('/')
  // }

  return (
    <div className='headerContainer'>
      <div className='headerInnerWidth'>
        <div className='workshopHeader'>
          <img
            // onClick={navLogin}
            src={iconFolder}
            alt=""
            className='headerLogo'
          />
          <div className='bookify'>Drive</div>
        </div>
        <img
          src={iconFolder}
          alt="threeLines"
          className='threeLines'
        />
      </div>
    </div>
  );
};

export default Header;
