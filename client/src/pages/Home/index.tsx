import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`

const Content = styled.div`
  display: flex;
  height: 100%;
  width: 60%;
  margin: auto;
  align-items: center;
  justify-content: center;
`

const Home: React.FunctionComponent = () => {
  return (
    <Wrapper>
      <Content>
        <h1>Home</h1>
      </Content>
    </Wrapper>
  )
}

export default Home
