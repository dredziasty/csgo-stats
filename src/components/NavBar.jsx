import { NavLink, useLocation } from 'react-router-dom'
import styled from 'styled-components'

const links = [
  { to: '/', text: 'total' },
  { to: '/p/boomer', text: 'boomer' },
  { to: '/p/patriarcha', text: 'Patriarcha' },
  { to: '/p/dred', text: 'dred' },
  { to: '/p/thestrike', text: 'thestrike'  },
  { to: '/p/legdin', text: 'Legdin' }
]

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 1rem;
  flex-wrap: wrap;
  position: fixed;
  width: 100vw;
  background-color: hsl(0, 0%, 100%);
  box-shadow: 0 1px 3px 0px hsla(30, 80%, 60%, 0.75);
  `

const StyledNavLink = styled(NavLink)`
  padding: 0.5rem;
  display: inline-block;
  text-decoration: none;
  color: ${props => props.$active ? 'hsl(30, 80%, 60%)' : 'hsl(0, 0%, 35%)'};
  font-weight: bold;
  font-size: 1.1rem;
`

const NavBar = () => {
  const location = useLocation()
  const { pathname } = location

  return (
    <Container>
      {links.map(({ to, text }) => (
        <StyledNavLink key={text} $active={pathname === to} to={to}>{text}</StyledNavLink>
      ))}
    </Container>
  )
}

export default NavBar