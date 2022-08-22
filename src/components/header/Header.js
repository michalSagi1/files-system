import React, { useContext } from "react";
import './Header.css';
import iconFolder from '../../icons/folder.png'
import iconHeart from '../..//icons/heart.png'
import PathContext from "../../PathContext";




const Header = () => {
  const { setPath } = useContext(PathContext);

  return (
    <div className='headerContainer'>
      <div className='headerInnerWidth'>
        <div className='workshopHeader'>
          <img
            onClick={() => setPath(`root`)}
            src={iconFolder}
            alt=""
            className='headerLogo'
          />
          <div onClick={() => setPath(`root`)}
            className='titleHeader'>Drive</div>
        </div>
        <img
          src={iconHeart}
          alt="iconHeart"
          className='iconHeart'
        />
      </div>
    </div>
  );
};

export default Header;
