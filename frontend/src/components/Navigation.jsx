import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const NavContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${props => props.theme.colors.surface};
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding-bottom: env(safe-area-inset-bottom);
`

const NavContent = styled.div`
  max-width: 480px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: ${props => props.theme.spacing.xs} 0;
`

const StyledNavLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.textSecondary};
  transition: all ${props => props.theme.transitions.fast};
  text-decoration: none;

  &.active {
    color: ${props => props.theme.colors.primary};

    .nav-icon {
      transform: scale(1.1);
    }
  }

  &:active {
    transform: scale(0.95);
  }
`

const NavIcon = styled.div`
  font-size: 1.5rem;
  margin-bottom: ${props => props.theme.spacing.xs};
  transition: transform ${props => props.theme.transitions.fast};
`

const NavLabel = styled.span`
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: ${props => props.theme.fontWeights.medium};
`

const navItems = [
  { path: '/', icon: '🏠', label: '홈' },
  { path: '/mission', icon: '🎯', label: '미션' },
  { path: '/statistics', icon: '📊', label: '통계' },
  { path: '/profile', icon: '👤', label: '프로필' },
]

function Navigation() {
  return (
    <NavContainer>
      <NavContent>
        {navItems.map((item) => (
          <StyledNavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
          >
            <NavIcon className="nav-icon">{item.icon}</NavIcon>
            <NavLabel>{item.label}</NavLabel>
          </StyledNavLink>
        ))}
      </NavContent>
    </NavContainer>
  )
}

export default Navigation