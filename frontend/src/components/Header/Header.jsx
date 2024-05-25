import { styled } from 'styled-components';

const HeaderContainer = styled.header`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
`;

const LogoDiv = styled.div`
    margin-left: 0;
    margin-right: auto;
`;

const NameDiv = styled.div`
    margin-left: auto;
    margin-right: 0;
    font-size: 30px;
`;

export default function Header() {
    return (
        <HeaderContainer>
            <LogoDiv>
                <img src="src/assets/logo.svg" alt="Logo"></img>
            </LogoDiv>
            <NameDiv>
                <h3>Smoke And Fire Detection</h3>
            </NameDiv>
        </HeaderContainer>
    );
}
