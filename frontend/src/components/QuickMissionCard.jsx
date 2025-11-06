import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Card = styled.div`
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.md};
  color: white;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`

const CardTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.semiBold};
  margin-bottom: ${props => props.theme.spacing.sm};
`

const CardDescription = styled.p`
  font-size: ${props => props.theme.fontSizes.md};
  opacity: 0.9;
  line-height: 1.6;
`

const QuickMissionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
`

const QuickMissionItem = styled.div`
  padding: ${props => props.theme.spacing.md};
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: ${props => props.theme.borderRadius.md};
  backdrop-filter: blur(10px);
`

const StartButton = styled.button`
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  background-color: white;
  color: #4CAF50;
  border-radius: ${props => props.theme.borderRadius.lg};
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.semiBold};
  transition: all ${props => props.theme.transitions.fast};
  align-self: flex-start;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`

function QuickMissionCard() {
  const navigate = useNavigate()

  const handleStartMission = () => {
    navigate('/mission')
  }

  return (
    <Card>
      <div>
        <CardTitle>빠른 미션 시작</CardTitle>
        <CardDescription>
          지금 바로 짧은 휴식을 시작해보세요
        </CardDescription>
      </div>

      <QuickMissionList>
        <QuickMissionItem>5분 스트레칭</QuickMissionItem>
        <QuickMissionItem>10분 명상</QuickMissionItem>
        <QuickMissionItem>3분 물 마시기</QuickMissionItem>
      </QuickMissionList>

      <StartButton onClick={handleStartMission}>
        미션 선택하기
      </StartButton>
    </Card>
  )
}

export default QuickMissionCard