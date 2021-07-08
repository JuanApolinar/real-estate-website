import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components/macro';
import { Link, useLocation } from 'react-router-dom';
import { menuData } from '../data/MenuData';
import { Button } from './Button';
import { FaBars } from 'react-icons/fa';

const Nav = styled.nav`
height: 60px;
display: flex;
justify-content: space-between;
padding: 1rem 2rem;
z-index: 100;
position: fixed;
width: 100%;
`;

const NavLink = css`
 color: #fff;
 display: flex;
 align-items: center;
 padding: 0 1rem;
 cursor: pointer;
 text-decoration: none;
`;


const Logo = styled(Link)`
    ${NavLink};
    font-style: italic;
`;

const MenuBars = styled(FaBars)`
display: none;
cursor: pointer;

@media screen and (max-width: 768px) {
    display: block;
}
`;

const NavMenu = styled.div`
    display: flex;
    align-items: center;
    margin-right: -48px;

    @media screen and (max-width: 768px) {
        display: none;
    }
`;

const NavMenuLinks = styled(Link)`
    ${NavLink};
`;

const NavBtn = styled.div`
    display: flex;
    align-items: center;
    margin-right: 24px;

    @media screen and (max-width: 768px) {
        display: none;
    }
`;

const Navbar = ({toggle}) => {
    const [navbar, setNavbar] = useState(false)
    const location = useLocation()

    const changeBackground = () =>{
        if(window.pageYOffset >= 60){
            setNavbar(true)
        } else{
            setNavbar(false)
        }
    }

    useEffect(() => {
        const watchScroll = () => {
            window.addEventListener('scroll', changeBackground)
        }

        watchScroll()

        return () => {
            window.removeEventListener('scroll', changeBackground)
        }
    }, []);

    let style = {
        backgroundColor: navbar || location.pathname !== "/" ? '#CD853F' : 'transparent', transition: '0.4'
    };

    return (
        <Nav style = {style}>
            <Logo to="/">ELIXR</Logo>
            <MenuBars onClick={toggle}/>
            <NavMenu>
                {menuData.map((item, index) => (
                    <NavMenuLinks to={item.link} key={index}>
                        {item.title}
                    </NavMenuLinks>
                ))}
            </NavMenu>
            <NavBtn>
                <Button 
                to='/contact' 
                primary='true'>
                    Contact us
                </Button>
            </NavBtn>
        </Nav>
    );
};

export default Navbar
