import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`

const Content = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
`

const LoadingSpinner = () => {
  return (
    <Wrapper>
      <Content>Loading...</Content>
    </Wrapper>
  )
}

export default LoadingSpinner
