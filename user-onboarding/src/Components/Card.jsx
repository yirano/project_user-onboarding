import React from 'react'
import styled from 'styled-components'

const StyledCard = styled.div`
  padding: 20px;
  margin: 20px;
  border: 1px solid #eee;
`
const StyledText = styled.p`
  font-weight: bold;
`

const InnerText = styled.span`
  font-weight: normal;
`
export default function Card({ user }) {
  return (
    <StyledCard>
      <StyledText>Name: <InnerText>{user.name}</InnerText></StyledText>
      <StyledText>Job: <InnerText>{user.jobs}</InnerText></StyledText>
      <StyledText>Email: <InnerText>{user.email}</InnerText></StyledText>
      <StyledText>Password: <InnerText>{user.password}</InnerText></StyledText>
    </StyledCard >
  )
}
