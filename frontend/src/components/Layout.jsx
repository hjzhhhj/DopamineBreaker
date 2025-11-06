import styled from "styled-components";
import Navigation from "./Navigation";

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f8f9fa;
`;

const Main = styled.main`
  flex: 1;
  width: 100%;
  padding-bottom: 80px;
`;

function Layout({ children }) {
  return (
    <LayoutContainer>
      <Main>{children}</Main>
      <Navigation />
    </LayoutContainer>
  );
}

export default Layout;
